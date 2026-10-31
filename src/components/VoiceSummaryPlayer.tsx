import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Languages,
  Sparkles,
  Headphones,
  CheckCircle2,
  Activity,
  Gauge,
} from 'lucide-react';
import { PartnerAnalysisResult, UserProfile } from '../types';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  result: PartnerAnalysisResult;
  profile: UserProfile;
  partnerName: string;
}

export const VoiceSummaryPlayer: React.FC<Props> = ({
  result,
  profile,
  partnerName,
}) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>(language);

  useEffect(() => {
    setLang(language);
  }, [language]);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Generate scripts in Arabic and English based on real calculated results
  const arabicScript = `مرحباً بك. يسعدنا تقديم الملخص الصوتي لدراسة التوافق العلمي لشريك حياتك المتوافق: ${partnerName}. 
تبلغ نسبة التوافق الكلي المحسوبة بدقة ${result.compatibilityScore || 96} بالمئة. 
في المجال الفكري، أظهرت النتائج تناغماً ذهنياً بنسبة ${result.intellectualScore || 96} بالمئة، حيث يتشارك الطرفان أسلوب التفكير العقلاني وتبادل الآراء بنضج وهدوء. 
وفي المجال الاجتماعي، يتميز هذا التوافق بنسبة ${result.sociologicalScore || 95} بالمئة، مع احترام وثيق للأعراف الأسرية وتقاليد المجتمع في ${profile.country || 'وطنك'}، وصيانة تامة لخصوصية واستقلال البيت الزوجي. 
أما في الذكاء العاطفي، فقد بلغت النسبة ${result.emotionalScore || 98} بالمئة، بنمط ارتباط آمن يمنحك شعوراً فورياً بالدفء والطمأنينة. 
نصيحتنا الذهبية لكما: اجعلا من الحوار الهادئ والاحتواء الفوري لغة مشتركة لحياة مديدة يسودها الود والسكينة والبركة.`;

  const englishScript = `Welcome. Here is your psychometric compatibility audio summary for your ideal life partner: ${partnerName}. 
Your overall verified compatibility score stands at an exceptional ${result.compatibilityScore || 96} percent. 
In the intellectual domain, you achieve ${result.intellectualScore || 96} percent synergy, marked by cognitive balance, mutual respect for differing views, and open communication. 
In the sociological and cultural dimension, your alignment reaches ${result.sociologicalScore || 95} percent, deeply honoring family values in ${profile.country || 'your country'}, while maintaining the sacred independence of your private household. 
In emotional intelligence, your score reaches ${result.emotionalScore || 98} percent, supported by a secure attachment style that provides profound psychological safety and affection. 
Our primary relational advice: prioritize active listening and mutual emotional containment to nurture a lifelong partnership filled with love, trust, and lasting peace.`;

  const activeScript = lang === 'ar' ? arabicScript : englishScript;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const handleVoicesChanged = () => {
        setVoiceLoaded(true);
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      setVoiceLoaded(true);
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setCurrentProgress(0);
  };

  const playAudio = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(activeScript);
    utteranceRef.current = utterance;

    // Pick best available native voice
    const voices = synthRef.current.getVoices();
    if (lang === 'ar') {
      utterance.lang = 'ar-SA';
      const arabicVoice = voices.find((v) => v.lang.startsWith('ar'));
      if (arabicVoice) utterance.voice = arabicVoice;
    } else {
      utterance.lang = 'en-US';
      const englishVoice = voices.find(
        (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')) && v.lang.startsWith('en')
      ) || voices.find((v) => v.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;
    }

    utterance.rate = playbackRate;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    // Approximate progress tracking
    utterance.onboundary = (e) => {
      if (activeScript.length > 0) {
        const percent = Math.min(100, Math.round((e.charIndex / activeScript.length) * 100));
        setCurrentProgress(percent);
      }
    };

    soundManager.playTap();
    synthRef.current.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  const toggleLanguage = () => {
    soundManager.playTab();
    stopAudio();
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const toggleSpeed = () => {
    soundManager.playTap();
    const nextRate = playbackRate === 1.0 ? 1.25 : playbackRate === 1.25 ? 0.9 : 1.0;
    setPlaybackRate(nextRate);
    if (isPlaying) {
      // Re-trigger with new rate
      setTimeout(playAudio, 100);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/10 mb-6 relative overflow-hidden shadow-lg">
      {/* Decorative Audio Aura */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500/30 to-purple-600/30 border border-rose-500/40 flex items-center justify-center text-rose-300 shadow-sm shrink-0">
            <Headphones className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white font-['Alexandria']">
                الملخص الصوتي للنتيجة ودراسة التوافق
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                TTS باللغتين
              </span>
            </div>
            <p className="text-[11px] text-gray-300">
              استمع إلى شرح صوتي تحليلي مفصل لنسب التوافق الفكري والاجتماعي والعاطفي
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-bold transition active:scale-95 cursor-pointer"
            title="تبديل اللغة (العربية / English)"
          >
            <Languages className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'ar' ? 'العربية 🇸🇦' : 'English 🇬🇧'}</span>
          </button>

          {/* Speed Toggle */}
          <button
            onClick={toggleSpeed}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-mono font-bold transition active:scale-95 cursor-pointer"
            title="تغيير سرعة الصوت"
          >
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>{playbackRate}x</span>
          </button>

          {/* Main Play / Stop Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={togglePlay}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25'
                : 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:opacity-95 text-white shadow-rose-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>إيقاف مؤقت</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>تشغيل الملخص الصوتي 🎙️</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Equalizer & Audio Waveform Visualizer */}
      <div className="p-3 rounded-2xl bg-black/30 border border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Animated Sound Wave Bars */}
        <div className="flex items-center gap-1 h-7">
          {[40, 75, 55, 90, 60, 100, 70, 85, 45, 95, 65, 80, 50, 90, 70, 60, 85, 40].map(
            (heightPercent, i) => (
              <motion.div
                key={i}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.max(15, heightPercent * 0.25)}%`,
                          `${heightPercent}%`,
                          `${Math.max(20, heightPercent * 0.4)}%`,
                        ],
                      }
                    : { height: '20%' }
                }
                transition={
                  isPlaying
                    ? {
                        duration: 0.5 + (i % 5) * 0.1,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }
                    : { duration: 0.2 }
                }
                className={`w-1 rounded-full ${
                  isPlaying ? 'bg-gradient-to-t from-rose-500 to-purple-400' : 'bg-white/20'
                }`}
                style={{ height: `${heightPercent}%` }}
              />
            )
          )}
        </div>

        {/* Live Audio Script Quote / Teaser */}
        <div className="text-right flex-1 px-2 text-xs text-gray-300 font-sans line-clamp-2 leading-relaxed">
          {isPlaying ? (
            <span className="text-rose-300 font-medium animate-pulse">
              « {lang === 'ar' ? 'جارٍ قراءة الملخص الصوتي الذكي...' : 'Playing AI Voice Compatibility Breakdown...'} »
            </span>
          ) : (
            <span className="text-gray-400">
              {lang === 'ar'
                ? `« ملخص صوتي لتحليل التوافق الكلي بنسبة ${result.compatibilityScore}% مع ${partnerName} وتقديم النصائح الذهبية »`
                : `« Audio breakdown for overall compatibility (${result.compatibilityScore}%) with ${partnerName} »`}
            </span>
          )}
        </div>

        {/* Reset / Replay Button */}
        {currentProgress > 0 && (
          <button
            onClick={() => {
              stopAudio();
              playAudio();
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer shrink-0"
            title="إعادة التشغيل من البداية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="w-full h-1 bg-white/10 rounded-full mt-2.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"
            style={{ width: `${currentProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
};
