import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Brain,
  HeartHandshake,
  Compass,
  Users,
  Layers,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Globe,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';

export type FatigueDimension =
  | 'physical'
  | 'mental'
  | 'emotional'
  | 'spiritual'
  | 'social';

export type FatigueClassification =
  | FatigueDimension
  | 'mixed'
  | 'balanced';

export interface FatigueQuestion {
  id: string;
  dimension: FatigueDimension;
  textAr: string;
  textEn: string;
  cueAr: string;
  cueEn: string;
}

export interface DimensionProfile {
  dimension: FatigueDimension;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  symptomsAr: string;
  symptomsEn: string;
  causesAr: string;
  causesEn: string;
  diagnosisHeadlineAr: string;
  diagnosisHeadlineEn: string;
  diagnosisSummaryAr: string;
  diagnosisSummaryEn: string;
  recommendationsAr: string[];
  recommendationsEn: string[];
  axisRefAr: string;
  axisRefEn: string;
  accentTextLight: string;
  accentTextDark: string;
  barClass: string;
  tintLight: string;
  tintDark: string;
}

export interface ExistentialFatigueQuizResult {
  scores: Record<FatigueDimension, number>;
  rawScores: Record<FatigueDimension, number>;
  overallIndex: number;
  classification: FatigueClassification;
  dominantDimension: FatigueDimension;
  secondaryDimension: FatigueDimension | null;
  elevatedDimensions: FatigueDimension[];
  answers: Record<string, number>;
}

export interface ExistentialFatigueQuizProps {
  /** Optional callback when user wants to open or jump to Article 5 */
  onNavigateToArticle?: () => void;
  /** Optional callback invoked upon completing the diagnostic quiz */
  onComplete?: (result: ExistentialFatigueQuizResult) => void;
  /** Optional initial language override if rendered standalone */
  initialLanguage?: 'ar' | 'en';
  /** Optional custom wrapper className */
  className?: string;
}

const LIKERT_OPTIONS: Array<{
  value: number;
  labelAr: string;
  labelEn: string;
  hintAr: string;
  hintEn: string;
}> = [
  {
    value: 0,
    labelAr: 'أبداً',
    labelEn: 'Never',
    hintAr: 'لا ينطبق عليّ إطلاقاً',
    hintEn: 'Not true for me at all',
  },
  {
    value: 1,
    labelAr: 'نادراً',
    labelEn: 'Rarely',
    hintAr: 'يحدث بشكل عابر جداً',
    hintEn: 'Happens only occasionally',
  },
  {
    value: 2,
    labelAr: 'أحياناً',
    labelEn: 'Sometimes',
    hintAr: 'يظهر في بعض الأسابيع',
    hintEn: 'Appears in certain weeks',
  },
  {
    value: 3,
    labelAr: 'غالباً',
    labelEn: 'Often',
    hintAr: 'يتكرر معظم أيام الأسبوع',
    hintEn: 'Recurs most days of the week',
  },
  {
    value: 4,
    labelAr: 'دائماً',
    labelEn: 'Always',
    hintAr: 'حالة يومية مستمرة معي',
    hintEn: 'A persistent daily reality',
  },
];

