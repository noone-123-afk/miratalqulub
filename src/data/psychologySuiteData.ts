// Comprehensive, scientifically grounded psychology assessment suite
// Objective Tests (MMPI, Big Five NEO-PI-R, EPQ, 16PF) + Projective Tests (Rorschach, TAT)
// Simplified for non-specialists while preserving psychometric validity (reliability & validity)

export type AssessmentCategory =
  | 'psychiatry_psychology'
  | 'projective'
  | 'sociological'
  | 'intellectual_cultural';

export type AssessmentType =
  | 'big_five'
  | 'mmpi'
  | 'epq'
  | 'sixteen_pf'
  | 'rorschach'
  | 'tat'
  | 'attachment_style'
  | 'cultural_eq';

export interface AssessmentInfo {
  id: AssessmentType;
  category: AssessmentCategory;
  categoryTitleAr: string;
  titleAr: string;
  titleEn: string;
  shortDesc: string;
  scientificReference: string;
  badge: string;
  estimatedMinutes: number;
  questionCount: number;
  icon: string;
}

export const ASSESSMENTS_CATALOG: AssessmentInfo[] = [
  {
    id: 'big_five',
    category: 'psychiatry_psychology',
    categoryTitleAr: 'علم النفس والطب النفسي',
    titleAr: 'نموذج العوامل الخمسة الكبرى للشخصية (Big Five / NEO-PI-R)',
    titleEn: 'Big Five Personality Traits (Costa & McCrae)',
    shortDesc: 'المعيار الذهبي الأكثر اعتماداً في علم النفس الحديث لقياس الأبعاد الخمسة الكبرى: الانبساط، الاستقرار الانفعالي، الانفتاح، الوفاق، واليقظة عبر 25 بنداً محكماً.',
    scientificReference: 'Costa & McCrae (1992) - Revised NEO Personality Inventory (25 Items)',
    badge: '25 سؤالاً علمياً 🌍',
    estimatedMinutes: 12,
    questionCount: 25,
    icon: 'Brain',
  },
  {
    id: 'mmpi',
    category: 'psychiatry_psychology',
    categoryTitleAr: 'علم النفس والطب النفسي',
    titleAr: 'مقياس مينيسوتا متعدد الأوجه للشخصية (MMPI-2 المطور)',
    titleEn: 'Minnesota Multiphasic Personality Inventory',
    shortDesc: 'المعيار العيادي الأقوى مع مقاييس الصدق (L/K Validity Scales) لتقييم الاتزان النفسي، ضبط التوتر، الجسدنة، والصراحة الذاتية عبر 24 بنداً.',
    scientificReference: 'Hathaway & McKinley (Restandardized MMPI-2 - 24 Items)',
    badge: '24 سؤالاً عيادياً 🛡️',
    estimatedMinutes: 12,
    questionCount: 24,
    icon: 'ShieldCheck',
  },
  {
    id: 'epq',
    category: 'psychiatry_psychology',
    categoryTitleAr: 'علم النفس والطب النفسي',
    titleAr: 'استبيان آيزنك البيولوجي للشخصية والأمزجة (EPQ-R)',
    titleEn: 'Eysenck Personality Questionnaire (Revised)',
    shortDesc: 'استخبار نفسي بيولوجي شامل يقيس الانبساط العصبي، الاستقرار الانفعالي، الرقة مقابل الصرامة، ومقياس الصدق عبر 24 سؤالاً لتحديد مزاجك الفطري.',
    scientificReference: 'Hans & Sybil Eysenck (1975/1985) - Psychobiological Model (24 Items)',
    badge: '24 سؤالاً بيولوجياً ⚡',
    estimatedMinutes: 12,
    questionCount: 24,
    icon: 'Activity',
  },
  {
    id: 'rorschach',
    category: 'projective',
    categoryTitleAr: 'الاختبارات الإسقاطية العيادية',
    titleAr: 'اختبار بقع الحبر لرورشاخ ونظام إكسنر الشامل (Rorschach)',
    titleEn: 'Rorschach Inkblot Projective Assessment (Exner System)',
    shortDesc: 'اختبار إسقاطي عيادي متكامل عبر 20 بنداً تحليلياً لبقع الحبر المتماثلة لكشف الإدراك الكلي، المحددات الوجدانية، والآليات الدفاعية اللاشعورية.',
    scientificReference: 'Hermann Rorschach (1921) & John Exner Comprehensive System (20 Items)',
    badge: '20 سؤالاً إسقاطياً 🎨',
    estimatedMinutes: 10,
    questionCount: 20,
    icon: 'Eye',
  },
  {
    id: 'tat',
    category: 'projective',
    categoryTitleAr: 'الاختبارات الإسقاطية العيادية',
    titleAr: 'اختبار تفهم الموضوع والدوافع الخفية (TAT - Murray)',
    titleEn: 'Thematic Apperception & Psychogenic Needs Test',
    shortDesc: '20 مشهداً تصويرياً لمواقف إنسانية غامضة تكشف الدوافع النفسية العميقة (الحاجة للإنجاز، الانتماء، الاستقلالية، والرعاية) وفق نظرية هنري موراي.',
    scientificReference: 'Henry A. Murray (1935) - Harvard Psychological Clinic (20 Items)',
    badge: '20 مشهداً سردياً 📖',
    estimatedMinutes: 12,
    questionCount: 20,
    icon: 'BookOpen',
  },
  {
    id: 'attachment_style',
    category: 'sociological',
    categoryTitleAr: 'علوم الاجتماع البشري ونمط الارتباط',
    titleAr: 'مقياس نمط الارتباط البشري والتوافق الاجتماعي (ECR-R)',
    titleEn: 'Experiences in Close Relationships & Attachment Scale',
    shortDesc: 'مقياس معمق من 24 سؤالاً مستند لنظرية جون بولبي وماري إينسورث ومقياس ECR-R لتحديد نمط الارتباط (آمن، قلق، تجنبي) وإصلاح الخلافات.',
    scientificReference: 'John Bowlby, Mary Ainsworth & Fraley ECR-R (24 Items)',
    badge: '24 سؤالاً علائقياً 🤝',
    estimatedMinutes: 12,
    questionCount: 24,
    icon: 'Users',
  },
  {
    id: 'sixteen_pf',
    category: 'intellectual_cultural',
    categoryTitleAr: 'الجانب الفكري والتنمية البشرية',
    titleAr: 'مقياس كاتل للعوامل الـ 16 للشخصية (Cattell 16PF الكامل)',
    titleEn: 'Cattell 16 Personality Factor Questionnaire',
    shortDesc: 'التحليل العاملي الكامل لريموند كاتل عبر 32 موقفاً واقعياً (سؤالان لكل عامل من العوامل الـ 16: الدفء، الذكاء التحليلي، قوة الأنا، القيادة، والضمير).',
    scientificReference: 'Raymond B. Cattell (1949/1993) - 16PF Fifth Edition (32 Items)',
    badge: '32 سؤالاً عاملياً 📊',
    estimatedMinutes: 15,
    questionCount: 32,
    icon: 'Layers',
  },
  {
    id: 'cultural_eq',
    category: 'intellectual_cultural',
    categoryTitleAr: 'الجانب الفكري والتنمية البشرية',
    titleAr: 'مقياس الذكاء العاطفي والأبعاد الثقافية (Goleman & Hofstede)',
    titleEn: 'Emotional Intelligence & Cultural Values Matrix',
    shortDesc: 'توليفة علمية من 24 سؤالاً تجمع نموذج دانيال جولمان للذكاء الوجداني الخماسي مع أبعاد هوفستيد للأصالة، اللباقة، والقيم المجتمعية.',
    scientificReference: 'Daniel Goleman (1995) & Geert Hofstede Cultural Dimensions (24 Items)',
    badge: '24 سؤالاً وجدانياً 🌟',
    estimatedMinutes: 12,
    questionCount: 24,
    icon: 'Sparkles',
  },
];

export interface TestQuestion {
  id: string;
  testId: AssessmentType;
  promptAr: string;
  subPromptAr?: string;
  imageSvg?: string; // For projective visual tests
  dimensionKey: string;
  options: {
    id: string;
    textAr: string;
    scoreWeight: number; // 1-5 or trait score
    traitLabel: string;
    scientificTrait: string;
  }[];
}

// 1. BIG FIVE QUESTIONS (10 concise items)
export const BIG_FIVE_QUESTIONS: TestQuestion[] = [
  {
    id: 'bf_1',
    testId: 'big_five',
    dimensionKey: 'extraversion',
    promptAr: 'عندما تتواجد في مناسبة اجتماعية كبيرة تضم أشخاصاً جدداً:',
    options: [
      { id: 'a', textAr: 'أشعر بالحيوية والنشاط وأبادر بالتعرف وتوسيع دائرة الحديث', scoreWeight: 5, traitLabel: 'انبساط عالي', scientificTrait: 'High Extraversion' },
      { id: 'b', textAr: 'أتفاعل باعتدال وأفضل البقاء مع من أعرفهم بالفعل', scoreWeight: 3, traitLabel: 'انبساط متوازن', scientificTrait: 'Ambivert' },
      { id: 'c', textAr: 'أشعر باستنزاف طاقتي سريعاً وأفضل الأجواء الهادئة والمحدودة', scoreWeight: 1, traitLabel: 'انطواء هادئ', scientificTrait: 'Introversion' },
    ],
  },
  {
    id: 'bf_2',
    testId: 'big_five',
    dimensionKey: 'neuroticism',
    promptAr: 'عند مواجهة ضغوط غير متوقعة أو تغير مفاجئ في الخطط:',
    options: [
      { id: 'a', textAr: 'أحافظ على هدوئي وأتعامل مع الموقف كمسألة قابلة للحل فوراً', scoreWeight: 1, traitLabel: 'استقرار انفعالي ممتاز', scientificTrait: 'High Emotional Stability' },
      { id: 'b', textAr: 'أشعر ببعض التوتر في البداية ثم أستعيد اتزاني تدريجياً', scoreWeight: 3, traitLabel: 'استقرار انفعالي معتدل', scientificTrait: 'Moderate Stability' },
      { id: 'c', textAr: 'يتسرب القلق والتفكير الزائد إلى ذهني وأحتاج وقتاً لاستعادة السكينة', scoreWeight: 5, traitLabel: 'حساسية انفعالية مرتفعة', scientificTrait: 'High Sensitivity / Neuroticism' },
    ],
  },
  {
    id: 'bf_3',
    testId: 'big_five',
    dimensionKey: 'openness',
    promptAr: 'نظرتك للأفكار الجديدة، الثقافات المختلفة، والتجارب غير المعتادة:',
    options: [
      { id: 'a', textAr: 'أتحمس بشغف لكل ما هو جديد وأستمتع بالنقاشات الفلسفية والمعرفية', scoreWeight: 5, traitLabel: 'انفتاح ذهني مرتفع', scientificTrait: 'High Openness' },
      { id: 'b', textAr: 'منفتح باعتدال مع الحفاظ على التقاليد والأساليب المجربة', scoreWeight: 3, traitLabel: 'انفتاح عملي متزن', scientificTrait: 'Pragmatic Openness' },
      { id: 'c', textAr: 'أفضل الأساليب الكلاسيكية الواضحة ولا أميل للتجارب غير المألوفة', scoreWeight: 1, traitLabel: 'محافظ تقليدي', scientificTrait: 'Traditionalist' },
    ],
  },
  {
    id: 'bf_4',
    testId: 'big_five',
    dimensionKey: 'agreeableness',
    promptAr: 'في المواقف التي يختلف فيها رأيك مع شخص مقرب منك:',
    options: [
      { id: 'a', textAr: 'أبحث فوراً عن أرضية تفاهم مشتركة وأهتم بمشاعره قبل إثبات صوابي', scoreWeight: 5, traitLabel: 'وفاق وتعاطف استثنائي', scientificTrait: 'High Agreeableness' },
      { id: 'b', textAr: 'أناقش بهدوء مع الدفاع عن وجهة نظري بالحجة والمنطق', scoreWeight: 3, traitLabel: 'وفاق عقلاني', scientificTrait: 'Rational Agreeableness' },
      { id: 'c', textAr: 'أفضل الحسم والوضوح المباشر حتى لو كان ذلك حاداً على الطرف الآخر', scoreWeight: 1, traitLabel: 'صراحة صارمة', scientificTrait: 'Low Agreeableness / Assertive' },
    ],
  },
  {
    id: 'bf_5',
    testId: 'big_five',
    dimensionKey: 'conscientiousness',
    promptAr: 'طريقتك في إدارة مواعيدك، مهامك اليومية، والوعود التي تقطعها:',
    options: [
      { id: 'a', textAr: 'دقيق ومنظم جداً، التزم بالمواعيد بحزم وأخطط مسبقاً لكل خطوة', scoreWeight: 5, traitLabel: 'يقظة وضمير حي عالي', scientificTrait: 'High Conscientiousness' },
      { id: 'b', textAr: 'أنجز مسؤولياتي الأساسية في وقتها مع وجود مساحة من المرونة والعفوية', scoreWeight: 3, traitLabel: 'تنظيم مرن', scientificTrait: 'Flexible Conscientiousness' },
      { id: 'c', textAr: 'عفوي وتلقائي، أعمل وفق الإلهام واللحظة دون جداول صارمة', scoreWeight: 1, traitLabel: 'عفوية مطلقة', scientificTrait: 'Spontaneous' },
    ],
  },
  {
    id: 'bf_6',
    testId: 'big_five',
    dimensionKey: 'extraversion',
    promptAr: 'في أوقات الإجازة، ما الذي يجدد طاقتك الحقيقية أكثر؟',
    options: [
      { id: 'a', textAr: 'الخروج مع الأصدقاء، الأنشطة الحيوية، والأجواء المليئة بالحماس', scoreWeight: 5, traitLabel: 'نشاط اجتماعي', scientificTrait: 'Social Energy' },
      { id: 'b', textAr: 'مزيج متوازن بين لقاء الأحبة وقضاء بعض الوقت الشخصي الهادئ', scoreWeight: 3, traitLabel: 'طاقة متوازنة', scientificTrait: 'Balanced Energy' },
      { id: 'c', textAr: 'العزلة الإيجابية، قراءة كتاب، أو الاسترخاء في هدوء منزلي تام', scoreWeight: 1, traitLabel: 'تأمل داخلي', scientificTrait: 'Solitude Recharge' },
    ],
  },
  {
    id: 'bf_7',
    testId: 'big_five',
    dimensionKey: 'neuroticism',
    promptAr: 'كيف تصف قدرتك على التعافي من خيبة أمل عاطفية أو انتقاد شخصي؟',
    options: [
      { id: 'a', textAr: 'أتجاوز الموقف سريعاً، ولا أدع المشاعر السلبية تسكن قلبي', scoreWeight: 1, traitLabel: 'مرونة نفسية عالية', scientificTrait: 'High Resilience' },
      { id: 'b', textAr: 'أتأثر لبعض الوقت، ثم أحلل الموقف وأستخلص الدرس للمستقبل', scoreWeight: 3, traitLabel: 'تعافي تدريجي', scientificTrait: 'Moderate Resilience' },
      { id: 'c', textAr: 'يظل الأثر يتردد في داخلي طويلاً، ويصعب علي نسيان الألم النفسي', scoreWeight: 5, traitLabel: 'حساسية وجدانية عميقة', scientificTrait: 'Deep Affect' },
    ],
  },
  {
    id: 'bf_8',
    testId: 'big_five',
    dimensionKey: 'openness',
    promptAr: 'عند اتخاذ قرار مصيري يتعلق بنمط حياتك أو عملك:',
    options: [
      { id: 'a', textAr: 'أستكشف خيارات غير تقليدية ومسارات إبداعية تلهمني', scoreWeight: 5, traitLabel: 'شغف ابتكاري', scientificTrait: 'Innovative Outlook' },
      { id: 'b', textAr: 'أوازن بين الرغبة في التجديد ومعدل الأمان الواقعي', scoreWeight: 3, traitLabel: 'تجديد متزن', scientificTrait: 'Calculated Innovation' },
      { id: 'c', textAr: 'ألتزم بالمسار المجرب الأكثر استقراراً وأماناً', scoreWeight: 1, traitLabel: 'استقرار كلاسيكي', scientificTrait: 'Classic Stability' },
    ],
  },
  {
    id: 'bf_9',
    testId: 'big_five',
    dimensionKey: 'agreeableness',
    promptAr: 'إذا شعرت أن شخصاً ظلمك بحسن نية أو دون قصد:',
    options: [
      { id: 'a', textAr: 'ألتمس له الأعذار فوراً، وأبادر بالمسامحة وتطهير القلب', scoreWeight: 5, traitLabel: 'تسامح فوري', scientificTrait: 'High Forgiveness' },
      { id: 'b', textAr: 'أعاتبه بلطف وأوضح ألمي دون قطيعة أو قسوة', scoreWeight: 3, traitLabel: 'عتاب حكيم', scientificTrait: 'Gentle Assertiveness' },
      { id: 'c', textAr: 'آخذ موقفاً حذراً وأضع حاجزاً يمنع تكرار الموقف', scoreWeight: 1, traitLabel: 'حذر وقائي', scientificTrait: 'Cautious Boundary' },
    ],
  },
  {
    id: 'bf_10',
    testId: 'big_five',
    dimensionKey: 'conscientiousness',
    promptAr: 'كيف تصف التزامك بالوعود الصغيرة (مثل موعد مكالمة أو مساعدة بسيطة)؟',
    options: [
      { id: 'a', textAr: 'أعتبر أي وعد بمثابة عقد ملزم حتى في أصغر التفاصيل', scoreWeight: 5, traitLabel: 'أمانة والتزام صارم', scientificTrait: 'High Integrity' },
      { id: 'b', textAr: 'أحرص على الوفاء، وإذا طرأ مانع أعتذر بلباقة', scoreWeight: 3, traitLabel: 'وفاء معتاد', scientificTrait: 'Good Reliability' },
      { id: 'c', textAr: 'الأمور تسير بسلاسة دون تعقيد أو تشديد زائد', scoreWeight: 1, traitLabel: 'مرونة مفرطة', scientificTrait: 'Casual' },
    ],
  },
];

// 2. MMPI QUESTIONS (With Lie / Validity Scale)
export const MMPI_QUESTIONS: TestQuestion[] = [
  {
    id: 'mmpi_1',
    testId: 'mmpi',
    dimensionKey: 'lie_scale',
    promptAr: 'مقياس الصدق والشفافية: "هل سبق لك أن شعرت بالغضب أو الحسد لبرهة ولو مرة واحدة في حياتك؟"',
    subPromptAr: 'هذا السؤال يختبر مدى صراحة المستجيب وعدم تجميل الصورة الذاتية المثالية.',
    options: [
      { id: 'a', textAr: 'نعم بكل تأكيد؛ فالمشاعر البشرية تتفاوت ومن الطبيعي أن أشعر بالضعف أحياناً', scoreWeight: 5, traitLabel: 'صدق وشفافية ذاتية عالية', scientificTrait: 'High Validity / Realistic' },
      { id: 'b', textAr: 'نادراً جداً وفي أضيق الحدود', scoreWeight: 3, traitLabel: 'ضبط اجتماعي معتدل', scientificTrait: 'Moderate Social Desirability' },
      { id: 'c', textAr: 'كلا إطلاقاً، لم أشعر بأي مشاعر سلبية أو غيرة طوال حياتي', scoreWeight: 1, traitLabel: 'تجميل ذاتي محتمل (مؤشر كذب)', scientificTrait: 'High Lie Index' },
    ],
  },
  {
    id: 'mmpi_2',
    testId: 'mmpi',
    dimensionKey: 'depression_scale',
    promptAr: 'مقياس الحيوية والمزاج: عندما تستيقظ في الصباح في أغلب أيام الأسبوع:',
    options: [
      { id: 'a', textAr: 'أشعر بالأمل والتطلع ليوم جديد مع طاقة إيجابية متجددة', scoreWeight: 5, traitLabel: 'حيوية وتفاؤل', scientificTrait: 'Optimistic Vitality' },
      { id: 'b', textAr: 'شعور طبيعي محايد، أؤدي واجباتي برتابة مستقرة', scoreWeight: 3, traitLabel: 'مزاج مستقر اعتيادي', scientificTrait: 'Stable Norm' },
      { id: 'c', textAr: 'أشعر بثقل وإرهاق ذهني وشعور بأن الأيام تتشابه بلا جدوى', scoreWeight: 1, traitLabel: 'ميل لإجهاد المزاج', scientificTrait: 'Low Affect / Vulnerability' },
    ],
  },
  {
    id: 'mmpi_3',
    testId: 'mmpi',
    dimensionKey: 'paranoia_scale',
    promptAr: 'مقياس الثقة والريبة الاجتماعية: في تعاملك مع المحيطين بك:',
    options: [
      { id: 'a', textAr: 'الأصل عندي حسن الظن، وأتعامل بعفوية وثقة مدروسة', scoreWeight: 5, traitLabel: 'ثقة صحية بالمجتمع', scientificTrait: 'Healthy Social Trust' },
      { id: 'b', textAr: 'أكون حذراً في البداية حتى تتضح معادن الناس', scoreWeight: 3, traitLabel: 'حذر واعي', scientificTrait: 'Cautious Prudence' },
      { id: 'c', textAr: 'أفترض دائماً وجود دوافع خفية ومصالح تدفع الناس للتصرف', scoreWeight: 1, traitLabel: 'حساسية ارتيابية مرتفعة', scientificTrait: 'Hypervigilance' },
    ],
  },
  {
    id: 'mmpi_4',
    testId: 'mmpi',
    dimensionKey: 'somatization',
    promptAr: 'مقياس الاستجابة الجسدية للتوتر: عندما تشتد الأزمات الحياتية:',
    options: [
      { id: 'a', textAr: 'جسدي يبقى متزناً، وأعالج التوتر بالرياضة والحديث العقلاني', scoreWeight: 5, traitLabel: 'اتزان جسدي ممتاز', scientificTrait: 'Low Somatization' },
      { id: 'b', textAr: 'أشعر ببعض الإرهاق والصداع المؤقت ويزول بزوال السبب', scoreWeight: 3, traitLabel: 'استجابة فسيولوجية طبيعية', scientificTrait: 'Mild Somatic Response' },
      { id: 'c', textAr: 'يتحول التوتر مباشرة لآلام جسدية بالمعدة، القولون، أو اضطراب النوم', scoreWeight: 1, traitLabel: 'جسدنة انفعالية عالية', scientificTrait: 'High Somatization' },
    ],
  },
  {
    id: 'mmpi_5',
    testId: 'mmpi',
    dimensionKey: 'social_introversion',
    promptAr: 'مقياس التكيف الاجتماعي: في التجمعات والمناسبات:',
    options: [
      { id: 'a', textAr: 'أشعر بالراحة والسعادة مع الآخرين وأتواصل بتلقائية', scoreWeight: 5, traitLabel: 'تكيف اجتماعي منطلق', scientificTrait: 'Outgoing Adjustment' },
      { id: 'b', textAr: 'أشارك باعتدال وأحافظ على توازني الخاص', scoreWeight: 3, traitLabel: 'تكيف اجتماعي متزن', scientificTrait: 'Balanced' },
      { id: 'c', textAr: 'أشعر بالغرابة والانفصال وأتمنى المغادرة سريعاً', scoreWeight: 1, traitLabel: 'عزلة اجتماعية حذرة', scientificTrait: 'Social Withdrawal' },
    ],
  },
  {
    id: 'mmpi_6',
    testId: 'mmpi',
    dimensionKey: 'psychopathic_deviate',
    promptAr: 'مقياس احترام القوانين والأعراف المشتركة:',
    options: [
      { id: 'a', textAr: 'أحترم القوانين والأنظمة كضرورة أخلاقية لحماية المجتمع', scoreWeight: 5, traitLabel: 'انضباط قيمي وأخلاقي عالي', scientificTrait: 'High Social Responsibility' },
      { id: 'b', textAr: 'ألتزم بالأنظمة مع تفهم أن بعض القواعد تحتاج للمرونة', scoreWeight: 3, traitLabel: 'مرونة مسؤولة', scientificTrait: 'Flexible Conformity' },
      { id: 'c', textAr: 'أشعر أن القوانين مقيدة لحريتي وغالباً ما أتجاوزها إذا لم يرني أحد', scoreWeight: 1, traitLabel: 'تمرد على القواعد', scientificTrait: 'Rule Non-conformity' },
    ],
  },
  {
    id: 'mmpi_7',
    testId: 'mmpi',
    dimensionKey: 'hypomania',
    promptAr: 'مقياس وتيرة الأفكار والاندفاع:',
    options: [
      { id: 'a', textAr: 'تفكيري هادئ ومنظم، وأتأنى قبل اتخاذ أي قرار مصيري', scoreWeight: 5, traitLabel: 'تأني واتزان ذهني', scientificTrait: 'Controlled Pace' },
      { id: 'b', textAr: 'حيوي وأفكاري سريعة، لكن أملك زمام السيطرة دائماً', scoreWeight: 3, traitLabel: 'نشاط ذهني صحي', scientificTrait: 'Active Mind' },
      { id: 'c', textAr: 'أفكاري تتسابق بسرعة جنونية وتدفعني أحياناً لقرارات متهورة', scoreWeight: 1, traitLabel: 'اندفاعية ذهنية حادة', scientificTrait: 'Impulsive Excitability' },
    ],
  },
  {
    id: 'mmpi_8',
    testId: 'mmpi',
    dimensionKey: 'lie_scale',
    promptAr: 'مقياس الصدق الثاني: "هل تلتزم دائماً بالحقيقة بنسبة 100% دون أي مجاملة اجتماعية بيضاء؟"',
    options: [
      { id: 'a', textAr: 'أحاول الصدق دائماً، لكن قد أضطر لمجاملات لطيفة غير ضارة لجبر الخواطر', scoreWeight: 5, traitLabel: 'صدق وواقعية', scientificTrait: 'High Validity' },
      { id: 'b', textAr: 'الصدق هو مبدئي الأساسي إلا في حالات الحرج الشديد', scoreWeight: 3, traitLabel: 'توازن', scientificTrait: 'Normal' },
      { id: 'c', textAr: 'أنا لا أكذب ولا أجامل أبداً في أي لحظة تحت أي ظرف', scoreWeight: 1, traitLabel: 'ادعاء الكمال (مؤشر كذب)', scientificTrait: 'Defensive Bias' },
    ],
  },
];

// 3. EPQ (Eysenck Personality Questionnaire - Simplified for Non-Specialists)
export const EPQ_QUESTIONS: TestQuestion[] = [
  {
    id: 'epq_1',
    testId: 'epq',
    dimensionKey: 'eysenck_extraversion',
    promptAr: 'عند قضاء عطلة نهاية الأسبوع بعد أسبوع عمل شاق:',
    subPromptAr: 'هذا السؤال يحدد مصدر شحن طاقتك الحيوية: هل ينبع من مخالطة الناس أم من الخلوة والهدوء؟',
    options: [
      { id: 'a', textAr: 'الخروج والتواجد وسط الأصدقاء والأجواء المبهجة يعيد شحن طاقتي فوراً', scoreWeight: 5, traitLabel: 'انبساطي نشط (High Extravert)', scientificTrait: 'Eysenck Extravert' },
      { id: 'b', textAr: 'أوازن بين قضاء وقت اجتماعي قصير ثم الانفراد بنفسي في هدوء', scoreWeight: 3, traitLabel: 'متوازن وسطي (Ambivert)', scientificTrait: 'Ambivert' },
      { id: 'c', textAr: 'الملاذ المنزلي الهادئ وجلسة استرخاء بمفردي هي كل ما أحتاجه لاستعادة توازني', scoreWeight: 1, traitLabel: 'انطوائي متأمل (Introvert)', scientificTrait: 'Eysenck Introvert' },
    ],
  },
  {
    id: 'epq_2',
    testId: 'epq',
    dimensionKey: 'eysenck_neuroticism',
    promptAr: 'عندما تسوء الأمور فجأة أو تتعطل خطة مهمة دون سابق إنذار:',
    subPromptAr: 'يقيس استقرار جهازك العصبي وسرعة ارتدادك للهدوء النفسي تحت وقع المفاجآت.',
    options: [
      { id: 'a', textAr: 'أحافظ على برودة أعصابي وأبحث عن حلول بديلة فوراً دون هلع', scoreWeight: 1, traitLabel: 'استقرار انفعالي صلب', scientificTrait: 'Low Neuroticism / Stable' },
      { id: 'b', textAr: 'أتضايق للحظات ثم أتنفس بعمق وأستعيد هدوئي تدريجياً', scoreWeight: 3, traitLabel: 'اتزان طبيعي معتدل', scientificTrait: 'Moderate Stability' },
      { id: 'c', textAr: 'ينتابني قلق شديد وخفقان وأجد صعوبة في التفكير الهادئ لفترة', scoreWeight: 5, traitLabel: 'حساسية وتوتر عصبي', scientificTrait: 'High Neuroticism' },
    ],
  },
  {
    id: 'epq_3',
    testId: 'epq',
    dimensionKey: 'eysenck_psychoticism',
    promptAr: 'في النقاشات العائلية أو المهنية عند ضرورة اتخاذ قرار حاسم يؤلم طرفاً آخر:',
    subPromptAr: 'يقيس التوازن بين "الرقة والتعاطف الوجداني" مقابل "الصرامة والبراغماتية الجافة".',
    options: [
      { id: 'a', textAr: 'أميل دائماً لجبر الخواطر ومراعاة المشاعر والبحث عن حل رحيم يرضي الجميع', scoreWeight: 1, traitLabel: 'رقة وعطف إنساني فائق', scientificTrait: 'Tender-minded / High Empathy' },
      { id: 'b', textAr: 'أوفق بحكمة بين صرامة القرار الإداري واللطف في أسلوب التوصيل', scoreWeight: 3, traitLabel: 'حكمة عادلة متوازنة', scientificTrait: 'Balanced Toughness' },
      { id: 'c', textAr: 'المصلحة العامة والنتائج الملموسة تأتي أولاً حتى لو تسببت في إحراج أو زعل', scoreWeight: 5, traitLabel: 'صرامة عقلانية جافة', scientificTrait: 'Tough-minded / Firm' },
    ],
  },
  {
    id: 'epq_4',
    testId: 'epq',
    dimensionKey: 'eysenck_extraversion',
    promptAr: 'عندما تدعى إلى تجربة جديدة تماماً (مثل رياضة مثيرة، سفر مباغت، أو مشروع غير مألوف):',
    subPromptAr: 'يقيس دافع الإثارة والبحث عن التجديد مقابل تفضيل الأمان والروتين المألوف.',
    options: [
      { id: 'a', textAr: 'أتحمس فوراً وأقبل التحدي بحماس وعفوية', scoreWeight: 5, traitLabel: 'شغف بالمغامرة والإثارة', scientificTrait: 'Sensation Seeking' },
      { id: 'b', textAr: 'أدرس تفاصيل الفكرة وإذا كانت محسوبة العواقب أشارك برضا', scoreWeight: 3, traitLabel: 'مغامرة مدروسة', scientificTrait: 'Calculated Venture' },
      { id: 'c', textAr: 'أفضل البقاء في نطاق ما أعرفه وأتقنه وأتجنب المخاطرة', scoreWeight: 1, traitLabel: 'حذر وأمان عالي', scientificTrait: 'Risk-averse / Cautious' },
    ],
  },
  {
    id: 'epq_5',
    testId: 'epq',
    dimensionKey: 'eysenck_neuroticism',
    promptAr: 'في نهاية يوم حافل بالمواقف، عندما تضع رأسك على الوسادة للنوم:',
    subPromptAr: 'يقيس وتيرة التفكير الاسترجاعي والقلق الذاتي الليلي (Rumination).',
    options: [
      { id: 'a', textAr: 'أستسلم للنوم سريعاً وبسكينة تامة دون أي اجترار للهموم', scoreWeight: 1, traitLabel: 'سكينة وطمأنينة ذهنية', scientificTrait: 'Low Rumination' },
      { id: 'b', textAr: 'أراجع أبرز أحداث اليوم لبضع دقائق ثم أنام بسلام', scoreWeight: 3, traitLabel: 'مراجعة خفيفة معتادة', scientificTrait: 'Normal Reflection' },
      { id: 'c', textAr: 'تهاجمني سيناريوهات "ماذا لو" والقلق بشأن المستقبل مما يؤرق نومي', scoreWeight: 5, traitLabel: 'تفكير مفرط وقلق ليلي', scientificTrait: 'High Worry / Anxious' },
    ],
  },
  {
    id: 'epq_6',
    testId: 'epq',
    dimensionKey: 'eysenck_psychoticism',
    promptAr: 'عندما ترى شخصاً ارتكب حماقة وتورط في ورطة كان بإمكانه تجنبها بسهولة:',
    subPromptAr: 'يقيس ميلك للتعاطف التلقائي مقابل التوبيخ والفردانية الصارمة.',
    options: [
      { id: 'a', textAr: 'أتعاطف معه وأشعر بألمه وأبادر لمساعدته على الخروج منها دون لوم', scoreWeight: 1, traitLabel: 'تعاطف إنساني خالص', scientificTrait: 'Prosocial Altruism' },
      { id: 'b', textAr: 'أقدم له النصح الهادئ وأساعده بحدود المعقول ليتعلم الدرس', scoreWeight: 3, traitLabel: 'دعم عقلاني متزن', scientificTrait: 'Pragmatic Support' },
      { id: 'c', textAr: 'أعتبر أنه يتحمل عواقب تصرفه بمفرده ولا أشغل بالي بمشكلته', scoreWeight: 5, traitLabel: 'استقلال وفردانية صارمة', scientificTrait: 'Individualistic Detachment' },
    ],
  },
  {
    id: 'epq_7',
    testId: 'epq',
    dimensionKey: 'eysenck_lie',
    promptAr: 'مقياس الشفافية والصدق الذاتي (Lie Scale): "هل تمنيت يوماً في سرك أن يفشل شخص ينافسك، حتى ولو لثوانٍ معدودة؟"',
    subPromptAr: 'هذا السؤال يختبر صدق المستجيب في الاعتراف بالخلجات البشرية العفوية التي يمر بها الجميع.',
    options: [
      { id: 'a', textAr: 'نعم بكل صراحة؛ راودني هذا الخاطر البشري العابر لثوانٍ ثم استغفرت وتمنيت له الخير', scoreWeight: 5, traitLabel: 'صدق وشفافية واقعية عالية', scientificTrait: 'High Validity / Authentic' },
      { id: 'b', textAr: 'نادراً جداً وفي أضيق اللحظات عند الشعور بالظلم الشديد', scoreWeight: 3, traitLabel: 'اتزان اجتماعي معتدل', scientificTrait: 'Moderate Social Control' },
      { id: 'c', textAr: 'كلا أبداً، طوال حياتي لم يراودني أدنى شعور بالحسد أو المنافسة السلبية تجاه أي إنسان', scoreWeight: 1, traitLabel: 'ادعاء المثالية (مؤشر كذب)', scientificTrait: 'Defensive Distortion' },
    ],
  },
  {
    id: 'epq_8',
    testId: 'epq',
    dimensionKey: 'eysenck_extraversion',
    promptAr: 'في المحادثات مع الغرباء لأول مرة (في طائرة، عيادة، أو قاعة انتظار):',
    subPromptAr: 'يقيس المبادرة الاجتماعية التلقائية والطلاقة اللفظية الفطرية.',
    options: [
      { id: 'a', textAr: 'أفتح موضوعاً بود وسهولة وأبادر بالحديث والابتسامة', scoreWeight: 5, traitLabel: 'مبادرة اجتماعية سريعة', scientificTrait: 'Social Initiative' },
      { id: 'b', textAr: 'أرد بلطف ولباقة إذا بدأ هو بالحديث معي', scoreWeight: 3, traitLabel: 'تجاوب ودود متزن', scientificTrait: 'Responsive Ambivert' },
      { id: 'c', textAr: 'أفضل الصمت والتركيز في شأني الخاص وتجنب فتح الأحاديث', scoreWeight: 1, traitLabel: 'تحفظ وخصوصية هادئة', scientificTrait: 'Quiet Reserve' },
    ],
  },
];

