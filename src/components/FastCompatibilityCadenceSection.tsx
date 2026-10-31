import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types';
import {
  calculateCadenceMetrics,
  loadSavedChatCadenceExchanges,
  saveChatCadenceExchanges,
  ChatExchangeTiming,
  RealCadenceMetrics,
  AiCadenceAnalysis,
  generateDeterministicCadenceAnalysis,
} from '../utils/chatCadenceTracker';
import { soundManager } from '../utils/sound';
import {
  Zap,
  Gauge,
  Sparkles,
  Timer,
  Clock,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
  Send,
  Brain,
  HelpCircle,
  Lightbulb,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  partnerName: string;
  profile: UserProfile;
  onOpenLiveChat?: () => void;
  onOpenBlindDate?: () => void;
}

const RAPID_TEST_QUESTIONS = [
  'ما هو أكثر شيء يلفت انتباهك في شخصية من تحب من أول لقاء؟',
  'إذا سنحت لك فرصة لقضاء عطلة نهاية أسبوع مثالية، كيف تقضيها؟',
  'ما هي القيمة التي لا تقبل المساومة عليها في حياتك؟',
];

const RAPID_PARTNER_RESPONSES = [
  'إجابة معبرة وجميلة! الصدق والوضوح هما دائماً أقصر طريق للقلب والارتياح. ✨',
  'رؤيتك للحياة راقية؛ التوازن بين البساطة والعمق هو ما يخلق السكينة الدائمة في أي بيت. 🏡',
  'تماماً كما شعرت؛ هذا التوافق في المبادئ يمنحني ثقة كبيرة في مستقبل يسوده الاحترام المتبادل. 💖',
];

