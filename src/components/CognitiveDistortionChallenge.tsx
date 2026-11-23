import React, { useState, useEffect, useMemo } from 'react';
import {
  Brain,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  BookOpen,
  TrendingDown,
  Lightbulb,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';

export interface DistortionOption {
  id: string;
  labelAr: string;
  labelEn: string;
  socraticQuestionAr: string;
  socraticQuestionEn: string;
  reframeStarterAr: string;
  reframeStarterEn: string;
}

export const CBT_DISTORTION_OPTIONS: DistortionOption[] = [
  {
    id: 'all_or_nothing',
    labelAr: 'التفكير الثنائي (أبيض أو أسود)',
    labelEn: 'All-or-Nothing Thinking',
    socraticQuestionAr: 'هل توجد منطقة وسطى بين الكمال المطلق والفشل التام؟ ماذا أنجزت جزئياً؟',
    socraticQuestionEn: 'Is there a middle ground between total perfection and complete failure?',
    reframeStarterAr: 'لم يكن الأمر مثالياً بنسبة 100%، لكن هناك نجاحاً وتعلماً جزئياً في الموقف.',
    reframeStarterEn: 'It was not 100% perfect, yet meaningful progress and learning still occurred.',
  },
  {
    id: 'overgeneralization',
    labelAr: 'التعميم المفرط (دائماً / أبداً)',
    labelEn: 'Overgeneralization (Always / Never)',
    socraticQuestionAr: 'هل حدث هذا فعلاً في كل مرة دون استثناء، أم أنها حالة محددة؟',
    socraticQuestionEn: 'Has this literally happened every single time without exception, or is it one specific case?',
    reframeStarterAr: 'هذا حدث في هذه المرة تحديداً، ولا يمثل قاعدة دائمة تنطبق على مستقبلي.',
    reframeStarterEn: 'This happened in this specific instance; it is not a permanent rule for my future.',
  },
  {
    id: 'mental_filtering',
    labelAr: 'التصفية الذهنية (التركيز على السلبي)',
    labelEn: 'Mental Filtering',
    socraticQuestionAr: 'ما الجوانب الإيجابية أو المحايدة في الموقف نفسه التي أُخرجها من الصورة الآن؟',
    socraticQuestionEn: 'Which positive or neutral details of this exact situation am I filtering out right now?',
    reframeStarterAr: 'نعم وجد تفصيل مزعج واحد، لكن الصورة الكاملة تضم جوانب إيجابية تستحق التقدير.',
    reframeStarterEn: 'One frustrating detail occurred, yet the full picture includes genuine positives worth noticing.',
  },
  {
    id: 'disqualifying_positive',
    labelAr: 'إلغاء الإيجابيات',
    labelEn: 'Disqualifying the Positive',
    socraticQuestionAr: 'لو حقق صديقي الإنجاز نفسه، هل كنت سأنسبه إلى الحظ فقط أم إلى جهده؟',
    socraticQuestionEn: 'If a friend achieved this exact result, would I dismiss it as luck or credit their effort?',
    reframeStarterAr: 'أقبل هذا النجاح كدليل حقيقي على جهدي وكفاءتي بدلاً من التقليل منه.',
    reframeStarterEn: 'I accept this positive outcome as real evidence of my effort rather than dismissing it.',
  },
  {
    id: 'mind_reading',
    labelAr: 'القراءة الذهنية (تخمين نوايا الآخرين)',
    labelEn: 'Mind Reading',
    socraticQuestionAr: 'ما الدليل الملموس على ما يدور في رأس الشخص الآخر، وما الاحتمالات الأقل قسوة؟',
    socraticQuestionEn: 'What concrete proof shows what they actually think, and what benign explanations exist?',
    reframeStarterAr: 'أنا لا أعرف ما يفكر فيه يقيناً؛ قد يكون مشغولاً أو مجهداً ولا يقصد رفضي.',
    reframeStarterEn: 'I cannot read minds with certainty; they may simply be busy or distracted rather than rejecting me.',
  },
  {
    id: 'fortune_telling',
    labelAr: 'التنبؤ السلبي بالمستقبل',
    labelEn: 'Fortune Telling',
    socraticQuestionAr: 'هل أمتلك دليل يقين على نتيجة الغد، أم أن القلق يرسم أسوأ سيناريو فقط؟',
    socraticQuestionEn: 'Do I have factual proof of tomorrow’s outcome, or is anxiety predicting worst-case scenarios?',
    reframeStarterAr: 'لا يمكنني الجزم بالنتيجة مسبقاً؛ سأستعد بهدوء وأتعامل مع الواقع حين يحدث.',
    reframeStarterEn: 'I cannot predict the outcome in advance; I can prepare calmly and respond as things unfold.',
  },
  {
    id: 'catastrophizing',
    labelAr: 'التفكير الكارثي (تهويل العواقب)',
    labelEn: 'Catastrophizing',
    socraticQuestionAr: 'ما هو الاحتمال الواقعي الأكثر ترجيحاً، وكيف سأتعامل لو حدث الأسوأ فعلاً؟',
    socraticQuestionEn: 'What is the most realistic probability, and how would I cope even if the worst happened?',
    reframeStarterAr: 'الموقف مزعج لكنه ليس كارثة غير قابلة للإصلاح؛ لديّ خطوات عملية للتعامل معه.',
    reframeStarterEn: 'This feels uncomfortable, not catastrophic or unrecoverable—I have practical ways to handle it.',
  },
  {
    id: 'minimization',
    labelAr: 'التقليل من الشأن',
    labelEn: 'Minimization',
    socraticQuestionAr: 'لماذا أقلل من قيمة خطواتي وإنجازاتي هنا بينما أضخم أخطائي؟',
    socraticQuestionEn: 'Why am I shrinking my genuine strengths here while magnifying slips?',
    reframeStarterAr: 'جهدي ومهارتي في هذا الموقف حقيقيان ويستحقان اعترافاً متوازناً.',
    reframeStarterEn: 'My effort and capability here are real and deserve fair recognition.',
  },
  {
    id: 'emotional_reasoning',
    labelAr: 'الاستدلال العاطفي (أشعر إذن هو حقيقي)',
    labelEn: 'Emotional Reasoning',
    socraticQuestionAr: 'هل الشعور الشديد بالخوف أو الذنب يثبت الحقيقة موضوعياً، أم يعكس انفعال اللحظة فقط؟',
    socraticQuestionEn: 'Does feeling anxious or guilty make a negative thought factually true, or just emotionally loud?',
    reframeStarterAr: 'مشاعري حقيقية وتستحق اللطف، لكنها ليست دليلاً موضوعياً على الحقيقة الواقعية.',
    reframeStarterEn: 'My feelings are valid emotional signals, not objective facts defining who I am.',
  },
  {
    id: 'should_statements',
    labelAr: 'عبارات «يجب» و«ينبغي» الصارمة',
    labelEn: 'Rigid “Should / Must” Statements',
    socraticQuestionAr: 'ماذا يحدث لو استبدلت «يجب حتماً» بـ «أفضّل وأسعى» مع قبول الطبيعة البشرية؟',
    socraticQuestionEn: 'What shifts if I replace rigid “musts” with “I prefer” while accepting human limits?',
    reframeStarterAr: 'أفضّل أن تسير الأمور بأفضل صورة، لكني أسمح لنفسي وللآخرين بالخطأ البشري والتعلم.',
    reframeStarterEn: 'I prefer things to go smoothly, yet I allow myself and others realistic human imperfection.',
  },
  {
    id: 'labeling',
    labelAr: 'التسمية وإطلاق الأحكام على الذات/الآخر',
    labelEn: 'Labeling',
    socraticQuestionAr: 'هل يختزل سلوك أو خطأ واحد هويتي كاملة كإنسان، أم أنه مجرد تصرف قابل للتعديل؟',
    socraticQuestionEn: 'Does one mistake define my entire identity, or is it simply an adjustable behavior?',
    reframeStarterAr: 'ارتكبت خطأً محدداً في موقف معين، وهذا سلوك يمكن تصحيحه لا صفة دائمة لي.',
    reframeStarterEn: 'I made a specific mistake in one situation—an action to refine, not a permanent label.',
  },
  {
    id: 'personalization',
    labelAr: 'الشخصنة (تحمّل ذنب كل شيء)',
    labelEn: 'Personalization',
    socraticQuestionAr: 'ما العوامل الخارجية أو الأدوار الأخرى التي أسهمت في النتيجة بعيداً عني وحدي؟',
    socraticQuestionEn: 'What external factors or other people’s choices contributed alongside my part?',
    reframeStarterAr: 'أنا مسؤول عن دوري وحدودي فقط، وهناك عوامل وظروف أخرى لا أتحكم بها.',
    reframeStarterEn: 'I am responsible solely for my part; other variables and people’s moods are outside my control.',
  },
  {
    id: 'blaming',
    labelAr: 'اللوم الكامل للآخرين أو الظروف',
    labelEn: 'Blaming',
    socraticQuestionAr: 'بصرف النظر عن تقصير الطرف الآخر، ما الجزء الذي أملك قراراً أو استجابة تجاهه الآن؟',
    socraticQuestionEn: 'Regardless of external faults, what small choice within my control can I take right now?',
    reframeStarterAr: 'رغم صعوبة الظرف أو تصرف الآخر، أملك مسؤولية اختيار استجابتي وخطوتي القادمة.',
    reframeStarterEn: 'Even when circumstances are unfair, I own how I respond and protect my next step.',
  },
  {
    id: 'fallacy_of_change',
    labelAr: 'مغالطة التغيير (ربط السعادة بتغير غيري)',
    labelEn: 'Fallacy of Change',
    socraticQuestionAr: 'كيف أحمي توازني وسعادتي اليوم إذا لم يتغير الطرف الآخر كما أتمنى؟',
    socraticQuestionEn: 'How can I protect my peace and well-being today even if the other person stays the same?',
    reframeStarterAr: 'سلامي الداخلي مسؤوليتي وحدودي؛ لا يلزمني انتظار تغير الآخرين لأعتني بنفسي.',
    reframeStarterEn: 'My peace belongs to my boundaries and choices—I need not wait for others to change first.',
  },
  {
    id: 'being_right',
    labelAr: 'التمسك بكوني «دائماً على حق»',
    labelEn: 'Being Right',
    socraticQuestionAr: 'هل الأهم في هذا الموقف إثبات صوابي مهما كلف، أم الفهم المتبادل وحفظ العلاقة؟',
    socraticQuestionEn: 'Is winning the argument more valuable here than mutual understanding and growth?',
    reframeStarterAr: 'يمكن أن أخطئ أو أرى زاوية واحدة فقط؛ الاستماع لزاوية الآخر يوسع فهمي ولا ينقصني.',
    reframeStarterEn: 'I can hold one perspective without needing to be infallible; listening deepens understanding.',
  },
  {
    id: 'heavens_reward',
    labelAr: 'مغالطة مكافأة السماء',
    labelEn: "Heaven's Reward Fallacy",
    socraticQuestionAr: 'هل أتعامل مع عطائي كصفقة مشروطة بنتيجة فورية، أم أضع حدوداً تحفظ طاقتي؟',
    socraticQuestionEn: 'Am I treating effort like an instant transaction rather than setting sustainable boundaries?',
    reframeStarterAr: 'الحياة لا تكافئ التضحية تلقائياً دون حدود؛ أختار جهدي بوعي وتوازن لا انتظاراً لمكافأة مضمونة.',
    reframeStarterEn: 'Effort carries intrinsic value, not guaranteed immediate payback—I give sustainably with healthy boundaries.',
  },
];

export interface ThoughtChallengeEntry {
  id: string;
  situation: string;
  emotion: string;
  emotionIntensityBefore: number;
  automaticThought: string;
  distortionId: string;
  logicalAlternative: string;
  emotionIntensityAfter: number;
  createdAt: string;
}

interface Props {
  onOpenDistortionsArticle?: () => void;
}

const STORAGE_KEY = 'mirat_cbt_distortion_challenge_v1';

const INITIAL_SAMPLE_ENTRIES_AR: ThoughtChallengeEntry[] = [
  {
    id: 'sample-1',
    situation: 'صديقي قرأ رسالتي ولم يرد منذ 4 ساعات',
    emotion: 'قلق وضيق',
    emotionIntensityBefore: 80,
    automaticThought: 'هو يتجاهلني عمداً ولم يعد يهتم بي',
    distortionId: 'mind_reading',
    logicalAlternative: 'لا أملك دليلاً على تجاهله؛ ربما هو منشغل في عمله أو ينتظر وقتاً مناسباً للرد.',
    emotionIntensityAfter: 30,
    createdAt: '2026-11-22',
  },
  {
    id: 'sample-2',
    situation: 'ارتكبت خطأً غير مقصود في عرض تقديمي بالعمل',
    emotion: 'خجل وإحباط',
    emotionIntensityBefore: 85,
    automaticThought: 'أنا فاشل تماماً وسأفقد احترام مديري وزملائي للأبد',
    distortionId: 'all_or_nothing',
    logicalAlternative: 'أخطأت في نقطة واحدة فقط بينما سارت بقية النقاط جيداً؛ خطأ واحد لا يلغي كفاءتي.',
    emotionIntensityAfter: 35,
    createdAt: '2026-11-22',
  },
];

const INITIAL_SAMPLE_ENTRIES_EN: ThoughtChallengeEntry[] = [
  {
    id: 'sample-1',
    situation: 'A friend read my message and has not replied for 4 hours',
    emotion: 'Anxiety & Hurt',
    emotionIntensityBefore: 80,
    automaticThought: 'They are deliberately ignoring me and do not care anymore',
    distortionId: 'mind_reading',
    logicalAlternative: 'I have no proof of rejection; they may simply be busy at work or waiting for a quiet moment.',
    emotionIntensityAfter: 30,
    createdAt: '2026-11-22',
  },
  {
    id: 'sample-2',
    situation: 'Made an accidental slip during a work presentation',
    emotion: 'Shame & Frustration',
    emotionIntensityBefore: 85,
    automaticThought: 'I am a total failure and ruined my reputation permanently',
    distortionId: 'all_or_nothing',
    logicalAlternative: 'I slipped on one point while handling the rest well; one mistake does not erase my competence.',
    emotionIntensityAfter: 35,
    createdAt: '2026-11-22',
  },
];

const QUICK_PRESETS = [
  {
    labelAr: 'رسالة بلا رد',
    labelEn: 'Unanswered Message',
    situationAr: 'أرسلت رسالة مهمة ولم أتلقَّ رداً طوال اليوم',
    situationEn: 'Sent an important text and got no reply all day',
    emotionAr: 'قلق وتوتر',
    emotionEn: 'Anxiety',
    thoughtAr: 'أكيد أن الشخص غاضب مني ويريد الابتعاد',
    thoughtEn: 'They must be upset with me and pulling away',
    distortionId: 'mind_reading',
    altAr: 'قد يكون مشغولاً أو مرهقاً؛ الصمت ليس دليلاً مؤكداً على الغضب.',
    altEn: 'They might just be swamped or tired; silence is not proof of anger.',
    before: 75,
    after: 25,
  },
  {
    labelAr: 'ملاحظة نقدية',
    labelEn: 'Critical Feedback',
    situationAr: 'تلقيت ملاحظة تصحيحية واحدة وسط إشادات متعددة',
    situationEn: 'Received one critical note alongside several compliments',
    emotionAr: 'حزن وانكسار',
    emotionEn: 'Sadness',
    thoughtAr: 'عملي كله سيئ وأنا غير مؤهل لهذا المجال',
    thoughtEn: 'My entire work is terrible and I am not cut out for this',
    distortionId: 'mental_filtering',
    altAr: 'ملاحظة تطويرية واحدة لا تمحو الإنجازات الإيجابية؛ أستطيع الاستفادة منها دون جلد الذات.',
    altEn: 'One piece of constructive feedback does not erase my positive work; I can use it calmly.',
    before: 80,
    after: 30,
  },
  {
    labelAr: 'رهبة التغيير',
    labelEn: 'Future Worry',
    situationAr: 'مقبل على مقابلة أو اختبار مهم غداً',
    situationEn: 'Facing an important interview or exam tomorrow',
    emotionAr: 'خوف وارتباك',
    emotionEn: 'Fear',
    thoughtAr: 'سأرتبك حتماً وأفشل أمام الجميع وتضيع فرصتي',
    thoughtEn: 'I will definitely freeze up, fail publicly, and ruin everything',
    distortionId: 'fortune_telling',
    altAr: 'القلق طبيعي قبل التحديات لكنه لا يحدد النتيجة؛ سأركّز على الاستعداد خطوة بخطوة.',
    altEn: 'Nerves are natural before big steps, not a prophecy; I will focus on steady preparation.',
    before: 85,
    after: 40,
  },
];

export const CognitiveDistortionChallenge: React.FC<Props> = ({
  onOpenDistortionsArticle,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';
  const isAr = language === 'ar';

  const [entries, setEntries] = useState<ThoughtChallengeEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return isAr ? INITIAL_SAMPLE_ENTRIES_AR : INITIAL_SAMPLE_ENTRIES_EN;
  });

  const [situation, setSituation] = useState('');
  const [emotion, setEmotion] = useState('');
  const [intensityBefore, setIntensityBefore] = useState<number>(75);
  const [automaticThought, setAutomaticThought] = useState('');
  const [distortionId, setDistortionId] = useState<string>('all_or_nothing');
  const [logicalAlternative, setLogicalAlternative] = useState('');
  const [intensityAfter, setIntensityAfter] = useState<number>(30);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore storage errors
    }
  }, [entries]);

  const selectedDistortion = useMemo(
    () =>
      CBT_DISTORTION_OPTIONS.find((d) => d.id === distortionId) ||
      CBT_DISTORTION_OPTIONS[0],
    [distortionId]
  );

  const avgReliefDelta = useMemo(() => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce(
      (acc, row) => acc + (row.emotionIntensityBefore - row.emotionIntensityAfter),
      0
    );
    return Math.round(sum / entries.length);
  }, [entries]);

  const handleApplyPreset = (preset: (typeof QUICK_PRESETS)[number]) => {
    soundManager.playTap();
    setSituation(isAr ? preset.situationAr : preset.situationEn);
    setEmotion(isAr ? preset.emotionAr : preset.emotionEn);
    setIntensityBefore(preset.before);
    setAutomaticThought(isAr ? preset.thoughtAr : preset.thoughtEn);
    setDistortionId(preset.distortionId);
    setLogicalAlternative(isAr ? preset.altAr : preset.altEn);
    setIntensityAfter(preset.after);
  };

  const handleFillSuggestedReframe = () => {
    soundManager.playTap();
    setLogicalAlternative(
      isAr ? selectedDistortion.reframeStarterAr : selectedDistortion.reframeStarterEn
    );
  };

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !situation.trim() ||
      !emotion.trim() ||
      !automaticThought.trim() ||
      !logicalAlternative.trim()
    ) {
      return;
    }
    soundManager.playRoundPass();
    const newRow: ThoughtChallengeEntry = {
      id: `row-${Date.now()}`,
      situation: situation.trim(),
      emotion: emotion.trim(),
      emotionIntensityBefore: intensityBefore,
      automaticThought: automaticThought.trim(),
      distortionId,
      logicalAlternative: logicalAlternative.trim(),
      emotionIntensityAfter: intensityAfter,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setEntries((prev) => [newRow, ...prev]);
    setSituation('');
    setEmotion('');
    setAutomaticThought('');
    setLogicalAlternative('');
    setIntensityBefore(75);
    setIntensityAfter(30);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2600);
  };

  const handleDeleteRow = (id: string) => {
    soundManager.playTap();
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetSamples = () => {
    soundManager.playTap();
    setEntries(isAr ? INITIAL_SAMPLE_ENTRIES_AR : INITIAL_SAMPLE_ENTRIES_EN);
  };

  const getDistortionLabel = (id: string) => {
    const found = CBT_DISTORTION_OPTIONS.find((d) => d.id === id);
    if (!found) return id;
    return isAr ? found.labelAr : found.labelEn;
  };

  const canSubmit =
    situation.trim().length > 0 &&
    emotion.trim().length > 0 &&
    automaticThought.trim().length > 0 &&
    logicalAlternative.trim().length > 0;

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`rounded-3xl border-2 p-5 sm:p-7 space-y-6 shadow-xl transition-colors ${
        isLight
          ? 'bg-gradient-to-br from-indigo-50/90 via-white to-amber-50/70 border-indigo-200 text-slate-900'
          : 'bg-gradient-to-br from-indigo-950/50 via-slate-900/95 to-purple-950/40 border-indigo-500/35 text-white'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-indigo-200/70 dark:border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">
            <Brain className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? 'مختبر CBT التطبيقي التفاعلي — تحدي التشوهات المعرفية'
                : 'Interactive CBT Lab — Cognitive Distortion Challenge'}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black font-['Alexandria'] leading-snug">
            {isAr
              ? '⚖️ جدول «تحدي التشوهات المعرفية»: حوّل الفكرة التلقائية إلى بديل منطقي'
              : '⚖️ Cognitive Distortion Challenge: Reframe Automatic Thoughts into Logical Alternatives'}
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
            {isAr
              ? 'اربط الموقف بالشعور والفكرة التلقائية واختر التشوه المعرفي ثم صغ البديل المتوازن وقِس انخفاض التوتر فوراً (تُحفظ سجلاتك محلياً في متصفحك).'
              : 'Connect Situation, Emotion, Automatic Thought, and Cognitive Distortion to craft a Balanced Logical Alternative and measure emotional relief instantly (saved locally).'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div
            className={`px-3.5 py-2 rounded-2xl border flex items-center gap-2 ${
              isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
            }`}
          >
            <TrendingDown className="w-4 h-4 shrink-0" />
            <div className="text-xs">
              <div className="font-bold opacity-80">
                {isAr ? 'متوسط تخفيف التوتر' : 'Avg. Emotional Relief'}
              </div>
              <div className="font-black text-sm">
                {avgReliefDelta > 0 ? `-${avgReliefDelta}%` : `${avgReliefDelta}%`}
              </div>
            </div>
          </div>

          {onOpenDistortionsArticle && (
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onOpenDistortionsArticle();
              }}
              className={`px-3.5 py-2.5 rounded-2xl border text-xs font-extrabold inline-flex items-center gap-1.5 transition cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-300'
                  : 'bg-white/5 hover:bg-white/10 text-indigo-200 border-indigo-400/30'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {isAr ? 'اقرأ دليل الـ 15 تشوهاً' : 'Read 15 Distortions Guide'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-extrabold ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
          {isAr ? '⚡ جرّب مثالاً سريعاً:' : '⚡ Try a quick preset:'}
        </span>
        {QUICK_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-300 text-slate-700'
                : 'bg-white/5 hover:bg-amber-500/15 border-white/10 hover:border-amber-400/40 text-gray-200'
            }`}
          >
            {isAr ? preset.labelAr : preset.labelEn}
          </button>
        ))}
      </div>

      {/* Interactive Input Builder */}
      <form
        onSubmit={handleAddRow}
        className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
          isLight ? 'bg-white/95 border-slate-200 shadow-sm' : 'bg-black/35 border-white/10'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Situation */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-indigo-700 dark:text-indigo-300">
              {isAr ? '1. الموقف الموضوعي (ماذا حدث؟)' : '1. Objective Situation (What happened?)'}
            </label>
            <input
              type="text"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder={
                isAr
                  ? 'مثال: تأخر صديقي في الرد على رسالتي...'
                  : 'e.g., A colleague gave terse feedback in a meeting...'
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500'
                  : 'bg-white/5 border-white/15 text-white focus:border-indigo-400'
              }`}
            />
          </div>

          {/* 2. Emotion + Intensity Before */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-black text-rose-700 dark:text-rose-300">
                {isAr ? '2. الشعور وشدته قبل التحدي' : '2. Emotion & Intensity Before'}
              </label>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300">
                {intensityBefore}%
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <input
                type="text"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                placeholder={isAr ? 'قلق، حزن، غضب...' : 'Anxiety, sadness, anger...'}
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-rose-500'
                    : 'bg-white/5 border-white/15 text-white focus:border-rose-400'
                }`}
              />
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={intensityBefore}
                onChange={(e) => setIntensityBefore(Number(e.target.value))}
                aria-label={isAr ? 'شدة الشعور قبل التحدي' : 'Emotion intensity before'}
                className="w-full sm:w-32 accent-rose-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 3. Automatic Thought */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-amber-700 dark:text-amber-300">
              {isAr ? '3. الفكرة التلقائية (ما الذي قلته لنفسك؟)' : '3. Automatic Thought (What flashed in mind?)'}
            </label>
            <input
              type="text"
              value={automaticThought}
              onChange={(e) => setAutomaticThought(e.target.value)}
              placeholder={
                isAr
                  ? 'مثال: أنا فاشل ولن يثق بي أحد أبداً...'
                  : 'e.g., Everyone thinks I am incompetent...'
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                  : 'bg-white/5 border-white/15 text-white focus:border-amber-400'
              }`}
            />
          </div>

          {/* 4. Cognitive Distortion Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-purple-700 dark:text-purple-300">
              {isAr ? '4. التشوه المعرفي المكتشف' : '4. Cognitive Distortion Identified'}
            </label>
            <select
              value={distortionId}
              onChange={(e) => setDistortionId(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold focus:outline-none transition cursor-pointer ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-purple-500'
                  : 'bg-slate-900 border-white/15 text-white focus:border-purple-400'
              }`}
            >
              {CBT_DISTORTION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {isAr ? opt.labelAr : opt.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Socratic Coaching Cue */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isLight
              ? 'bg-amber-50/90 border-amber-200 text-amber-950'
              : 'bg-amber-500/10 border-amber-500/25 text-amber-100'
          }`}
        >
          <div className="flex items-start gap-2 text-xs">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-black">
                {isAr ? 'سؤال الفحص السقراطي: ' : 'Socratic Check Question: '}
              </span>
              <span>
                {isAr
                  ? selectedDistortion.socraticQuestionAr
                  : selectedDistortion.socraticQuestionEn}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillSuggestedReframe}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition cursor-pointer shrink-0 inline-flex items-center gap-1 ${
              isLight
                ? 'bg-white hover:bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-400/30'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{isAr ? 'اقترح بداية للبديل المنطقي' : 'Suggest Balanced Starter'}</span>
          </button>
        </div>

        {/* 5. Balanced Logical Alternative + Re-rate After */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-black text-emerald-700 dark:text-emerald-300">
              {isAr
                ? '5. البديل المنطقي المتوازن (بعيداً عن التهويل أو التفاؤل الوهمي)'
                : '5. Balanced Logical Alternative (Evidence-Based Reframe)'}
            </label>
            <input
              type="text"
              value={logicalAlternative}
              onChange={(e) => setLogicalAlternative(e.target.value)}
              placeholder={
                isAr
                  ? 'اكتب التفكير الأكثر عدلاً وواقعية بناءً على الأدلة...'
                  : 'Write a fairer, reality-based alternative perspective...'
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition ${
                isLight
                  ? 'bg-emerald-50/40 border-emerald-300 text-slate-900 focus:border-emerald-500'
                  : 'bg-emerald-950/20 border-emerald-500/30 text-white focus:border-emerald-400'
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-emerald-700 dark:text-emerald-300">
                {isAr ? 'الشعور بعد البديل:' : 'Emotion After:'}
              </span>
              <span className="font-extrabold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                {intensityAfter}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={intensityAfter}
                onChange={(e) => setIntensityAfter(Number(e.target.value))}
                aria-label={isAr ? 'شدة الشعور بعد البديل المنطقي' : 'Emotion intensity after reframe'}
                className="flex-1 accent-emerald-500 cursor-pointer"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className={`px-4 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-1.5 transition shadow-md shrink-0 ${
                  canSubmit
                    ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white cursor-pointer'
                    : 'bg-slate-400/40 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'أضف للجدول' : 'Add to Table'}</span>
              </button>
            </div>
          </div>
        </div>

        {savedBanner && (
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isAr
                ? 'تمت إضافة السجل إلى جدول تحدي التشوهات المعرفية بنجاح!'
                : 'Entry added to your Cognitive Distortion Challenge table!'}
            </span>
          </div>
        )}
      </form>

      {/* Interactive Table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm sm:text-base font-black font-['Alexandria']">
            {isAr
              ? `📋 جدول التحدي التفاعلي (${entries.length} سجل)`
              : `📋 Interactive Challenge Table (${entries.length} entries)`}
          </h3>
          <button
            type="button"
            onClick={handleResetSamples}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border inline-flex items-center gap-1.5 transition cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-50 text-slate-600 border-slate-300'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/15'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isAr ? 'استعادة الأمثلة التوضيحية' : 'Restore Sample Rows'}</span>
          </button>
        </div>

        {entries.length === 0 ? (
          <div
            className={`p-6 rounded-2xl border text-center text-xs sm:text-sm ${
              isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-black/25 border-white/10 text-gray-400'
            }`}
          >
            {isAr
              ? 'الجدول فارغ حالياً — أضف أول موقف أو اختر أحد الأمثلة السريعة أعلاه.'
              : 'Your table is empty—add a situation above or load a quick preset.'}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-indigo-200 dark:border-white/15 shadow-sm">
            <table className="w-full text-xs sm:text-sm border-collapse min-w-[780px]">
              <thead>
                <tr
                  className={
                    isLight
                      ? 'bg-indigo-100/90 text-indigo-950'
                      : 'bg-indigo-950/80 text-indigo-100'
                  }
                >
                  <th className="p-3 font-black border-b border-indigo-200 dark:border-white/10 text-start">
                    {isAr ? 'الموقف' : 'Situation'}
                  </th>
                  <th className="p-3 font-black border-b border-indigo-200 dark:border-white/10 text-start">
                    {isAr ? 'الشعور (قبل ← بعد)' : 'Emotion (Before → After)'}
                  </th>
                  <th className="p-3 font-black border-b border-indigo-200 dark:border-white/10 text-start">
                    {isAr ? 'الفكرة التلقائية' : 'Automatic Thought'}
                  </th>
                  <th className="p-3 font-black border-b border-indigo-200 dark:border-white/10 text-start">
                    {isAr ? 'التشوه المعرفي' : 'Cognitive Distortion'}
                  </th>
                  <th className="p-3 font-black border-b border-indigo-200 dark:border-white/10 text-start">
                    {isAr ? 'البديل المنطقي' : 'Logical Alternative'}
                  </th>
                  <th className="p-3 font-black border-b border-indigo-200 dark:border-white/10 text-center">
                    {isAr ? 'حذف' : 'Del'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((row) => {
                  const delta = row.emotionIntensityBefore - row.emotionIntensityAfter;
                  return (
                    <tr
                      key={row.id}
                      className={`border-b last:border-b-0 transition ${
                        isLight
                          ? 'bg-white hover:bg-indigo-50/40 border-slate-200'
                          : 'bg-slate-900/70 hover:bg-indigo-950/30 border-white/10'
                      }`}
                    >
                      <td className="p-3 align-top font-semibold leading-relaxed">
                        {row.situation}
                      </td>
                      <td className="p-3 align-top whitespace-nowrap">
                        <div className="font-bold text-rose-600 dark:text-rose-300">
                          {row.emotion}
                        </div>
                        <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-extrabold">
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-700 dark:text-rose-300">
                            {row.emotionIntensityBefore}%
                          </span>
                          <span>{isRTL ? '←' : '→'}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                            {row.emotionIntensityAfter}%
                          </span>
                          {delta > 0 && (
                            <span className="text-emerald-600 dark:text-emerald-400">
                              (-{delta}%)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 align-top leading-relaxed text-amber-800 dark:text-amber-200">
                        «{row.automaticThought}»
                      </td>
                      <td className="p-3 align-top">
                        <span className="inline-block px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-purple-500/15 text-purple-700 dark:text-purple-200 border border-purple-500/25">
                          {getDistortionLabel(row.distortionId)}
                        </span>
                      </td>
                      <td className="p-3 align-top leading-relaxed font-medium text-emerald-800 dark:text-emerald-200">
                        {row.logicalAlternative}
                      </td>
                      <td className="p-3 align-top text-center">
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(row.id)}
                          aria-label={isAr ? 'حذف السجل' : 'Delete row'}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default CognitiveDistortionChallenge;