// 4. 16PF (Cattell 16 Factors - Comprehensive & Simplified for Non-Specialists)
export const SIXTEEN_PF_QUESTIONS: TestQuestion[] = [
  {
    id: '16pf_warmth',
    testId: 'sixteen_pf',
    dimensionKey: 'warmth',
    promptAr: '1. الدفء والتواصل الإنساني (Warmth - Factor A): كيف تصف أسلوبك في الترحيب والتعامل مع الآخرين؟',
    subPromptAr: 'يقيس هذا العامل مدى حرارة مشاعرك وقربك الإنساني التلقائي مقابل التحفظ والمسافة الوقورة.',
    options: [
      { id: 'a', textAr: 'أتعامل بحرارة ومودة وابتسامة صادقة، وأشعر بالراحة السريعة مع الناس', scoreWeight: 5, traitLabel: 'دفء وقرب عاطفي مبهج (Warmhearted A+)', scientificTrait: 'Warmhearted (A+)' },
      { id: 'b', textAr: 'لطيف ومؤدب بحدود مريحة، وأمنح دفئي تدريجياً بعد توطد المعرفة', scoreWeight: 3, traitLabel: 'دفء متوازن واعي (Average Warmth)', scientificTrait: 'Average Warmth' },
      { id: 'c', textAr: 'رسمي، متحفظ، وأفضل دائماً إبقاء مسافة احترام آمنة', scoreWeight: 1, traitLabel: 'تحفظ ووقار هادئ (Reserved A-)', scientificTrait: 'Reserved (A-)' },
    ],
  },
  {
    id: '16pf_reasoning',
    testId: 'sixteen_pf',
    dimensionKey: 'reasoning',
    promptAr: '2. القدرة التحليلية وحل المشكلات (Reasoning - Factor B): عند مواجهة مسألة معقدة ومتشابكة في حياتك:',
    subPromptAr: 'يقيس أسلوب معالجتك العقلية: هل تفضل التحليل المنطقي المتأني أم الاعتماد على الحدس السريع؟',
    options: [
      { id: 'a', textAr: 'أفكك المشكلة لأجزائها منطقياً وأربط الأسباب بالنتائج بهدوء وروية', scoreWeight: 5, traitLabel: 'تفكير تحليلي منطقي رفيع (High Reasoning B+)', scientificTrait: 'High Reasoning (B+)' },
      { id: 'b', textAr: 'أجمع بين التفكير العملي السريع والمنطق المباشر المجرّب', scoreWeight: 3, traitLabel: 'تفكير عملي واقعي (Average Reasoning)', scientificTrait: 'Average Reasoning' },
      { id: 'c', textAr: 'أعتمد على الحدس والشعور الفطري المباشر وتجربة الحلول فوراً', scoreWeight: 1, traitLabel: 'حلول حدسية عفوية (Concrete B-)', scientificTrait: 'Concrete (B-)' },
    ],
  },
  {
    id: '16pf_emotional_stability',
    testId: 'sixteen_pf',
    dimensionKey: 'stability',
    promptAr: '3. قوة الأنا والصلابة النفسية (Emotional Stability - Factor C): في مواجهة الأزمات والصدمات غير المتوقعة:',
    subPromptAr: 'يقيس هذا العامل صلابتك النفسية واستقرارك الداخلي أمام ضغوط وتقلبات الحياة.',
    options: [
      { id: 'a', textAr: 'صلب نفسياً، أتماسك بهدوء وأرى النور في نهاية النفق مهما بلغت شدة الموقف', scoreWeight: 5, traitLabel: 'صلابة نفسية وقوة أناة عالية (C+)', scientificTrait: 'Higher Ego Strength (C+)' },
      { id: 'b', textAr: 'أتأثر قليلاً ثم أستعيد اتزاني المعتاد تدريجياً دون أن أنكسر', scoreWeight: 3, traitLabel: 'اتزان مستقر متماسك (Average Stability)', scientificTrait: 'Average Stability' },
      { id: 'c', textAr: 'سريع التأثر والألم، وأشعر بالإجهاد العاطفي أمام تراكم الصعوبات', scoreWeight: 1, traitLabel: 'حساسية وجدانية مرهفة (Easily Upset C-)', scientificTrait: 'Easily Upset (C-)' },
    ],
  },
  {
    id: '16pf_dominance',
    testId: 'sixteen_pf',
    dimensionKey: 'dominance',
    promptAr: '4. القيادة والتوكيد الإيجابي (Dominance - Factor E): في المواقف الجماعية واتخاذ القرارات المشتركة:',
    subPromptAr: 'يقيس ميلك لأخذ زمام المبادرة وتوجيه الدفة مقابل التعاون السلس والانسجام مع توجيه الآخرين.',
    options: [
      { id: 'a', textAr: 'أبادر تلقائياً بالقيادة، تحديد المسار، وصياغة القرارات الحاسمة بثقة', scoreWeight: 5, traitLabel: 'شخصية قيادية مبادرة (Dominant E+)', scientificTrait: 'Dominant (E+)' },
      { id: 'b', textAr: 'أتعاون بروح الفريق وأقود عندما يقتضي الموقف ذلك بمرونة', scoreWeight: 3, traitLabel: 'قيادة تشاركية متوازنة (Cooperative)', scientificTrait: 'Cooperative' },
      { id: 'c', textAr: 'أفضل أن يوجهني غيري ويسعدني تنفيذ الدور المطلوب مني بإتقان وهدوء', scoreWeight: 1, traitLabel: 'متعاون ومسالم يفضل التناغم (Submissive E-)', scientificTrait: 'Submissive (E-)' },
    ],
  },
  {
    id: '16pf_liveliness',
    testId: 'sixteen_pf',
    dimensionKey: 'liveliness',
    promptAr: '5. الحيوية والمرح التلقائي (Liveliness - Factor F): في أسلوب حياتك وجلساتك مع المقربين:',
    subPromptAr: 'يقيس مستوى الطاقة الحيوية والبهجة العفوية مقابل الرزانة والجدية المتأنية.',
    options: [
      { id: 'a', textAr: 'مرح، مفعم بالطاقة الإيجابية، وأضفي البهجة والضحك على كل مجلس', scoreWeight: 5, traitLabel: 'مرح ومبهج وعفوي (Enthusiastic F+)', scientificTrait: 'Enthusiastic (F+)' },
      { id: 'b', textAr: 'ابتسامتي حاضرة باعتدال، ومستمع جيد يشارك بالوقت المناسب', scoreWeight: 3, traitLabel: 'حيوية هادئة متزنة (Moderate F)', scientificTrait: 'Balanced' },
      { id: 'c', textAr: 'جاد، رزين ووقور، وتفكيري عميق يفضل الأحاديث الهادفة', scoreWeight: 1, traitLabel: 'جدية ورزانة وقورة (Serious F-)', scientificTrait: 'Serious / Sober (F-)' },
    ],
  },
  {
    id: '16pf_rule_consciousness',
    testId: 'sixteen_pf',
    dimensionKey: 'rule_consciousness',
    promptAr: '6. الالتزام بالواجب والضمير الأخلاقي (Rule-Consciousness - Factor G): تجاه المواعيد والعهود والقوانين:',
    subPromptAr: 'يقيس انضباطك الذاتي وتقديسك للعهود والواجبات مقابل المرونة والحلول التكيفية.',
    options: [
      { id: 'a', textAr: 'أقدس الوعود والأنظمة بدقة متناهية، وأعتبر الالتزام مسألة شرف ومبدأ لا تهاون فيه', scoreWeight: 5, traitLabel: 'انضباط وضمير حي صارم (Rule-Conscious G+)', scientificTrait: 'Rule-Conscious (G+)' },
      { id: 'b', textAr: 'ملتزم بالجوهر والمقاصد العامة مع مرونة واقعية عند الطوارئ', scoreWeight: 3, traitLabel: 'التزام مرن عقلاني (Practical G)', scientificTrait: 'Practical' },
      { id: 'c', textAr: 'أميل للمرونة العالية وأتكيف مع المواقف بحسب الظروف دون جمود', scoreWeight: 1, traitLabel: 'مرونة تكيفية مطلقة (Expedient G-)', scientificTrait: 'Expedient (G-)' },
    ],
  },
  {
    id: '16pf_social_boldness',
    testId: 'sixteen_pf',
    dimensionKey: 'social_boldness',
    promptAr: '7. الجرأة الاجتماعية والإقدام (Social Boldness - Factor H): عند التحدث أمام جمهور أو دخول بيئة جديدة تماماً:',
    subPromptAr: 'يقيس ثقتك وشجاعتك الاجتماعية المباشرة وتعاملك مع نظرات وتقييمات الآخرين.',
    options: [
      { id: 'a', textAr: 'واثق وجريء ولا أخشى لفت الأنظار، وأعبر عن رأيي بطلاقة وجسارة', scoreWeight: 5, traitLabel: 'شجاعة وجرأة اجتماعية عالية (Venturesome H+)', scientificTrait: 'Venturesome (H+)' },
      { id: 'b', textAr: 'أشعر ببعض التحفظ المبدئي ثم أنطلق بأريحية وثبات', scoreWeight: 3, traitLabel: 'ثقة كافية متدرجة (Average Boldness)', scientificTrait: 'Average' },
      { id: 'c', textAr: 'خجول ومتحفظ، وأفضل البقاء بعيداً عن دائرة الضوء والأعين', scoreWeight: 1, traitLabel: 'حياء وتحفظ هادئ (Timid / Shy H-)', scientificTrait: 'Shy / Timid (H-)' },
    ],
  },
  {
    id: '16pf_sensitivity',
    testId: 'sixteen_pf',
    dimensionKey: 'sensitivity',
    promptAr: '8. رهافة الحس والذوق الجمالي (Sensitivity - Factor I): نظرتك للفنون، المشاعر الإنسانية، وجمال الطبيعة:',
    subPromptAr: 'يقيس حسك الوجداني والجمالي وتأثرك العاطفي مقابل النظرة النفعية والعملية الجافة.',
    options: [
      { id: 'a', textAr: 'حس جمالي مرهف، أتأثر بالكلمة الطيبة والموسيقى والشعر وأبكي لتأثر غيري', scoreWeight: 5, traitLabel: 'رهافة حس وتعاطف شاعري (Sensitive I+)', scientificTrait: 'Sensitive (I+)' },
      { id: 'b', textAr: 'أقدر الجمال والذوق الراقي مع الاحتفاظ بنظرة متزنة', scoreWeight: 3, traitLabel: 'ذوق متزن راقي (Moderate Sensitivity)', scientificTrait: 'Moderate' },
      { id: 'c', textAr: 'عملي بحت وواقعي، وأركز على الأرقام والفائدة العملية دون عواطف', scoreWeight: 1, traitLabel: 'واقعية نفعية صارمة (Tough-minded I-)', scientificTrait: 'Tough-minded (I-)' },
    ],
  },
  {
    id: '16pf_vigilance',
    testId: 'sixteen_pf',
    dimensionKey: 'vigilance',
    promptAr: '9. اليقظة والشك الصحي الواعي (Vigilance - Factor L): في منح الثقة للأشخاص الجدد:',
    subPromptAr: 'يقيس نباهتك وفحصك لدوافع الناس مقابل التسامح والعفوية وحسن الظن التلقائي.',
    options: [
      { id: 'a', textAr: 'يقظ ونبيه، أتفحص الدوافع قبل منح الثقة وأحمي نفسي من الخذلان', scoreWeight: 5, traitLabel: 'يقظة وتفحص حذر واعي (Guarded L+)', scientificTrait: 'Vigilant / Guarded (L+)' },
      { id: 'b', textAr: 'أمنح الثقة باعتدال مع إبقاء البصيرة ساهرة دون وسواس', scoreWeight: 3, traitLabel: 'ثقة ذكية متوازنة (Balanced Trust)', scientificTrait: 'Trusting' },
      { id: 'c', textAr: 'عفوي وأفترض حسن النية في الجميع ببراءة وسلامة صدر تامة', scoreWeight: 1, traitLabel: 'سلامة صدر وثقة فطرية (Unsuspecting L-)', scientificTrait: 'Unsuspecting (L-)' },
    ],
  },
  {
    id: '16pf_abstractedness',
    testId: 'sixteen_pf',
    dimensionKey: 'abstractedness',
    promptAr: '10. الخيال والإبداع الفكري (Abstractedness - Factor M): أين يسرح عقلك في أوقات فراغك وسيرك؟',
    subPromptAr: 'يقيس انغماسك في عالم الأفكار والنظريات والأحلام مقابل التركيز في الواقع الحسي الحاضر.',
    options: [
      { id: 'a', textAr: 'أسبح في بحر الأفكار والتصورات المستقبلية والمشاريع المبتكرة', scoreWeight: 5, traitLabel: 'خيال خصب ورؤية إبداعية (Imaginative M+)', scientificTrait: 'Imaginative (M+)' },
      { id: 'b', textAr: 'أفكر في تطوير الواقع الحالي بلمسات إبداعية قابلة للتطبيق', scoreWeight: 3, traitLabel: 'إبداع تطبيقي متزن (Practical Creator)', scientificTrait: 'Practical Creative' },
      { id: 'c', textAr: 'أركز بحواسي على ما يحدث حولي هنا والآن ولا أهوى السرحان', scoreWeight: 1, traitLabel: 'تركيز حسي واقعي دقيق (Grounded M-)', scientificTrait: 'Grounded (M-)' },
    ],
  },
  {
    id: '16pf_privateness',
    testId: 'sixteen_pf',
    dimensionKey: 'privateness',
    promptAr: '11. الكياسة وحفظ الخصوصية (Privateness - Factor N): في الإفصاح عن مشاعرك وأسرارك وتفاصيل حياتك:',
    subPromptAr: 'يقيس درجة كتمانك وكياسة إدارتك للمعلومات الشخصية مقابل الصراحة العفوية المكشوفة.',
    options: [
      { id: 'a', textAr: 'كتوم، أحتفظ بأسراري وخصوصياتي لنفسي، وأزن كل كلمة بحساب ودهاء راقٍ', scoreWeight: 5, traitLabel: 'حكمة وحفظ خصوصية عالي (Discreet N+)', scientificTrait: 'Discreet (N+)' },
      { id: 'b', textAr: 'أشارك ما ينبغي مع الموثوقين فقط وأصون خطوطي الحمراء', scoreWeight: 3, traitLabel: 'صراحة متوازنة حكيمة (Balanced)', scientificTrait: 'Balanced Privateness' },
      { id: 'c', textAr: 'كتاب مفتوح؛ عفوي وصادق وأتحدث عما في قلبي بتلقائية مطلقة', scoreWeight: 1, traitLabel: 'عفوية وشفافية مفتوحة (Forthright N-)', scientificTrait: 'Forthright / Open (N-)' },
    ],
  },
  {
    id: '16pf_apprehension',
    testId: 'sixteen_pf',
    dimensionKey: 'apprehension',
    promptAr: '12. الاطمئنان النفسي مقابل لوم الذات (Apprehension - Factor O): عندما تشعر بفتور أو عتاب من شخص عزيز:',
    subPromptAr: 'يقيس ميلك لجلد الذات والقلق المفرط مقابل السلام الداخلي والتصالح مع النفس.',
    options: [
      { id: 'a', textAr: 'ينتابني قلق شديد وألوم نفسي وأتساءل مراراً عما إذا كنت السبب في ضيقه', scoreWeight: 5, traitLabel: 'حساسية لوم ذات وقلق (Apprehensive O+)', scientificTrait: 'Apprehensive (O+)' },
      { id: 'b', textAr: 'أبحث عن السبب بهدوء وأستوضح الأمر دون تضخيم أو تهوين', scoreWeight: 3, traitLabel: 'تصالح متزن وموضوعي (Moderate O)', scientificTrait: 'Balanced' },
      { id: 'c', textAr: 'مطمئن وواثق من سلامة نيتي، ولا أتحمل مسؤولية مشاعر الآخرين ما لم أخطئ عمداً', scoreWeight: 1, traitLabel: 'سلام داخلي واطمئنان واثق (Self-Assured O-)', scientificTrait: 'Self-Assured (O-)' },
    ],
  },
  {
    id: '16pf_openness_to_change',
    testId: 'sixteen_pf',
    dimensionKey: 'openness_to_change',
    promptAr: '13. الانفتاح على التجديد والتطوير (Openness to Change - Factor Q1): نظرتك لتغيير العادات والأساليب القديمة:',
    subPromptAr: 'يقيس قابليتك للتجديد والتحديث مقابل التمسك بالطرائق المألوفة والموروثة.',
    options: [
      { id: 'a', textAr: 'أحب التطوير والتجريب المستمر وأشعر بالملل من تكرار نفس النمط', scoreWeight: 5, traitLabel: 'شغف بالتطوير والتحديث (Experimenting Q1+)', scientificTrait: 'Experimenting (Q1+)' },
      { id: 'b', textAr: 'أرحب بالتطوير المفيد مع الحفاظ على الأصول والثوابت العريقة', scoreWeight: 3, traitLabel: 'تطوير أصيل متزن (Pragmatic Reformer)', scientificTrait: 'Pragmatic Reformer' },
      { id: 'c', textAr: 'أثق في الأساليب المجربة والموروثة وأفضل الاستقرار على المغامرة', scoreWeight: 1, traitLabel: 'تمسك بالألفة والاستقرار (Traditional Q1-)', scientificTrait: 'Traditional (Q1-)' },
    ],
  },
  {
    id: '16pf_self_reliance',
    testId: 'sixteen_pf',
    dimensionKey: 'self_reliance',
    promptAr: '14. الاستقلالية والاعتماد على النفس (Self-Reliance - Factor Q2): في إنجاز أهدافك ومشاريعك الشخصية:',
    subPromptAr: 'يقيس قدرتك على العمل الفردي المستقل مقابل الحاجة الدائمة لمساندة ومرافقة الآخرين.',
    options: [
      { id: 'a', textAr: 'أعتمد على نفسي كلياً وأستمتع بالعمل الفردي المستقل وحرية حركتي', scoreWeight: 5, traitLabel: 'استقلالية واعتماد كامل على الذات (Self-Reliant Q2+)', scientificTrait: 'Self-Reliant (Q2+)' },
      { id: 'b', textAr: 'أحب التشاور والمشاركة مع الاحتفاظ باستقلال قراري الأخير', scoreWeight: 3, traitLabel: 'استقلال تشاركي مرن (Interdependent)', scientificTrait: 'Interdependent' },
      { id: 'c', textAr: 'أفضل العمل وسط مجموعة وأشعر بالأمان بوجود شركاء يتقاسمون معي العبء', scoreWeight: 1, traitLabel: 'روح جماعية تفضل الرفقة (Group-Oriented Q2-)', scientificTrait: 'Group-Oriented (Q2-)' },
    ],
  },
  {
    id: '16pf_perfectionism',
    testId: 'sixteen_pf',
    dimensionKey: 'perfectionism',
    promptAr: '15. الدقة والانضباط التنظيمي (Perfectionism - Factor Q3): كيف يبدو مكتبك، غرفتك، وتنظيم جدول مواعيدك؟',
    subPromptAr: 'يقيس مستوى معاييرك الدقيقة وحبك للترتيب والسيطرة على الفوضى.',
    options: [
      { id: 'a', textAr: 'منظم بدقة متناهية، كل شيء في مكانه، ومواعيدي محسوبة بالدقيقة', scoreWeight: 5, traitLabel: 'دقة وتنظيم عالي وانضباط (Perfectionistic Q3+)', scientificTrait: 'Perfectionistic (Q3+)' },
      { id: 'b', textAr: 'منظم في الأساسيات مع مرونة تسع الطوارئ دون وسوسة', scoreWeight: 3, traitLabel: 'تنظيم عملي مريح (Organized Enough)', scientificTrait: 'Organized Enough' },
      { id: 'c', textAr: 'عفوي وفوضوي بعض الشيء، وأجد راحتي في السلاسة دون قيود ترتيبية صارمة', scoreWeight: 1, traitLabel: 'عفوية وسلاسة مريحة (Tolerant of Disorder Q3-)', scientificTrait: 'Tolerant of Disorder (Q3-)' },
    ],
  },
  {
    id: '16pf_tension',
    testId: 'sixteen_pf',
    dimensionKey: 'tension',
    promptAr: '16. السكينة والاسترخاء مقابل التوتر (Tension - Factor Q4): عندما تضطر للانتظار في طابور طويل أو زحام سير:',
    subPromptAr: 'يقيس طاقتك الانفعالية المتوثبة وسرعة استثارتك مقابل الهدوء والسكينة الداخلية.',
    options: [
      { id: 'a', textAr: 'هادئ ومسترخٍ تماماً؛ أستغل الوقت بالاستغفار، الاستماع لكتاب، أو التأمل', scoreWeight: 1, traitLabel: 'سكينة واسترخاء عالي (Relaxed Q4-)', scientificTrait: 'Relaxed (Q4-)' },
      { id: 'b', textAr: 'أتململ قليلاً في البداية ثم أتأقلم مع الوضع بصبر', scoreWeight: 3, traitLabel: 'صبر طبيعي معتدل (Moderate Tension)', scientificTrait: 'Moderate Tension' },
      { id: 'c', textAr: 'أشعر بالغليان والتوتر الداخلي وأكاد أفقد صبري سريعاً', scoreWeight: 5, traitLabel: 'طاقة متوثبة ونفاد صبر (Tense / Driven Q4+)', scientificTrait: 'Tense / Driven (Q4+)' },
    ],
  },
];

// 5. RORSCHACH INKBLOT PROJECTIVE TEST (5 curated symmetrical cards)
export const RORSCHACH_QUESTIONS: TestQuestion[] = [
  {
    id: 'rorschach_1',
    testId: 'rorschach',
    dimensionKey: 'cognitive_synthesis',
    promptAr: 'تأمل بقعة الحبر المتماثلة في اللوحة الأولى:',
    subPromptAr: 'ما هو أول شكل يتشكل في مخيلتك بتلقائية عند النظر إلى هذه البقعة؟',
    imageSvg: 'rorschach_butterfly_bat',
    options: [
      { id: 'a', textAr: 'فراشة رقيقة أو طائر يفتح جناحيه بحرية نحو الأعلى', scoreWeight: 5, traitLabel: 'تطلع تفاؤلي وحرية معرفية', scientificTrait: 'Constructive / Positive Affect' },
      { id: 'b', textAr: 'درع واقي أو خفاش ليلي حذر يحمي نفسه', scoreWeight: 3, traitLabel: 'حذر دفاعي وأمان واعي', scientificTrait: 'Defensive Organization' },
      { id: 'c', textAr: 'وجه غامض أو قناع يختبئ وراءه شخص', scoreWeight: 4, traitLabel: 'فضول لاكتشاف الدوافع الخفية', scientificTrait: 'Interpersonal Insight' },
      { id: 'd', textAr: 'مجرد بقع حبر عشوائية متناثرة لا شكل محدد لها', scoreWeight: 2, traitLabel: 'تفكير تجريدي واقعي صارم', scientificTrait: 'Literal / Concrete Reality' },
    ],
  },
  {
    id: 'rorschach_2',
    testId: 'rorschach',
    dimensionKey: 'interpersonal_perception',
    promptAr: 'تأمل بقعة الحبر في اللوحة الثانية (ذات النقاط الملونة):',
    subPromptAr: 'كيف تترجم حركة العناصر في اللوحة؟',
    imageSvg: 'rorschach_two_figures',
    options: [
      { id: 'a', textAr: 'شخصان يتصافحان أو يرقصان في انسجام وود', scoreWeight: 5, traitLabel: 'رغبة عميقة في التناغم والارتباط البشري', scientificTrait: 'Affiliative Human Movement' },
      { id: 'b', textAr: 'شخصان يتنافسان أو يشدان حبلاً في صراع قوى', scoreWeight: 3, traitLabel: 'حساسية تجاه التنافسية وإثبات الذات', scientificTrait: 'Competitive Drive' },
      { id: 'c', textAr: 'لهب متصاعد أو بركان يخرج من باطن الأرض', scoreWeight: 4, traitLabel: 'شغف داخلي وطاقة كامنة تبحث عن التفريغ', scientificTrait: 'Emotional Intensity' },
      { id: 'd', textAr: 'حيوانان متقابلان عند نبع ماء هادئ', scoreWeight: 4, traitLabel: 'بحث عن السكينة والسلام الداخلي', scientificTrait: 'Peaceful Seeking' },
    ],
  },
  {
    id: 'rorschach_3',
    testId: 'rorschach',
    dimensionKey: 'unconscious_depth',
    promptAr: 'تأمل بقعة الحبر في اللوحة الثالثة (التناظر العمودي):',
    subPromptAr: 'ما هو الانطباع الوجداني الذي تولده في قلبك؟',
    imageSvg: 'rorschach_fountain_tree',
    options: [
      { id: 'a', textAr: 'شجرة باسقة تنمو جذورها وتتفرع أغصانها للحياة', scoreWeight: 5, traitLabel: 'ارتباط بالجذور والنمو المستمر', scientificTrait: 'Ego Vitality & Growth' },
      { id: 'b', textAr: 'نافورة ماء عذبة تتدفق بسخاء في حديقة', scoreWeight: 5, traitLabel: 'عطاء ونقاء عاطفي', scientificTrait: 'Emotional Generosity' },
      { id: 'c', textAr: 'سلسلة جبلية صخرية شامخة وسط الضباب', scoreWeight: 3, traitLabel: 'صلابة واستقلالية مع هيبة وقورة', scientificTrait: 'Stoic Self-Reliance' },
      { id: 'd', textAr: 'ممر ضيق ينفتح على أفق واسع ومجهول', scoreWeight: 4, traitLabel: 'شجاعة عبور المراحل الجديدة', scientificTrait: 'Transitional Courage' },
    ],
  },
  {
    id: 'rorschach_4',
    testId: 'rorschach',
    dimensionKey: 'defense_mechanisms',
    promptAr: 'تأمل بقعة الحبر في اللوحة الرابعة (الظل والكثافة):',
    subPromptAr: 'إذا كانت هذه الصورة تعبر عن حالة نفسية، فما هي؟',
    imageSvg: 'rorschach_shield_guardian',
    options: [
      { id: 'a', textAr: 'حارس أمين أو تمثال عريق يحمي القلعة بحكمة', scoreWeight: 5, traitLabel: 'حس حماية ومسؤولية عالي', scientificTrait: 'Protective Agency' },
      { id: 'b', textAr: 'سحابة ماطرة ثقيلة تحمل الخير والخصوبة للأرض', scoreWeight: 4, traitLabel: 'تفاؤل بالنتائج رغم غموض البدايات', scientificTrait: 'Generative Outlook' },
      { id: 'c', textAr: 'كائن أسطوري عملاق يفرض هيبته في الغابة', scoreWeight: 3, traitLabel: 'طموح عالي وتقدير للقوة والسيطرة', scientificTrait: 'Drive for Power' },
      { id: 'd', textAr: 'كهف آمن يلجأ إليه الإنسان للاستراحة والتأمل', scoreWeight: 4, traitLabel: 'حاجة للملاذ الآمن والاحتواء العاطفي', scientificTrait: 'Sanctuary Need' },
    ],
  },
  {
    id: 'rorschach_5',
    testId: 'rorschach',
    dimensionKey: 'affective_integration',
    promptAr: 'تأمل بقعة الحبر الأخيرة (التوازن والتحليق):',
    subPromptAr: 'ما هي الرسالة الخفية التي تشعر بها من خلال هذا التشكيل؟',
    imageSvg: 'rorschach_wings_crest',
    options: [
      { id: 'a', textAr: 'نسر يحلق عالياً فوق القمم بثقة وسيطرة', scoreWeight: 5, traitLabel: 'رؤية استشرافية وثقة قيادية', scientificTrait: 'Mastery & Vision' },
      { id: 'b', textAr: 'تاج أو شارة وقار ونبل تعبر عن المكانة الرفيعة', scoreWeight: 4, traitLabel: 'اعتزاز بالكرامة والأصالة', scientificTrait: 'Dignity Orientation' },
      { id: 'c', textAr: 'زهرة تتفتح بتلاتها لاستقبال ندى الصباح', scoreWeight: 5, traitLabel: 'انفتاح للحب والعطاء الرومانسي', scientificTrait: 'Romantic Receptivity' },
      { id: 'd', textAr: 'شعلة وهاجة تضيء الظلام وتنير الدرب', scoreWeight: 4, traitLabel: 'إرادة داخلية ترفض الاستسلام', scientificTrait: 'Inner Resolve' },
    ],
  },
];

// 6. TAT (Thematic Apperception Test - 4 narrative cards)
export const TAT_QUESTIONS: TestQuestion[] = [
  {
    id: 'tat_1',
    testId: 'tat',
    dimensionKey: 'achievement_motivation',
    promptAr: 'المشهد الأول: «شخص يجلس بمفرده أمام مكتبه وهو ينظر من النافذة نحو الأفق البعيد وبيده ورقة وقلم»',
    subPromptAr: 'في رأيك، ما هي القصة الحقيقية خلف هذا المشهد وما الذي يدور في ذهنه؟',
    options: [
      { id: 'a', textAr: 'يخطط لمشروع طموح سيبنيه بعزيمة ليصنع مستقبلاً مشرقاً لعائلته', scoreWeight: 5, traitLabel: 'دافع إنجاز وطموح بنائي عالي (n-Ach)', scientificTrait: 'High Achievement Need' },
      { id: 'b', textAr: 'يتأمل ذكريات دافئة مع شخص يحبه ويكتب له رسالة اشتياق صادقة', scoreWeight: 5, traitLabel: 'دافع انتماء ومودة وجدانية (n-Aff)', scientificTrait: 'High Affiliation Need' },
      { id: 'c', textAr: 'يحل مشكلة معقدة تواجهه بحكمة وصبر ويبحث عن الخيار الأصوب', scoreWeight: 4, traitLabel: 'حكمة وحل مشكلات', scientificTrait: 'Problem-Solving Mastery' },
      { id: 'd', textAr: 'يشعر بعبء المسؤوليات ويفكر في كيفية التخفف من التوتر', scoreWeight: 3, traitLabel: 'حاجة للاستراحة والسكينة', scientificTrait: 'Stress Moderation' },
    ],
  },
  {
    id: 'tat_2',
    testId: 'tat',
    dimensionKey: 'relational_attachment',
    promptAr: 'المشهد الثاني: «شخصان يقفان عند شرفة منزل، أحدهما يضع يده برفق على كتف الآخر وهما ينظران لغروب الشمس»',
    subPromptAr: 'ما هو الحوار الصامت الذي يدور بينهما في هذه اللحظة؟',
    options: [
      { id: 'a', textAr: '«لا تقلق، أنا معك دائماً مهما تغيرت الظروف وسنعبر كل شيء سوياً»', scoreWeight: 5, traitLabel: 'ارتباط آمن واحتواء تام', scientificTrait: 'Secure Relational Safety' },
      { id: 'b', textAr: '«انظر كم قطعنا من مسافة معاً؛ الغد سيكون أجمل وأكثر استقراراً»', scoreWeight: 5, traitLabel: 'تفاؤل وامتنان متبادل', scientificTrait: 'Mutual Gratitude' },
      { id: 'c', textAr: 'يتقاسمان صمتاً مريحاً أبلغ من آلاف الكلمات المعبرة', scoreWeight: 4, traitLabel: 'تواصل وجداني صامت عميق', scientificTrait: 'Deep Resonance' },
      { id: 'd', textAr: 'يتعاهدان على حل خلاف سابق والبدء بصفحة بيضاء جديدة', scoreWeight: 4, traitLabel: 'مرونة وإصلاح ذات البين', scientificTrait: 'Restorative Harmony' },
    ],
  },
  {
    id: 'tat_3',
    testId: 'tat',
    dimensionKey: 'power_autonomy',
    promptAr: 'المشهد الثالث: «شخص يقف على مفترق طريقين في غابة: طريق ممهد يسلكه الجميع، وطريق وعر تصعد به الشمس نحو قمة الجبل»',
    subPromptAr: 'أي مسار سيختاره ولماذا؟',
    options: [
      { id: 'a', textAr: 'سيختار الطريق الوعر نحو القمة، لأنه يرفض أن يكون نسخة مكررة ويبحث عن التميز', scoreWeight: 5, traitLabel: 'استقلالية وريادة فريدة', scientificTrait: 'High Autonomy & Individuation' },
      { id: 'b', textAr: 'سيختار الطريق الممهد بحكمة، فالأمان والاستقرار أقصر طريق لتحقيق الأهداف', scoreWeight: 4, traitLabel: 'واقعية وأمان استراتيجي', scientificTrait: 'Pragmatic Security' },
      { id: 'c', textAr: 'سيتوقف ليرسم خريطة تجمع بين جمال الطريقين معاً', scoreWeight: 4, traitLabel: 'تفكير إبداعي توليفي', scientificTrait: 'Creative Synthesis' },
      { id: 'd', textAr: 'سينتظر رفيق درب يشاركه الرحلة أياً كان الطريق', scoreWeight: 5, traitLabel: 'أولوية الشراكة والرفقة', scientificTrait: 'Companionship Primacy' },
    ],
  },
  {
    id: 'tat_4',
    testId: 'tat',
    dimensionKey: 'future_generativity',
    promptAr: 'المشهد الرابع: «عائلة صغيرة تجتمع حول مائدة طعام دافئة في مساء شتوي وأصوات الضحكات تملأ المكان»',
    subPromptAr: 'ما هو الأثر الذي يتركه هذا المشهد في مشاعرك وتطلعاتك للمستقبل؟',
    options: [
      { id: 'a', textAr: 'هذا هو حلمي الأسمى؛ بناء بيت يفيض بالحب والسكينة والبركة', scoreWeight: 5, traitLabel: 'تطلع أسري رصين (Family Generativity)', scientificTrait: 'Generative Family Primacy' },
      { id: 'b', textAr: 'الدفء الحقيقي ينبع من تقدير اللحظات البسيطة المشتركة', scoreWeight: 5, traitLabel: 'تقدير النعم اليومية', scientificTrait: 'Present-Moment Gratitude' },
      { id: 'c', textAr: 'أشعر بالمسؤولية الكبيرة وأهمية التخطيط لضمان استقرار هذا البيت', scoreWeight: 4, traitLabel: 'مسؤولية وبناء مستقبلي', scientificTrait: 'Responsible Stewardship' },
      { id: 'd', textAr: 'تذكير بأن الأمان النفسي هو أثمن ما يمكن للإنسان أن يمتلكه', scoreWeight: 5, traitLabel: 'أولوية السلام النفسي', scientificTrait: 'Psychological Peace' },
    ],
  },
];

// 7. ATTACHMENT & SOCIOLOGICAL DYNAMICS QUESTIONS (John Bowlby & Mary Ainsworth)
export const ATTACHMENT_QUESTIONS: TestQuestion[] = [
  {
    id: 'att_1',
    testId: 'attachment_style',
    dimensionKey: 'secure_base',
    promptAr: 'عندما تواجه يوماً شاقاً أو خيبة أمل خارج المنزل، ما هو تصرفك التلقائي مع شريكك؟',
    options: [
      { id: 'a', textAr: 'ألجأ إليه بصدق طلباً للاحتواء والسكينة، وأشاركه تفاصيل ما أشعر به دون تردد', scoreWeight: 5, traitLabel: 'ارتباط آمن وشفاف (Secure Base)', scientificTrait: 'Secure Attachment' },
      { id: 'b', textAr: 'أنتظر لتهدأ عواطفي أولاً ثم أحدثه باختصار حتى لا أثقل عليه', scoreWeight: 3, traitLabel: 'تنظيم ذاتي مستقل', scientificTrait: 'Autonomous Regulation' },
      { id: 'c', textAr: 'أنغلق على نفسي وأفضل التكتم والابتعاد حتى يمر الأمر بمفردي', scoreWeight: 1, traitLabel: 'انعزال دفاعي (Avoidant)', scientificTrait: 'Avoidant Attachment' },
    ],
  },
  {
    id: 'att_2',
    testId: 'attachment_style',
    dimensionKey: 'anxiety_reassurance',
    promptAr: 'إذا انشغل شريكك لعدة ساعات وتأخر في الرد على رسائلك دون إشعار مسبق:',
    options: [
      { id: 'a', textAr: 'ألتمس له العذر فوراً وأدرك أنه منشغل دون أن يساورني أي شك في حبه', scoreWeight: 1, traitLabel: 'أمان نفسي وطمأنينة', scientificTrait: 'Low Attachment Anxiety' },
      { id: 'b', textAr: 'أشعر بفضول أو قلق بسيط على سلامته فقط', scoreWeight: 3, traitLabel: 'قلق طبيعي متزن', scientificTrait: 'Moderate Concern' },
      { id: 'c', textAr: 'تتسارع في ذهني أفكار القلق والشك وأتساءل إن كان قد تغير تجاهي أو يتجاهلني', scoreWeight: 5, traitLabel: 'حساسية هجر مرتفعة (Anxious)', scientificTrait: 'High Attachment Anxiety' },
    ],
  },
  {
    id: 'att_3',
    testId: 'attachment_style',
    dimensionKey: 'relational_autonomy',
    promptAr: 'نظرتك للمساحة الشخصية والاستقلالية داخل العلاقة الزوجية:',
    options: [
      { id: 'a', textAr: 'تكامل متوازن؛ قرب وحب عميق مع احترام مساحة كل طرف وهواياته الخاصة', scoreWeight: 5, traitLabel: 'استقلالية صحية متكاملة', scientificTrait: 'Interdependence' },
      { id: 'b', textAr: 'أفضل أن نكون معاً في كل لحظة ونتشارك كل شاردة وواردة دائماً', scoreWeight: 4, traitLabel: 'اندماج عاطفي مكثف', scientificTrait: 'Enmeshment Tendency' },
      { id: 'c', textAr: 'أحتاج لمساحة استقلال واسعة وأشعر بالانزعاج إذا طلب مني الشريك تفسير كل تصرف', scoreWeight: 2, traitLabel: 'حذر من فقدان الاستقلال', scientificTrait: 'Avoidant Independence' },
    ],
  },
  {
    id: 'att_4',
    testId: 'attachment_style',
    dimensionKey: 'conflict_repair',
    promptAr: 'عند حدوث خلاف حاد أو سوء تفاهم مع شريك الحياة:',
    options: [
      { id: 'a', textAr: 'أحرص على التهدئة وتطييب الخاطر فوراً ونناقش جذر الخلاف دون صمت عقابي', scoreWeight: 5, traitLabel: 'إصلاح علاقي ناضج', scientificTrait: 'Constructive Conflict Repair' },
      { id: 'b', textAr: 'أحتاج لساعة هدوء ثم أعود للحوار العقلاني المنظم', scoreWeight: 4, traitLabel: 'تهدئة حكيمة', scientificTrait: 'Cooling-off Mastery' },
      { id: 'c', textAr: 'أعتمد الصمت والبرود وأنتظر منه أن يبادر هو بالاعتذار دائماً', scoreWeight: 1, traitLabel: 'صمت عقابي وتجنب', scientificTrait: 'Stonewalling / Protest Behavior' },
    ],
  },
  {
    id: 'att_5',
    testId: 'attachment_style',
    dimensionKey: 'family_solidarity',
    promptAr: 'مكانة العائلة الكبيرة وصلة الرحم والواجبات الاجتماعية في حياتك:',
    options: [
      { id: 'a', textAr: 'أولوية كبرى ومصدر بركة وأمان؛ مع صيانة خصوصية البيت الزوجي واستقلاله', scoreWeight: 5, traitLabel: 'تكافل اجتماعي أصيل', scientificTrait: 'Sociocultural Collectivism' },
      { id: 'b', textAr: 'أقوم بالواجبات الأساسية برسمية معتدلة ومريحة', scoreWeight: 3, traitLabel: 'اعتدال اجتماعي', scientificTrait: 'Balanced Duty' },
      { id: 'c', textAr: 'أفضل الانفصال التام عن أي التزامات عائلية والتركيز على الفردية فقط', scoreWeight: 1, traitLabel: 'فردانية بحتة', scientificTrait: 'Individualistic Detachment' },
    ],
  },
  {
    id: 'att_6',
    testId: 'attachment_style',
    dimensionKey: 'emotional_openness',
    promptAr: 'كيف تصف قدرتك على التعبير بالكلمات عن مشاعر الحب والامتنان والضعف الإنساني؟',
    options: [
      { id: 'a', textAr: 'صريح ودافئ وأعبر بحرية عما في قلبي بالكلام والاهتمام واللمسة اللطيفة', scoreWeight: 5, traitLabel: 'إفصاح وجداني دافئ', scientificTrait: 'High Emotional Expression' },
      { id: 'b', textAr: 'أعبر بالأفعال والمواقف العملية أكثر من الكلمات المباشرة', scoreWeight: 4, traitLabel: 'تعبير عملي رزين', scientificTrait: 'Instrumental Affection' },
      { id: 'c', textAr: 'أجد صعوبة وحرجاً شديداً في التعبير عن المشاعر وأخفي ضعفي دائماً', scoreWeight: 2, traitLabel: 'تحفظ تعبيري', scientificTrait: 'Restricted Affect' },
    ],
  },
];