// 15 diagnostic items grounded directly in Article 5 (Axes 1–7): 3 items per each of the 5 fatigue dimensions,
// interleaved across 3 rounds to reduce response-set bias.
const FATIGUE_QUESTIONS: FatigueQuestion[] = [
  // Round 1
  {
    id: 'efq_phy_1',
    dimension: 'physical',
    textAr: 'أستيقظ بعد 7–9 ساعات من النوم وأنا أشعر بثقل في عضلاتي وكأن جسدي لم يحصل على راحة حقيقية.',
    textEn: 'I wake up after 7–9 hours of sleep with heavy muscles, feeling as though my body never truly rested.',
    cueAr: 'المؤشر الجسدي · جودة الاستشفاء العضلي والنومي',
    cueEn: 'Physical Indicator · Sleep architecture & somatic recovery',
  },
  {
    id: 'efq_men_1',
    dimension: 'mental',
    textAr: 'أعاني من ضبابية في الذهن وصعوبة في التركيز أو اتخاذ قرارات يومية بسيطة رغم عدم بذلي مجهوداً بدنياً شاقاً.',
    textEn: 'I experience brain fog and struggle to focus or make simple daily decisions even without physical exertion.',
    cueAr: 'المؤشر العقلي · الحمل المعرفي وضبابية الدماغ',
    cueEn: 'Mental Indicator · Cognitive load & decision clarity',
  },
  {
    id: 'efq_emo_1',
    dimension: 'emotional',
    textAr: 'أشعر بفراغ داخلي أو خدر عاطفي يجعلني أنسحب من المواقف التي تتطلب تفاعلاً وجدانياً أو تعاطفاً.',
    textEn: 'I feel an inner emptiness or emotional numbness that leads me to withdraw from emotionally demanding situations.',
    cueAr: 'المؤشر العاطفي · السعة الوجدانية والانطفاء الداخلي',
    cueEn: 'Emotional Indicator · Affective capacity & inner numbness',
  },
  {
    id: 'efq_spi_1',
    dimension: 'spiritual',
    textAr: 'يتردد في داخلي تساؤل متكرر: «ما الجدوى أو المعنى من كل هذا الركض اليومي؟» حتى عندما تسير أموري ظاهرياً بشكل جيد.',
    textEn: 'A recurring thought crosses my mind: "What is the point or meaning of all this?" even when things look fine on the surface.',
    cueAr: 'المؤشر الروحي والوجودي · بوصلة المعنى والغاية',
    cueEn: 'Spiritual / Existential Indicator · Sense of purpose & meaning',
  },
  {
    id: 'efq_soc_1',
    dimension: 'social',
    textAr: 'تتركني اللقاءات الاجتماعية — حتى العادية منها — مستنزفاً تماماً وأحتاج لساعات طويلة من الانعزال لاستعادة أنفاسي.',
    textEn: 'Social gatherings—even routine ones—leave me completely drained, needing long hours of withdrawal to recover.',
    cueAr: 'المؤشر الاجتماعي · كلفة التفاعل وحدود الدوائر',
    cueEn: 'Social Indicator · Interpersonal energy cost & recovery',
  },

  // Round 2
  {
    id: 'efq_phy_2',
    dimension: 'physical',
    textAr: 'ألاحظ هبوطاً سريعاً في طاقتي البدنية خلال المهام البسيطة (كصعود الدرج أو المشي القصير) أو خفقاناً ودواراً عند الإجهاد.',
    textEn: 'My physical stamina drops rapidly during simple tasks (like climbing stairs or short walks), accompanied by bodily heaviness.',
    cueAr: 'المؤشر الجسدي · المؤشرات الحيوية والمخزون العضوي',
    cueEn: 'Physical Indicator · Stamina & physiological reserves',
  },
  {
    id: 'efq_men_2',
    dimension: 'mental',
    textAr: 'يستمر عقلي في الاجترار وإعادة تدوير الأفكار والقلق والمقارنات أو متابعة الشاشات بلا توقف حتى لحظات الاسترخاء.',
    textEn: 'My mind keeps ruminating, replaying worries, or scrolling through constant digital input even when I try to relax.',
    cueAr: 'المؤشر العقلي · الاجترار الذهني والتخمة الرقمية',
    cueEn: 'Mental Indicator · Rumination loops & digital overload',
  },
  {
    id: 'efq_emo_2',
    dimension: 'emotional',
    textAr: 'أتحمل أعباء ومشاعر الآخرين بصمت أو أبتسم لأبدو بخير أمام الناس، ثم أنهار داخلياً بمجرد أن أكون وحدي.',
    textEn: 'I silently absorb others’ problems or wear a composed smile in public, only to collapse emotionally when I am alone.',
    cueAr: 'المؤشر العاطفي · الرعاية بلا دعم وكبت المشاعر',
    cueEn: 'Emotional Indicator · Caregiving strain & repression',
  },
  {
    id: 'efq_spi_2',
    dimension: 'spiritual',
    textAr: 'أشعر أن نمط حياتي أو عملي الحالي يتعارض مع قيمي العميقة، وأرتدي «قناع شخصية زائفة» لإرضاء توقعات الآخرين.',
    textEn: 'My daily work or lifestyle clashes with my deepest values, forcing me to wear a "false-self mask" to meet expectations.',
    cueAr: 'المؤشر الروحي والوجودي · التنافر القيمي والأصالة',
    cueEn: 'Spiritual / Existential Indicator · Value dissonance & authenticity',
  },
  {
    id: 'efq_soc_2',
    dimension: 'social',
    textAr: 'أتحاشى الرد على الرسائل والمكالمات لأنني أشعر أن علاقاتي المحيطة مليئة بالتوتر أو التوقعات الضاغطة أو غياب الفهم الحقيقي.',
    textEn: 'I avoid replying to messages and calls because surrounding relationships feel high-friction, demanding, or lacking genuine understanding.',
    cueAr: 'المؤشر الاجتماعي · العلاقات المستنزفة وضغط التوقعات',
    cueEn: 'Social Indicator · High-friction ties & social pressure',
  },

  // Round 3
  {
    id: 'efq_phy_3',
    dimension: 'physical',
    textAr: 'أعتمد على الكافيين أو السكريات لتجاوز خمول النهار، ومع ذلك ألاحظ آلاماً متفرقة أو شدّاً في الجسد لا يزول بالعطلة.',
    textEn: 'I rely on caffeine or sugar to push through daytime sluggishness, yet physical aches or tension persist even over weekends.',
    cueAr: 'المؤشر الجسدي · نمط الطاقة الحيوية والتعافي الجسدي',
    cueEn: 'Physical Indicator · Metabolic rhythm & somatic tension',
  },
  {
    id: 'efq_men_3',
    dimension: 'mental',
    textAr: 'أشعر أن ذاكرتي العاملة مزدحمة وأنسى التفاصيل السريعة، ولا يختفي هذا التشوش المعرفي حتى لو نمت 10 ساعات متواصلة.',
    textEn: 'My working memory feels overloaded and forgetful, and this cognitive haze does not clear even after 10 hours of sleep.',
    cueAr: 'المؤشر العقلي · إرهاق المعالجة والانتباه',
    cueEn: 'Mental Indicator · Working-memory saturation & focus drain',
  },
  {
    id: 'efq_emo_3',
    dimension: 'emotional',
    textAr: 'فقدت القدرة على التأثر الطبيعي بالأحداث السارة أو الحزينة، وكأن قلبي محاط بجدار حماية يمنع استنزافه أكثر.',
    textEn: 'I struggle to react naturally to joyful or sad events, as if an invisible wall numbs my heart against further depletion.',
    cueAr: 'المؤشر العاطفي · التبلد الوقائي وآثار الضغط المتراكم',
    cueEn: 'Emotional Indicator · Protective numbing & chronic depletion',
  },
  {
    id: 'efq_spi_3',
    dimension: 'spiritual',
    textAr: 'الإجازة والطعام والنوم لم تعد تعيد لي الحماس؛ أشعر أن روحي تفتقد الاتجاه والشغف المرتبط بهويتي الحقيقية.',
    textEn: 'Vacations, good meals, and rest no longer spark enthusiasm; my spirit feels disconnected from direction and inner vitality.',
    cueAr: 'المؤشر الروحي والوجودي · جفاف الدافعية والانفصال عن الذات',
    cueEn: 'Spiritual / Existential Indicator · Loss of passion & existential drift',
  },
  {
    id: 'efq_soc_3',
    dimension: 'social',
    textAr: 'أتنقل بين الشعور بالاختناق من كثرة الالتزامات الاجتماعية والشعور بوحدة ثقيلة لعدم وجود دائرة آمنة أشعر معها بالانتماء.',
    textEn: 'I swing between feeling suffocated by social obligations and feeling deeply lonely due to lacking a safe, nourishing circle.',
    cueAr: 'المؤشر الاجتماعي · العزلة أو غياب شبكة الأمان الاجتماعي',
    cueEn: 'Social Indicator · Isolation vs. draining social circles',
  },
];

