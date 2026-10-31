// Scientific Intelligence & Cognitive Assessment Batteries
// 1. Howard Gardner (1983/1999) 9 Multiple Intelligences & Walter McKenzie / Tepper Inventory (45 Questions)
// 2. General Intelligence (IQ): Raven's Progressive Matrices (Spearman's g) + CHC Model (Stanford-Binet SB5 / Wechsler WAIS-IV) (25 Questions)
// 3. Emotional Intelligence (EQ): Reuven Bar-On EQ-i Mixed Model + Mayer-Salovey-Caruso MSCEIT Ability Scenarios (25 Questions)
// 4. Cognitive & Professional Aptitude Battery: CogAT + Wonderlic Speed & Problem-Solving Assessment (25 Questions)

export type IntelligenceBatteryType =
  | 'multiple_intelligences'
  | 'general_iq_raven_chc'
  | 'emotional_intelligence_eq'
  | 'cognitive_aptitude_cogat';

export interface IntelligenceBatteryMeta {
  id: IntelligenceBatteryType;
  titleAr: string;
  titleEn: string;
  theoristAr: string;
  scientificScaleName: string;
  questionCount: number;
  recommendedMinutes: number;
  icon: string;
  badgeAr: string;
  accentColor: string;
  descriptionAr: string;
  instructionsAr: string[];
}

export const INTELLIGENCE_BATTERIES_CATALOG: IntelligenceBatteryMeta[] = [
  {
    id: 'multiple_intelligences',
    titleAr: 'مقياس الذكاءات المتعددة الشامل (9 ذكاءات)',
    titleEn: 'McKenzie & Tepper Multiple Intelligences Inventory (Howard Gardner)',
    theoristAr: 'البروفيسور هوارد جاردنر (جامعة هارفارد) ووالتر ماكينزي',
    scientificScaleName: 'McKenzie’s MI Inventory & Tepper Scale (9 Domains)',
    questionCount: 45,
    recommendedMinutes: 20,
    icon: '🧠',
    badgeAr: '9 ذكاءات • 45 سؤالاً محكماً',
    accentColor: '#a855f7',
    descriptionAr:
      'المقياس التطبيقي الكامل لنظرية الذكاءات المتعددة بالتحديث التساعي (شاملاً الذكاء الوجودي والفلسفي). يحلل 9 أنواع ذكاء و27 مهارة فرعية لتحديد بصمتك المعرفية والمهن الأنسب لك.',
    instructionsAr: [
      'يحتوي هذا المقياس على 45 بنداً سلوكياً ومعرفياً موزعة بالتساوي على الذكاءات التسعة (5 أسئلة لكل ذكاء).',
      'لا توجد إجابات صحيحة أو خاطئة؛ اختر الدرجة التي تعبر عن طبيعتك الفعلية على مقياس ليكرت الخماسي.',
      'يتم حفظ إجاباتك تلقائياً بعد كل سؤال لضمان عدم ضياع تقدمك في حال انقطاع الاتصال.',
    ],
  },
  {
    id: 'general_iq_raven_chc',
    titleAr: 'اختبار الذكاء العام ومصفوفات رافين (IQ & CHC)',
    titleEn: 'Raven’s Progressive Matrices & Wechsler/SB5 CHC Cognitive Battery',
    theoristAr: 'جون رافين (Raven)، ديفيد وكسلر (WAIS-IV)، ولويس تيرمان (SB5)',
    scientificScaleName: 'Raven’s Standard Progressive Matrices + CHC 5-Factor Model (30 Items)',
    questionCount: 30,
    recommendedMinutes: 25,
    icon: '📐',
    badgeAr: 'مصفوفات بصرية ومنطق • 30 سؤالاً',
    accentColor: '#3b82f6',
    descriptionAr:
      'بطارية قياس العامل العام للذكاء (g-factor) ونموذج كاتل-هورن-كارول (CHC) عبر 30 سؤالاً محكماً: 6 مصفوفات رافين بصرية، 6 استدلال كمي، 6 استيعاب لفظي، 6 تصور مكاني، و6 ذاكرة عاملة.',
    instructionsAr: [
      'يتكون الاختبار من 30 سؤالاً متدرج الصعوبة موزعة بالتساوي على 5 أبعاد معرفية (6 أسئلة لكل بُعد).',
      'تتضمن الأسئلة مصفوفات هندسية بصرية ناقصة وعلاقات منطقية وكمية؛ لكل سؤال إجابة واحدة صحيحة فقط.',
      'تُحسب الدرجة المعيارية (Deviation IQ: متوسط 100 وانحراف معياري 15) والمئين الإحصائي بدقة تامة بناءً على إجاباتك الفعلية.',
    ],
  },
  {
    id: 'emotional_intelligence_eq',
    titleAr: 'مقياس الذكاء العاطفي والانفعالي المعتمد (Bar-On & MSCEIT)',
    titleEn: 'Bar-On EQ-i & Mayer-Salovey-Caruso Emotional Ability Scale',
    theoristAr: 'روبن بار-أون (Bar-On) وجون ماير وبيتر سالوفي (MSCEIT)',
    scientificScaleName: 'Bar-On EQ-i Composite Scale + MSCEIT 4-Branch Scenarios (30 Items)',
    questionCount: 30,
    recommendedMinutes: 20,
    icon: '💖',
    badgeAr: 'مواقف انفعالية وعلمية • 30 سؤالاً',
    accentColor: '#ec4899',
    descriptionAr:
      'توليفة علمية من 30 موقفاً سلوكياً تجمع بين النموذج المختلط لبار-أون (5 أبعاد رئيسية) ونموذج القدرات لماير وسالوفي (MSCEIT) لقياس إدراك المشاعر، توظيفها، فهم تحولاتها، وإدارتها بحكمة.',
    instructionsAr: [
      'يتكون الاختبار من 30 موقفاً واقعياً وسلوكياً موزعة بالتساوي على 5 أبعاد وجدانية (6 مواقف لكل بُعد).',
      'اقرأ كل سيناريو بعناية واختر الاستجابة التي تعكس تصرفك الحقيقي وفق معيار إجماع الخبراء (Expert Consensus).',
      'يصدر التقرير تحليلاً مفصلاً للأبعاد الخمسة للذكاء العاطفي ومراجعة تفصيلية لكل موقف.',
    ],
  },
  {
    id: 'cognitive_aptitude_cogat',
    titleAr: 'بطارية القدرات المعرفية والذكاء المهني (CogAT & Wonderlic)',
    titleEn: 'Cognitive Abilities Test (CogAT) & Wonderlic Professional Aptitude',
    theoristAr: 'ديفيد لوهان (CogAT) وإلدون وندرليك (Wonderlic)',
    scientificScaleName: 'CogAT Form 8 + Wonderlic Personnel Cognitive Assessment (30 Items)',
    questionCount: 30,
    recommendedMinutes: 22,
    icon: '⚡',
    badgeAr: 'قدرات لفظية وكمية ومكانية • 30 سؤالاً',
    accentColor: '#10b981',
    descriptionAr:
      'الاختبار المعتمد عالمياً لتقييم الاستعداد المعرفي والمهني وسرعة حل المشكلات عبر 30 مسألة موزعة بالتساوي على 3 بطاريات: اللفظية (10)، الكمية (10)، وغير اللفظية/الهندسية (10).',
    instructionsAr: [
      'يحتوي هذا التقييم على 30 مسألة تطبيقية تقيس سرعة البديهة، اتخاذ القرار، والتحليل النقدي.',
      'لكل مسألة إجابة واحدة صحيحة؛ يمكنك التنقل بين جميع الأسئلة الـ 30 ومراجعتها قبل الإنهاء.',
      'يظهر التقرير ترتيبك المئيني الدقيق ومفتاح الحل العلمي الكامل لجميع الأسئلة الـ 30.',
    ],
  },
];

export type IntelligenceCategory =
  | 'linguistic'
  | 'logical'
  | 'spatial'
  | 'kinesthetic'
  | 'musical'
  | 'interpersonal'
  | 'intrapersonal'
  | 'naturalistic'
  | 'existential';

export type SubSkillKey =
  // Linguistic
  | 'writing_expression'
  | 'rhetoric_dialogue'
  | 'verbal_memory'
  // Logical
  | 'deductive_analysis'
  | 'critical_thinking'
  | 'number_management'
  // Spatial
  | 'spatial_visualization'
  | 'visual_orientation'
  | 'design_and_arts'
  // Kinesthetic
  | 'motor_coordination'
  | 'manual_dexterity'
  | 'kinesthetic_learning'
  // Musical
  | 'tonal_discrimination'
  | 'rhythm_perception'
  | 'musical_appreciation'
  // Interpersonal
  | 'empathy_communication'
  | 'leadership_conflict'
  | 'teamwork_synergy'
  // Intrapersonal
  | 'self_awareness'
  | 'discipline_motivation'
  | 'philosophical_reflection'
  // Naturalistic
  | 'environmental_exploration'
  | 'natural_patterning'
  | 'nature_harmony'
  // Existential (9th Intelligence - Gardner 1999)
  | 'cosmic_meaning'
  | 'big_picture_synthesis'
  | 'ethical_transcendence';

export interface SubSkillDefinition {
  key: SubSkillKey;
  category: IntelligenceCategory;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
}

export interface IntelligenceMeta {
  id: IntelligenceCategory;
  titleAr: string;
  titleEn: string;
  icon: string;
  color: string;
  gradient: string;
  badgeBorder: string;
  scientificFoundationAr: string;
  descriptionAr: string;
  subSkills: SubSkillDefinition[];
  suggestedCareersAr: string[];
  optimalLearningStylesAr: string[];
  weaknessAndRisksAr: string[];
  developmentExercisesAr: string[];
}

export interface IntelligenceQuestion {
  id: string;
  category: IntelligenceCategory;
  subSkill: SubSkillKey;
  questionNumber: number;
  textAr: string;
  femaleTextAr?: string;
  situationContextAr: string;
}

export interface ObjectiveBatteryQuestion {
  id: string;
  batteryId: 'general_iq_raven_chc' | 'emotional_intelligence_eq' | 'cognitive_aptitude_cogat';
  questionNumber: number;
  domainKey: string;
  domainTitleAr: string;
  difficulty: 1 | 2 | 3; // 1 = تأسيسي, 2 = متقدم, 3 = عبقري / معقد
  matrixVisualId?: string; // Renders interactive SVG Raven Matrix when present
  promptAr: string;
  subPromptAr?: string;
  explanationAr?: string;
  options: {
    id: string;
    labelAr: string;
    scoreWeight: number; // For IQ/CogAT: 100 for correct, 0 for wrong; For EQ: 20..100 expert consensus weight
    isCorrect?: boolean;
    explanationAr?: string;
  }[];
}

export interface QuestionAuditItem {
  questionNumber: number;
  domainTitleAr: string;
  difficulty: 1 | 2 | 3;
  promptAr: string;
  selectedLabelAr: string;
  correctLabelAr: string;
  isCorrect: boolean;
  scoreEarned: number;
  explanationAr: string;
}

export interface ObjectiveBatteryResult {
  batteryId: 'general_iq_raven_chc' | 'emotional_intelligence_eq' | 'cognitive_aptitude_cogat';
  batteryTitleAr: string;
  theoristAr: string;
  completedAt: string;
  timeSpentSeconds: number;
  totalQuestions: number;
  answeredCount: number;
  correctOrHighCount: number;
  accuracyPercentage: number;
  overallPercentage: number;
  standardScore: number; // e.g. IQ 65-145 or EQ 65-145 (Mean 100, SD 15)
  percentileRank: number; // Exact Gaussian CDF percentile
  classificationTitleAr: string;
  classificationDescAr: string;
  executiveSummaryAr: string;
  domainScores: {
    domainKey: string;
    domainTitleAr: string;
    correctCount: number;
    totalCount: number;
    percentage: number;
    levelAr: 'مرتفع جداً' | 'مرتفع' | 'متوسط متوازن' | 'قيد التطوير';
    color: string;
    interpretationAr: string;
  }[];
  questionReview: QuestionAuditItem[];
  strengthsAr: string[];
  growthRecommendationsAr: string[];
  suggestedCareersAr: string[];
}

export interface IntelligenceTestResult {
  completedAt: string;
  ageGroup: string;
  gender: 'male' | 'female';
  answeredCount?: number;
  totalQuestions?: number;
  totalRawScore?: number;
  maxTotalRawScore?: number;
  normativePercentile?: number;
  categoryScores: Record<
    IntelligenceCategory,
    {
      rawScore: number;
      maxScore: number;
      percentage: number;
      answeredInCategory?: number;
    }
  >;
  subSkillScores: Record<
    SubSkillKey,
    {
      rawScore: number;
      maxScore: number;
      percentage: number;
      titleAr: string;
      category: IntelligenceCategory;
    }
  >;
  topThree: IntelligenceCategory[];
  primaryIntelligence: IntelligenceCategory;
  overallAverage: number;
}