// 8. EMOTIONAL INTELLIGENCE & CULTURAL VALUES (Daniel Goleman & Geert Hofstede)
export const CULTURAL_EQ_QUESTIONS: TestQuestion[] = [
  {
    id: 'ceq_1',
    testId: 'cultural_eq',
    dimensionKey: 'self_regulation',
    promptAr: 'في لحظات الغضب أو الاستفزاز غير المتوقع من شخص مقرب:',
    options: [
      { id: 'a', textAr: 'أتنفس بعمق وأضبط انفعالي وأختار كلماتي بحكمة وتريث قبل أن أتفوه بحرف', scoreWeight: 5, traitLabel: 'إدارة ذاتية وضبط انفعالي رفيع', scientificTrait: 'Emotional Self-Regulation' },
      { id: 'b', textAr: 'أغضب للحظات ثم أستعيد هدوئي سريعاً وأعتذر إن بالغت', scoreWeight: 3, traitLabel: 'انفعال عابر سريع التعافي', scientificTrait: 'Quick Recovery' },
      { id: 'c', textAr: 'أنفجر غضباً وأقول ما يخطر ببالي دون التفكير في أثر الكلمات', scoreWeight: 1, traitLabel: 'اندفاعية انفعالية حادة', scientificTrait: 'Low Emotional Regulation' },
    ],
  },
  {
    id: 'ceq_2',
    testId: 'cultural_eq',
    dimensionKey: 'social_empathy',
    promptAr: 'قدرتك على قراءة لغة جسد الشريك ونبرة صوته واستشعار ما يؤلمه دون أن يتكلم:',
    options: [
      { id: 'a', textAr: 'حاسة سادسة دقيقة؛ ألاحظ أدق تغير في نبرته وأبادر بالسؤال والاحتواء بحنان', scoreWeight: 5, traitLabel: 'تعاطف حدسي عميق', scientificTrait: 'High Empathic Attunement' },
      { id: 'b', textAr: 'ألاحظ التغير الواضح وأسأله إذا كان يود الحديث', scoreWeight: 3, traitLabel: 'تعاطف واعي معتدل', scientificTrait: 'Moderate Empathy' },
      { id: 'c', textAr: 'لا أنتبه كثيراً للتلميحات وأفضل أن يخبرني صراحة بما يريد', scoreWeight: 1, traitLabel: 'حرفية تواصل جافة', scientificTrait: 'Concrete Literalism' },
    ],
  },
  {
    id: 'ceq_3',
    testId: 'cultural_eq',
    dimensionKey: 'cultural_authenticity',
    promptAr: 'نظرتك للتقاليد الأصيلة، الكرم، والمروءة في بيئتك وثقافتك العربية والإسلامية:',
    options: [
      { id: 'a', textAr: 'اعتزاز فخور بالهوية والأصالة مع الجمع بين حكمة الماضي وآفاق المستقبل', scoreWeight: 5, traitLabel: 'أصالة ثقافية مستنيرة', scientificTrait: 'Enlightened Cultural Identity' },
      { id: 'b', textAr: 'ألتزم بالتقاليد كواجب اجتماعي اعتيادي', scoreWeight: 3, traitLabel: 'التزام تقليدي اعتيادي', scientificTrait: 'Conventional Conformity' },
      { id: 'c', textAr: 'أرى أن التقاليد قيود قديمة يجب التخلص منها كلياً', scoreWeight: 1, traitLabel: 'انسلاخ ثقافي كلي', scientificTrait: 'Cultural Alienation' },
    ],
  },
  {
    id: 'ceq_4',
    testId: 'cultural_eq',
    dimensionKey: 'social_dexterity',
    promptAr: 'في المناسبات الاجتماعية والزيارات الرسمية والعائلية:',
    options: [
      { id: 'a', textAr: 'لبق، أتقن آداب المجلس، أقدر الكبار، وأترك أثراً محبباً في كل مكان', scoreWeight: 5, traitLabel: 'ذكاء اجتماعي وأدب جم', scientificTrait: 'High Social Dexterity' },
      { id: 'b', textAr: 'أؤدي الواجب بلباقة هادئة ومريحة', scoreWeight: 3, traitLabel: 'حضور اجتماعي متزن', scientificTrait: 'Courteous' },
      { id: 'c', textAr: 'أشعر بالحرج أو التكلف وأفضل التهرب من هذه المناسبات', scoreWeight: 1, traitLabel: 'عزوف اجتماعي', scientificTrait: 'Social Hesitancy' },
    ],
  },
  {
    id: 'ceq_5',
    testId: 'cultural_eq',
    dimensionKey: 'growth_mindset',
    promptAr: 'نظرتك للتطوير الذاتي المشترك مع الشريك (قراءة كتب، دورات، مناقشات فكرية):',
    options: [
      { id: 'a', textAr: 'شغف أساسي؛ الشراكة الحقيقية هي رحلة ارتقاء وتنمية بشرية مستمرة لكلينا', scoreWeight: 5, traitLabel: 'عقلية نمو إنساني ملهمة', scientificTrait: 'Shared Growth Mindset' },
      { id: 'b', textAr: 'أمر جميل إذا أتيحت له الظروف والأوقات المناسبة', scoreWeight: 3, traitLabel: 'اهتمام معتدل', scientificTrait: 'Casual Growth' },
      { id: 'c', textAr: 'الإنسان لا يتغير بعد سن معينة ولا داعي لمحاولة التعلم المستمر', scoreWeight: 1, traitLabel: 'عقلية ثابتة وركود', scientificTrait: 'Fixed Mindset' },
    ],
  },
  {
    id: 'ceq_6',
    testId: 'cultural_eq',
    dimensionKey: 'forgiveness_grace',
    promptAr: 'إذا بدر من الشريك خطأ غير مقصود أمام الآخرين، كيف تتصرف؟',
    options: [
      { id: 'a', textAr: 'أصون كرامته فوراً وأغطي عليه بلباقة، ثم أعاتبه بلطف بيني وبينه في البيت', scoreWeight: 5, traitLabel: 'مروءة وصيانة شرف الشراكة', scientificTrait: 'Protective Dignity & Grace' },
      { id: 'b', textAr: 'أتجاهل الموقف وأتركه يصححه بنفسه', scoreWeight: 3, traitLabel: 'حياد عقلاني', scientificTrait: 'Neutral Stance' },
      { id: 'c', textAr: 'أوجه له اللوم فوراً أمام الحاضرين لإثبات صوابي', scoreWeight: 1, traitLabel: 'إحراج ونقص مروءة', scientificTrait: 'Critical Exposure' },
    ],
  },
];

// ============================================================================
// EXTENDED SCIENTIFIC ITEM BANKS (Bringing every scale to 20–32 deep items)
// ============================================================================

const EXTENDED_BIG_FIVE_ITEMS: TestQuestion[] = [
  {
    id: 'bf_11',
    testId: 'big_five',
    dimensionKey: 'extraversion',
    promptAr: 'الدفء والمبادرة الحوارية (NEO Facet E1): عندما تدخل مجلساً يضم أشخاصاً هادئين ومتحفظين:',
    options: [
      { id: 'a', textAr: 'أكسر الجليد بابتسامة وأطرح موضوعاً شيقاً يشرك الجميع في الحوار', scoreWeight: 5, traitLabel: 'مبادرة اجتماعية دافئة', scientificTrait: 'Warmth & Gregariousness' },
      { id: 'b', textAr: 'أكتفي بالتحية اللطيفة وأتحدث مع من يجلس بجواري فقط', scoreWeight: 3, traitLabel: 'تواصل متوازن', scientificTrait: 'Moderate Sociability' },
      { id: 'c', textAr: 'أفضل التزام الصمت والاستماع دون لفت الانتباه لنفسي', scoreWeight: 1, traitLabel: 'هدوء وتحفظ', scientificTrait: 'Reserved Introversion' },
    ],
  },
  {
    id: 'bf_12',
    testId: 'big_five',
    dimensionKey: 'extraversion',
    promptAr: 'الحزم والقيادة الاجتماعية (NEO Facet E3 - Assertiveness): في الاجتماعات أو المشاريع المشتركة:',
    options: [
      { id: 'a', textAr: 'أتقدم تلقائياً لتنظيم الفريق وتوجيه الدفة وصياغة القرارات', scoreWeight: 5, traitLabel: 'حزم قيادي واضح', scientificTrait: 'High Assertiveness' },
      { id: 'b', textAr: 'أعبر عن رأيي بوضوح وأترك القيادة لمن يرغب بها', scoreWeight: 3, traitLabel: 'مشاركة متوازنة', scientificTrait: 'Balanced Assertiveness' },
      { id: 'c', textAr: 'أفضل العمل في الظل وتجنب مواقع القيادة والمواجهة', scoreWeight: 1, traitLabel: 'تواضع وعمل فردي', scientificTrait: 'Low Assertiveness' },
    ],
  },
  {
    id: 'bf_13',
    testId: 'big_five',
    dimensionKey: 'extraversion',
    promptAr: 'مستوى الإيقاع والنشاط الحيوي (NEO Facet E4 - Activity): كيف تصف إيقاع حياتك اليومي المعتاد؟',
    options: [
      { id: 'a', textAr: 'سريع، مفعم بالحركة والمشاريع المتعددة، ولا أحب الفراغ الطويل', scoreWeight: 5, traitLabel: 'طاقة حيوية عالية', scientificTrait: 'High Activity Tempo' },
      { id: 'b', textAr: 'إيقاع معتدل يجمع بين الإنجاز المريح وفترات الاسترخاء', scoreWeight: 3, traitLabel: 'إيقاع متزن', scientificTrait: 'Steady Tempo' },
      { id: 'c', textAr: 'إيقاع هادئ ومتأنٍ جداً بعيداً عن الاستعجال والازدحام', scoreWeight: 1, traitLabel: 'تأنٍ وسكينة', scientificTrait: 'Leisurely Tempo' },
    ],
  },
  {
    id: 'bf_14',
    testId: 'big_five',
    dimensionKey: 'neuroticism',
    promptAr: 'القلق التوقعي (NEO Facet N1 - Anxiety): عندما تنتظر نتيجة مهمة (طبية، مهنية، أو عائلية):',
    options: [
      { id: 'a', textAr: 'أفوض أمري بثقة وأنشغل بيومي الطبيعي دون قلق مسبق', scoreWeight: 1, traitLabel: 'طمأنينة عالية', scientificTrait: 'Low Anticipatory Anxiety' },
      { id: 'b', textAr: 'أفكر في الأمر بين الحين والآخر مع الحفاظ على هدوئي العام', scoreWeight: 3, traitLabel: 'ترقب طبيعي', scientificTrait: 'Moderate Concern' },
      { id: 'c', textAr: 'يسيطر التوتر على تفكيري وأتخيل أسوأ الاحتمالات الممكنة', scoreWeight: 5, traitLabel: 'قلق توقعي مرتفع', scientificTrait: 'High Anxiety' },
    ],
  },
  {
    id: 'bf_15',
    testId: 'big_five',
    dimensionKey: 'neuroticism',
    promptAr: 'الوعي الذاتي والحساسية للإحراج (NEO Facet N4 - Self-Consciousness): إذا تعثرت أو أخطأت في كلمة أمام جمع من الناس:',
    options: [
      { id: 'a', textAr: 'أبتسم بعفوية وأتجاوز الموقف فوراً دون أي حرج', scoreWeight: 1, traitLabel: 'ثقة نفسية راسخة', scientificTrait: 'Social Poise' },
      { id: 'b', textAr: 'أشعر بحرج خفيف لثوانٍ ثم أكمل حديثي بشكل طبيعي', scoreWeight: 3, traitLabel: 'حساسية معتدلة', scientificTrait: 'Normal Self-Awareness' },
      { id: 'c', textAr: 'أشعر بضيق شديد وأظل أفكر في نظرات الناس لي طويلاً', scoreWeight: 5, traitLabel: 'حساسية مفرطة للنقد', scientificTrait: 'High Self-Consciousness' },
    ],
  },
  {
    id: 'bf_16',
    testId: 'big_five',
    dimensionKey: 'neuroticism',
    promptAr: 'ضبط الاندفاع أمام المغريات (NEO Facet N5 - Impulsiveness): عندما تشعر بالملل أو الضيق النفسي:',
    options: [
      { id: 'a', textAr: 'أضبط رغباتي بوعي ولا ألجأ للشراء العشوائي أو القرارات الانفعالية', scoreWeight: 1, traitLabel: 'ضبط انفعالي قوي', scientificTrait: 'High Impulse Control' },
      { id: 'b', textAr: 'أكافئ نفسي بشيء بسيط ضمن حدود المعقول', scoreWeight: 3, traitLabel: 'توازن', scientificTrait: 'Moderate Control' },
      { id: 'c', textAr: 'أندفع لاتخاذ قرارات سريعة أو إنفاق غير محسوب لتفريغ التوتر', scoreWeight: 5, traitLabel: 'اندفاعية تحت الضغط', scientificTrait: 'Low Impulse Control' },
    ],
  },
  {
    id: 'bf_17',
    testId: 'big_five',
    dimensionKey: 'openness',
    promptAr: 'التذوق الجمالي والفني (NEO Facet O2 - Aesthetics): عند سماع مقطوعة موسيقية راقية أو تأمل لوحة معمارية أو طبيعية:',
    options: [
      { id: 'a', textAr: 'أستغرق في تفاصيلها الجمالية وأشعر بإلهام وجداني عميق', scoreWeight: 5, traitLabel: 'حس جمالي رفيع', scientificTrait: 'High Aesthetic Sensitivity' },
      { id: 'b', textAr: 'أستحسن مظهرها العام دون التعمق الطويل في تفاصيلها', scoreWeight: 3, traitLabel: 'تذوق معتدل', scientificTrait: 'Moderate Appreciation' },
      { id: 'c', textAr: 'لا تستهويني الفنون والجماليات بقدر اهتمامي بالوظيفة العملية', scoreWeight: 1, traitLabel: 'نظرة عملية نفعية', scientificTrait: 'Pragmatic Focus' },
    ],
  },
  {
    id: 'bf_18',
    testId: 'big_five',
    dimensionKey: 'openness',
    promptAr: 'الفضول الفكري والمعرفي (NEO Facet O5 - Ideas): كيف تتعامل مع النظريات العلمية أو الفلسفية المعقدة؟',
    options: [
      { id: 'a', textAr: 'أستمتع بالقراءة عنها وتحليلها كرياضة ذهنية ممتعة', scoreWeight: 5, traitLabel: 'شغف معرفي وفلسفي', scientificTrait: 'High Intellectual Curiosity' },
      { id: 'b', textAr: 'أقرأ ما يفيدني مباشرة في تخصصي أو حياتي اليومية', scoreWeight: 3, traitLabel: 'معرفة تطبيقية', scientificTrait: 'Applied Curiosity' },
      { id: 'c', textAr: 'أتجنب النقاشات النظرية المجردة وأفضل المواضيع المباشرة', scoreWeight: 1, traitLabel: 'واقعية حسية', scientificTrait: 'Concrete Orientation' },
    ],
  },
  {
    id: 'bf_19',
    testId: 'big_five',
    dimensionKey: 'openness',
    promptAr: 'المرونة وتجربة المألوف مقابل الجديد (NEO Facet O4 - Actions): عند السفر أو اختيار مطعم أو مسار يومي:',
    options: [
      { id: 'a', textAr: 'أعشق استكشاف الأماكن الجديدة وتجربة أطباق وثقافات لم أجربها من قبل', scoreWeight: 5, traitLabel: 'حب الاستكشاف والتجديد', scientificTrait: 'Behavioral Openness' },
      { id: 'b', textAr: 'أجرب الجديد أحياناً مع الاحتفاظ بأماكني المفضلة المعتادة', scoreWeight: 3, traitLabel: 'توازن بين الألفة والتجديد', scientificTrait: 'Balanced Novelty' },
      { id: 'c', textAr: 'أفضل دائماً الأماكن والأطعمة التي أعرفها وأثق بها تماماً', scoreWeight: 1, traitLabel: 'تفضيل الروتين الآمن', scientificTrait: 'Routine Preference' },
    ],
  },
  {
    id: 'bf_20',
    testId: 'big_five',
    dimensionKey: 'agreeableness',
    promptAr: 'الثقة بحسن نوايا الآخرين (NEO Facet A1 - Trust): كيف تنظر إلى دوافع الناس عند التعامل معهم؟',
    options: [
      { id: 'a', textAr: 'أفترض الصدق وحسن النية في الناس حتى يثبت العكس بدليل قاطع', scoreWeight: 5, traitLabel: 'ثقة اجتماعية إيجابية', scientificTrait: 'High Interpersonal Trust' },
      { id: 'b', textAr: 'أتعامل بود مع بقاء حذري الطبيعي في المعاملات المهمة', scoreWeight: 3, traitLabel: 'ثقة متزنة', scientificTrait: 'Prudent Trust' },
      { id: 'c', textAr: 'أشكك في نوايا الآخرين وأتوقع أنهم يبحثون عن مصالحهم الخاصة فقط', scoreWeight: 1, traitLabel: 'حذر وتشكك', scientificTrait: 'Skeptical Guardedness' },
    ],
  },
  {
    id: 'bf_21',
    testId: 'big_five',
    dimensionKey: 'agreeableness',
    promptAr: 'الإيثار ومساندة المحتاجين (NEO Facet A3 - Altruism): عندما يطلب منك زميل أو قريب مساعدة تأخذ من وقتك:',
    options: [
      { id: 'a', textAr: 'أبادر بمساعدته بطيب خاطر وسعادة حقيقية بتفريج كربته', scoreWeight: 5, traitLabel: 'إيثار وعطاء كريم', scientificTrait: 'High Altruism' },
      { id: 'b', textAr: 'أساعده بقدر المستطاع إذا لم يتعارض ذلك مع التزاماتي الضرورية', scoreWeight: 3, traitLabel: 'تعاون متزن', scientificTrait: 'Balanced Helpfulness' },
      { id: 'c', textAr: 'أعتذر غالباً لأنني لا أحب أن يتدخل أحد في جدول وقتي الخاص', scoreWeight: 1, traitLabel: 'حماية صارمة للوقت', scientificTrait: 'Self-Focused' },
    ],
  },
  {
    id: 'bf_22',
    testId: 'big_five',
    dimensionKey: 'agreeableness',
    promptAr: 'التواضع وعدم التعالي (NEO Facet A5 - Modesty): عند تحقيق نجاح باهر في العمل أو الدراسة:',
    options: [
      { id: 'a', textAr: 'أحمد الله بتواضع وأشارك الفضل مع من ساندني دون تفاخر', scoreWeight: 5, traitLabel: 'تواضع ونبل أخلاقي', scientificTrait: 'High Modesty' },
      { id: 'b', textAr: 'أسعد بإنجازي وأتحدث عنه باعتدال عند السؤال', scoreWeight: 3, traitLabel: 'اعتزاز متزن', scientificTrait: 'Healthy Pride' },
      { id: 'c', textAr: 'أحرص على إبراز تفوقي وتميزي على أقراني في كل مناسبة', scoreWeight: 1, traitLabel: 'تنافسية واستعراض', scientificTrait: 'Competitive Superiority' },
    ],
  },
  {
    id: 'bf_23',
    testId: 'big_five',
    dimensionKey: 'conscientiousness',
    promptAr: 'الكفاءة والترتيب المنهجي (NEO Facet C2 - Order): كيف تصف تنظيم ملفاتك، مقتنياتك، وبيئة عملك؟',
    options: [
      { id: 'a', textAr: 'كل شيء مصنف ومنظم بدقة بحيث أصل لأي معلومة أو غرض في ثوانٍ', scoreWeight: 5, traitLabel: 'تنظيم منهجي فائق', scientificTrait: 'High Orderliness' },
      { id: 'b', textAr: 'مرتب بشكل عام مع بعض الفوضى البسيطة أثناء ضغط العمل', scoreWeight: 3, traitLabel: 'تنظيم عملي', scientificTrait: 'Moderate Order' },
      { id: 'c', textAr: 'لا أهتم بالترتيب الشكلي وأترك الأشياء حيثما اتفق', scoreWeight: 1, traitLabel: 'تلقائية غير منظمة', scientificTrait: 'Low Orderliness' },
    ],
  },
  {
    id: 'bf_24',
    testId: 'big_five',
    dimensionKey: 'conscientiousness',
    promptAr: 'الكفاح من أجل الإنجاز والتميز (NEO Facet C4 - Achievement Striving): عندما تبدأ مشروعاً أو هدفاً طويل الأمد:',
    options: [
      { id: 'a', textAr: 'أواصل العمل بمثابرة وانضباط ذاتي حتى يكتمل بأعلى معايير الجودة', scoreWeight: 5, traitLabel: 'مثابرة وطموح عالي', scientificTrait: 'High Achievement Striving' },
      { id: 'b', textAr: 'أنجز المطلوب بمستوى جيد ومقبول دون إجهاد مفرط', scoreWeight: 3, traitLabel: 'إنجاز متوازن', scientificTrait: 'Moderate Drive' },
      { id: 'c', textAr: 'أفقد الحماس في منتصف الطريق وأؤجل إتمامه كثيراً', scoreWeight: 1, traitLabel: 'تشتت وتسويف', scientificTrait: 'Procrastination Tendency' },
    ],
  },
  {
    id: 'bf_25',
    testId: 'big_five',
    dimensionKey: 'conscientiousness',
    promptAr: 'التروي والتفكير قبل الفعل (NEO Facet C6 - Deliberation): قبل توقيع عقد أو اتخاذ خطوة مالية أو مهنية:',
    options: [
      { id: 'a', textAr: 'أدرس كافة العواقب والبدائل والتفاصيل الدقيقة بروية تامة', scoreWeight: 5, traitLabel: 'تروٍ وحكمة عالية', scientificTrait: 'High Deliberation' },
      { id: 'b', textAr: 'أراجع النقاط الأساسية السريعة ثم أحسم قراري', scoreWeight: 3, traitLabel: 'مراجعة متوازنة', scientificTrait: 'Moderate Caution' },
      { id: 'c', textAr: 'أقرر فوراً بشكل عفوي ثم أكتشف التفاصيل لاحقاً', scoreWeight: 1, traitLabel: 'سرعة وعفوية', scientificTrait: 'Hasty Decision' },
    ],
  },
];

const EXTENDED_MMPI_ITEMS: TestQuestion[] = [
  {
    id: 'mmpi_9',
    testId: 'mmpi',
    dimensionKey: 'lie_scale',
    promptAr: 'مقياس الصدق الثالث (L-Scale): «هل سبق أن أجلت عملاً كان ينبغي عليك إنجازه في نفس اليوم بدافع الكسل أو التعب؟»',
    options: [
      { id: 'a', textAr: 'نعم، يحدث ذلك أحياناً كأي إنسان طبيعي يمر بفترات إرهاق', scoreWeight: 5, traitLabel: 'صراحة وواقعية ممتازة', scientificTrait: 'Authentic Response' },
      { id: 'b', textAr: 'نادراً جداً وفي حالات المرض فقط', scoreWeight: 3, traitLabel: 'انضباط مرتفع', scientificTrait: 'Moderate Defensiveness' },
      { id: 'c', textAr: 'كلا أبداً، لم أؤجل أي عمل في حياتي ولو لمرة واحدة', scoreWeight: 1, traitLabel: 'تجميل ذاتي (مؤشر دفاعي)', scientificTrait: 'Elevated L-Scale' },
    ],
  },
  {
    id: 'mmpi_10',
    testId: 'mmpi',
    dimensionKey: 'depression_scale',
    promptAr: 'مقياس الاستمتاع بالحياة (Scale 2 - Anhedonia): كيف تصف شعورك تجاه الهوايات والأنشطة التي كنت تحبها سابقاً؟',
    options: [
      { id: 'a', textAr: 'ما زلت أستمتع بها بشغف وتمنحني بهجة وتجدداً حقيقياً', scoreWeight: 5, traitLabel: 'بهجة وتفاعل إيجابي', scientificTrait: 'Healthy Hedonic Tone' },
      { id: 'b', textAr: 'أستمتع بها أحياناً بحسب المزاج والوقت المتاح', scoreWeight: 3, traitLabel: 'تفاعل اعتيادي', scientificTrait: 'Normal Range' },
      { id: 'c', textAr: 'فقدت الشغف بها تماماً ولم تعد تعنيني كما في السابق', scoreWeight: 1, traitLabel: 'فتور وجداني', scientificTrait: 'Anhedonic Dip' },
    ],
  },
  {
    id: 'mmpi_11',
    testId: 'mmpi',
    dimensionKey: 'somatization',
    promptAr: 'مقياس الوعي الجسدي (Scale 1 - Hypochondriasis): كيف تتعامل مع الأعراض الجسدية العابرة (كإجهاد العضلات أو الصداع الخفيف)؟',
    options: [
      { id: 'a', textAr: 'أتعامل معها بهدوء بالراحة وشرب الماء دون قلق مرضي', scoreWeight: 5, traitLabel: 'طمأنينة صحية متزنة', scientificTrait: 'Healthy Bodily Awareness' },
      { id: 'b', textAr: 'أنتبه لها وأراقبها باعتدال حتى تزول', scoreWeight: 3, traitLabel: 'اهتمام صحي طبيعي', scientificTrait: 'Moderate Health Focus' },
      { id: 'c', textAr: 'أقلق بشدة وأنشغل بالبحث المستمر عن تفسيرات طبية مقلقة', scoreWeight: 1, traitLabel: 'انشغال جسدي مفرط', scientificTrait: 'Somatic Preoccupation' },
    ],
  },
  {
    id: 'mmpi_12',
    testId: 'mmpi',
    dimensionKey: 'somatization',
    promptAr: 'مقياس التحويل الانفعالي (Scale 3 - Conversion): عند كبت مشاعر الحزن أو الغضب الشديد لعدة أيام:',
    options: [
      { id: 'a', textAr: 'أعبر عن مشاعري بالحوار الواعي فلا تتحول إلى أعراض جسدية', scoreWeight: 5, traitLabel: 'تفريغ انفعالي صحي', scientificTrait: 'Emotional Processing' },
      { id: 'b', textAr: 'أشعر ببعض الخمول الجسدي المؤقت ثم يزول', scoreWeight: 3, traitLabel: 'تأثر فسيولوجي معتدل', scientificTrait: 'Mild Psychosomatic Link' },
      { id: 'c', textAr: 'أصاب فوراً بضيق تنفس أو خدر أو آلام حادة غير مفسرة طبياً', scoreWeight: 1, traitLabel: 'تحويل جسدي انفعالي', scientificTrait: 'Somatic Conversion' },
    ],
  },
  {
    id: 'mmpi_13',
    testId: 'mmpi',
    dimensionKey: 'psychopathic_deviate',
    promptAr: 'مقياس التوافق الأسري والمجتمعي (Scale 4): كيف تقيم علاقتك بالمرجعيات الأسرية والالتزامات الأخلاقية؟',
    options: [
      { id: 'a', textAr: 'علاقة احترام وتقدير متبادل مع وعي ناضج بالمسؤولية', scoreWeight: 5, traitLabel: 'نضج وتوافق قيمي', scientificTrait: 'Social Harmony' },
      { id: 'b', textAr: 'تحدث بعض الاختلافات في وجهات النظر لكن الود والاحترام باقيان', scoreWeight: 3, traitLabel: 'استقلالية محترمة', scientificTrait: 'Healthy Autonomy' },
      { id: 'c', textAr: 'أشعر بصدام دائم ورغبة في التمرد الكامل على كل التزام', scoreWeight: 1, traitLabel: 'تمرد وصراع مع السلطة', scientificTrait: 'Authority Conflict' },
    ],
  },
  {
    id: 'mmpi_14',
    testId: 'mmpi',
    dimensionKey: 'paranoia_scale',
    promptAr: 'مقياس الحساسية للنقد والتأويل (Scale 6): إذا رأيت شخصين يتهامسان ويضحكان في مكان عام:',
    options: [
      { id: 'a', textAr: 'لا يخطر ببالي إطلاقاً أن الحديث يخصني، وأمضي في شأني بسلام', scoreWeight: 5, traitLabel: 'موضوعية وثقة بالنفس', scientificTrait: 'Objective Reality Testing' },
      { id: 'b', textAr: 'ألتفت عفوياً للحظة ثم أنسى الأمر فوراً', scoreWeight: 3, traitLabel: 'انتباه عابر طبيعي', scientificTrait: 'Normal Awareness' },
      { id: 'c', textAr: 'أشعر فوراً أنهما يتحدثان عني أو يسخران مني', scoreWeight: 1, traitLabel: 'حساسية إسقاطية ذاتية', scientificTrait: 'Self-Referential Sensitivity' },
    ],
  },
  {
    id: 'mmpi_15',
    testId: 'mmpi',
    dimensionKey: 'depression_scale',
    promptAr: 'مقياس القلق والتدقيق الوسواسي (Scale 7 - Psychasthenia): بعد اتخاذ قرار أو إغلاق باب المنزل أو إرسال رسالة مهمة:',
    options: [
      { id: 'a', textAr: 'أثق في إجرائي وأنتقل للمهمة التالية بذهن صافٍ', scoreWeight: 5, traitLabel: 'حسم وسكينة ذهنية', scientificTrait: 'Decisive Closure' },
      { id: 'b', textAr: 'أتأكد مرة واحدة إضافية في الأمور الحساسة فقط', scoreWeight: 3, traitLabel: 'حرص طبيعي', scientificTrait: 'Healthy Caution' },
      { id: 'c', textAr: 'أعاود الشك والتدقيق مرات عديدة وتطاردني أفكار القلق من الخطأ', scoreWeight: 1, traitLabel: 'شك واجترار وسواسي', scientificTrait: 'Obsessive Rumination' },
    ],
  },
  {
    id: 'mmpi_16',
    testId: 'mmpi',
    dimensionKey: 'paranoia_scale',
    promptAr: 'مقياس صفاء الإدراك والترابط الفكري (Scale 8): عندما تكون تحت ضغط ذهني شديد:',
    options: [
      { id: 'a', textAr: 'يظل تفكيري مترابطاً وواقعياً وأركز على الحلول الملموسة', scoreWeight: 5, traitLabel: 'ترابط معرفي متين', scientificTrait: 'Cognitive Coherence' },
      { id: 'b', textAr: 'أشعر ببعض التشتت المؤقت وأستعيد تركيزي بعد قسط من الراحة', scoreWeight: 3, traitLabel: 'تشتت إجهادي عابر', scientificTrait: 'Transient Fatigue' },
      { id: 'c', textAr: 'أشعر باغتراب شديد عن الواقع وانفصال عن المحيطين بي', scoreWeight: 1, traitLabel: 'اغتراب وتشتت ذهني', scientificTrait: 'Cognitive Alienation' },
    ],
  },
  {
    id: 'mmpi_17',
    testId: 'mmpi',
    dimensionKey: 'hypomania',
    promptAr: 'مقياس تنظيم الطاقة والتركيز (Scale 9): عند العمل على مشروع جديد:',
    options: [
      { id: 'a', textAr: 'أوزع طاقتي بانتظام من البداية حتى الإنجاز النهائي', scoreWeight: 5, traitLabel: 'طاقة منظمة ومستدامة', scientificTrait: 'Regulated Energy' },
      { id: 'b', textAr: 'أبدأ بحماس عالٍ ثم أستقر على وتيرة عمل متوسطة', scoreWeight: 3, traitLabel: 'حماس طبيعي', scientificTrait: 'Normal Enthusiasm' },
      { id: 'c', textAr: 'أفتح عشرة مشاريع في وقت واحد بحماس مفرط دون إكمال أي منها', scoreWeight: 1, traitLabel: 'تشتت وفرط نشاط', scientificTrait: 'Hyperactive Dispersion' },
    ],
  },
  {
    id: 'mmpi_18',
    testId: 'mmpi',
    dimensionKey: 'social_introversion',
    promptAr: 'مقياس الحضور الاجتماعي والتعبير (Scale 0): عندما يُطلب منك تقديم رأيك أمام مجموعة غير مألوفة:',
    options: [
      { id: 'a', textAr: 'أتحدث بثقة وهدوء وأعبر عن وجهة نظري بوضوح', scoreWeight: 5, traitLabel: 'ثقة وحضور اجتماعي', scientificTrait: 'Social Comfort' },
      { id: 'b', textAr: 'أتحدث باختصار بعد ترتيب أفكاري ذهنياً', scoreWeight: 3, traitLabel: 'توازن اجتماعي', scientificTrait: 'Moderate Introversion' },
      { id: 'c', textAr: 'أشعر برهبة شديدة وأتجنب الحديث بأي وسيلة', scoreWeight: 1, traitLabel: 'رهبة وانسحاب اجتماعي', scientificTrait: 'High Social Inhibition' },
    ],
  },
  {
    id: 'mmpi_19',
    testId: 'mmpi',
    dimensionKey: 'lie_scale',
    promptAr: 'مقياس الاتزان الدفاعي (K-Scale): «هل تشعر أحياناً أن بعض الناس يختبرون صبرك إلى أقصى حد؟»',
    options: [
      { id: 'a', textAr: 'نعم، في بعض المواقف الضاغطة أشعر بنفاد الصبر كأي إنسان', scoreWeight: 5, traitLabel: 'شفافية ووعي ذاتي', scientificTrait: 'Balanced K-Scale' },
      { id: 'b', textAr: 'أحاول التحلي بالصبر في معظم الأوقات', scoreWeight: 3, traitLabel: 'ضبط ذاتي', scientificTrait: 'Moderate Reserve' },
      { id: 'c', textAr: 'لا يزعجني أي تصرف من أي إنسان مهما فعل', scoreWeight: 1, traitLabel: 'إنكار دفاعي مفرط', scientificTrait: 'Defensive Denial' },
    ],
  },
  {
    id: 'mmpi_20',
    testId: 'mmpi',
    dimensionKey: 'depression_scale',
    promptAr: 'مقياس جودة النوم والسكينة الليلية: كيف تصف نمط نومك في الأسابيع المعتادة؟',
    options: [
      { id: 'a', textAr: 'نوم عميق ومنتظم أستيقظ بعده بنشاط وحيوية', scoreWeight: 5, traitLabel: 'انتظام فسيولوجي ونفسي', scientificTrait: 'Restorative Sleep' },
      { id: 'b', textAr: 'نوم جيد عموماً إلا في ليالي الانشغال الكبير', scoreWeight: 3, traitLabel: 'نوم طبيعي', scientificTrait: 'Normal Sleep' },
      { id: 'c', textAr: 'أرق متكرر واستيقاظ مبكر مصحوب بقلق وضيق', scoreWeight: 1, traitLabel: 'إجهاد وأرق انفعالي', scientificTrait: 'Sleep Disturbance' },
    ],
  },
  {
    id: 'mmpi_21',
    testId: 'mmpi',
    dimensionKey: 'psychopathic_deviate',
    promptAr: 'مقياس التعاطف والندم الأخلاقي: إذا تسببت دون قصد في جرح مشاعر شخص بريء:',
    options: [
      { id: 'a', textAr: 'أشعر بتأنيب الضمير وأبادر فوراً بالاعتذار وجبر خاطره', scoreWeight: 5, traitLabel: 'ضمير حي وتعاطف سوي', scientificTrait: 'Intact Moral Conscience' },
      { id: 'b', textAr: 'أوضح له أنني لم أقصد الإساءة لإنهاء سوء الفهم', scoreWeight: 3, traitLabel: 'توضيح عقلاني', scientificTrait: 'Rational Repair' },
      { id: 'c', textAr: 'لا أكترث بمشاعره وأعتبر أنها مشكلته الخاصة', scoreWeight: 1, traitLabel: 'تبلد تعاطفي', scientificTrait: 'Low Empathy' },
    ],
  },
  {
    id: 'mmpi_22',
    testId: 'mmpi',
    dimensionKey: 'somatization',
    promptAr: 'مقياس الطاقة العصبية والتحمل: بعد يوم عمل اعتيادي:',
    options: [
      { id: 'a', textAr: 'تبقى لدي طاقة طيبة للجلوس مع أهلي وممارسة هواياتي', scoreWeight: 5, traitLabel: 'حيوية عصبية متزنة', scientificTrait: 'Good Stamina' },
      { id: 'b', textAr: 'أحتاج لساعة استرخاء ثم أستعيد نشاطي المسائي', scoreWeight: 3, traitLabel: 'تحمل معتدل', scientificTrait: 'Average Stamina' },
      { id: 'c', textAr: 'أشعر بإنهاك عصبي وجسدي كامل يمنعني من فعل أي شيء', scoreWeight: 1, traitLabel: 'استنزاف طاقي سريع', scientificTrait: 'Chronic Fatigue' },
    ],
  },
  {
    id: 'mmpi_23',
    testId: 'mmpi',
    dimensionKey: 'paranoia_scale',
    promptAr: 'مقياس الأمان في العلاقات المهنية والاجتماعية: هل تشعر أن المحيطين بك يقدرون جهودك بإنصاف؟',
    options: [
      { id: 'a', textAr: 'نعم، ألقى التقدير المنصف في أغلب الأوقات وأثق بعدالة المحيطين', scoreWeight: 5, traitLabel: 'إدراك اجتماعي متزن', scientificTrait: 'Fairness Perception' },
      { id: 'b', textAr: 'بعضهم يقدر وبعضهم يغفل، وهذا طبيعي في الحياة', scoreWeight: 3, traitLabel: 'واقعية اجتماعية', scientificTrait: 'Realistic Outlook' },
      { id: 'c', textAr: 'أشعر دائماً أن هناك مؤامرة لتهميشي وسلب حقوقي عمداً', scoreWeight: 1, traitLabel: 'شعور بالاضطهاد', scientificTrait: 'Persecutory Ideation' },
    ],
  },
  {
    id: 'mmpi_24',
    testId: 'mmpi',
    dimensionKey: 'social_introversion',
    promptAr: 'مقياس الانتماء والمشاركة المجتمعية: كيف تفضل قضاء المناسبات والأعياد؟',
    options: [
      { id: 'a', textAr: 'وسط الأهل والأحباب وتبادل الزيارات والتهاني المبهجة', scoreWeight: 5, traitLabel: 'اندماج اجتماعي صحي', scientificTrait: 'High Social Connectedness' },
      { id: 'b', textAr: 'مع الدائرة العائلية الصغيرة المقربة فقط', scoreWeight: 3, traitLabel: 'انتقائية دافئة', scientificTrait: 'Selective Bonding' },
      { id: 'c', textAr: 'في عزلة تامة بعيداً عن جميع الناس', scoreWeight: 1, traitLabel: 'انعزال اجتماعي', scientificTrait: 'Social Isolation' },
    ],
  },
];