const DIMENSION_PROFILES: Record<FatigueDimension, DimensionProfile> = {
  physical: {
    dimension: 'physical',
    titleAr: 'التعب الجسدي',
    titleEn: 'Physical Fatigue',
    subtitleAr: 'ثقل عضلي وضعف طاقة حيوية',
    subtitleEn: 'Muscular heaviness & low physical stamina',
    symptomsAr: 'ثقل في العضلات، ضعف القدرة على التحمل البدني، واستيقاظ بلا انتعاش رغم ساعات النوم الكافية.',
    symptomsEn: 'Muscular heaviness, reduced physical stamina, and unrefreshing sleep despite adequate hours in bed.',
    causesAr: 'اضطراب جودة النوم (مثل انقطاع التنفس أثناء النوم)، نقص فيتامين D أو B12 أو الحديد (الفرّيتين) أو المغنيسيوم، خلل الغدة الدرقية، أو الخمول الجسدي.',
    causesEn: 'Disrupted sleep architecture (such as sleep apnea), Vitamin D/B12/iron/magnesium deficits, thyroid dysfunction, chronic medical factors, or sedentary deconditioning.',
    diagnosisHeadlineAr: 'الغالب على حالتك الآن: التعب الجسدي (Physical Fatigue)',
    diagnosisHeadlineEn: 'Primary Pattern Detected: Physical Fatigue',
    diagnosisSummaryAr:
      'يشير نمط إجاباتك إلى أن رصيد طاقتك يستنزف أساساً على المستوى العضوي والحيوي. وفق المحورين الثاني والسابع في المقال الخامس، فإن «كمية النوم» لا تساوي «جودة الاستشفاء الجسدي»، وقد يكون جسدك يرسل إشارة لنواقص صامتة أو اضطراب في دورات النوم العميق.',
    diagnosisSummaryEn:
      'Your responses indicate that depletion is concentrated at the physiological and somatic level. As detailed in Axes 2 & 7 of Article 5, sleep duration does not equal restorative sleep quality—your body may be signaling silent nutrient deficits, endocrine imbalance, or fragmented recovery.',
    recommendationsAr: [
      'إجراء فحص طبي ومخبري شامل: صورة الدم (CBC)، مخزون الحديد (Ferritin)، فيتامين D، فيتامين B12، المغنيسيوم، ووظائف الغدة الدرقية (TSH) قبل تناول أي مكملات عشوائية.',
      'تقييم جودة النوم لا عدد ساعاته فقط: انتبه لأعراض انقطاع التنفس الليلي (الشخير، جفاف الفم، الاستيقاظ المرهق)، وثبّت موعد النوم والاستيقاظ يومياً.',
      'دعم الاستشفاء الغذائي والحيوي: تناول وجبات غنية بالبروتين، اشرب 8 أكواب ماء، وقلل تقلبات السكر والكافيين التي تمنح طاقة مستعارة ثم تسرق الرصيد لاحقاً.',
      'تطبيق الحركة التدريجية اللطيفة: ابدأ بـ 10 إلى 15 دقيقة مشي نهاري في ضوء الشمس لكسر حلقة الخمول وتنشيط الدورة الدموية دون إجهاد مفرط.',
    ],
    recommendationsEn: [
      'Request a baseline medical panel: CBC, Ferritin (iron stores), Vitamin D, Vitamin B12, Magnesium, and Thyroid function (TSH) before supplementing blindly.',
      'Audit sleep quality rather than hours alone: screen for sleep apnea cues (loud snoring, waking unrefreshed, daytime drowsiness) and lock consistent sleep/wake times.',
      'Stabilize metabolic fuel: prioritize protein-rich whole foods, consistent hydration, and curb sugar/caffeine spikes that borrow tomorrow’s energy.',
      'Break sedentary deconditioning gently: start with 10–15 minutes of daylight walking daily to rebuild circulation and mitochondrial stamina safely.',
    ],
    axisRefAr: 'المحور السابع · التعب الجسدي: فحص طبي + تغذية + حركة متدرجة',
    axisRefEn: 'Axis 7 · Physical Fatigue: Medical workup + nutrition + gentle movement',
    accentTextLight: 'text-sky-700',
    accentTextDark: 'text-sky-400',
    barClass: 'bg-sky-500',
    tintLight: 'bg-sky-50 border-sky-200',
    tintDark: 'bg-sky-950/35 border-sky-500/30',
  },
  mental: {
    dimension: 'mental',
    titleAr: 'التعب العقلي',
    titleEn: 'Mental Fatigue',
    subtitleAr: 'ضبابية ذهنية وإعياء التركيز والقرار',
    subtitleEn: 'Brain fog, focus strain & decision fatigue',
    symptomsAr: 'ضبابية التفكير، صعوبة التركيز، بطء المعالجة الذهنية، وتشتت الانتباه في أبسط القرارات.',
    symptomsEn: 'Brain fog, difficulty concentrating, sluggish cognitive processing, and decision fatigue over minor tasks.',
    causesAr: 'الإفراط في المعالجة المعرفية، حلقات الاجترار الذهني (Rumination)، القلق المزمن، وتدفق المعلومات والشاشات المستمر.',
    causesEn: 'Chronic cognitive overload, repetitive rumination loops, persistent anxiety, and uninterrupted screen/information overload.',
    diagnosisHeadlineAr: 'الغالب على حالتك الآن: التعب العقلي (Mental Fatigue)',
    diagnosisHeadlineEn: 'Primary Pattern Detected: Mental Fatigue',
    diagnosisSummaryAr:
      'تكشف نتائجك أن دماغك يستهلك وقوده وهو في حالة «سكون ظاهري» بسبب كثرة المشتتات أو الاجترار والقلق المستمر. وفق المحور السابع، فإن زيادة ساعات النوم وحدها لا تُصفي ضبابية الذهن لأن العقل يحتاج إلى «صمت معرفي» حقيقي بعيداً عن الشاشات.',
    diagnosisSummaryEn:
      'Your results show that your brain is burning fuel even at physical rest due to rumination, chronic alert loops, or constant digital input. Per Axis 7, extra sleep cannot clear mental fog until the mind receives deliberate non-screen stillness.',
    recommendationsAr: [
      'امنح عقلك راحة معرفية حقيقية: خصص 15–20 دقيقة يومياً للتأمل الهادئ أو الجلوس في الطبيعة دون أي محتوى صوتي أو مهام أو هاتف.',
      'طبّق نظام الصوم الرقمي وتقليل المشتتات: أوقف الشاشات والإشعارات قبل النوم بـ 60 دقيقة على الأقل لحماية الميلاتونين وتقليل تشبع الذاكرة العاملة.',
      'أدر الاجترار والقلق بعقلانية: استخدم تقنية «وقت القلق المجدول» (15 دقيقة يومياً لتدوين المخاوف والحلول العملية ثم إغلاق الملف) بدلاً من التدوير الذهني المستمر.',
      'استعن بالعلاج المعرفي السلوكي (CBT) عند استمرار حلقات التفكير القهري، واستبدل تعدد المهام بالعمل على مهمة واحدة في فترات زمنية محددة.',
    ],
    recommendationsEn: [
      'Schedule true mental rest: spend 15–20 minutes daily in quiet mindfulness or nature with zero podcasts, tasks, or screens.',
      'Enforce digital boundaries: cut screens and notifications at least 60 minutes before bed to protect melatonin and let working memory decompress.',
      'Contain rumination structurally: use a daily 15-minute "scheduled worry & writing window" to externalize loops onto paper rather than cycling them mentally.',
      'Consider Cognitive Behavioral Therapy (CBT) tools to interrupt catastrophic loops, and trade multitasking for focused single-task blocks.',
    ],
    axisRefAr: 'المحور السابع · التعب العقلي: تأمل + تقليل مشتتات + علاج معرفي',
    axisRefEn: 'Axis 7 · Mental Fatigue: Mindfulness + reduce overload + CBT reframing',
    accentTextLight: 'text-indigo-700',
    accentTextDark: 'text-indigo-400',
    barClass: 'bg-indigo-500',
    tintLight: 'bg-indigo-50 border-indigo-200',
    tintDark: 'bg-indigo-950/35 border-indigo-500/30',
  },
  emotional: {
    dimension: 'emotional',
    titleAr: 'التعب العاطفي',
    titleEn: 'Emotional Fatigue',
    subtitleAr: 'فراغ داخلي وخدر وانسحاب وجداني',
    subtitleEn: 'Inner emptiness, numbness & emotional withdrawal',
    symptomsAr: 'شعور بالفراغ الداخلي، تبلّد المشاعر أو صعوبة التعبير عنها، وانسحاب تدريجي من التفاعل العاطفي.',
    symptomsEn: 'Inner hollowness, emotional numbness or difficulty expressing feelings, and gradual emotional detachment.',
    causesAr: 'علاقات مستنزفة، رعاية الآخرين دون تلقي دعم مقابل، كبت المشاعر المزمن، أو صدمات نفسية واكتئاب مقنّع.',
    causesEn: 'Draining dynamics, unreciprocated caregiving, chronic emotional suppression, unresolved trauma, or high-functioning masked depression.',
    diagnosisHeadlineAr: 'الغالب على حالتك الآن: التعب العاطفي (Emotional Fatigue)',
    diagnosisHeadlineEn: 'Primary Pattern Detected: Emotional Fatigue',
    diagnosisSummaryAr:
      'تُظهر المؤشرات أن جهازك الوجداني دخل في وضع «إغلاق وقائي» نتيجة حمل عاطفي متراكم أو كبت طويل أو رعاية الآخرين على حساب نفسك. في هذه الحالة لا يجدي الاستجمام السطحي، بل يحتاج القلب إلى أمان وحدود وتفريغ صادق.',
    diagnosisSummaryEn:
      'Your scores point toward an affective protective shutdown caused by prolonged emotional labor, chronic suppression, or carrying others without reciprocal support. Superficial breaks will not refill this tank—the heart requires safety, boundaries, and guided emotional release.',
    recommendationsAr: [
      'ارسم حدوداً عاطفية صحية دون تأنيب ضمير: توقف عن امتصاص أزمات الآخرين أو التطوع الدائم بدور «المنقذ» على حساب طاقتك النفسية.',
      'افتح مساراً آمناً للتعبير العاطفي: استبدل الكبت بالكتابة التأملية الحرة أو البوح الصادق لشخص أمين لا يحاكمك ولا يطلب منك التمثيل.',
      'تحرّ عن الجذور الأعمق عبر علاج عاطفي متخصص: تساعد مدارس مثل CBT وACT وEMDR والتعاطف الذاتي (CFT) في تحرير الصدمات العالقة والاكتئاب المقنّع.',
      'اطلب المساندة المتبادلة: اسمح لنفسك أن تكون متلقياً للدعم واللطف لا مانحاً لهما فقط.',
    ],
    recommendationsEn: [
      'Establish protective emotional boundaries: pause absorbing others’ crises or defaulting to the unpaid caretaker role at your own expense.',
      'Restore safe emotional expression: replace chronic suppression with reflective journaling or honest sharing in a non-judgmental setting.',
      'Explore structured emotional therapy: evidence-based approaches (ACT, CBT, EMDR, or Compassion-Focused Therapy) help process trapped trauma and masked depression.',
      'Rebalance reciprocity: allow yourself to receive steady care and support instead of always holding space for everyone else.',
    ],
    axisRefAr: 'المحور السابع · التعب العاطفي: حدود صحية + علاج عاطفي + دعم',
    axisRefEn: 'Axis 7 · Emotional Fatigue: Healthy boundaries + therapy + safe support',
    accentTextLight: 'text-rose-700',
    accentTextDark: 'text-rose-400',
    barClass: 'bg-rose-500',
    tintLight: 'bg-rose-50 border-rose-200',
    tintDark: 'bg-rose-950/35 border-rose-500/30',
  },
  spiritual: {
    dimension: 'spiritual',
    titleAr: 'التعب الروحي والوجودي',
    titleEn: 'Spiritual & Existential Fatigue',
    subtitleAr: 'فراغ المعنى وتعارض الحياة مع القيم',
    subtitleEn: 'Existential vacuum & value misalignment',
    symptomsAr: 'إحساس بالخواء واللامعنى («ما الجدوى؟»)، فقدان الشغف، والشعور بالعيش خلف قناع لا يشبه حقيقتك.',
    symptomsEn: 'A sense of existential vacuum ("What is the point?"), loss of passion, and living behind an exhausting mask.',
    causesAr: 'فقدان الهدف الشخصي (نموذج فيكتور فرانكل)، التنافر المعرفي الناتج عن العيش عكس قيمك العميقة، واستنزاف قناع الشخصية الزائفة.',
    causesEn: 'Loss of personal purpose (Viktor Frankl), cognitive dissonance from living against core values, and the daily toll of a false-self mask.',
    diagnosisHeadlineAr: 'الغالب على حالتك الآن: التعب الروحي والوجودي (Existential Fatigue)',
    diagnosisHeadlineEn: 'Primary Pattern Detected: Spiritual & Existential Fatigue',
    diagnosisSummaryAr:
      'يعكس هذا المؤشر أن تعبك ليس كسلاً ولا عجزاً بدنياً، بل هو «أزمة معنى وتوافق قيمي». وكما يوضح المقال الخامس: النوم والإجازات والطعام لا تعيد الحماس حين تعيش حياة أو دوراً يتصادم مع قيمك الجوهرية وأصالتك.',
    diagnosisSummaryEn:
      'This pattern signals neither laziness nor simple physical weariness, but a crisis of meaning and value alignment. As Article 5 underscores, vacations and sleep cannot revive enthusiasm when daily life conflicts with your core values and authentic self.',
    recommendationsAr: [
      'أجرِ جرداً لأهم 5 قيم جوهرية لديك: قارن أين يذهب وقتك وجهدك أسبوعياً بتلك القيم، وابدأ بتعديل تدريجي يردم فجوة التنافر المعرفي.',
      'تخفّف من «قناع الشخصية الزائفة»: لاحظ المواقف التي تمثل فيها دورك لإرضاء التوقعات الخارجية، واختر مساحة آمنة تبدأ فيها بالصدق مع ذاتك.',
      'أعد إحياء روافد المعنى والسكينة: خصص وقتاً للتدبر الروحي، أو الإبداع، أو خدمة هادفة تضيف أثراً ملموساً يتجاوز الروتين الآلي.',
      'استفد من الإرشاد الوجودي أو علاج القبول والالتزام (ACT) لترجمة أزمة الأسئلة الكبرى إلى خطوات حياتية متسقة مع هويتك.',
    ],
    recommendationsEn: [
      'Conduct a Top-5 Core Values Audit: map where your weekly hours actually go versus what you deeply value, and initiate gradual realignments.',
      'Drop the exhausting false-self mask: notice where you perform to please external expectations and carve out spaces to live authentically.',
      'Reconnect with anchors of meaning: engage in reflective spiritual stillness, creative craft, or purposeful service that restores a clear "why."',
      'Consider Acceptance & Commitment Therapy (ACT) or existential counseling to turn abstract emptiness into value-driven daily action.',
    ],
    axisRefAr: 'المحور السابع · التعب الروحي: بحث عن المعنى + توافق قيمي + تغيير تدريجي',
    axisRefEn: 'Axis 7 · Existential Fatigue: Meaning + value realignment + gradual shifts',
    accentTextLight: 'text-amber-700',
    accentTextDark: 'text-amber-400',
    barClass: 'bg-amber-500',
    tintLight: 'bg-amber-50 border-amber-200',
    tintDark: 'bg-amber-950/35 border-amber-500/30',
  },
  social: {
    dimension: 'social',
    titleAr: 'التعب الاجتماعي',
    titleEn: 'Social Fatigue',
    subtitleAr: 'إرهاق من التفاعل أو العزلة والعلاقات السامة',
    subtitleEn: 'Drain from interactions, toxic dynamics, or isolation',
    symptomsAr: 'إعياء واضح بعد التفاعل الاجتماعي، رغبة قوية في الانسحاب، أو استنزاف ناتج عن العزلة وغياب الانتماء الآمن.',
    symptomsEn: 'Marked exhaustion after social contact, strong urge to withdraw, or deep fatigue driven by loneliness and lack of safe belonging.',
    causesAr: 'العلاقات السامة والمرهقة، ضغوط التوقعات الثقافية والعائلية («ماذا سيقول الناس؟»)، أو العزلة المزمنة التي ترفع هرمونات التوتر.',
    causesEn: 'Toxic or high-friction ties, suffocating cultural expectations ("what will people say?"), or chronic isolation elevating stress hormones.',
    diagnosisHeadlineAr: 'الغالب على حالتك الآن: التعب الاجتماعي (Social Fatigue)',
    diagnosisHeadlineEn: 'Primary Pattern Detected: Social Fatigue',
    diagnosisSummaryAr:
      'يرصد التحليل أن طاقتك تنزف عبر «محيطك الاجتماعي» — إما بسبب علاقات مستنزفة ومناخ من النقد والمراقبة يستوجب تقنين الاحتكاك، أو بسبب وحدة ثقيلة تحرم جهازك العصبي من الأمان الاجتماعي المشترك.',
    diagnosisSummaryEn:
      'Your profile indicates your energy is bleeding through your interpersonal environment—either from draining, judgment-heavy ties requiring firm limits, or from prolonged isolation depriving your nervous system of safe connection.',
    recommendationsAr: [
      'افرز دوائرك بوضوح (الخطوة 5 من المقال): حدد العلاقات التي تخرج منها وأنت أضعف وأكثر شكاً بنفسك، وقلّل الاحتكاك بها وابدأ بوضع حدود هادئة وحازمة.',
      'امنح نفسك عزلة ترميمية واعية: العزلة الصحية لإعادة شحن طاقتك حق مشروع وليست أنانية أو ضعفاً.',
      'ابْنِ بدائل انتماء صادقة وآمنة: إذا كان التعب ناتجاً عن الوحدة، ابحث عن مساحات تطوع أو مجموعات اهتمام مشترك تمنحك تواصلاً حقيقياً بلا تكلف.',
      'تجاوز ضغوط «كلام الناس»: درّب نفسك على التمييز بين مسؤوليتك الأخلاقية الحقيقية وبين التوقعات الشكلية التي تستهلك سلامك الداخلي.',
    ],
    recommendationsEn: [
      'Triage your social circles honestly: identify relationships that reliably leave you smaller or depleted, lower exposure, and set calm, firm boundaries.',
      'Protect restorative solitude without guilt: quiet time to recharge social batteries is healthy maintenance, not selfishness.',
      'Cultivate authentic belonging: if isolation drives your fatigue, seek low-pressure service, hobby clubs, or trustworthy peers where no mask is needed.',
      'Release reputation anxiety: practice separating genuine ethical responsibility from suffocating "what will people say" pressure.',
    ],
    axisRefAr: 'المحور السابع · التعب الاجتماعي: فرز العلاقات + حدود + دوائر دعم صادقة',
    axisRefEn: 'Axis 7 · Social Fatigue: Triage circles + clear boundaries + safe fellowship',
    accentTextLight: 'text-emerald-700',
    accentTextDark: 'text-emerald-400',
    barClass: 'bg-emerald-500',
    tintLight: 'bg-emerald-50 border-emerald-200',
    tintDark: 'bg-emerald-950/35 border-emerald-500/30',
  },
};