// -------------------------------------------------------------------------
// 9 Intelligences Metadata with Sub-skills, Careers, Exercises
// -------------------------------------------------------------------------
export const INTELLIGENCE_CATEGORIES: Record<IntelligenceCategory, IntelligenceMeta> = {
  linguistic: {
    id: 'linguistic',
    titleAr: 'الذكاء اللغوي واللفظي',
    titleEn: 'Linguistic-Verbal Intelligence',
    icon: '✍️',
    color: '#ec4899',
    gradient: 'from-pink-600 via-rose-600 to-red-500',
    badgeBorder: 'border-pink-500/40 bg-pink-500/10 text-pink-300',
    scientificFoundationAr:
      'استند على دراسات جاردنر ومقياس ماكينزي للطلاقة الدلالية والذاكرة السمعية اللفظية في منطقتي بروكا وفيرنيكه بالفص الصدغي الأيسر.',
    descriptionAr:
      'القدرة العالية على استخدام الكلمات المكتوبة والمنطوقة بفاعلية، وامتلاك حساسية فريدة لترتيب الكلمات ومعانيها وأوزانها البلاغية وإقناع الآخرين.',
    subSkills: [
      {
        key: 'writing_expression',
        category: 'linguistic',
        titleAr: 'الكتابة والتعبير البلاغي',
        titleEn: 'Writing & Expression',
        descriptionAr: 'صياغة النصوص والمقالات والأفكار بسلاسة وتدفق لغوي غني بالمفردات.',
      },
      {
        key: 'rhetoric_dialogue',
        category: 'linguistic',
        titleAr: 'الخطابة والحوار والإقناع',
        titleEn: 'Rhetoric & Oratory',
        descriptionAr: 'قوة الحجة، سلاسة التحدث أمام الجمهور، والقدرة على المناظرة والإقناع.',
      },
      {
        key: 'verbal_memory',
        category: 'linguistic',
        titleAr: 'الحفظ اللفظي واكتساب اللغات',
        titleEn: 'Verbal Memory & Languages',
        descriptionAr: 'سرعة التقاط الكلمات الجديدة، المصطلحات، واكتساب اللغات واللهجات بسهولة.',
      },
    ],
    suggestedCareersAr: [
      'كاتب صحفي وروائي ومؤلف محترف',
      'محامٍ ومستشار قانوني ومرافعات قضائية',
      'مترجم فوري ودبلوماسي دولي',
      'متحدث رسمي وخبير اتصال مؤسسي وعلاقات عامة',
      'أستاذ لغويات ومعد محتوى إعلامي واستراتيجي',
    ],
    optimalLearningStylesAr: [
      'التعلم بالقراءة والتدوين وتلخيص الأفكار في هوامش مقالية منظمة',
      'تسجيل الأفكار صوتياً وإعادة صياغتها بأسلوبك الخاص',
      'المشاركة في حلقات النقاش والمناظرات الفكرية لشحذ الأفكار',
    ],
    weaknessAndRisksAr: [
      'الإفراط في الجدال اللفظي والتدقيق الزائد في أخطاء المحيطين اللغوية',
      'الميل إلى التفكير المجرد المعتمد على الكلمات بدلاً من التطبيق العملي الملموس',
    ],
    developmentExercisesAr: [
      'كتابة 300 كلمة يومياً عن فكرة معقدة وتبسيطها لغير المتخصصين',
      'حفظ 5 مفردات جديدة أسبوعياً وتوظيفها في سياقات حوارية',
      'ممارسة الإلقاء الارتجالي لمدة 3 دقائق أمام المرآة دون تحضير مسبق',
    ],
  },

  logical: {
    id: 'logical',
    titleAr: 'الذكاء المنطقي - الرياضي',
    titleEn: 'Logical-Mathematical Intelligence',
    icon: '📐',
    color: '#3b82f6',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    badgeBorder: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    scientificFoundationAr:
      'معتمد على دراسات جان بياجيه وهوارد جاردنر ومقاييس التفكير الاستنباطي وحل المشكلات الاستدلالية بالفص الجداري الجبهي.',
    descriptionAr:
      'القدرة على التفكير المنطقي، فك الشيفرات الرقمية، استكشاف الأنماط الخفية، التعامل مع السلاسل الاستدلالية وحل المعضلات المعقدة بمنهجية صارمة.',
    subSkills: [
      {
        key: 'deductive_analysis',
        category: 'logical',
        titleAr: 'التحليل الاستدلالي والسببي',
        titleEn: 'Deductive Analysis',
        descriptionAr: 'تفكيك المشاكل الصعبة إلى خطوات منطقية متسلسلة تعتمد على السبب والنتيجة.',
      },
      {
        key: 'critical_thinking',
        category: 'logical',
        titleAr: 'التفكير النقدي وفحص الفرضيات',
        titleEn: 'Critical Thinking',
        descriptionAr: 'اختبار الفرضيات، اكتشاف المغالطات المنطقية، وتقييم الأدلة بموضوعية وحيادية.',
      },
      {
        key: 'number_management',
        category: 'logical',
        titleAr: 'إدارة الأرقام والنمذجة الكمية',
        titleEn: 'Quantitative & Numerical Management',
        descriptionAr: 'السرعة في الحساب الذهني، إدراك النسب الإحصائية، وبناء المعادلات الدقيقة.',
      },
    ],
    suggestedCareersAr: [
      'مهندس برمجيات ومعماري نظم ذكاء اصطناعي',
      'محلل بيانات مالي واكتواري واستثماري',
      'عالم رياضيات وباحث فيزيائي وأكاديمي',
      'محقق جنائي مالي وخبير تدقيق استراتيجي',
      'خبير أمن سيبراني وتشفير خوارزمي',
    ],
    optimalLearningStylesAr: [
      'تحويل المعلومات إلى جداول ومخططات انسيابية ورسوم بيانية',
      'البحث عن السبب الأساسي والبرهان وراء كل قاعدة أو نظرية قبل حفظها',
      'حل ألغاز البرمجة والمنطق الرياضي لترسيخ المفاهيم المعقدة',
    ],
    weaknessAndRisksAr: [
      'محاولة عقلنة المشاعر الإنسانية وإهمال الجوانب العاطفية غير القابلة للقياس',
      'الإصابة بـ "شلل التحليل" (Analysis Paralysis) وتأخير القرارات بحثاً عن المثالية',
    ],
    developmentExercisesAr: [
      'حل لغز منطقي أو مسألة سودوكو متقدمة يومياً خلال 15 دقيقة',
      'تحليل ميزانية أو سيناريو واقعي وبناء نموذج احتمالات إحصائي له',
      'تحديد 3 مغالطات منطقية في مقال صحفي أو حوار أسبوعياً',
    ],
  },

  spatial: {
    id: 'spatial',
    titleAr: 'الذكاء المكاني - البصري',
    titleEn: 'Spatial-Visual Intelligence',
    icon: '🎨',
    color: '#8b5cf6',
    gradient: 'from-purple-600 via-violet-600 to-indigo-500',
    badgeBorder: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
    scientificFoundationAr:
      'يقيس معالجة الصور الذهنية ثلاثية الأبعاد والتدوير العقلي والتوجيه الطوبوغرافي في الفص القذالي والجداري الأيمن.',
    descriptionAr:
      'القدرة الفائقة على إدراك العالم المرئي بدقة، وتشكيل تمثيلات ذهنية للأشكال والمساحات، والتفكير بالألوان والخطوط والأبعاد الهندسية.',
    subSkills: [
      {
        key: 'spatial_visualization',
        category: 'spatial',
        titleAr: 'التصور الفضائي ثلاثي الأبعاد',
        titleEn: '3D Spatial Visualization',
        descriptionAr: 'تخيل الأجسام وتحريكها وتدويرها ذهنياً في الفراغ بدقة عالية.',
      },
      {
        key: 'visual_orientation',
        category: 'spatial',
        titleAr: 'التوجيه البصري وقراءة الخرائط',
        titleEn: 'Visual Navigation & Orientation',
        descriptionAr: 'قراءة المخططات والخرائط وسرعة حفظ المسارات والمواقع الجغرافية.',
      },
      {
        key: 'design_and_arts',
        category: 'spatial',
        titleAr: 'التصميم والتناسق الفني',
        titleEn: 'Design, Aesthetics & Visual Balance',
        descriptionAr: 'حس رفيع لاختيار الألوان، توزيع الكتل البصرية، والرسم والتنسيق الجمالي.',
      },
    ],
    suggestedCareersAr: [
      'مهندس معماري ومخطط مدن وعمران',
      'مصمم جرافيك وتجربة مستخدم (UI/UX Product Designer)',
      'مخرج سينمائي ومصور فوتوغرافي محترف',
      'طيار مدني وملاح جوي وبحري',
      'جراح تجميل أو خبير نظم معلومات جغرافية (GIS)',
    ],
    optimalLearningStylesAr: [
      'استخدام الخرائط الذهنية (Mind Maps) الملونة لربط المفاهيم',
      'مشاهدة العروض المرئية والنماذج التفاعلية ثلاثية الأبعاد',
      'رسم رسوم توضيحية جانبية لكل فكرة جديدة أثناء الدراسة',
    ],
    weaknessAndRisksAr: [
      'الملل السريع من المحاضرات الصوتية الطويلة والنصوص الخالية من الصور',
      'صعوبة شرح الأفكار شفهياً دون الاستعانة برسم أو مخطط توضيحي',
    ],
    developmentExercisesAr: [
      'رسم خريطة تفصيلية لحيّك أو طريقك المعتاد من الذاكرة فقط',
      'تفكيك شكل هندسي ثلاثي الأبعاد معقد ذهنياً وإعادة تركيبه بالخيال',
      'ممارسة ألعاب التدوير الذهني والشطرنج البصري والتصوير الفوتوغرافي',
    ],
  },

  kinesthetic: {
    id: 'kinesthetic',
    titleAr: 'الذكاء الجسدي - الحركي',
    titleEn: 'Bodily-Kinesthetic Intelligence',
    icon: '⚡',
    color: '#f97316',
    gradient: 'from-amber-600 via-orange-600 to-rose-500',
    badgeBorder: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    scientificFoundationAr:
      'يرتبط بقشرة الحركة الأولية والعقد القاعدية والمخيخ المنظم للتوازن الحسي والتوافق العصبي العضلي الدقيق.',
    descriptionAr:
      'المهارة في استخدام الجسد للتعبير عن الأفكار والمشاعر، والتحكم الدقيق بالأطراف والأصابع، والبراعة الفائقة في التعامل مع الأدوات اليدوية والأنشطة الحركية.',
    subSkills: [
      {
        key: 'motor_coordination',
        category: 'kinesthetic',
        titleAr: 'التنسيق الحركي والتوازن',
        titleEn: 'Motor Coordination & Balance',
        descriptionAr: 'التحكم الدقيق بالجسد، سرعة رد الفعل، والبراعة الرياضية الميدانية.',
      },
      {
        key: 'manual_dexterity',
        category: 'kinesthetic',
        titleAr: 'المهارات اليدوية الدقيقة',
        titleEn: 'Fine Manual Dexterity',
        descriptionAr: 'إتقان الحرف، تفكيك وإصلاح الأجهزة، الحفر، النحت، أو العمليات الدقيقة.',
      },
      {
        key: 'kinesthetic_learning',
        category: 'kinesthetic',
        titleAr: 'التعلم بالممارسة والتجربة',
        titleEn: 'Learning by Doing & Tactile Memory',
        descriptionAr: 'استيعاب العلوم والمهارات عبر لمس الأدوات وتجربتها عملياً بدلاً من مجرد المشاهدة.',
      },
    ],
    suggestedCareersAr: [
      'جراح متخصص في العمليات الميكروسكوبية الدقيقة',
      'رياضي محترف ومدرب تأهيل ولياقة بدنية',
      'مهندس ميكانيك وروبوتات وصانع نماذج أولية',
      'طبيب أسنان أو أخصائي علاج طبيعي وتأهيلي',
      'حرفي نحت وفنون تطبيقية وتصنيع دقيق',
    ],
    optimalLearningStylesAr: [
      'الدراسة مع الحركة الخفيفة أو المشي المتقطع لتنشيط التركيز',
      'تطبيق كل فكرة نظرية فوراً في مشروع تجريبي ملموس',
      'استخدام النماذج الحقيقية والقطع القابلة للتركيب والتفكيك',
    ],
    weaknessAndRisksAr: [
      'صعوبة الجلوس لفترات طويلة في المكاتب وقاعات المحاضرات المغلقة',
      'الاندفاع أحياناً للتنفيذ قبل اكتمال دراسة الجوانب النظرية للمهمة',
    ],
    developmentExercisesAr: [
      'ممارسة تمارين التوازن والتنسيق العصبي العضلي كالرياضات الفردية',
      'تفكيك جهاز إلكتروني أو ميكانيكي وإعادة تركيبه بعناية يدوية',
      'تعلم مهارة يدوية دقيقة كالخط العربي أو العزف أو التجميع الإلكتروني',
    ],
  },

  musical: {
    id: 'musical',
    titleAr: 'الذكاء الموسيقي والإيقاعي',
    titleEn: 'Musical-Rhythmic Intelligence',
    icon: '🎵',
    color: '#06b6d4',
    gradient: 'from-cyan-600 via-teal-600 to-emerald-500',
    badgeBorder: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    scientificFoundationAr:
      'يعتمد على القشرة السمعية في الفص الصدغي الأيمن ومعالجة الترددات الصوتية والهارموني والتوقيت العصبي الدقيق.',
    descriptionAr:
      'الحساسية الشديدة للنغمات والطبقات الصوتية والإيقاعات، وسرعة حفظ الأنماط السمعية وتذكر الكلمات والأحداث عبر أوزانها الصوتية.',
    subSkills: [
      {
        key: 'tonal_discrimination',
        category: 'musical',
        titleAr: 'التمييز النغمي والطبقات',
        titleEn: 'Pitch & Tonal Discrimination',
        descriptionAr: 'التقاط الفروق الطفيفة بين الترددات والطبقات الصوتية والنشاز بدقة.',
      },
      {
        key: 'rhythm_perception',
        category: 'musical',
        titleAr: 'الإدراك الإيقاعي وضبط الوزن',
        titleEn: 'Rhythm & Metric Perception',
        descriptionAr: 'الشعور بالنبض الإيقاعي الداخلي، وضبط توقيت الكلمات والمقاطع بدقة متناهية.',
      },
      {
        key: 'musical_appreciation',
        category: 'musical',
        titleAr: 'التذوق السمعي والذاكرة الصوتية',
        titleEn: 'Acoustic Appreciation & Auditory Memory',
        descriptionAr: 'التأثر بالألحان، حفظ الأصوات ونبرات الحديث، والقدرة على ابتكار فواصل سمعية.',
      },
    ],
    suggestedCareersAr: [
      'مهندس صوتيات وماكساج وتأثيرات سينمائية',
      'قارئ ومرتل متقن للمقامات الصوتية أو منشد ومؤلف',
      'أخصائي نطق وتخاطب وتدريب صوتي وإلقائي',
      'مخرج مؤثرات صوتية ومنتج بودكاست',
      'محلل بصمات صوتية وباحث صوتيات فيزيائية',
    ],
    optimalLearningStylesAr: [
      'تلحين القواعد والمعلومات أو وضعها في إيقاعات وأوزان شعرية',
      'الاستماع للموسيقى التصويرية الهادئة أو أصوات الطبيعة أثناء التركيز',
      'الاستفادة من الكتب الصوتية والبودكاست في تحصيل المعرفة',
    ],
    weaknessAndRisksAr: [
      'التشتت السريع بالضوضاء والأصوات المحيطة غير المتناغمة في بيئة العمل',
      'الحساسية المفرطة تجاه نبرات الصوت وطريقة الحديث قبل مضمون الكلام',
    ],
    developmentExercisesAr: [
      'الاستماع لمقطوعة صوتية وتحديد الطبقات والأدوات المنفردة بدقة',
      'تدريب الأذن على تمييز المقامات الصوتية وإيقاعات الشعر العربي',
      'حفظ مقطع معرفي طويل عبر تحويله إلى منظومة أو وزن إيقاعي متكرر',
    ],
  },

  interpersonal: {
    id: 'interpersonal',
    titleAr: 'الذكاء الاجتماعي والعلاقات',
    titleEn: 'Interpersonal Intelligence',
    icon: '🤝',
    color: '#10b981',
    gradient: 'from-emerald-600 via-green-600 to-teal-500',
    badgeBorder: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    scientificFoundationAr:
      'يستند إلى دراسات الخلايا العصبية المرآتية (Mirror Neurons) ونظرية العقل (Theory of Mind) في الفص الجبهي المداري.',
    descriptionAr:
      'القدرة العالية على فهم مشاعر الآخرين، قراءة دوافعهم ونواياهم غير المنطوقة، وبناء شبكات علاقات متينة، وقيادة فرق العمل والتأثير فيهم.',
    subSkills: [
      {
        key: 'empathy_communication',
        category: 'interpersonal',
        titleAr: 'التعاطف وقراءة المشاعر',
        titleEn: 'Empathy & Non-Verbal Reading',
        descriptionAr: 'التقاط إشارات لغة الجسد، نبرة الصوت، والمشاعر الخفية لدى الآخرين واستيعابها.',
      },
      {
        key: 'leadership_conflict',
        category: 'interpersonal',
        titleAr: 'القيادة وحل النزاعات',
        titleEn: 'Leadership & Conflict Resolution',
        descriptionAr: 'التوسط بين الأطراف المتنازعة، تقريب وجهات النظر، وتوجيه المجموعات نحو الأهداف.',
      },
      {
        key: 'teamwork_synergy',
        category: 'interpersonal',
        titleAr: 'العمل الجماعي والاندماج',
        titleEn: 'Teamwork & Interpersonal Synergy',
        descriptionAr: 'سرعة كسر الجليد مع الغرباء، نشر الطاقة الإيجابية، وبناء تحالفات موثوقة.',
      },
    ],
    suggestedCareersAr: [
      'مدير تنفيذي وقائد فرق عمل ومؤسسات كبرى',
      'أخصائي إرشاد نفسي وأسري وتربوي',
      'مدير موارد بشرية وخبير تفاوض ووساطة',
      'دبلوماسي ومدير علاقات عامة وشراكات استراتيجية',
      'مستشار تطوير مؤسسي وتدريب قيادي',
    ],
    optimalLearningStylesAr: [
      'المذاكرة والعمل ضمن مجموعات تفاعلية وجلسات عصف ذهني',
      'شرح الدروس والمعلومات للزملاء لترسيخها في الذهن',
      'التعلم من خلال دراسات الحالة الإنسانية ولعب الأدوار (Role-Playing)',
    ],
    weaknessAndRisksAr: [
      'إرهاق النفس في إرضاء الجميع على حساب الأهداف الشخصية والوقت الذاتي',
      'صعوبة العمل في بيئات منعزلة أو إنجاز المهام الفردية المطولة',
    ],
    developmentExercisesAr: [
      'ممارسة الاستماع النشط دون مقاطعة لمدة 10 دقائق متواصلة في حوار يومي',
      'توقع مشاعر ودوافع شخص مختلف معك في الرأي وكتابة وجهة نظره بأمانة',
      'التطوع لإدارة نقاش أو تنسيق مهمة مشتركة بين مجموعة أشخاص',
    ],
  },

  intrapersonal: {
    id: 'intrapersonal',
    titleAr: 'الذكاء الشخصي / الذاتي',
    titleEn: 'Intrapersonal Intelligence',
    icon: '🧘',
    color: '#eab308',
    gradient: 'from-amber-500 via-yellow-500 to-amber-600',
    badgeBorder: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    scientificFoundationAr:
      'يرتكز على الوعي الماورائي (Metacognition) ومراقبة الذات في الفص الجبهي الأنسي وقشرة الفص قبل الجبهي.',
    descriptionAr:
      'الفهم العميق للنفس، الوعي بنقاط القوة والضعف والمشاعر، القدرة على توجيه الذات بانضباط عالٍ، والميل للتأمل والتطوير المستمر.',
    subSkills: [
      {
        key: 'self_awareness',
        category: 'intrapersonal',
        titleAr: 'الوعي الذاتي والمشاعر',
        titleEn: 'Self-Awareness & Emotional Insight',
        descriptionAr: 'التعرف الدقيق على أسباب الانفعالات النفسية ورسم حدود واضحة مع المحيطين.',
      },
      {
        key: 'discipline_motivation',
        category: 'intrapersonal',
        titleAr: 'الانضباط والتحفيز الذاتي',
        titleEn: 'Discipline & Autonomous Motivation',
        descriptionAr: 'القدرة على العمل باستقلالية دون الحاجة لرقيب خارجي، وتحقيق الأهداف بإصرار.',
      },
      {
        key: 'philosophical_reflection',
        category: 'intrapersonal',
        titleAr: 'المراجعة الذاتية وتحديد الهوية',
        titleEn: 'Self-Reflection & Identity Clarity',
        descriptionAr: 'الميل لمراجعة المسار الشخصي، صدق البصيرة، وبناء منظومة قيمية مستقلة.',
      },
    ],
    suggestedCareersAr: [
      'رائد أعمال مستقل ومؤسس مشاريع تقنية أو استشارية',
      'باحث أكاديمي ومفكر استراتيجي',
      'معالج نفسي إكلينيكي ومستشار تطوير ذاتي',
      'مؤلف وكاتب سير ذاتية وأدب نفسي',
      'مخطط استراتيجي ومحلل سياسات',
    ],
    optimalLearningStylesAr: [
      'التعلم الذاتي المستقل في بيئة هادئة خالية من المقاطعات',
      'ربط كل معلومة جديدة بالأهداف والقيم الشخصية الخاصة',
      'كتابة اليوميات التأملية وتسجيل تطور المهارات بانتظام',
    ],
    weaknessAndRisksAr: [
      'الميل إلى العزلة والانطواء المفرط وتجنب العمل الجماعي الضروري',
      'القسوة الزائدة في لوم النفس عند حدوث إخفاقات أو تعثرات غير متوقعة',
    ],
    developmentExercisesAr: [
      'تخصيص 15 دقيقة يومياً للتأمل الهادئ دون شاشات ومراجعة مشاعر اليوم',
      'كتابة قائمة صادقة بأهم 5 نقاط قوة و5 نقاط ضعف شخصية ووضع خطة تطوير',
      'تحديد هدف شهري فردي والالتزام به يومياً لمدة 30 يوماً متتالية',
    ],
  },

  naturalistic: {
    id: 'naturalistic',
    titleAr: 'الذكاء الطبيعي والبيئي',
    titleEn: 'Naturalistic Intelligence',
    icon: '🌿',
    color: '#22c55e',
    gradient: 'from-emerald-600 via-green-600 to-lime-500',
    badgeBorder: 'border-green-500/40 bg-green-500/10 text-green-300',
    scientificFoundationAr:
      'أضافه هوارد جاردنر عام 1995 ويرتبط بمهارات التصنيف الحيوي والتعرف على الأنماط الطبيعية والتكيف البيئي.',
    descriptionAr:
      'الشغف بفهم الطبيعة، تصنيف النباتات والحيوانات والظواهر الجيولوجية والطقس، والقدرة على التقاط التغيرات الطفيفة في المحيط البيئي.',
    subSkills: [
      {
        key: 'environmental_exploration',
        category: 'naturalistic',
        titleAr: 'الاستكشاف البيئي والكائنات',
        titleEn: 'Biosphere & Living Systems',
        descriptionAr: 'الاهتمام العميق بالنباتات، سلوك الحيوانات، ودراسة البيئات الطبيعية المختلفة.',
      },
      {
        key: 'natural_patterning',
        category: 'naturalistic',
        titleAr: 'تصنيف الأنماط الطبيعية والطقس',
        titleEn: 'Ecological Patterning & Meteorology',
        descriptionAr: 'ملاحظة التغيرات المناخية، معرفة أنواع الصخور والتربة، وقراءة مؤشرات الطبيعة.',
      },
      {
        key: 'nature_harmony',
        category: 'naturalistic',
        titleAr: 'الانسجام الطبيعي والأنشطة الخارجية',
        titleEn: 'Outdoor Harmony & Wilderness Skills',
        descriptionAr: 'الشعور بالسكينة والحيوية في الأماكن المفتوحة، والتخييم، والعناية بالحدائق والزراعة.',
      },
    ],
    suggestedCareersAr: [
      'عالم أحياء وبيئة وعلوم نباتات (Biologist / Ecologist)',
      'طبيب بيطري وخبير رعاية الحياة الفطرية',
      'مهندس زراعي وخبير طاقة متجددة واستدامة بيئية',
      'عالم جيولوجيا وأرصاد جوية وعلوم بحار',
      'مصمم حدائق ومحميات طبيعية (Landscape Architect)',
    ],
    optimalLearningStylesAr: [
      'الدراسة في الهواء الطلق أو بجوار نوافذ تطل على مساحات خضراء',
      'استخدام المقارنات المستوحاة من دورات الحياة في الطبيعة لفهم العلوم',
      'القيام بالرحلات الميدانية والتجارب العملية في الطبيعة',
    ],
    weaknessAndRisksAr: [
      'الشعور بالاختناق والضيق الشديد في المكاتب المغلقة والمناطق الصناعية الصماء',
      'صعوبة الاهتمام بالمواضيع المجردة التي لا تتصل بالعالم الطبيعي الواقعي',
    ],
    developmentExercisesAr: [
      'زراعة نبتة ومتابعة نموها وتوثيق التغيرات الطفيفة عليها أسبوعياً',
      'ممارسة المشي في الطبيعة لمدة ساعة أسبوعياً مع الانتباه للأنواع الحيوية',
      'التعرف على 3 أنواع جديدة من النباتات أو الصخور وطرق تكيفها البيئي',
    ],
  },

  existential: {
    id: 'existential',
    titleAr: 'الذكاء الوجودي والفلسفي',
    titleEn: 'Existential & Cosmic Intelligence',
    icon: '🌌',
    color: '#6366f1',
    gradient: 'from-indigo-600 via-violet-600 to-purple-600',
    badgeBorder: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
    scientificFoundationAr:
      'الذكاء التاسع الذي طرحه هوارد جاردنر (1999) في كتابه Intelligence Reframed، ويقيس القدرة على التموضع في الكون والتساؤل حول المعنى والغاية.',
    descriptionAr:
      'القدرة الفكرية والروحية على التأمل في القضايا الإنسانية الكبرى، معنى الحياة، الغاية من الوجود، المصير البشري، ورؤية الصورة الكلية خلف التفاصيل اليومية العابرة.',
    subSkills: [
      {
        key: 'cosmic_meaning',
        category: 'existential',
        titleAr: 'البحث عن المعنى والغاية الكبرى',
        titleEn: 'Search for Meaning & Purpose',
        descriptionAr: 'التساؤل العميق حول الحكمة من الأحداث والغاية الأسمى للوجود الإنساني.',
      },
      {
        key: 'big_picture_synthesis',
        category: 'existential',
        titleAr: 'الرؤية الكلية الشمولية',
        titleEn: 'Holistic & Big-Picture Synthesis',
        descriptionAr: 'ربط الظواهر الجزئية بسياقها التاريخي والكوني والإنساني الواسع.',
      },
      {
        key: 'ethical_transcendence',
        category: 'existential',
        titleAr: 'السمو الأخلاقي والقيمي',
        titleEn: 'Ethical & Spiritual Transcendence',
        descriptionAr: 'الالتزام بالقيم الإنسانية العليا كالعدل والرحمة والحكمة المتجاوزة للمصالح الضيقة.',
      },
    ],
    suggestedCareersAr: [
      'فيلسوف ومفكر ومؤلف في العلوم الإنسانية والحضارية',
      'أستاذ جامعي في الفلسفة أو مقارنة الأديان أو علم الاجتماع',
      'مستشار أخلاقيات العلوم والذكاء الاصطناعي (Bioethics & AI Ethics)',
      'قائد فكري ومؤسس مبادرات إنسانية وتنموية عالمية',
      'مخرج أفلام وثائقية فكرية وتاريخية عميقة',
    ],
    optimalLearningStylesAr: [
      'فهم الفلسفة والغاية الكبرى لأي علم قبل الدخول في تفاصيله التقنية',
      'الحوار السقراطي والمقارنات الحضارية والتاريخية الممتدة',
      'التأمل في السنن الكونية والترابط بين العلوم الطبيعية والإنسانية',
    ],
    weaknessAndRisksAr: [
      'الاستغراق في التساؤلات الكبرى على حساب المهام الإجرائية اليومية البسيطة',
      'الشعور بالغربة الفكرية في البيئات السطحية أو الاستهلاكية الصاخبة',
    ],
    developmentExercisesAr: [
      'قراءة كتب الفلسفة وتاريخ الحضارات وتدوين التأملات والمقارنات الفكرية',
      'ربط أهدافك المهنية اليومية بأثر إنساني وأخلاقي مستدام يمتد للآخرين',
      'ممارسة التفكر الكوني والتأمل في آفاق الطبيعة والسنن التاريخية',
    ],
  },
};

