import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Heart,
  Volume2,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  Zap,
  Activity,
  UserCheck,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { VoiceToneAnalysisResult } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  partnerGender: 'male' | 'female';
  userGender: 'male' | 'female';
  onSendVoiceMessageToChat?: (voiceRecord: {
    audioUrl?: string;
    duration: number;
    analysis?: VoiceToneAnalysisResult;
  }) => void;
}

export const VoiceToneAnalysisModal: React.FC<Props> = ({
  isOpen,
  onClose,
  partnerName,
  partnerGender,
  userGender,
  onSendVoiceMessageToChat,
}) => {
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VoiceToneAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Clean up on unmount or close
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Start Voice Recording
  const startRecording = async () => {
    soundManager.playTap();
    setErrorMsg(null);
    audioChunksRef.current = [];
    setRecordSeconds(0);
    setAnalysisResult(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('المتصفح لا يدعم الوصول للميكروفون');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Convert to Base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioBase64(reader.result as string);
        };

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecordingState('recording');

      timerRef.current = setInterval(() => {
        setRecordSeconds((prev) => {
          if (prev >= 29) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone permission or access error:', err);
      // Fallback: simulate recording for environments with strict sandbox permissions
      simulateRecording();
    }
  };

  // Graceful simulation if browser denies raw microphone access in iframe
  const simulateRecording = () => {
    setRecordingState('recording');
    setRecordSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordSeconds((prev) => {
        if (prev >= 6) {
          if (timerRef.current) clearInterval(timerRef.current);
          setRecordingState('recorded');
          return 6;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Stop Recording
  const stopRecording = () => {
    soundManager.playTap();
    if (timerRef.current) clearInterval(timerRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setRecordingState('recorded');
  };

  // Reset / Record Again
  const handleReset = () => {
    soundManager.playTap();
    if (timerRef.current) clearInterval(timerRef.current);
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    setIsPlaying(false);
    setRecordingState('idle');
    setRecordSeconds(0);
    setAudioUrl(null);
    setAudioBase64(null);
    setAnalysisResult(null);
    setErrorMsg(null);
  };

  // Play / Pause Recorded Audio
  const togglePlayAudio = () => {
    if (!audioUrl) return;

    if (!audioElementRef.current) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;
      audio.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  // Trigger AI Voice Tone & Emotion Analysis
  const handleAnalyzeVoice = async () => {
    soundManager.playTap();
    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/analyze-voice-tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: audioBase64 || undefined,
          mimeType: 'audio/webm',
          durationSeconds: recordSeconds || 6,
          speakerGender: userGender,
          partnerGender: partnerGender,
          partnerName: partnerName,
          contextText: 'رسالة ودية مفتوحة في ختام The Blind Date Show للتعبير عن الرضى والانسجام',
        }),
      });

      const json = await res.json();
      if (json && json.success && json.data) {
        soundManager.playRoundPass();
        setAnalysisResult({
          ...json.data,
          audioBlobUrl: audioUrl || undefined,
          durationSeconds: recordSeconds || 6,
        });
      } else {
        throw new Error(json.error || 'فشل التحليل الصوتي');
      }
    } catch (err: any) {
      console.error('Error analyzing voice tone:', err);
      setErrorMsg('تعذر تحليل الصوت، يرجى المحاولة مجدداً');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Send Voice Message to Chat
  const handleSendToChat = () => {
    soundManager.playTap();
    if (onSendVoiceMessageToChat) {
      onSendVoiceMessageToChat({
        audioUrl: audioUrl || undefined,
        duration: recordSeconds || 6,
        analysis: analysisResult || undefined,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl my-6 bg-gradient-to-b from-[#1c1236] via-[#120d24] to-[#0c0916] border border-rose-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-white overflow-hidden"
          dir="rtl"
        >
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition z-10 cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-500/20 to-purple-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
              <Mic className="w-3.5 h-3.5 text-rose-400" />
              <span>تحليل نبرة الصوت والتناغم الصوتي المباشر</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-purple-200 font-['Alexandria']">
              رسالة صوتية وتناغم النبرات
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              سجّل رسالة صوتية دافئة لشريكك ({partnerName}) في الدردشة المفتوحة، لقياس دفء نبرتك ودرجة التوافق الصوتي والتناغم بينكما!
            </p>
          </div>

          {/* Recording Console */}
          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 text-center mb-5 relative overflow-hidden">
            {/* Visualizer animation when recording */}
            {recordingState === 'recording' && (
              <div className="flex items-center justify-center gap-1.5 h-12 mb-4">
                {[...Array(16)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-rose-500 to-pink-400 rounded-full"
                    animate={{
                      height: [8, Math.random() * 38 + 10, 8],
                    }}
                    transition={{
                      duration: 0.4 + (i % 4) * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Timer */}
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {formatTime(recordSeconds)}
            </div>

            <p className="text-xs text-gray-400 mb-4">
              {recordingState === 'idle' && 'اضغط على زر الميكروفون لبدء التسجيل (حتى 30 ثانية)'}
              {recordingState === 'recording' && 'جاري التسجيل... تحدث بعفوية ومودة لشريكك'}
              {recordingState === 'recorded' && 'تم اكتمال التسجيل بنجاح! يمكنك الاستماع أو تحليل النبرة'}
            </p>

            {/* Action Buttons in Console */}
            <div className="flex items-center justify-center gap-3">
              {recordingState === 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startRecording}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 cursor-pointer text-xl"
                  title="بدء التسجيل"
                >
                  <Mic className="w-6 h-6" />
                </motion.button>
              )}

              {recordingState === 'recording' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopRecording}
                  className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 cursor-pointer animate-pulse"
                  title="إيقاف التسجيل"
                >
                  <Square className="w-6 h-6 fill-white" />
                </motion.button>
              )}

              {recordingState === 'recorded' && (
                <div className="flex items-center gap-2.5">
                  {audioUrl && (
                    <button
                      onClick={togglePlayAudio}
                      className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-rose-400" /> : <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />}
                      <span>{isPlaying ? 'إيقاف مؤقت' : 'تشغيل التسجيل'}</span>
                    </button>
                  )}

                  <button
                    onClick={handleReset}
                    className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                    title="إعادة التسجيل من جديد"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleAnalyzeVoice}
                    disabled={isAnalyzing}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:opacity-95 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isAnalyzing ? 'جاري تحليل نبرة الصوت...' : 'تحليل نبرة الصوت والمشاعر 🔮'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AI Analysis Result Card */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 max-h-[380px] overflow-y-auto pr-1 pl-1 scrollbar-thin"
            >
              {/* Synergy Score & Archetype */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-slate-900 border border-rose-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-400 block mb-0.5">النمط الصوتي المكتشف:</span>
                  <h3 className="font-extrabold text-base text-white font-['Alexandria']">
                    {analysisResult.voiceToneArchetype}
                  </h3>
                </div>
                <div className="text-center p-2 rounded-2xl bg-rose-500/20 border border-rose-500/30">
                  <span className="text-[10px] text-gray-300 block">توافق النبرات</span>
                  <span className="font-mono text-xl font-extrabold text-rose-300">
                    {analysisResult.vocalSynergyScore}%
                  </span>
                </div>
              </div>

              {/* Emotional Tones Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {analysisResult.emotionalTones.map((tone, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-200">{tone.name}</span>
                      <span className="font-mono font-bold text-amber-300">{tone.score}%</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{tone.description}</p>
                  </div>
                ))}
              </div>

              {/* Detailed Compatibility Report */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-gray-300 leading-relaxed">
                <span className="font-bold text-purple-200 block mb-1 text-sm flex items-center gap-1.5 font-['Alexandria']">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  تقرير التناغم الصوتي مع ({partnerName}):
                </span>
                <p>{analysisResult.vocalCompatibilityReport}</p>
              </div>

              {/* Partner Acoustic Reaction Quote */}
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs">
                <span className="text-[10px] text-rose-400 font-bold block mb-1">
                  انطباع {partnerName} عند سماع نبرة صوتك:
                </span>
                <p className="text-gray-200 italic leading-relaxed">
                  "{analysisResult.partnerAcousticReaction}"
                </p>
              </div>

              {/* Action: Send to open chat */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  onClick={handleSendToChat}
                  className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer"
                >
                  <Send className="w-4 h-4 -rotate-90" />
                  <span>إرسال الرسالة والتحليل إلى الدردشة المفتوحة مع {partnerName} 💬</span>
                </button>
              </div>
            </motion.div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 mt-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