const MIXED_PROTOCOL = {
  titleAr: 'التعب المختلط متعدد المصادر (Mixed Multi-Source Fatigue)',
  titleEn: 'Mixed Multi-Source Fatigue',
  summaryAr:
    'تشير نتائجك إلى تداخل مرتفع في أكثر من بُعد من أبعاد التعب في آنٍ واحد. وفق جدول المحور السابع وخطة الخطوات الست في المقال الخامس، فإن محاولة حل محور واحد بمعزل عن البقية لن تكفي؛ الحل الفعّال يتبع ترتيباً تشخيصياً متعدد المستويات.',
  summaryEn:
    'Your scores reveal simultaneous elevation across multiple fatigue axes. As outlined in Axis 7 and the 6-Step Plan of Article 5, treating a single isolated symptom will fall short—lasting recovery comes from a sequential, multi-level triage.',
  stepsAr: [
    'الخطوة 1 — الفحص الطبي الشامل أولاً: استبعد الأسباب العضوية (CBC، مخزون الحديد، فيتامين D وB12، الغدة الدرقية TSH، وجودة النوم).',
    'الخطوة 2 — ضبط أساسيات نمط الحياة: تثبيت النوم 7–9 ساعات، ماء كافٍ، تقليل السكر والكافيين، وإيقاف الشاشات ساعة قبل النوم مع 15 دقيقة مشي.',
    'الخطوة 3 — الفرز النفسي والعاطفي: معالجة الاجترار والقلق أو الكبت العاطفي وحدود الاستنزاف بدعم مختص (CBT / ACT / EMDR).',
    'الخطوة 4 — جرد القيم والمعنى: مواءمة التزاماتك اليومية مع قيمك الحقيقية وخلع قناع الإرضاء المستمر.',
    'الخطوة 5 — فرز الدوائر الاجتماعية: تقليص العلاقات المستنزفة وتوسيع الدوائر الداعمة الآمنة.',
    'الخطوة 6 — التدرج الصبور: طبّق خطوة واحدة أسبوعياً دون استعجال حل سحري فوري.',
  ],
  stepsEn: [
    'Step 1 — Biomedical Baseline First: Rule out hidden organic factors (CBC, Ferritin, Vitamin D & B12, Thyroid TSH, sleep quality).',
    'Step 2 — Lifestyle Stabilization: Consistent 7–9 hr sleep schedule, hydration, moderated sugar/caffeine, 60-min pre-sleep screen cutoff, 15-min daily walk.',
    'Step 3 — Psychological & Emotional Triage: Address rumination, chronic anxiety, or masked emotional depletion via evidence-based care (CBT / ACT / EMDR).',
    'Step 4 — Values & Meaning Inventory: Realign weekly commitments with your top values and drop people-pleasing armor.',
    'Step 5 — Relational Triage: Dial down draining ties with kind boundaries and nurture safe, reciprocal fellowship.',
    'Step 6 — Patient Iteration: Implement one sustainable adjustment per week rather than chasing instant fixes.',
  ],
};