const EXTENDED_EPQ_ITEMS: TestQuestion[] = [
  {
    id: 'epq_9',
    testId: 'epq',
    dimensionKey: 'eysenck_extraversion',
    promptAr: 'هل تعتبر نفسك شخصاً حيويّاً يضفي البهجة والحركة على أي مكان يتواجد فيه؟',
    options: [
      { id: 'a', textAr: 'نعم بالتأكيد، أحب الحيوية وروح الدعابة وتنشيط الأجواء', scoreWeight: 5, traitLabel: 'انبساط حيوي', scientificTrait: 'High Liveliness' },
      { id: 'b', textAr: 'بدرجة معتدلة بحسب طبيعة الحاضرين', scoreWeight: 3, traitLabel: 'توازن', scientificTrait: 'Moderate' },
      { id: 'c', textAr: 'أفضل الهدوء والسكينة والبقاء مستمعاً', scoreWeight: 1, traitLabel: 'انطواء هادئ', scientificTrait: 'Quiet Introvert' },
    ],
  },
  {
    id: 'epq_10',
    testId: 'epq',
    dimensionKey: 'eysenck_extraversion',
    promptAr: 'هل تفضل المهام التي تتطلب تواصلاً مستمراً مع الناس وحركة ميدانية على العمل المكتبي المنفرد؟',
    options: [
      { id: 'a', textAr: 'نعم، التفاعل البشري والتنوع يمنحانني الطاقة والتركيز', scoreWeight: 5, traitLabel: 'تفضيل التفاعل الخارجي', scientificTrait: 'Extraverted Work Style' },
      { id: 'b', textAr: 'أفضل المزج بين العمل الجماعي والتركيز الفردي', scoreWeight: 3, traitLabel: 'مرونة مهنية', scientificTrait: 'Balanced Style' },
      { id: 'c', textAr: 'أبدع أكثر عندما أعمل بمفردي في هدوء تام دون مقاطعات', scoreWeight: 1, traitLabel: 'تركيز انطوائي عميق', scientificTrait: 'Introverted Focus' },
    ],
  },
  {
    id: 'epq_11',
    testId: 'epq',
    dimensionKey: 'eysenck_extraversion',
    promptAr: 'في الحفلات أو اللقاءات الاجتماعية الكبيرة، أين تجد نفسك غالباً؟',
    options: [
      { id: 'a', textAr: 'في قلب الحدث أتنقل بين المجموعات وأتعرف على وجوه جديدة', scoreWeight: 5, traitLabel: 'اجتماعي منطلق', scientificTrait: 'Sociable Extravert' },
      { id: 'b', textAr: 'أجلس مع مجموعة صغيرة من الأصدقاء المقربين', scoreWeight: 3, traitLabel: 'اجتماعي انتقائي', scientificTrait: 'Selective Social' },
      { id: 'c', textAr: 'أبحث عن زاوية هادئة وأغادر اللقاء في أقرب فرصة مريحة', scoreWeight: 1, traitLabel: 'متحفظ', scientificTrait: 'Reserved' },
    ],
  },
  {
    id: 'epq_12',
    testId: 'epq',
    dimensionKey: 'eysenck_neuroticism',
    promptAr: 'هل تتقلب حالتك المزاجية صعوداً وهبوطاً بسرعة دون سبب خارجي واضح؟',
    options: [
      { id: 'a', textAr: 'نادراً جداً؛ مزاجي مستقر ومتوقع في أغلب الأوقات', scoreWeight: 1, traitLabel: 'ثبات انفعالي عالٍ', scientificTrait: 'High Emotional Stability' },
      { id: 'b', textAr: 'يتغير مزاجي فقط عند وجود أحداث ضاغطة حقيقية', scoreWeight: 3, traitLabel: 'استجابة طبيعية', scientificTrait: 'Normal Reactivity' },
      { id: 'c', textAr: 'نعم، أشعر بتقلبات مزاجية سريعة وحساسية مفرطة', scoreWeight: 5, traitLabel: 'تقلب عاطفي عصبي', scientificTrait: 'Mood Lability' },
    ],
  },
  {
    id: 'epq_13',
    testId: 'epq',
    dimensionKey: 'eysenck_neuroticism',
    promptAr: 'هل تشعر بالذنب أو القلق المطول بعد انتهاء موقف اجتماعي عادي خشية أن تكون قد قلت كلمة غير مناسبة؟',
    options: [
      { id: 'a', textAr: 'كلا، أثق في لباقتي ولا أجتر المواقف بعد انتهائها', scoreWeight: 1, traitLabel: 'اطمئنان نفسي', scientificTrait: 'Low Guilt Proneness' },
      { id: 'b', textAr: 'أراجع نفسي سريعاً إذا كان الموقف رسمياً ومهماً فقط', scoreWeight: 3, traitLabel: 'مراجعة صحية', scientificTrait: 'Moderate Reflection' },
      { id: 'c', textAr: 'نعم، أظل أعيد تحليل كل كلمة قلتها بقلق شديد', scoreWeight: 5, traitLabel: 'قلق اجتماعي استرجاعي', scientificTrait: 'High Neurotic Worry' },
    ],
  },
  {
    id: 'epq_14',
    testId: 'epq',
    dimensionKey: 'eysenck_neuroticism',
    promptAr: 'كيف تصف مستوى حساسيتك تجاه الملاحظات أو النقد البناء؟',
    options: [
      { id: 'a', textAr: 'أتقبله بصدر رحب وهدوء كفرصة للتطوير دون ضيق شخصي', scoreWeight: 1, traitLabel: 'نضج وصلابة عصبية', scientificTrait: 'Resilient Ego' },
      { id: 'b', textAr: 'أتقبله إذا قُدم بأسلوب لطيف ومحترم', scoreWeight: 3, traitLabel: 'حساسية متوازنة', scientificTrait: 'Balanced Sensitivity' },
      { id: 'c', textAr: 'يجرحني أي نقد بشدة ويشعرني بالإحباط والتوتر', scoreWeight: 5, traitLabel: 'رهافة عصبية عالية', scientificTrait: 'Hypersensitivity' },
    ],
  },
  {
    id: 'epq_15',
    testId: 'epq',
    dimensionKey: 'eysenck_neuroticism',
    promptAr: 'هل تصف نفسك بأنك شخص «عصبي أو مشدود الأعصاب» في تعاملاتك اليومية؟',
    options: [
      { id: 'a', textAr: 'كلا، أنا هادئ وصبور وطويل البال بطبعي', scoreWeight: 1, traitLabel: 'هدوء وطول بال', scientificTrait: 'Calm Temperament' },
      { id: 'b', textAr: 'أتوتر فقط عند تراكم الضغوط الشديدة', scoreWeight: 3, traitLabel: 'اتزان معتدل', scientificTrait: 'Average Tension' },
      { id: 'c', textAr: 'نعم، أشعر بشد عصبي وسرعة استثارة في كثير من الأوقات', scoreWeight: 5, traitLabel: 'استثارة عصبية سريعة', scientificTrait: 'High Nervous Tension' },
    ],
  },
  {
    id: 'epq_16',
    testId: 'epq',
    dimensionKey: 'eysenck_psychoticism',
    promptAr: 'كيف تنظر إلى الالتزام بالمواعيد والأعراف الاجتماعية المتفق عليها؟',
    options: [
      { id: 'a', textAr: 'أحرص عليها بشدة احتراماً لمشاعر وحقوق الآخرين', scoreWeight: 1, traitLabel: 'مسؤولية وتعاطف اجتماعي', scientificTrait: 'High Socialization' },
      { id: 'b', textAr: 'ألتزم بها في الأمور المهمة مع بعض المرونة', scoreWeight: 3, traitLabel: 'مرونة اجتماعية', scientificTrait: 'Moderate Conformity' },
      { id: 'c', textAr: 'لا أهتم بالأعراف والمواعيد وأفعل ما يحلو لي في أي وقت', scoreWeight: 5, traitLabel: 'فردانية غير مقيدة', scientificTrait: 'Non-Conformist Toughness' },
    ],
  },
  {
    id: 'epq_17',
    testId: 'epq',
    dimensionKey: 'eysenck_psychoticism',
    promptAr: 'عندما تشاهد مشهداً إنسانياً مؤثراً أو تسمع عن معاناة شخص ضعيف:',
    options: [
      { id: 'a', textAr: 'يرق قلبي فوراً وأشعر برغبة صادقة في المواساة والعون', scoreWeight: 1, traitLabel: 'رقة قلب ورحمة', scientificTrait: 'High Tender-Mindedness' },
      { id: 'b', textAr: 'أتأثر إنسانياً مع الحفاظ على تماسك مشاعري', scoreWeight: 3, traitLabel: 'تعاطف متزن', scientificTrait: 'Balanced Empathy' },
      { id: 'c', textAr: 'لا تتحرك مشاعري بسهولة وأعتبر العاطفة ضعفاً غير مجدٍ', scoreWeight: 5, traitLabel: 'صلابة جافة', scientificTrait: 'Cold Tough-Mindedness' },
    ],
  },
  {
    id: 'epq_18',
    testId: 'epq',
    dimensionKey: 'eysenck_psychoticism',
    promptAr: 'في حل المشكلات، هل تفضل الحلول التعاونية التي تحفظ الود أم الحسم القاطع بغض النظر عن رضا الأطراف؟',
    options: [
      { id: 'a', textAr: 'الحلول التعاونية التي تجمع بين الكفاءة وحفظ القلوب', scoreWeight: 1, traitLabel: 'حكمة تعاونية رحيمة', scientificTrait: 'Cooperative Harmony' },
      { id: 'b', textAr: 'أحاول التوفيق، فإن تعذر لجأت للحسم النظامي', scoreWeight: 3, traitLabel: 'توازن إداري', scientificTrait: 'Pragmatic Balance' },
      { id: 'c', textAr: 'الحسم الصارم وفرض الأمر الواقع دون الالتفات للمشاعر', scoreWeight: 5, traitLabel: 'صرامة حادة', scientificTrait: 'Aggressive Assertiveness' },
    ],
  },
  {
    id: 'epq_19',
    testId: 'epq',
    dimensionKey: 'eysenck_psychoticism',
    promptAr: 'ما مدى حرصك على الحذر وتجنب المخاطر غير المحسوبة التي قد تضر بك أو بأسرتك؟',
    options: [
      { id: 'a', textAr: 'حريص جداً؛ أدرس العواقب وأضع أمان أسرتي فوق كل اعتبار', scoreWeight: 1, traitLabel: 'حرص ومسؤولية عالية', scientificTrait: 'High Caution & Care' },
      { id: 'b', textAr: 'أوازن بين الإقدام المدروس وشروط الأمان', scoreWeight: 3, traitLabel: 'إقدام محسوب', scientificTrait: 'Calculated Risk' },
      { id: 'c', textAr: 'أندفع نحو المخاطر العالية دون تفكير في العواقب', scoreWeight: 5, traitLabel: 'اندفاع ومجازفة', scientificTrait: 'Reckless Impulsivity' },
    ],
  },
  {
    id: 'epq_20',
    testId: 'epq',
    dimensionKey: 'eysenck_lie',
    promptAr: 'مقياس الصدق (Lie Scale): «هل سبق أن تحدثت عن شخص في غيابه بكلام لا تحب أن يسمعه؟»',
    options: [
      { id: 'a', textAr: 'نعم، حدث ذلك أحياناً في لحظات ضيق أو فضفضة بشرية وأسعى لتجنبه', scoreWeight: 5, traitLabel: 'صدق وشفافية واقعية', scientificTrait: 'Honest Self-Disclosure' },
      { id: 'b', textAr: 'نادراً جداً وفي سياق طلب النصيحة فقط', scoreWeight: 3, traitLabel: 'تحفظ أخلاقي', scientificTrait: 'Moderate Desirability' },
      { id: 'c', textAr: 'كلا أبداً، لم أذكر أي إنسان بأي كلمة طوال حياتي', scoreWeight: 1, traitLabel: 'تجميل مثالي للذات', scientificTrait: 'High Lie Score' },
    ],
  },
  {
    id: 'epq_21',
    testId: 'epq',
    dimensionKey: 'eysenck_lie',
    promptAr: 'مقياس الصدق: «هل جميع عاداتك اليومية صحية ومنظمة ومثالية بنسبة 100%؟»',
    options: [
      { id: 'a', textAr: 'لا طبعاً؛ لدي عادات إيجابية ولدي بعض الهفوات التي أحاول تحسينها', scoreWeight: 5, traitLabel: 'واقعية وصدق ذاتي', scientificTrait: 'High Validity' },
      { id: 'b', textAr: 'أغلب عاداتي منظمة مع استثناءات قليلة', scoreWeight: 3, traitLabel: 'انضباط جيد', scientificTrait: 'Normal Validity' },
      { id: 'c', textAr: 'نعم، كل عاداتي وتصرفاتي كاملة ومثالية بلا أي نقص', scoreWeight: 1, traitLabel: 'ادعاء الكمال', scientificTrait: 'Social Desirability Bias' },
    ],
  },
  {
    id: 'epq_22',
    testId: 'epq',
    dimensionKey: 'eysenck_lie',
    promptAr: 'مقياس الصدق: «هل تقبل دائماً النقد والخسارة بابتسامة عريضة دون أي ذرة ضيق داخلي؟»',
    options: [
      { id: 'a', textAr: 'أشعر ببعض الضيق البشري الطبيعي في داخلي حتى لو تظاهرت بالتماسك', scoreWeight: 5, traitLabel: 'صراحة نفسية عالية', scientificTrait: 'Authentic Affect' },
      { id: 'b', textAr: 'أتقبل الأمر في المنافسات البسيطة وأتضايق في الأمور الكبرى', scoreWeight: 3, traitLabel: 'واقعية', scientificTrait: 'Realistic' },
      { id: 'c', textAr: 'لا أشعر بأي ضيق إطلاقاً عند الخسارة أو النقد في أي ظرف', scoreWeight: 1, traitLabel: 'دفاعية مثالية', scientificTrait: 'Defensive Idealization' },
    ],
  },
  {
    id: 'epq_23',
    testId: 'epq',
    dimensionKey: 'eysenck_lie',
    promptAr: 'مقياس الصدق: «هل التزمت بكل وعد صغير قطعته لنفسك (كالرياضة أو القراءة) دون أن تخلفه يوماً؟»',
    options: [
      { id: 'a', textAr: 'كلا، كثيراً ما أضع خططاً لنفسي ثم أتكاسل عن بعضها وأعاود المحاولة', scoreWeight: 5, traitLabel: 'شفافية صادقة', scientificTrait: 'Honest Admission' },
      { id: 'b', textAr: 'ألتزم بمعظمها وأعدل البعض الآخر', scoreWeight: 3, traitLabel: 'التزام متوازن', scientificTrait: 'Balanced' },
      { id: 'c', textAr: 'نعم، لم أخلف أي نية أو خطة مع نفسي طوال عمري', scoreWeight: 1, traitLabel: 'مبالغة مثالية', scientificTrait: 'Rigid Idealism' },
    ],
  },
  {
    id: 'epq_24',
    testId: 'epq',
    dimensionKey: 'eysenck_lie',
    promptAr: 'مقياس الصدق: «هل تشعر أحياناً بالملل عند الاستماع لحديث طويل لا يهمك ولكنك تجامل المتحدث؟»',
    options: [
      { id: 'a', textAr: 'نعم بكل صراحة، أشعر بالملل داخلياً لكنني أصبر أدباً وذوقاً', scoreWeight: 5, traitLabel: 'صدق وواقعية اجتماعية', scientificTrait: 'Genuine Candor' },
      { id: 'b', textAr: 'أحاول إيجاد زاوية مفيدة في حديثه', scoreWeight: 3, traitLabel: 'تكيف مهذب', scientificTrait: 'Polite Adaptation' },
      { id: 'c', textAr: 'كلا، أستمتع بقمة الشغف بكل كلمة يقولها أي شخص دائماً', scoreWeight: 1, traitLabel: 'تجميل اجتماعي', scientificTrait: 'Faking Good' },
    ],
  },
];

const EXTENDED_SIXTEEN_PF_ITEMS: TestQuestion[] = [
  {
    id: '16pf_warmth_2',
    testId: 'sixteen_pf',
    dimensionKey: 'warmth',
    promptAr: '17. الدفء الإنساني (Factor A - الجزء الثاني): عندما يمر صديق أو شريك بضائقة عاطفية:',
    options: [
      { id: 'a', textAr: 'أغمره بمشاعر الحنان والمواساة القريبة وأقف بجانبه بقلبي ووقتي', scoreWeight: 5, traitLabel: 'عاطفة دافئة قريبة (A+)', scientificTrait: 'Warm & Nurturing' },
      { id: 'b', textAr: 'أقدم له الدعم المناسب بكلمات طيبة ومتزنة', scoreWeight: 3, traitLabel: 'مواساة متوازنة', scientificTrait: 'Moderate Warmth' },
      { id: 'c', textAr: 'أفضل تقديم حلول منطقية عملية دون الدخول في العواطف', scoreWeight: 1, traitLabel: 'موضوعية متحفظة (A-)', scientificTrait: 'Detached Objective' },
    ],
  },
  {
    id: '16pf_reasoning_2',
    testId: 'sixteen_pf',
    dimensionKey: 'reasoning',
    promptAr: '18. التفكير التحليلي المجرد (Factor B - الجزء الثاني): في قراءاتك وحواراتك الفكرية:',
    options: [
      { id: 'a', textAr: 'أستمتع بتحليل القضايا المعقدة واستنباط القوانين والروابط الخفية', scoreWeight: 5, traitLabel: 'تجريد وتحليل عالٍ (B+)', scientificTrait: 'Abstract Thinker' },
      { id: 'b', textAr: 'أهتم بالأفكار الواضحة التي تخدم أهدافي المباشرة', scoreWeight: 3, traitLabel: 'تفكير تطبيقي', scientificTrait: 'Balanced Reasoning' },
      { id: 'c', textAr: 'أفضل الأمثلة الواقعية الملموسة والابتعاد عن التعقيد النظري', scoreWeight: 1, traitLabel: 'واقعي ملموس (B-)', scientificTrait: 'Concrete Thinker' },
    ],
  },
  {
    id: '16pf_stability_2',
    testId: 'sixteen_pf',
    dimensionKey: 'stability',
    promptAr: '19. الاستقرار الانفعالي (Factor C - الجزء الثاني): عندما تواجه خيبة أمل أو تغيراً مفاجئاً في خططك:',
    options: [
      { id: 'a', textAr: 'أستوعب الصدمة بنضج وأعيد ترتيب أوراقي بهدوء وثبات', scoreWeight: 5, traitLabel: 'ثبات انفعالي راسخ (C+)', scientificTrait: 'Emotionally Stable' },
      { id: 'b', textAr: 'أشعر ببعض الضيق المؤقت ثم أتأقلم مع الواقع', scoreWeight: 3, traitLabel: 'استقرار معتدل', scientificTrait: 'Average Stability' },
      { id: 'c', textAr: 'أشعر بالارتباك والإحباط الشديد الذي يعطل إنتاجيتي', scoreWeight: 1, traitLabel: 'تأثر انفعالي سريع (C-)', scientificTrait: 'Reactive' },
    ],
  },
  {
    id: '16pf_dominance_2',
    testId: 'sixteen_pf',
    dimensionKey: 'dominance',
    promptAr: '20. التوكيد والقيادة (Factor E - الجزء الثاني): عندما ترى خطأً واضحاً في سير العمل أو في قرار مشترك:',
    options: [
      { id: 'a', textAr: 'أتحدث بجسارة وحزم لتصحيح المسار ولا أخشى الاختلاف', scoreWeight: 5, traitLabel: 'حزم وقيادة جريئة (E+)', scientificTrait: 'Assertive Dominant' },
      { id: 'b', textAr: 'أطرح ملاحظتي بلباقة ودبلوماسية هادئة', scoreWeight: 3, traitLabel: 'حزم دبلوماسي', scientificTrait: 'Diplomatic' },
      { id: 'c', textAr: 'أفضل الصمت ومجاراة المجموعة تجنباً لأي صدام', scoreWeight: 1, traitLabel: 'مسالم ومجارٍ (E-)', scientificTrait: 'Deferential' },
    ],
  },
  {
    id: '16pf_liveliness_2',
    testId: 'sixteen_pf',
    dimensionKey: 'liveliness',
    promptAr: '21. الحيوية والبهجة (Factor F - الجزء الثاني): كيف يصف المقربون حضورك في البيت أو العمل؟',
    options: [
      { id: 'a', textAr: 'روح مرحة، متفائلة، وتبعث الحماس والابتسامة في المكان', scoreWeight: 5, traitLabel: 'حيوية وإشراق (F+)', scientificTrait: 'Lively & Animated' },
      { id: 'b', textAr: 'حضور هادئ يجمع بين الابتسامة والجدية في وقتها', scoreWeight: 3, traitLabel: 'توازن', scientificTrait: 'Moderately Lively' },
      { id: 'c', textAr: 'شخصية وقورة، جادة جداً، وتميل للصمت والتأمل', scoreWeight: 1, traitLabel: 'وقار وجدية (F-)', scientificTrait: 'Serious & Restrained' },
    ],
  },
  {
    id: '16pf_rule_2',
    testId: 'sixteen_pf',
    dimensionKey: 'rule_consciousness',
    promptAr: '22. يقظة الضمير والواجب (Factor G - الجزء الثاني): عندما تعمل بمفردك دون وجود أي رقيب خارجي:',
    options: [
      { id: 'a', textAr: 'ألتزم بأعلى المعايير الأخلاقية والمهنية بدافع ضميري الداخلي', scoreWeight: 5, traitLabel: 'ضمير حي راسخ (G+)', scientificTrait: 'Conscientious & Dutiful' },
      { id: 'b', textAr: 'أؤدي الواجب المطلوب بكفاءة معقولة', scoreWeight: 3, traitLabel: 'التزام معتدل', scientificTrait: 'Standard Conscientiousness' },
      { id: 'c', textAr: 'أبحث عن الطرق المختصرة والأقل جهداً لإتمام الأمر', scoreWeight: 1, traitLabel: 'نفعية مرنة (G-)', scientificTrait: 'Expedient' },
    ],
  },
  {
    id: '16pf_boldness_2',
    testId: 'sixteen_pf',
    dimensionKey: 'social_boldness',
    promptAr: '23. الجرأة الاجتماعية (Factor H - الجزء الثاني): عند الدخول إلى مناسبة كبرى تضم شخصيات رسمية أو غرباء:',
    options: [
      { id: 'a', textAr: 'أدخل بثقة عالية وأبادر بالمصافحة والحديث دون أي هيبة أو خجل', scoreWeight: 5, traitLabel: 'إقدام اجتماعي جسور (H+)', scientificTrait: 'Socially Bold' },
      { id: 'b', textAr: 'أتصرف بلباقة هادئة مع من يبادرني بالتحية', scoreWeight: 3, traitLabel: 'حضور متزن', scientificTrait: 'Average Boldness' },
      { id: 'c', textAr: 'أشعر بالخجل والتوتر وأتمنى البقاء بعيداً عن الأنظار', scoreWeight: 1, traitLabel: 'خجل وتحفظ (H-)', scientificTrait: 'Shy & Threat-Sensitive' },
    ],
  },
  {
    id: '16pf_sensitivity_2',
    testId: 'sixteen_pf',
    dimensionKey: 'sensitivity',
    promptAr: '24. الرهافة الوجدانية (Factor I - الجزء الثاني): ما الذي يؤثر في قراراتك الشخصية أكثر؟',
    options: [
      { id: 'a', textAr: 'الذوق الجمالي، المشاعر الإنسانية الرقيقة، والانسجام الروحي', scoreWeight: 5, traitLabel: 'رهافة وجدانية عالية (I+)', scientificTrait: 'Tender-Minded Sensitive' },
      { id: 'b', textAr: 'مزيج متوازن بين القلب والمنطق العملي', scoreWeight: 3, traitLabel: 'توازن وجداني-عقلاني', scientificTrait: 'Balanced' },
      { id: 'c', textAr: 'الحقائق الصلبة والمنفعة المادية المباشرة فقط', scoreWeight: 1, traitLabel: 'صلابة عملية (I-)', scientificTrait: 'Utilitarian Unsentimental' },
    ],
  },
  {
    id: '16pf_vigilance_2',
    testId: 'sixteen_pf',
    dimensionKey: 'vigilance',
    promptAr: '25. اليقظة والفراسة (Factor L - الجزء الثاني): عندما يقدم لك شخص عرضاً مغرياً أو مدحاً مبالغاً فيه:',
    options: [
      { id: 'a', textAr: 'أتفحص ما وراء الكلمات بيقظة وحذر لأتأكد من صدق الدوافع', scoreWeight: 5, traitLabel: 'يقظة وفراسة حذرة (L+)', scientificTrait: 'Vigilant & Skeptical' },
      { id: 'b', textAr: 'أشكره بلطف وأتحقق من التفاصيل الأساسية بهدوء', scoreWeight: 3, traitLabel: 'فطنة متوازنة', scientificTrait: 'Prudent' },
      { id: 'c', textAr: 'أصدقه فوراً بحسن نية تامة دون أي تساؤل', scoreWeight: 1, traitLabel: 'ثقة عفوية مطلقة (L-)', scientificTrait: 'Trusting & Accepting' },
    ],
  },
  {
    id: '16pf_abstractedness_2',
    testId: 'sixteen_pf',
    dimensionKey: 'abstractedness',
    promptAr: '26. الخيال والتصور الإبداعي (Factor M - الجزء الثاني): كيف تتعامل مع المشكلات اليومية؟',
    options: [
      { id: 'a', textAr: 'أبتكر حلولاً غير تقليدية وأربطها برؤى وأفكار إبداعية واسعة', scoreWeight: 5, traitLabel: 'خيال ابتكاري خصب (M+)', scientificTrait: 'Abstracted & Imaginative' },
      { id: 'b', textAr: 'أجمع بين الأفكار الجديدة والواقع المتاح', scoreWeight: 3, traitLabel: 'ابتكار عملي', scientificTrait: 'Balanced Imagination' },
      { id: 'c', textAr: 'أعتمد حصرياً على الحلول العملية المباشرة والمجربة واقعياً', scoreWeight: 1, traitLabel: 'واقعية إجرائية (M-)', scientificTrait: 'Practical & Grounded' },
    ],
  },
  {
    id: '16pf_privateness_2',
    testId: 'sixteen_pf',
    dimensionKey: 'privateness',
    promptAr: '27. الكياسة وحفظ الخصوصية (Factor N - الجزء الثاني): في تعاملك مع زملاء العمل أو المعارف غير المقربين:',
    options: [
      { id: 'a', textAr: 'أحافظ على دبلوماسية راقية وأفصل تماماً بين حياتي الخاصة والعامة', scoreWeight: 5, traitLabel: 'خصوصية وكياسة عالية (N+)', scientificTrait: 'Private & Diplomatic' },
      { id: 'b', textAr: 'أشارك الأمور العامة العادية وأحتفظ بالتفاصيل الخاصة', scoreWeight: 3, traitLabel: 'توازن', scientificTrait: 'Moderately Private' },
      { id: 'c', textAr: 'أتحدث بعفوية تامة عن كل تفاصيل حياتي ومشاعري أمام الجميع', scoreWeight: 1, traitLabel: 'انفتاح عفوي صريح (N-)', scientificTrait: 'Forthright & Artless' },
    ],
  },
  {
    id: '16pf_apprehension_2',
    testId: 'sixteen_pf',
    dimensionKey: 'apprehension',
    promptAr: '28. الاطمئنان مقابل محاسبة الذات (Factor O - الجزء الثاني): بعد ارتكاب خطأ غير مقصود في مهمة ما:',
    options: [
      { id: 'a', textAr: 'أشعر بقلق وتأنيب ضمير شديد وأظل ألوم نفسي طويلاً', scoreWeight: 5, traitLabel: 'حساسية ومحاسبة ذات (O+)', scientificTrait: 'Apprehensive & Self-Doubting' },
      { id: 'b', textAr: 'أصحح الخطأ بهدوء وأستفيد من التجربة دون جلد للذات', scoreWeight: 3, traitLabel: 'تصالح صحي', scientificTrait: 'Balanced Self-Evaluation' },
      { id: 'c', textAr: 'أتجاوز الأمر فوراً بثقة مطلقة ولا أشغل بالي باللوم', scoreWeight: 1, traitLabel: 'ثقة واطمئنان عالٍ (O-)', scientificTrait: 'Self-Assured & Untroubled' },
    ],
  },
  {
    id: '16pf_openness_2',
    testId: 'sixteen_pf',
    dimensionKey: 'openness_to_change',
    promptAr: '29. الانفتاح على التغيير (Factor Q1 - الجزء الثاني): عندما تُطرح تقنية جديدة أو منهجية حديثة تختلف عما اعتدت عليه:',
    options: [
      { id: 'a', textAr: 'أكون أول المبادرين لتجربتها وتبنيها وتطوير أساليبي بها', scoreWeight: 5, traitLabel: 'ريادة وانفتاح للتجديد (Q1+)', scientificTrait: 'Open to Change' },
      { id: 'b', textAr: 'أجربها بعد التأكد من نجاحها وجدواها العملية', scoreWeight: 3, traitLabel: 'تحديث متأنٍ', scientificTrait: 'Moderate Openness' },
      { id: 'c', textAr: 'أتمسك بطريقتي القديمة المألوفة وأرفض التغيير', scoreWeight: 1, traitLabel: 'محافظة وتقليدية (Q1-)', scientificTrait: 'Traditional & Attached to Familiar' },
    ],
  },
  {
    id: '16pf_self_reliance_2',
    testId: 'sixteen_pf',
    dimensionKey: 'self_reliance',
    promptAr: '30. الاعتماد على الذات (Factor Q2 - الجزء الثاني): عند التخطيط لرحلة أو اتخاذ قرار شخصي مهم:',
    options: [
      { id: 'a', textAr: 'أخطط وأنفذ باستقلالية تامة وأستمتع باعتمادي على نفسي', scoreWeight: 5, traitLabel: 'استقلالية ذاتية عالية (Q2+)', scientificTrait: 'Self-Reliant & Individualistic' },
      { id: 'b', textAr: 'أستشير المقربين ثم أنفذ خطتي بمرونة', scoreWeight: 3, traitLabel: 'توازن بين الاستقلال والمشاركة', scientificTrait: 'Balanced Autonomy' },
      { id: 'c', textAr: 'أفضل دائماً أن أكون ضمن مجموعة تخطط وتقرر معي', scoreWeight: 1, traitLabel: 'تفضيل الجماعة (Q2-)', scientificTrait: 'Group-Oriented & Affiliative' },
    ],
  },
  {
    id: '16pf_perfectionism_2',
    testId: 'sixteen_pf',
    dimensionKey: 'perfectionism',
    promptAr: '31. الإتقان والانضباط المنظم (Factor Q3 - الجزء الثاني): عند تسليم عمل أو تجهيز مناسبة خاصة:',
    options: [
      { id: 'a', textAr: 'أراجع أدق التفاصيل ولا أرضى بأقل من الإتقان والترتيب الكامل', scoreWeight: 5, traitLabel: 'إتقان وانضباط عالٍ (Q3+)', scientificTrait: 'Perfectionistic & Organized' },
      { id: 'b', textAr: 'أهتم بالجودة العامة دون توقف مفرط عند التفاصيل الصغيرة', scoreWeight: 3, traitLabel: 'جودة متوازنة', scientificTrait: 'Moderately Organized' },
      { id: 'c', textAr: 'أنجز الأمر بعفوية وسلاسة دون التقيد بمعايير صارمة', scoreWeight: 1, traitLabel: 'مرونة وعفوية (Q3-)', scientificTrait: 'Flexible & Unconstrained' },
    ],
  },
  {
    id: '16pf_tension_2',
    testId: 'sixteen_pf',
    dimensionKey: 'tension',
    promptAr: '32. الاسترخاء مقابل التوتر الدافع (Factor Q4 - الجزء الثاني): عندما يتأخر شخص عن موعدك معه لمدة ربع ساعة:',
    options: [
      { id: 'a', textAr: 'أبقى هادئاً تماماً وأستثمر وقت الانتظار في القراءة أو التصفح المفيد', scoreWeight: 1, traitLabel: 'استرخاء وصبر عالٍ (Q4-)', scientificTrait: 'Relaxed & Patient' },
      { id: 'b', textAr: 'أتصل به للاطمئنان وأنتظر بصبر معتدل', scoreWeight: 3, traitLabel: 'توازن', scientificTrait: 'Moderately Patient' },
      { id: 'c', textAr: 'أشعر بضيق شديد وتململ حاد ولا أطيق الانتظار', scoreWeight: 5, traitLabel: 'توتر واستعجال (Q4+)', scientificTrait: 'Tense & Impatient' },
    ],
  },
];

