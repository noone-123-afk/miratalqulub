import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Send,
  Star,
  Lock,
  Unlock,
  Radio,
  Users,
  X,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
  ShieldCheck,
  RefreshCw,
  LogOut,
  MessageCircle,
  Eye,
  Camera,
  Compass,
  Smile,
  ThumbsUp,
  ThumbsDown,
  PartyPopper,
  Tv,
  Copy,
  Check,
  Share2,
  AlertCircle,
  UserCheck,
  Bot,
  Mic,
  Play,
  Pause,
} from 'lucide-react';
import {
  UserProfile,
  PartnerAnalysisResult,
  BlindDateStageKey,
  BlindDateStageDefinition,
  BlindDateAnswerRecord,
  VoiceToneAnalysisResult,
} from '../types';
import { BLIND_DATE_STAGES } from '../data/blindDateData';
import { soundManager } from '../utils/sound';
import { useLiveChat } from '../hooks/useLiveChat';
import { VoiceToneAnalysisModal } from './VoiceToneAnalysisModal';
import {
  saveChatCadenceExchanges,
  loadSavedChatCadenceExchanges,
  ChatExchangeTiming,
} from '../utils/chatCadenceTracker';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  result?: PartnerAnalysisResult | null;
}

type ParticipantMode = 'real_person' | 'ai_simulation';