const BALANCED_PROTOCOL = {
  titleAr: 'مؤشر توازن طاقة مستقر نسبياً (Balanced Energy Baseline)',
  titleEn: 'Balanced Energy Baseline',
  summaryAr:
    'جميع الأبعاد الخمسة للتعب لديك تقع ضمن النطاق المنخفض إلى المعتدل، مما يدل على احتياطي طاقة جيد نسبياً حالياً. استمر في صيانة توازنك الوقائي وحماية رصيدك عبر المحاور الخمسة قبل تراكم أي استنزاف صامت.',
  summaryEn:
    'All five fatigue dimensions sit within a low-to-moderate range, indicating a relatively healthy current energy reserve. Keep practicing preventive maintenance across sleep, stillness, boundaries, meaning, and supportive relationships.',
  stepsAr: [
    'حافظ على مواعيد نوم ثابتة وفحص سنوي دوري للمؤشرات الأساسية (فيتامين D، B12، الحديد، والغدة الدرقية).',
    'خصّص مساحة يومية قصيرة للهدوء العقلي بعيداً عن الشاشات وتعدد المهام.',
    'راجع شهرياً التزاماتك وعلاقاتك للتأكد من بقائها متناغمة مع قيمك وحدودك الصحية.',
  ],
  stepsEn: [
    'Maintain regular sleep timing and routine annual lab checks (Vitamin D, B12, Ferritin, TSH).',
    'Preserve a daily screen-free stillness window to prevent silent cognitive buildup.',
    'Review commitments and social boundaries monthly to stay aligned with your core values.',
  ],
};

function renderDimensionIcon(dimension: FatigueDimension, className = 'w-5 h-5') {
  switch (dimension) {
    case 'physical':
      return <Activity className={className} />;
    case 'mental':
      return <Brain className={className} />;
    case 'emotional':
      return <HeartHandshake className={className} />;
    case 'spiritual':
      return <Compass className={className} />;
    case 'social':
      return <Users className={className} />;
  }
}