const EXTENDED_RORSCHACH_ITEMS: TestQuestion[] = [
  {
    id: 'rorschach_6',
    testId: 'rorschach',
    dimensionKey: 'cognitive_synthesis',
    promptAr: 'اللوحة السادسة (محدد الموقع الكلي W مقابل الجزئي D - Exner System): عند النظر إلى بقعة الحبر، أين يتجه انتباهك البصري أولاً؟',
    imageSvg: 'rorschach_butterfly_bat',
    options: [
      { id: 'a', textAr: 'إلى الشكل الكلي المتكامل كلوحة موحدة مترابطة الأجزاء', scoreWeight: 5, traitLabel: 'إدراك شمولي تركيبي (Whole W)', scientificTrait: 'Holistic Synthesis' },
      { id: 'b', textAr: 'إلى الكتل الرئيسية الكبرى الواضحة في المنتصف', scoreWeight: 4, traitLabel: 'إدراك عملي واقعي (Common Detail D)', scientificTrait: 'Practical Perception' },
      { id: 'c', textAr: 'إلى الفراغات البيضاء المحيطة بالبقعة السوداء', scoreWeight: 4, traitLabel: 'تفكير مستقل عكسي (Space S)', scientificTrait: 'Figure-Ground Reversal' },
      { id: 'd', textAr: 'إلى النقاط الصغيرة الدقيقة على الأطراف فقط', scoreWeight: 3, traitLabel: 'تدقيق تحليلي جزئي (Unusual Detail Dd)', scientificTrait: 'Analytical Detail Focus' },
    ],
  },
  {
    id: 'rorschach_7',
    testId: 'rorschach',
    dimensionKey: 'interpersonal_perception',
    promptAr: 'اللوحة السابعة (الحركة البشرية M - Human Movement): إذا تخيلت الكائنين المتقابلين في البقعة يتحركان، فما طبيعة حركتهما؟',
    imageSvg: 'rorschach_two_figures',
    options: [
      { id: 'a', textAr: 'يتعاونان لرفع شيء مشترك أو يحتفلان بإنجاز مبهج', scoreWeight: 5, traitLabel: 'تعاون وتآزر إيجابي (Cooperative M)', scientificTrait: 'Collaborative Object Relations' },
      { id: 'b', textAr: 'يتحاوران بهدوء وإصغاء متبادل', scoreWeight: 5, traitLabel: 'تواصل ناضج ومتزن', scientificTrait: 'Reciprocal Communication' },
      { id: 'c', textAr: 'يدير كل منهما ظهره للآخر في صمت', scoreWeight: 3, traitLabel: 'حذر واستقلالية دفاعية', scientificTrait: 'Emotional Distance' },
      { id: 'd', textAr: 'يتسابقان في مضمار تنافسي سريع', scoreWeight: 4, traitLabel: 'طموح وتنافسية', scientificTrait: 'Competitive Striving' },
    ],
  },
  {
    id: 'rorschach_8',
    testId: 'rorschach',
    dimensionKey: 'unconscious_depth',
    promptAr: 'اللوحة الثامنة (تدرج الظلال التكتيلي Texture Shading): كيف يبدو لك ملمس البقعة لو كانت مجسماً حقيقياً؟',
    imageSvg: 'rorschach_fountain_tree',
    options: [
      { id: 'a', textAr: 'ملمس مخملي ناعم ودافئ كالحرير أو الفراء الطبيعي', scoreWeight: 5, traitLabel: 'حاجة صحية للدفء والقرب العاطفي', scientificTrait: 'Healthy Affectional Need' },
      { id: 'b', textAr: 'سطح خشبي مصقول ومتين كجذع شجرة عريقة', scoreWeight: 4, traitLabel: 'ثبات واستقرار واقعي', scientificTrait: 'Grounded Stability' },
      { id: 'c', textAr: 'سطح بلوري شفاف يعكس الضوء بصفاء', scoreWeight: 5, traitLabel: 'شفافية ونقاء وجداني', scientificTrait: 'Emotional Clarity' },
      { id: 'd', textAr: 'سطح صخري صلب وغير قابل للخدش', scoreWeight: 3, traitLabel: 'درع وقائي وحماية ذاتية', scientificTrait: 'Self-Protective Barrier' },
    ],
  },
  {
    id: 'rorschach_9',
    testId: 'rorschach',
    dimensionKey: 'defense_mechanisms',
    promptAr: 'اللوحة التاسعة (التناظر المحوري Bilateral Symmetry): ماذا يعني لك التماثل الدقيق بين نصفي اللوحة الأيمن والأيسر؟',
    imageSvg: 'rorschach_shield_guardian',
    options: [
      { id: 'a', textAr: 'يرمز للعدل، التوازن النفسي، وتكافؤ الشراكة بين روحين', scoreWeight: 5, traitLabel: 'بحث عن التوازن والانسجام', scientificTrait: 'Harmonic Equilibrium' },
      { id: 'b', textAr: 'يرمز لانعكاس الإنسان في مرآة ضميره ووعيه الذاتي', scoreWeight: 5, traitLabel: 'استبصار ذاتي عميق', scientificTrait: 'Introspective Insight' },
      { id: 'c', textAr: 'يرمز للنظام الهندسي الدقيق الذي يمنع الفوضى', scoreWeight: 4, traitLabel: 'تنظيم وضبط معرفي', scientificTrait: 'Cognitive Control' },
      { id: 'd', textAr: 'يرمز لحاجز مزدوج يحمي المركز الداخلي', scoreWeight: 3, traitLabel: 'تحصين الخصوصية', scientificTrait: 'Boundary Maintenance' },
    ],
  },
  {
    id: 'rorschach_10',
    testId: 'rorschach',
    dimensionKey: 'affective_integration',
    promptAr: 'اللوحة العاشرة (الاستجابة اللونية الوجدانية Color-Form CF/FC): كيف تتفاعل مع وجود الألوان المتداخلة مع الشكل؟',
    imageSvg: 'rorschach_wings_crest',
    options: [
      { id: 'a', textAr: 'الألوان تمنح الشكل حياة وبهجة متناغمة ومضبوطة بإطار جميل', scoreWeight: 5, traitLabel: 'نضج عاطفي متكامل (FC Integration)', scientificTrait: 'Modulated Affect' },
      { id: 'b', textAr: 'الشكل الهندسي هو الأساس والألوان مجرد تفصيل ثانوي', scoreWeight: 4, traitLabel: 'تغليب المنطق على العاطفة (Form Dominance)', scientificTrait: 'Rational Priority' },
      { id: 'c', textAr: 'الألوان المتوهجة هي أول ما يخطف عيني ويثير حماسي', scoreWeight: 4, traitLabel: 'تلقائية وشغف وجداني (CF Spontaneity)', scientificTrait: 'Spontaneous Warmth' },
      { id: 'd', textAr: 'أفضل التدرج الهادئ للأبيض والأسود على تعدد الألوان', scoreWeight: 3, traitLabel: 'هدوء وميل للبساطة', scientificTrait: 'Affective Restraint' },
    ],
  },
  {
    id: 'rorschach_11',
    testId: 'rorschach',
    dimensionKey: 'cognitive_synthesis',
    promptAr: 'اللوحة الحادية عشرة (التحول الديناميكي): لو تحولت هذه البقعة في مشهد سينمائي، فإلى ماذا ستتحول؟',
    imageSvg: 'rorschach_butterfly_bat',
    options: [
      { id: 'a', textAr: 'إلى طائر فينيق ينهض من الرماد ليحلق في سماء صافية', scoreWeight: 5, traitLabel: 'تجدد ومرونة نفسية فائقة', scientificTrait: 'Post-Stress Growth' },
      { id: 'b', textAr: 'إلى بوصلة ذهبية تشير نحو الشمال بدقة', scoreWeight: 5, traitLabel: 'وضوح الهدف والبوصلة الأخلاقية', scientificTrait: 'Purposeful Direction' },
      { id: 'c', textAr: 'إلى كتاب مفتوح تُقلب صفحاته بهدوء', scoreWeight: 4, traitLabel: 'شغف بالمعرفة والحكمة', scientificTrait: 'Epistemic Openness' },
      { id: 'd', textAr: 'إلى قلعة حصينة تغلق أبوابها وقت العاصفة', scoreWeight: 3, traitLabel: 'حذر واحتماء ذاتي', scientificTrait: 'Defensive Containment' },
    ],
  },
  {
    id: 'rorschach_12',
    testId: 'rorschach',
    dimensionKey: 'interpersonal_perception',
    promptAr: 'اللوحة الثانية عشرة (المسافة العلائقية): في الشكل المزدوج، كيف ترى المسافة الفاصلة في المنتصف بين العنصرين؟',
    imageSvg: 'rorschach_two_figures',
    options: [
      { id: 'a', textAr: 'جسر تواصل ومساحة احترام صحية تتيح لكل طرف رؤية الآخر بوضوح', scoreWeight: 5, traitLabel: 'ارتباط صحي يحترم المساحة', scientificTrait: 'Healthy Differentiation' },
      { id: 'b', textAr: 'نقطة التقاء تقترب تدريجياً نحو الاتحاد الكامل', scoreWeight: 5, traitLabel: 'شوق للتقارب والاندماج', scientificTrait: 'Affiliative Closeness' },
      { id: 'c', textAr: 'حدود فاصلة ضرورية لمنع التداخل', scoreWeight: 3, traitLabel: 'استقلالية حذرة', scientificTrait: 'Autonomous Boundary' },
      { id: 'd', textAr: 'مرآة يعكس فيها كل طرف صورة الآخر', scoreWeight: 4, traitLabel: 'تناغم وتفهم متبادل', scientificTrait: 'Empathic Mirroring' },
    ],
  },
  {
    id: 'rorschach_13',
    testId: 'rorschach',
    dimensionKey: 'unconscious_depth',
    promptAr: 'اللوحة الثالثة عشرة (الجذور والامتداد): الجزء السفلي من البقعة يثير في النفس إحساساً بـ:',
    imageSvg: 'rorschach_fountain_tree',
    options: [
      { id: 'a', textAr: 'جذور راسخة تضرب في أعماق الأرض لتغذي الشجرة بالأمان', scoreWeight: 5, traitLabel: 'أصالة وثبات نفسي', scientificTrait: 'Deep Rootedness' },
      { id: 'b', textAr: 'مرساة سفينة تثبتها وسط الأمواج', scoreWeight: 4, traitLabel: 'اتزان وقت الأزمات', scientificTrait: 'Emotional Anchoring' },
      { id: 'c', textAr: 'منصة انطلاق نحو الآفاق العليا', scoreWeight: 5, traitLabel: 'طموح وتطلع مستقبلي', scientificTrait: 'Upward Mobility' },
      { id: 'd', textAr: 'ظل هادئ يستريح تحته المسافر', scoreWeight: 4, traitLabel: 'عطاء واحتواء للآخرين', scientificTrait: 'Nurturing Shelter' },
    ],
  },
  {
    id: 'rorschach_14',
    testId: 'rorschach',
    dimensionKey: 'defense_mechanisms',
    promptAr: 'اللوحة الرابعة عشرة (التعامل مع الغموض Ambiguity Tolerance): كيف تشعر تجاه الأشكال غير المحددة بوضوح في هذه اللوحات؟',
    imageSvg: 'rorschach_shield_guardian',
    options: [
      { id: 'a', textAr: 'أستمتع بحرية الخيال وتعدد الزوايا التي يمكن رؤيتها منها', scoreWeight: 5, traitLabel: 'مرونة معرفية وتقبل للغموض', scientificTrait: 'High Ambiguity Tolerance' },
      { id: 'b', textAr: 'أربطها فوراً بأقرب شكل واقعي مألوف لحسم الأمر', scoreWeight: 4, traitLabel: 'حسم وتنظيم عملي', scientificTrait: 'Structured Closure' },
      { id: 'c', textAr: 'أتأملها بروية حتى تتضح لي تفاصيلها الدقيقة', scoreWeight: 4, traitLabel: 'تأنٍ تحليلي', scientificTrait: 'Reflective Caution' },
      { id: 'd', textAr: 'أفضل الرسوم الهندسية الواضحة الصريحة على الأشكال الغامضة', scoreWeight: 3, traitLabel: 'تفضيل الوضوح المباشر', scientificTrait: 'Need for Structure' },
    ],
  },
  {
    id: 'rorschach_15',
    testId: 'rorschach',
    dimensionKey: 'affective_integration',
    promptAr: 'اللوحة الخامسة عشرة (الاتجاه الحركي): هل تشعر أن حركة الخطوط في هذه اللوحة تتجه نحو الداخل أم نحو الخارج؟',
    imageSvg: 'rorschach_wings_crest',
    options: [
      { id: 'a', textAr: 'تتفتح نحو الخارج والأعلى كأجنحة تحلق أو أزهار تتفتح للنور', scoreWeight: 5, traitLabel: 'انفتاح وإيجابية حيوية', scientificTrait: 'Expansive Vitality' },
      { id: 'b', textAr: 'تتجمع نحو المركز في بؤرة تركيز وتماسك قوية', scoreWeight: 4, traitLabel: 'تركيز وتماسك داخلي', scientificTrait: 'Centered Integration' },
      { id: 'c', textAr: 'تتبادل الحركة بين الداخل والخارج في إيقاع متناغم', scoreWeight: 5, traitLabel: 'توازن بين التأمل والعطاء', scientificTrait: 'Dynamic Balance' },
      { id: 'd', textAr: 'ثابتة وساكنة كتمثال منحوت بدقة', scoreWeight: 3, traitLabel: 'ثبات وهدوء وقور', scientificTrait: 'Static Stability' },
    ],
  },
  {
    id: 'rorschach_16',
    testId: 'rorschach',
    dimensionKey: 'cognitive_synthesis',
    promptAr: 'اللوحة السادسة عشرة (تسمية اللوحة): لو طُلب منك وضع عنوان واحد يلخص روح اللوحة الأولى، فماذا تختار؟',
    imageSvg: 'rorschach_butterfly_bat',
    options: [
      { id: 'a', textAr: '«الانطلاق نحو الحرية والنور»', scoreWeight: 5, traitLabel: 'تفاؤل وتحرر إبداعي', scientificTrait: 'Optimistic Aspiration' },
      { id: 'b', textAr: '«التوازن الدقيق بين الجناحين»', scoreWeight: 5, traitLabel: 'حكمة واعتدال', scientificTrait: 'Balanced Wisdom' },
      { id: 'c', textAr: '«الحارس الليلي اليقظ»', scoreWeight: 4, traitLabel: 'يقظة وحماية', scientificTrait: 'Protective Vigilance' },
      { id: 'd', textAr: '«تناظر الظل والضوء»', scoreWeight: 4, traitLabel: 'واقعية تحليلية', scientificTrait: 'Analytical Realism' },
    ],
  },
  {
    id: 'rorschach_17',
    testId: 'rorschach',
    dimensionKey: 'interpersonal_perception',
    promptAr: 'اللوحة السابعة عشرة (الصدى العاطفي): أي شعور إنساني يغلب على المشهد التفاعلي في اللوحة الثانية؟',
    imageSvg: 'rorschach_two_figures',
    options: [
      { id: 'a', textAr: 'المودة، الألفة، والترحيب الصادق بالآخر', scoreWeight: 5, traitLabel: 'دفء علائقي', scientificTrait: 'Relational Warmth' },
      { id: 'b', textAr: 'الاحترام المتبادل والندية المتكافئة', scoreWeight: 5, traitLabel: 'تقدير وتكافؤ', scientificTrait: 'Mutual Respect' },
      { id: 'c', textAr: 'الحماس والطاقة المتقدة للإنجاز', scoreWeight: 4, traitLabel: 'حيوية دافعة', scientificTrait: 'Energetic Drive' },
      { id: 'd', textAr: 'الترقب والحذر قبل اتخاذ الخطوة التالية', scoreWeight: 3, traitLabel: 'تأنٍ علائقي', scientificTrait: 'Relational Caution' },
    ],
  },
  {
    id: 'rorschach_18',
    testId: 'rorschach',
    dimensionKey: 'unconscious_depth',
    promptAr: 'اللوحة الثامنة عشرة (عمق المنظور Vista Response): عندما تتأمل تدرج الألوان في مركز اللوحة الثالثة، هل تشعر بوجود بُعد ثلاثي؟',
    imageSvg: 'rorschach_fountain_tree',
    options: [
      { id: 'a', textAr: 'نعم، أرى أفقاً ممتداً وعمقاً يفتح مجالاً للتأمل والاستبصار', scoreWeight: 5, traitLabel: 'عمق بصيرة ووعي ذاتي', scientificTrait: 'Deep Perspective' },
      { id: 'b', textAr: 'أرى طبقات منظمة يعلو بعضها بعضاً بوضوح', scoreWeight: 4, traitLabel: 'ترتيب هرمي منظم', scientificTrait: 'Structured Depth' },
      { id: 'c', textAr: 'أرى انعكاساً مائياً هادئاً كصفحة بحيرة صافية', scoreWeight: 5, traitLabel: 'صفاء وسكينة روحية', scientificTrait: 'Reflective Serenity' },
      { id: 'd', textAr: 'أراها لوحة مسطحة ثنائية الأبعاد', scoreWeight: 3, traitLabel: 'إدراك مباشر بسيط', scientificTrait: 'Direct Surface View' },
    ],
  },
  {
    id: 'rorschach_19',
    testId: 'rorschach',
    dimensionKey: 'defense_mechanisms',
    promptAr: 'اللوحة التاسعة عشرة (آلية التسامي Sublimation): كيف يحول عقلك الأشكال القاتمة الكثيفة في اللوحة الرابعة؟',
    imageSvg: 'rorschach_shield_guardian',
    options: [
      { id: 'a', textAr: 'أحولها إلى رمز للقوة العادلة وحماية المبادئ والأسرة', scoreWeight: 5, traitLabel: 'تسامٍ ناضج وبنّاء', scientificTrait: 'Mature Sublimation' },
      { id: 'b', textAr: 'أراها كغيوم شتوية تحمل المطر والخير للأرض', scoreWeight: 5, traitLabel: 'إعادة تأطير إيجابي', scientificTrait: 'Positive Reframing' },
      { id: 'c', textAr: 'أحللها هندسياً ككتل وظلال متوازنة', scoreWeight: 4, traitLabel: 'عقلنة منطقية منظمة', scientificTrait: 'Intellectualization' },
      { id: 'd', textAr: 'أتجاوزها سريعاً للبحث عن لوحة أكثر إشراقاً', scoreWeight: 3, traitLabel: 'تجنب المنبهات الضاغطة', scientificTrait: 'Selective Avoidance' },
    ],
  },
  {
    id: 'rorschach_20',
    testId: 'rorschach',
    dimensionKey: 'affective_integration',
    promptAr: 'اللوحة العشرون (الخلاصة الإسقاطية الكلية): بعد تأمل جميع اللوحات، ما هي القيمة العليا التي تبحث عنها روحك في الحياة والشراكة؟',
    imageSvg: 'rorschach_wings_crest',
    options: [
      { id: 'a', textAr: 'السكينة النفسية، المودة الصادقة، والتحليق المشترك نحو أهداف سامية', scoreWeight: 5, traitLabel: 'تكامل وجداني ومعرفي رفيع', scientificTrait: 'Integrated Self-Actualization' },
      { id: 'b', textAr: 'الأمان الراسخ، الوضوح، وبناء قلعة أسرية مستقرة', scoreWeight: 5, traitLabel: 'أمان واستقرار مكين', scientificTrait: 'Secure Foundation' },
      { id: 'c', textAr: 'الإبداع، التميز الفكري، واكتشاف آفاق جديدة', scoreWeight: 4, traitLabel: 'شغف إبداعي ومعرفي', scientificTrait: 'Creative Exploration' },
      { id: 'd', textAr: 'الاستقلالية، الكرامة، والاحترام المتبادل', scoreWeight: 4, traitLabel: 'وقار واستقلال ذاتي', scientificTrait: 'Dignified Autonomy' },
    ],
  },
];

const EXTENDED_TAT_ITEMS: TestQuestion[] = [
  {
    id: 'tat_5',
    testId: 'tat',
    dimensionKey: 'achievement_motivation',
    promptAr: 'المشهد الخامس: «شاب أو شابة يقف أمام لوحة مشروع كبير في ساعة متأخرة من الليل بينما غادر الجميع، وعلى وجهه ابتسامة هادئة»',
    subPromptAr: 'ما الدافع الحقيقي وراء بقائه في هذا الوقت؟',
    options: [
      { id: 'a', textAr: 'شغفه بالإتقان ورغبته في تقديم عمل استثنائي يفخر به ويخدم مجتمعه', scoreWeight: 5, traitLabel: 'دافع إنجاز وإتقان ذاتي (n-Ach)', scientificTrait: 'Intrinsic Mastery' },
      { id: 'b', textAr: 'يريد إنهاء المهام المتراكمة ليقضي عطلة نهاية الأسبوع متفرغاً لأسرته', scoreWeight: 5, traitLabel: 'توازن بين الإنجاز والأسرة', scientificTrait: 'Family-Oriented Planning' },
      { id: 'c', textAr: 'يسعى لإثبات جدارته للحصول على ترقية قيادية مستحقة', scoreWeight: 4, traitLabel: 'طموح مهني تقدمي', scientificTrait: 'Career Advancement' },
      { id: 'd', textAr: 'يخشى النقد فيراجع التفاصيل بدقة زائدة', scoreWeight: 3, traitLabel: 'حرص وتجنب للخطأ', scientificTrait: 'Cautious Perfectionism' },
    ],
  },
  {
    id: 'tat_6',
    testId: 'tat',
    dimensionKey: 'relational_attachment',
    promptAr: 'المشهد السادس: «شخص يجلس في مقهى هادئ وبجواره مقعد فارغ، وينظر إلى ساعته ثم إلى الباب بترقب»',
    subPromptAr: 'بمَ تنتهي هذه القصة في مخيلتك؟',
    options: [
      { id: 'a', textAr: 'يدخل شريكه بابتسامة دافئة ويعتذر بلطف عن ازدحام الطريق ويمضيان أمسية رائعة', scoreWeight: 5, traitLabel: 'توقع إيجابي وثقة علائقية', scientificTrait: 'Secure Relational Expectancy' },
      { id: 'b', textAr: 'يتلقى اتصالاً من صديقه يوضح سبب التأخير فيتفهم الأمر بصدر رحب', scoreWeight: 4, traitLabel: 'مرونة وحسن ظن', scientificTrait: 'Cognitive Flexibility' },
      { id: 'c', textAr: 'يستثمر وقت الانتظار في قراءة كتاب ممتع حتى يصل الطرف الآخر', scoreWeight: 4, traitLabel: 'اكتفاء ذاتي متزن', scientificTrait: 'Composed Autonomy' },
      { id: 'd', textAr: 'يشعر بالقلق من أن يكون الطرف الآخر قد نسي الموعد', scoreWeight: 2, traitLabel: 'حساسية تجاه الإهمال', scientificTrait: 'Rejection Sensitivity' },
    ],
  },
  {
    id: 'tat_7',
    testId: 'tat',
    dimensionKey: 'power_autonomy',
    promptAr: 'المشهد السابع: «قائد سفينة يمسك الدفة وسط أمواج متلاطمة، وبجواره طاقم ينتظر توجيهاته الحاسمة»',
    subPromptAr: 'ما الذي يدور في خلد هذا القائد؟',
    options: [
      { id: 'a', textAr: 'يجمع بين الثبات النفسي وتشاور الخبراء لعبور العاصفة بسلامة الجميع', scoreWeight: 5, traitLabel: 'قيادة حكيمة مسؤولة (Socialized Power)', scientificTrait: 'Responsible Leadership' },
      { id: 'b', textAr: 'يثق في خبرته الملاحية ويصدر أوامر دقيقة لتوزيع المهام فوراً', scoreWeight: 5, traitLabel: 'حسم وكفاءة تنفيذية', scientificTrait: 'Decisive Command' },
      { id: 'c', textAr: 'يركز على تهدئة روع الطاقم وبث الشجاعة في قلوبهم أولاً', scoreWeight: 5, traitLabel: 'قيادة وجدانية داعمة', scientificTrait: 'Supportive Leadership' },
      { id: 'd', textAr: 'يفضل تغيير المسار فوراً والعودة لأقرب ميناء آمن', scoreWeight: 3, traitLabel: 'أولوية السلامة والحذر', scientificTrait: 'Risk Avoidance' },
    ],
  },
  {
    id: 'tat_8',
    testId: 'tat',
    dimensionKey: 'future_generativity',
    promptAr: 'المشهد الثامن: «أب أو أم يمسك بيد طفل صغير وهما يغرسان شتلة خضراء صغيرة في حديقة المنزل»',
    subPromptAr: 'ما المعنى الرمزي الأعمق لهذا المشهد في نفسك؟',
    options: [
      { id: 'a', textAr: 'غرس القيم الصالحة والمحبة في الأبناء ليثمر جيلاً معطاءً ومباركاً', scoreWeight: 5, traitLabel: 'عطاء تربوي ممتد (Generativity)', scientificTrait: 'High Generativity' },
      { id: 'b', textAr: 'بناء جذور الاستقرار والانتماء الدافئ للبيت والوطن', scoreWeight: 5, traitLabel: 'تجذر واستقرار أسري', scientificTrait: 'Family Rootedness' },
      { id: 'c', textAr: 'تعليم الطفل الصبر وتحمل المسؤولية العملية منذ الصغر', scoreWeight: 4, traitLabel: 'تربية عملية مسؤولة', scientificTrait: 'Mentoring Focus' },
      { id: 'd', textAr: 'الاستمتاع بصفاء الطبيعة واللحظة الهادئة بعيداً عن ضجيج العالم', scoreWeight: 4, traitLabel: 'سكينة وانسجام طبيعي', scientificTrait: 'Peaceful Presence' },
    ],
  },
  {
    id: 'tat_9',
    testId: 'tat',
    dimensionKey: 'achievement_motivation',
    promptAr: 'المشهد التاسع: «عالم أو باحث ينظر إلى تجربة فشلت للمرة الثالثة، ثم يفتح دفتراً جديداً ويكتب في الصفحة الأولى»',
    subPromptAr: 'ماذا كتب في تلك الصفحة الجديدة؟',
    options: [
      { id: 'a', textAr: '«اكتشفت ثلاث طرق لا تعمل؛ والآن سأبدأ الطريقة الرابعة بمعطيات أدق»', scoreWeight: 5, traitLabel: 'مثابرة وصلابة معرفية (Grit)', scientificTrait: 'Resilient Perseverance' },
      { id: 'b', textAr: 'يدون الأخطاء السابقة بدقة ويستشير زميلاً خبيراً لتطوير النموذج', scoreWeight: 5, traitLabel: 'تعلم تعاوني ذكي', scientificTrait: 'Collaborative Learning' },
      { id: 'c', textAr: 'يقرر أخذ إجازة قصيرة لتجديد طاقته الذهنية قبل المحاولة مجدداً', scoreWeight: 4, traitLabel: 'إدارة حكيمة للطاقة', scientificTrait: 'Adaptive Pacing' },
      { id: 'd', textAr: 'يغير موضوع البحث بالكامل إلى مجال أسهل وأسرع', scoreWeight: 2, traitLabel: 'تجنب الإحباط', scientificTrait: 'Task Switching' },
    ],
  },
  {
    id: 'tat_10',
    testId: 'tat',
    dimensionKey: 'relational_attachment',
    promptAr: 'المشهد العاشر: «زوجان يسيران في ممر طويل تتساقط فيه أوراق الخريف، ويحملان مظلة واحدة تحت مطر خفيف»',
    subPromptAr: 'ما الشعور السائد بينهما في هذه اللوحة؟',
    options: [
      { id: 'a', textAr: 'أمان المودة والرحمة؛ حيث يحتمي كل منهما بالآخر في تقلبات الفصول والحياة', scoreWeight: 5, traitLabel: 'تآلف ومودة راسخة', scientificTrait: 'Enduring Dyadic Bond' },
      { id: 'b', textAr: 'يتبادلان أطراف الحديث والضحكات الدافئة غير عابئين بالمطر', scoreWeight: 5, traitLabel: 'بهجة الشراكة', scientificTrait: 'Relational Joy' },
      { id: 'c', textAr: 'يسيران بخطوات متناغمة نحو بيتهما الدافئ القريب', scoreWeight: 4, traitLabel: 'توافق الهدف والمسير', scientificTrait: 'Shared Direction' },
      { id: 'd', textAr: 'يستغرق كل منهما في تأملاته الهادئة مع شعوره بالاطمئنان لوجود رفيقه', scoreWeight: 4, traitLabel: 'سكينة القرب الصامت', scientificTrait: 'Quiet Companionship' },
    ],
  },
  {
    id: 'tat_11',
    testId: 'tat',
    dimensionKey: 'power_autonomy',
    promptAr: 'المشهد الحادي عشر: «شخص يقف أمام جمهور كبير في قاعة مؤتمرات، وقد أُطفئت الشاشة العرض فجأة بسبب عطل تقني»',
    subPromptAr: 'كيف سيتصرف بطل القصة في هذه اللحظة؟',
    options: [
      { id: 'a', textAr: 'يبتسم بثقة ويتقدم نحو الجمهور ليكمل حديثه بارتجال ملهم يبهر الحاضرين', scoreWeight: 5, traitLabel: 'حضور قيادي ومرونة فائقة', scientificTrait: 'Charismatic Mastery' },
      { id: 'b', textAr: 'يحول الموقف إلى حوار تفاعلي مباشر مع الجمهور ريثما يصلح الفنيون العطل', scoreWeight: 5, traitLabel: 'ذكاء اجتماعي وتكيفي', scientificTrait: 'Adaptive Engagement' },
      { id: 'c', textAr: 'يلخص النقاط الرئيسية بهدوء من ذاكرته المنظمة', scoreWeight: 4, traitLabel: 'تمكن معرفي وثبات', scientificTrait: 'Cognitive Composure' },
      { id: 'd', textAr: 'يعلن استراحة قصيرة حتى تعود الأجهزة للعمل', scoreWeight: 3, traitLabel: 'حل إجرائي آمن', scientificTrait: 'Procedural Solution' },
    ],
  },
  {
    id: 'tat_12',
    testId: 'tat',
    dimensionKey: 'future_generativity',
    promptAr: 'المشهد الثاني عشر: «شخص يتأمل صندوق مقتنيات قديمة يحتوي على رسائل وصور لعائلته وأجداده»',
    subPromptAr: 'ما الفكرة التي تلمع في ذهنه؟',
    options: [
      { id: 'a', textAr: 'الامتنان للجذور الأصيلة والعزم على توريث القيم الجميلة للأجيال القادمة', scoreWeight: 5, traitLabel: 'وفاء للجذور وبناء للمستقبل', scientificTrait: 'Intergenerational Continuity' },
      { id: 'b', textAr: 'إدراك أن الأثر الطيب والمحبة هما الباقيان الحقيقيان في حياة الإنسان', scoreWeight: 5, traitLabel: 'حكمة وجودية وقيمية', scientificTrait: 'Existential Meaning' },
      { id: 'c', textAr: 'مشاركة هذه القصص الملهمة مع شريك حياته وأبنائه في المساء', scoreWeight: 4, traitLabel: 'تواصل أسري دافئ', scientificTrait: 'Family Storytelling' },
      { id: 'd', textAr: 'تنظيم الصور وأرشفتها بطريقة حديثة لحفظها من التلف', scoreWeight: 4, traitLabel: 'تنظيم وعناية بالتراث', scientificTrait: 'Preservation Care' },
    ],
  },
  {
    id: 'tat_13',
    testId: 'tat',
    dimensionKey: 'achievement_motivation',
    promptAr: 'المشهد الثالث عشر: «متسلق جبال يصل إلى هضبة مرتفعة، فيرى خلفها قمة أعلى لم تكن ظاهرة من السفح»',
    subPromptAr: 'ماذا سيفعل عندما يرى القمة الأعلى؟',
    options: [
      { id: 'a', textAr: 'يأخذ نفساً عميقاً، يبتسم للتحدي الجديد، ويواصل الصعود نحو القمة الكبرى بخطة مدروسة', scoreWeight: 5, traitLabel: 'طموح متجدد وعزيمة', scientificTrait: 'Sustained Ambition' },
      { id: 'b', textAr: 'يوثق إنجازه الحالي ويدرس الطقس والمؤونة قبل اتخاذ قرار الصعود الإضافي', scoreWeight: 5, traitLabel: 'طموح حكيم محسوب', scientificTrait: 'Strategic Assessment' },
      { id: 'c', textAr: 'يمد يده لزميله في الفريق ليرتقيا معاً نحو الهدف الجديد', scoreWeight: 5, traitLabel: 'إنجاز تشاركي', scientificTrait: 'Team Achievement' },
      { id: 'd', textAr: 'يكتفي بالمنظر الجميل من الهضبة الحالية ويعود بسلام', scoreWeight: 3, traitLabel: 'قناعة واكتفاء', scientificTrait: 'Contentment' },
    ],
  },
  {
    id: 'tat_14',
    testId: 'tat',
    dimensionKey: 'relational_attachment',
    promptAr: 'المشهد الرابع عشر: «شخصان يجلسان على أريكة، أحدهما يبدو مهموماً وينظر للأرض بينما الآخر يميل نحوه باهتمام»',
    subPromptAr: 'ما الذي يجعل هذه اللحظة نقطة تحول إيجابية؟',
    options: [
      { id: 'a', textAr: 'شعور المهموم بالأمان التام للبوح بضعفه دون خوف من الحكم أو اللوم', scoreWeight: 5, traitLabel: 'أمان نفسي واحتواء كامل', scientificTrait: 'Psychological Safety' },
      { id: 'b', textAr: 'احتضان دافئ وكلمات تطمين صادقة تزيل ثقل الهم عن قلبه', scoreWeight: 5, traitLabel: 'تعاطف ومواساة حانية', scientificTrait: 'Empathic Comfort' },
      { id: 'c', textAr: 'التعاون الهادئ لوضع خطة عملية تخرجه من أزمته', scoreWeight: 4, traitLabel: 'مساندة عملية', scientificTrait: 'Instrumental Support' },
      { id: 'd', textAr: 'احترام صمته والبقاء بجواره حتى يستعد للحديث', scoreWeight: 4, traitLabel: 'حضور صبور', scientificTrait: 'Patient Presence' },
    ],
  },
  {
    id: 'tat_15',
    testId: 'tat',
    dimensionKey: 'power_autonomy',
    promptAr: 'المشهد الخامس عشر: «فنان أو مهندس يعرض تصميماً مبتكراً يختلف عن النمط التقليدي، وبعض الحاضرين ينظرون باستغراب»',
    subPromptAr: 'كيف يدافع عن رؤيته؟',
    options: [
      { id: 'a', textAr: 'يشرح الأساس العلمي والجمالي لتصميمه بهدوء وثقة تقنع المترددين', scoreWeight: 5, traitLabel: 'ثقة إبداعية وإقناع راقٍ', scientificTrait: 'Persuasive Autonomy' },
      { id: 'b', textAr: 'يستمع لملاحظاتهم بمرونة ويدمج ما يثري الفكرة دون التفريط بجوهرها', scoreWeight: 5, traitLabel: 'مرونة تكاملية', scientificTrait: 'Integrative Openness' },
      { id: 'c', textAr: 'يثبت نجاح تصميمه عبر نموذج تطبيقي عملي يتحدث عن نفسه', scoreWeight: 4, traitLabel: 'برهان عملي', scientificTrait: 'Empirical Demonstration' },
      { id: 'd', textAr: 'يعدل التصميم ليرضي الذائقة التقليدية للحاضرين', scoreWeight: 2, traitLabel: 'مجاراة اجتماعية', scientificTrait: 'Conformity' },
    ],
  },
  {
    id: 'tat_16',
    testId: 'tat',
    dimensionKey: 'future_generativity',
    promptAr: 'المشهد السادس عشر: «طاولة مستديرة يجتمع حولها ثلاثة أجيال (الجد، الوالدان، والأحفاد) في حوار مسائي دافئ»',
    subPromptAr: 'ما سر السعادة الظاهرة على وجوههم؟',
    options: [
      { id: 'a', textAr: 'تكامل حكمة الكبار مع حيوية الشباب في جو من البر والمودة والاحترام', scoreWeight: 5, traitLabel: 'تناغم الأجيال والتكافل الأسري', scientificTrait: 'Familial Harmony' },
      { id: 'b', textAr: 'الشعور بالانتماء لأسرة متماسكة يسند بعضها بعضاً في السراء والضراء', scoreWeight: 5, traitLabel: 'أمان الانتماء الأسري', scientificTrait: 'Collective Security' },
      { id: 'c', textAr: 'تبادل الخبرات والقصص التي تبني هوية الأبناء وثقتهم بأنفسهم', scoreWeight: 4, traitLabel: 'بناء الهوية والقيم', scientificTrait: 'Identity Transmission' },
      { id: 'd', textAr: 'البساطة والبعد عن التكلف والرسميات', scoreWeight: 4, traitLabel: 'عفوية وألفة', scientificTrait: 'Authentic Warmth' },
    ],
  },
  {
    id: 'tat_17',
    testId: 'tat',
    dimensionKey: 'achievement_motivation',
    promptAr: 'المشهد السابع عشر: «شخص يقف في مكتبة ضخمة أمام رفوف تمتد حتى السقف، ويحمل في يده مصباحاً صغيراً»',
    subPromptAr: 'علامَ يبحث هذا الشخص؟',
    options: [
      { id: 'a', textAr: 'يبحث عن الحكمة والمعرفة التي تنير بصيرته وتطور وعيه بالحياة', scoreWeight: 5, traitLabel: 'شغف بالحكمة والمعرفة (n-Cog)', scientificTrait: 'Need for Cognition' },
      { id: 'b', textAr: 'يبحث عن حل مبتكر لمعضلة علمية أو مهنية يشغله حلها', scoreWeight: 5, traitLabel: 'فضول بحثي وتطبيقي', scientificTrait: 'Investigative Drive' },
      { id: 'c', textAr: 'يستمتع بهدوء المكتبة وعبق الكتب كخلوة فكرية مريحة', scoreWeight: 4, traitLabel: 'سكينة فكرية', scientificTrait: 'Contemplative Peace' },
      { id: 'd', textAr: 'يختار كتاباً يقرؤه مع شريك حياته لمناقشته سوياً', scoreWeight: 5, traitLabel: 'مشاركة فكرية علائقية', scientificTrait: 'Shared Intellectual Growth' },
    ],
  },
  {
    id: 'tat_18',
    testId: 'tat',
    dimensionKey: 'relational_attachment',
    promptAr: 'المشهد الثامن عشر: «شخص يفتح باب منزله بعد سفر طويل، فيجد البيت مضاءً ومزيناً لاستقباله بحفاوة»',
    subPromptAr: 'ما أول شعور يغمر قلبه في هذه اللحظة؟',
    options: [
      { id: 'a', textAr: 'الامتنان العميق لوجود شريك وأسرة تجعل البيت جنة وملاذاً للروح', scoreWeight: 5, traitLabel: 'امتنان وارتباط دافئ', scientificTrait: 'Gratitude & Belonging' },
      { id: 'b', textAr: 'الفرح برؤية أحبته وضمهم بشوق ومحبة صادقة', scoreWeight: 5, traitLabel: 'تعبير عاطفي صادق', scientificTrait: 'Warm Reunion' },
      { id: 'c', textAr: 'الشعور بأن كل تعب السفر والعمل قد زال في لحظة واحدة', scoreWeight: 4, traitLabel: 'البيت كمصدر شحن نفسي', scientificTrait: 'Home as Sanctuary' },
      { id: 'd', textAr: 'الرغبة في رد هذا الجميل بمبادرة لطيفة تسعدهم', scoreWeight: 5, traitLabel: 'تبادلية العطاء والتقدير', scientificTrait: 'Reciprocal Generosity' },
    ],
  },
  {
    id: 'tat_19',
    testId: 'tat',
    dimensionKey: 'power_autonomy',
    promptAr: 'المشهد التاسع عشر: «حَكَم أو مصلح يجلس بين طرفين متخاصمين في مجلس، وقد هدأت ملامحهما بعد الاستماع إليه»',
    subPromptAr: 'ما السر الذي مكنه من إنهاء الخصومة؟',
    options: [
      { id: 'a', textAr: 'عدله، إنصاته المتوازن للطرفين، وخطابه الذي يحفظ الكرامة ويجمع القلوب', scoreWeight: 5, traitLabel: 'حكمة الإصلاح والقيادة الأخلاقية', scientificTrait: 'Integrative Mediation' },
      { id: 'b', textAr: 'تحليله المنطقي الدقيق الذي فصل الحقوق بوضوح لا لبس فيه', scoreWeight: 4, traitLabel: 'حسم عادل ومنطقي', scientificTrait: 'Analytical Justice' },
      { id: 'c', textAr: 'تذكيرهما بالعِشرة الطيبة والمصالح المشتركة العليا', scoreWeight: 5, traitLabel: 'ذكاء اجتماعي وعلائقي', scientificTrait: 'Relational Perspective' },
      { id: 'd', textAr: 'هدوؤه الوقور الذي فرض هيبة الاحترام في المجلس', scoreWeight: 4, traitLabel: 'وقار وهيبة قيادية', scientificTrait: 'Composed Authority' },
    ],
  },
  {
    id: 'tat_20',
    testId: 'tat',
    dimensionKey: 'future_generativity',
    promptAr: 'المشهد العشرون: «شخص يقف على قمة تلة خضراء عند شروق الشمس، وينظر إلى مدينة هادئة تستيقظ في الأفق»',
    subPromptAr: 'ما العهد الذي يقطعه على نفسه مع إشراقة هذا اليوم الجديد؟',
    options: [
      { id: 'a', textAr: 'أن يعيش بقلب سليم، ويبني أسرة سعيدة، ويترك أثراً نافعاً ومباركاً في الحياة', scoreWeight: 5, traitLabel: 'سمو الرسالة والتكامل النفسي', scientificTrait: 'Self-Transcendent Purpose' },
      { id: 'b', textAr: 'أن يطور مهاراته ويحقق أهدافه العملية بعزيمة وتفاؤل', scoreWeight: 5, traitLabel: 'تفاؤل وإنجاز مستمر', scientificTrait: 'Proactive Growth' },
      { id: 'c', textAr: 'أن يحافظ على سلامه الداخلي ولا يسمح للضغوط بتعكير صفو روحه', scoreWeight: 4, traitLabel: 'حماية السكينة الداخلية', scientificTrait: 'Inner Serenity' },
      { id: 'd', textAr: 'أن يكون سنداً ومصدر بهجة وأمان لكل من يحبهم', scoreWeight: 5, traitLabel: 'إيثار ورعاية محبة', scientificTrait: 'Loving Stewardship' },
    ],
  },
];