// -------------------------------------------------------------------------
// 45 Realistic Situational Questions (5 per intelligence across 9 intelligences)
// -------------------------------------------------------------------------
export const INTELLIGENCE_QUESTIONS: IntelligenceQuestion[] = [
  // ================= 1. LINGUISTIC (الذكاء اللغوي) =================
  {
    id: 'ling_1',
    category: 'linguistic',
    subSkill: 'writing_expression',
    questionNumber: 1,
    textAr: 'عندما أكتب رسالة أو تقريراً أو منشوراً، أجد الكلمات والتشبيهات تتدفق بسهولة ودقة تعبر عن مقصدي.',
    femaleTextAr: 'عندما أكتب رسالة أو تقريراً، أجد الكلمات والتشبيهات تتدفق بسلاسة ودقة تعبر عن مقصدي.',
    situationContextAr: 'في مواقف الكتابة اليومية وصياغة الرسائل والمذكرات الشخصية والمهنية.',
  },
  {
    id: 'ling_2',
    category: 'linguistic',
    subSkill: 'rhetoric_dialogue',
    questionNumber: 2,
    textAr: 'أستمتع بإدارة الحوارات والمناظرات، ولدي القدرة على إقناع الآخرين بوجهة نظري مستخدماً حججاً بلاغية قوية.',
    femaleTextAr: 'أستمتع بإدارة الحوارات والمناقشات، ولدي القدرة على إقناع الآخرين بوجهة نظري مستخدمةً حججاً قوية.',
    situationContextAr: 'في النقاشات العائلية، المهنية، أو الحوارات المجتمعية التفاعلية.',
  },
  {
    id: 'ling_3',
    category: 'linguistic',
    subSkill: 'verbal_memory',
    questionNumber: 3,
    textAr: 'أحفظ أسماء الأشخاص، والكلمات الغريبة، والاقتباسات، والأبيات الشعرية بسرعة لافتة بعد سماعها.',
    femaleTextAr: 'أحفظ أسماء الأشخاص، والكلمات الجديدة، والاقتباسات الشعرية بسرعة لافتة بعد سماعها.',
    situationContextAr: 'أثناء التعرف على أشخاص جدد أو قراءة كتب ومقالات متنوعة.',
  },
  {
    id: 'ling_4',
    category: 'linguistic',
    subSkill: 'writing_expression',
    questionNumber: 4,
    textAr: 'أفضل التعبير عن مشاعري وأفكاري المعقدة من خلال تدوينها وكتابتها بدلاً من الصمت أو الانفعال.',
    femaleTextAr: 'أفضل التعبير عن مشاعري وأفكاري المعقدة من خلال تدوينها وكتابتها بدقة.',
    situationContextAr: 'عند مواجهة مواقف تتطلب ترتيب الأولويات والمشاعر الداخلية.',
  },
  {
    id: 'ling_5',
    category: 'linguistic',
    subSkill: 'rhetoric_dialogue',
    questionNumber: 5,
    textAr: 'أستمتع بحل الألغاز اللغوية، والكلمات المتقاطعة، وألاحظ الأخطاء الإملائية أو النحوية في النصوص فور قراءتها.',
    femaleTextAr: 'أستمتع بالألعاب اللغوية والألغاز الكلامية، وألاحظ الأخطاء اللغوية في النصوص سريعاً.',
    situationContextAr: 'عند قراءة اللافتات والكتب أو ممارسة ألعاب الكلمات الذكية.',
  },

  // ================= 2. LOGICAL (الذكاء المنطقي - الرياضي) =================
  {
    id: 'log_1',
    category: 'logical',
    subSkill: 'deductive_analysis',
    questionNumber: 6,
    textAr: 'عندما تواجهني مشكلة معقدة، أميل غريزياً لتفكيكها إلى عناصر صغيرة ومعرفة السبب والنتيجة قبل اتخاذ أي خطوة.',
    femaleTextAr: 'عندما تواجهني مشكلة معقدة، أميل لتفكيكها إلى خطوات منطقية ومعرفة السبب والنتيجة أولاً.',
    situationContextAr: 'في مواجهة التحديات المالية أو التقنية أو حل الخلافات الإجرائية.',
  },
  {
    id: 'log_2',
    category: 'logical',
    subSkill: 'number_management',
    questionNumber: 7,
    textAr: 'أقوم بالحسابات الذهنية (مثل تقدير الحسابات أو نسب الخصومات ومقارنة الأسعار) بسرعة ودقة دون الاستعانة بالآلة الحاسبة.',
    femaleTextAr: 'أقوم بالحسابات الذهنية والتقديرات المالية بسرعة ودقة دون حاجة دائمة للآلة الحاسبة.',
    situationContextAr: 'أثناء التسوق وإعداد الميزانيات أو مراجعة الحسابات والفواتير.',
  },
  {
    id: 'log_3',
    category: 'logical',
    subSkill: 'critical_thinking',
    questionNumber: 8,
    textAr: 'لا أقتنع بالآراء بسهولة دون براهين علمية وأرقام موثقة، وأستطيع كشف التناقضات والمغالطات المنطقية في حديث الآخرين.',
    femaleTextAr: 'لا أقتنع بالأفكار دون أدلة وبراهين واضحة، وأكتشف التناقضات المنطقية في الحوارات بسهولة.',
    situationContextAr: 'أثناء متابعة الأخبار أو الاستماع لعروض عمل وحوارات فكرية.',
  },
  {
    id: 'log_4',
    category: 'logical',
    subSkill: 'deductive_analysis',
    questionNumber: 9,
    textAr: 'أجد متعة بالغة في حل ألغاز الشطرنج، والسودوكو، والبرمجة، وتركيب السلاسل المنطقية المنظمة.',
    femaleTextAr: 'أجد متعة في حل ألغاز التفكير المنطقي، والسودوكو، واكتشاف الأنماط والقواعد الخفية.',
    situationContextAr: 'في أوقات الفراغ والألعاب الذهنية والتحديات الاستراتيجية.',
  },
  {
    id: 'log_5',
    category: 'logical',
    subSkill: 'critical_thinking',
    questionNumber: 10,
    textAr: 'أفضل تنظيم مهامي اليومية ومكتبي وجداول أعمالي وفق تسلسل وأولويات رياضية ومصفوفات واضحة المعالم.',
    femaleTextAr: 'أفضل تنظيم أعمالي وفق جداول وأولويات مدروسة ومبنية على الكفاءة والوقت.',
    situationContextAr: 'في إدارة الوقت والتخطيط للمشاريع وتحقيق الأهداف.',
  },

  // ================= 3. SPATIAL (الذكاء المكاني - البصري) =================
  {
    id: 'spat_1',
    category: 'spatial',
    subSkill: 'spatial_visualization',
    questionNumber: 11,
    textAr: 'أستطيع تخيل شكل الأثاث أو الديكور الجديد في الغرفة بثلاثة أبعاد قبل نقله أو تركيبه بالواقع.',
    femaleTextAr: 'أستطيع تخيل مظهر الأثاث وتنسيق المساحة ثلاثياً في ذهني بوضوح قبل الشروع في الترتيب.',
    situationContextAr: 'عند تجديد المنزل، ترتيب الغرف، أو تنسيق مكان العمل.',
  },
  {
    id: 'spat_2',
    category: 'spatial',
    subSkill: 'visual_orientation',
    questionNumber: 12,
    textAr: 'أمتلك حاسة توجيه قوية؛ نادراً ما أضل طريقي، وأقرأ الخرائط ومسارات الـ GPS بسهولة حتى في مدن جديدة.',
    femaleTextAr: 'أمتلك حاسة توجيه جيدة؛ أقرأ الخرائط وأحفظ المعالم والمسارات بسهولة في الأماكن الجديدة.',
    situationContextAr: 'أثناء السفر والتنقل في شوارع ومناطق جديدة لأول مرة.',
  },
  {
    id: 'spat_3',
    category: 'spatial',
    subSkill: 'design_and_arts',
    questionNumber: 13,
    textAr: 'لدي حساسية عالية لتناسق الألوان والخطوط والأشكال، وألاحظ فوراً عدم التوازن البصري في الصور والتصميمات.',
    femaleTextAr: 'لدي حساسية عالية للألوان والجماليات والتناسق البصري في الملابس والديكور والتصميم.',
    situationContextAr: 'في اختيار الملابس، تنسيق التصاميم، وتقييم الأعمال الفنية والمعمارية.',
  },
  {
    id: 'spat_4',
    category: 'spatial',
    subSkill: 'spatial_visualization',
    questionNumber: 14,
    textAr: 'أفضل استيعاب الأفكار الجديدة من خلال المخططات، الخرائط الذهنية، والرسوم البيانية بدلاً من القراءة النصية الطويلة.',
    femaleTextAr: 'أفضل استيعاب الأفكار من خلال المخططات البصرية والرسوم التوضيحية بدلاً من الشرح النصي الجاف.',
    situationContextAr: 'أثناء الدراسة أو متابعة عروض تقديمية وتعلم مهارة جديدة.',
  },
  {
    id: 'spat_5',
    category: 'spatial',
    subSkill: 'design_and_arts',
    questionNumber: 15,
    textAr: 'أجد نفسي أقوم بالرسم السريع أو تخطيط أشكال هندسية وتخيلية أثناء الاستماع أو التفكير العميق.',
    femaleTextAr: 'أجد نفسي أرسم خطوطاً وأشكالاً بصرية جميلة تلقائياً أثناء التفكير أو الاستماع في الاجتماعات.',
    situationContextAr: 'أثناء المكالمات الهاتفية الطويلة أو جلسات التفكير الفردية.',
  },

  // ================= 4. KINESTHETIC (الذكاء الجسدي - الحركي) =================
  {
    id: 'kin_1',
    category: 'kinesthetic',
    subSkill: 'motor_coordination',
    questionNumber: 16,
    textAr: 'أتمتع بتوازن جسدي وردود فعل سريعة وحركات رشيقة، وأتعلم الرياضات والأنشطة البدنية في وقت قصير.',
    femaleTextAr: 'أتمتع بتوازن حركي جيد ورشاقة وسرعة استجابة في الأنشطة البدنية والرياضية.',
    situationContextAr: 'في ممارسة الرياضة، الألعاب الحركية، أو تجنب السقوط والمواقف الطارئة.',
  },
  {
    id: 'kin_2',
    category: 'kinesthetic',
    subSkill: 'manual_dexterity',
    questionNumber: 17,
    textAr: 'أجيد استخدام يدي بمهارة عالية في إصلاح الأشياء، تفكيك الأدوات، أو الأعمال الحرفية والتراكيب الدقيقة.',
    femaleTextAr: 'أجيد الأعمال اليدوية الدقيقة، الحرف، الطهي الاحترافي، أو تفكيك وتركيب الأدوات ببراعة.',
    situationContextAr: 'عند تعطل جهاز منزلي، تركيب قطع أثاث، أو ممارسة هواية يدوية.',
  },
  {
    id: 'kin_3',
    category: 'kinesthetic',
    subSkill: 'kinesthetic_learning',
    questionNumber: 18,
    textAr: 'أتعلم المهارات بصورة أفضل بكثير عندما أجربها بيدي وأمارسها فعلياً بدلاً من مجرد قراءة التعليمات أو الاستماع للشرح.',
    femaleTextAr: 'أتعلم المهارات بكفاءة أعلى عندما أمارسها ميدانياً وأجربها بنفسي مباشرة.',
    situationContextAr: 'عند شراء جهاز جديد، تعلم قيادة سيارة، أو اكتساب مهارة تقنية.',
  },
  {
    id: 'kin_4',
    category: 'kinesthetic',
    subSkill: 'motor_coordination',
    questionNumber: 19,
    textAr: 'أشعر بالضيق والتوتر إذا جلست ساكناً في مكان واحد لساعات طويلة، وأحتاج للمشي والحركة لإعادة شحن طاقتي.',
    femaleTextAr: 'أشعر بالملل من الجلوس الطويل دون حركة، وأفضل الحركة والمشي لتجديد نشاطي وتركيزي.',
    situationContextAr: 'أثناء المحاضرات الطويلة أو العمل المكتبي الممتد.',
  },
  {
    id: 'kin_5',
    category: 'kinesthetic',
    subSkill: 'kinesthetic_learning',
    questionNumber: 20,
    textAr: 'أستخدم لغة الجسد وحركات اليدين بتلقائية وتعبيرية عالية لنقل حماسي وأفكاري للآخرين أثناء الكلام.',
    femaleTextAr: 'أستخدم إيماءات اليدين وتعبيرات الجسد بتناغم لنقل أفكاري ومشاعري للآخرين أثناء الحوار.',
    situationContextAr: 'أثناء رواية قصة مشوقة أو شرح فكرة مهمة لمجموعة من الزملاء.',
  },

  // ================= 5. MUSICAL (الذكاء الموسيقي والإيقاعي) =================
  {
    id: 'mus_1',
    category: 'musical',
    subSkill: 'tonal_discrimination',
    questionNumber: 21,
    textAr: 'ألاحظ فوراً أي نشاز أو خطأ في الطبقات الصوتية أو نبرات الحديث التي يستعملها المتحدث حتى لو كانت خفية.',
    femaleTextAr: 'ألاحظ فوراً الفروق الطفيفة في نبرات الصوت والألحان وألتقط النشاز الصوتي بسرعة.',
    situationContextAr: 'عند الاستماع للمقاطع الصوتية، الإنشاد، أو نبرات الحديث الحوارية.',
  },
  {
    id: 'mus_2',
    category: 'musical',
    subSkill: 'rhythm_perception',
    questionNumber: 22,
    textAr: 'أشعر بالإيقاع وأجد نفسي أنقر بأصابعي أو بقدمي على الإيقاعات المتكررة أو أصوات المحركات وحركات الآلات.',
    femaleTextAr: 'أتفاعل سريعاً مع الإيقاعات وأضبط توقيت حركتي ونبرتي مع الترددات الصوتية حولي.',
    situationContextAr: 'في السيارة، أثناء الاستماع للمقاطع، أو التواجد في بيئة ذات أصوات متكررة.',
  },
  {
    id: 'mus_3',
    category: 'musical',
    subSkill: 'musical_appreciation',
    questionNumber: 23,
    textAr: 'تحفظ ذاكرتي الألحان والترنيمات الصوتية بسهولة بالغة، وأتذكر الذكريات والمواقف بمجرد سماع نغمة معينة مرتبطة بها.',
    femaleTextAr: 'أحفظ الألحان والنغمات والأصوات بسهولة، وترتبط ذكرياتي العاطفية ارتباطاً وثيقاً بالأصوات.',
    situationContextAr: 'عند استرجاع ذكريات قديمة أو سماع أصوات ارتبطت بمناسبات محددة.',
  },
  {
    id: 'mus_4',
    category: 'musical',
    subSkill: 'tonal_discrimination',
    questionNumber: 24,
    textAr: 'أستطيع تمييز مشاعر الناس (كالخوف أو الحزن أو الفرح أو التردد) بدقة من نبرة صوتهم عبر الهاتف دون رؤية وجوههم.',
    femaleTextAr: 'أميز الحالة النفسية للمتصل بوضوح من بحة صوته ونبرته فقط دون الحاجة لرؤيته.',
    situationContextAr: 'في المكالمات الهاتفية اليومية والتواصل الصوتي عن بعد.',
  },
  {
    id: 'mus_5',
    category: 'musical',
    subSkill: 'rhythm_perception',
    questionNumber: 25,
    textAr: 'تساعدني المقاطع الصوتية الهادئة أو أصوات الطبيعة المنتظمة (كصوت المطر أو أمواج البحر) على التركيز أو النوم العميق.',
    femaleTextAr: 'تساعدني الأصوات الهادئة والموسيقى التصويرية على تصفية ذهني والاستغراق في الإنجاز.',
    situationContextAr: 'أثناء فترات الاسترخاء أو إنجاز مهام ذهنية شاقة في بيئة صاخبة.',
  },

  // ================= 6. INTERPERSONAL (الذكاء الاجتماعي) =================
  {
    id: 'inter_1',
    category: 'interpersonal',
    subSkill: 'empathy_communication',
    questionNumber: 26,
    textAr: 'أفهم مشاعر الأشخاص حولي بسهولة من نظرة عين أو تغيير طفيف في تعبيرات وجوههم، وغالباً ما يشعرون بالراحة في الفضفضة لي.',
    femaleTextAr: 'أشعر بمشاعر المحيطين بي سريعاً وأتعاطف معهم، وغالباً ما يقصدني الأصدقاء للبوح بمشاعرهم.',
    situationContextAr: 'عندما يمر صديق أو زميل بمشكلة نفسية أو أزمة شخصية.',
  },
  {
    id: 'inter_2',
    category: 'interpersonal',
    subSkill: 'leadership_conflict',
    questionNumber: 27,
    textAr: 'عندما ينشب خلاف بين أصدقاء أو زملاء، أجد نفسي وسيطاً بارعاً أوفق بين وجهات النظر وأعيد الهدوء بحكمة.',
    femaleTextAr: 'أنجح في تهدئة النزاعات وتوضيح سوء الفهم بين الأطراف المختلفة بحوار هادئ وبناء.',
    situationContextAr: 'في بيئة العمل المشتركة، الاجتماعات العائلية، أو خلافات الأصدقاء.',
  },
  {
    id: 'inter_3',
    category: 'interpersonal',
    subSkill: 'teamwork_synergy',
    questionNumber: 28,
    textAr: 'أنجز أعمالي بحماس أعلى عندما أكون ضمن فريق متكامل، وأستمتع بتبادل الأفكار وتوزيع الأدوار بدلاً من الانعزال التام.',
    femaleTextAr: 'أحب العمل التعاوني وأجد متعة في تحقيق الإنجازات الجماعية مع فريق متجانس.',
    situationContextAr: 'في المشاريع الدراسية، المبادرات التطوعية، أو مهام العمل الجماعي.',
  },
  {
    id: 'inter_4',
    category: 'interpersonal',
    subSkill: 'teamwork_synergy',
    questionNumber: 29,
    textAr: 'لدي شبكة واسعة من المعارف، وأستطيع كسر الجليد وبدء محادثة مريحة وممتعة مع الغرباء في أي مناسبة اجتماعية.',
    femaleTextAr: 'أمتلك سهولة في كسر الجليد وبناء علاقات اجتماعية طيبة وسريعة في اللقاءات والمناسبات.',
    situationContextAr: 'أثناء حضور مؤتمر، حفل زفاف، أو بيئة اجتماعية تضم أشخاصاً جدد.',
  },
  {
    id: 'inter_5',
    category: 'interpersonal',
    subSkill: 'leadership_conflict',
    questionNumber: 30,
    textAr: 'أميز دوافع الناس ونواياهم الحقيقية خلف تصرفاتهم ومجاملاتهم، ونادراً ما أنخدع بوعود غير صادقة.',
    femaleTextAr: 'أميز الدوافع الصادقة من المجاملات السطحية، ولدي فراسة اجتماعية في تقييم الشخصيات.',
    situationContextAr: 'في اتخاذ قرارات الشراكة، العمل، واختيار الأصدقاء المقربين.',
  },

  // ================= 7. INTRAPERSONAL (الذكاء الشخصي / الذاتي) =================
  {
    id: 'intra_1',
    category: 'intrapersonal',
    subSkill: 'self_awareness',
    questionNumber: 31,
    textAr: 'أعرف نقاط قوتي ومواطن ضعفي بدقة متناهية، وأدرك تماماً ما يسعدني وما يثير غضبي وأستطيع ضبط انفعالاتي.',
    femaleTextAr: 'أعرف مواطن قوتي وحدودي بدقة، وأعي مشاعري وأسباب انفعالاتي الداخلية بعمق.',
    situationContextAr: 'أثناء مواجهة الضغوط الحياتية وتقييم الإنجازات الشخصية.',
  },
  {
    id: 'intra_2',
    category: 'intrapersonal',
    subSkill: 'discipline_motivation',
    questionNumber: 32,
    textAr: 'لدي دافع ذاتي قوي للإنجاز؛ أستطيع العمل بمفردي والالتزام بخططي دون الحاجة لتشجيع مستمر أو رقابة من الآخرين.',
    femaleTextAr: 'أمتلك انضباطاً ذاتياً عالياً وقدرة على توجيه نفسي والالتزام بأهدافي باستقلالية تامة.',
    situationContextAr: 'في إدارة المشاريع الفردية، المذاكرة الذاتية، وتحقيق الطموحات الشخصية.',
  },
  {
    id: 'intra_3',
    category: 'intrapersonal',
    subSkill: 'philosophical_reflection',
    questionNumber: 33,
    textAr: 'أقضي وقتاً بانتظام في مراجعة حساباتي الشخصية وتقييم قراراتي السابقة لتصحيح مساري أولاً بأول.',
    femaleTextAr: 'أخصص وقتاً للهدوء ومراجعة خياراتي الحياتية وتقييم قراراتي بصدق مع النفس.',
    situationContextAr: 'في ساعات الصباح الأولى، أو قبل النوم، وفي أوقات الخلوة الشخصية.',
  },
  {
    id: 'intra_4',
    category: 'intrapersonal',
    subSkill: 'self_awareness',
    questionNumber: 34,
    textAr: 'أتعلم دروساً عميقة من أخطائي وإخفاقاتي السابقة، وأحولها إلى قرارات حكيمة بدلاً من التكرار العشوائي لنفس الخطأ.',
    femaleTextAr: 'أتعلم بوعي من تجاربي السابقة وأطور نظرتي للحياة بناءً على الدروس المستفادة.',
    situationContextAr: 'بعد انتهاء علاقة أو تعثر في تجربة عمل سابقة.',
  },
  {
    id: 'intra_5',
    category: 'intrapersonal',
    subSkill: 'philosophical_reflection',
    questionNumber: 35,
    textAr: 'أفضل أن أكون مستقلاً وصادقاً مع قناعاتي الخاصة حتى لو خالفت آراء الأغلبية السائدة في المجتمع.',
    femaleTextAr: 'أتمسك بهويتي وقناعاتي الأصيلة بثقة حتى لو كانت مختلفة عن التيار السائد حولي.',
    situationContextAr: 'في المواقف التي تتطلب اتخاذ قرارات مبدئية وشجاعة أخلاقية.',
  },

  // ================= 8. NATURALISTIC (الذكاء الطبيعي) =================
  {
    id: 'nat_1',
    category: 'naturalistic',
    subSkill: 'environmental_exploration',
    questionNumber: 36,
    textAr: 'أشعر بشغف كبير تجاه تربية النباتات، رعاية الحيوانات الأليفة، أو مراقبة سلوك الكائنات الحية في بيئتها.',
    femaleTextAr: 'أشعر بارتياح ومحبة كبيرة للنباتات والأزهار والحيوانات الأليفة والعناية بها.',
    situationContextAr: 'في حديقة المنزل، أثناء اقتناء حيوان أليف، أو زيارة محميات طبيعية.',
  },
  {
    id: 'nat_2',
    category: 'naturalistic',
    subSkill: 'natural_patterning',
    questionNumber: 37,
    textAr: 'ألاحظ التغيرات الطفيفة في أحوال الجو والغيوم واتجاه الرياح وتغيرات الفصول قبل أن يتحدث عنها الآخرون.',
    femaleTextAr: 'ألاحظ تغيرات الطقس، حركة الرياح، وتفاصيل الفصول في البيئة المحيطة بدقة وفطرة.',
    situationContextAr: 'في الحياة اليومية والتنقلات وملاحظة الظواهر المناخية الطبيعية.',
  },
  {
    id: 'nat_3',
    category: 'naturalistic',
    subSkill: 'nature_harmony',
    questionNumber: 38,
    textAr: 'أجد راحتي النفسية الكبرى في التخييم بالبراري، والمشي بجوار البحر، أو قضاء عطلة وسط الجبال والوديان الطبيعية.',
    femaleTextAr: 'أجد استرخائي الحقيقي وطاقتي الإيجابية عند التواجد في الطبيعة الخضراء أو شاطئ البحر.',
    situationContextAr: 'في الإجازات الأسبوعية وتفضيل الوجهات السياحية الطبيعية على المراكز التجارية الصاخبة.',
  },
  {
    id: 'nat_4',
    category: 'naturalistic',
    subSkill: 'natural_patterning',
    questionNumber: 39,
    textAr: 'أستطيع تصنيف وتمييز أنواع الأشجار، أو الصخور، أو الطيور، وأفهم كيف تتفاعل عناصر النظام البيئي مع بعضها.',
    femaleTextAr: 'أميز أسماء وأنواع النباتات والزهور الطبيعية والصخور بسهولة وفضول مستمر.',
    situationContextAr: 'أثناء الرحلات البرية أو زيارة المشاتل والحدائق النباتية.',
  },
  {
    id: 'nat_5',
    category: 'naturalistic',
    subSkill: 'nature_harmony',
    questionNumber: 40,
    textAr: 'أهتم بقضايا البيئة والاستدامة، والحفاظ على الموارد الطبيعية، وأشعر بالانزعاج العميق من تلويث البراري والبحار.',
    femaleTextAr: 'أهتم بنظافة البيئة واستدامتها وحماية الطبيعة والكائنات من التلوث والإهمال.',
    situationContextAr: 'في الممارسات اليومية لترشيد الاستهلاك وفرز النفايات وحماية الطبيعة.',
  },

  // ================= 9. EXISTENTIAL (الذكاء الوجودي والفلسفي - Gardner 1999) =================
  {
    id: 'exist_1',
    category: 'existential',
    subSkill: 'cosmic_meaning',
    questionNumber: 41,
    textAr: 'كثيراً ما أتأمل في الأسئلة الإنسانية الكبرى: ما هي الغاية الأسمى من وجودنا؟ وما الأثر الذي سيبقى بعد رحيلنا؟',
    femaleTextAr: 'كثيراً ما أتأمل في المعاني الكبرى للحياة والغاية الأسمى من وجود الإنسان والأثر الطيب الباقي.',
    situationContextAr: 'في لحظات الصفاء الذهني والتأمل في مسيرة الحياة والمصير الإنساني.',
  },
  {
    id: 'exist_2',
    category: 'existential',
    subSkill: 'big_picture_synthesis',
    questionNumber: 42,
    textAr: 'عند وقوع حدث عالمي أو شخصي، أنظر فوراً إلى الصورة الكلية والحكمة البعيدة وراءه بدلاً من التوقف عند التفاصيل السطحية.',
    femaleTextAr: 'أربط الأحداث اليومية دائماً بالصورة الكبرى والحكمة العميقة الكامنة خلف المواقف.',
    situationContextAr: 'عند تحليل الأزمات الكبرى أو التحولات التاريخية والاجتماعية.',
  },
  {
    id: 'exist_3',
    category: 'existential',
    subSkill: 'ethical_transcendence',
    questionNumber: 43,
    textAr: 'تشغلني قضايا العدالة الإنسانية والأخلاق الكونية، وأشعر بمسؤولية داخلية تجاه كرامة الإنسان أينما كان.',
    femaleTextAr: 'أحمل حساً أخلاقياً وإنسانياً عالياً تجاه قضايا العدل والرحمة وكرامة الإنسان في العالم.',
    situationContextAr: 'في المواقف الإنسانية والقيمية الكبرى والقرارات الأخلاقية.',
  },
  {
    id: 'exist_4',
    category: 'existential',
    subSkill: 'cosmic_meaning',
    questionNumber: 44,
    textAr: 'أشعر بخشوع ودهشة عميقة عندما أنظر إلى السماء ليلاً وأتأمل اتساع الكون والسنن الدقيقة التي تحكم المجرات والحياة.',
    femaleTextAr: 'أشعر بدهشة وسكينة عميقة عند تأمل السماء والنجوم وإدراك دقة النظام الكوني البديع.',
    situationContextAr: 'عند النظر للفضاء أو قراءة الاكتشافات الكونية والفيزيائية.',
  },
  {
    id: 'exist_5',
    category: 'existential',
    subSkill: 'big_picture_synthesis',
    questionNumber: 45,
    textAr: 'أستمتع بالحوارات الفلسفية العميقة التي تبحث في جذور القيم، الحضارات، ومعنى السعادة الحقيقية بعيداً عن الماديات.',
    femaleTextAr: 'أفضل الحوارات الفكرية والفلسفية العميقة حول معنى السعادة والقيم الإنسانية الأصيلة.',
    situationContextAr: 'في الجلسات الثقافية وقراءة الفلسفة والأدب الإنساني الرفيع.',
  },
];