function getSeverityBadge(score: number, isAr: boolean) {
  if (score >= 70) {
    return {
      label: isAr ? 'استنزاف حاد' : 'High Drain',
      textClass: 'text-rose-600 dark:text-rose-400',
      dotClass: 'bg-rose-500',
    };
  }
  if (score >= 55) {
    return {
      label: isAr ? 'مرتفع' : 'Elevated',
      textClass: 'text-amber-600 dark:text-amber-400',
      dotClass: 'bg-amber-500',
    };
  }
  if (score >= 35) {
    return {
      label: isAr ? 'معتدل' : 'Moderate',
      textClass: 'text-sky-600 dark:text-sky-400',
      dotClass: 'bg-sky-500',
    };
  }
  return {
    label: isAr ? 'منخفض' : 'Low',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    dotClass: 'bg-emerald-500',
  };
}

function computeQuizResult(answers: Record<string, number>): ExistentialFatigueQuizResult {
  const dimensions: FatigueDimension[] = ['physical', 'mental', 'emotional', 'spiritual', 'social'];
  const rawScores: Record<FatigueDimension, number> = {
    physical: 0,
    mental: 0,
    emotional: 0,
    spiritual: 0,
    social: 0,
  };
  const maxPerDim = 3 * 4; // 3 items * max score 4 = 12

  FATIGUE_QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    rawScores[q.dimension] += val;
  });

  const scores: Record<FatigueDimension, number> = {
    physical: Math.round((rawScores.physical / maxPerDim) * 100),
    mental: Math.round((rawScores.mental / maxPerDim) * 100),
    emotional: Math.round((rawScores.emotional / maxPerDim) * 100),
    spiritual: Math.round((rawScores.spiritual / maxPerDim) * 100),
    social: Math.round((rawScores.social / maxPerDim) * 100),
  };

  const sorted = [...dimensions].sort((a, b) => scores[b] - scores[a]);
  const dominantDimension = sorted[0];
  const secondDimension = sorted[1];
  const topScore = scores[dominantDimension];
  const secondScore = scores[secondDimension];
  const elevatedDimensions = sorted.filter((dim) => scores[dim] >= 55);

  const overallIndex = Math.round(
    dimensions.reduce((acc, dim) => acc + scores[dim], 0) / dimensions.length
  );

  let classification: FatigueClassification = dominantDimension;
  if (topScore < 45) {
    classification = 'balanced';
  } else if (
    elevatedDimensions.length >= 3 ||
    (elevatedDimensions.length >= 2 && topScore - secondScore <= 10)
  ) {
    classification = 'mixed';
  }

  const secondaryDimension =
    secondScore >= 50 && secondDimension !== dominantDimension ? secondDimension : null;

  return {
    scores,
    rawScores,
    overallIndex,
    classification,
    dominantDimension,
    secondaryDimension,
    elevatedDimensions,
    answers,
  };
}