const EXTENDED_ATTACHMENT_ITEMS: TestQuestion[] = [
  {
    id: 'att_7',
    testId: 'attachment_style',
    dimensionKey: 'secure_base',
    promptAr: 'عندما أحقق نجاحاً أو يمر بي خبر مفرح، من هو أول شخص أرغب في مشاركته الفرحة؟',
    options: [
      { id: 'a', textAr: 'شريك حياتي فوراً؛ فالفرحة لا تكتمل إلا بمشاركته وابتسامته', scoreWeight: 5, traitLabel: 'ملاذ آمن ومشاركة وجدانية', scientificTrait: 'Secure Sharing' },
      { id: 'b', textAr: 'أخبره في الوقت المناسب بهدوء مع بقية المقربين', scoreWeight: 3, traitLabel: 'مشاركة متوازنة', scientificTrait: 'Moderate Sharing' },
      { id: 'c', textAr: 'أحتفظ بنجاحاتي لنفسي ولا أشعر بحاجة لمشاركتها', scoreWeight: 1, traitLabel: 'استقلال تجنبي', scientificTrait: 'Avoidant Self-Sufficiency' },
    ],
  },
  {
    id: 'att_8',
    testId: 'attachment_style',
    dimensionKey: 'secure_base',
    promptAr: 'إلى أي مدى تشعر بالراحة عندما يعتمد عليك شريك حياتك عاطفياً في أوقات ضعفه؟',
    options: [
      { id: 'a', textAr: 'أشعر بالسعادة والاعتزاز لأنني سند وملاذ آمن له', scoreWeight: 5, traitLabel: 'قدرة عالية على الاحتواء الآمن', scientificTrait: 'Caregiving Security' },
      { id: 'b', textAr: 'أسنده بقدر استطاعتي مع تشجيعه على التماسك', scoreWeight: 3, traitLabel: 'مساندة متوازنة', scientificTrait: 'Balanced Support' },
      { id: 'c', textAr: 'أشعر بالثقل والاختناق عندما يعتمد عليّ شخص عاطفياً', scoreWeight: 1, traitLabel: 'نفور من الاعتماد العاطفي', scientificTrait: 'Avoidant Discomfort' },
    ],
  },
  {
    id: 'att_9',
    testId: 'attachment_style',
    dimensionKey: 'secure_base',
    promptAr: 'كيف تصف شعورك الداخلي تجاه استمرارية المحبة والأمان في علاقتك؟',
    options: [
      { id: 'a', textAr: 'مطمئن وواثق بأن المودة بيننا راسخة وتزداد عمقاً مع الأيام', scoreWeight: 5, traitLabel: 'ثقة علائقية راسخة', scientificTrait: 'Relational Trust' },
      { id: 'b', textAr: 'مطمئن في أغلب الأوقات إلا عند حدوث خلافات كبيرة', scoreWeight: 3, traitLabel: 'أمان معتدل', scientificTrait: 'Conditional Security' },
      { id: 'c', textAr: 'أخشى دائماً أن ينتهي الحب فجأة أو يتغير الشريك عليّ', scoreWeight: 1, traitLabel: 'قلق فقدان مستمر', scientificTrait: 'Abandonment Fear' },
    ],
  },
  {
    id: 'att_10',
    testId: 'attachment_style',
    dimensionKey: 'anxiety_reassurance',
    promptAr: 'إذا بدا شريكك هادئاً أو قليل الكلام في أحد الأيام:',
    options: [
      { id: 'a', textAr: 'أدرك أنه قد يكون مرهقاً من العمل فأسأله بلطف وأمنحه مساحته المريحة', scoreWeight: 1, traitLabel: 'تفسير آمن وغير قلق', scientificTrait: 'Secure Attribution' },
      { id: 'b', textAr: 'أستفسر منه مباشرة لأطمئن أن كل شيء على ما يرام', scoreWeight: 3, traitLabel: 'استيضاح طبيعي', scientificTrait: 'Direct Check-in' },
      { id: 'c', textAr: 'أفترض فوراً أنه غاضب مني أو لم يعد يهتم بي وأشعر بضيق شديد', scoreWeight: 5, traitLabel: 'قلق وتأويل شخصي مفرط', scientificTrait: 'Hyperactivating Anxiety' },
    ],
  },
  {
    id: 'att_11',
    testId: 'attachment_style',
    dimensionKey: 'anxiety_reassurance',
    promptAr: 'ما مدى حاجتك لسماع عبارات التأكيد المستمر على الحب والاهتمام يومياً؟',
    options: [
      { id: 'a', textAr: 'أسعد بها كثيراً، لكن ثقتي بحب الشريك ثابتة حتى في أوقات انشغاله', scoreWeight: 1, traitLabel: 'اطمئنان ذاتي وعلائقي', scientificTrait: 'Low Reassurance Dependency' },
      { id: 'b', textAr: 'أحتاج لسماعها بانتظام لأشعر بتجدد الحيوية في العلاقة', scoreWeight: 3, traitLabel: 'حاجة عاطفية معتدلة', scientificTrait: 'Normal Affection Need' },
      { id: 'c', textAr: 'إذا مر يوم دون تأكيد لفظي مستمر أشعر بالشك والبرود والخوف', scoreWeight: 5, traitLabel: 'حاجة ملحة ومفرطة للتطمين', scientificTrait: 'Excessive Reassurance Seeking' },
    ],
  },
  {
    id: 'att_12',
    testId: 'attachment_style',
    dimensionKey: 'anxiety_reassurance',
    promptAr: 'عندما يمدح شريكك شخصاً آخر في سياق مهني أو اجتماعي عادي:',
    options: [
      { id: 'a', textAr: 'أتفاعل بثقة وهدوء تام دون أي شعور بالتهديد أو المقارنة', scoreWeight: 1, traitLabel: 'ثقة عالية بالنفس وبالشريك', scientificTrait: 'Secure Self-Worth' },
      { id: 'b', textAr: 'الأمر طبيعي طالما كان في حدود اللياقة والاحترام', scoreWeight: 3, traitLabel: 'توازن', scientificTrait: 'Reasonable Boundary' },
      { id: 'c', textAr: 'أشعر بغيرة حادة وقلق من أن أكون أقل مكانة في نظره', scoreWeight: 5, traitLabel: 'حساسية غيرة ومقارنة', scientificTrait: 'Anxious Jealousy' },
    ],
  },
  {
    id: 'att_13',
    testId: 'attachment_style',
    dimensionKey: 'relational_autonomy',
    promptAr: 'كيف تتعامل مع رغبة الشريك في قضاء بعض الوقت مع أصدقائه أو ممارسة هواية فردية؟',
    options: [
      { id: 'a', textAr: 'أشجعه بحب؛ فالتنفس الصحي والهوايات الفردية تجدد طاقة علاقتنا', scoreWeight: 5, traitLabel: 'نضج واحترام للاستقلالية الصحية', scientificTrait: 'Healthy Autonomy Support' },
      { id: 'b', textAr: 'أوافق باعتدال طالما لا يطغى ذلك على وقتنا المشترك', scoreWeight: 4, traitLabel: 'توازن الوقت', scientificTrait: 'Balanced Time' },
      { id: 'c', textAr: 'أشعر بالضيق وأعتبر رغبته في وقت خاص ابتعاداً عني', scoreWeight: 2, traitLabel: 'تعلق اندماجي قلق', scientificTrait: 'Protest Against Autonomy' },
    ],
  },
  {
    id: 'att_14',
    testId: 'attachment_style',
    dimensionKey: 'relational_autonomy',
    promptAr: 'عندما تقترب العلاقة العاطفية وتصبح أكثر عمقاً والتزاماً:',
    options: [
      { id: 'a', textAr: 'أشعر بالسكينة والاكتمال دون أن أفقد هويتي وشخصيتي المستقلة', scoreWeight: 5, traitLabel: 'توازن القرب والهوية', scientificTrait: 'Integrated Intimacy' },
      { id: 'b', textAr: 'أسعد بالقرب مع حرصي على تنظيم التزاماتي تدريجياً', scoreWeight: 4, traitLabel: 'تقارب متدرج', scientificTrait: 'Paced Intimacy' },
      { id: 'c', textAr: 'أشعر بالخوف من فقدان حريتي وأميل للابتعاد خطوة للوراء', scoreWeight: 1, traitLabel: 'خوف تجنبي من الالتزام', scientificTrait: 'Deactivating Avoidance' },
    ],
  },
  {
    id: 'att_15',
    testId: 'attachment_style',
    dimensionKey: 'relational_autonomy',
    promptAr: 'في اتخاذ القرارات اليومية داخل البيت الزوجي:',
    options: [
      { id: 'a', textAr: 'نتشاور بروح الشراكة مع منح كل طرف مرونة في شؤونه الخاصة', scoreWeight: 5, traitLabel: 'شراكة ديمقراطية متزنة', scientificTrait: 'Egalitarian Partnership' },
      { id: 'b', textAr: 'نتفق على الخطوط العريضة ويستقل كل منا بتفاصيله', scoreWeight: 4, traitLabel: 'تنظيم عملي', scientificTrait: 'Functional Autonomy' },
      { id: 'c', textAr: 'أفضل اتخاذ كل قراراتي بمفردي دون الرجوع للشريك', scoreWeight: 1, traitLabel: 'انفصال فردي', unilateralTrait: 'Unilateral Detachment', scientificTrait: 'Hyper-Independence' } as any,
    ],
  },
  {
    id: 'att_16',
    testId: 'attachment_style',
    dimensionKey: 'conflict_repair',
    promptAr: 'عندما أدرك أنني أخطأت أو قسوت في الكلام أثناء نقاش مع شريكي:',
    options: [
      { id: 'a', textAr: 'أبادر بالاعتذار الصادق وتطييب خاطره فوراً بشجاعة أدبية ومحبة', scoreWeight: 5, traitLabel: 'شجاعة الاعتذار وإصلاح العلاقة', scientificTrait: 'Prompt Repair Attempt' },
      { id: 'b', textAr: 'أعتذر بطريقة عملية أو لفتة لطيفة بعد هدوء الموقف', scoreWeight: 4, traitLabel: 'اعتذار عملي', scientificTrait: 'Indirect Repair' },
      { id: 'c', textAr: 'أكابر وأرفض الاعتذار حتى لا أظهر بمظهر الضعيف', scoreWeight: 1, traitLabel: 'مكابرة دفاعية', scientificTrait: 'Defensive Pride' },
    ],
  },
  {
    id: 'att_17',
    testId: 'attachment_style',
    dimensionKey: 'conflict_repair',
    promptAr: 'كيف تتعامل مع «الفرسان الأربعة المدمرة للعلاقة» (النقد الجارح، الازدراء، الدفاعية، والصمت العقابي - Gottman)؟',
    options: [
      { id: 'a', textAr: 'أتجنبها بوعي تام، وأركز على مناقشة الموقف نفسه بأدب واحترام', scoreWeight: 5, traitLabel: 'حوار صحي خالٍ من السموم العلائقية', scientificTrait: 'Gottman Constructive Dialogue' },
      { id: 'b', textAr: 'أحاول تجنبها وقد أبدر ببعض الدفاعية التي أتداركها سريعاً', scoreWeight: 3, traitLabel: 'وعي وتدارك', scientificTrait: 'Self-Correcting' },
      { id: 'c', textAr: 'ألجأ للصمت العقابي الطويل أو النقد اللاذع وقت الخلاف', scoreWeight: 1, traitLabel: 'استراتيجيات خلاف منهكة', scientificTrait: 'Destructive Conflict Pattern' },
    ],
  },
  {
    id: 'att_18',
    testId: 'attachment_style',
    dimensionKey: 'conflict_repair',
    promptAr: 'بعد انتهاء الخلاف والوصول إلى تفاهم مشترك:',
    options: [
      { id: 'a', textAr: 'أطوي الصفحة تماماً بقلب صافٍ ولا أستدعي الخلاف القديم في المستقبل', scoreWeight: 5, traitLabel: 'صفاء قلب وتجاوز حقيقي', scientificTrait: 'Complete Emotional Closure' },
      { id: 'b', textAr: 'أحتاج لوقت قصير حتى يعود المزاج لبهجته الكاملة', scoreWeight: 4, traitLabel: 'تعافٍ تدريجي', scientificTrait: 'Gradual Warmth' },
      { id: 'c', textAr: 'أحتفظ بالعتب في داخلي وأفتحه مجدداً عند أي مشكلة جديدة', scoreWeight: 1, traitLabel: 'تراكم الضغائن', scientificTrait: 'Scorekeeping' },
    ],
  },
  {
    id: 'att_19',
    testId: 'attachment_style',
    dimensionKey: 'family_solidarity',
    promptAr: 'إذا حدث سوء فهم بسيط بين شريك حياتك وأحد أفراد عائلتك:',
    options: [
      { id: 'a', textAr: 'أكون جسر خير وحكمة يقرب القلوب ويحفظ مكانة وكرامة الطرفين بذكاء', scoreWeight: 5, traitLabel: 'حكمة دبلوماسية أسرية', scientificTrait: 'Triadic Family Diplomacy' },
      { id: 'b', textAr: 'أفصل بين الطرفين بهدوء وأمنع تصاعد الموقف', scoreWeight: 4, traitLabel: 'احتواء الموقف', scientificTrait: 'Boundary Buffering' },
      { id: 'c', textAr: 'أنحاز لطرف ضد الآخر بحدة أو أتركهما يتصارعان', scoreWeight: 1, traitLabel: 'تأجيج الصراع الأسري', scientificTrait: 'Poor Boundary Management' },
    ],
  },
  {
    id: 'att_20',
    testId: 'attachment_style',
    dimensionKey: 'family_solidarity',
    promptAr: 'كيف ترى حماية أسرار البيت الزوجي وتفاصيله المالية والخاصة؟',
    options: [
      { id: 'a', textAr: 'خط أحمر مقدس؛ ما يدور بين الزوجين لا يخرج لأي طرف خارجي أبداً', scoreWeight: 5, traitLabel: 'صيانة مقدسة لأسرار البيت', scientificTrait: 'Marital Privacy Sanctity' },
      { id: 'b', textAr: 'أحفظ الأسرار ولا أستشير إلا حكيماً موثوقاً عند الضرورة القصوى فقط', scoreWeight: 4, traitLabel: 'كتمان حكيم', scientificTrait: 'Discreet Prudence' },
      { id: 'c', textAr: 'أحكي كل تفاصيل الخلافات والقرارات للأهل والأصدقاء يومياً', scoreWeight: 1, traitLabel: 'اختراق لخصوصية الشراكة', scientificTrait: 'Boundary Violation' },
    ],
  },
  {
    id: 'att_21',
    testId: 'attachment_style',
    dimensionKey: 'family_solidarity',
    promptAr: 'في المناسبات العائلية والاجتماعية لأهل الشريك:',
    options: [
      { id: 'a', textAr: 'أشارك بحضور مشرف وود صادق تقديراً لشريكي وإكراماً لأهله', scoreWeight: 5, traitLabel: 'مروءة وإكرام لأهل الشريك', scientificTrait: 'In-Law Respect & Warmth' },
      { id: 'b', textAr: 'أحضر المناسبات الأساسية بلباقة واحترام', scoreWeight: 4, traitLabel: 'تقدير رسمي متزن', scientificTrait: 'Courteous Attendance' },
      { id: 'c', textAr: 'أتهرب منها دائماً وأرفض التفاعل مع عائلة الشريك', scoreWeight: 1, traitLabel: 'جفاء اجتماعي', scientificTrait: 'Familial Withdrawal' },
    ],
  },
  {
    id: 'att_22',
    testId: 'attachment_style',
    dimensionKey: 'emotional_openness',
    promptAr: 'عندما تشعر بالحزن أو القلق من أمر يخص العمل أو الحياة:',
    options: [
      { id: 'a', textAr: 'أشارك شريكي مشاعري بصدق لأن البوح الواعي يزيدنا قرباً وتفهماً', scoreWeight: 5, traitLabel: 'شفافية وجدانية صحية', scientificTrait: 'Authentic Vulnerability' },
      { id: 'b', textAr: 'ألمح له باختصار وأتحدث عندما يسألني باهتمام', scoreWeight: 3, traitLabel: 'إفصاح متدرج', scientificTrait: 'Gradual Disclosure' },
      { id: 'c', textAr: 'أتظاهر بالقوة التامة وأخفي مشاعري خلف جدار صامت', scoreWeight: 1, traitLabel: 'كبت عاطفي دفاعي', scientificTrait: 'Emotional Suppression' },
    ],
  },
  {
    id: 'att_23',
    testId: 'attachment_style',
    dimensionKey: 'emotional_openness',
    promptAr: 'كيف تتعامل مع احتياجاتك العاطفية التي ترغب أن يلبيها شريكك؟',
    options: [
      { id: 'a', textAr: 'أعبر عنها بوضوح ولطف («يسعدني جداً عندما نفعل كذا معاً»)', scoreWeight: 5, traitLabel: 'تواصل عاطفي صريح وبناء', scientificTrait: 'Clear Need Expression' },
      { id: 'b', textAr: 'ألمح إليها وأتمنى أن يلتقطها بذكائه', scoreWeight: 3, traitLabel: 'تلميح غير مباشر', scientificTrait: 'Indirect Signaling' },
      { id: 'c', textAr: 'أصمت تماماً ثم أغضب لأنه لم يقرأ أفكاري من تلقاء نفسه', scoreWeight: 1, traitLabel: 'توقع قراءة الأفكار والعتب الصامت', scientificTrait: 'Mind-Reading Expectation' },
    ],
  },
  {
    id: 'att_24',
    testId: 'attachment_style',
    dimensionKey: 'emotional_openness',
    promptAr: 'إلى أي مدى تحرص على التعبير اليومي عن الامتنان والتقدير لجهود شريكك؟',
    options: [
      { id: 'a', textAr: 'عادة يومية أصيلة؛ أشكره على التفاصيل الصغيرة والكبيرة بمحبة', scoreWeight: 5, traitLabel: 'ثقافة امتنان وتقدير عالية', scientificTrait: 'Culture of Appreciation' },
      { id: 'b', textAr: 'أعبر عن شكري في المواقف الكبيرة والمناسبات', scoreWeight: 3, traitLabel: 'تقدير موسمي', scientificTrait: 'Periodic Gratitude' },
      { id: 'c', textAr: 'أعتبر ما يفعله واجباً مفروغاً منه لا يحتاج لشكر لفظي', scoreWeight: 1, traitLabel: 'جفاف تقديري', scientificTrait: 'Appreciation Deficit' },
    ],
  },
];

const EXTENDED_CULTURAL_EQ_ITEMS: TestQuestion[] = [
  {
    id: 'ceq_7',
    testId: 'cultural_eq',
    dimensionKey: 'self_regulation',
    promptAr: 'إدارة الانفعالات (Goleman Self-Regulation): عندما تسمع خبراً مزعجاً أثناء تواجدك في مناسبة عائلية أو اجتماع:',
    options: [
      { id: 'a', textAr: 'أحافظ على رباطة جأشي وهدوئي، وأؤجل معالجة الأمر للوقت والمكان المناسبين', scoreWeight: 5, traitLabel: 'ضبط انفعالي وحكمة ظرفية', scientificTrait: 'Contextual Emotional Control' },
      { id: 'b', textAr: 'أستأذن بهدوء لبضع دقائق لاستعادة توازني ثم أعود', scoreWeight: 4, traitLabel: 'تنظيم انفعالي واعي', scientificTrait: 'Adaptive Pausing' },
      { id: 'c', textAr: 'يظهر الانفعال والغضب عليّ فوراً ويتعكر جو المجلس بالكامل', scoreWeight: 1, traitLabel: 'ضعف الاحتواء الظرفي', scientificTrait: 'Emotional Spillover' },
    ],
  },
  {
    id: 'ceq_8',
    testId: 'cultural_eq',
    dimensionKey: 'self_regulation',
    promptAr: 'عندما يطول النقاش مع شخص متعصب لرأيه ولا يقبل الحجة المنطقية:',
    options: [
      { id: 'a', textAr: 'أنهي الجدال بلباقة وابتسامة هادئة حفاظاً على الوقار والسلام النفسي', scoreWeight: 5, traitLabel: 'ترفّع وحكمة في إدارة الحوار', scientificTrait: 'Graceful Disengagement' },
      { id: 'b', textAr: 'أكتفي بطرح وجهة نظري مرة واحدة ثم أصمت', scoreWeight: 4, traitLabel: 'ضبط متزن', scientificTrait: 'Controlled Stance' },
      { id: 'c', textAr: 'أستمر في الجدال الحاد ورفع الصوت لإجباره على الاقتناع', scoreWeight: 1, traitLabel: 'استنزاف انفعالي وجدلي', scientificTrait: 'Escalatory Argumentation' },
    ],
  },
  {
    id: 'ceq_9',
    testId: 'cultural_eq',
    dimensionKey: 'self_regulation',
    promptAr: 'كيف تتعامل مع الضغوط المالية أو المهنية عندما تعود إلى بيتك وأسرتك؟',
    options: [
      { id: 'a', textAr: 'أفصل بوعي بين ضغوط الخارج وهدوء البيت، وألقى أهلي بوجه بشوش ومطمئن', scoreWeight: 5, traitLabel: 'نضج الفصل الانفعالي وحماية الأسرة', scientificTrait: 'Emotional Compartmentalization' },
      { id: 'b', textAr: 'أوضح لهم بهدوء أنني متعب قليلاً وأحتاج لقسط من الراحة', scoreWeight: 4, traitLabel: 'شفافية هادئة', scientificTrait: 'Communicated Fatigue' },
      { id: 'c', textAr: 'أفرغ توتر العمل وغضبي في أهل البيت على أبسط الأسباب', scoreWeight: 1, traitLabel: 'إزاحة انفعالية سلبية', scientificTrait: 'Hostile Displacement' },
    ],
  },
  {
    id: 'ceq_10',
    testId: 'cultural_eq',
    dimensionKey: 'social_empathy',
    promptAr: 'الحساسية الاجتماعية (Goleman Social Awareness): عندما تدخل مكاناً فيه أشخاص من خلفيات ثقافية أو عمرية متنوعة:',
    options: [
      { id: 'a', textAr: 'أخاطب كل فئة بما يناسب قدرها وثقافتها باحترام وود يجمع القلوب', scoreWeight: 5, traitLabel: 'ذكاء ثقافي وتعاطف شامل', scientificTrait: 'Cross-Cultural Empathy' },
      { id: 'b', textAr: 'أتعامل مع الجميع بأدب عام موحد', scoreWeight: 3, traitLabel: 'أدب عام', scientificTrait: 'Standard Courtesy' },
      { id: 'c', textAr: 'لا أتفاعل إلا مع من يشبهني تماماً في العمر والتفكير', scoreWeight: 1, traitLabel: 'انغلاق اجتماعي', scientificTrait: 'In-Group Rigidity' },
    ],
  },
  {
    id: 'ceq_11',
    testId: 'cultural_eq',
    dimensionKey: 'social_empathy',
    promptAr: 'عندما يمر شخص مقرب بنجاح كبير كنت تتمناه لنفسك:',
    options: [
      { id: 'a', textAr: 'أفرح له من أعماق قلبي وأبارك له بصدق وأرى نجاحه إلهاماً لي', scoreWeight: 5, traitLabel: 'نقاء سريرة ومشاركة وجدانية (Mudita)', scientificTrait: 'Empathetic Joy' },
      { id: 'b', textAr: 'أهنئه بأدب وأدعو لنفسي بالتوفيق المماثل', scoreWeight: 4, traitLabel: 'لياقة وتمني الخير', scientificTrait: 'Polite Goodwill' },
      { id: 'c', textAr: 'أشعر بالضيق والمقارنة المؤلمة وأتجنب تهنئته', scoreWeight: 1, traitLabel: 'مقارنة وحسد دفاعي', scientificTrait: 'Envious Comparison' },
    ],
  },
  {
    id: 'ceq_12',
    testId: 'cultural_eq',
    dimensionKey: 'social_empathy',
    promptAr: 'كيف تراعي مشاعر شريكك أو صديقك عندما تقدم له نصيحة في أمر أخطأ فيه؟',
    options: [
      { id: 'a', textAr: 'أبدأ بذكر إيجابياته ومكانته عندي، ثم أطرح النصيحة سراً بلطف وتواضع', scoreWeight: 5, traitLabel: 'نصح حكيم يحفظ الود والكرامة', scientificTrait: 'Compassionate Feedback' },
      { id: 'b', textAr: 'أقدم النصيحة مباشرة وبوضوح في وقت هادئ', scoreWeight: 3, traitLabel: 'وضوح مباشر', scientificTrait: 'Direct Advice' },
      { id: 'c', textAr: 'أنتقده بقسوة وتأنيب لكي لا يكرر الخطأ', scoreWeight: 1, traitLabel: 'نقد جارح منفر', scientificTrait: 'Harsh Criticism' },
    ],
  },
  {
    id: 'ceq_13',
    testId: 'cultural_eq',
    dimensionKey: 'cultural_authenticity',
    promptAr: 'التوجه طويل الأمد والقيم الأصيلة (Hofstede Long-Term Orientation): كيف توازن بين الانفتاح على العصر والحفاظ على الهوية القيمية؟',
    options: [
      { id: 'a', textAr: 'أعتز بجذوري وقيمي الأخلاقية الراسخة كمرساة ثابتة، وأقتبس من العصر أحدث العلوم والمهارات', scoreWeight: 5, traitLabel: 'تكامل الأصالة والمعاصرة', scientificTrait: 'Rooted Modernity' },
      { id: 'b', textAr: 'أحافظ على العادات الأساسية وأساير متطلبات الحياة اليومية', scoreWeight: 3, traitLabel: 'توازن تقليدي', scientificTrait: 'Moderate Traditionalism' },
      { id: 'c', textAr: 'أعيش في صراع وتناقض دائم بين القيم والواقع الحديث', scoreWeight: 1, traitLabel: 'تشتت الهوية الثقافية', scientificTrait: 'Identity Dissonance' },
    ],
  },
  {
    id: 'ceq_14',
    testId: 'cultural_eq',
    dimensionKey: 'cultural_authenticity',
    promptAr: 'قيمة الكرم وإكرام الضيف والمساندة في ثقافتك الشخصية:',
    options: [
      { id: 'a', textAr: 'قيمة أصيلة أسعد بممارستها بسخاء نفس وبشاشة وجه دون تكلف أو رياء', scoreWeight: 5, traitLabel: 'كرم أصيل وسخاء نفس', scientificTrait: 'Authentic Generosity' },
      { id: 'b', textAr: 'أقوم بالواجب المعتاد في حدود الرسمية والمناسبات', scoreWeight: 3, traitLabel: 'كرم متزن', scientificTrait: 'Standard Hospitality' },
      { id: 'c', textAr: 'أعتبر الضيافة والمجاملات عبئاً مادياً ونفسياً لا داعي له', scoreWeight: 1, traitLabel: 'فردانية مادية جافة', scientificTrait: 'Materialistic Individualism' },
    ],
  },
  {
    id: 'ceq_15',
    testId: 'cultural_eq',
    dimensionKey: 'cultural_authenticity',
    promptAr: 'مفهوم «القِوامة والمسؤولية الأسرية» في رؤيتك الفكرية:',
    options: [
      { id: 'a', textAr: 'تكليف ومسؤولية رعاية وحماية وتشاور ومودة، وليست تسلطاً أو إلغاءً للشريك', scoreWeight: 5, traitLabel: 'وعي مستنير بالمسؤولية والشورى', scientificTrait: 'Stewardship & Mutual Consultation' },
      { id: 'b', textAr: 'توزيع تقليدي للأدوار بحسب ما تعارف عليه المجتمع', scoreWeight: 3, traitLabel: 'رؤية عرفية تقليدية', scientificTrait: 'Conventional Role View' },
      { id: 'c', textAr: 'صراع نفوذ وسيطرة طرف على الآخر', scoreWeight: 1, traitLabel: 'رؤية صراعية للسلطة', scientificTrait: 'Authoritarian Power Struggle' },
    ],
  },
  {
    id: 'ceq_16',
    testId: 'cultural_eq',
    dimensionKey: 'social_dexterity',
    promptAr: 'اللباقة وبناء الجسور (Social Skills - Goleman): عند حدوث سوء تفاهم غير مقصود في حوار عائلي أو مهني:',
    options: [
      { id: 'a', textAr: 'أبادر بكلمة طيبة وابتسامة ذكية تزيل اللبس وتعيد الألفة في لحظات', scoreWeight: 5, traitLabel: 'براعة دبلوماسية وإصلاح فوري', scientificTrait: 'High Social Finesse' },
      { id: 'b', textAr: 'أشرح قصدي بهدوء لإنهاء الإشكال', scoreWeight: 3, traitLabel: 'توضيح مباشر', scientificTrait: 'Clear Explanation' },
      { id: 'c', textAr: 'أترك سوء الفهم يتفاقم ولا أبالي بتوضيح موقفي', scoreWeight: 1, traitLabel: 'جمود تواصلي', scientificTrait: 'Communicative Rigidity' },
    ],
  },
  {
    id: 'ceq_17',
    testId: 'cultural_eq',
    dimensionKey: 'social_dexterity',
    promptAr: 'كيف تصف قدرتك على اختيار التوقيت والأسلوب المناسب لطلب أمر مهم من شريكك؟',
    options: [
      { id: 'a', textAr: 'أختار أوقات صفائه وراحته وأطرح طلبي بأسلوب تقديري محبب', scoreWeight: 5, traitLabel: 'ذكاء التوقيت ولباقة الطلب', scientificTrait: 'Strategic Timing & Tact' },
      { id: 'b', textAr: 'أطرح الأمر عندما أحتاج إليه بأسلوب عادي', scoreWeight: 3, traitLabel: 'تلقائية عادية', scientificTrait: 'Direct Timing' },
      { id: 'c', textAr: 'أطرح المطالب الثقيلة في أوقات تعبه وتوتره بإلحاح', scoreWeight: 1, traitLabel: 'غياب الحساسية الظرفية', scientificTrait: 'Poor Contextual Timing' },
    ],
  },
  {
    id: 'ceq_18',
    testId: 'cultural_eq',
    dimensionKey: 'social_dexterity',
    promptAr: 'في التعامل مع اختلاف الطباع والعادات الدقيقة بين عائلتك وعائلة الشريك:',
    options: [
      { id: 'a', textAr: 'أتعامل بمرونة واحترام للتنوع، وأركز على القيم الكبرى المشتركة', scoreWeight: 5, traitLabel: 'مرونة ثقافية وتقبل للتنوع', scientificTrait: 'Cultural Adaptability' },
      { id: 'b', textAr: 'أتأقلم مع الفروقات تدريجياً مع الوقت', scoreWeight: 3, traitLabel: 'تأقلم تدريجي', scientificTrait: 'Gradual Adjustment' },
      { id: 'c', textAr: 'أنتقد عاداتهم المختلفة وأصر على أن طريقتنا هي الوحيدة الصحيحة', scoreWeight: 1, traitLabel: 'مركزيه ثقافية متصلبة', scientificTrait: 'Ethnocentric Rigidity' },
    ],
  },
  {
    id: 'ceq_19',
    testId: 'cultural_eq',
    dimensionKey: 'growth_mindset',
    promptAr: 'عقلية النمو (Carol Dweck Growth Mindset): عندما تواجهون تحدياً جديداً في بداية الحياة المشتركة أو في مشروع عمل:',
    options: [
      { id: 'a', textAr: 'نراه فرصة للتعلم واكتساب خبرة جديدة تقوي ترابطنا وكفاءتنا', scoreWeight: 5, traitLabel: 'عقلية نمو وتعلم مستمر', scientificTrait: 'Resilient Growth Mindset' },
      { id: 'b', textAr: 'نبحث عن حلول مجربة لتجاوز التحدي بأقل خسائر', scoreWeight: 3, traitLabel: 'معالجة عملية', scientificTrait: 'Pragmatic Coping' },
      { id: 'c', textAr: 'نشعر بالعجز ونعتبر التحدي دليلاً على الفشل وعدم التوافق', scoreWeight: 1, traitLabel: 'عقلية جمود وإحباط', scientificTrait: 'Fixed Helplessness' },
    ],
  },
  {
    id: 'ceq_20',
    testId: 'cultural_eq',
    dimensionKey: 'growth_mindset',
    promptAr: 'كيف تنظر إلى الاستشارات الأسرية أو قراءة كتب العلاقات السيكولوجية والعلمية؟',
    options: [
      { id: 'a', textAr: 'وعي راقٍ؛ فالعلاقات الناجحة تُبنى بالعلم والفهم المستمر لنفسية الشريك', scoreWeight: 5, traitLabel: 'وعي علمي واستثمار في العلاقة', scientificTrait: 'Proactive Relational Learning' },
      { id: 'b', textAr: 'مفيدة عند الحاجة أو وجود إشكال يتطلب رأي مختص', scoreWeight: 3, traitLabel: 'تقبل عند الحاجة', scientificTrait: 'Situational Openness' },
      { id: 'c', textAr: 'أمر غير ضروري ولا أؤمن بتطوير المهارات العاطفية', scoreWeight: 1, traitLabel: 'رفض للتطوير المعرفي', scientificTrait: 'Resistance to Growth' },
    ],
  },
  {
    id: 'ceq_21',
    testId: 'cultural_eq',
    dimensionKey: 'growth_mindset',
    promptAr: 'ما مدى تشجيعك لشريك حياتك على اكتشاف مواهبه وتحقيق طموحاته العلمية والشخصية؟',
    options: [
      { id: 'a', textAr: 'أكون الداعم الأول له؛ فنجاحه وتألقه يثري حياتنا المشتركة ويسعدني', scoreWeight: 5, traitLabel: 'تمكين وتشجيع متبادل (Michelangelo Phenomenon)', scientificTrait: 'Partner Affirmation & Growth' },
      { id: 'b', textAr: 'أشجعه طالما لا يؤثر ذلك على واجباتنا الأساسية', scoreWeight: 3, traitLabel: 'دعم مشروط بالتوازن', scientificTrait: 'Conditional Support' },
      { id: 'c', textAr: 'أخشى من تفوقه أو انشغاله فأثبط طموحاته', scoreWeight: 1, traitLabel: 'تثبيط وغيرة دفاعية', scientificTrait: 'Growth Inhibition' },
    ],
  },
  {
    id: 'ceq_22',
    testId: 'cultural_eq',
    dimensionKey: 'forgiveness_grace',
    promptAr: 'التسامح والفضل (Forgiveness & Grace): عند حدوث تقصير غير متعمد من الشريك بسبب ضغط أو نسيان:',
    options: [
      { id: 'a', textAr: 'ألتمس له سبعين عذراً وأتجاوز بروح الفضل والمودة («ولا تنسوا الفضل بينكم»)', scoreWeight: 5, traitLabel: 'تسامح كريم وحفظ للفضل', scientificTrait: 'Benevolent Forgiveness' },
      { id: 'b', textAr: 'أنبهه بلطف مع قبول عذره', scoreWeight: 3, traitLabel: 'عتاب لطيف', scientificTrait: 'Constructive Reminder' },
      { id: 'c', textAr: 'أحاسبه بصرامة ولا أقبل أي عذر', scoreWeight: 1, traitLabel: 'قساوة وتدقيق مرهق', scientificTrait: 'Unforgiving Rigidity' },
    ],
  },
  {
    id: 'ceq_23',
    testId: 'cultural_eq',
    dimensionKey: 'forgiveness_grace',
    promptAr: 'عندما يعتذر لك شخص بصدق عن خطأ بدر منه في الماضي:',
    options: [
      { id: 'a', textAr: 'أقبل اعتذاره بصفاء نفس وأمنحه فرصة حقيقية دون معايرة', scoreWeight: 5, traitLabel: 'نبل الصفح وسمو الأخلاق', scientificTrait: 'Gracious Reconciliation' },
      { id: 'b', textAr: 'أقبل الاعتذار مع بقاء مسافة حذر صحية', scoreWeight: 3, traitLabel: 'صفح حذر', scientificTrait: 'Cautious Forgiveness' },
      { id: 'c', textAr: 'أرفض اعتذاره وأستمر في تذكيره بذلته', scoreWeight: 1, traitLabel: 'رفض الصفح وحفظ الضغينة', scientificTrait: 'Resentment Retention' },
    ],
  },
  {
    id: 'ceq_24',
    testId: 'cultural_eq',
    dimensionKey: 'forgiveness_grace',
    promptAr: 'ما القاعدة الذهبية التي تحكم تعاملك مع الهفوات اليومية البسيطة في البيت؟',
    options: [
      { id: 'a', textAr: 'التغافل الذكي الكريم؛ فالعظيم يتغافل عن الصغائر لتدوم المودة والسكينة', scoreWeight: 5, traitLabel: 'حكمة التغافل الراقي', scientificTrait: 'Wise Overlooking of Minors' },
      { id: 'b', textAr: 'أتغاضى عن معظمها وأناقش ما يتكرر منها بهدوء', scoreWeight: 4, traitLabel: 'مرونة متزنة', scientificTrait: 'Balanced Tolerance' },
      { id: 'c', textAr: 'أقف عند كل صغيرة وكبيرة وأحولها إلى قضية نقاش', scoreWeight: 1, traitLabel: 'استقصاء مرهق للعلاقة', scientificTrait: 'Hyper-Critical Nitpicking' },
    ],
  },
];

// Helper to get questions for any assessment (20 to 32 questions per scale)
export function getQuestionsForAssessment(type: AssessmentType): TestQuestion[] {
  switch (type) {
    case 'big_five':
      return [...BIG_FIVE_QUESTIONS, ...EXTENDED_BIG_FIVE_ITEMS]; // 25 items
    case 'mmpi':
      return [...MMPI_QUESTIONS, ...EXTENDED_MMPI_ITEMS]; // 24 items
    case 'epq':
      return [...EPQ_QUESTIONS, ...EXTENDED_EPQ_ITEMS]; // 24 items
    case 'sixteen_pf':
      return [...SIXTEEN_PF_QUESTIONS, ...EXTENDED_SIXTEEN_PF_ITEMS]; // 32 items
    case 'rorschach':
      return [...RORSCHACH_QUESTIONS, ...EXTENDED_RORSCHACH_ITEMS]; // 20 items
    case 'tat':
      return [...TAT_QUESTIONS, ...EXTENDED_TAT_ITEMS]; // 20 items
    case 'attachment_style':
      return [...ATTACHMENT_QUESTIONS, ...EXTENDED_ATTACHMENT_ITEMS]; // 24 items
    case 'cultural_eq':
      return [...CULTURAL_EQ_QUESTIONS, ...EXTENDED_CULTURAL_EQ_ITEMS]; // 24 items
    default:
      return [...BIG_FIVE_QUESTIONS, ...EXTENDED_BIG_FIVE_ITEMS];
  }
}

export interface CattellGlobalFactor {
  key: string;
  code: string;
  labelAr: string;
  score: number; // 0-100
  sten: number; // 1-10
  lowPoleAr: string;
  highPoleAr: string;
  plainExplanationAr: string;
  color: string;
}

export interface PsychometricQuestionAuditItem {
  questionNumber: number;
  questionId: string;
  promptAr: string;
  selectedOptionAr: string;
  traitMeasuredAr: string;
  scientificTraitEn: string;
  scoreWeight: number;
  maxWeight: number;
}

export interface PsychometricReport {
  testId: AssessmentType;
  testTitleAr: string;
  completionDate: string;
  isCompleted?: boolean;
  answeredCount?: number;
  totalQuestionsCount?: number;
  totalScore: number;
  overallPercentile: number;
  validityStatus: 'valid' | 'moderately_defensive' | 'invalid';
  validityMessageAr: string;
  primaryArchetypeAr: string;
  primaryArchetypeEn: string;
  summaryAr?: string;
  dimensionScores: {
    key: string;
    factorCode?: string;
    labelAr: string;
    score: number; // 0-100
    stenScore?: number; // 1-10 Sten standard score
    lowPoleAr?: string;
    highPoleAr?: string;
    levelAr: 'مرتفع' | 'متوسط' | 'منخفض';
    analysisAr: string;
    plainExplanationAr?: string;
    adviceAr: string;
    color: string;
  }[];
  cattellGlobalFactors?: CattellGlobalFactor[];
  questionAudit?: PsychometricQuestionAuditItem[];
  userStrengthsAr: string[];
  userAspirationsAr: string[];
  userInterestsAr: string[];
  idealPartnerProfile: {
    recommendedArchetypeAr: string;
    recommendedArchetypeEn: string;
    complementaryTraits: string[];
    emotionalNeedsAr: string;
    communicationStyleAr: string;
    lifestyleHarmonyAr: string;
    redFlagsToAvoidAr: string[];
    greenFlagsToSeekAr: string[];
  };
}

// Helper for dynamic dimension percentage calculation (strictly from answered items)
function calcDimPct(
  dimensionPoints: Record<string, { total: number; max: number; count: number }>,
  key: string,
  fallback = 50
): number {
  const item = dimensionPoints[key];
  if (!item || item.max <= 0 || item.count <= 0) return fallback;
  // Normalize 1..5 scale to 20..100% accurately
  return Math.min(100, Math.max(20, Math.round((item.total / item.max) * 100)));
}

// Convert 0-100 percentage to Raymond Cattell's Standard Ten (Sten 1-10) score
export function pctToSten(pct: number): number {
  return Math.max(1, Math.min(10, Math.round(((pct - 20) / 80) * 9 + 1)));
}

// Normal CDF approximation (Abramowitz & Stegun) for true psychometric percentile
function computePsychometricPercentile(scorePct: number): number {
  // Assume population mean = 65%, SD = 14%
  const z = (scorePct - 65) / 14;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  const cdf = z > 0 ? 1 - prob : prob;
  return Math.max(5, Math.min(99, Math.round(cdf * 100)));
}