export const BlindDateShowModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  result,
}) => {
  const {
    isConnected,
    myUserId,
    status: liveStatus,
    partner: livePartner,
    compatibilityScore: liveCompatScore,
    messages: liveMessages,
    onlineCount,
    searchingCount,
    isRealPerson: liveIsRealPerson,
    privateRoomCode,
    roomErrorMessage,
    latestBlindDateEvent,
    startSearch,
    cancelSearch,
    sendMessage,
    leaveChat,
    sendBlindDateEvent,
    createPrivateRoom,
    joinPrivateRoom,
  } = useLiveChat(profile);

  // Participant mode choice
  const [participantMode, setParticipantMode] = useState<ParticipantMode>('real_person');
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Active show stage index (0 = Personal, 1 = Social, 2 = Academic, 3 = Ambitions)
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  // Turn within stage: 0 to 4 (5 questions per level)
  const [questionTurnIdx, setQuestionTurnIdx] = useState<number>(0);

  // Sub-steps flow:
  // 'user_ask' -> 'partner_answer' -> 'user_rate' -> 'partner_ask' -> 'user_answer' -> 'partner_rate' -> 'stage_evaluation' -> 'final_curtain' -> 'open_chat' | 'show_rejected'
  const [subStep, setSubStep] = useState<
    | 'setup_mode'
    | 'user_ask'
    | 'partner_answer'
    | 'user_rate'
    | 'partner_ask'
    | 'user_answer'
    | 'partner_rate'
    | 'stage_evaluation'
    | 'final_curtain'
    | 'open_chat'
    | 'show_rejected'
  >('setup_mode');

  // Question & Answer Inputs
  const [customQuestionInput, setCustomQuestionInput] = useState<string>('');
  const [customAnswerInput, setCustomAnswerInput] = useState<string>('');
  const [currentAnswerReceived, setCurrentAnswerReceived] = useState<string>('');
  const [currentQuestionReceived, setCurrentQuestionReceived] = useState<string>('');

  // Per-question rating inputs
  const [selectedUserRating, setSelectedUserRating] = useState<number>(5);
  const [selectedReactionTag, setSelectedReactionTag] = useState<string>('أعجبني بشدة ❤️');
  const [customFeedbackComment, setCustomFeedbackComment] = useState<string>('');

  // End of level mutual evaluation
  const [myLevelRating, setMyLevelRating] = useState<number>(5);
  const [myLevelApproval, setMyLevelApproval] = useState<boolean | null>(null);
  const [partnerLevelApproval, setPartnerLevelApproval] = useState<boolean | null>(null);

  // Final Level Decision (الرضى أو عدم الرضى)
  const [myFinalChoice, setMyFinalChoice] = useState<'accept' | 'reject' | null>(null);
  const [partnerFinalChoice, setPartnerFinalChoice] = useState<'accept' | 'reject' | null>(null);
  const [isCurtainDropped, setIsCurtainDropped] = useState<boolean>(false);

  // History of answers and ratings
  const [answersHistory, setAnswersHistory] = useState<BlindDateAnswerRecord[]>([]);

  // Open Chat state & Voice Message
  interface OpenChatMessage {
    id: string;
    sender: 'me' | 'partner';
    text: string;
    time: string;
    voiceData?: {
      audioUrl?: string;
      duration: number;
      analysis?: VoiceToneAnalysisResult;
    };
  }

  const [openChatInput, setOpenChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<OpenChatMessage[]>([]);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [currentlyPlayingAudioUrl, setCurrentlyPlayingAudioUrl] = useState<string | null>(null);
  const activeAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handlePlayVoiceAudio = (url?: string) => {
    if (!url) return;
    if (activeAudioPlayerRef.current) {
      activeAudioPlayerRef.current.pause();
    }
    if (currentlyPlayingAudioUrl === url) {
      setCurrentlyPlayingAudioUrl(null);
      return;
    }

    const audio = new Audio(url);
    activeAudioPlayerRef.current = audio;
    setCurrentlyPlayingAudioUrl(url);
    audio.play();
    audio.onended = () => {
      setCurrentlyPlayingAudioUrl(null);
    };
  };

  // Fallback / simulated partner defaults
  const isTargetFemale = profile?.partnerGender !== 'male';
  const defaultPartnerName =
    result?.proposedPartnerName || (isTargetFemale ? 'سارة العلي' : 'فيصل الراشد');
  const partnerName = livePartner?.userName || defaultPartnerName;
  const partnerAge = livePartner?.userAge || profile?.userAge || 26;
  const partnerCountry = livePartner?.country || profile?.country || 'المملكة العربية السعودية';
  const isReal = participantMode === 'real_person' && (liveIsRealPerson || !!livePartner);

  // Current stage definition
  const currentStage = BLIND_DATE_STAGES[currentStageIdx] || BLIND_DATE_STAGES[0];
  const currentQuestionItem = currentStage.questions[questionTurnIdx] || currentStage.questions[0];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, liveMessages]);

  // When live partner matches via WebSocket, switch from setup to start the show
  useEffect(() => {
    if (livePartner && subStep === 'setup_mode') {
      setParticipantMode('real_person');
      setSubStep('user_ask');
      soundManager.playResultReveal();
    }
  }, [livePartner, subStep]);

  // Real-time synchronization of Blind Date events between two real users
  useEffect(() => {
    if (!latestBlindDateEvent) return;
    const { event, data } = latestBlindDateEvent;

    if (event === 'question_asked') {
      soundManager.playTap();
      setCurrentQuestionReceived(data.question);
      setSubStep('user_answer');
    } else if (event === 'answer_submitted') {
      soundManager.playTap();
      setCurrentAnswerReceived(data.answer);
      setSubStep('user_rate');
    } else if (event === 'rating_submitted') {
      soundManager.playTap();
      // Record partner's rating for my answer
      setAnswersHistory((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last) {
          last.partnerRatingForUser = data.stars;
          last.partnerReactionComment = data.tag;
        }
        return copy;
      });

      // Advance turn or go to stage evaluation
      if (questionTurnIdx < 4) {
        setQuestionTurnIdx((prev) => prev + 1);
        setSubStep('user_ask');
      } else {
        setSubStep('stage_evaluation');
        soundManager.playRoundPass();
      }
    } else if (event === 'stage_evaluated') {
      setPartnerLevelApproval(data.approved);
    } else if (event === 'final_decision_submitted') {
      setPartnerFinalChoice(data.choice);
    } else if (event === 'voice_note') {
      soundManager.playRoundPass();
      const record = data.voiceData;
      setChatMessages((prev) => [
        ...prev,
        {
          id: `partner_voice_${Date.now()}`,
          sender: 'partner',
          text: `🎙️ رسالة صوتية من ${partnerName} (${record.duration || 5}ث) • ${record.analysis?.voiceToneArchetype || 'نبرة صوتية متوافقة'}`,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          voiceData: record,
        },
      ]);
    }
  }, [latestBlindDateEvent, questionTurnIdx]);

  if (!isOpen) return null;

  // --- ACTIONS ---

  // 1. User asks question to partner
  const handleUserAskQuestion = (qText: string) => {
    const question = qText.trim() || currentQuestionItem.questionAr;
    soundManager.playTap();

    setAnswersHistory((prev) => [
      ...prev,
      {
        stageKey: currentStage.key,
        questionIndex: questionTurnIdx,
        userAskedQuestion: question,
      },
    ]);

    setCustomQuestionInput('');
    setSubStep('partner_answer');

    if (isReal) {
      sendBlindDateEvent('question_asked', {
        question,
        stageKey: currentStage.key,
        questionIndex: questionTurnIdx,
      });
    } else {
      // AI Simulation mode: simulated partner response
      setTimeout(() => {
        setCurrentAnswerReceived(currentQuestionItem.partnerPresetAnswer || 'إجابة نابعة من العقل والقلب بتوازن.');
        setSubStep('user_rate');
        soundManager.playTap();
      }, 1600);
    }
  };

  // 2. User rates partner's answer for this specific question
  const handleUserRatePartner = (stars: number, tag: string, comment?: string) => {
    soundManager.playTap();
    setSelectedUserRating(stars);
    setSelectedReactionTag(tag);

    setAnswersHistory((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];
      if (last) {
        last.userRatingForPartner = stars;
        last.userReactionComment = comment ? `${tag} (${comment})` : tag;
        last.partnerAnswer = currentAnswerReceived || currentQuestionItem.partnerPresetAnswer;
      }
      return copy;
    });

    setCustomFeedbackComment('');

    if (isReal) {
      sendBlindDateEvent('rating_submitted', { stars, tag, comment });
    }

    // Role reverse: Partner asks user a question
    setSubStep('partner_ask');

    if (!isReal) {
      setTimeout(() => {
        setCurrentQuestionReceived(currentQuestionItem.partnerQuestionToUser || 'ما رأيك في التوافق بيننا؟');
        setSubStep('user_answer');
        soundManager.playTap();
      }, 1400);
    }
  };

  // 3. User submits answer to partner's question
  const handleUserAnswerPartner = (ansText: string) => {
    const answer = ansText.trim() || customAnswerInput.trim() || currentQuestionItem.userSuggestedAnswers?.[0] || 'إجابة تنبع من الاحترام المتبادل والصدق.';
    soundManager.playTap();

    setAnswersHistory((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];
      if (last) {
        last.partnerAskedQuestion = currentQuestionReceived || currentQuestionItem.partnerQuestionToUser;
        last.userAnswer = answer;
      }
      return copy;
    });

    setCustomAnswerInput('');
    setSubStep('partner_rate');

    if (isReal) {
      sendBlindDateEvent('answer_submitted', { answer });
    } else {
      // AI Simulation: Partner rates user after 1.8s
      setTimeout(() => {
        soundManager.playTap();
        setAnswersHistory((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last) {
            last.partnerRatingForUser = 5;
            last.partnerReactionComment = 'إجابة ممتازة وراقية جداً! 🌟';
          }
          return copy;
        });

        // If turn < 4, go to next question; otherwise go to Stage Evaluation
        if (questionTurnIdx < 4) {
          setQuestionTurnIdx((prev) => prev + 1);
          setSubStep('user_ask');
        } else {
          setSubStep('stage_evaluation');
          soundManager.playRoundPass();
        }
      }, 1800);
    }
  };

  // 4. End of Level Mutual Evaluation
  const handleLevelVote = (approved: boolean) => {
    soundManager.playTap();
    setMyLevelApproval(approved);

    if (isReal) {
      sendBlindDateEvent('stage_evaluated', { approved, rating: myLevelRating });
    } else {
      // AI simulation partner automatically approves
      setTimeout(() => {
        setPartnerLevelApproval(true);
      }, 1000);
    }
  };

  // Advance to next level after both approve
  const handleAdvanceToNextLevel = () => {
    soundManager.playRoundPass();
    soundManager.playApplause();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#a855f7', '#fbbf24', '#10b981'],
    });

    setMyLevelApproval(null);
    setPartnerLevelApproval(null);

    if (currentStageIdx < 3) {
      setCurrentStageIdx((prev) => prev + 1);
      setQuestionTurnIdx(0);
      setSubStep('user_ask');
    } else {
      // Completed all 4 levels -> Move to Final Reveal / Curtain Choice
      setSubStep('final_curtain');
      soundManager.playHeartbeat();
    }
  };

  // 5. Final Level Decision: التحدث مع بعضهم (Accept) أو عدم الرضى (Reject)
  const handleFinalDecision = (choice: 'accept' | 'reject') => {
    soundManager.playTap();
    setMyFinalChoice(choice);
    soundManager.playHeartbeat();

    if (isReal) {
      sendBlindDateEvent('final_decision_submitted', { choice });
    } else {
      // AI partner choice: accepts if user accepts, rejects if user rejects
      setTimeout(() => {
        setPartnerFinalChoice(choice);
        processFinalOutcome(choice, choice);
      }, 1600);
    }
  };

  // Check if both made final decisions in real mode
  useEffect(() => {
    if (myFinalChoice && partnerFinalChoice && subStep === 'final_curtain') {
      processFinalOutcome(myFinalChoice, partnerFinalChoice);
    }
  }, [myFinalChoice, partnerFinalChoice, subStep]);

  const processFinalOutcome = (userC: 'accept' | 'reject', partnerC: 'accept' | 'reject') => {
    if (userC === 'accept' && partnerC === 'accept') {
      // BOTH ACCEPT -> Drop Curtain & Open Chat!
      setIsCurtainDropped(true);
      soundManager.playApplause();
      soundManager.playResultReveal();

      confetti({
        particleCount: 180,
        spread: 110,
        origin: { y: 0.5 },
        colors: ['#ff1493', '#9400d3', '#ffd700', '#00ffff', '#10b981'],
      });

      setTimeout(() => {
        setSubStep('open_chat');
        setChatMessages([
          {
            id: 'welcome_1',
            sender: 'partner',
            text: `🎉 مبروك لنا إسقاط الستار بعد إتمام مراحل التوافق الأربع والموافقة المتبادلة! يسعدني جداً اللقاء المباشر والحديث معك بكل حرية.`,
            time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 2500);
    } else {
      // EITHER REJECTS -> Curtain Remains Closed
      setIsCurtainDropped(false);
      setSubStep('show_rejected');
    }
  };

  // Open Chat Message Send
  const handleSendOpenChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!openChatInput.trim()) return;

    const text = openChatInput.trim();
    soundManager.playTap();
    const timeStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    const now = Date.now();

    // Track user exchange
    const existing = loadSavedChatCadenceExchanges() || [];
    const userEx: ChatExchangeTiming = {
      sender: 'user',
      timestampMs: now,
      messageLengthChars: text.length,
      wordCount: text.split(/\s+/).filter(Boolean).length,
    };
    saveChatCadenceExchanges([...existing, userEx]);

    setChatMessages((prev) => [
      ...prev,
      { id: `me_${now}`, sender: 'me', text, time: timeStr },
    ]);
    setOpenChatInput('');

    if (isReal) {
      sendMessage(text);
    } else {
      const simulatedDelay = 1800 + Math.floor(Math.random() * 800);
      setTimeout(() => {
        const simulatedReplies = [
          `كلماتك راقية وتصل للقلب مباشرة؛ ما تحدثنا عنه خلف الستار أثبت لي صدقك ونقاءك. 💖`,
          `أجمل ما في هذا اللقاء هو التوافق الفكري والروحي الذي اختبرناه في كل مرحلة. ✨`,
          `أنا ممتن جداً لهذه التجربة، وأتطلع لصنع مستقبل جميل مليء بالاحترام والمودة. 🌹`,
        ];
        const randomReply = simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)];
        const pNow = Date.now();
        const partnerEx: ChatExchangeTiming = {
          sender: 'partner',
          timestampMs: pNow,
          messageLengthChars: randomReply.length,
          wordCount: randomReply.split(/\s+/).filter(Boolean).length,
          latencyFromPreviousMs: simulatedDelay,
        };
        saveChatCadenceExchanges([...(loadSavedChatCadenceExchanges() || []), partnerEx]);

        soundManager.playTap();
        setChatMessages((prev) => [
          ...prev,
          {
            id: `partner_${pNow}`,
            sender: 'partner',
            text: randomReply,
            time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, simulatedDelay);
    }
  };

  // Open Chat Voice Message Send
  const handleSendVoiceMessage = (record: {
    audioUrl?: string;
    duration: number;
    analysis?: VoiceToneAnalysisResult;
  }) => {
    soundManager.playTap();
    const timeStr = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    const synergy = record.analysis?.vocalSynergyScore || 96;
    const archetype = record.analysis?.voiceToneArchetype || 'النبرة الدافئة والمطمئنة';

    const voiceMsg: OpenChatMessage = {
      id: `me_voice_${Date.now()}`,
      sender: 'me',
      text: `🎙️ رسالة صوتية (${record.duration}ث) • ${archetype}`,
      time: timeStr,
      voiceData: record,
    };

    setChatMessages((prev) => [...prev, voiceMsg]);

    if (isReal) {
      sendBlindDateEvent('voice_note', {
        voiceData: record,
      });
    } else {
      setTimeout(() => {
        soundManager.playRoundPass();
        const partnerReplyText =
          record.analysis?.partnerAcousticReaction ||
          `شعرتُ بارتياح وسكينة كبيرة عند سماع نبرة صوتك؛ فيها صدق وهدوء يجعل الحديث معك ممتعاً ومطمئناً للقلب.`;

        const partnerMsg: OpenChatMessage = {
          id: `partner_voice_${Date.now()}`,
          sender: 'partner',
          text: `🎙️ رد صوتي من ${partnerName}: "${partnerReplyText}"`,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          voiceData: {
            duration: 5,
            analysis: {
              voiceToneArchetype: isTargetFemale
                ? 'النبرة العذبة الرقيقة والإشراق المطمئن'
                : 'النبرة الرزينة الدافئة والحضور الوقور',
              vocalSynergyScore: synergy,
              emotionalTones: [
                { name: 'الدفء والسكينة', score: 96, description: 'نبرة هادئة تبعث على الأمان النفسي والارتياح الفوري للطرف الآخر' },
                { name: 'الصدق والعفوية', score: 95, description: 'خلو النبرة من التصنع مما يعزز الثقة العاطفية المتبادلة' },
                { name: 'الرزانة والاتزان', score: 98, description: 'إيقاع حوار متزن وناضج يعكس النضج الفكري والوقار' },
                { name: 'الود والشغف', score: 93, description: 'طاقة إيجابية لطيفة تضفي دفئاً ورونقاً على حواركما' },
              ],
              acousticProfile: {
                pitchDescription: isTargetFemale ? 'طبقة أنثوية عذبة، هادئة ومفعمة بالرقة' : 'طبقة رجولية دافئة ومتزنة ومريحة للأذن',
                cadence: 'إيقاع هادئ وموزون يمنح كل كلمة حقها من التعبير',
                resonance: 'رنين عاطفي إيجابي يخلق انطباعاً مهدئاً وجذاباً',
              },
              vocalCompatibilityReport: `تتميز نبرة صوتك بانسجام استثنائي مع شخصية (${partnerName})؛ حيث يجمع الصوت بين الهدوء المريح والوضوح الصادق، مما يمنح الشريك شعوراً فورياً بالأمان النفسي والرغبة في الاستماع دون تردد. هذا التردد الصوتي المتزن يكمل طبقة وطبيعة (${partnerName})، ويبشر بمحادثات مستقبلية يسودها التفاهم والتناغم التام.`,
              communicationTip: 'استمرا في هذا الأسلوب الحواري الهادئ، فالتوافق الصوتي يعزز التفاهم السريع وبناء الثقة.',
              partnerAcousticReaction: partnerReplyText,
            },
          },
        };
        setChatMessages((prev) => [...prev, partnerMsg]);
      }, 2200);
    }
  };

  // Copy Room Code Helper
  const handleCopyCode = () => {
    if (privateRoomCode) {
      soundManager.playTap();
      navigator.clipboard.writeText(privateRoomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  // Average compatibility rating calculated mathematically from actual ratings history
  const allRatings: number[] = [];
  answersHistory.forEach((rec) => {
    if (rec.userRatingForPartner) allRatings.push(rec.userRatingForPartner);
    if (rec.partnerRatingForUser) allRatings.push(rec.partnerRatingForUser);
  });

  const averageStars =
    allRatings.length > 0
      ? (allRatings.reduce((acc, curr) => acc + curr, 0) / allRatings.length).toFixed(1)
      : '5.0';

  const compatibilityPercent =
    allRatings.length > 0
      ? Math.min(100, Math.round((Number(averageStars) / 5) * 100))
      : 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl overflow-hidden"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="w-full max-w-4xl h-[92vh] max-h-[880px] bg-slate-950 border border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        {/* Top Header */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-600 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-rose-500/25">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-['Alexandria'] tracking-wide">
                  The Blind Date
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-[10px] text-rose-300 font-extrabold flex items-center gap-1">
                  <span>اللقاء التوافقي التفاعلي</span>
                  <span>✨</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                طرح الأسئلة • مكان مخصص للإجابة • تقييم متبادل لكل سؤال • تقييم نهاية كل مستوى • قرار الدردشة أو عدم الرضى
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Real Person vs AI Badge */}
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                isReal
                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                  : 'bg-purple-500/20 border-purple-400/30 text-purple-200'
              }`}
            >
              {isReal ? <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5" />}
              <span>{isReal ? 'شخصان حقيقيان 🟢' : 'شريك ذكي 🤖'}</span>
            </span>

            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Stage Progressive Timeline Bar */}
        {subStep !== 'setup_mode' && (
          <div className="bg-slate-900/90 border-b border-white/5 px-3 py-2 shrink-0">
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {BLIND_DATE_STAGES.map((st, idx) => {
                const isPast = idx < currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                return (
                  <div
                    key={st.key}
                    className={`p-1.5 sm:p-2 rounded-xl border text-center transition-all ${
                      isCurrent
                        ? `bg-gradient-to-r ${st.color}/20 border-rose-400/60 shadow-md shadow-rose-500/10`
                        : isPast
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-white/5 border-white/5 text-gray-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold">
                      <span>{isPast ? '✅' : st.icon}</span>
                      <span className="hidden sm:inline">المستوى {st.stepNumber}:</span>
                      <span className="truncate">{st.badgeAr}</span>
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">
                      {isPast ? 'تم الاجتياز والتقييم' : isCurrent ? `السؤال ${questionTurnIdx + 1} من 5` : 'مقفلة 🔒'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Body Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col justify-between">
          {/* STATE 0: SETUP MODE (Choose Real Person or AI Simulation) */}
          {subStep === 'setup_mode' && (
            <div className="my-auto max-w-xl mx-auto w-full space-y-5 text-center py-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 flex items-center justify-center text-4xl shadow-xl shadow-rose-500/30"
              >
                💬
              </motion.div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-white font-['Alexandria']">
                  اختر نمط المشاركة في The Blind Date
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  يمكن لشخصين حقيقيين الدخول والتعارف وطرح الأسئلة وتقييم بعضهما البعض لكل سؤال وفي نهاية كل مستوى، أو بدء جلسة فورية مع شريك افتراضي ذكي.
                </p>
              </div>

              {/* Two Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
                {/* Option 1: Real Person */}
                <div
                  onClick={() => setParticipantMode('real_person')}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    participantMode === 'real_person'
                      ? 'bg-rose-500/15 border-rose-500 shadow-md shadow-rose-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👥</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      مباشر وحقيقي 🟢
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    شخصان حقيقيان (Real People)
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    ادخل مع شخص حقيقي متواجد الآن، أو أنشئ رمز غرفة وشاركه مع الطرف الآخر للدخول معاً فوراً.
                  </p>
                </div>

                {/* Option 2: AI Simulation */}
                <div
                  onClick={() => setParticipantMode('ai_simulation')}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    participantMode === 'ai_simulation'
                      ? 'bg-purple-500/15 border-purple-500 shadow-md shadow-purple-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🤖</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                      فوري وممتع ✨
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    شريك تفاعلي ذكي (AI Match)
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    ابدأ الجلسة فوراً مع شريك ذكي يطابق تفضيلاتك الثقافية والعمرية دون انتظار أحد.
                  </p>
                </div>
              </div>

              {/* Real Person Actions: Create Room Code or Join Code */}
              {participantMode === 'real_person' ? (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-right">
                  <div className="flex items-center justify-between text-xs text-rose-300 font-bold">
                    <span>خيارات الربط المباشر لشخصين حقيقيين:</span>
                    <span className="text-[10px] text-gray-400">متصلون الآن: {onlineCount}</span>
                  </div>

                  {/* Private Room Code Display / Creation */}
                  {privateRoomCode ? (
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-center space-y-2">
                      <span className="text-xs text-gray-300 block">
                        شارك هذا الرمز مع الطرف الآخر للدخول معك فوراً:
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xl font-mono font-black text-amber-300 tracking-widest bg-black/50 px-4 py-1.5 rounded-xl border border-amber-400/40">
                          {privateRoomCode}
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                          title="نسخ الرمز"
                        >
                          {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 animate-pulse">
                        في انتظار دخول الطرف الآخر إلى الغرفة...
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => createPrivateRoom()}
                        className="p-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>إنشاء غرفة خاصة برمز مشاركة</span>
                      </button>

                      <button
                        onClick={startSearch}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>البحث التلقائي عن شخص متصل الآن</span>
                      </button>
                    </div>
                  )}

                  {/* Join with existing Code */}
                  <div className="pt-2 border-t border-white/10 flex gap-2">
                    <input
                      type="text"
                      value={roomCodeInput}
                      onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                      placeholder="أدخل رمز الغرفة (مثال: DATE-1234)..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs font-mono uppercase focus:outline-none focus:border-rose-400"
                    />
                    <button
                      onClick={() => {
                        if (roomCodeInput.trim()) joinPrivateRoom(roomCodeInput.trim());
                      }}
                      disabled={!roomCodeInput.trim()}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer disabled:opacity-40"
                    >
                      انضمام
                    </button>
                  </div>

                  {roomErrorMessage && (
                    <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{roomErrorMessage}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setSubStep('user_ask');
                    }}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:opacity-95 text-white font-extrabold text-sm transition cursor-pointer shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                  >
                    <span>بدء جلسة اللقاء مع الشريك الذكي الآن 🚀</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* THE ICONIC BLIND DATE DIVIDER CURTAIN */}
          {subStep !== 'setup_mode' && subStep !== 'open_chat' && subStep !== 'show_rejected' && (
            <div className="relative mb-3 p-3 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-rose-950/40 border border-white/10 shrink-0">
              <div className="grid grid-cols-2 gap-2 relative">
                {/* Person 1 (User Podium) */}
                <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-2xl text-white shadow-lg shadow-rose-500/20 mb-1.5">
                    {profile?.userGender === 'female' ? '👩' : '👨'}
                  </div>
                  <span className="text-xs font-bold text-white truncate max-w-[130px]">
                    {profile?.userName || 'أنت (المتسابق الأول)'}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {profile?.country} • {profile?.userAge} سنة
                  </span>
                </div>

                {/* Person 2 (Partner Podium - Behind Curtain) */}
                <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/5 text-center relative overflow-hidden">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center text-2xl text-white/40 shadow-inner shadow-purple-500/20 mb-1.5 relative">
                    <span className="filter blur-sm">
                      {isTargetFemale ? '👩' : '👨'}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-rose-300">
                      🔒 خلف الستار
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white truncate max-w-[130px]">
                    {partnerName}
                  </span>
                  <span className="text-[10px] text-purple-300">
                    {isReal ? 'متصل حقيقي 🟢' : `${partnerCountry} • ${partnerAge} سنة`}
                  </span>
                </div>

                {/* RED/GOLD DIVIDER CURTAIN */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 bg-gradient-to-b from-rose-800 via-red-900 to-rose-950 border-x-2 border-amber-400/50 shadow-2xl flex flex-col items-center justify-center z-10 rounded-sm">
                  <div className="text-[8px] font-black text-amber-300 uppercase tracking-widest [writing-mode:vertical-rl] py-1">
                    الستار الفاصل
                  </div>
                  <Lock className="w-3 h-3 text-amber-300 animate-pulse my-0.5" />
                </div>
              </div>

              {/* Status Header Bar */}
              <div className="mt-2.5 flex items-center justify-between px-3 py-1 rounded-xl bg-white/5 text-[11px] text-gray-300">
                <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>توافق المرحلة: {compatibilityPercent}%</span>
                </span>
                <span className="text-rose-300 font-medium truncate max-w-[200px]">
                  {currentStage.titleAr}
                </span>
              </div>
            </div>
          )}

          {/* DYNAMIC STAGES & TURNS */}
          <div className="flex-1 flex flex-col justify-center">
            {/* STEP 1: User Asks Question */}
            {subStep === 'user_ask' && (
              <motion.div
                key="sub_user_ask"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/50 via-purple-950/40 to-slate-900 border border-rose-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                      سؤالك رقم ({questionTurnIdx + 1} من 5) للشريك
                    </span>
                    <span className="text-xs text-gray-400">دورك في طرح السؤال 🎤</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-relaxed">
                    {currentQuestionItem.questionAr}
                  </h3>
                  {currentQuestionItem.subtitleAr && (
                    <p className="text-xs text-gray-400">💡 {currentQuestionItem.subtitleAr}</p>
                  )}
                </div>

                {/* Question Prompt Selection */}
                <div className="space-y-2">
                  <span className="text-xs text-gray-300 font-bold block">
                    اختر صيغة السؤال أو اكتب سؤالك الخاص:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentQuestionItem.optionsAr.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleUserAskQuestion(opt)}
                        className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/40 text-right text-xs text-gray-200 transition cursor-pointer flex items-start gap-2"
                      >
                        <span className="text-rose-400 font-bold shrink-0">{i + 1}.</span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Question Input Box */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={customQuestionInput}
                      onChange={(e) => setCustomQuestionInput(e.target.value)}
                      placeholder="أو اكتب سؤالك المخصص للشريك هنا..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-rose-400"
                    />
                    <button
                      onClick={() => handleUserAskQuestion(customQuestionInput)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-90 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>طرح السؤال</span>
                      <Send className="w-3.5 h-3.5 -rotate-90" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Waiting for Partner's Answer */}
            {subStep === 'partner_answer' && (
              <motion.div
                key="sub_partner_answer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-3xl animate-pulse">
                  ✍️
                </div>
                <h4 className="text-base font-bold text-white">
                  {partnerName} يكتب إجابته الآن في المكان المخصص خلف الستار...
                </h4>
                <div className="flex justify-center items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </motion.div>
            )}

            {/* STEP 3: User Rates Partner's Answer (تقييم الطرف الآخر للإجابة) */}
            {subStep === 'user_rate' && (
              <motion.div
                key="sub_user_rate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Received Answer Display */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-purple-900/40 border border-purple-500/40">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold">
                      إجابة {partnerName} من خلف الستار 🎙️
                    </span>
                  </div>
                  <blockquote className="text-sm sm:text-base text-gray-100 italic leading-relaxed">
                    «{currentAnswerReceived || currentQuestionItem.partnerPresetAnswer}»
                  </blockquote>
                </div>

                {/* Rating Form */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">
                      قيم إجابة الشريك (1 إلى 5 نجوم):
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setSelectedUserRating(s);
                          }}
                          className="p-1 cursor-pointer transition hover:scale-125"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              s <= selectedUserRating
                                ? 'fill-amber-400 text-amber-400 drop-shadow'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reaction Tag Selection */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-gray-400">انطباعك عن الإجابة:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'أعجبني بشدة ❤️',
                        'ذكي ومقنع 💡',
                        'عميق ومتزن 👑',
                        'متطابق مع قيمي 🎯',
                        'يحتاج توضيح 🤔',
                      ].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedReactionTag(tag)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            selectedReactionTag === tag
                              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Feedback Comment */}
                  <input
                    type="text"
                    value={customFeedbackComment}
                    onChange={(e) => setCustomFeedbackComment(e.target.value)}
                    placeholder="ملاحظة إضافية أو تعليق للشريك على إجابته (اختياري)..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-rose-400"
                  />

                  <button
                    onClick={() => handleUserRatePartner(selectedUserRating, selectedReactionTag, customFeedbackComment)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-90 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                  >
                    <span>اعتماد تقييم الإجابة والانتقال لسؤال الشريك ⭐</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Partner Asks Question */}
            {subStep === 'partner_ask' && (
              <motion.div
                key="sub_partner_ask"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-3"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-3xl animate-bounce">
                  🎤
                </div>
                <h4 className="text-base font-bold text-white">
                  الدور الآن على {partnerName} لطرح سؤاله لك من خلف الستار!
                </h4>
                <p className="text-xs text-gray-400">استعد لكتابة إجابتك في المكان المخصص...</p>
              </motion.div>
            )}

            {/* STEP 5: User Answers in Dedicated Place (مكان مخصص للإجابة) */}
            {subStep === 'user_answer' && (
              <motion.div
                key="sub_user_answer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* Partner Question Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-rose-950/40 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                      سؤال {partnerName} لك ❓
                    </span>
                    <span className="text-xs text-gray-400">اكتب إجابتك ليقوم الشريك بتقييمها</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    «{currentQuestionReceived || currentQuestionItem.partnerQuestionToUser}»
                  </h3>
                </div>

                {/* DEDICATED ANSWER INPUT FIELD (طلب المستخدم: مكان مخصص للإجابة) */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-300 font-bold">
                    <span>مكان الإجابة المخصص (اكتب ردك بحرية كاملة):</span>
                    <span className="text-[10px] text-rose-300">الطرف الآخر سيقوم بتقييم هذا الرد</span>
                  </div>

                  <textarea
                    rows={3}
                    value={customAnswerInput}
                    onChange={(e) => setCustomAnswerInput(e.target.value)}
                    placeholder="اكتب إجابتك الصادقة والمفصلة هنا بكلماتك وأسلوبك الخاص..."
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-rose-400 leading-relaxed resize-none"
                  />

                  {/* Quick Inspiration Options */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-gray-400 block">أو اختر إجابة سريعة للإلهام:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {currentQuestionItem.userSuggestedAnswers?.map((ans, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCustomAnswerInput(ans)}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-right text-[11px] text-gray-300 transition cursor-pointer"
                        >
                          {ans}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUserAnswerPartner(customAnswerInput)}
                    disabled={!customAnswerInput.trim()}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:opacity-95 text-white font-bold text-xs transition cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
                  >
                    <span>إرسال إجابتي ليقوم الشريك بتقييمها 🚀</span>
                    <Send className="w-3.5 h-3.5 -rotate-90" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Partner Rating User */}
            {subStep === 'partner_rate' && (
              <motion.div
                key="sub_partner_rate"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl animate-spin">
                  ⭐
                </div>
                <h4 className="text-base font-bold text-white">
                  {partnerName} يقرأ إجابتك الآن ويقوم بتقييمها خلف الستار...
                </h4>
                <p className="text-xs text-gray-300">
                  سيتم تسجيل درجات التقييم في سجل التوافق فوراً.
                </p>
              </motion.div>
            )}

            {/* STEP 7: End of Level Mutual Evaluation (وفي نهاية كل مستوى يقوموا أيضا بتقييم بعضهم) */}
            {subStep === 'stage_evaluation' && (
              <motion.div
                key="sub_stage_eval"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-purple-950/80 to-slate-900 border-2 border-amber-500/50 text-center space-y-4 shadow-2xl"
              >
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-3xl text-white shadow-lg shadow-amber-500/30">
                  🏆
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-black text-white font-['Alexandria']">
                    تقييم نهاية المستوى {currentStage.stepNumber}: {currentStage.badgeAr}
                  </h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                    أكملتما تبادل الأسئلة الخمسة وإجاباتها وتقييماتها بنجاح! والآن يقوم كل طرف بتقييم التوافق الإجمالي لهذا المستوى والتصويت على التأهل للمستوى القادم.
                  </p>
                </div>

                {/* Rating Stars for this Level */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto space-y-2">
                  <span className="text-xs font-bold text-amber-300 block">
                    تقييمك الإجمالي للشريك في هذا المستوى:
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setMyLevelRating(s)}
                        className="cursor-pointer hover:scale-125 transition"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            s <= myLevelRating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vote to Pass to Next Level */}
                <div className="max-w-md mx-auto space-y-2">
                  <span className="text-xs text-gray-200 font-bold block">
                    هل توافق على استمرار الشريك والتأهل للمستوى التالي؟
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleLevelVote(true)}
                      className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        myLevelApproval === true
                          ? 'bg-emerald-500 text-white border-emerald-400'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>نعم، راضٍ وموافق 🚀</span>
                    </button>

                    <button
                      onClick={() => handleLevelVote(false)}
                      className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        myLevelApproval === false
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>غير راضٍ عن التوافق</span>
                    </button>
                  </div>
                </div>

                {/* Advance Button if Both Agree */}
                {myLevelApproval === true && (
                  <div className="pt-2">
                    <button
                      onClick={handleAdvanceToNextLevel}
                      className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-rose-600 hover:opacity-95 text-white font-extrabold text-sm transition cursor-pointer shadow-xl shadow-emerald-500/20 mx-auto flex items-center justify-center gap-2"
                    >
                      <span>
                        {currentStageIdx < 3
                          ? `الانتقال للمستوى ${currentStageIdx + 2}: ${BLIND_DATE_STAGES[currentStageIdx + 1]?.badgeAr} 🚀`
                          : 'الانتقال للحظة الحسم والقرار النهائي لإسقاط الستار! ✨'}
                      </span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 8: FINAL LEVEL (واخر مستوى يتم تخييرهم للتحدث مع بعضهم او عدم الرضى) */}
            {subStep === 'final_curtain' && (
              <motion.div
                key="sub_final_curtain"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-rose-950/80 via-slate-900 to-purple-950/80 border-2 border-rose-500/50 text-center space-y-5 shadow-2xl relative overflow-hidden"
              >
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-4xl shadow-xl shadow-rose-500/30 animate-pulse">
                  ✨
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                    لحظة الحسم والقرار النهائي في The Blind Date
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                    لقد أكملتما المستويات الأربعة كاملة (الشخصية، الاجتماعية، العلمية، والطموحات). والآن يُخيّر كل طرف بين:
                    <strong className="text-amber-300 block mt-1 text-sm">
                      «الموافقة والرضى لرفع الستار والدردشة المفتوحة، أو عدم الرضى وإبقاء الستار مغلقاً»
                    </strong>
                  </p>
                </div>

                {/* Status indicator of decisions */}
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-xs">
                  <div
                    className={`p-3 rounded-2xl border transition ${
                      myFinalChoice === 'accept'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : myFinalChoice === 'reject'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <span className="block font-bold mb-1">قرارك أنت:</span>
                    <span>
                      {myFinalChoice === 'accept'
                        ? '💖 راضٍ وموافق على اللقاء'
                        : myFinalChoice === 'reject'
                        ? '🛑 غير راضٍ عن التوافق'
                        : 'في انتظار اختيارك'}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border transition ${
                      partnerFinalChoice === 'accept'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : partnerFinalChoice === 'reject'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <span className="block font-bold mb-1">قرار {partnerName}:</span>
                    <span>
                      {partnerFinalChoice === 'accept'
                        ? '💖 راضٍ وموافق على اللقاء'
                        : partnerFinalChoice === 'reject'
                        ? '🛑 غير راضٍ عن التوافق'
                        : 'يترقب قرارك'}
                    </span>
                  </div>
                </div>

                {/* The Two Choices (الرضى والتحدث مع بعضهم أو عدم الرضى) */}
                {!myFinalChoice ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                    {/* Option A: Accept and Open Chat */}
                    <button
                      onClick={() => handleFinalDecision('accept')}
                      className="py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-white animate-pulse" />
                      <span>راضٍ وأوافق على رفع الستار والدردشة 💖</span>
                    </button>

                    {/* Option B: Dissatisfaction / Reject */}
                    <button
                      onClick={() => handleFinalDecision('reject')}
                      className="py-4 px-5 rounded-2xl bg-gradient-to-r from-rose-700 to-red-800 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer shadow-xl shadow-rose-900/30 flex items-center justify-center gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>عدم الرضى (إبقاء الستار مغلقاً) 🛑</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-2 text-rose-300 text-xs font-bold animate-pulse flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>جاري معالجة قرار الطرفين لحسم نتيجة الستار...</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* OUTCOME A: REJECTED / عدم الرضى (الستار يظل مغلقاً) */}
            {subStep === 'show_rejected' && (
              <motion.div
                key="sub_rejected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-slate-900/90 border-2 border-rose-500/30 text-center space-y-4 max-w-md mx-auto"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-3xl">
                  🔒
                </div>
                <h3 className="text-lg font-bold text-white font-['Alexandria']">
                  ظل الستار مغلقاً لعدم اكتمال الرضى المتبادل
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  شكراً لمشاركتكما الراقية والصريحة في The Blind Date. الاحترام المتبادل والصراحة هما الأهم في تقييم التوافق، ونتمنى لكل منكما التوفيق في إيجاد الشريك المتوافق تماماً!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setCurrentStageIdx(0);
                      setQuestionTurnIdx(0);
                      setMyFinalChoice(null);
                      setPartnerFinalChoice(null);
                      setSubStep('setup_mode');
                    }}
                    className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
                  >
                    بدء جولة جديدة في The Blind Date 💬
                  </button>
                </div>
              </motion.div>
            )}

            {/* OUTCOME B: ACCEPTED -> THE OPEN CHAT (إسقاط الستار والدردشة المفتوحة) */}
            {subStep === 'open_chat' && (
              <motion.div
                key="sub_open_chat"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col h-full space-y-3"
              >
                {/* Reveal Partner Profile Top Banner */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-slate-900 border border-rose-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-2xl shadow-md border-2 border-rose-400">
                      {result?.imageUrl ? (
                        <img
                          src={result.imageUrl}
                          alt={partnerName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{isTargetFemale ? '👩' : '👨'}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">
                          {partnerName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] text-emerald-300 font-bold">
                          سقط الستار بالرضى المتبادل 🟢
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300">
                        {partnerCountry} • {partnerAge} عاماً • توافق {compatibilityPercent}%
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-white/10 text-[10px] text-amber-300 font-bold">
                    الدردشة المفتوحة غير المحدودة 💬
                  </span>
                </div>

                {/* Messages Flow Area */}
                <div className="flex-1 min-h-[220px] max-h-[340px] overflow-y-auto space-y-2.5 p-3 rounded-2xl bg-black/50 border border-white/10 scrollbar-thin">
                  {chatMessages.map((m) => {
                    const isMe = m.sender === 'me';
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5 px-1 text-[10px] text-gray-400">
                          <span>{isMe ? 'أنت' : partnerName}</span>
                          <span>•</span>
                          <span>{m.time}</span>
                        </div>
                        <div
                          className={`max-w-[88%] sm:max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-tr-none shadow-md shadow-rose-500/10'
                              : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/10 shadow-sm'
                          }`}
                        >
                          <p className="font-medium">{m.text}</p>

                          {/* Voice Note Player & Vocal Compatibility Card */}
                          {m.voiceData && (
                            <div className="mt-2.5 pt-2.5 border-t border-white/20 space-y-2">
                              {/* Audio Player Strip */}
                              <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/10">
                                {m.voiceData.audioUrl && (
                                  <button
                                    type="button"
                                    onClick={() => handlePlayVoiceAudio(m.voiceData!.audioUrl)}
                                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shrink-0"
                                    title="تشغيل الملاحظة الصوتية"
                                  >
                                    {currentlyPlayingAudioUrl === m.voiceData.audioUrl ? (
                                      <Pause className="w-3.5 h-3.5 text-rose-300" />
                                    ) : (
                                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                                    )}
                                  </button>
                                )}

                                <div className="flex-1 flex items-center gap-1.5">
                                  <span className="font-mono text-[11px] text-amber-200">
                                    0:0{m.voiceData.duration || 6}
                                  </span>
                                  {/* Waveform bars simulation */}
                                  <div className="flex items-center gap-0.5 h-4 flex-1">
                                    {[10, 16, 22, 14, 26, 18, 14, 20, 12, 18, 10].map((h, i) => (
                                      <span
                                        key={i}
                                        style={{ height: `${h * 0.65}px` }}
                                        className={`w-1 rounded-full inline-block ${
                                          currentlyPlayingAudioUrl === m.voiceData?.audioUrl
                                            ? 'bg-emerald-400 animate-pulse'
                                            : 'bg-white/60'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>

                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                  توافق {m.voiceData.analysis?.vocalSynergyScore || 96}%
                                </span>
                              </div>

                               {/* Voice Tone & Emotion Report */}
                              {m.voiceData.analysis && (
                                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5 text-[11px]">
                                  <div className="flex items-center justify-between text-amber-300 font-bold">
                                    <span className="flex items-center gap-1">
                                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                      <span>{m.voiceData.analysis.voiceToneArchetype}</span>
                                    </span>
                                    <span className="text-[10px] text-gray-300">التحليل الصوتي المتقدم</span>
                                  </div>
                                  <p className="text-gray-200 leading-relaxed text-[11px]">
                                    {m.voiceData.analysis.vocalCompatibilityReport}
                                  </p>
                                  {m.voiceData.analysis.partnerAcousticReaction && (
                                    <div className="text-[10px] text-rose-300 italic pt-1 border-t border-white/10">
                                      انطباع الطرف الآخر: "{m.voiceData.analysis.partnerAcousticReaction}"
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Romantic Prompts */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {[
                    'ما هو أكثر شيء أسعدك في إجاباتي؟ ✨',
                    'أنا ممتن جداً لهذا التوافق واللقاء! 💖',
                    'ما رأيك أن نتفق على كتاب نقرؤه معاً؟ 📚',
                    'يسعدني أن نتحدث دائماً بكل هذا الاحترام والود 🌹',
                  ].map((ice, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setOpenChatInput(ice)}
                      className="shrink-0 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-gray-300 hover:text-white transition cursor-pointer"
                    >
                      {ice}
                    </button>
                  ))}
                </div>

                {/* Message Input Box with Optional Voice Note Feature */}
                <form onSubmit={handleSendOpenChat} className="flex items-center gap-2 pt-1">
                  {/* Optional Voice Recording & Tone Analysis Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setIsVoiceModalOpen(true);
                    }}
                    className="px-3 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 hover:from-rose-500/30 hover:to-purple-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 shadow-sm"
                    title="تسجيل رسالة صوتية قصيرة وتحليل نبرة الصوت والمشاعر والتناغم"
                  >
                    <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                    <span className="hidden sm:inline font-['Alexandria']">تسجيل صوتي وتحليل النبرة 🎙️</span>
                    <span className="sm:hidden">🎙️ صوتي</span>
                  </button>

                  <input
                    type="text"
                    value={openChatInput}
                    onChange={(e) => setOpenChatInput(e.target.value)}
                    placeholder="اكتب رسالتك المفتوحة للشريك بكل مودة واحترام..."
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="submit"
                    disabled={!openChatInput.trim()}
                    className="p-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white transition flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-40"
                  >
                    <span>إرسال</span>
                    <Send className="w-3.5 h-3.5 -rotate-90" />
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>

        {/* Optional Voice Tone Analysis Modal Component */}
        <VoiceToneAnalysisModal
          isOpen={isVoiceModalOpen}
          onClose={() => setIsVoiceModalOpen(false)}
          partnerName={partnerName}
          partnerGender={profile?.partnerGender || 'female'}
          userGender={profile?.userGender || 'male'}
          onSendVoiceMessageToChat={handleSendVoiceMessage}
        />

        {/* Bottom Bar Info */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 shrink-0">
          <div className="flex items-center gap-2">
            <span>💬 جلسة The Blind Date التفاعلية</span>
            <span>•</span>
            <span>نظام إجابة مخصص وتقييم متبادل</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-bold">
              متوسط تقييم الإجابات: {averageStars} ⭐
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