export const ExistentialFatigueQuiz: React.FC<ExistentialFatigueQuizProps> = ({
  onNavigateToArticle,
  onComplete,
  initialLanguage,
  className = '',
}) => {
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';

  // Sync optional initialLanguage once only if provided explicitly and differs
  const [localOverrideLang, setLocalOverrideLang] = useState<'ar' | 'en' | null>(
    initialLanguage ?? null
  );
  const activeLang = localOverrideLang ?? language;
  const isAr = activeLang === 'ar';
  const effectiveRTL = isAr;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const totalQuestions = FATIGUE_QUESTIONS.length;
  const currentQuestion = FATIGUE_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const allAnswered = answeredCount === totalQuestions;

  const result = useMemo(() => {
    if (!showResult) return null;
    return computeQuizResult(answers);
  }, [showResult, answers]);

  const handleLanguageSwitch = () => {
    soundManager.playTap();
    const nextLang = activeLang === 'ar' ? 'en' : 'ar';
    if (localOverrideLang !== null) {
      setLocalOverrideLang(nextLang);
    }
    if (nextLang !== language) {
      setLanguage(nextLang);
    } else {
      toggleLanguage();
    }
  };

  const handleSelectOption = (value: number) => {
    soundManager.playTap();
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
      }, 140);
    } else if (Object.keys(updated).length === totalQuestions) {
      soundManager.playResultReveal();
      const computed = computeQuizResult(updated);
      setShowResult(true);
      onComplete?.(computed);
    }
  };

  const handleCalculateResult = () => {
    if (!allAnswered) return;
    soundManager.playResultReveal();
    const computed = computeQuizResult(answers);
    setShowResult(true);
    onComplete?.(computed);
  };

  const handleReset = () => {
    soundManager.playTap();
    setAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
  };

  const sortedResultDimensions = useMemo(() => {
    if (!result) return [];
    const dims: FatigueDimension[] = ['physical', 'mental', 'emotional', 'spiritual', 'social'];
    return dims.sort((a, b) => result.scores[b] - result.scores[a]);
  }, [result]);

  return (
    <section
      dir={effectiveRTL ? 'rtl' : 'ltr'}
      aria-label={
        isAr
          ? 'اختبار التعب الوجودي متعدد الأبعاد — المقال الخامس (المحور السابع)'
          : 'Existential & 5-Dimension Fatigue Diagnostic Quiz — Article 5 (Axis 7)'
      }
      className={`rounded-3xl border overflow-hidden transition-colors duration-300 ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900 shadow-lg'
          : 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-2xl'
      } ${effectiveRTL ? "font-['Alexandria','Tajawal',system-ui,sans-serif]" : 'font-sans'} ${className}`}
    >
      {/* Clean Header Bar */}
      <div
        className={`px-5 sm:px-8 py-5 border-b flex flex-wrap items-center justify-between gap-4 ${
          isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/60 border-slate-800'
        }`}
      >
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className={isLight ? 'text-cyan-700' : 'text-cyan-400'}>
              {isAr ? 'مقياس المقال الخامس · المحور السابع' : 'Article 5 Diagnostic · Axis 7'}
            </span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>·</span>
            <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
              {isAr
                ? 'الجسدي · العقلي · العاطفي · الروحي · الاجتماعي'
                : 'Physical · Mental · Emotional · Spiritual · Social'}
            </span>
          </div>
          <h2
            className={`text-lg sm:text-2xl font-extrabold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr
              ? 'اختبار تشخيص نوع التعب واستنزاف الطاقة'
              : 'Existential & Multi-Source Fatigue Diagnostic'}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleLanguageSwitch}
            className={`min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {onNavigateToArticle && (
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onNavigateToArticle();
              }}
              className={`min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                isLight
                  ? 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border-cyan-200'
                  : 'bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border-cyan-500/30'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'المقال الخامس' : 'Article 5'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Quiz or Diagnostic Report Body */}
      <div className="p-5 sm:p-8">
        {!showResult ? (
          <div className="space-y-6">
            {/* Progress & Step Counter */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-bold">
                <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                  {isAr ? 'التقدم في التقييم التشخيصي' : 'Diagnostic Progress'}
                </span>
                <span
                  className={`tabular-nums font-extrabold ${
                    isLight ? 'text-cyan-700' : 'text-cyan-400'
                  }`}
                >
                  {String(currentIndex + 1).padStart(2, '0')} / {totalQuestions} · {progressPct}%
                </span>
              </div>

              <div
                className={`w-full h-2.5 rounded-full overflow-hidden ${
                  isLight ? 'bg-slate-200' : 'bg-slate-800'
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Compact Interactive Question Dot Matrix */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {FATIGUE_QUESTIONS.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        soundManager.playTap();
                        setCurrentIndex(idx);
                      }}
                      aria-label={
                        isAr ? `الانتقال إلى السؤال ${idx + 1}` : `Go to question ${idx + 1}`
                      }
                      className={`h-7 min-w-[28px] px-1.5 rounded-lg text-[11px] font-bold tabular-nums transition cursor-pointer ${
                        isCurrent
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : isAnswered
                          ? isLight
                            ? 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
                            : 'bg-cyan-900/50 text-cyan-300 hover:bg-cyan-800/60'
                          : isLight
                          ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                <div
                  className={`p-5 sm:p-7 rounded-2xl border space-y-3 ${
                    isLight
                      ? 'bg-slate-50/90 border-slate-200'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className={DIMENSION_PROFILES[currentQuestion.dimension][isLight ? 'accentTextLight' : 'accentTextDark']}>
                      {renderDimensionIcon(currentQuestion.dimension, 'w-4 h-4')}
                    </span>
                    <span
                      className={
                        DIMENSION_PROFILES[currentQuestion.dimension][
                          isLight ? 'accentTextLight' : 'accentTextDark'
                        ]
                      }
                    >
                      {isAr ? currentQuestion.cueAr : currentQuestion.cueEn}
                    </span>
                  </div>

                  <h3
                    className={`text-base sm:text-xl font-bold leading-relaxed ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr ? currentQuestion.textAr : currentQuestion.textEn}
                  </h3>
                </div>

                {/* 5-Point Frequency Options */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                  {LIKERT_OPTIONS.map((opt) => {
                    const selected = answers[currentQuestion.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectOption(opt.value)}
                        className={`min-h-[68px] p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex sm:flex-col items-center sm:items-start justify-between gap-2 ${
                          selected
                            ? 'bg-cyan-600 border-cyan-500 text-white shadow-md'
                            : isLight
                            ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-cyan-400 text-slate-900'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-cyan-500/60 text-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          <span className="text-sm font-extrabold">
                            {isAr ? opt.labelAr : opt.labelEn}
                          </span>
                          <span
                            className={`text-xs font-bold tabular-nums ${
                              selected
                                ? 'text-cyan-100'
                                : isLight
                                ? 'text-slate-400'
                                : 'text-slate-500'
                            }`}
                          >
                            {opt.value}/4
                          </span>
                        </div>
                        <span
                          className={`text-[11px] leading-snug ${
                            selected
                              ? 'text-cyan-50'
                              : isLight
                              ? 'text-slate-500'
                              : 'text-slate-400'
                          }`}
                        >
                          {isAr ? opt.hintAr : opt.hintEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => {
                  soundManager.playTap();
                  setCurrentIndex((prev) => Math.max(0, prev - 1));
                }}
                className={`min-h-[44px] px-4 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-slate-300 dark:border-slate-800'
                    : isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 cursor-pointer'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 cursor-pointer'
                }`}
              >
                {effectiveRTL ? (
                  <ArrowRight className="w-4 h-4" />
                ) : (
                  <ArrowLeft className="w-4 h-4" />
                )}
                <span>{isAr ? 'السؤال السابق' : 'Previous'}</span>
              </button>

              <div className="flex items-center gap-2.5">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    disabled={answers[currentQuestion.id] === undefined}
                    onClick={() => {
                      soundManager.playTap();
                      setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
                    }}
                    className={`min-h-[44px] px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
                      answers[currentQuestion.id] === undefined
                        ? 'opacity-40 cursor-not-allowed bg-slate-500 text-white'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-sm'
                    }`}
                  >
                    <span>{isAr ? 'السؤال التالي' : 'Next Question'}</span>
                    {effectiveRTL ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!allAnswered}
                    onClick={handleCalculateResult}
                    className={`min-h-[44px] px-5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 transition whitespace-nowrap shrink-0 ${
                      !allAnswered
                        ? 'opacity-40 cursor-not-allowed bg-slate-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-md'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isAr ? 'عرض التشخيص والتوصيات' : 'Reveal Diagnosis & Plan'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Primary Diagnosis Headline Banner */}
              {(() => {
                const isMixed = result.classification === 'mixed';
                const isBalanced = result.classification === 'balanced';
                const profile = DIMENSION_PROFILES[result.dominantDimension];

                const headline = isMixed
                  ? isAr
                    ? MIXED_PROTOCOL.titleAr
                    : MIXED_PROTOCOL.titleEn
                  : isBalanced
                  ? isAr
                    ? BALANCED_PROTOCOL.titleAr
                    : BALANCED_PROTOCOL.titleEn
                  : isAr
                  ? profile.diagnosisHeadlineAr
                  : profile.diagnosisHeadlineEn;

                const summary = isMixed
                  ? isAr
                    ? MIXED_PROTOCOL.summaryAr
                    : MIXED_PROTOCOL.summaryEn
                  : isBalanced
                  ? isAr
                    ? BALANCED_PROTOCOL.summaryAr
                    : BALANCED_PROTOCOL.summaryEn
                  : isAr
                  ? profile.diagnosisSummaryAr
                  : profile.diagnosisSummaryEn;

                const containerTint = isMixed
                  ? isLight
                    ? 'bg-purple-50 border-purple-200'
                    : 'bg-purple-950/30 border-purple-500/30'
                  : isBalanced
                  ? isLight
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-emerald-950/30 border-emerald-500/30'
                  : isLight
                  ? profile.tintLight
                  : profile.tintDark;

                const headlineAccent = isMixed
                  ? isLight
                    ? 'text-purple-800'
                    : 'text-purple-300'
                  : isBalanced
                  ? isLight
                    ? 'text-emerald-800'
                    : 'text-emerald-300'
                  : isLight
                  ? profile.accentTextLight
                  : profile.accentTextDark;

                return (
                  <div className={`p-6 sm:p-8 rounded-2xl border space-y-4 ${containerTint}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className={headlineAccent}>
                          {isMixed ? (
                            <Layers className="w-6 h-6" />
                          ) : isBalanced ? (
                            <ShieldCheck className="w-6 h-6" />
                          ) : (
                            renderDimensionIcon(result.dominantDimension, 'w-6 h-6')
                          )}
                        </span>
                        <span className={`text-xs font-extrabold ${headlineAccent}`}>
                          {isAr
                            ? 'النتيجة التشخيصية وفق المحور السابع'
                            : 'Diagnostic Classification · Article 5 Axis 7'}
                        </span>
                      </div>

                      <div className="text-xs font-extrabold tabular-nums">
                        <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                          {isAr ? 'مؤشر العبء الكلي:' : 'Overall Fatigue Index:'}{' '}
                        </span>
                        <span className={headlineAccent}>{result.overallIndex}%</span>
                      </div>
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-black ${headlineAccent}`}>
                      {headline}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLight ? 'text-slate-700' : 'text-slate-200'
                      }`}
                    >
                      {summary}
                    </p>
                  </div>
                );
              })()}

              {/* 5-Axis Diagnostic Breakdown (Physical, Mental, Emotional, Spiritual, Social) */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4
                    className={`text-base sm:text-lg font-extrabold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? 'تفصيل درجات الأبعاد الخمسة للتعب:'
                      : '5-Dimension Fatigue Breakdown:'}
                  </h4>
                  <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isAr
                      ? 'مرتبة من الأعلى استنزافاً إلى الأقل'
                      : 'Ranked from highest depletion to lowest'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sortedResultDimensions.map((dim) => {
                    const profile = DIMENSION_PROFILES[dim];
                    const score = result.scores[dim];
                    const sev = getSeverityBadge(score, isAr);

                    return (
                      <div
                        key={dim}
                        className={`p-5 rounded-2xl border space-y-3 ${
                          isLight
                            ? 'bg-slate-50/70 border-slate-200'
                            : 'bg-slate-950/60 border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={
                                profile[isLight ? 'accentTextLight' : 'accentTextDark']
                              }
                            >
                              {renderDimensionIcon(dim, 'w-5 h-5')}
                            </span>
                            <div>
                              <h5
                                className={`text-sm font-extrabold ${
                                  isLight ? 'text-slate-900' : 'text-white'
                                }`}
                              >
                                {isAr ? profile.titleAr : profile.titleEn}
                              </h5>
                              <p
                                className={`text-[11px] ${
                                  isLight ? 'text-slate-600' : 'text-slate-400'
                                }`}
                              >
                                {isAr ? profile.subtitleAr : profile.subtitleEn}
                              </p>
                            </div>
                          </div>

                          <div className="text-end shrink-0">
                            <div
                              className={`text-base font-black tabular-nums ${
                                profile[isLight ? 'accentTextLight' : 'accentTextDark']
                              }`}
                            >
                              {score}%
                            </div>
                            <div className={`text-[11px] font-bold inline-flex items-center gap-1.5 ${sev.textClass}`}>
                              <span className={`w-2 h-2 rounded-full ${sev.dotClass}`} />
                              <span>{sev.label}</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`w-full h-2.5 rounded-full overflow-hidden ${
                            isLight ? 'bg-slate-200' : 'bg-slate-800'
                          }`}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${profile.barClass}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>

                        <p
                          className={`text-xs leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          <strong className={isLight ? 'text-slate-800' : 'text-slate-200'}>
                            {isAr ? 'الأسباب المحتملة: ' : 'Likely roots: '}
                          </strong>
                          {isAr ? profile.causesAr : profile.causesEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tailored Recovery Recommendations */}
              <div className="space-y-4">
                <h4
                  className={`text-base sm:text-lg font-extrabold flex items-center gap-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'التوصيات العلاجية والعملية المخصصة لحالتك:'
                      : 'Personalized Recovery Recommendations:'}
                  </span>
                </h4>

                <div
                  className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                    isLight
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-950/70 border-slate-800'
                  }`}
                >
                  <div className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400">
                    {result.classification === 'mixed'
                      ? isAr
                        ? 'بروتوكول التدخل متعدد المستويات (المحور الثامن · 6 خطوات مرتبة)'
                        : 'Multi-Level Intervention Protocol (Axis 8 · Sequential 6 Steps)'
                      : result.classification === 'balanced'
                      ? isAr
                        ? 'توصيات الصيانة الوقائية والتوازن اليومي'
                        : 'Preventive Maintenance & Daily Energy Protection'
                      : isAr
                      ? DIMENSION_PROFILES[result.dominantDimension].axisRefAr
                      : DIMENSION_PROFILES[result.dominantDimension].axisRefEn}
                  </div>

                  <ul className="space-y-3">
                    {(result.classification === 'mixed'
                      ? isAr
                        ? MIXED_PROTOCOL.stepsAr
                        : MIXED_PROTOCOL.stepsEn
                      : result.classification === 'balanced'
                      ? isAr
                        ? BALANCED_PROTOCOL.stepsAr
                        : BALANCED_PROTOCOL.stepsEn
                      : isAr
                      ? DIMENSION_PROFILES[result.dominantDimension].recommendationsAr
                      : DIMENSION_PROFILES[result.dominantDimension].recommendationsEn
                    ).map((step, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                          isLight ? 'text-slate-700' : 'text-slate-200'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg font-extrabold text-xs tabular-nums flex items-center justify-center shrink-0 mt-0.5 ${
                            isLight
                              ? 'bg-cyan-100 text-cyan-800'
                              : 'bg-cyan-900/60 text-cyan-300'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Secondary Elevated Dimension Guidance (if present and not balanced) */}
                {result.classification !== 'balanced' &&
                  result.secondaryDimension &&
                  result.classification !== 'mixed' && (() => {
                    const secProfile = DIMENSION_PROFILES[result.secondaryDimension];
                    return (
                      <div
                        className={`p-5 rounded-2xl border space-y-3 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-slate-950/50 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-extrabold">
                          <span
                            className={
                              secProfile[isLight ? 'accentTextLight' : 'accentTextDark']
                            }
                          >
                            {isAr
                              ? `توصية مساندة للبُعد الثانوي المرتفع: ${secProfile.titleAr}`
                              : `Secondary Elevated Axis Guidance: ${secProfile.titleEn}`}
                          </span>
                          <span className="tabular-nums font-black">
                            {result.scores[result.secondaryDimension]}%
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs leading-relaxed">
                          {(isAr
                            ? secProfile.recommendationsAr.slice(0, 2)
                            : secProfile.recommendationsEn.slice(0, 2)
                          ).map((tip, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-2 ${
                                isLight ? 'text-slate-700' : 'text-slate-300'
                              }`}
                            >
                              <span className="font-black text-cyan-500">·</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
              </div>

              {/* Clinical Referral Red Flags (Article 5 Axis 9) & Educational Disclaimer */}
              <div
                className={`p-5 rounded-2xl border space-y-2.5 ${
                  isLight
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-amber-950/25 border-amber-500/30 text-amber-100'
                }`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400">
                  <Stethoscope className="w-4 h-4 shrink-0" />
                  <span>
                    {isAr
                      ? 'متى تطلب المساعدة المهنية؟ (المحور التاسع · إخلاء مسؤولية تثقيفي)'
                      : 'When to Seek Professional Care (Axis 9 · Educational Disclaimer)'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  {isAr
                    ? 'هذا المقياس أداة وعي ذاتي وتوجيه تربوي مستندة إلى المقال الخامس ولا يُغني عن التقييم الطبي أو النفسي المباشر. استشر طبيباً أو مختصاً نفسياً إذا استمر التعب لأكثر من 3 أشهر، أو لم يستجب لتعديلات نمط الحياة، أو أثّر على عملك وعلاقاتك، أو رافقته آلام جسدية شديدة أو ضيق نفسي حاد.'
                    : 'This diagnostic quiz is an educational self-reflection tool based on Article 5 and does not replace medical or psychological evaluation. Consult a physician or licensed mental health professional if fatigue persists longer than 3 months, resists lifestyle steps, impairs daily work or relationships, or brings severe distress or pain.'}
                </p>
                {result.overallIndex >= 65 && (
                  <div className="flex items-start gap-2 pt-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'ملاحظة مهمة: ارتفاع مؤشر العبء الكلي لديك يشير إلى أهمية البدء بالفحص الطبي الأساسي وطلب مساندة مختصة.'
                        : 'Important Note: Your elevated overall fatigue index suggests prioritizing baseline medical labs alongside professional guidance.'}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/70 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4 text-cyan-500" />
                  <span>{isAr ? 'إعادة الاختبار' : 'Retake Assessment'}</span>
                </button>

                {onNavigateToArticle && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      onNavigateToArticle();
                    }}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer shadow-md whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {isAr
                        ? 'العودة لقراءة المقال الخامس كاملاً'
                        : 'Read Full Article 5 Guide'}
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default ExistentialFatigueQuiz;