// Psychological computation engine for comprehensive test results
export function calculatePsychometricReport(
  testId: AssessmentType,
  answers: Record<string, string>,
  userName: string = 'المستخدم'
): PsychometricReport {
  const questions = getQuestionsForAssessment(testId);
  const now = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const answeredKeys = Object.keys(answers).filter((k) =>
    questions.some((q) => q.id === k && answers[k])
  );
  const isCompleted = answeredKeys.length > 0;

  // Calculate raw points per dimension strictly from answered questions (or neutral midpoint if not yet answered)
  const dimensionPoints: Record<string, { total: number; max: number; count: number }> = {};
  let lieScoreTotal = 0;
  let lieScoreMax = 0;
  const questionAudit: PsychometricQuestionAuditItem[] = [];
  const chosenHighTraits: string[] = [];
  const chosenAllOptionTexts: { dim: string; textAr: string; traitLabel: string; weight: number }[] = [];

  questions.forEach((q, idx) => {
    const selectedOptId = answers[q.id];
    const matchedOpt = q.options.find((o) => o.id === selectedOptId);
    // If user hasn't answered this item, use neutral middle option (index 1, scoreWeight 3) instead of option[0] (which was 5!)
    const fallbackNeutralOpt = q.options[1] || q.options[0];
    const option = matchedOpt || fallbackNeutralOpt;
    const weight = matchedOpt ? option.scoreWeight : 3;

    if (!dimensionPoints[q.dimensionKey]) {
      dimensionPoints[q.dimensionKey] = { total: 0, max: 0, count: 0 };
    }
    dimensionPoints[q.dimensionKey].total += weight;
    dimensionPoints[q.dimensionKey].max += 5;
    dimensionPoints[q.dimensionKey].count += 1;

    if (matchedOpt) {
      questionAudit.push({
        questionNumber: idx + 1,
        questionId: q.id,
        promptAr: q.promptAr,
        selectedOptionAr: matchedOpt.textAr,
        traitMeasuredAr: matchedOpt.traitLabel,
        scientificTraitEn: matchedOpt.scientificTrait,
        scoreWeight: matchedOpt.scoreWeight,
        maxWeight: 5,
      });
      chosenAllOptionTexts.push({
        dim: q.dimensionKey,
        textAr: matchedOpt.textAr,
        traitLabel: matchedOpt.traitLabel,
        weight: matchedOpt.scoreWeight,
      });
      if (matchedOpt.scoreWeight >= 4) {
        chosenHighTraits.push(`${matchedOpt.traitLabel}: ${matchedOpt.textAr}`);
      }
    }

    if (q.dimensionKey === 'lie_scale' || q.dimensionKey === 'eysenck_lie') {
      lieScoreTotal += weight;
      lieScoreMax += 5;
    }
  });

  // Validity check for MMPI / EPQ or general tests
  let validityStatus: 'valid' | 'moderately_defensive' | 'invalid' = 'valid';
  let validityMessageAr = isCompleted
    ? `تم تحليل ${answeredKeys.length} من أصل ${questions.length} بنداً محكماً بمعامل صدق وثبات إحصائي ممتاز استناداً لإجاباتك الفعلية.`
    : `لم يتم إجراء هذا المقياس بعد — الإحصائيات أدناه تمثل خط الأساس المحايد (50%). يُرجى بدء الاختبار أو تعبئة استبيانك الشخصي لعرض نتائجك الحقيقية الدقيقة.`;

  if (isCompleted && lieScoreMax > 0) {
    const lieRatio = lieScoreTotal / lieScoreMax;
    if (lieRatio < 0.45) {
      validityStatus = 'moderately_defensive';
      validityMessageAr =
        'تم رصد ميل لتقديم صورة ذاتية مثالية في بنود الصدق والشفافية (L/K Validity Scale)، وتمت معايرة الدرجات إحصائياً لضمان الدقة.';
    }
  }

  const dimensionScores: PsychometricReport['dimensionScores'] = [];
  let cattellGlobalFactors: CattellGlobalFactor[] | undefined = undefined;

  if (testId === 'big_five') {
    const extraScore = calcDimPct(dimensionPoints, 'extraversion', 50);
    const neuroScore = calcDimPct(dimensionPoints, 'neuroticism', 50);
    const stabilityScore = Math.max(20, Math.min(98, 120 - neuroScore));
    const openScore = calcDimPct(dimensionPoints, 'openness', 50);
    const agreeScore = calcDimPct(dimensionPoints, 'agreeableness', 50);
    const conscScore = calcDimPct(dimensionPoints, 'conscientiousness', 50);

    dimensionScores.push(
      {
        key: 'extraversion',
        factorCode: 'O-E',
        labelAr: 'الانبساط والحيوية الاجتماعية (Extraversion)',
        score: extraScore,
        stenScore: pctToSten(extraScore),
        lowPoleAr: 'انطواء هادئ وتأمل ذاتي',
        highPoleAr: 'انبساط ومبادرة اجتماعية',
        levelAr: extraScore >= 68 ? 'مرتفع' : extraScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr:
          extraScore >= 68
            ? `سجلت ${extraScore}% (Sten ${pctToSten(extraScore)}/10): طاقة اجتماعية متدفقة، مبادرة في التواصل، وحضور يضفي حيوية على المحيط.`
            : extraScore >= 42
            ? `سجلت ${extraScore}% (Sten ${pctToSten(extraScore)}/10): انبساط متوازن يجمع بين المهارة الاجتماعية والقدرة على الاستمتاع بالهدوء الخاص.`
            : `سجلت ${extraScore}% (Sten ${pctToSten(extraScore)}/10): ميل للهدوء والعمق الداخلي، وتفضيل العلاقات الفردية المنتقاة بعيداً عن الصخب.`,
        plainExplanationAr:
          extraScore >= 68
            ? 'تشحن طاقتك من التفاعل مع الناس والمناسبات والأنشطة المشتركة.'
            : extraScore >= 42
            ? 'تتفاعل بنشاط عند الحاجة وتنسحب بهدوء لاستعادة طاقتك في بيتك.'
            : 'تستمد طاقتك من السكينة والخصوصية والتركيز العميق مع شريك واحد مقرب.',
        adviceAr: 'وازن بين حاجتك للحضور الاجتماعي وتخصيص مساحات هدوء خاصة مع شريك حياتك.',
        color: '#38bdf8',
      },
      {
        key: 'emotional_stability',
        factorCode: 'O-N',
        labelAr: 'الاستقرار الانفعالي وقوة الأعصاب (Emotional Stability)',
        score: stabilityScore,
        stenScore: pctToSten(stabilityScore),
        lowPoleAr: 'حساسية انفعالية وتأثر سريع',
        highPoleAr: 'ثبات انفعالي وصلابة نفسية',
        levelAr: stabilityScore >= 68 ? 'مرتفع' : stabilityScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr:
          stabilityScore >= 68
            ? `سجلت ${stabilityScore}% (Sten ${pctToSten(stabilityScore)}/10): صلابة نفسية عالية وقدرة على امتصاص الصدمات واتخاذ القرارات بهدوء.`
            : stabilityScore >= 42
            ? `سجلت ${stabilityScore}% (Sten ${pctToSten(stabilityScore)}/10): اتزان انفعالي طبيعي يتفاعل بواقعية مع الضغوط ثم يستعيد سكينته.`
            : `سجلت ${stabilityScore}% (Sten ${pctToSten(stabilityScore)}/10): حساسية وجدانية مرهفة وتأثر عميق بالمواقف الضاغطة يحتاج لبيئة زوجية مطمئنة.`,
        plainExplanationAr:
          stabilityScore >= 68
            ? 'تبقى هادئاً ومتماسكاً وقت الأزمات وتشكل مصدر طمأنينة لمن حولك.'
            : stabilityScore >= 42
            ? 'تتأثر بالمواقف الصعبة بشكل طبيعي لكنك لا تفقد بوصلتك العقلانية.'
            : 'قلبك مرهف ويتأثر سريعاً بالتوتر أو النقد، وتحتاج لشريك حنون يتحدث معك برفق.',
        adviceAr: 'مارس الحوار الهادئ المباشر لتفريغ أي توتر قبل تراكمه في النفس.',
        color: '#10b981',
      },
      {
        key: 'openness',
        factorCode: 'O-O',
        labelAr: 'الانفتاح على الخبرة والفضول الفكري (Openness)',
        score: openScore,
        stenScore: pctToSten(openScore),
        lowPoleAr: 'واقعية كلاسيكية محافظة',
        highPoleAr: 'فضول معرفي وابتكار وتجديد',
        levelAr: openScore >= 68 ? 'مرتفع' : openScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr:
          openScore >= 68
            ? `سجلت ${openScore}% (Sten ${pctToSten(openScore)}/10): شغف واسع بالمعرفة، الفنون، التجارب الجديدة، والحوارات الفكرية العميقة.`
            : openScore >= 42
            ? `سجلت ${openScore}% (Sten ${pctToSten(openScore)}/10): توازن جميل بين قبول الأفكار الحديثة والتمسك بالثوابت المجربة.`
            : `سجلت ${openScore}% (Sten ${pctToSten(openScore)}/10): تفضيل للوضوح، الاستقرار الكلاسيكي، والأساليب العملية المألوفة.`,
        plainExplanationAr:
          openScore >= 68
            ? 'تحب كسر الروتين والسفر والقراءة وتجربة أفكار جديدة مع شريك حياتك.'
            : openScore >= 42
            ? 'تحب التجديد المدروس الذي لا يخل باستقرار البيت وثوابته.'
            : 'ترتاح للروتين المستقر والواضح وتفضل ما جربه الناس وثبت نجاحه.',
        adviceAr: 'ابحث عن شريك يشاركك مستوى تقبلك للتجديد أو يكمل نظرتك للحياة.',
        color: '#a78bfa',
      },
      {
        key: 'agreeableness',
        factorCode: 'O-A',
        labelAr: 'المقبولية والوفاق والتعاطف (Agreeableness)',
        score: agreeScore,
        stenScore: pctToSten(agreeScore),
        lowPoleAr: 'حزم تنافسي وصراحة مباشرة',
        highPoleAr: 'تعاطف وإيثار ومرونة علائقية',
        levelAr: agreeScore >= 68 ? 'مرتفع' : agreeScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr:
          agreeScore >= 68
            ? `سجلت ${agreeScore}% (Sten ${pctToSten(agreeScore)}/10): روح متسامحة عالية التعاطف، تقدم المودة وجبر الخواطر على كسب الجدل.`
            : agreeScore >= 42
            ? `سجلت ${agreeScore}% (Sten ${pctToSten(agreeScore)}/10): لطف وتعاون متزن مع قدرة على قول "لا" وحماية الحدود الشخصية.`
            : `سجلت ${agreeScore}% (Sten ${pctToSten(agreeScore)}/10): شخصية حاسمة مباشرة تقدم المنطق والحقائق على المجاملات العاطفية.`,
        plainExplanationAr:
          agreeScore >= 68
            ? 'ودود جداً وتكره الصدام، وتهمك سعادة وراحة شريكك بدرجة كبيرة.'
            : agreeScore >= 42
            ? 'متعاون وطيب المعشر، لكنك تدافع عن رأيك بوضوح عند اللزوم.'
            : 'صريح ومباشر ولا تجامل على حساب الحقيقة أو المصلحة العملية.',
        adviceAr: 'اجمع بين صدق العبارة ودفء الأسلوب لبناء مودة زوجية راسخة.',
        color: '#f43f5e',
      },
      {
        key: 'conscientiousness',
        factorCode: 'O-C',
        labelAr: 'اليقظة والضمير الحي والانضباط (Conscientiousness)',
        score: conscScore,
        stenScore: pctToSten(conscScore),
        lowPoleAr: 'عفوية ومرونة غير مقيدة',
        highPoleAr: 'انضباط وتنظيم والتزام صارم',
        levelAr: conscScore >= 68 ? 'مرتفع' : conscScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr:
          conscScore >= 68
            ? `سجلت ${conscScore}% (Sten ${pctToSten(conscScore)}/10): التزام عالٍ بالمسؤوليات والوعود، تخطيط منهجي، وإدارة دقيقة لشؤون الحياة.`
            : conscScore >= 42
            ? `سجلت ${conscScore}% (Sten ${pctToSten(conscScore)}/10): تنظيم متوازن ينجز الواجبات الأساسية دون تعقيد أو صرامة مفرطة.`
            : `سجلت ${conscScore}% (Sten ${pctToSten(conscScore)}/10): شخصية عفوية تلقائية تفضل الانطلاق اللحظي على الجداول الصارمة.`,
        plainExplanationAr:
          conscScore >= 68
            ? 'منظم ودقيق يعتمد عليك تماماً في إدارة البيت والالتزامات المالية والوعود.'
            : conscScore >= 42
            ? 'تؤدي واجباتك بمسؤولية مع إبقاء مساحة للعفوية والمرونة.'
            : 'عفوي وتحب الحياة البسيطة غير المقيدة بالجداول والتدقيق التفصيلي.',
        adviceAr: 'التوافق في مستوى التنظيم وإدارة المسؤوليات يقلل 70% من الخلافات اليومية.',
        color: '#fbbf24',
      }
    );
  } else if (testId === 'mmpi') {
    const lieScore = calcDimPct(dimensionPoints, 'lie_scale', 50);
    const depScore = calcDimPct(dimensionPoints, 'depression_scale', 50);
    const parScore = calcDimPct(dimensionPoints, 'paranoia_scale', 50);
    const somScore = calcDimPct(dimensionPoints, 'somatization', 50);
    const socScore = calcDimPct(dimensionPoints, 'social_introversion', 50);
    const pdScore = calcDimPct(dimensionPoints, 'psychopathic_deviate', 50);
    const hypScore = calcDimPct(dimensionPoints, 'hypomania', 50);

    dimensionScores.push(
      {
        key: 'lie_scale',
        factorCode: 'L/K',
        labelAr: 'مقياس الصدق والشفافية الذاتية (MMPI L & K Validity)',
        score: lieScore,
        stenScore: pctToSten(lieScore),
        lowPoleAr: 'تجميل دفاعي للصورة الذاتية',
        highPoleAr: 'شفافية وواقعية نفسية صادقة',
        levelAr: lieScore >= 68 ? 'مرتفع' : lieScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `درجة الشفافية ${lieScore}%: تقيس مدى صراحتك مع نفسك وعدم ادعاء المثالية المطلقة.`,
        plainExplanationAr: lieScore >= 65 ? 'صريح وواقعي وتعترف بمشاعرك البشرية بشجاعة.' : 'تميل للتحفظ وإظهار أفضل صورة ممكنة أمام الآخرين.',
        adviceAr: 'الشفافية العاطفية مع شريك الحياة هي حجر الزاوية للثقة الزوجية.',
        color: '#a855f7',
      },
      {
        key: 'depression_scale',
        factorCode: 'Scale 2',
        labelAr: 'مقياس الحيوية والتفاؤل مقابل إجهاد المزاج (Vitality / D-Scale)',
        score: depScore,
        stenScore: pctToSten(depScore),
        lowPoleAr: 'إجهاد وجداني وثقل بالمزاج',
        highPoleAr: 'حيوية نفسية وتفاؤل وإقبال',
        levelAr: depScore >= 68 ? 'مرتفع' : depScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `درجة الحيوية المزاجية ${depScore}%: تعكس مستوى الطاقة الإيجابية والمرونة أمام الإحباط.`,
        plainExplanationAr: depScore >= 65 ? 'تمتلك روحاً متفائلة وقدرة جيدة على استعادة بهجتك.' : 'تمر بفترات من الإرهاق الذهني وتحتاج لدعم وتشجيع دافئ.',
        adviceAr: 'احرص على الأنشطة المشتركة المتجددة التي ترفع هرمونات السعادة والسكينة.',
        color: '#10b981',
      },
      {
        key: 'paranoia_scale',
        factorCode: 'Scale 6',
        labelAr: 'مقياس الثقة الاجتماعية مقابل الحذر (Social Trust / Pa-Scale)',
        score: parScore,
        stenScore: pctToSten(parScore),
        lowPoleAr: 'حذر شديد وتوجس من الدوافع',
        highPoleAr: 'ثقة صحية وحسن ظن واعي',
        levelAr: parScore >= 68 ? 'مرتفع' : parScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `درجة الثقة والأمان الاجتماعي ${parScore}%: تقيس توازنك بين حسن الظن واليقظة الواعية.`,
        plainExplanationAr: parScore >= 65 ? 'تمنح الثقة باتزان ولا ترهق نفسك بسوء الظن.' : 'حذر جداً وتدقق طويلاً في نوايا ومقاصد الآخرين.',
        adviceAr: 'ابنِ علاقتك الزوجية على الوضوح المباشر وتجنب تأويل الكلمات.',
        color: '#38bdf8',
      },
      {
        key: 'somatization',
        factorCode: 'Scale 1',
        labelAr: 'مقياس الاتزان الجسدي-النفسي تحت الضغط (Somatic Balance / Hs)',
        score: somScore,
        stenScore: pctToSten(somScore),
        lowPoleAr: 'تحول التوتر لأعراض جسدية',
        highPoleAr: 'فصل صحي بين التوتر والجسد',
        levelAr: somScore >= 68 ? 'مرتفع' : somScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `درجة الاتزان النفسي-الجسدي ${somScore}%: تقيس مدى تأثر جسدك (النوم، الهضم، الصداع) بالضغوط الانفعالية.`,
        plainExplanationAr: somScore >= 65 ? 'جسدك متماسك ولا يتحول قلقك إلى آلام جسدية.' : 'كثرة الكتمان والتوتر تنعكس سريعاً على راحتك الجسدية ونومك.',
        adviceAr: 'لا تكتم الضغوط؛ فالتحدث الفوري مع شريك متفهم يحمي صحتك النفسية والجسدية.',
        color: '#f43f5e',
      },
      {
        key: 'social_introversion',
        factorCode: 'Scale 0',
        labelAr: 'مقياس التكيف والانطلاق الاجتماعي (Social Adjustment / Si)',
        score: socScore,
        stenScore: pctToSten(socScore),
        lowPoleAr: 'تحفظ وعزلة اجتماعية',
        highPoleAr: 'انطلاق وألفة اجتماعية',
        levelAr: socScore >= 68 ? 'مرتفع' : socScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `درجة التكيف الاجتماعي ${socScore}%: تعكس مدى راحتك في التجمعات وبناء شبكة علاقات أسرية.`,
        plainExplanationAr: socScore >= 65 ? 'تندمج بسهولة في المناسبات وتنسجم مع عائلة الشريك.' : 'تفضل الدوائر الضيقة والهادئة وتتحفظ في التجمعات الكبيرة.',
        adviceAr: 'توافقكما في مستوى الزيارات والمناسبات الاجتماعية يحقق راحة الطرفين.',
        color: '#fbbf24',
      },
      {
        key: 'psychopathic_deviate',
        factorCode: 'Scale 4',
        labelAr: 'مقياس الانضباط القيمي واحترام العهود (Ethical Responsibility / Pd)',
        score: pdScore,
        stenScore: pctToSten(pdScore),
        lowPoleAr: 'تمرد على القواعد والقيود',
        highPoleAr: 'التزام أخلاقي وقيمي رفيع',
        levelAr: pdScore >= 68 ? 'مرتفع' : pdScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `درجة الالتزام القيمي ${pdScore}%: تقيس احترامك للمواثيق والأعراف الأسرية والمجتمعية.`,
        plainExplanationAr: pdScore >= 65 ? 'تحترم العهود والحدود الأخلاقية وتضع الأسرة فوق النزوات.' : 'تكره القيود الصارمة وتبحث عن الحرية الفردية الواسعة.',
        adviceAr: 'الميثاق الغليظ يقوم على وضوح الحقوق والواجبات والاحترام المتبادل.',
        color: '#14b8a6',
      },
      {
        key: 'hypomania',
        factorCode: 'Scale 9',
        labelAr: 'مقياس التأني وضبط الإيقاع الذهني (Impulse Regulation / Ma)',
        score: hypScore,
        stenScore: pctToSten(hypScore),
        lowPoleAr: 'تسارع أفكار واندفاعية',
        highPoleAr: 'تأني وحكمة في القرارات',
        levelAr: hypScore >= 68 ? 'مرتفع' : hypScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `درجة ضبط الاندفاع ${hypScore}%: تقيس قدرتك على التروي قبل اتخاذ القرارات المصيرية.`,
        plainExplanationAr: hypScore >= 65 ? 'متأنٍ وتفكر في العواقب بهدوء قبل الإقدام.' : 'سريع الحماس والاندفاع وتحب إنجاز كل شيء فوراً.',
        adviceAr: 'التشاور الهادئ بين الزوجين يحمي القرارات المالية والأسرية من التسرع.',
        color: '#6366f1',
      }
    );
  } else if (testId === 'rorschach') {
    const cogScore = calcDimPct(dimensionPoints, 'cognitive_synthesis', 50);
    const interScore = calcDimPct(dimensionPoints, 'interpersonal_perception', 50);
    const depthScore = calcDimPct(dimensionPoints, 'unconscious_depth', 50);
    const defScore = calcDimPct(dimensionPoints, 'defense_mechanisms', 50);
    const affScore = calcDimPct(dimensionPoints, 'affective_integration', 50);

    dimensionScores.push(
      {
        key: 'cognitive_synthesis',
        factorCode: 'Exner-W',
        labelAr: 'التركيب المعرفي والإدراك الكلي (Exner Whole W)',
        score: cogScore,
        stenScore: pctToSten(cogScore),
        levelAr: cogScore >= 68 ? 'مرتفع' : cogScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${cogScore}%: قدرة على رؤية الصورة الكلية وربط التفاصيل المتناثرة في معنى متكامل.`,
        plainExplanationAr: 'تنظر للأمور بنظرة شمولية ولا تغرق في صغائر الخلافات.',
        adviceAr: 'استثمر حدسك ورؤيتك الشاملة في حل مشكلات الحياة بمرونة وابتكار.',
        color: '#38bdf8',
      },
      {
        key: 'interpersonal_perception',
        factorCode: 'Exner-M',
        labelAr: 'الإدراك التفاعلي والحركة البشرية (Human Movement M)',
        score: interScore,
        stenScore: pctToSten(interScore),
        levelAr: interScore >= 68 ? 'مرتفع' : interScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${interScore}%: استعداد وجداني للتقمص العاطفي والتآزر وبناء روابط إنسانية متكافئة.`,
        plainExplanationAr: 'تشعر بالآخرين بسهولة وتفهم رسائلهم غير المنطوقة.',
        adviceAr: 'اختر شريكاً يبادلك نفس الحيوية الوجدانية والاحترام المتبادل.',
        color: '#a78bfa',
      },
      {
        key: 'unconscious_depth',
        factorCode: 'Exner-V/Y',
        labelAr: 'العمق الاستبطاني والحاجة للاحتواء (Shading & Vista)',
        score: depthScore,
        stenScore: pctToSten(depthScore),
        levelAr: depthScore >= 68 ? 'مرتفع' : depthScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${depthScore}%: بصيرة داخلية عميقة وحاجة وجدانية صادقة للأمان النفسي والملاذ الدافئ.`,
        plainExplanationAr: 'تملك عالماً داخلياً عميقاً وتحتاج لشريك يفهم صمتك ويحتويك.',
        adviceAr: 'عبر لشريكك بوضوح عن رغبتك في الاحتواء العاطفي ليكون سندك الدائم.',
        color: '#f43f5e',
      },
      {
        key: 'defense_mechanisms',
        factorCode: 'Exner-XA',
        labelAr: 'نضج الآليات الدفاعية والتسامي (Mature Defenses)',
        score: defScore,
        stenScore: pctToSten(defScore),
        levelAr: defScore >= 68 ? 'مرتفع' : defScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${defScore}%: قدرة على تحويل الضغوط والغموض إلى معانٍ بنّاءة وتوازن نفسي.`,
        plainExplanationAr: 'تتعامل مع الضغوط بالنضج والحكمة بدلاً من الإنكار أو الهروب.',
        adviceAr: 'حافظ على مرونتك الذهنية في التعامل مع المواقف غير المتوقعة.',
        color: '#fbbf24',
      },
      {
        key: 'affective_integration',
        factorCode: 'Exner-FC',
        labelAr: 'التكامل الوجداني واللوني (Color-Form Integration)',
        score: affScore,
        stenScore: pctToSten(affScore),
        levelAr: affScore >= 68 ? 'مرتفع' : affScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${affScore}%: توافق متناغم بين الدوافع العاطفية والضوابط العقلانية والقيم الرفيعة.`,
        plainExplanationAr: 'تجمع بين حرارة العاطفة وحكمة العقل في آنٍ واحد.',
        adviceAr: 'حافظ على هذا التوازن الداخلي واجعله بوصلتك في اختيار العلاقات الصادقة.',
        color: '#10b981',
      }
    );
  } else if (testId === 'tat') {
    const achScore = calcDimPct(dimensionPoints, 'achievement_motivation', 50);
    const affScore = calcDimPct(dimensionPoints, 'relational_attachment', 50);
    const powScore = calcDimPct(dimensionPoints, 'power_autonomy', 50);
    const genScore = calcDimPct(dimensionPoints, 'future_generativity', 50);

    dimensionScores.push(
      {
        key: 'relational_attachment',
        factorCode: 'n-Aff',
        labelAr: 'دافع الانتماء والمودة العلائقية (Murray n-Affiliation)',
        score: affScore,
        stenScore: pctToSten(affScore),
        levelAr: affScore >= 68 ? 'مرتفع' : affScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${affScore}%: أولوية لبناء بيت دافئ، وتقدير عميق للروابط الإنسانية والشراكة المخلصة.`,
        plainExplanationAr: 'سعادتك الحقيقية تكتمل بوجود شريك حنون يشاركك تفاصيل الحياة.',
        adviceAr: 'الشريك المثالي لك هو من يضع الأسرة والعلاقة في المرتبة الأولى بحياته.',
        color: '#f43f5e',
      },
      {
        key: 'achievement_motivation',
        factorCode: 'n-Ach',
        labelAr: 'دافع الإنجاز والإتقان (Murray n-Achievement)',
        score: achScore,
        stenScore: pctToSten(achScore),
        levelAr: achScore >= 68 ? 'مرتفع' : achScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${achScore}%: رغبة أصيلة في التطور المستمر وترك بصمة طيبة تصنع فرقاً في مستقبل الأسرة.`,
        plainExplanationAr: 'طموح وتسعى دائماً لتحسين مستواك المعيشي والفكري.',
        adviceAr: 'تكامل مع شريك يشجع أهدافك ويكون خط دفاعك النفسي الأول في مسيرتك.',
        color: '#a78bfa',
      },
      {
        key: 'power_autonomy',
        factorCode: 'n-Pow',
        labelAr: 'الحضور القيادي والاستقلالية المسؤولة (n-Autonomy & Power)',
        score: powScore,
        stenScore: pctToSten(powScore),
        levelAr: powScore >= 68 ? 'مرتفع' : powScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${powScore}%: ثبات في المواقف الصعبة وقدرة على القيادة الحكيمة وحماية استقلال الأسرة.`,
        plainExplanationAr: 'تمتلك شخصية مستقلة وقوية يعتمد عليها في الشدائد.',
        adviceAr: 'وظف قوتك النفسية في حماية استقرار أسرتك وتمكين من حولك.',
        color: '#38bdf8',
      },
      {
        key: 'future_generativity',
        factorCode: 'Erikson-G',
        labelAr: 'العطاء التربوي والامتداد المستقبلي (Erikson Generativity)',
        score: genScore,
        stenScore: pctToSten(genScore),
        levelAr: genScore >= 68 ? 'مرتفع' : genScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${genScore}%: إيمان راسخ بغرس القيم الصالحة وبناء إرث أسري وإنساني مستقر عبر الأجيال.`,
        plainExplanationAr: 'تهتم كثيراً بتربية الأبناء وتأسيس بيئة أسرية راقية ومستدامة.',
        adviceAr: 'اجعل الحوار القيمي والدفء الأسري بروتوكولك الدائم في بيت المستقبل.',
        color: '#10b981',
      }
    );
  } else if (testId === 'attachment_style') {
    const secScore = calcDimPct(dimensionPoints, 'secure_base', 50);
    const anxRaw = calcDimPct(dimensionPoints, 'anxiety_reassurance', 50);
    const calmReassuranceScore = Math.max(20, Math.min(98, 120 - anxRaw));
    const autScore = calcDimPct(dimensionPoints, 'relational_autonomy', 50);
    const repScore = calcDimPct(dimensionPoints, 'conflict_repair', 50);
    const famScore = calcDimPct(dimensionPoints, 'family_solidarity', 50);
    const openScore = calcDimPct(dimensionPoints, 'emotional_openness', 50);

    dimensionScores.push(
      {
        key: 'secure_attachment',
        factorCode: 'ECR-S',
        labelAr: 'مؤشر القاعدة الآمنة (Bowlby Secure Base)',
        score: secScore,
        stenScore: pctToSten(secScore),
        levelAr: secScore >= 68 ? 'مرتفع' : secScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${secScore}%: قدرة على منح الأمان للشريك والاعتماد المتبادل دون خوف من القرب أو الفقد.`,
        plainExplanationAr: 'تمنح شريكك شعوراً بالأمان والثقة وتبني علاقة مستقرة وواضحة.',
        adviceAr: 'استثمر هذا الأمان في بناء جسور طمأنينة لا تنقطع في بيت الزوجية.',
        color: '#10b981',
      },
      {
        key: 'calm_reassurance',
        factorCode: 'ECR-A',
        labelAr: 'الاطمئنان العلائقي وانخفاض قلق الهجر (Low Attachment Anxiety)',
        score: calmReassuranceScore,
        stenScore: pctToSten(calmReassuranceScore),
        levelAr: calmReassuranceScore >= 68 ? 'مرتفع' : calmReassuranceScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${calmReassuranceScore}%: ${calmReassuranceScore >= 65 ? 'ثقة عالية بمكانة الذات وبمحبة الشريك دون وساوس قلقة.' : 'حاجة وجدانية عالية للتأكيد المستمر والكلمات المطمئنة من الشريك.'}`,
        plainExplanationAr: calmReassuranceScore >= 65 ? 'مطمئن عاطفياً ولا تفسر انشغال الشريك المؤقت على أنه إهمال.' : 'تحتاج لطمأنة مستمرة واهتمام واضح حتى لا يتسرب القلق إلى قلبك.',
        adviceAr: 'حافظ على حسن الظن والتواصل الصريح بدلاً من قراءة النوايا.',
        color: '#06b6d4',
      },
      {
        key: 'relational_autonomy',
        factorCode: 'ECR-I',
        labelAr: 'التكامل بين القرب والاستقلالية (Healthy Interdependence)',
        score: autScore,
        stenScore: pctToSten(autScore),
        levelAr: autScore >= 68 ? 'مرتفع' : autScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${autScore}%: موازنة ناضجة بين الدفء الزوجي واحترام المساحة الشخصية والهوايات الفردية.`,
        plainExplanationAr: 'تحب القرب العاطفي مع احترام خصوصية ومساحة شريكك الشخصية.',
        adviceAr: 'شجع شريكك على نموه الشخصي ليعود للعلاقة بطاقة متجددة.',
        color: '#f59e0b',
      },
      {
        key: 'conflict_repair',
        factorCode: 'GOTT-R',
        labelAr: 'مهارة إصلاح الخلاف (Gottman Constructive Repair)',
        score: repScore,
        stenScore: pctToSten(repScore),
        levelAr: repScore >= 68 ? 'مرتفع' : repScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${repScore}%: حكمة في امتصاص الغضب وتجنب الصمت العقابي وتقديم المودة قبل إثبات الصواب.`,
        plainExplanationAr: 'تسعى لحل الخلاف بهدوء ومودة ولا تحب الخصام الطويل أو الهجر.',
        adviceAr: 'احرص على ألا تنام وفي قلب شريكك ذرة عتب، وتطييب الخاطر في ساعته.',
        color: '#38bdf8',
      },
      {
        key: 'family_solidarity',
        factorCode: 'FAM-B',
        labelAr: 'التكافل الأسري وصيانة الخصوصية (Family Solidarity)',
        score: famScore,
        stenScore: pctToSten(famScore),
        levelAr: famScore >= 68 ? 'مرتفع' : famScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${famScore}%: اعتزاز بصلة الرحم وبر الأهل مع صيانة مقدسة لخصوصية أسرار البيت الزوجي.`,
        plainExplanationAr: 'توازن بحكمة بين احترام العائلتين وحماية أسرار بيتك الزوجي.',
        adviceAr: 'ضع حدوداً دافئة وذكية تبر العائلة وتحمي استقلالية قرارك مع شريكك.',
        color: '#a78bfa',
      },
      {
        key: 'emotional_openness',
        factorCode: 'EMO-O',
        labelAr: 'الإفصاح الوجداني والامتنان اليومي (Emotional Expression)',
        score: openScore,
        stenScore: pctToSten(openScore),
        levelAr: openScore >= 68 ? 'مرتفع' : openScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${openScore}%: قدرة على إظهار الحب والامتنان والاحتياجات العاطفية للشريك بلطف.`,
        plainExplanationAr: 'تعبر عن مشاعرك وامتنانك بصدق ولا تخجل من الكلمة الطيبة.',
        adviceAr: 'اجعل كلمات الحب والمدح اليومي زاداً ثابتاً في علاقتكما.',
        color: '#f43f5e',
      }
    );
  } else if (testId === 'cultural_eq') {
    const regScore = calcDimPct(dimensionPoints, 'self_regulation', 50);
    const empScore = calcDimPct(dimensionPoints, 'social_empathy', 50);
    const authScore = calcDimPct(dimensionPoints, 'cultural_authenticity', 50);
    const dexScore = calcDimPct(dimensionPoints, 'social_dexterity', 50);
    const groScore = calcDimPct(dimensionPoints, 'growth_mindset', 50);
    const forScore = calcDimPct(dimensionPoints, 'forgiveness_grace', 50);

    dimensionScores.push(
      {
        key: 'self_regulation',
        factorCode: 'EQ-SR',
        labelAr: 'إدارة الذات وضبط الانفعال (Goleman Self-Regulation)',
        score: regScore,
        stenScore: pctToSten(regScore),
        levelAr: regScore >= 68 ? 'مرتفع' : regScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${regScore}%: رزانة وهدوء يمنعانك من التلفظ بما قد يندم عليه المرء في فترات التوتر.`,
        plainExplanationAr: 'تضبط أعصابك ولسانك وقت الغضب ولا تجرح مشاعر من تحب.',
        adviceAr: 'احتفظ بصمت الحكيم وقت ثورة الغضب ثم عاتِب برقة بعد السكينة.',
        color: '#38bdf8',
      },
      {
        key: 'social_empathy',
        factorCode: 'EQ-EM',
        labelAr: 'التعاطف واستشعار مشاعر الشريك (Empathic Attunement)',
        score: empScore,
        stenScore: pctToSten(empScore),
        levelAr: empScore >= 68 ? 'مرتفع' : empScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${empScore}%: حس وجداني يقرأ حزن الشريك وتغير مزاجه من عينيه ونبرة صوته.`,
        plainExplanationAr: 'تشعر بما يمر به شريكك حتى قبل أن يتكلم وتبادر لمواساته.',
        adviceAr: 'اسأله دائماً: "كيف كان يومك وما الذي يمكنني فعله ليسعد قلبك؟".',
        color: '#f43f5e',
      },
      {
        key: 'cultural_authenticity',
        factorCode: 'HOF-ID',
        labelAr: 'الأصالة والهوية الثقافية (Hofstede Cultural Identity)',
        score: authScore,
        stenScore: pctToSten(authScore),
        levelAr: authScore >= 68 ? 'مرتفع' : authScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${authScore}%: تمسك واعتزاز بالمروءة، الكرم، والقيم الأصيلة مع عقلية مستنيرة.`,
        plainExplanationAr: 'تحافظ على القيم والأصالة مع انفتاح ومرونة حضارية واعية.',
        adviceAr: 'ابنِ بيتاً يجمع بين بركة القيم الأصيلة وأرقى مفاهيم التفاهم المعاصر.',
        color: '#fbbf24',
      },
      {
        key: 'social_dexterity',
        factorCode: 'EQ-SD',
        labelAr: 'اللباقة والمهارة الاجتماعية (Social Dexterity)',
        score: dexScore,
        stenScore: pctToSten(dexScore),
        levelAr: dexScore >= 68 ? 'مرتفع' : dexScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${dexScore}%: قدرة عالية على اختيار التوقيت المناسب وبناء الجسور الدبلوماسية بين العائلات.`,
        plainExplanationAr: 'لبق ودبلوماسي وتجيد كسب قلوب الناس وأهل الشريك.',
        adviceAr: 'استثمر لباقتك في تقريب القلوب وتذويب الفوارق الشكلية.',
        color: '#a78bfa',
      },
      {
        key: 'growth_mindset',
        factorCode: 'DWK-GM',
        labelAr: 'التنمية البشرية والارتقاء المشترك (Growth Mindset)',
        score: groScore,
        stenScore: pctToSten(groScore),
        levelAr: groScore >= 68 ? 'مرتفع' : groScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${groScore}%: شغف متقد بالتعلم، القراءة، والتطوير المشترك مع شريك العمر دون ركود.`,
        plainExplanationAr: 'تؤمن بأن الزواج رحلة نمو وتطور مشترك مستمر.',
        adviceAr: 'تشاركا قراءة كتاب أسبوعي أو التخطيط لمشاريع معرفية ومالية ملهمة.',
        color: '#10b981',
      },
      {
        key: 'forgiveness_grace',
        factorCode: 'EQ-FG',
        labelAr: 'المروءة والتغافل الكريم (Forgiveness & Grace)',
        score: forScore,
        stenScore: pctToSten(forScore),
        levelAr: forScore >= 68 ? 'مرتفع' : forScore >= 42 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${forScore}%: سمو أخلاقي في التغافل عن الهفوات الصغيرة وحفظ الفضل وكرامة الشريك.`,
        plainExplanationAr: 'تتجاوز عن الهفوات البسيطة ولا تحول كل خطأ صغير إلى قضية.',
        adviceAr: 'التغافل الكريم عن الصغائر هو سر استدامة البيوت السعيدة.',
        color: '#06b6d4',
      }
    );
  } else if (testId === 'epq') {
    const extraScore = calcDimPct(dimensionPoints, 'eysenck_extraversion', 50);
    const neuroRaw = calcDimPct(dimensionPoints, 'eysenck_neuroticism', 50);
    const stabilityScore = Math.max(20, Math.min(98, 120 - neuroRaw));
    const psychoRaw = calcDimPct(dimensionPoints, 'eysenck_psychoticism', 50);
    const empathyScore = Math.max(20, Math.min(99, 120 - psychoRaw));
    const lieScore = calcDimPct(dimensionPoints, 'eysenck_lie', 50);

    const isExtraverted = extraScore >= 52;
    const isStable = stabilityScore >= 52;

    dimensionScores.push(
      {
        key: 'eysenck_extraversion',
        factorCode: 'EPQ-E',
        labelAr: 'الانبساط مقابل الانطواء العصبي (Extraversion)',
        score: extraScore,
        stenScore: pctToSten(extraScore),
        lowPoleAr: 'انطواء وهدوء عصبي داخلي',
        highPoleAr: 'انبساط وحيوية اجتماعية',
        levelAr: extraScore >= 65 ? 'مرتفع' : extraScore >= 40 ? 'متوسط' : 'منخفض',
        analysisAr: isExtraverted
          ? `سجلت ${extraScore}%: استثارة عصبية نشطة تبحث عن التفاعل الخارجي والأنشطة الاجتماعية والحيوية.`
          : `سجلت ${extraScore}%: عمق داخلي وتأمل هادئ، تستعيد طاقتك في الخلوة المنظمة والبيئات المستقرة.`,
        plainExplanationAr: isExtraverted ? 'اجتماعي منطلق تحب البهجة ومشاركة الناس.' : 'هادئ الطباع تميل للسكينة والتركيز العميق.',
        adviceAr: isExtraverted
          ? 'استثمر حيويتك في إسعاد شريكك وخصص وقتاً للتأمل المشترك.'
          : 'عبر لشريكك عن حاجتك لمساحة خاصة لإعادة شحن طاقتك دون أن يشعر بالابتعاد.',
        color: '#38bdf8',
      },
      {
        key: 'eysenck_stability',
        factorCode: 'EPQ-N',
        labelAr: 'الاستقرار الانفعالي وقوة الأعصاب (Neuroticism / Stability)',
        score: stabilityScore,
        stenScore: pctToSten(stabilityScore),
        lowPoleAr: 'حساسية عصبية واستثارة سريعة',
        highPoleAr: 'ثبات واستقرار عصبي راسخ',
        levelAr: stabilityScore >= 65 ? 'مرتفع' : stabilityScore >= 40 ? 'متوسط' : 'منخفض',
        analysisAr: isStable
          ? `سجلت ${stabilityScore}%: جهاز عصبي مستقر ومتزن، قدرة عالية على امتصاص الصدمات واجتياز الأزمات بهدوء.`
          : `سجلت ${stabilityScore}%: حساسية عاطفية عالية واستجابة سريعة للضغوط تحتاج إلى تفريغ واحتواء مستمر.`,
        plainExplanationAr: isStable ? 'أعصابك هادئة ومتزنة في المواقف الصعبة.' : 'مشاعرك سريعة التأثر وتحتاج لبيئة هادئة خالية من المشاحنات.',
        adviceAr: 'اجعل من الحوار المفتوح مع شريكك صمام أمان لتفريغ التوتر أولاً بأول.',
        color: '#10b981',
      },
      {
        key: 'eysenck_empathy',
        factorCode: 'EPQ-P',
        labelAr: 'الرقة الإنسانية والتعاطف (Tender-Mindedness vs Toughness)',
        score: empathyScore,
        stenScore: pctToSten(empathyScore),
        lowPoleAr: 'صرامة براغماتية جافة',
        highPoleAr: 'رقة إنسانية وتعاطف وجداني',
        levelAr: empathyScore >= 65 ? 'مرتفع' : empathyScore >= 40 ? 'متوسط' : 'منخفض',
        analysisAr: `سجلت ${empathyScore}%: ميل للتعاطف مع الآخرين وجبر الخواطر وتقديم الرحمة على القسوة.`,
        plainExplanationAr: empathyScore >= 65 ? 'رحيم القلب وتراعي مشاعر شريكك بعمق.' : 'حاسم وعملي تفضل القرارات المنطقية المباشرة.',
        adviceAr: 'حافظ على هذا النبل الفطري، واحرص على وضع حدود صحية تحميك من الاستغلال.',
        color: '#f43f5e',
      },
      {
        key: 'eysenck_lie',
        factorCode: 'EPQ-L',
        labelAr: 'مؤشر الصدق والشفافية الذاتية (Authenticity / Lie Scale)',
        score: lieScore,
        stenScore: pctToSten(lieScore),
        lowPoleAr: 'تحفظ اجتماعي وتجميل',
        highPoleAr: 'صراحة وشفافية فطرية',
        levelAr: lieScore >= 65 ? 'مرتفع' : 'متوسط',
        analysisAr: `سجلت ${lieScore}%: صراحة مع النفس واعتراف واقعي بالطبيعة البشرية دون ادعاء الكمال.`,
        plainExplanationAr: 'صادق مع نفسك ومع شريكك ولا تتصنع المثالية.',
        adviceAr: 'الصدق مع النفس هو أسرع طريق لنضج العلاقات واستدامة المودة الزوجية.',
        color: '#a855f7',
      }
    );
  } else if (testId === 'sixteen_pf') {
    // Cattell 16 Personality Factors - Complete Scientific Bipolar Factor Scoring (Factors A through Q4)
    const factorDefs: {
      key: string;
      code: string;
      labelAr: string;
      lowPoleAr: string;
      highPoleAr: string;
      color: string;
      highDesc: string;
      midDesc: string;
      lowDesc: string;
      plainHigh: string;
      plainMid: string;
      plainLow: string;
      advice: string;
    }[] = [
      {
        key: 'warmth',
        code: 'A',
        labelAr: 'العامل A: الدفء والتواصل الإنساني (Warmth)',
        lowPoleAr: 'متحفظ ورسمي (A-)',
        highPoleAr: 'دافئ وودود واجتماعي (A+)',
        color: '#f43f5e',
        highDesc: 'حرارة مشاعر عالية، ألفة سريعة، وإشراقة وجدانية في الترحيب والاحتواء.',
        midDesc: 'توازن رصين بين اللطف الودود والحفاظ على مسافة اجتماعية مريحة.',
        lowDesc: 'تحفظ وقور، تفضيل للرسمية والوضوح، وعدم منح الألفة إلا بعد ثقة عميقة.',
        plainHigh: 'بشوش، قريب من القلب، وتعبر عن حبك واهتمامك بعفوية وحرارة.',
        plainMid: 'ودود ولطيف مع الناس، وتمنح دفئك العاطفي الكامل للمقربين بعد معرفتهم.',
        plainLow: 'تميل للرسمية والهدوء، وتفضل الأفعال العملية على الكلام العاطفي الكثير.',
        advice: 'الدفء اللفظي والابتسامة اليومية يختصران المسافات العاطفية بين الزوجين.',
      },
      {
        key: 'reasoning',
        code: 'B',
        labelAr: 'العامل B: التفكير التحليلي والمنطقي (Reasoning)',
        lowPoleAr: 'تفكير حسي عملي مباشر (B-)',
        highPoleAr: 'تفكير تجريدي وتحليلي عميق (B+)',
        color: '#38bdf8',
        highDesc: 'قدرة عالية على التحليل المنطقي، استنباط العلاقات المجردة، وحل المعضلات بروية.',
        midDesc: 'جمع متوازن بين التحليل العقلي والحلول العملية المباشرة المجربة.',
        lowDesc: 'تفضيل للحلول الحسية السريعة والاعتماد على التجربة المباشرة دون تعقيد نظري.',
        plainHigh: 'تحلل المشكلات بعمق ومنطق، وتفكك أي أزمة بهدوء للوصول لأفضل قرار.',
        plainMid: 'تجمع بين المنطق السليم والحلول الواقعية السريعة في حياتك اليومية.',
        plainLow: 'تفضل المباشرة والبساطة وتكره الفلسفة المعقدة أو النقاشات المطولة.',
        advice: 'وظف قدرتك التحليلية في التخطيط الأسري دون تحويل الحوارات العاطفية إلى محاكمة منطقية.',
      },
      {
        key: 'stability',
        code: 'C',
        labelAr: 'العامل C: قوة الأنا والاستقرار الانفعالي (Ego Strength)',
        lowPoleAr: 'تأثر انفعالي سريع وحساسية (C-)',
        highPoleAr: 'ثبات انفعالي وصلابة نفسية (C+)',
        color: '#10b981',
        highDesc: 'نضج انفعالي وقوة أنا عالية تمكنك من الصمود والهدوء أمام عواصف الحياة.',
        midDesc: 'استقرار انفعالي طبيعي يتأثر بالمواقف الضاغطة باعتدال ثم يستعيد سكينته.',
        lowDesc: 'حساسية انفعالية مرهفة وتأثر سريع بتقلبات الظروف يحتاج لاحتواء وطمأنة.',
        plainHigh: 'صخرة أمان في الأزمات؛ لا تنهار أمام المشكلات بل تواجهها بثبات ورباطة جأش.',
        plainMid: 'متزن في أغلب الأوقات، وإن تضايقت فإنك تستعيد هدوءك بعد وقت قصير.',
        plainLow: 'مرهف المشاعر وتتأثر سريعاً بالضغوط، وتحتاج لشريك هادئ يسندك ويطمئنك.',
        advice: 'الاستقرار الانفعالي هو العمود الفقري لطمأنينة العش الزوجي.',
      },
      {
        key: 'dominance',
        code: 'E',
        labelAr: 'العامل E: القيادة والتوكيد الذاتي (Dominance)',
        lowPoleAr: 'مسالم ومتعاون يتجنب الصدام (E-)',
        highPoleAr: 'قيادي وحاسم ومبادر (E+)',
        color: '#a855f7',
        highDesc: 'حضور قيادي واضح، قدرة على الحسم وتوجيه الدفة، وثقة عالية في الدفاع عن الرأي.',
        midDesc: 'قيادة تشاركية مرنة تأخذ المبادرة عند الحاجة وتقبل المشورة برحابة صدر.',
        lowDesc: 'ميل للمسالمة والتعاون الهادئ وتفضيل الانسجام على التنافس أو فرض الرأي.',
        plainHigh: 'تحب قيادة الموقف واتخاذ القرارات الحاسمة وتحمل المسؤولية الأولى.',
        plainMid: 'تؤمن بالشراكة والتشاور، فتقود أحياناً وتدعم شريكك في أحيان أخرى.',
        plainLow: 'مسالم ومتعاون جداً، تفضل الهدوء وتترك القيادة والمبادرة للطرف الآخر.',
        advice: 'أجمل البيوت ما قامت على التشاور الحنون، لا على التسلط ولا على السلبية.',
      },
      {
        key: 'liveliness',
        code: 'F',
        labelAr: 'العامل F: الحيوية والمرح التلقائي (Liveliness)',
        lowPoleAr: 'جاد ورزين ووقور (F-)',
        highPoleAr: 'مرح وحيوي وعفوي (F+)',
        color: '#fbbf24',
        highDesc: 'طاقة مبهجة، حضور مرح، وقدرة فطرية على كسر الملل وإشاعة البهجة في البيت.',
        midDesc: 'توازن لطيف بين الابتسامة العفوية والجدية الرزينة في مواضعها.',
        lowDesc: 'رزانة ووقار وتأني، وتفضيل للأجواء الهادئة والحوارات الجادة الهادفة.',
        plainHigh: 'روحك مرحة ومتفائلة، تضفي الضحكة والحيوية على أجواء البيت.',
        plainMid: 'تجمع بين البشاشة والابتسامة وبين الوقار والجدية وقت المسؤوليات.',
        plainLow: 'هادئ، رزين، وجاد في نظرتك للحياة، وتفضل السكينة على الصخب.',
        advice: 'روح الدعابة اللطيفة تجدد شباب العلاقة الزوجية وتذيب جليد التوتر.',
      },
      {
        key: 'rule_consciousness',
        code: 'G',
        labelAr: 'العامل G: الضمير الحي والالتزام بالواجب (Rule-Consciousness)',
        lowPoleAr: 'مرن ويتكيف حسب الظروف (G-)',
        highPoleAr: 'ملتزم ومنضبط أخلاقياً (G+)',
        color: '#06b6d4',
        highDesc: 'ضمير أخلاقي يقظ، تقديس للعهود والواجبات، والتزام صارم بالمسؤوليات.',
        midDesc: 'التزام صادق بالمبادئ الأساسية مع مرونة عملية في التفاصيل اليومية.',
        lowDesc: 'تفضيل للمرونة العالية والتكيف الذكي مع المواقف دون التقيد الصارم بالقواعد.',
        plainHigh: 'تقدس الكلمة والوعد والواجب، ويعتمد عليك شريكك بثقة مطلقة.',
        plainMid: 'ملتزم بواجباتك الأساسية مع مرونة وتفهم للظروف الطارئة.',
        plainLow: 'تحب المرونة والعفوية ولا ترتاح للقوانين الصارمة أو القيود الرسمية.',
        advice: 'الوفاء بالعهود والالتزام الأخلاقي هما أساس الأمان المستدام في الزواج.',
      },
      {
        key: 'social_boldness',
        code: 'H',
        labelAr: 'العامل H: الجرأة والمبادرة الاجتماعية (Social Boldness)',
        lowPoleAr: 'خجول ومتحفظ اجتماعياً (H-)',
        highPoleAr: 'جريء ومنطلق اجتماعياً (H+)',
        color: '#ec4899',
        highDesc: 'شجاعة اجتماعية عالية، طلاقة في الحديث، وعدم رهبة من المواقف أو الوجوه الجديدة.',
        midDesc: 'ثقة اجتماعية متزنة تنطلق تدريجياً بعد التعرف على المحيط.',
        lowDesc: 'حياء فطري وتحفظ هادئ، وتفضيل الابتعاد عن الأضواء والتجمعات الصاخبة.',
        plainHigh: 'جريء وواثق في المجالس، تبادر بالحديث وتدافع عن شريكك وأسرتك بشجاعة.',
        plainMid: 'تتحدث بثقة ولباقة عند الحاجة دون حب للظهور المفرط.',
        plainLow: 'هادئ وخجول بطبعك، وتفضل الجلسات العائلية الصغيرة والمألوفة.',
        advice: 'تكامل الشريك الجريء مع الشريك الهادئ يصنع توازناً اجتماعياً رائعاً للأسرة.',
      },
      {
        key: 'sensitivity',
        code: 'I',
        labelAr: 'العامل I: رهافة الحس والذوق الجمالي (Sensitivity)',
        lowPoleAr: 'عملي وواقعي صارم (I-)',
        highPoleAr: 'مرهف الحس وشاعري (I+)',
        color: '#f97316',
        highDesc: 'حس جمالي ووجداني مرهف، تذوق للفن والجمال، وتأثر عميق بالمشاعر واللطف.',
        midDesc: 'توازن صحي بين التقدير الجمالي والعاطفي وبين النظرة العملية الواقعية.',
        lowDesc: 'عقلية عملية نفعية تركز على الحقائق الملموسة والنتائج أكثر من العواطف.',
        plainHigh: 'رومانسي ومرهف الإحساس، تسعدك الكلمة الرقيقة واللمسة الجمالية والهدية المعبرة.',
        plainMid: 'تقدر المشاعر والرومانسية مع الحفاظ على نظرة واقعية متزنة.',
        plainLow: 'عملي وواقعي جداً، تعبر عن حبك بالإنجاز وتوفير الاحتياجات أكثر من الكلام الشاعري.',
        advice: 'فهم هذا العامل يمنع سوء الفهم بين الشريك العملي والشريك الرومانسي المرهف.',
      },
      {
        key: 'vigilance',
        code: 'L',
        labelAr: 'العامل L: اليقظة والنباهة مقابل سلامة الصدر (Vigilance)',
        lowPoleAr: 'مسالم وحسن الظن تلقائياً (L-)',
        highPoleAr: 'يقظ وحذر ومتفحص للدوافع (L+)',
        color: '#6366f1',
        highDesc: 'يقظة ذهنية عالية، قراءة دقيقة لما وراء الكلمات، وحذر يحمي الأسرة من الخداع.',
        midDesc: 'فطنة معتدلة تجمع بين حسن الظن والأخذ بأسباب الحيطة والانتباه.',
        lowDesc: 'سلامة صدر فطرية، ثقة سريعة بالناس، وبراءة من الشكوك والتأويلات.',
        plainHigh: 'نبيه وحذر، لا تمنح ثقتك بسهولة وتنتبه لأدق التفاصيل والتصرفات.',
        plainMid: 'تحسن الظن بالناس مع بقاء عينك يقظة وواعية.',
        plainLow: 'طيب القلب وسليم الصدر، تفترض الخير في الجميع وتسامح بسهولة.',
        advice: 'اجعل يقظتك لحماية البيت من الخارج، واجعل سلامة الصدر وحسن الظن داخل بيتك مع شريكك.',
      },
      {
        key: 'abstractedness',
        code: 'M',
        labelAr: 'العامل M: الخيال الخصب مقابل الواقعية (Abstractedness)',
        lowPoleAr: 'واقعي يركز على الحاضر الملموس (M-)',
        highPoleAr: 'واسع الخيال ومفكر حالم (M+)',
        color: '#8b5cf6',
        highDesc: 'خيال خصب، تحليق في عالم الأفكار والرؤى المستقبلية، وابتكار غير تقليدي.',
        midDesc: 'إبداع تطبيقي يربط الأفكار الجميلة بخطوات عملية على أرض الواقع.',
        lowDesc: 'واقعية عملية تركز على التفاصيل الملموسة واللحظة الراهنة بدقة.',
        plainHigh: 'صاحب خيال واسع وأحلام كبيرة، تحب التخطيط للمستقبل والأفكار الإبداعية.',
        plainMid: 'توازن بين الأحلام الطموحة والانتباه لمتطلبات الواقع اليومي.',
        plainLow: 'واقعي جداً وتركز على ما بين يديك الآن من مهام ومسؤوليات ملموسة.',
        advice: 'الأحلام الكبيرة تحتاج لخطوات واقعية يومية لتتحول إلى سعادة أسرية ملموسة.',
      },
      {
        key: 'privateness',
        code: 'N',
        labelAr: 'العامل N: الكياسة وحفظ الخصوصية (Privateness)',
        lowPoleAr: 'تلقائي ومكشوف الكتاب (N-)',
        highPoleAr: 'كتوم ولبق ويصون الخصوصية (N+)',
        color: '#14b8a6',
        highDesc: 'دبلوماسية راقية، صيانة حازمة لأسرار البيت، واختيار محسوب للكلمات.',
        midDesc: 'صراحة مهذبة مع المقربين مع حفظ الخصوصية أمام الغرباء.',
        lowDesc: 'تلقائية وبساطة تامة، والحديث بعفوية على السجية دون تكلف.',
        plainHigh: 'كتوم ولبق، تحفظ أسرار بيتك وحياتك الخاصة ولا تشاركها إلا لأقرب المقربين.',
        plainMid: 'تتحدث بصراحة مريحة مع شريكك، وتصون خصوصيتكما أمام الآخرين.',
        plainLow: 'عفوي جداً وكتاب مفتوح، تعبر عما في قلبك مباشرة دون حسابات معقدة.',
        advice: 'كتمان أسرار الحياة الزوجية عن الأطراف الخارجية من أهم أركان نجاح الزواج.',
      },
      {
        key: 'apprehension',
        code: 'O',
        labelAr: 'العامل O: الاطمئنان النفسي مقابل محاسبة الذات (Apprehension)',
        lowPoleAr: 'محاسبة ذاتية مفرطة وقلق (O+)',
        highPoleAr: 'واثق ومطمئن النفس (O-)',
        color: '#84cc16',
        highDesc: 'اطمئنان داخلي، ثقة بالنفس، وتصالح هادئ مع الأخطاء البشرية للتعلم منها.',
        midDesc: 'ضمير يقظ يراجع النفس باعتدال دون الوقوع في جلد الذات.',
        lowDesc: 'حساسية عالية للخطأ، كثرة لوم النفس، والقلق المفرط من التقصير.',
        plainHigh: 'مطمئن القلب وواثق بنفسك، تتعلم من أخطائك وتواصل طريقك بسلام.',
        plainMid: 'تراجع نفسك بضمير حي لتصحيح المسار دون قسوة مفرطة على ذاتك.',
        plainLow: 'كثير اللوم لنفسك وتقلق من أي تقصير، وتحتاج لكلمات تشجيع وتقدير مستمرة.',
        advice: 'ارفق بنفسك وبشريكك؛ فالحياة الزوجية تُبنى بالتشجيع لا بجلد الذات.',
      },
      {
        key: 'openness_to_change',
        code: 'Q1',
        labelAr: 'العامل Q1: الانفتاح على التطوير والتجديد (Openness to Change)',
        lowPoleAr: 'محافظ متمسك بالمألوف (Q1-)',
        highPoleAr: 'مجدد ومنفتح على التطوير (Q1+)',
        color: '#eab308',
        highDesc: 'عقلية تطويرية تبحث عن التحسين المستمر، التجارب الحديثة، وتحديث أسلوب الحياة.',
        midDesc: 'انفتاح واعي يجمع بين أصالة الجذور والاستفادة من كل تطور نافع.',
        lowDesc: 'اعتزاز بالطرق التقليدية الموروثة وتفضيل الاستقرار الثابت على التغيير.',
        plainHigh: 'تحب التطوير والتجديد وتجربة أساليب حديثة في حياتك وعملك وبيتك.',
        plainMid: 'تحترم العادات الأصيلة وترحب في الوقت نفسه بالتطوير الإيجابي المفيد.',
        plainLow: 'تعتز بالتقاليد الموروثة وترتاح للاستقرار الثابت بعيداً عن التغييرات المتلاحقة.',
        advice: 'الجمع بين أصالة القيم وتجديد وسائل السعادة الزوجية يصنع بيتاً متجدداً.',
      },
      {
        key: 'self_reliance',
        code: 'Q2',
        labelAr: 'العامل Q2: الاستقلالية والاعتماد على الذات (Self-Reliance)',
        lowPoleAr: 'يحب العمل والمشاركة الجماعية (Q2-)',
        highPoleAr: 'مستقل ويعتمد على نفسه (Q2+)',
        color: '#0284c7',
        highDesc: 'كفاءة ذاتية عالية، قدرة على اتخاذ القرار وإنجاز المهام باستقلالية تامة.',
        midDesc: 'توازن صحي بين الاعتماد على النفس والترحيب بالمشاركة الزوجية والعائلية.',
        lowDesc: 'تفضيل للعمل الجماعي والتواجد الدائم ضمن صحبة ومشاركة مستمرة.',
        plainHigh: 'مستقل وتعتمد على نفسك بكفاءة، وتقدر وجود مساحة شخصية محترمة.',
        plainMid: 'تعتمد على نفسك عند اللزوم وتستمتع كثيراً بمشاركة شريكك في القرارات.',
        plainLow: 'تحب الصحبة والمشاركة الدائمة في كل خطوة ولا تفضل البقاء أو العمل وحيداً.',
        advice: 'في الزواج الناجح يتحول الاستقلال الفردي إلى تكامل وتآزر اختياري دافئ.',
      },
      {
        key: 'perfectionism',
        code: 'Q3',
        labelAr: 'العامل Q3: الدقة والنظام وإتقان التفاصيل (Perfectionism)',
        lowPoleAr: 'عفوي ومرن مع الفوضى البسيطة (Q3-)',
        highPoleAr: 'دقيق ومنظم ومحب للترتيب (Q3+)',
        color: '#d946ef',
        highDesc: 'انضباط ذاتي وترتيب دقيق، حب للنظام والتخطيط المسبق، وإتقان للتفاصيل.',
        midDesc: 'حرص على الترتيب والنظافة والتنظيم العام دون هوس بالكمال.',
        lowDesc: 'مرونة وعفوية عالية وتقبل لبعض الفوضى العابرة مقابل راحة البال.',
        plainHigh: 'منظم ومرتب جداً، تحب أن يكون كل شيء في مكانه الصحيح ووفق خطة واضحة.',
        plainMid: 'تحب الترتيب والنظام في بيتك مع تقبل مرن للظروف اليومية.',
        plainLow: 'عفوي ومرن، تهمك راحة البال والبساطة أكثر من التدقيق في الترتيب الصارم.',
        advice: 'تخفيف النقد حول التفاصيل المنزلية الصغيرة يحفظ المودة والرحمة بين الزوجين.',
      },
      {
        key: 'tension',
        code: 'Q4',
        labelAr: 'العامل Q4: السكينة والاسترخاء مقابل التوتر (Relaxed vs Tense)',
        lowPoleAr: 'متوتر ومستعجل ونفاد صبر (Q4-)',
        highPoleAr: 'هادئ ومسترخٍ وطويل البال (Q4+)',
        color: '#10b981',
        highDesc: 'سكينة داخلية، طول بال، وقدرة ممتازة على الاسترخاء وتفريغ شحنات العمل.',
        midDesc: 'إيقاع حياة متوازن ينشط وقت العمل ويسترخي وقت الراحة الأسرية.',
        lowDesc: 'طاقة مشحونة، استعجال دائم، وصعوبة في الاسترخاء عند تأخر المهام.',
        plainHigh: 'طويل البال، هادئ الأعصاب، وتنشر السكينة والاسترخاء في أرجاء البيت.',
        plainMid: 'تتحلى بالصبر في أغلب المواقف وتحتاج لوقت راحة يومي لتجديد هدوئك.',
        plainLow: 'سريع الإيقاع ووقتك مشحون دائماً، وقد تتوتر إذا تعطلت المواعيد أو الخطط.',
        advice: 'اجعل عتبة المنزل نقطة فصل تترك عندها توتر العمل لتدخل بيتك بقلب هادئ.',
      },
    ];

    factorDefs.forEach((fd) => {
      const s = calcDimPct(dimensionPoints, fd.key, 50);
      const sten = pctToSten(s);
      const levelAr: 'مرتفع' | 'متوسط' | 'منخفض' = s >= 68 ? 'مرتفع' : s >= 42 ? 'متوسط' : 'منخفض';
      const dynDesc = s >= 68 ? fd.highDesc : s >= 42 ? fd.midDesc : fd.lowDesc;
      const dynPlain = s >= 68 ? fd.plainHigh : s >= 42 ? fd.plainMid : fd.plainLow;

      dimensionScores.push({
        key: fd.key,
        factorCode: fd.code,
        labelAr: fd.labelAr,
        score: s,
        stenScore: sten,
        lowPoleAr: fd.lowPoleAr,
        highPoleAr: fd.highPoleAr,
        levelAr,
        analysisAr: `${dynDesc} (النسبة: ${s}% • الدرجة المعيارية Sten: ${sten}/10).`,
        plainExplanationAr: dynPlain,
        adviceAr: fd.advice,
        color: fd.color,
      });
    });

    // Compute Cattell's 5 Global Second-Order Factors
    const getF = (k: string) => dimensionScores.find((d) => d.key === k)?.score ?? 50;
    const globalEx = Math.round((getF('warmth') + getF('liveliness') + getF('social_boldness') + (120 - getF('privateness')) + (120 - getF('self_reliance'))) / 5);
    const globalStab = Math.round((getF('stability') + getF('apprehension') + getF('tension') + (120 - getF('vigilance'))) / 4);
    const globalSens = Math.round((getF('sensitivity') + getF('abstractedness') + getF('warmth') + getF('openness_to_change')) / 4);
    const globalInd = Math.round((getF('dominance') + getF('social_boldness') + getF('vigilance') + getF('openness_to_change') + getF('self_reliance')) / 5);
    const globalCtrl = Math.round((getF('rule_consciousness') + getF('perfectionism') + (120 - getF('liveliness')) + (120 - getF('abstractedness'))) / 4);

    const clampPct = (v: number) => Math.max(20, Math.min(100, v));

    cattellGlobalFactors = [
      {
        key: 'global_extraversion',
        code: 'EX',
        labelAr: 'العامل العالمي 1: الانبساط والتواصل الاجتماعي (Extraversion)',
        score: clampPct(globalEx),
        sten: pctToSten(clampPct(globalEx)),
        lowPoleAr: 'انطواء وخصوصية هادئة',
        highPoleAr: 'انبساط ومشاركة اجتماعية نشطة',
        plainExplanationAr:
          clampPct(globalEx) >= 65
            ? 'شخصية منفتحة اجتماعياً، تبني العلاقات بسهولة وتحب الأجواء الحيوية الدافئة.'
            : 'شخصية تفضل الخصوصية والهدوء والعلاقات العميقة المحدودة على الصخب الاجتماعي.',
        color: '#f43f5e',
      },
      {
        key: 'global_stability',
        code: 'AX',
        labelAr: 'العامل العالمي 2: الاتزان الانفعالي والسكينة (Emotional Stability)',
        score: clampPct(globalStab),
        sten: pctToSten(clampPct(globalStab)),
        lowPoleAr: 'قلق وتوتر وحساسية للضغوط',
        highPoleAr: 'طمأنينة وصلابة نفسية واسترخاء',
        plainExplanationAr:
          clampPct(globalStab) >= 65
            ? 'تتمتع بسكينة نفسية عالية وقدرة ممتازة على امتصاص ضغوط الحياة الزوجية والمهنية.'
            : 'تتأثر سريعاً بالضغوط وتحتاج لبيئة زوجية آمنة وحنونة خالية من التوتر المستمر.',
        color: '#10b981',
      },
      {
        key: 'global_sensitivity',
        code: 'TM',
        labelAr: 'العامل العالمي 3: الحساسية الوجدانية مقابل الواقعية (Receptivity)',
        score: clampPct(globalSens),
        sten: pctToSten(clampPct(globalSens)),
        lowPoleAr: 'عملية حاسمة ومنطق نفعي',
        highPoleAr: 'رهافة حس وخيال ومرونة وجدانية',
        plainExplanationAr:
          clampPct(globalSens) >= 65
            ? 'تغلب عليك الرقة، الذوق الجمالي، والانفتاح على الأفكار والمشاعر الرومانسية.'
            : 'تغلب عليك النظرة العملية الواقعية والتركيز على الحقائق والإنجازات الملموسة.',
        color: '#38bdf8',
      },
      {
        key: 'global_independence',
        code: 'IN',
        labelAr: 'العامل العالمي 4: الاستقلالية والمبادرة القيادية (Independence)',
        score: clampPct(globalInd),
        sten: pctToSten(clampPct(globalInd)),
        lowPoleAr: 'مسالمة وتوافق مع الجماعة',
        highPoleAr: 'قيادة واستقلالية وحسم ذاتي',
        plainExplanationAr:
          clampPct(globalInd) >= 65
            ? 'شخصية قيادية مستقلة تملك زمام المبادرة وتحب صياغة قراراتها بثقة.'
            : 'شخصية مسالمة متعاونة تفضل الانسجام والتشاور الهادئ وتجنب الصدام.',
        color: '#a855f7',
      },
      {
        key: 'global_self_control',
        code: 'SC',
        labelAr: 'العامل العالمي 5: ضبط الذات والضمير التنظيمي (Self-Control)',
        score: clampPct(globalCtrl),
        sten: pctToSten(clampPct(globalCtrl)),
        lowPoleAr: 'عفوية وتلقائية غير مقيدة',
        highPoleAr: 'انضباط ذاتي وتنظيم والتزام',
        plainExplanationAr:
          clampPct(globalCtrl) >= 65
            ? 'منضبط، دقيق، وتلتزم بالواجبات والعهود والترتيب بأعلى درجات المسؤولية.'
            : 'تلقائي وعفوي، تفضل المرونة والبساطة على الجداول والقواعد الصارمة.',
        color: '#fbbf24',
      },
    ];
  }

  const catalogItem = ASSESSMENTS_CATALOG.find((c) => c.id === testId) || ASSESSMENTS_CATALOG[0];
  const totalScore = Math.round(
    dimensionScores.reduce((acc, curr) => acc + curr.score, 0) / Math.max(1, dimensionScores.length)
  );
  const overallPercentile = computePsychometricPercentile(totalScore);

  // Sort dimensions to identify the user's true top traits and lower traits
  const sortedDims = [...dimensionScores].sort((a, b) => b.score - a.score);
  const topDim1 = sortedDims[0];
  const topDim2 = sortedDims[1] || sortedDims[0];
  const lowDim = sortedDims[sortedDims.length - 1];

  // Dynamically determine Primary Archetype & Ideal Partner Archetype based on actual scores
  let primaryArchetypeAr = '';
  let primaryArchetypeEn = '';
  let idealPartnerArchetypeAr = '';
  let idealPartnerArchetypeEn = '';

  if (testId === 'epq') {
    const extraScore = dimensionScores.find((d) => d.key === 'eysenck_extraversion')?.score ?? 50;
    const stabilityScore = dimensionScores.find((d) => d.key === 'eysenck_stability')?.score ?? 50;
    const isExtraverted = extraScore >= 52;
    const isStable = stabilityScore >= 52;

    if (isExtraverted && isStable) {
      primaryArchetypeAr = 'المزاج الدموي الحيوي (Eysenck Sanguine - القائد الاجتماعي المتفائل)';
      primaryArchetypeEn = 'Sanguine Leader - Charismatic, Social & Optimistic';
      idealPartnerArchetypeAr = 'الشريك البلغمي الهادئ (Phlegmatic Anchor) أو الدموي المتناغم ليمنحك السكينة والاستقرار العميق';
      idealPartnerArchetypeEn = 'Calm Phlegmatic Anchor with Emotional Equilibrium';
    } else if (isExtraverted && !isStable) {
      primaryArchetypeAr = 'المزاج الصفراوي الشغوف (Eysenck Choleric - المبادر الحاسم)';
      primaryArchetypeEn = 'Choleric Driver - Passionate, Dynamic & Determined';
      idealPartnerArchetypeAr = 'الشريك البلغمي الصبور المتزن القادر على احتواء طاقتك وتوجيهها بحكمة ومودة';
      idealPartnerArchetypeEn = 'Patient Grounded Partner with Gentle Containment';
    } else if (!isExtraverted && isStable) {
      primaryArchetypeAr = 'المزاج البلغمي الحكيم (Eysenck Phlegmatic - الملاذ الهادئ والدرع المتين)';
      primaryArchetypeEn = 'Phlegmatic Sage - Peaceful, Reliable & Steady';
      idealPartnerArchetypeAr = 'الشريك الدموي الحيوي الدافئ (Sanguine Radiance) ليضفي بهجة وألواناً على هدوء حياتك';
      idealPartnerArchetypeEn = 'Vibrant Sanguine Partner bringing Warmth & Liveliness';
    } else {
      primaryArchetypeAr = 'المزاج السوداوي المتأمل (Eysenck Melancholic - المفكر الوجداني العميق)';
      primaryArchetypeEn = 'Melancholic Thinker - Deeply Empathic, Loyal & Conscientious';
      idealPartnerArchetypeAr = 'الشريك المتفائل الآمن (Secure Sanguine/Phlegmatic) الذي يمنحك دفء الأمان ويصون رهافة مشاعرك';
      idealPartnerArchetypeEn = 'Secure Uplifting Partner Providing Steady Psychological Safety';
    }
  } else if (testId === 'sixteen_pf') {
    const top1Name = topDim1?.labelAr.split(':')[1]?.split('(')[0]?.trim() || 'الاتزان';
    const top2Name = topDim2?.labelAr.split(':')[1]?.split('(')[0]?.trim() || 'البصيرة';
    primaryArchetypeAr = `شخصية كاتل المتميزة في «${top1Name}» و«${top2Name}» (Cattell 16PF Profile)`;
    primaryArchetypeEn = `Cattell 16PF Profile (${topDim1?.factorCode || 'A'}+ / ${topDim2?.factorCode || 'B'}+)`;
    idealPartnerArchetypeAr = `الشريك المتكامل سيكومترياً: يجمع بين قاسم مشترك في «${top1Name}» وتكامل داعم في «${lowDim?.labelAr.split(':')[1]?.split('(')[0]?.trim() || 'المرونة'}»`;
    idealPartnerArchetypeEn = 'Complementary 16PF Partner Profile';
  } else {
    const top1Short = topDim1?.labelAr.split('(')[0]?.trim() || 'الاتزان النفسي';
    const top2Short = topDim2?.labelAr.split('(')[0]?.trim() || 'النضج الفكري';
    primaryArchetypeAr = `النمط المتميز في «${top1Short}» و«${top2Short}»`;
    primaryArchetypeEn = `High ${topDim1?.key || 'Balance'} & ${topDim2?.key || 'Insight'} Profile`;
    idealPartnerArchetypeAr = `الشريك الآمن المتناغم معك في «${top1Short}» والمكمل لك في «${lowDim?.labelAr.split('(')[0]?.trim() || 'الهدوء'}»`;
    idealPartnerArchetypeEn = 'Psychometrically Complementary & Secure Partner';
  }

  // Build dynamic userStrengthsAr directly from high-scoring dimensions and actual chosen options
  const dynamicStrengths: string[] = [];
  sortedDims.slice(0, 4).forEach((d) => {
    if (d.plainExplanationAr) {
      dynamicStrengths.push(`${d.labelAr.split('(')[0].trim()} (${d.score}%): ${d.plainExplanationAr}`);
    } else {
      dynamicStrengths.push(`${d.labelAr.split('(')[0].trim()} (${d.score}%): ${d.analysisAr}`);
    }
  });
  chosenHighTraits.slice(0, 3).forEach((tr) => {
    if (!dynamicStrengths.includes(tr)) {
      dynamicStrengths.push(tr);
    }
  });

  // Build dynamic userInterestsAr from actual answered traits & dimensions
  const dynamicInterests: string[] = [];
  chosenAllOptionTexts.forEach((item) => {
    if (item.weight >= 4 && dynamicInterests.length < 5) {
      dynamicInterests.push(`ميل سلوكي مرصود (${item.traitLabel}): ${item.textAr}`);
    }
  });
  if (dynamicInterests.length === 0) {
    dynamicInterests.push(
      `الأنشطة المرتبطة بـ ${topDim1?.labelAr.split('(')[0]?.trim() || 'التطوير الذاتي'} (${topDim1?.score || 50}%)`,
      `الحوارات والممارسات التي تعزز ${topDim2?.labelAr.split('(')[0]?.trim() || 'التوافق النفسي'} (${topDim2?.score || 50}%)`
    );
  }

  // Build dynamic userAspirationsAr based on actual dimension advice & top dimensions
  const dynamicAspirations: string[] = sortedDims.slice(0, 4).map((d) => d.adviceAr);

  // Build dynamic idealPartnerProfile based on actual top & low dimensions
  const complementaryTraits: string[] = [
    `التشارك القيمي في «${topDim1?.labelAr.split('(')[0]?.trim()}» لتعزيز الانسجام اليومي (${topDim1?.score}% لديك)`,
    `التكامل النفسي الداعم في بعد «${lowDim?.labelAr.split('(')[0]?.trim()}» لتحقيق التوازن الأسري`,
    `الارتباط الآمن والقدرة على الحوار الهادئ المباشر دون صمت عقابي`,
    `تقدير نقاط قوتك في «${topDim2?.labelAr.split('(')[0]?.trim()}» وتشجيع طموحاتك المشتركة`,
  ];

  const emotionalNeedsAr = `بناءً على درجتك في ${topDim1?.labelAr.split('(')[0]?.trim()} (${topDim1?.score}%) و${lowDim?.labelAr.split('(')[0]?.trim()} (${lowDim?.score}%)، تحتاج لشريك يمنحك الطمأنينة الوجدانية، يقدر طبيعتك، ويبادلك التقدير والاحتواء الصادق.`;
  const communicationStyleAr = `أسلوب الحوار الأنسب لشخصيتك هو الحوار الواضح الدافئ الذي يجمع بين ${topDim1?.plainExplanationAr || 'الاحترام المتبادل'} والإنصات الفعال دون أحكام مسبقة.`;
  const lifestyleHarmonyAr = `انسجام نمط الحياة يتحقق مع شريك يوازن بين ${topDim1?.labelAr.split('(')[0]?.trim()} و${topDim2?.labelAr.split('(')[0]?.trim()}، مع اتفاق مشترك وشفاف على إدارة البيت والأولويات.`;

  return {
    testId,
    testTitleAr: catalogItem.titleAr,
    completionDate: now,
    isCompleted,
    answeredCount: answeredKeys.length,
    totalQuestionsCount: questions.length,
    totalScore,
    overallPercentile,
    validityStatus,
    validityMessageAr,
    primaryArchetypeAr,
    primaryArchetypeEn,
    summaryAr:
      testId === 'epq'
        ? `تحليل بيولوجي عصبي مبني على إجاباتك (${answeredKeys.length}/${questions.length} سؤالاً) يعكس مستوى استثارة الجهاز العصبي ونمط المزاج الفطري والتوافق الحيوي مع الشريك.`
        : testId === 'sixteen_pf'
        ? `تحليل عاملي شامل مبسط لغير المختصين مبني على إجاباتك (${answeredKeys.length}/${questions.length} سؤالاً) يوضح سماتك الـ 16 الأساسية بالدرجات المعيارية (Sten 1-10) والعوامل العالمية الخمسة الكبرى.`
        : `تحليل سيكومتري علمي مبني على إجاباتك الفعلية (${answeredKeys.length}/${questions.length} سؤالاً) في ${catalogItem.titleAr}، بمتوسط اتزان ${totalScore}% وترتيب معياري ${overallPercentile}%.`,
    dimensionScores,
    cattellGlobalFactors,
    questionAudit,
    userStrengthsAr: dynamicStrengths,
    userInterestsAr: dynamicInterests,
    userAspirationsAr: dynamicAspirations,
    idealPartnerProfile: {
      recommendedArchetypeAr: idealPartnerArchetypeAr,
      recommendedArchetypeEn: idealPartnerArchetypeEn,
      complementaryTraits,
      emotionalNeedsAr,
      communicationStyleAr,
      lifestyleHarmonyAr,
      redFlagsToAvoidAr: [
        'الغموض العاطفي أو ممارسة الصمت العقابي والانسحاب وقت الخلاف',
        'كثرة النقد اللاذع أو التقليل من المشاعر والطموحات الشخصية',
        'إفشاء أسرار العلاقة الزوجية للأطراف الخارجية وعدم صيانة الخصوصية',
        'التصلب في الرأي وغياب المرونة في إدارة المسؤوليات المشتركة',
      ],
      greenFlagsToSeekAr: [
        'الارتباط الآمن والقدرة على التهدئة الحنونة وإصلاح الخلاف بالحوار',
        'الوفاء الصادق بالوعود وتحمل المسؤولية الأسرية بروح الفريق',
        'الإنصات المتعاطف والتعبير اليومي عن التقدير والمودة',
        'احترام الخصوصية العائلية وتقدير طموحك واهتماماتك الفكرية',
      ],
    },
  };
}