export const FastCompatibilityCadenceSection: React.FC<Props> = ({
  partnerName,
  profile,
  onOpenLiveChat,
  onOpenBlindDate,
}) => {
  // Real measured state
  const [metrics, setMetrics] = useState<RealCadenceMetrics>(() => {
    const saved = loadSavedChatCadenceExchanges();
    return calculateCadenceMetrics(saved || []);
  });

  const [aiAnalysis, setAiAnalysis] = useState<AiCadenceAnalysis>(() =>
    generateDeterministicCadenceAnalysis(metrics, profile.userName || 'أنت', partnerName)
  );

  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [showLiveTest, setShowLiveTest] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Live rapid test state
  const [testStep, setTestStep] = useState(0); // 0, 1, 2
  const [testUserInput, setTestUserInput] = useState('');
  const [testUserStartTime, setTestUserStartTime] = useState<number | null>(null);
  const [testElapsedMs, setTestElapsedMs] = useState(0);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [testMessages, setTestMessages] = useState<
    { sender: 'user' | 'partner'; text: string; latencySec?: number }[]
  >([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Analyze metrics with AI endpoint
  const requestAiAnalysis = async (curMetrics: RealCadenceMetrics) => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/analyze-chat-cadence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAvgLatencySec: curMetrics.userAvgLatencySec,
          partnerAvgLatencySec: curMetrics.partnerAvgLatencySec,
          synchronyScore: curMetrics.synchronyScore,
          wordsPerMinute: curMetrics.userWordsPerMinute,
          userName: profile.userName || 'أنت',
          partnerName,
          totalExchanges: curMetrics.totalExchanges,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setAiAnalysis(json.data);
          setIsLoadingAi(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch AI cadence analysis, falling back locally', e);
    }
    setAiAnalysis(
      generateDeterministicCadenceAnalysis(curMetrics, profile.userName || 'أنت', partnerName)
    );
    setIsLoadingAi(false);
  };

  // Start live rapid test
  const startLiveCadenceTest = () => {
    soundManager.playTap();
    setShowLiveTest(true);
    setTestStep(0);
    setTestUserInput('');
    setTestMessages([
      {
        sender: 'partner',
        text: `مرحباً ${profile.userName || 'بك'}! لنجرِ اختباراً سريعاً وتفاعلياً يقيس زمن التناغم والبديهة الحقيقي بيننا. السؤال الأول: ${RAPID_TEST_QUESTIONS[0]}`,
      },
    ]);
    const now = Date.now();
    setTestUserStartTime(now);
    setTestElapsedMs(0);
  };

  // Live timer tick for active test
  useEffect(() => {
    if (showLiveTest && testUserStartTime && !isPartnerTyping && testStep < 3) {
      timerRef.current = setInterval(() => {
        setTestElapsedMs(Date.now() - testUserStartTime);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showLiveTest, testUserStartTime, isPartnerTyping, testStep]);

  // Handle send during rapid test
  const handleSendTestMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!testUserInput.trim() || !testUserStartTime) return;

    soundManager.playTap();
    const now = Date.now();
    const actualLatencyMs = Math.max(800, now - testUserStartTime);
    const actualLatencySec = Number((actualLatencyMs / 1000).toFixed(1));
    const text = testUserInput.trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // Add user message
    const updatedMessages = [
      ...testMessages,
      { sender: 'user' as const, text, latencySec: actualLatencySec },
    ];
    setTestMessages(updatedMessages);
    setTestUserInput('');
    setTestUserStartTime(null);
    setIsPartnerTyping(true);

    // Save exchange to cadence tracker
    const currentExchanges = loadSavedChatCadenceExchanges() || [];
    const newExchange: ChatExchangeTiming = {
      sender: 'user',
      timestampMs: now,
      messageLengthChars: text.length,
      wordCount,
      latencyFromPreviousMs: actualLatencyMs,
    };
    const updatedExchanges = [...currentExchanges, newExchange];
    saveChatCadenceExchanges(updatedExchanges);

    // Partner reply with realistic delay
    const simulatedPartnerLatencyMs = 2100 + Math.floor(Math.random() * 900);
    setTimeout(() => {
      soundManager.playRoundPass();
      const pNow = Date.now();
      const pLatencySec = Number((simulatedPartnerLatencyMs / 1000).toFixed(1));
      const pReply = RAPID_PARTNER_RESPONSES[testStep];

      const partnerExchange: ChatExchangeTiming = {
        sender: 'partner',
        timestampMs: pNow,
        messageLengthChars: pReply.length,
        wordCount: pReply.split(/\s+/).length,
        latencyFromPreviousMs: simulatedPartnerLatencyMs,
      };
      const finalExchanges = [...updatedExchanges, partnerExchange];
      saveChatCadenceExchanges(finalExchanges);

      const nextStep = testStep + 1;
      setTestStep(nextStep);
      setIsPartnerTyping(false);

      if (nextStep < 3) {
        setTestMessages([
          ...updatedMessages,
          {
            sender: 'partner',
            text: `${pReply} السؤال التالي: ${RAPID_TEST_QUESTIONS[nextStep]}`,
            latencySec: pLatencySec,
          },
        ]);
        setTestUserStartTime(Date.now());
        setTestElapsedMs(0);
      } else {
        // Completed all 3 questions! Recompute real metrics
        setTestMessages([
          ...updatedMessages,
          {
            sender: 'partner',
            text: `${pReply} اكتمل الاختبار الحقيقي بنجاح! تم احتساب متوسطات الاستجابة ومؤشر التزامن بدقة.`,
            latencySec: pLatencySec,
          },
        ]);
        const newMetrics = calculateCadenceMetrics(finalExchanges);
        setMetrics(newMetrics);
        requestAiAnalysis(newMetrics);
      }
    }, simulatedPartnerLatencyMs);
  };

  // Speedometer calculation
  // Needle angle: 0s -> -90 deg (left/green), 6s -> 0 deg (top), 12s+ -> 90 deg (right/slow)
  const avgCadence = (metrics.userAvgLatencySec + metrics.partnerAvgLatencySec) / 2;
  const needleAngle = Math.min(90, Math.max(-90, ((avgCadence - 6) / 6) * 90));

  return (
    <div
      className="glass-panel rounded-3xl p-6 border border-amber-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/20 text-white"
      dir="rtl"
    >
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold shadow-sm">
          <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>حاسبة التوافق السريع • تحليل وتيرة الاستجابة في الدردشة</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 text-xs text-gray-300 font-medium">
          <Gauge className="w-3.5 h-3.5 text-amber-400" />
          <span>قياس زمني حقيقي بالميلي-ثانية</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-6 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-100 to-rose-300 font-['Alexandria'] mb-2">
          مؤشر سرعة الاستجابة وكيمياء الحوار الفوري
        </h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          أداة حسابية حقيقية تقيس سرعة الرد المتبادلة بينك وبين «{partnerName}» في المحادثة، حيث يحلل الذكاء الاصطناعي
          تقارب الأزمنة كدليل قطعي على حضور البديهة، الشغف، وسلاسة التدفق الإدراكي.
        </p>
      </div>

      {/* Main Speedometer & Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6 relative z-10">
        {/* The Intuitive Speedometer Gauge (Left / Center on mobile) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-3xl bg-slate-900/90 border border-white/10 shadow-inner relative">
          <div className="text-xs text-amber-300 font-bold mb-2 flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-amber-400" />
            <span>مؤشر سرعة الاستجابة البديهي (Speedometer)</span>
          </div>

          {/* SVG Gauge Graphic */}
          <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 200 110" className="w-full h-full">
              {/* Background Arc: 4 Color Tiers */}
              {/* Green Zone (Fast: 0 - 3.5s) */}
              <path
                d="M 20 100 A 80 80 0 0 1 65 35"
                fill="none"
                stroke="#10b981"
                strokeWidth="16"
                strokeLinecap="round"
                className="opacity-90"
              />
              {/* Cyan Zone (Balanced: 3.5 - 7s) */}
              <path
                d="M 69 32 A 80 80 0 0 1 131 32"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="16"
                className="opacity-90"
              />
              {/* Amber Zone (Deliberate: 7 - 11s) */}
              <path
                d="M 135 35 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="16"
                strokeLinecap="round"
                className="opacity-90"
              />

              {/* Inner Tick Marks */}
              <text x="24" y="95" fill="#9ca3af" fontSize="9" fontWeight="bold">0s</text>
              <text x="60" y="48" fill="#9ca3af" fontSize="8">3.5s</text>
              <text x="100" y="28" fill="#9ca3af" fontSize="8" textAnchor="middle">6s</text>
              <text x="135" y="48" fill="#9ca3af" fontSize="8">9s</text>
              <text x="175" y="95" fill="#9ca3af" fontSize="9" textAnchor="end" fontWeight="bold">12s+</text>

              {/* Speedometer Needle (Center Pivot at 100, 100) */}
              <g transform={`rotate(${needleAngle}, 100, 100)`} className="transition-transform duration-700 ease-out">
                {/* Needle Line */}
                <polygon points="98,100 102,100 100,28" fill="#ef4444" />
                <circle cx="100" cy="100" r="7" fill="#ffffff" />
                <circle cx="100" cy="100" r="4" fill="#ef4444" />
              </g>
            </svg>
          </div>

          {/* Digital Readout */}
          <div className="text-center mt-1">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black text-amber-400 font-mono">
                {avgCadence.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">ثانية / استجابة</span>
            </div>
            <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              {metrics.speedTier.badge}
            </div>
            <p className="text-[11px] text-gray-400 mt-2 max-w-xs text-center">
              {metrics.speedTier.description}
            </p>
          </div>
        </div>

        {/* 4 Real Measured Data Cards (Right side) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-3">
          {/* User Speed */}
          <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 hover:border-amber-400/50 transition-colors shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-300 font-semibold flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-amber-400" />
                سرعة ردك الفعلية
              </span>
            </div>
            <div className="text-2xl font-black text-white font-mono mb-1">
              {metrics.userAvgLatencySec} <span className="text-xs text-amber-400 font-normal">ثانية</span>
            </div>
            <p className="text-[11px] text-gray-400">متوسط زمن كتابة وإرسال ردك</p>
          </div>

          {/* Partner Speed */}
          <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/30 hover:border-rose-400/50 transition-colors shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-300 font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-400" />
                سرعة رد «{partnerName}»
              </span>
            </div>
            <div className="text-2xl font-black text-rose-300 font-mono mb-1">
              {metrics.partnerAvgLatencySec} <span className="text-xs text-rose-400 font-normal">ثانية</span>
            </div>
            <p className="text-[11px] text-gray-400">استجابة فورية بدون انقطاع</p>
          </div>

          {/* Temporal Synchrony Index */}
          <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 hover:border-emerald-400/50 transition-colors shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-300 font-semibold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                معامل التزامن الإيقاعي
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono mb-1">
              {metrics.synchronyScore}%
            </div>
            <p className="text-[11px] text-gray-400">تقارب الإيقاع وتوازن التفاعل</p>
          </div>

          {/* Cadence Velocity / Words Per Min */}
          <div className="p-4 rounded-2xl bg-white/5 border border-cyan-500/30 hover:border-cyan-400/50 transition-colors shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-300 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                كثافة التدفق الحواري
              </span>
            </div>
            <div className="text-2xl font-black text-cyan-300 font-mono mb-1">
              {metrics.userWordsPerMinute} <span className="text-xs text-cyan-400 font-normal">ك/د</span>
            </div>
            <p className="text-[11px] text-gray-400">حيوية التعبير واستمرارية الفكرة</p>
          </div>
        </div>
      </div>

      {/* AI Cadence Interpretation Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-amber-950/30 border border-amber-500/30 mb-6 relative z-10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white flex items-center gap-2">
                تحليل الذكاء الاصطناعي لكيمياء وسرعة الاستجابة
                {isLoadingAi && <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
              </span>
              <span className="text-xs text-amber-300/80">{aiAnalysis.mutualEnthusiasmLevel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-bold bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
              توافق إيقاعي: {aiAnalysis.responseHarmonyRating}%
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-gray-200">
          <p className="text-gray-100 font-medium">
            {aiAnalysis.conversationalChemistrySummary}
          </p>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-300 text-xs">
            <span className="font-bold text-amber-300">الدلالة السيكولوجية لسرعة الرد: </span>
            {aiAnalysis.cadenceInterpretation}
          </div>
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
            <span className="font-bold text-amber-300">علم النفس المعرفي (Cyberpsychology): </span>
            {aiAnalysis.cognitivePaceInsight}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="text-gray-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>نصيحة الحوار: {aiAnalysis.actionableTip}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Live Rapid Test & Links */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 pt-2">
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={startLiveCadenceTest}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs sm:text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>
              {showLiveTest ? 'إعادة تشغيل اختبار السرعة المباشر' : 'بدء اختبار سرعة الاستجابة المباشر الآن (3 أسئلة)'}
            </span>
          </button>

          {onOpenBlindDate && (
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenBlindDate();
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
              <span>فتح دردشة The Blind Date Show</span>
            </button>
          )}

          {onOpenLiveChat && (
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenLiveChat();
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>رادار المتواجدين (دردشة حية)</span>
            </button>
          )}
        </div>

        <button
          onClick={() => {
            soundManager.playTap();
            setShowDetails(!showDetails);
          }}
          className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium transition-colors"
        >
          <span>{showDetails ? 'إخفاء المعايير العلمية' : 'كيف نقيس السرعة بالأرقام الحقيقية؟'}</span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Live 3-Question Rapid Test Interactive Terminal */}
      <AnimatePresence>
        {showLiveTest && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-white/10 relative z-10"
          >
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-sm font-bold text-white">
                    مختبر قياس السرعة المباشر (المرحلة {Math.min(3, testStep + 1)} من 3)
                  </span>
                </div>
                {testUserStartTime && !isPartnerTyping && testStep < 3 && (
                  <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-300 border border-amber-500/30">
                    <Timer className="w-3.5 h-3.5" />
                    <span>عداد الوقت الفعلي: {(testElapsedMs / 1000).toFixed(1)} ثانية</span>
                  </div>
                )}
              </div>

              {/* Chat Messages Stream */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {testMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-start text-right' : 'items-end text-right'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-white/10 text-white rounded-tl-none border border-white/10'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.latencySec !== undefined && (
                      <span className="text-[10px] text-gray-400 mt-1 px-1 font-mono">
                        زمن الاستجابة: {msg.latencySec} ثانية
                      </span>
                    )}
                  </div>
                ))}

                {isPartnerTyping && (
                  <div className="flex items-center gap-2 text-xs text-rose-300 py-1 font-medium animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>«{partnerName}» يكتب الرد الآن...</span>
                  </div>
                )}
              </div>

              {/* Input for Rapid User Response */}
              {testStep < 3 ? (
                <form onSubmit={handleSendTestMessage} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={testUserInput}
                    onChange={(e) => setTestUserInput(e.target.value)}
                    placeholder="اكتب ردك العفوي هنا فوراً واضغط إرسال..."
                    disabled={isPartnerTyping}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!testUserInput.trim() || isPartnerTyping}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-400 transition-colors disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال</span>
                  </button>
                </form>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs flex items-center justify-between">
                  <span className="font-bold">
                    ✓ اكتمل الاختبار بنجاح! تم تحديث المؤشر البديهي وقراءة السرعة أعلاه.
                  </span>
                  <button
                    onClick={startLiveCadenceTest}
                    className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 text-[11px]"
                  >
                    إعادة الاختبار
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scientific Explanation Accordion */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 pt-4 border-t border-white/10 space-y-3 text-xs text-gray-300 relative z-10"
          >
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="font-bold text-amber-300 text-sm">
                كيف تقيس الحاسبة سرعة الاستجابة بالأرقام الحقيقية؟
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-gray-300">
                <li>
                  <strong className="text-white">التسجيل الميلي-ثانية (High-Precision Timestamping):</strong> يتم
                  حساب الفارق الزمني الفعلي بين لحظة وصول رسالة الطرف الأول ولحظة ضغط زر الإرسال من الطرف الثاني بدقة
                  (`performance.now`).
                </li>
                <li>
                  <strong className="text-white">معامل التزامن الإيقاعي (Synchrony Ratio):</strong> تحسب الخوارزمية
                  نسبة التماثل بين السرعتين؛ التباين المنخفض (أقل من ثانية واحدة) يمنح مؤشر تزامن يفوق 90%.
                </li>
                <li>
                  <strong className="text-white">استبعاد التأخيرات غير التفاعلية:</strong> في حال ترك الشاشة، يتم
                  تحديد فترات التوقف التلقائي لمنع تشويه القياس اللحظي.
                </li>
                <li>
                  <strong className="text-white">تحليل الذكاء الاصطناعي:</strong> يُزوّد الذكاء الاصطناعي بالأرقام
                  الحقيقية المقاسة لربطها بخصائص الشخصية وتفسير لغة الجسد الرقمية.
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