// -------------------------------------------------------------------------
// BATTERY 2: GENERAL IQ, RAVEN'S PROGRESSIVE MATRICES & CHC MODEL (25 Questions)
// -------------------------------------------------------------------------
export const GENERAL_IQ_RAVEN_QUESTIONS: ObjectiveBatteryQuestion[] = [
  {
    id: 'iq_1',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 1,
    domainKey: 'fluid_reasoning',
    domainTitleAr: 'مصفوفات رافين المتتابعة (Raven Matrix Gf)',
    difficulty: 1,
    matrixVisualId: 'raven_matrix_1',
    promptAr: 'مصفوفة رافين (1): تأمل الشبكة البصرية (3×3) حيث يزداد عدد الدوائر بمقدار دائرة واحدة أفقياً وعمودياً. ما هو الشكل المكمل للخانة المفقودة (؟) في الزاوية السفلى؟',
    subPromptAr: 'يقيس الاستدلال الإدراكي السائل واكتشاف قاعدة التدرج الثنائي (Spearman’s g).',
    options: [
      { id: 'a', labelAr: 'مربع يحتوي على 5 دوائر متناظرة (مركزية + 4 في الزوايا)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'مربع يحتوي على 3 دوائر أفقية فقط', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'مربع يحتوي على 4 دوائر بدون نقطة مركزية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'مربع فارغ بإطار مزدوج', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_2',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 2,
    domainKey: 'fluid_reasoning',
    domainTitleAr: 'مصفوفات رافين المتتابعة (Raven Matrix Gf)',
    difficulty: 1,
    matrixVisualId: 'raven_matrix_2',
    promptAr: 'مصفوفة رافين (2): في كل صف، يدور السهم بزاوية 90 درجة باتجاه عقارب الساعة مع تبديل لون الخلفية. إذا كان الشكل الأول للأعلى والثاني لليمين، فكيف سيكون الشكل الثالث؟',
    subPromptAr: 'يقيس التدوير المتسلسل المشروط في مصفوفات رافين القياسية.',
    options: [
      { id: 'a', labelAr: 'سهم يشير إلى الأسفل (180 درجة)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'سهم يشير إلى اليسار (270 درجة)', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'سهم يشير إلى الأعلى (0 درجة)', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'سهمان متعاكسان أفقياً', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_3',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 3,
    domainKey: 'fluid_reasoning',
    domainTitleAr: 'مصفوفات رافين المتتابعة (Raven Matrix Gf)',
    difficulty: 2,
    matrixVisualId: 'raven_matrix_3',
    promptAr: 'مصفوفة رافين (3 - قاعدة الدمج XOR): الشكل الثالث في كل صف ينتج عن دمج الشكل الأول والثاني مع حذف الخطوط المشتركة المتطابقة بينهما. إذا كان الشكل (1) يحتوي على خط عمودي وقطر أيمن، والشكل (2) يحتوي على خط عمودي وقطر أيسر، فما هو الشكل (3)؟',
    subPromptAr: 'من أشهر قواعد مصفوفات رافين المتقدمة (الطرح المنطقي البصري XOR).',
    options: [
      { id: 'a', labelAr: 'القطران المتقاطعان على شكل (X) بدون الخط العمودي المشترك', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الخط العمودي فقط بدون القطرين', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'جميع الخطوط الثلاثة معاً (العمودي والقطران)', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'خط أفقي واحد في المنتصف', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_4',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 4,
    domainKey: 'fluid_reasoning',
    domainTitleAr: 'مصفوفات رافين المتتابعة (Raven Matrix Gf)',
    difficulty: 2,
    matrixVisualId: 'raven_matrix_4',
    promptAr: 'مصفوفة رافين (4 - التناوب التبادلي اللاتيني): كل صف وكل عمود يحتوي على ثلاثة أشكال (مثلث، دائرة، معين) وثلاثة أنماط تظليل (مفرغ، مخطط، مصمت). إذا احتوى الصف الأخير على (دائرة مفرغة) و(مثلث مخطط)، فما هو العنصر المفقود؟',
    subPromptAr: 'يقيس مصفوفة المربع اللاتيني ثنائي المتغيرات (Latin Square Matrix).',
    options: [
      { id: 'a', labelAr: 'معين مصمت (مظلل بالكامل)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'معين مفرغ', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'دائرة مصمتة', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'مثلث مصمت', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_5',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 5,
    domainKey: 'fluid_reasoning',
    domainTitleAr: 'مصفوفات رافين المتتابعة (Raven Matrix Gf)',
    difficulty: 3,
    matrixVisualId: 'raven_matrix_5',
    promptAr: 'مصفوفة رافين (5 - المستوى المتقدم): في شبكة 3×3، يزداد عدد أضلاع المضلع الخارجي بمقدار (+1) أفقياً، بينما ينقص عدد النقاط الداخلية بمقدار (-1) عمودياً. إذا كانت الخانة العليا في العمود الثالث عبارة عن (سداسي بداخله 3 نقاط)، فما هي الخانة السفلى في نفس العمود؟',
    subPromptAr: 'يقيس المعالجة المتوازية لمتغيرين متعاكسين في مصفوفات رافين العليا.',
    options: [
      { id: 'a', labelAr: 'سداسي بداخله نقطة واحدة فقط', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'ثماني بداخله نقطة واحدة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'سداسي بداخله 5 نقاط', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'خماسي بداخله نقطتان', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_6',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 6,
    domainKey: 'quantitative_reasoning',
    domainTitleAr: 'الاستدلال الكمي والرقمي (SB5 / WAIS Gq)',
    difficulty: 1,
    promptAr: 'ما هو العدد الذي يكمل المتتالية العددية التالية: 3 ، 7 ، 15 ، 31 ، 63 ، (؟)',
    subPromptAr: 'اكتشف العلاقة الجبرية المتكررة بين كل حد والحد الذي يليه.',
    options: [
      { id: 'a', labelAr: '127', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '125', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '95', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '131', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_7',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 7,
    domainKey: 'quantitative_reasoning',
    domainTitleAr: 'الاستدلال الكمي والرقمي (SB5 / WAIS Gq)',
    difficulty: 2,
    promptAr: 'إذا كان 5 مهندسين ينجزون تصميم 5 مخططات معمارية في 5 أيام، فكم يوماً يحتاج 10 مهندسين لإنجاز 10 مخططات بنفس الكفاءة؟',
    subPromptAr: 'مسألة التناسب المركب القياسية في اختبارات الذكاء المعرفي.',
    options: [
      { id: 'a', labelAr: '5 أيام', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '10 أيام', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'يومان ونصف', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '20 يوماً', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_8',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 8,
    domainKey: 'quantitative_reasoning',
    domainTitleAr: 'الاستدلال الكمي والرقمي (SB5 / WAIS Gq)',
    difficulty: 2,
    promptAr: 'ما هو الرقم المفقود في السلسلة التربيعية المتداخلة: 2 ، 6 ، 12 ، 20 ، 30 ، 42 ، (؟)',
    subPromptAr: 'تأمل الفروق المتزايدة أو حاصل ضرب الأعداد المتتالية (n × (n+1)).',
    options: [
      { id: 'a', labelAr: '56', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '54', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '60', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '48', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_9',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 9,
    domainKey: 'quantitative_reasoning',
    domainTitleAr: 'الاستدلال الكمي والرقمي (SB5 / WAIS Gq)',
    difficulty: 3,
    promptAr: 'سبيكة معدنية تزن 40 كيلوغراماً تحتوي على 20% من الذهب الخالص. كم كيلوغراماً من الذهب الخالص يجب إضافته إليها لتصبح نسبة الذهب في السبيكة الجديدة 50%؟',
    subPromptAr: 'يقيس الاستدلال الجبري التناسبي المتقدم (WAIS Arithmetic).',
    options: [
      { id: 'a', labelAr: '24 كيلوغراماً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '12 كيلوغراماً', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '20 كيلوغراماً', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '16 كيلوغراماً', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_10',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 10,
    domainKey: 'quantitative_reasoning',
    domainTitleAr: 'الاستدلال الكمي والرقمي (SB5 / WAIS Gq)',
    difficulty: 3,
    promptAr: 'في متتالية فيبوناتشي المعدلة: 1 ، 3 ، 4 ، 7 ، 11 ، 18 ، 29 ، (؟) — ما هو الحد التالي؟',
    subPromptAr: 'متتالية لوكاس الرياضية القياسية.',
    options: [
      { id: 'a', labelAr: '47', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '45', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '39', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '51', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_11',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 11,
    domainKey: 'verbal_comprehension',
    domainTitleAr: 'الاستيعاب اللفظي والتناظر الدلالي (Gc)',
    difficulty: 1,
    promptAr: 'التناظر اللفظي: «البوصلة» بالنسبة لـ «الاتجاه» مثل «الترمومتر (المِحرار)» بالنسبة لـ:',
    subPromptAr: 'يقيس إدراك العلاقات الوظيفية المجردة (Stanford-Binet Verbal Relations).',
    options: [
      { id: 'a', labelAr: 'درجة الحرارة', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الزئبق', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الضغط الجوي', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الطبيب', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_12',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 12,
    domainKey: 'verbal_comprehension',
    domainTitleAr: 'الاستيعاب اللفظي والتناظر الدلالي (Gc)',
    difficulty: 2,
    promptAr: 'الاستنتاج المنطقي الصوري: «جميع العلماء منهجيون، وبعض المفكرين علماء». أي العبارات التالية صحيحة بالضرورة المنطقية؟',
    subPromptAr: 'يقيس القياس المنطقي الأرسطي (Syllogistic Deductive Reasoning).',
    options: [
      { id: 'a', labelAr: 'بعض المفكرين منهجيون', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'جميع المفكرين منهجيون', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'جميع المنهجيين علماء', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'لا يوجد مفكر غير منهجي', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_13',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 13,
    domainKey: 'verbal_comprehension',
    domainTitleAr: 'الاستيعاب اللفظي والتناظر الدلالي (Gc)',
    difficulty: 2,
    promptAr: 'التناظر المفاهيمي: «التواضع» بالنسبة لـ «الغرور» مثل «الإيجاز» بالنسبة لـ:',
    subPromptAr: 'يقيس التضاد الدلالي الدقيق في اللغة الفصحى.',
    options: [
      { id: 'a', labelAr: 'الإسهاب (الإطناب)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'البلاغة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الاختصار', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الغموض', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_14',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 14,
    domainKey: 'verbal_comprehension',
    domainTitleAr: 'الاستيعاب اللفظي والتناظر الدلالي (Gc)',
    difficulty: 3,
    promptAr: 'الشرط المنطقي المعكوس (Modus Tollens): «إذا كانت الخوارزمية مشفرة، فإن البيانات محمية. البيانات غير محمية الآن». ماذا نستنتج يقيناً؟',
    subPromptAr: 'يقيس منطق القضايا الشرطية ونفي التالي.',
    options: [
      { id: 'a', labelAr: 'الخوارزمية غير مشفرة', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الخوارزمية مشفرة جزئياً', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'التشفير لا علاقة له بالحماية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'لا يمكن الجزم بأي نتيجة', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_15',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 15,
    domainKey: 'verbal_comprehension',
    domainTitleAr: 'الاستيعاب اللفظي والتناظر الدلالي (Gc)',
    difficulty: 3,
    promptAr: 'ما هي الكلمة المختلف تصنيفها المفاهيمي عن بقية الكلمات الأربع: (الاستنباط • الاستقراء • القياس المنطقي • الانطباع العاطفي)؟',
    subPromptAr: 'يقيس التجريد المفاهيمي وتصنيف العمليات المعرفية (WAIS Similarities).',
    options: [
      { id: 'a', labelAr: 'الانطباع العاطفي', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الاستقراء', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'القياس المنطقي', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الاستنباط', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'الانطباع العاطفي حالة وجدانية ذاتية، بينما الاستنباط والاستقراء والقياس المنطقي مناهج استدلال عقلي.',
  },
  {
    id: 'iq_16',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 16,
    domainKey: 'visual_spatial',
    domainTitleAr: 'المعالجة المكانية والتدوير الذهني (Gv)',
    difficulty: 1,
    promptAr: 'مكعب خشبي تم طلاء جميع أوجهه الستة باللون الأزرق، ثم قُطّع إلى 27 مكعباً صغيراً متساوياً (3×3×3). كم مكعباً صغيراً سيكون مطلياً من 3 أوجه بالضبط؟',
    subPromptAr: 'يقيس التصور الفضائي ثلاثي الأبعاد للمجسمات الهندسية (SB5 Visual-Spatial).',
    options: [
      { id: 'a', labelAr: '8 مكعبات', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '6 مكعبات', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '12 مكعباً', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '9 مكعبات', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'المكعبات المطلية من 3 أوجه هي فقط المكعبات الموجودة في الرؤوس (الزوايا) الثمانية للمكعب الكبير.',
  },
  {
    id: 'iq_17',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 17,
    domainKey: 'visual_spatial',
    domainTitleAr: 'المعالجة المكانية والتدوير الذهني (Gv)',
    difficulty: 2,
    promptAr: 'في نفس المكعب المقسم إلى 27 مكعباً صغيراً (3×3×3)، كم مكعباً صغيراً لن يصله أي طلاء أزرق على الإطلاق؟',
    subPromptAr: 'تخيل نواة المكعب ثلاثي الأبعاد.',
    options: [
      { id: 'a', labelAr: 'مكعب واحد فقط', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '3 مكعبات', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'صفر (جميعها مطلية)', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '6 مكعبات', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'يوجد مكعب واحد فقط في قلب المركز الداخلي (النواة 1×1×1) محاط من جميع الجهات ولا يلامس السطح الخارجي.',
  },
  {
    id: 'iq_18',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 18,
    domainKey: 'visual_spatial',
    domainTitleAr: 'المعالجة المكانية والتدوير الذهني (Gv)',
    difficulty: 2,
    promptAr: 'انطلق شخص من نقطة (أ) وسار 4 كيلومترات شمالاً، ثم انعطف شرقاً وسار 3 كيلومترات، ثم توقف. ما هي أقصر مسافة مستقيمة مباشرة تفصله عن نقطة البداية (أ)؟',
    subPromptAr: 'يقيس التوجيه الهندسي ونظرية فيثاغورس المكانية.',
    options: [
      { id: 'a', labelAr: '5 كيلومترات', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '7 كيلومترات', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '6 كيلومترات', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '3.5 كيلومتر', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_19',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 19,
    domainKey: 'visual_spatial',
    domainTitleAr: 'المعالجة المكانية والتدوير الذهني (Gv)',
    difficulty: 3,
    promptAr: 'طُويت ورقة مربعة من المنتصف أفقياً، ثم طُويت مرة أخرى من المنتصف عمودياً، ثم قُصّ ثقب دائري صغير من الزاوية المغلقة المركزية. عند فتح الورقة بالكامل، ماذا سنرى؟',
    subPromptAr: 'اختبار طي الورق الشهير في بطاريات الذكاء المكاني (Paper Folding Test).',
    options: [
      { id: 'a', labelAr: 'دائرة واحدة متماثلة في منتصف الورقة تماماً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أربع دوائر في الزوايا الأربع الخارجية', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'دائرتان على القطر الأيمن', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'أربعة أنصاف دوائر على الحواف', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_20',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 20,
    domainKey: 'visual_spatial',
    domainTitleAr: 'المعالجة المكانية والتدوير الذهني (Gv)',
    difficulty: 3,
    promptAr: 'إذا كانت الساعة تشير إلى (3:15) تماماً ولكنك تنظر إليها من خلال مرآة مستوية معلقة أمامها، فكم ستبدو الساعة في انعكاس المرآة؟',
    subPromptAr: 'يقيس الانعكاس المحوري البصري (Mirror Transformation).',
    options: [
      { id: 'a', labelAr: '8:45', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '9:45', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '3:45', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '9:15', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_21',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 21,
    domainKey: 'working_memory',
    domainTitleAr: 'الذاكرة العاملة والمعالجة الذهنية (Gwm)',
    difficulty: 1,
    promptAr: 'تأمل سلسلة الأرقام التالية: (8 - 3 - 9 - 2 - 6). إذا قمت بعكس ترتيبها من اليمين لليسار ثم أضفت (1) لكل رقم، فما هي السلسلة الناتجة؟',
    subPromptAr: 'يقيس سعة الذاكرة العاملة والتحويل الذهني العكسي (WAIS Digit Span Backward).',
    options: [
      { id: 'a', labelAr: '7 - 3 - 10 - 4 - 9', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '9 - 4 - 10 - 3 - 7', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '6 - 2 - 9 - 3 - 8', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '7 - 2 - 9 - 4 - 8', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_22',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 22,
    domainKey: 'working_memory',
    domainTitleAr: 'الذاكرة العاملة والمعالجة الذهنية (Gwm)',
    difficulty: 2,
    promptAr: 'في شيفرة رمزية: إذا كانت الكلمة (ق ل م) تساوي (4 7 9)، والكلمة (ع ل م) تساوي (2 7 9)، والكلمة (ع ق ل) تساوي (2 4 7)؛ فما هي قيمة الكلمة (م ع ق ل)؟',
    subPromptAr: 'يقيس ترميز الذاكرة العاملة وفك التشفير السريع (WAIS Coding).',
    options: [
      { id: 'a', labelAr: '9 2 4 7', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '7 4 2 9', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '9 4 2 7', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '2 9 4 7', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_23',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 23,
    domainKey: 'working_memory',
    domainTitleAr: 'الذاكرة العاملة والمعالجة الذهنية (Gwm)',
    difficulty: 2,
    promptAr: 'رتب العناصر المختلطة التالية: (د ، 7 ، أ ، 2 ، ج ، 9 ، ب ، 4) بحيث تضع الأرقام تصاعدياً أولاً ثم الحروف أبجدياً ثانياً:',
    subPromptAr: 'يقيس اختبار تعاقب الحروف والأرقام (WAIS Letter-Number Sequencing).',
    options: [
      { id: 'a', labelAr: '2 ، 4 ، 7 ، 9 — أ ، ب ، ج ، د', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '9 ، 7 ، 4 ، 2 — أ ، ب ، ج ، د', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '2 ، أ ، 4 ، ب ، 7 ، ج ، 9 ، د', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'أ ، ب ، ج ، د — 2 ، 4 ، 7 ، 9', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_24',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 24,
    domainKey: 'working_memory',
    domainTitleAr: 'الذاكرة العاملة والمعالجة الذهنية (Gwm)',
    difficulty: 3,
    promptAr: 'جلس 5 أشخاص (خالد، سامي، طارق، عادل، نبيل) في صف واحد. خالد يجلس عن يمين سامي مباشرة، وطارق يجلس في أقصى اليسار، وعادل يجلس بين سامي وطارق. إذا جلس نبيل في أقصى اليمين، فمن الجالس في المنتصف تماماً؟',
    subPromptAr: 'يقيس الاحتفاظ بالمعلومات المكانية المتعددة في الذاكرة العاملة.',
    options: [
      { id: 'a', labelAr: 'سامي', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'عادل', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'خالد', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'طارق', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'iq_25',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 25,
    domainKey: 'working_memory',
    domainTitleAr: 'الذاكرة العاملة والمعالجة الذهنية (Gwm)',
    difficulty: 3,
    promptAr: 'ابدأ بالعدد (18)، اقسمه على (3)، اضرب الناتج في (4)، اطرح منه (6)، ثم اقسم الناتج على (2) وأضف إليه (5). ما هي النتيجة النهائية؟',
    subPromptAr: 'يقيس المعالجة الحسابية المتسلسلة في الذاكرة العاملة دون تدوين ورقي.',
    options: [
      { id: 'a', labelAr: '14', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '12', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '16', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '11', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: '18 ÷ 3 = 6 ⬅ 6 × 4 = 24 ⬅ 24 - 6 = 18 ⬅ 18 ÷ 2 = 9 ⬅ 9 + 5 = 14.',
  },
  {
    id: 'iq_26',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 26,
    domainKey: 'fluid_reasoning',
    domainTitleAr: 'مصفوفات رافين المتتابعة (Raven Matrix Gf)',
    difficulty: 3,
    matrixVisualId: 'raven_matrix_6',
    promptAr: 'مصفوفة رافين (6 - التقدم الحلزوني المركب): في الشبكة (3×3)، يتحرك المؤشر الأسود خطوة واحدة باتجاه عقارب الساعة حول زوايا المربع الأربع في كل انتقال أفقي، وخطوتين في كل انتقال عمودي. إذا كان المؤشر في الخلية (صف 3، عمود 2) في الزاوية السفلى اليسرى، فأين يقع في الخلية المفقودة (صف 3، عمود 3)؟',
    subPromptAr: 'يقيس تتبع الإزاحة الزاوية ثنائية المحور في مصفوفات رافين المتقدمة (APM Set II).',
    options: [
      { id: 'a', labelAr: 'الزاوية العليا اليسرى', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الزاوية العليا اليمنى', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الزاوية السفلى اليمنى', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'في مركز المربع تماماً', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'الانتقال الأفقي يحرك المؤشر خطوة واحدة مع عقارب الساعة: من الزاوية السفلى اليسرى يصعد إلى الزاوية العليا اليسرى.',
  },
  {
    id: 'iq_27',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 27,
    domainKey: 'quantitative_reasoning',
    domainTitleAr: 'الاستدلال الكمي والرقمي (SB5 / WAIS Gq)',
    difficulty: 3,
    promptAr: 'مصفوفة عددية: في الصف الأول (4 ، 9 ، 25)، وفي الصف الثاني (6 ، 11 ، 49)، وفي الصف الثالث (8 ، 13 ، ؟). ما هو العدد المفقود؟',
    subPromptAr: 'اكتشف العلاقة الجبرية التي تربط العددين الأول والثاني بالعدد الثالث في كل صف.',
    options: [
      { id: 'a', labelAr: '81', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '64', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '100', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '72', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'القاعدة في كل صف: ((العدد الأول + العدد الثاني) - 8) تربيع، أو (العدد الأول + 1) تربيع: (4+1)²=25، (6+1)²=49، (8+1)²=81.',
  },
  {
    id: 'iq_28',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 28,
    domainKey: 'verbal_comprehension',
    domainTitleAr: 'الاستيعاب اللفظي والتناظر الدلالي (Gc)',
    difficulty: 3,
    promptAr: 'قياس منطقي مركب: «لا توجد نظرية علمية معصومة من النقد، وكل قانون فيزيائي هو نظرية علمية مبرهنة». ما النتيجة اللازمة منطقياً؟',
    subPromptAr: 'يقيس الاستنباط الصوري في القياس الأرسطي (Celarent Syllogism).',
    options: [
      { id: 'a', labelAr: 'لا يوجد قانون فيزيائي معصوم من النقد', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'بعض القوانين الفيزيائية معصومة من النقد', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'النقد يبطل جميع القوانين الفيزيائية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'جميع النظريات العلمية هي قوانين فيزيائية', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'بما أن الفئة الصغرى (قانون فيزيائي) مندرجة بالكامل في الفئة الوسطى (نظرية علمية) المستثناة كلياً من (العصمة من النقد)، فإن النتيجة الكلية السالبة لازمة يقيناً.',
  },
  {
    id: 'iq_29',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 29,
    domainKey: 'visual_spatial',
    domainTitleAr: 'المعالجة المكانية والتدوير الذهني (Gv)',
    difficulty: 3,
    promptAr: 'في المكعب المقسم إلى 27 مكعباً صغيراً (3×3×3) والمطلي من الخارج بالكامل، كم مكعباً صغيراً سيكون مطلياً من وجهين اثنين (2) بالضبط؟',
    subPromptAr: 'يقيس تحليل الحواف المكانية للمجسمات ثلاثية الأبعاد (WAIS Visual Puzzles).',
    options: [
      { id: 'a', labelAr: '12 مكعباً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '6 مكعبات', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '8 مكعبات', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '16 مكعباً', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'للمكعب 12 حرفاً (ضلعاً)، وفي منتصف كل حرف يوجد مكعب واحد مطلي من وجهين فقط، فيكون المجموع 12 مكعباً (8 زوايا + 12 حافة + 6 مراكز أوجه + 1 مركز داخلي = 27).',
  },
  {
    id: 'iq_30',
    batteryId: 'general_iq_raven_chc',
    questionNumber: 30,
    domainKey: 'working_memory',
    domainTitleAr: 'الذاكرة العاملة والمعالجة الذهنية (Gwm)',
    difficulty: 3,
    promptAr: 'ذاكرة التحديث المتسلسل (N-Back): في السلسلة (ك - م - ر - ك - س - ر - ن - س - ل)، ما هو الحرف الذي تكرر مرتين بحيث يفصل بين ظهوره الأول والثاني حرفان اثنان بالضبط في المرتين؟',
    subPromptAr: 'يقيس التحديث المستمر للذاكرة العاملة ومطابقة المسافات البينية.',
    options: [
      { id: 'a', labelAr: 'الحرفان (ك) و (ر) و (س) جميعها يفصل بين تكرارها حرفان اثنان', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الحرف (م) فقط', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الحرف (ن) فقط', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'لا يوجد أي حرف يتكرر بهذا النمط', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'ك (م، ر) ك — ر (ك، س) ر — س (ر، ن) س؛ جميع الثلاثة تتبع قاعدة (3-Back) بفارق حرفين بينهما.',
  },
];

// -------------------------------------------------------------------------
// BATTERY 3: EMOTIONAL INTELLIGENCE (Bar-On EQ-i & MSCEIT - 25 Questions)
// -------------------------------------------------------------------------
export const EMOTIONAL_INTELLIGENCE_EQ_QUESTIONS: ObjectiveBatteryQuestion[] = [
  // 1. Intrapersonal EQ (Bar-On Self-Regard, Emotional Self-Awareness, Assertiveness, Independence, Self-Actualization)
  {
    id: 'eq_1',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 1,
    domainKey: 'intrapersonal_eq',
    domainTitleAr: 'الكفاءة الذاتية والوعي الانفعالي (Bar-On Intrapersonal)',
    difficulty: 1,
    promptAr: 'عندما أشعر بضيق مفاجئ خلال اليوم، أستطيع تحديد الشعور بدقة (هل هو قلق، أم خيبة أمل، أم إرهاق جسدي) ومعرفة سببه الحقيقي.',
    subPromptAr: 'الوعي الذاتي الانفعالي (Emotional Self-Awareness - Bar-On EQ-i).',
    options: [
      { id: 'a', labelAr: 'دائماً / ينطبق عليّ تماماً (أحدد مشاعري وجذورها بوضوح)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'غالباً / ينطبق بدرجة كبيرة', scoreWeight: 80 },
      { id: 'c', labelAr: 'أحياناً / أحتاج وقتاً لفهم سبب ضيقي', scoreWeight: 55 },
      { id: 'd', labelAr: 'نادراً / تختلط عليّ المشاعر ولا أعرف سببها', scoreWeight: 25 },
    ],
  },
  {
    id: 'eq_2',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 2,
    domainKey: 'intrapersonal_eq',
    domainTitleAr: 'الكفاءة الذاتية والوعي الانفعالي (Bar-On Intrapersonal)',
    difficulty: 1,
    promptAr: 'عندما يُطلب مني أمر يتعارض مع مبادئي أو يفوق طاقتي، كيف أتصرف (مهارة التوكيد الذاتي Assertiveness)؟',
    subPromptAr: 'يقيس القدرة على قول "لا" بأدب وحزم دون عدوانية أو شعور مفرط بالذنب.',
    options: [
      { id: 'a', labelAr: 'أعتذر بلباقة وحزم وأوضح حدودي باحترام وهدوء تام', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أحاول الاعتذار بعد تردد وتفكير طويل', scoreWeight: 75 },
      { id: 'c', labelAr: 'أوافق على مضض خجلاً ثم أشعر بالضيق الداخلي', scoreWeight: 40 },
      { id: 'd', labelAr: 'أرفض بحدة وانفعال يسبب توتراً في العلاقة', scoreWeight: 30 },
    ],
  },
  {
    id: 'eq_3',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 3,
    domainKey: 'intrapersonal_eq',
    domainTitleAr: 'الكفاءة الذاتية والوعي الانفعالي (Bar-On Intrapersonal)',
    difficulty: 2,
    promptAr: 'تقدير الذات (Self-Regard): عندما أتعرض لنقد غير منصف من شخص في العمل أو الأسرة:',
    subPromptAr: 'يقيس استقرار القيمة الذاتية وعدم اعتمادها الكلي على استحسان الآخرين.',
    options: [
      { id: 'a', labelAr: 'أفصل بين رأيه وقيمتي الذاتية، وأستخلص إن كان هناك جزء مفيد بهدوء', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أتأثر قليلاً في البداية ثم أستعيد ثقتي بنفسي سريعاً', scoreWeight: 80 },
      { id: 'c', labelAr: 'أشعر باهتزاز ثقتي بنفسي وأفكر في كلامه طوال اليوم', scoreWeight: 45 },
      { id: 'd', labelAr: 'أدخل في صدام دفاعي عنيف لإثبات أنه مخطئ', scoreWeight: 30 },
    ],
  },
  {
    id: 'eq_4',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 4,
    domainKey: 'intrapersonal_eq',
    domainTitleAr: 'الكفاءة الذاتية والوعي الانفعالي (Bar-On Intrapersonal)',
    difficulty: 2,
    promptAr: 'الاستقلالية الوجدانية (Emotional Independence): في القرارات المصيرية التي تخص مستقبلي:',
    subPromptAr: 'يقيس التوازن بين الاستشارة الحكيمة واستقلال القرار.',
    options: [
      { id: 'a', labelAr: 'أستمع لنصائح الحكماء، لكنني أتخذ قراري النهائي بقناعة وتحمل للمسؤولية', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أتخذ قراري بنفسي دون استشارة أحد إطلاقاً', scoreWeight: 70 },
      { id: 'c', labelAr: 'أجد صعوبة في الحسم إلا إذا طمأنني الجميع ووافقوا', scoreWeight: 45 },
      { id: 'd', labelAr: 'أترك للآخرين اختيار مساري لتجنب لوم النفس', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_5',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 5,
    domainKey: 'intrapersonal_eq',
    domainTitleAr: 'الكفاءة الذاتية والوعي الانفعالي (Bar-On Intrapersonal)',
    difficulty: 2,
    promptAr: 'تحقيق الذات (Self-Actualization): إلى أي مدى تشعر بأنك تستثمر إمكاناتك الحقيقية في أهداف ذات معنى؟',
    subPromptAr: 'أحد المقاييس الفرعية الـ 15 في نموذج بار-أون.',
    options: [
      { id: 'a', labelAr: 'بدرجة عالية جداً؛ لدي أهداف واضحة أعمل بشغف على تطويرها يومياً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'بدرجة جيدة؛ أسعى للتطور كلما سمحت الظروف', scoreWeight: 80 },
      { id: 'c', labelAr: 'بدرجة متوسطة؛ أشعر أن لدي طاقات كامنة لم أستثمرها بعد', scoreWeight: 55 },
      { id: 'd', labelAr: 'بدرجة منخفضة؛ أعيش بلا أهداف واضحة', scoreWeight: 25 },
    ],
  },

  // 2. Interpersonal EQ & Perceiving Emotions (MSCEIT Branch 1 + Bar-On Empathy)
  {
    id: 'eq_6',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 6,
    domainKey: 'interpersonal_eq',
    domainTitleAr: 'إدراك المشاعر والتعاطف الاجتماعي (MSCEIT & Bar-On Empathy)',
    difficulty: 2,
    promptAr: 'سيناريو MSCEIT (إدراك الانفعالات): دخل زميلك إلى الاجتماع وهو يبتسم ابتسامة سريعة باهتة، لكن نبرة صوته منخفضة ويتجنب التقاء الأعين. ما القراءة الأدق لحالته؟',
    subPromptAr: 'يقيس دقة قراءة الإشارات غير اللفظية المتناقضة (Perceiving Emotions).',
    options: [
      { id: 'a', labelAr: 'يخفي توتراً أو حزناً داخلياً خلف ابتسامة مجاملة اجتماعية، ويحتاج لتعامل لطيف غير ضاغط', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'يشعر بالسعادة والرضا طالما أنه ابتسم عند الدخول', scoreWeight: 30 },
      { id: 'c', labelAr: 'يتصرف بتكبر وتعالٍ متعمد تجاه الحاضرين', scoreWeight: 20 },
      { id: 'd', labelAr: 'لا يمكن قراءة أي شيء من لغة الجسد', scoreWeight: 35 },
    ],
  },
  {
    id: 'eq_7',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 7,
    domainKey: 'interpersonal_eq',
    domainTitleAr: 'إدراك المشاعر والتعاطف الاجتماعي (MSCEIT & Bar-On Empathy)',
    difficulty: 2,
    promptAr: 'عندما يشتكي لك صديق أو شريك حياة من مشكلة مؤلمة يمر بها، ما هي الاستجابة الأكثر ذكاءً عاطفياً في الدقائق الأولى؟',
    subPromptAr: 'يقيس الإصغاء التعاطفي قبل القفز لإعطاء النصائح الجاهزة.',
    options: [
      { id: 'a', labelAr: 'الإنصات الكامل وتسمية مشاعره بتعاطف («أتفهم كم كان ذلك مرهقاً لك») قبل طرح الحلول', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'مقاطعته فوراً لإعطائه حلولاً منطقية سريعة لإنهاء المشكلة', scoreWeight: 60 },
      { id: 'c', labelAr: 'تحويل الحديث لقصة مشابهة حدثت معي شخصياً', scoreWeight: 40 },
      { id: 'd', labelAr: 'التقليل من حجم المشكلة وإخباره ألا يبالغ في الحزن', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_8',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 8,
    domainKey: 'interpersonal_eq',
    domainTitleAr: 'إدراك المشاعر والتعاطف الاجتماعي (MSCEIT & Bar-On Empathy)',
    difficulty: 2,
    promptAr: 'المسؤولية الاجتماعية (Social Responsibility): كيف تتعامل مع المواقف التي يمكنك فيها مساعدة شخص في فريقك دون مقابل مباشر؟',
    subPromptAr: 'أحد المقاييس الفرعية للذكاء التفاعلي عند بار-أون.',
    options: [
      { id: 'a', labelAr: 'أبادر بالمساندة بروح الفريق مع الحفاظ على توازن مهامي الأساسية', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أساعد فقط إذا طُلب مني ذلك رسمياً', scoreWeight: 70 },
      { id: 'c', labelAr: 'أتحمل أعباء الجميع حتى لو تضررت مهامي وصحتي', scoreWeight: 50 },
      { id: 'd', labelAr: 'أركز على مصلحتي الفردية فقط ولا شأن لي بالآخرين', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_9',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 9,
    domainKey: 'interpersonal_eq',
    domainTitleAr: 'إدراك المشاعر والتعاطف الاجتماعي (MSCEIT & Bar-On Empathy)',
    difficulty: 2,
    promptAr: 'بناء العلاقات الحميمة (Interpersonal Relationship): ما الذي يميز علاقاتك الإنسانية المقربة؟',
    subPromptAr: 'يقيس جودة الثقة والدفء المتبادل في العلاقات.',
    options: [
      { id: 'a', labelAr: 'علاقات عميقة مبنية على المودة، الثقة المتبادلة، والوفاء طويل الأمد', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'علاقات طيبة لكنني أتحفظ في الاقتراب العاطفي', scoreWeight: 75 },
      { id: 'c', labelAr: 'علاقات متقلبة تبدأ بحماس شديد وتنتهي سريعاً', scoreWeight: 40 },
      { id: 'd', labelAr: 'أجد صعوبة كبيرة في بناء أي علاقة مستدامة', scoreWeight: 25 },
    ],
  },
  {
    id: 'eq_10',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 10,
    domainKey: 'interpersonal_eq',
    domainTitleAr: 'إدراك المشاعر والتعاطف الاجتماعي (MSCEIT & Bar-On Empathy)',
    difficulty: 3,
    promptAr: 'سيناريو MSCEIT: في اجتماع عائلي، لاحظت أن شخصين يتبادلان عبارات مهذبة ظاهرياً لكن بنبرة حادة والتفاتات سريعة. كيف تتصرف كشخص ذكي عاطفياً؟',
    subPromptAr: 'يقيس استشعار التوتر الخفي وإدارة الموقف الاجتماعي بلباقة.',
    options: [
      { id: 'a', labelAr: 'أغير دفة الحوار بلطف إلى موضوع مشترك يجمع الجميع بابتسامة لتفكيك الاحتقان دون إحراج أحد', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أواجههما أمام الجميع وأسألهما عن سبب التوتر', scoreWeight: 30 },
      { id: 'c', labelAr: 'أنحاز لأحدهما فوراً في النقاش', scoreWeight: 20 },
      { id: 'd', labelAr: 'أغادر المجلس بصمت وحرج', scoreWeight: 45 },
    ],
  },

  // 3. Stress Management & Managing Emotions (Bar-On Stress Tolerance & Impulse Control + MSCEIT Branch 4)
  {
    id: 'eq_11',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 11,
    domainKey: 'stress_management_eq',
    domainTitleAr: 'إدارة الضغوط وضبط الاندفاع (Stress Management & MSCEIT)',
    difficulty: 2,
    promptAr: 'سيناريو MSCEIT (إدارة الانفعالات): وصلك بريد إلكتروني أو رسالة فيها اتهام غير دقيق بتقصيرك في مشروع تعبت فيه كثيراً. ما التصرف الأمثل؟',
    subPromptAr: 'يقيس ضبط الاندفاع (Impulse Control) وتنظيم الغضب.',
    options: [
      { id: 'a', labelAr: 'أتريث حتى تهدأ ثورة الانفعال، ثم أرد برسالة موثقة بالحقائق والأرقام بلغة مهنية هادئة وراقية', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أرد فوراً في نفس اللحظة برسالة غاضبة وحادة للدفاع عن كرامتي', scoreWeight: 25 },
      { id: 'c', labelAr: 'أتجاهل الرسالة تماماً وأكتم الغيظ في نفسي دون توضيح الحقائق', scoreWeight: 45 },
      { id: 'd', labelAr: 'أشتكي للزملاء في المكتب بتذمر مستمر', scoreWeight: 35 },
    ],
  },
  {
    id: 'eq_12',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 12,
    domainKey: 'stress_management_eq',
    domainTitleAr: 'إدارة الضغوط وضبط الاندفاع (Stress Management & MSCEIT)',
    difficulty: 2,
    promptAr: 'تحمل الضغوط (Stress Tolerance): عندما تتراكم عليك عدة مهام عاجلة في وقت واحد ويقترب الموعد النهائي:',
    subPromptAr: 'يقيس الكفاءة التنفيذية تحت الضغط العالي.',
    options: [
      { id: 'a', labelAr: 'أتنفس بعمق، أرتب المهام حسب الأولوية، وأنجزها خطوة بخطوة بتركيز هادئ', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أشعر ببعض التوتر لكنني أضغط على نفسي لإتمامها', scoreWeight: 75 },
      { id: 'c', labelAr: 'أرتبك وأنتقل بين المهام بعشوائية دون إتمام أي منها', scoreWeight: 40 },
      { id: 'd', labelAr: 'أصاب بالشلل الذهني وأؤجل كل شيء', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_13',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 13,
    domainKey: 'stress_management_eq',
    domainTitleAr: 'إدارة الضغوط وضبط الاندفاع (Stress Management & MSCEIT)',
    difficulty: 2,
    promptAr: 'ضبط الاندفاع (Impulse Control): أثناء نقاش حاد مع شريك الحياة أو صديق عزيز، خطرت ببالك عبارة لاذعة ستفحم الطرف الآخر لكنها ستجرح مشاعره بشدة:',
    subPromptAr: 'يقيس كبح الاستجابات اللفظية الهدامة (Gottman & Bar-On).',
    options: [
      { id: 'a', labelAr: 'أمسك لساني فوراً عن قولها، لأن الحفاظ على المودة والاحترام أهم من الانتصار اللحظي', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'ألمح إليها بطريقة غير مباشرة', scoreWeight: 50 },
      { id: 'c', labelAr: 'أقولها في لحظة الغضب ثم أندم وأعتذر لاحقاً', scoreWeight: 35 },
      { id: 'd', labelAr: 'أقولها بكل قسوة ليحسب لي حساباً', scoreWeight: 15 },
    ],
  },
  {
    id: 'eq_14',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 14,
    domainKey: 'stress_management_eq',
    domainTitleAr: 'إدارة الضغوط وضبط الاندفاع (Stress Management & MSCEIT)',
    difficulty: 3,
    promptAr: 'سيناريو MSCEIT: عليك تقديم عرض تقديمي مصيري غداً صباحاً وتشعر بقلق وخفقان يمنعك من التركيز. أي استراتيجية تنظيم انفعالي هي الأكثر فاعلية علمياً؟',
    subPromptAr: 'إعادة التقييم المعرفي (Cognitive Reappraisal - James Gross & MSCEIT).',
    options: [
      { id: 'a', labelAr: 'تحويل تفسير الخفقان من «خوف مهدد» إلى «حماس وطاقة استعداد طبيعية» مع مراجعة النقاط الرئيسية بهدوء', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'محاولة قمع التفكير في العرض تماماً والهروب لمشاهدة التلفاز لساعات متأخرة', scoreWeight: 40 },
      { id: 'c', labelAr: 'تخيل أسوأ السيناريوهات الكارثية الممكنة طوال الليل', scoreWeight: 20 },
      { id: 'd', labelAr: 'الاعتذار عن عدم حضور العرض في الصباح', scoreWeight: 15 },
    ],
  },
  {
    id: 'eq_15',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 15,
    domainKey: 'stress_management_eq',
    domainTitleAr: 'إدارة الضغوط وضبط الاندفاع (Stress Management & MSCEIT)',
    difficulty: 2,
    promptAr: 'بعد انتهاء أزمة صعبة أو موقف مرهق عاطفياً، كم يستغرق جهازك النفسي لاستعادة توازنه وصفائه؟',
    subPromptAr: 'يقيس سرعة التشافي الانفعالي (Emotional Recovery Rate).',
    options: [
      { id: 'a', labelAr: 'وقت قصير؛ أستخلص الدرس وأفرغ التوتر بالرياضة أو التأمل وأمضي قدماً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'يوم أو يومين من الهدوء ثم أعود لطبيعتي', scoreWeight: 80 },
      { id: 'c', labelAr: 'أبقى أعيد شريط الموقف في ذهني لأسابيع طويلة', scoreWeight: 40 },
      { id: 'd', labelAr: 'يترك الموقف مرارة دائمة تعطل حياتي', scoreWeight: 20 },
    ],
  },

  // 4. Adaptability & Understanding Emotions (Bar-On Reality Testing, Flexibility, Problem Solving + MSCEIT Branch 2 & 3)
  {
    id: 'eq_16',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 16,
    domainKey: 'adaptability_eq',
    domainTitleAr: 'التكيف وفهم التحولات الانفعالية (Adaptability & MSCEIT)',
    difficulty: 3,
    promptAr: 'سيناريو MSCEIT (فهم تحولات المشاعر): وفق نموذج بلوتشيك وماير للانفعالات، إذا تُرك شعور «الإزعاج البسيط» دون معالجة وتراكم مع شعور «الظلم»، فإلى أي انفعال مركب يتحول غالباً؟',
    subPromptAr: 'يقيس فهم ديناميكيات المزج والتحول الانفعالي (Understanding Emotional Transitions).',
    options: [
      { id: 'a', labelAr: 'يتصاعد إلى الغضب المحتقن ثم السخط والعدائية إن لم يتم تفكيكه بالحوار', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'يتحول تلقائياً إلى شعور بالبهجة واللامبالاة', scoreWeight: 20 },
      { id: 'c', labelAr: 'يبقى إزعاجاً بسيطاً ثابتاً لا يتغير أبداً', scoreWeight: 40 },
      { id: 'd', labelAr: 'يتحول إلى دهشة وفضول معرفي', scoreWeight: 30 },
    ],
  },
  {
    id: 'eq_17',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 17,
    domainKey: 'adaptability_eq',
    domainTitleAr: 'التكيف وفهم التحولات الانفعالية (Adaptability & MSCEIT)',
    difficulty: 2,
    promptAr: 'سيناريو MSCEIT (توظيف المشاعر لتسهيل التفكير): أي حالة مزاجية تساعد العقل أكثر عند القيام بمهمة «مراجعة عقود قانونية أو حسابات مالية دقيقة واكتشاف الأخطاء»؟',
    subPromptAr: 'يقيس الفرع الثاني من MSCEIT (Using Emotions to Facilitate Thought).',
    options: [
      { id: 'a', labelAr: 'المزاج الهادئ الجاد ذو الحذر المعتدل (لأنه يعزز التدقيق التفصيلي والانتباه للهفوات)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'النشوة العارمة والمرح المفرط (لأنه يتجاوز التفاصيل سريعاً)', scoreWeight: 35 },
      { id: 'c', labelAr: 'الغضب الشديد والانفعال الحاد', scoreWeight: 20 },
      { id: 'd', labelAr: 'الحالة المزاجية لا تؤثر إطلاقاً على نوع التفكير', scoreWeight: 30 },
    ],
  },
  {
    id: 'eq_18',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 18,
    domainKey: 'adaptability_eq',
    domainTitleAr: 'التكيف وفهم التحولات الانفعالية (Adaptability & MSCEIT)',
    difficulty: 2,
    promptAr: 'اختبار الواقع (Reality Testing - Bar-On): عندما أواجه خلافاً أو مشكلة مع شخص آخر:',
    subPromptAr: 'يقيس القدرة على رؤية الأمور كما هي في الواقع دون تضخيم وهمي أو إسقاط.',
    options: [
      { id: 'a', labelAr: 'أتحقق من الوقائع الفعلية بموضوعية وأفصل بين الحقائق وبين ظنوني ومخاوفي', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أميل لتفسير الموقف بناءً على حدسي الأول ثم أتأكد لاحقاً', scoreWeight: 75 },
      { id: 'c', labelAr: 'أبني سيناريوهات وافتراضات سلبية كبيرة دون دليل ملموس', scoreWeight: 35 },
      { id: 'd', labelAr: 'أنكر وجود أي مشكلة وأتجاهل المؤشرات الواضحة', scoreWeight: 25 },
    ],
  },
  {
    id: 'eq_19',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 19,
    domainKey: 'adaptability_eq',
    domainTitleAr: 'التكيف وفهم التحولات الانفعالية (Adaptability & MSCEIT)',
    difficulty: 2,
    promptAr: 'المرونة التكيفية (Flexibility): إذا تغيرت خطة سفر أو مشروع عمل في اللحظة الأخيرة لظرف طارئ خارج عن إرادتك:',
    subPromptAr: 'يقيس مرونة تعديل المشاعر والخطط مع المتغيرات الجديدة.',
    options: [
      { id: 'a', labelAr: 'أتقبل الواقع الجديد بسرعة وأبتكر خطة بديلة للاستفادة من الوقت المتاح', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أشعر ببعض الضيق المبدئي ثم أتأقلم مع الوضع الجديد', scoreWeight: 80 },
      { id: 'c', labelAr: 'يفسد مزاجي طوال اليوم وأرفض أي بديل آخر', scoreWeight: 35 },
      { id: 'd', labelAr: 'ألوم جميع المحيطين بي بغضب شديد', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_20',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 20,
    domainKey: 'adaptability_eq',
    domainTitleAr: 'التكيف وفهم التحولات الانفعالية (Adaptability & MSCEIT)',
    difficulty: 2,
    promptAr: 'حل المشكلات الشخصية (Problem Solving): عندما تتكرر عقبة معينة في علاقتي أو عملي:',
    subPromptAr: 'يقيس المنهجية الواعية في حل المشكلات بدلاً من الهروب.',
    options: [
      { id: 'a', labelAr: 'أحدد جذر المشكلة، أضع عدة بدائل عملية، وأطبق الحل الأنسب بهدوء', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أجرب حلولاً سريعة ومؤقتة لتجاوز الموقف', scoreWeight: 70 },
      { id: 'c', labelAr: 'أؤجل مواجهتها على أمل أن تُحل من تلقاء نفسها', scoreWeight: 40 },
      { id: 'd', labelAr: 'أنسحب تماماً من العلاقة أو العمل عند أول عقبة', scoreWeight: 20 },
    ],
  },

  // 5. General Mood & Positive Drive (Bar-On Optimism & Happiness)
  {
    id: 'eq_21',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 21,
    domainKey: 'general_mood_eq',
    domainTitleAr: 'المزاج العام والتفاؤل الإيجابي (Bar-On General Mood)',
    difficulty: 1,
    promptAr: 'التفاؤل الواقعي (Optimism): كيف تنظر إلى المستقبل عندما تمر بمرحلة صعبة أو ركود مؤقت؟',
    subPromptAr: 'يقيس المرونة التفاؤلية (Learned Optimism - Seligman & Bar-On).',
    options: [
      { id: 'a', labelAr: 'أرى الصعوبة كمرحلة مؤقتة ومحدودة يمكن تجاوزها بالسعي والتعلم', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أحاول الحفاظ على الأمل رغم القلق المتقطع', scoreWeight: 75 },
      { id: 'c', labelAr: 'أشعر أن الحظ يعاندني دائماً وأن الأمور ستزداد سوءاً', scoreWeight: 35 },
      { id: 'd', labelAr: 'أفقد الرغبة في المحاولة تماماً', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_22',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 22,
    domainKey: 'general_mood_eq',
    domainTitleAr: 'المزاج العام والتفاؤل الإيجابي (Bar-On General Mood)',
    difficulty: 1,
    promptAr: 'الرضا والامتنان (Happiness & Well-being): إلى أي مدى تستمتع بالتفاصيل الإيجابية البسيطة في يومك؟',
    subPromptAr: 'يقيس مؤشر السعادة والرضا الداخلي في مقياس بار-أون.',
    options: [
      { id: 'a', labelAr: 'أستشعر النعم اليومية بامتنان عميق وأصنع البهجة لنفسي ولمن حولي', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أشعر بالرضا في أغلب الأوقات المعتادة', scoreWeight: 80 },
      { id: 'c', labelAr: 'نادراً ما أشعر بالسرور إلا عند تحقق إنجازات ضخمة فقط', scoreWeight: 50 },
      { id: 'd', labelAr: 'يغلب عليّ الشعور بالكآبة وعدم الرضا', scoreWeight: 25 },
    ],
  },
  {
    id: 'eq_23',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 23,
    domainKey: 'general_mood_eq',
    domainTitleAr: 'المزاج العام والتفاؤل الإيجابي (Bar-On General Mood)',
    difficulty: 2,
    promptAr: 'العدوى الانفعالية الإيجابية: عندما تدخل إلى فريق عمل أو أسرة يسودها الإحباط والفتور:',
    subPromptAr: 'يقيس القيادة الوجدانية وبث الأمل.',
    options: [
      { id: 'a', labelAr: 'أبادر ببث الكلمات المشجعة وتذكيرهم بنقاط القوة لرفع الروح المعنوية بواقعية', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أحافظ على هدوئي الخاص دون التدخل في مشاعرهم', scoreWeight: 70 },
      { id: 'c', labelAr: 'أنتقد فتورهم بحدة ليقوموا بالعمل', scoreWeight: 35 },
      { id: 'd', labelAr: 'ينتقل إليّ الإحباط فوراً وأشعر باليأس معهم', scoreWeight: 30 },
    ],
  },
  {
    id: 'eq_24',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 24,
    domainKey: 'general_mood_eq',
    domainTitleAr: 'المزاج العام والتفاؤل الإيجابي (Bar-On General Mood)',
    difficulty: 2,
    promptAr: 'التسامح والتحرر الانفعالي: كيف تتعامل مع الذكريات المؤلمة أو الأخطاء القديمة التي اعتذر أصحابها عنها بصدق؟',
    subPromptAr: 'يقيس التشافي الوجداني وعدم استنزاف الطاقة في الضغائن.',
    options: [
      { id: 'a', labelAr: 'أطوي الصفحة بوعي وأحرر قلبي من الثقل مع حفظ الدرس للمستقبل', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أسامح ظاهرياً لكنني أسترجع الموقف بين الحين والآخر', scoreWeight: 65 },
      { id: 'c', labelAr: 'أجد صعوبة شديدة في التجاوز وأذكرهم بخطئهم عند أي خلاف', scoreWeight: 35 },
      { id: 'd', labelAr: 'لا أسامح أبداً وأحتفظ بالغضب سنوات طويلة', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_25',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 25,
    domainKey: 'general_mood_eq',
    domainTitleAr: 'المزاج العام والتفاؤل الإيجابي (Bar-On General Mood)',
    difficulty: 2,
    promptAr: 'التوازن بين العقل والقلب: عند اتخاذ قرار مهم يمس حياتك وعلاقتك بالآخرين:',
    subPromptAr: 'يقيس التكامل المعرفي-الوجداني (Emotional-Cognitive Integration).',
    options: [
      { id: 'a', labelAr: 'أجمع بتناغم بين معطيات المنطق العقلاني ومراعاة المشاعر الإنسانية والقيم', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أغلب الجانب العقلاني البحت مع مراعاة بسيطة للمشاعر', scoreWeight: 75 },
      { id: 'c', labelAr: 'أندفع وراء عاطفتي اللحظية دون حساب العواقب المنطقية', scoreWeight: 40 },
      { id: 'd', labelAr: 'أتردد طويلاً بين عقلي وقلبي دون حسم', scoreWeight: 35 },
    ],
  },
  {
    id: 'eq_26',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 26,
    domainKey: 'intrapersonal_eq',
    domainTitleAr: 'الكفاءة الذاتية والوعي الانفعالي (Bar-On Intrapersonal)',
    difficulty: 3,
    promptAr: 'الوعي بالمحفزات الخفية (Emotional Triggers): عندما يثير شخص ما غضبي بشكل متكرر، كيف أحلل الموقف داخلياً؟',
    subPromptAr: 'يقيس البصيرة النفسية العميقة وفهم الانفعالات الذاتية (MSCEIT Understanding).',
    options: [
      { id: 'a', labelAr: 'أسأل نفسي بصدق عن الحاجة النفسية أو القيمة التي مسّها كلامه داخلي، وأعالج جذر الحساسية بوعي', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أحاول تجنب التفكير في الموضوع وتناسي الشخص', scoreWeight: 65 },
      { id: 'c', labelAr: 'أعتبره شخصاً سيئاً بالكامل وأحمل الضغينة تجاهه', scoreWeight: 35 },
      { id: 'd', labelAr: 'أفقد أعصابي في كل مرة دون أن أعرف لماذا يستفزني', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_27',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 27,
    domainKey: 'interpersonal_eq',
    domainTitleAr: 'إدراك المشاعر والتعاطف الاجتماعي (MSCEIT & Bar-On Empathy)',
    difficulty: 3,
    promptAr: 'سيناريو MSCEIT: أخبرك زميلك بنجاح مشروعه الجديد، لكنك لاحظت أنه يتحدث عنه بنبرة قلقة ويفتقر للفرح المتوقع. ما الاستجابة الأكثر فطنة عاطفياً؟',
    subPromptAr: 'يقيس التقاط المشاعر المركبة (النجاح الممزوج بالخوف من المسؤولية القادمة).',
    options: [
      { id: 'a', labelAr: 'أبارك له بحرارة ثم أسأله بلطف: «أشعر أنك تحمل همّ المرحلة القادمة، كيف يمكنني دعمك؟»', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أكتفي بكلمة مبروك سريعة وأغير الموضوع', scoreWeight: 55 },
      { id: 'c', labelAr: 'ألومه على عدم إظهار الفرح والامتنان', scoreWeight: 25 },
      { id: 'd', labelAr: 'أتحدث عن إنجازاتي الشخصية السابقة', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_28',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 28,
    domainKey: 'stress_management_eq',
    domainTitleAr: 'إدارة الضغوط وضبط الاندفاع (Stress Management & MSCEIT)',
    difficulty: 3,
    promptAr: 'الفصل الانفعالي الصحي (Emotional Boundaries): عندما أعود إلى المنزل بعد يوم عمل شاق ومليء بالتوتر:',
    subPromptAr: 'يقيس منع انتقال التوتر المهني إلى العلاقات الأسرية والشخصية.',
    options: [
      { id: 'a', labelAr: 'آخذ دقائق من الهدوء والاسترخاء للفصل الذهني، وألاطف أهلي دون تفريغ ضغط العمل فيهم', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أكون صامتاً ومنعزلاً طوال المساء لتجنب الاحتكاك', scoreWeight: 65 },
      { id: 'c', labelAr: 'أنفعل على أبسط الأمور المنزلية بسبب توتر العمل', scoreWeight: 30 },
      { id: 'd', labelAr: 'أظل أعمل وأتشاجر هاتفياً طوال الليل', scoreWeight: 20 },
    ],
  },
  {
    id: 'eq_29',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 29,
    domainKey: 'adaptability_eq',
    domainTitleAr: 'التكيف وفهم التحولات الانفعالية (Adaptability & MSCEIT)',
    difficulty: 3,
    promptAr: 'سيناريو MSCEIT (تسهيل التفكير الإبداعي): إذا أردت قيادة جلسة عصف ذهني (Brainstorming) لابتكار أفكار غير تقليدية، فأي مناخ انفعالي يجب أن تهيئه للفريق؟',
    subPromptAr: 'يقيس توظيف الانفعالات لخدمة التفكير التباعدي الإبداعي (MSCEIT Branch 2).',
    options: [
      { id: 'a', labelAr: 'مناخ من البهجة والانفتاح والأمان النفسي الخالي من النقد المبكر (لأن المزاج الإيجابي يوسع الارتباطات الذهنية)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'مناخ من التوتر الصارم والتهديد بالعقوبات لتحفيزهم', scoreWeight: 20 },
      { id: 'c', labelAr: 'مناخ من الحزن والجدية الرسمية الصامتة', scoreWeight: 35 },
      { id: 'd', labelAr: 'نقد كل فكرة فور طرحها لإثبات دقتك', scoreWeight: 15 },
    ],
  },
  {
    id: 'eq_30',
    batteryId: 'emotional_intelligence_eq',
    questionNumber: 30,
    domainKey: 'general_mood_eq',
    domainTitleAr: 'المزاج العام والتفاؤل الإيجابي (Bar-On General Mood)',
    difficulty: 2,
    promptAr: 'المرونة الوجدانية المستدامة: عندما أتعرض لإخفاق غير متوقع في هدف سعيت إليه طويلاً:',
    subPromptAr: 'يقيس الأسلوب التفسيري التفاؤلي (Explanatory Style) مقابل العجز المكتسب.',
    options: [
      { id: 'a', labelAr: 'أحزن بشكل طبيعي مؤقت، ثم أحلل الأسباب بموضوعية وأعيد المحاولة باستراتيجية أذكى', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أحول مساري لهدف آخر أقل طموحاً بعد فترة من الإحباط', scoreWeight: 65 },
      { id: 'c', labelAr: 'أعتبر الإخفاق دليلاً على ضعفي الشخصي الدائم', scoreWeight: 30 },
      { id: 'd', labelAr: 'أتوقف عن المحاولة في أي مجال جديد خوفاً من تكرار الفشل', scoreWeight: 15 },
    ],
  },
];

// -------------------------------------------------------------------------
// BATTERY 4: COGNITIVE & PROFESSIONAL APTITUDE (CogAT & Wonderlic - 25 Questions)
// -------------------------------------------------------------------------
export const COGNITIVE_APTITUDE_COGAT_QUESTIONS: ObjectiveBatteryQuestion[] = [
  // 1. Verbal Battery (CogAT Verbal Classification, Sentence Completion, Verbal Analogies) - 9 Questions
  {
    id: 'cog_1',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 1,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 1,
    promptAr: 'تصنيف المفردات (CogAT): الكلمات الثلاث (التخطيط • التنظيم • التوجيه) تنتمي لفئة واحدة. أي كلمة مما يلي تنتمي لنفس الفئة الوظيفية؟',
    subPromptAr: 'يقيس التصنيف المفاهيمي الإداري.',
    options: [
      { id: 'a', labelAr: 'الرقابة والتقييم', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'البيع بالتجزئة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'البرمجة النصية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الهندسة المدنية', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_2',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 2,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 1,
    promptAr: 'سؤال Wonderlic السريع: ما هو المضاد الدلالي الأدق لكلمة «مُـتَـقَـلِّـب»؟',
    subPromptAr: 'يقيس دقة الحصيلة المعجمية وسرعة الاستدعاء.',
    options: [
      { id: 'a', labelAr: 'راسخ / ثابت', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'متغير', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'سريع', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'مرن', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_3',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 3,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 2,
    promptAr: 'إكمال الجمل المنطقية: «الابتكار الحقيقي لا يعني مجرد طرح أفكار غريبة، بل تحويل الرؤى الإبداعية إلى حلول _____ ذات قيمة _____».',
    subPromptAr: 'يقيس الترابط السياقي والمنطقي (CogAT Sentence Completion).',
    options: [
      { id: 'a', labelAr: 'قابلة للتطبيق — ملموسة ومستدامة', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'نظرية — خيالية بحتة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'معقدة — غامضة', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'تقليدية — عشوائية', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_4',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 4,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 2,
    promptAr: 'التناظر اللفظي المهني: «الفرضية» بالنسبة لـ «التجربة العلمية» مثل «دراسة الجدوى» بالنسبة لـ:',
    subPromptAr: 'يقيس القياس التناظري في بيئات الأعمال والعلوم.',
    options: [
      { id: 'a', labelAr: 'المشروع الاستثماري', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الربح الصافي', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الميزانية العمومية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'التسويق الإعلاني', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_5',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 5,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 2,
    promptAr: 'فحص التطابق الدقيق (Wonderlic Attention to Detail): قارن بين العبارتين: (أ) «شركة المدار للحلول الرقمية - رقم 48921» و(ب) «شركة المدار للحلول الرقمية - رقم 48291». ما العلاقة بينهما؟',
    subPromptAr: 'يقيس سرعة الانتباه الإدراكي للتفاصيل الدقيقة.',
    options: [
      { id: 'a', labelAr: 'مختلفتان (تبديل في موضع الرقمين 9 و 2)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'متطابقتان تماماً', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'مختلفتان في اسم الشركة', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'مختلفتان في عدد الأرقام', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_6',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 6,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 2,
    promptAr: 'إذا كان «الإنتاج أسرع من التوزيع، والتخزين أبطأ من التوزيع»، فأي العمليات الثلاث هي الأبطأ على الإطلاق؟',
    subPromptAr: 'يقيس الاستدلال الترتيبي اللفظي (Transitive Inference).',
    options: [
      { id: 'a', labelAr: 'التخزين', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'التوزيع', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الإنتاج', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الإنتاج والتوزيع متساويان', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_7',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 7,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 3,
    promptAr: 'تحليل الحجج النقدية: «ارتفعت مبيعات الشركة بنسبة 30% في الشهر الذي تم فيه تغيير شعار الشركة؛ إذن تغيير الشعار هو السبب الوحيد لارتفاع المبيعات». ما الخلل المنطقي في هذا الاستنتاج؟',
    subPromptAr: 'يقيس التفكير النقدي وكشف مغالطة التلازم والسببية (Correlation vs Causation).',
    options: [
      { id: 'a', labelAr: 'إغفال العوامل الأخرى المحتملة (كالموسمية أو العروض التسويقية) وخلط التزامن بالسببية الحصرية', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'نسبة 30% نسبة صغيرة لا يعتد بها', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الاستنتاج سليم منطقياً ولا يوجد فيه أي خلل', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الشعارات البصرية تقلل المبيعات دائماً', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_8',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 8,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 3,
    promptAr: 'الاستنتاج الشرطي: «لا يُمنح الترخيص المهني المتقدم إلا لمن اجتاز الاختبار التحريري وأكمل 100 ساعة تدريب ميداني. المهندس سامر أكمل 120 ساعة تدريب ميداني لكنه لم يحصل على الترخيص بعد». ما الاستنتاج المؤكد؟',
    subPromptAr: 'يقيس الاستدلال الإداري والقانوني المنطقي.',
    options: [
      { id: 'a', labelAr: 'لم يجتز الاختبار التحريري بعد (أو لم تكتمل إجراءات إصداره)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'ساعات تدريبه غير مقبولة لأنها تزيد عن 100 ساعة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'سامر لا يرغب في الحصول على الترخيص', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الاختبار التحريري ألغي هذا العام', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_9',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 9,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 2,
    promptAr: 'أي زوج من الكلمات التالية يحمل علاقة «السبب والنتيجة» بنفس ترتيب «الاحتكاك : الحرارة»؟',
    subPromptAr: 'يقيس دقة اتجاه العلاقة التناظرية.',
    options: [
      { id: 'a', labelAr: 'المثابرة : الإنجاز', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'النتيجة : الامتحان', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'المطر : السحاب', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الكتاب : القراءة', scoreWeight: 0, isCorrect: false },
    ],
  },

  // 2. Quantitative Battery (CogAT Number Analogies, Number Puzzles, Number Series + Wonderlic Math) - 8 Questions
  {
    id: 'cog_10',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 10,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 1,
    promptAr: 'إذا كان سعر 3 دفاتر تقنية هو 45 ديناراً، فكم دفتراً يمكنك شراؤه بمبلغ 180 ديناراً؟',
    subPromptAr: 'حساب التناسب السريع (Wonderlic Quantitative).',
    options: [
      { id: 'a', labelAr: '12 دفتراً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '9 دفاتر', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '15 دفتراً', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '10 دفاتر', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_11',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 11,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 2,
    promptAr: 'التناظر الرقمي (CogAT Number Analogies): [ 4 ⬅ 17 ] ، [ 6 ⬅ 37 ] ، [ 8 ⬅ ؟ ]',
    subPromptAr: 'اكتشف القاعدة الرياضية التي تحول الرقم الأول إلى الرقم الثاني.',
    options: [
      { id: 'a', labelAr: '65', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '64', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '57', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '49', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'القاعدة هي (مربع العدد + 1): 4²+1=17، 6²+1=37، إذن 8²+1=65.',
  },
  {
    id: 'cog_12',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 12,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 2,
    promptAr: 'سلعة قيمتها 200 دينار خضعت لخصم نسبته 20%، ثم خضع السعر الجديد لضريبة مبيعات نسبتها 10%. كم أصبح السعر النهائي للسلعة؟',
    subPromptAr: 'يقيس دقة التعامل مع النسب المئوية المتتالية دون الوقوع في خطأ الجمع المباشر.',
    options: [
      { id: 'a', labelAr: '176 ديناراً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '180 ديناراً', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '170 ديناراً', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '190 ديناراً', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'بعد خصم 20% من 200 يصبح السعر 160 ديناراً، ثم تضاف ضريبة 10% من 160 (وهي 16 ديناراً) ليصبح المجموع 176 ديناراً.',
  },
  {
    id: 'cog_13',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 13,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 2,
    promptAr: 'معادلة الموازنة (CogAT Number Puzzles): إذا كان (★ + ★ + ▲ = 22)، وكان (★ + ▲ = 14)، فما هي قيمة الرمز (▲)؟',
    subPromptAr: 'يقيس الحل الجبري السريع للمجاهيل الرمزية.',
    options: [
      { id: 'a', labelAr: '6', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '8', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '7', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '5', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'بتعويض (★ + ▲ = 14) في المعادلة الأولى نجد أن ★ = 22 - 14 = 8، وبالتالي ▲ = 14 - 8 = 6.',
  },
  {
    id: 'cog_14',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 14,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 2,
    promptAr: 'تطبع طابعة ليزرية 120 صفحة في 4 دقائق. كم صفحة تطبعها في 15 دقيقة إذا استمرت بنفس السرعة؟',
    subPromptAr: 'يقيس معدل الأداء الزمني.',
    options: [
      { id: 'a', labelAr: '450 صفحة', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '360 صفحة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '480 صفحة', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '400 صفحة', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'معدل الطباعة 120 ÷ 4 = 30 صفحة في الدقيقة، وفي 15 دقيقة تطبع 30 × 15 = 450 صفحة.',
  },
  {
    id: 'cog_15',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 15,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 3,
    promptAr: 'متتالية متناوبة مزدوجة: (10 ، 30 ، 13 ، 27 ، 16 ، 24 ، 19 ، ؟). ما هو العدد التالي؟',
    subPromptAr: 'تأمل المتتاليتين المتداخلتين (الفردية والزوجية).',
    options: [
      { id: 'a', labelAr: '21', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '22', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '20', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '23', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'المتتالية الزوجية تنقص بمقدار 3 في كل خطوة: 30 ⬅ 27 ⬅ 24 ⬅ 21.',
  },
  {
    id: 'cog_16',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 16,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 3,
    promptAr: 'متوسط أعمار 4 موظفين في قسم هندسي هو 30 سنة. إذا انضم إليهم موظف خامس عمره 40 سنة، فكم يصبح المتوسط الجديد لأعمار القسم؟',
    subPromptAr: 'يقيس فهم المتوسط الحسابي الموزون.',
    options: [
      { id: 'a', labelAr: '32 سنة', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '35 سنة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '34 سنة', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '31 سنة', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'مجموع أعمار الـ 4 موظفين = 4 × 30 = 120، وبإضافة 40 يصبح المجموع 160، والمتوسط الجديد = 160 ÷ 5 = 32 سنة.',
  },
  {
    id: 'cog_17',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 17,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 3,
    promptAr: 'صنبور ماء الأول يملأ خزاناً بمفرده خلال 3 ساعات، والصنبور الثاني يملأ نفس الخزان بمفرده خلال 6 ساعات. إذا فُتح الصنبوران معاً في وقت واحد، فكم ساعة يستغرق ملء الخزان بالكامل؟',
    subPromptAr: 'مسألة معدلات العمل المشترك الكلاسيكية.',
    options: [
      { id: 'a', labelAr: 'ساعتان فقط', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '4 ساعات ونصف', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'ساعة ونصف', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '3 ساعات', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'معدل الملء المشترك في الساعة الواحدة = (1/3 + 1/6) = 3/6 = 1/2 خزان في الساعة، فيمتلئ الخزان بالكامل في ساعتين.',
  },

  // 3. Non-Verbal / Spatial & Analytical Battery (CogAT Figure Matrices & Classification) - 8 Questions
  {
    id: 'cog_18',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 18,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 1,
    matrixVisualId: 'raven_matrix_2',
    promptAr: 'التناظر الهندسي (CogAT Figure Analogies): «المربع» يتحول إلى «مكعب» كما تتحول «الدائرة» إلى:',
    subPromptAr: 'يقيس الانتقال من الهندسة المستوية (2D) إلى الهندسة الفراغية (3D).',
    options: [
      { id: 'a', labelAr: 'كرة (Sphere)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'أسطوانة مسطحة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'شكل بيضاوي', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'هرم ثلاثي', scoreWeight: 0, isCorrect: false },
    ],
  },
  {
    id: 'cog_19',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 19,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 2,
    promptAr: 'تصنيف الأشكال (Figure Classification): ثلاثة أشكال تشترك في خاصية هندسية واحدة: (المربع • المستطيل • المعين). أي شكل مما يلي ينتمي لنفس المجموعة؟',
    subPromptAr: 'يقيس استخلاص القواسم الهندسية المشتركة (الأضلاع المتوازية).',
    options: [
      { id: 'a', labelAr: 'متوازي الأضلاع', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'المثلث متساوي الساقين', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الدائرة', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'القطاع الدائري', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'المربع والمستطيل والمعين ومتوازي الأضلاع جميعها رباعيات أضلاع كل ضلعين متقابلين فيها متوازيان ومتساويان.',
  },
  {
    id: 'cog_20',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 20,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 2,
    promptAr: 'إذا أدرنا الحرف الإنجليزي (N) بزاوية 90 درجة باتجاه عقارب الساعة، فإنه يبدو مطابقاً للحرف:',
    subPromptAr: 'يقيس التدوير الذهني ثنائي الأبعاد.',
    options: [
      { id: 'a', labelAr: 'الحرف (Z)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الحرف (M)', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الحرف (W)', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الحرف (H)', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'تدوير الخطين العموديين في الحرف N بزاوية 90 درجة يحولهما إلى خطين أفقيين علوي وسفلي مع قطر يصل بينهما أي الحرف Z.',
  },
  {
    id: 'cog_21',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 21,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 2,
    promptAr: 'لغز التروس الميكانيكية: أربعة تروس متشابكة في صف واحد (أ ، ب ، ج ، د). إذا دار الترس الأول (أ) باتجاه عقارب الساعة، فبأي اتجاه يدور الترس الرابع (د)؟',
    subPromptAr: 'يقيس الاستدلال الميكانيكي والفيزيائي.',
    options: [
      { id: 'a', labelAr: 'عكس اتجاه عقارب الساعة', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'مع اتجاه عقارب الساعة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'يتوقف عن الدوران', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'يتناوب في الاتجاهين', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'الترس (أ) يدور مع عقارب الساعة ⬅ (ب) عكس ⬅ (ج) مع ⬅ (د) عكس اتجاه عقارب الساعة.',
  },
  {
    id: 'cog_22',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 22,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 2,
    promptAr: 'كم عدد المربعات الكاملة (بجميع الأحجام 1×1 و 2×2 و 3×3) الموجودة داخل شبكة مربعة مقسمة إلى 3 صفوف و 3 أعمدة؟',
    subPromptAr: 'يقيس الإدراك البصري التركيبي الشامل.',
    options: [
      { id: 'a', labelAr: '14 مربعاً', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '9 مربعات', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '10 مربعات', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '13 مربعاً', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'مجموع المربعات في شبكة 3×3 يساوي: 3² + 2² + 1² = 9 + 4 + 1 = 14 مربعاً.',
  },
  {
    id: 'cog_23',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 23,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 3,
    promptAr: 'في مخطط شبكي، إذا كان فرد المنشور السداسي المنتظم يحتاج إلى قاعدة سداسية علويّة وأخرى سفلية، فكم مستطيلاً جانبياً نحتاج لإغلاق المنشور ثلاثي الأبعاد بالكامل؟',
    subPromptAr: 'يقيس إفراد المجسمات الهندسية (3D Net Folding).',
    options: [
      { id: 'a', labelAr: '6 مستطيلات جانبية', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '8 مستطيلات جانبية', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '4 مستطيلات جانبية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '12 مستطيلاً جانبياً', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'كل ضلع من أضلاع القاعدة السداسية الستة يقابله وجه مستطيل جانبي واحد، فنحتاج إلى 6 مستطيلات جانبية.',
  },
  {
    id: 'cog_24',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 24,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 3,
    promptAr: 'سلسلة الرموز الدورية: (▲ ● ■ ◆ ▲ ● ■ ◆ ▲ ● ...). ما هو الرمز الذي سيقع في الخانة رقم (23) من هذه السلسلة؟',
    subPromptAr: 'يقيس الاستدلال النمطي الدوري (Modular Patterning).',
    options: [
      { id: 'a', labelAr: 'المربع (■)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'المعين (◆)', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الدائرة (●)', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'المثلث (▲)', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'الدورة تتكون من 4 رموز، وبقسمة 23 على 4 يكون الناتج 5 دورات كاملة (20 رمزاً) والباقي 3، والرمز الثالث في الدورة هو المربع (■).',
  },
  {
    id: 'cog_25',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 25,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 3,
    promptAr: 'مكعب نرد قياسي مجموع أي وجهين متقابلين فيه يساوي (7). إذا كان الوجه العلوي هو (2) والوجه الأمامي المقابل لك هو (3)، فما هو مجموع الوجه السفلي والوجه الخلفي معاً؟',
    subPromptAr: 'يقيس الاستدلال الفضائي المقيد.',
    options: [
      { id: 'a', labelAr: '9', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '7', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '8', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '10', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'الوجه السفلي يكمل العلوي (7 - 2 = 5)، والوجه الخلفي يكمل الأمامي (7 - 3 = 4)، ومجموعهما (5 + 4 = 9).',
  },
  {
    id: 'cog_26',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 26,
    domainKey: 'verbal_battery',
    domainTitleAr: 'البطارية اللفظية والاستنتاجية (CogAT Verbal)',
    difficulty: 3,
    promptAr: 'ترتيب منطقي مشروط: في جدول أعمال مؤتمر، يجب أن تُعقد جلسة (الأمن السيبراني) قبل جلسة (الحوسبة السحابية)، وجلسة (البيانات الضخمة) قبل (الأمن السيبراني)، بينما تُعقد جلسة (أخلاقيات الذكاء الاصطناعي) في البداية قبل الجميع. ما هي الجلسة الثالثة في الترتيب؟',
    subPromptAr: 'يقيس الاستدلال التحليلي الترتيبي في بيئات العمل.',
    options: [
      { id: 'a', labelAr: 'جلسة الأمن السيبراني', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'جلسة البيانات الضخمة', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'جلسة الحوسبة السحابية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'جلسة أخلاقيات الذكاء الاصطناعي', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'الترتيب الزمني الحتمي: (1) أخلاقيات الذكاء الاصطناعي ⬅ (2) البيانات الضخمة ⬅ (3) الأمن السيبراني ⬅ (4) الحوسبة السحابية.',
  },
  {
    id: 'cog_27',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 27,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 3,
    promptAr: 'استثمر رائد أعمال مبلغ 10,000 دينار بعائد مركب قدره 10% سنوياً لمدة سنتين متتاليتين (حيث يُضاف ربح السنة الأولى إلى رأس المال في السنة الثانية). كم يصبح إجمالي المبلغ في نهاية السنة الثانية؟',
    subPromptAr: 'يقيس التفرقة الدقيقة بين العائد البسيط والعائد المركب (Wonderlic Financial Math).',
    options: [
      { id: 'a', labelAr: '12,100 دينار', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '12,000 دينار', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '11,100 دينار', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '12,200 دينار', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'في نهاية السنة الأولى يصبح المبلغ 11,000 دينار، وفي السنة الثانية يربح 10% من 11,000 (أي 1,100 دينار) فيصبح الإجمالي 12,100 دينار.',
  },
  {
    id: 'cog_28',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 28,
    domainKey: 'quantitative_battery',
    domainTitleAr: 'البطارية الكمية والرقمية (CogAT Quantitative)',
    difficulty: 3,
    promptAr: 'قطار طوله 150 متراً يسير بسرعة ثابتة مقدارها 30 متراً في الثانية، ويعبر جسراً طوله 450 متراً. كم ثانية يستغرق القطار ليعبر الجسر بالكامل (من لحظة دخول مقدمته حتى خروج آخر عربة منه)؟',
    subPromptAr: 'يقيس الاستدلال الفيزيائي الكمي (حساب المسافة الكلية شاملة طول القطار).',
    options: [
      { id: 'a', labelAr: '20 ثانية', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: '15 ثانية', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: '25 ثانية', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: '18 ثانية', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'المسافة الكلية لخروج آخر عربة = طول الجسر (450م) + طول القطار (150م) = 600 متر. الزمن = 600 ÷ 30 = 20 ثانية.',
  },
  {
    id: 'cog_29',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 29,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 3,
    matrixVisualId: 'raven_matrix_4',
    promptAr: 'طي الورق الهندسي (CogAT Paper Folding): طُويت ورقة مستطيلة من اليمين إلى اليسار (عمودياً)، ثم قُصّ مثلث صغير من منتصف الحافة اليسرى (الحافة المطوية). عند فتح الورقة، ما الشكل الهندسي الذي سيظهر في وسط الورقة؟',
    subPromptAr: 'يقيس التناظر الانعكاسي الناتج عن القص على محور الطي.',
    options: [
      { id: 'a', labelAr: 'معين متناظر (مكون من مثلثين متقابلين بالقاعدة في منتصف الورقة)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'مثلثان منفصلان على الحافتين اليمنى واليسرى', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'دائرة صغيرة في الزاوية العليا', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'مستطيل عمودي على الحافة اليمنى', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'القص على محور الطي نفسه ينعكس حول خط المنتصف، فيلتصق المثلث بصورته المعكوسة من جهة القاعدة ليشكلا معيناً في الوسط.',
  },
  {
    id: 'cog_30',
    batteryId: 'cognitive_aptitude_cogat',
    questionNumber: 30,
    domainKey: 'nonverbal_battery',
    domainTitleAr: 'البطارية غير اللفظية والهندسية (CogAT Non-Verbal)',
    difficulty: 3,
    promptAr: 'مصفوفة الاتجاهات البصرية: إذا دار عقرب البوصلة من اتجاه (الشمال الشرقي) بزاوية 135 درجة باتجاه عقارب الساعة، ثم عاد 45 درجة عكس اتجاه عقارب الساعة، فإلى أي اتجاه يشير العقرب الآن؟',
    subPromptAr: 'يقيس الحساب الزاوي والتوجيه المكاني الدقيق.',
    options: [
      { id: 'a', labelAr: 'الجنوب الشرقي (135 درجة عن الشمال)', scoreWeight: 100, isCorrect: true },
      { id: 'b', labelAr: 'الجنوب الغربي (225 درجة عن الشمال)', scoreWeight: 0, isCorrect: false },
      { id: 'c', labelAr: 'الجنوب تماماً (180 درجة)', scoreWeight: 0, isCorrect: false },
      { id: 'd', labelAr: 'الشرق تماماً (90 درجة)', scoreWeight: 0, isCorrect: false },
    ],
    explanationAr: 'الشمال الشرقي زاويته 45°، نضيف 135° مع عقارب الساعة فتصبح 180° (الجنوب)، ثم نطرح 45° عكس عقارب الساعة فتصبح 135° وهي اتجاه الجنوب الشرقي.',
  },
];

// Likert 5-Scale Options
export const LIKERT_OPTIONS = [
  {
    value: 5,
    labelAr: 'ينطبق عليّ تماماً (موافق بشدة)',
    labelEn: 'Strongly Agree (5)',
    icon: '✨',
    color: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
    dotColor: '#10b981',
  },
  {
    value: 4,
    labelAr: 'ينطبق عليّ غالباً (موافق)',
    labelEn: 'Agree (4)',
    icon: '👍',
    color: 'bg-teal-500/20 border-teal-500/50 text-teal-300',
    dotColor: '#14b8a6',
  },
  {
    value: 3,
    labelAr: 'محايد / أحياناً',
    labelEn: 'Neutral / Sometimes (3)',
    icon: '⚖️',
    color: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
    dotColor: '#f59e0b',
  },
  {
    value: 2,
    labelAr: 'لا ينطبق غالباً (غير موافق)',
    labelEn: 'Disagree (2)',
    icon: '👎',
    color: 'bg-orange-500/20 border-orange-500/50 text-orange-300',
    dotColor: '#f97316',
  },
  {
    value: 1,
    labelAr: 'لا ينطبق عليّ أبداً (غير موافق بشدة)',
    labelEn: 'Strongly Disagree (1)',
    icon: '🚫',
    color: 'bg-rose-500/20 border-rose-500/50 text-rose-300',
    dotColor: '#f43f5e',
  },
];

// -------------------------------------------------------------------------
// Helper: Calculate Comprehensive Multiple Intelligences Results (9 Domains)
// -------------------------------------------------------------------------
export function calculateIntelligenceResults(
  answers: Record<string, number>, // questionId -> 1..5
  ageGroup = '18-29',
  gender: 'male' | 'female' = 'male'
): IntelligenceTestResult {
  const categoryRaw: Record<IntelligenceCategory, number> = {
    linguistic: 0,
    logical: 0,
    spatial: 0,
    kinesthetic: 0,
    musical: 0,
    interpersonal: 0,
    intrapersonal: 0,
    naturalistic: 0,
    existential: 0,
  };

  const subSkillRaw: Record<SubSkillKey, { raw: number; count: number }> = {
    writing_expression: { raw: 0, count: 0 },
    rhetoric_dialogue: { raw: 0, count: 0 },
    verbal_memory: { raw: 0, count: 0 },
    deductive_analysis: { raw: 0, count: 0 },
    critical_thinking: { raw: 0, count: 0 },
    number_management: { raw: 0, count: 0 },
    spatial_visualization: { raw: 0, count: 0 },
    visual_orientation: { raw: 0, count: 0 },
    design_and_arts: { raw: 0, count: 0 },
    motor_coordination: { raw: 0, count: 0 },
    manual_dexterity: { raw: 0, count: 0 },
    kinesthetic_learning: { raw: 0, count: 0 },
    tonal_discrimination: { raw: 0, count: 0 },
    rhythm_perception: { raw: 0, count: 0 },
    musical_appreciation: { raw: 0, count: 0 },
    empathy_communication: { raw: 0, count: 0 },
    leadership_conflict: { raw: 0, count: 0 },
    teamwork_synergy: { raw: 0, count: 0 },
    self_awareness: { raw: 0, count: 0 },
    discipline_motivation: { raw: 0, count: 0 },
    philosophical_reflection: { raw: 0, count: 0 },
    environmental_exploration: { raw: 0, count: 0 },
    natural_patterning: { raw: 0, count: 0 },
    nature_harmony: { raw: 0, count: 0 },
    cosmic_meaning: { raw: 0, count: 0 },
    big_picture_synthesis: { raw: 0, count: 0 },
    ethical_transcendence: { raw: 0, count: 0 },
  };

  let answeredCount = 0;

  INTELLIGENCE_QUESTIONS.forEach((q) => {
    const rawVal = answers[q.id];
    if (typeof rawVal === 'number' && rawVal >= 1 && rawVal <= 5) {
      answeredCount += 1;
      categoryRaw[q.category] += rawVal;
      if (subSkillRaw[q.subSkill]) {
        subSkillRaw[q.subSkill].raw += rawVal;
        subSkillRaw[q.subSkill].count += 1;
      }
    } else {
      // Unanswered questions contribute 1 (minimum Likert value) so scores are never inflated
      categoryRaw[q.category] += 1;
      if (subSkillRaw[q.subSkill]) {
        subSkillRaw[q.subSkill].raw += 1;
        subSkillRaw[q.subSkill].count += 1;
      }
    }
  });

  const categoryScores: IntelligenceTestResult['categoryScores'] = {} as any;
  const categoriesList = Object.keys(INTELLIGENCE_CATEGORIES) as IntelligenceCategory[];

  let totalPercentage = 0;

  categoriesList.forEach((cat) => {
    const raw = categoryRaw[cat]; // 5 .. 25
    const maxScore = 25; // 5 questions * 5 points
    // Exact normalized 0..100% Likert scale: ((raw - minPossible) / (maxPossible - minPossible)) * 100
    const normalizedPct = Math.round(((raw - 5) / (maxScore - 5)) * 100);
    const percentage = Math.min(100, Math.max(0, normalizedPct));
    categoryScores[cat] = { rawScore: raw, maxScore, percentage };
    totalPercentage += percentage;
  });

  const subSkillScores: IntelligenceTestResult['subSkillScores'] = {} as any;
  (Object.keys(subSkillRaw) as SubSkillKey[]).forEach((key) => {
    const item = subSkillRaw[key];
    const count = item.count || 1;
    const minScore = count * 1;
    const maxScore = count * 5;
    const normalizedPct = Math.round(((item.raw - minScore) / Math.max(1, maxScore - minScore)) * 100);
    const percentage = Math.min(100, Math.max(0, normalizedPct));

    let foundTitle: string = key;
    let foundCat: IntelligenceCategory = 'linguistic';
    categoriesList.forEach((cat) => {
      const match = INTELLIGENCE_CATEGORIES[cat].subSkills.find((s) => s.key === key);
      if (match) {
        foundTitle = match.titleAr;
        foundCat = cat;
      }
    });

    subSkillScores[key] = {
      rawScore: item.raw,
      maxScore,
      percentage,
      titleAr: foundTitle,
      category: foundCat,
    };
  });

  const sortedCategories = [...categoriesList].sort(
    (a, b) => categoryScores[b].percentage - categoryScores[a].percentage
  );

  return {
    completedAt: new Date().toISOString(),
    ageGroup,
    gender,
    answeredCount,
    totalQuestions: INTELLIGENCE_QUESTIONS.length,
    categoryScores,
    subSkillScores,
    topThree: sortedCategories.slice(0, 3),
    primaryIntelligence: sortedCategories[0],
    overallAverage: Math.round(totalPercentage / categoriesList.length),
  };
}

// -------------------------------------------------------------------------
// Helper: Calculate Objective Battery Results (Raven IQ, Bar-On/MSCEIT EQ, CogAT)
// -------------------------------------------------------------------------
function rotateQuestionOptions(questions: ObjectiveBatteryQuestion[]): ObjectiveBatteryQuestion[] {
  return questions.map((q) => {
    const len = q.options.length;
    if (len <= 1) return q;
    // Deterministic cyclic shift based on questionNumber so the correct option is evenly distributed across A, B, C, D
    const shift = (q.questionNumber * 3 + (q.difficulty || 1)) % len;
    const rotated = q.options.map((_, idx) => q.options[(idx + shift) % len]);
    return {
      ...q,
      options: rotated,
    };
  });
}

export function getQuestionsForBattery(
  batteryId: 'general_iq_raven_chc' | 'emotional_intelligence_eq' | 'cognitive_aptitude_cogat'
): ObjectiveBatteryQuestion[] {
  if (batteryId === 'general_iq_raven_chc') return rotateQuestionOptions(GENERAL_IQ_RAVEN_QUESTIONS);
  if (batteryId === 'emotional_intelligence_eq') return rotateQuestionOptions(EMOTIONAL_INTELLIGENCE_EQ_QUESTIONS);
  return rotateQuestionOptions(COGNITIVE_APTITUDE_COGAT_QUESTIONS);
}

// Standard Normal CDF approximation (Abramowitz & Stegun) for exact Wechsler IQ percentile calculation
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const prob =
    d *
    t *
    (0.31938153 +
      t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - prob : prob;
}

export function calculateObjectiveBatteryResult(
  batteryId: 'general_iq_raven_chc' | 'emotional_intelligence_eq' | 'cognitive_aptitude_cogat',
  answers: Record<string, string>, // questionId -> optionId
  timeSpentSeconds: number = 600,
  ageGroup: string = '18-29'
): ObjectiveBatteryResult {
  const questions = getQuestionsForBattery(batteryId);
  const meta =
    INTELLIGENCE_BATTERIES_CATALOG.find((b) => b.id === batteryId) ||
    INTELLIGENCE_BATTERIES_CATALOG[1];

  const domainMap: Record<
    string,
    {
      titleAr: string;
      rawWeighted: number;
      maxWeighted: number;
      correctCount: number;
      totalCount: number;
    }
  > = {};

  let totalRaw = 0;
  let totalMax = 0;
  let correctOrHighCount = 0;
  let answeredCount = 0;
  const questionReview: QuestionAuditItem[] = [];

  questions.forEach((q) => {
    const chosenId = answers[q.id];
    const opt = chosenId ? q.options.find((o) => o.id === chosenId) : undefined;
    const bestOpt =
      q.options.find((o) => o.isCorrect) ||
      [...q.options].sort((a, b) => b.scoreWeight - a.scoreWeight)[0];

    if (opt) {
      answeredCount += 1;
    }

    const difficultyMultiplier = q.difficulty === 3 ? 1.35 : q.difficulty === 2 ? 1.15 : 1.0;
    const earned = opt ? opt.scoreWeight * difficultyMultiplier : 0;
    const maxForQ = 100 * difficultyMultiplier;
    const isCorrect = Boolean(opt && (opt.isCorrect || opt.scoreWeight >= 80));

    if (isCorrect) {
      correctOrHighCount += 1;
    }

    totalRaw += earned;
    totalMax += maxForQ;

    if (!domainMap[q.domainKey]) {
      domainMap[q.domainKey] = {
        titleAr: q.domainTitleAr,
        rawWeighted: 0,
        maxWeighted: 0,
        correctCount: 0,
        totalCount: 0,
      };
    }
    domainMap[q.domainKey].rawWeighted += earned;
    domainMap[q.domainKey].maxWeighted += maxForQ;
    domainMap[q.domainKey].totalCount += 1;
    if (isCorrect) {
      domainMap[q.domainKey].correctCount += 1;
    }

    questionReview.push({
      questionNumber: q.questionNumber,
      domainTitleAr: q.domainTitleAr,
      difficulty: q.difficulty,
      promptAr: q.promptAr,
      selectedLabelAr: opt ? opt.labelAr : 'لم تتم الإجابة على هذا السؤال',
      correctLabelAr: bestOpt ? bestOpt.labelAr : '',
      isCorrect,
      scoreEarned: opt ? opt.scoreWeight : 0,
      explanationAr:
        q.explanationAr ||
        `${q.subPromptAr} — الخيار الأدق علمياً هو: «${bestOpt ? bestOpt.labelAr : ''}».`,
    });
  });

  // Exact unweighted accuracy percentage (correct answers / total questions)
  const accuracyPercentage = Math.min(
    100,
    Math.max(0, Math.round((correctOrHighCount / Math.max(1, questions.length)) * 100))
  );

  // Exact difficulty-weighted percentage (0% to 100%, no artificial minimum floor)
  const overallPercentage = Math.min(
    100,
    Math.max(0, Math.round((totalRaw / Math.max(1, totalMax)) * 100))
  );

  // Age norm calibration factor (only applied when at least half the test is answered)
  const ageBonus =
    answeredCount >= questions.length * 0.5
      ? ageGroup === '12-17'
        ? 3
        : ageGroup === '50+'
        ? 2
        : 0
      : 0;

  // Speed bonus for IQ/CogAT only if completed with >=80% accuracy in reasonable realistic time (>= 90s)
  const speedBonus =
    overallPercentage >= 80 &&
    timeSpentSeconds >= 90 &&
    timeSpentSeconds < meta.recommendedMinutes * 60 * 0.75
      ? 2
      : 0;

  // Standard Score on Wechsler/SB5 scale (Mean = 100, SD = 15, calibrated range 70..145)
  // 0% -> 70, 50% -> 100, 75% -> 118, 90% -> 131, 100% -> 142 (+ age/speed bonus up to 145)
  const baseStandard =
    overallPercentage <= 50
      ? 70 + (overallPercentage / 50) * 30
      : 100 + ((overallPercentage - 50) / 50) * 42;

  const standardScore = Math.min(
    145,
    Math.max(70, Math.round(baseStandard + ageBonus + speedBonus))
  );

  // Exact Gaussian CDF percentile rank from z = (standardScore - 100) / 15
  const zScore = (standardScore - 100) / 15;
  const percentileRank = Math.min(99, Math.max(1, Math.round(normalCdf(zScore) * 100)));

  const domainColors = ['#3b82f6', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b'];
  const domainScores: ObjectiveBatteryResult['domainScores'] = Object.keys(domainMap).map(
    (key, idx) => {
      const d = domainMap[key];
      const pct = Math.min(
        100,
        Math.max(0, Math.round((d.rawWeighted / Math.max(1, d.maxWeighted)) * 100))
      );
      const levelAr: ObjectiveBatteryResult['domainScores'][0]['levelAr'] =
        pct >= 85
          ? 'مرتفع جداً'
          : pct >= 70
          ? 'مرتفع'
          : pct >= 50
          ? 'متوسط متوازن'
          : 'قيد التطوير';

      return {
        domainKey: key,
        domainTitleAr: d.titleAr,
        percentage: pct,
        correctCount: d.correctCount,
        totalCount: d.totalCount,
        levelAr,
        color: domainColors[idx % domainColors.length],
        interpretationAr:
          pct >= 80
            ? `أداء متميز في «${d.titleAr}» (${d.correctCount}/${d.totalCount} إجابات صحيحة) يعكس سرعة استيعاب ودقة استنتاجية تفوق المتوسط المعياري.`
            : pct >= 55
            ? `أداء متزن وجيد في «${d.titleAr}» (${d.correctCount}/${d.totalCount} إجابات صحيحة) مع قابلية ممتازة للارتقاء بالتدريب المنتظم.`
            : `يحتاج هذا البعد («${d.titleAr}» — ${d.correctCount}/${d.totalCount}) إلى تمارين تركيز وتدرج منهجي لتعزيز الكفاءة.`,
      };
    }
  );

  domainScores.sort((a, b) => b.percentage - a.percentage);

  let classificationTitleAr = '';
  let classificationDescAr = '';
  let strengthsAr: string[] = [];
  let growthRecommendationsAr: string[] = [];
  let suggestedCareersAr: string[] = [];

  if (batteryId === 'general_iq_raven_chc') {
    if (standardScore >= 130) {
      classificationTitleAr = 'ذكاء متفوق جداً / موهوب استثنائياً (Very Superior - Top 2%)';
      classificationDescAr =
        'قدرة فائقة على التجريد البصري والمنطقي (Spearman’s g)، وسرعة عالية في اكتشاف القواعد الخفية وحل المعضلات متعددة المتغيرات.';
    } else if (standardScore >= 115) {
      classificationTitleAr = 'ذكاء فوق المتوسط / متقدم (High Average to Superior)';
      classificationDescAr =
        'كفاءة ذهنية عالية في ربط العلاقات المنطقية والكمية والمكانية، مع ذاكرة عاملة نشطة ومنظمة.';
    } else if (standardScore >= 90) {
      classificationTitleAr = 'ذكاء عملي متوازن وطبيعي (Balanced Standard Intelligence)';
      classificationDescAr =
        'توازن جيد بين التفكير التحليلي والخبرة المكتسبة، مع قدرة عملية على معالجة المشكلات اليومية بفاعلية.';
    } else {
      classificationTitleAr = 'أداء أولي يحتاج إلى تركيز وتأنٍّ (Developing Cognitive Focus)';
      classificationDescAr =
        'ننصح بإعادة المحاولة في بيئة هادئة مع قراءة القواعد المنطقية لكل مصفوفة بتأنٍّ دون استعجال.';
    }
    strengthsAr = [
      `أعلى أداء تحليلي في «${domainScores[0]?.domainTitleAr}» بنسبة ${domainScores[0]?.percentage}% (${domainScores[0]?.correctCount}/${domainScores[0]?.totalCount})`,
      `دقة الإجابات الصحيحة المباشرة: ${correctOrHighCount} من أصل ${questions.length} سؤالاً (${accuracyPercentage}%)`,
      'قدرة على استنباط الأنماط الهندسية والمنطقية غير اللفظية (Raven Fluid Reasoning)',
    ];
    growthRecommendationsAr = [
      'ممارسة ألغاز مصفوفات رافين المتقدمة والشطرنج لتعزيز السيولة الإدراكية',
      'تدريب الذاكرة العاملة عبر الحساب الذهني العكسي وتلخيص النصوص المركبة',
      'مراجعة جدول تحليل الإجابات بالأسفل لفهم القاعدة العلمية لكل سؤال',
    ];
    suggestedCareersAr = [
      'هندسة النظم والبرمجيات المتقدمة والذكاء الاصطناعي',
      'البحث العلمي والفيزياء والرياضيات التطبيقية',
      'التحليل المالي الاستراتيجي وإدارة المخاطر',
      'الطب التخصصي والتشخيص الإكلينيكي الدقيق',
    ];
  } else if (batteryId === 'emotional_intelligence_eq') {
    if (standardScore >= 125) {
      classificationTitleAr = 'ذكاء عاطفي وانفعالي قيادي متفوق (Master Emotional Intelligence)';
      classificationDescAr =
        'انسجام رفيع بين الوعي الذاتي، التعاطف العميق، ضبط الانفعالات في الأزمات، وفهم التحولات النفسية الدقيقة لدى الآخرين.';
    } else if (standardScore >= 105) {
      classificationTitleAr = 'ذكاء عاطفي ناضج ومتزن (High Emotional Maturity)';
      classificationDescAr =
        'قدرة صحية على قراءة المشاعر وإدارة الضغوط اليومية وبناء علاقات إنسانية دافئة ومستقرة.';
    } else {
      classificationTitleAr = 'ذكاء عاطفي قيد النمو والتطوير (Developing EQ)';
      classificationDescAr =
        'تمتلك أساسيات الوعي العاطفي مع حاجة لتعزيز مهارات التريث وقت الغضب والفصل بين الوقائع والانفعالات.';
    }
    strengthsAr = [
      `أعلى كفاءة وجدانية لديك هي «${domainScores[0]?.domainTitleAr}» بنسبة ${domainScores[0]?.percentage}% (${domainScores[0]?.correctCount}/${domainScores[0]?.totalCount})`,
      'قدرة واعية على إعادة التقييم المعرفي للمواقف الضاغطة بدلاً من الانفجار اللحظي',
      'حساسية عالية لقراءة لغة الجسد ونبرة الصوت غير المنطوقة (MSCEIT Perceiving)',
    ];
    growthRecommendationsAr = [
      'تطبيق قاعدة التوقف لـ 10 ثوانٍ قبل الرد على أي رسالة أو موقف مستفز',
      'ممارسة التسمية الدقيقة للمشاعر (Emotional Labeling) عند الشعور بالضيق',
      'الفصل الواعي بين الحقائق الموضوعية والافتراضات العاطفية (Reality Testing)',
    ];
    suggestedCareersAr = [
      'القيادة التنفيذية وإدارة الفرق والمؤسسات',
      'الإرشاد النفسي والأسري والتدريب القيادي (Executive Coaching)',
      'الدبلوماسية وإدارة التفاوض وحل النزاعات',
      'إدارة الموارد البشرية وتطوير بيئات العمل',
    ];
  } else {
    if (standardScore >= 125) {
      classificationTitleAr = 'كفاءة معرفية ومهنية فائقة (Elite Cognitive Aptitude)';
      classificationDescAr =
        'سرعة بديهة عالية وتكامل بين الاستدلال اللفظي والكمي والمكاني يؤهلك لاتخاذ قرارات معقدة بدقة عالية.';
    } else if (standardScore >= 105) {
      classificationTitleAr = 'كفاءة معرفية ومهنية متقدمة (High Professional Readiness)';
      classificationDescAr =
        'أداء متوازن ومنظم عبر البطاريات الثلاث (اللفظية، الكمية، وغير اللفظية) يعكس جاهزية عالية للمهام القيادية.';
    } else {
      classificationTitleAr = 'كفاءة معرفية تأسيسية متزنة (Solid Foundational Aptitude)';
      classificationDescAr =
        'قدرة جيدة على إنجاز المهام المهنية المنظمة مع إمكانية رفع سرعة البديهة عبر التدريب الموقوت.';
    }
    strengthsAr = [
      `البطارية الأقوى في ملفك هي «${domainScores[0]?.domainTitleAr}» بنسبة ${domainScores[0]?.percentage}% (${domainScores[0]?.correctCount}/${domainScores[0]?.totalCount})`,
      `معدل الدقة المباشرة: ${correctOrHighCount} من أصل ${questions.length} سؤالاً (${accuracyPercentage}%)`,
      'دقة الانتباه للتفاصيل وكشف المغالطات المنطقية في السياقات المهنية',
    ];
    growthRecommendationsAr = [
      'التدرب على حل مسائل الاستدلال الكمي واللفظي تحت مؤقت زمني محدد (Wonderlic Drills)',
      'تطوير مهارات التفكير النقدي وفحص الفرضيات في تقارير العمل',
      'مراجعة جدول تصحيح الإجابات بالأسفل لمعرفة خطوات الحل الرياضي والمنطقي',
    ];
    suggestedCareersAr = [
      'الاستشارات الإدارية والاستراتيجية (Management Consulting)',
      'إدارة المنتجات التقنية وتحليل الأعمال (Product & Business Analysis)',
      'الهندسة الصناعية وإدارة العمليات وسلاسل الإمداد',
      'القانون التجاري والتحكيم المالي',
    ];
  }

  const executiveSummaryAr = `بناءً على التقييم السيكومتري الشامل لـ «${meta.titleAr}» (${meta.scientificScaleName}) والمكون من ${questions.length} سؤالاً معيارياً، أجاب المختبَر إجابة صحيحة/مثالية على (${correctOrHighCount}) من أصل (${questions.length}) سؤالاً بدقة موزونة قدرها (${overallPercentage}%)، مما يعادل درجة معيارية (${standardScore}) على مقياس وكسلر/ستانفورد-بينيه ويضعه في المئين (${percentileRank}%) مقارنة بالعينة المعيارية، مع تفوق بارز في بُعد «${domainScores[0]?.domainTitleAr}» (${domainScores[0]?.percentage}%).`;

  return {
    batteryId,
    batteryTitleAr: meta.titleAr,
    theoristAr: meta.theoristAr,
    completedAt: new Date().toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    timeSpentSeconds,
    totalQuestions: questions.length,
    answeredCount,
    correctOrHighCount,
    accuracyPercentage,
    overallPercentage,
    standardScore,
    percentileRank,
    classificationTitleAr,
    classificationDescAr,
    executiveSummaryAr,
    domainScores,
    questionReview,
    strengthsAr,
    growthRecommendationsAr,
    suggestedCareersAr,
  };
}
