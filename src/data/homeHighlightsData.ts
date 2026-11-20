// Lightweight homepage preview highlights (prevents pulling 1.3MB of full manuscripts into initial index bundle)
export interface HomeArticleHighlight {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  readTime: string;
  readTimeEn: string;
  publishDate?: string;
  icon: string;
  scientificFramework: string;
  scientificFrameworkEn: string;
}

export interface HomeNovelCategory {
  genre: 'clinical_stories' | 'sci_fi_future' | 'tactical_action' | 'crime_mystery' | 'romance' | 'sci_fantasy';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
  accentColor: string;
}

export const HOME_NOVEL_CATEGORIES: HomeNovelCategory[] = [
  {
    genre: 'clinical_stories',
    titleAr: 'روايات وقصص نفسية',
    titleEn: 'Psychological Novels & Stories',
    descAr: 'مجموعات قصصية عيادية وسيكولوجية تغوص في أعماق النفس البشرية والتعلق والصراعات الداخلية.',
    descEn: 'Clinical and psychological story collections exploring human depth, attachment, and inner conflicts.',
    icon: '🧠',
    accentColor: '#ec4899',
  },
  {
    genre: 'sci_fi_future',
    titleAr: 'روايات وقصص خيال علمي',
    titleEn: 'Sci-Fi & Technology Novels',
    descAr: 'روايات خيال علمي وتكنولوجيا تستشرف المستقبل والذكاء الاصطناعي والمعالجات الكمومية.',
    descEn: 'Science fiction and technology narratives exploring the future, AI, and quantum computing.',
    icon: '🚀',
    accentColor: '#06b6d4',
  },
  {
    genre: 'tactical_action',
    titleAr: 'روايات وقصص أكشن',
    titleEn: 'Action & Tactical Thrillers',
    descAr: 'روايات أكشن ومغامرات ومطاردات تكتيكية مشوقة ومليئة بالتحدي والإثارة.',
    descEn: 'High-stakes tactical action, chases, and suspenseful adventure narratives.',
    icon: '⚡',
    accentColor: '#f97316',
  },
  {
    genre: 'crime_mystery',
    titleAr: 'روايات وقصص غموض وتحقيقات جنائية',
    titleEn: 'Crime & Forensic Mystery Novels',
    descAr: 'روايات الغموض والألغاز المغلقة والتحقيقات البوليسية الجنائية الدقيقة.',
    descEn: 'Locked-room mysteries, forensic investigations, and gripping detective fiction.',
    icon: '🕵️',
    accentColor: '#ef4444',
  },
  {
    genre: 'romance',
    titleAr: 'روايات وقصص رومانسية واجتماعية',
    titleEn: 'Romantic & Social Novels',
    descAr: 'روايات وجدانية واجتماعية تعكس المروءة والحب العفيف والعلاقات الإنسانية الواقعية.',
    descEn: 'Emotional and social fiction reflecting integrity, pure love, and authentic human bonds.',
    icon: '🌸',
    accentColor: '#10b981',
  },
  {
    genre: 'sci_fantasy',
    titleAr: 'روايات وقصص فانتازيا فكرية',
    titleEn: 'Intellectual Sci-Fantasy Stories',
    descAr: 'أعمال سردية تجمع بين الخيال الإبداعي والأكشن الفكري والرمزية الإنسانية العميقة.',
    descEn: 'Creative works blending speculative imagination, intellectual action, and human symbolism.',
    icon: '✨',
    accentColor: '#8b5cf6',
  },
];

export interface HomeNovelHighlight {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  synopsisAr: string;
  synopsisEn: string;
  genreLabelAr: string;
  genreLabelEn: string;
  genreBadgeColor: string;
  chaptersCount: number;
  coverIllustrationSvg: string;
}

export const HOME_HIGHLIGHTED_ARTICLES: HomeArticleHighlight[] = [
  {
    "id": "daily-habits-of-psychologically-successful-people",
    "title": "العادات اليومية للأشخاص الناجحين نفسياً",
    "titleEn": "Daily Habits of Psychologically Successful People: Harvard Grant Study, Habit Neurobiology, Wellbeing Pillars, and Daily Rhythm",
    "summary": "مرجع علمي وتطبيقي في عادات الصحة النفسية والازدهار عبر 12 محوراً و20 مرجعاً: نتائج دراسة هارفارد (Grant Study)، أبعاد كارول ريف الستة، العقد القاعدية واللدونة، العادات الجسدية والعاطفية والمعرفية والاجتماعية والرقمية، هندسة العادات لـ Fogg وClear، وجدول اليوم المتكامل.",
    "summaryEn": "Evidence-based guide to daily habits of thriving across 12 axes and 20 references: Harvard Grant Study, Ryff’s 6 Well-Being pillars, habit loops, somatic/emotional/cognitive/social/digital habits, Tiny Habits, and full daily schedule.",
    "readTime": "20 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "20 min read",
    "publishDate": "2026-11-20",
    "icon": "☀️",
    "scientificFramework": "دراسة هارفارد الطولية (Vaillant & Waldinger)، الرفاهية النفسية (Carol Ryff)، نظرية التوسع والبناء (Fredrickson)، وهندسة العادات (Fogg, Clear, Duhigg, Lally)",
    "scientificFrameworkEn": "Harvard Grant Study (Vaillant & Waldinger), Psychological Well-Being (Ryff), Broaden-and-Build (Fredrickson), and Habit Science (Fogg, Clear, Lally)"
  },
  {
    "id": "how-to-overcome-overthinking-cbt-act-behavioral-guide",
    "title": "كيف تتخلص من التفكير الزائد؟",
    "titleEn": "How to Overcome Overthinking? CBT, ACT Cognitive Defusion, DMN Neurobiology, and Practical Behavioral Interventions",
    "summary": "دليل عملي وعلاجي متكامل للتحرر من التفكير الزائد عبر 10 محاور: الفرق بين الاجترار والقلق وحل المشكلات، شبكة DMN واللوزة الدماغية، وهم السيطرة، أدوات CBT («إذن ماذا؟» والتحول من لماذا إلى كيف)، فك الارتباط وتأريض 5-4-3-2-1 في ACT، وقت القلق، منعكس الغوص بالماء البارد، وخطة اليوم الكامل.",
    "summaryEn": "Practical CBT + ACT + Behavioral guide to overcoming overthinking across 10 axes: Rumination vs. Worry vs. Problem-Solving, DMN neurobiology, CBT tools, ACT Cognitive Defusion & 5-4-3-2-1 grounding, Worry Time, cold-water dive reflex, and daily routines.",
    "readTime": "16 دقيقة قراءة علمية",
    "readTimeEn": "16 min read",
    "publishDate": "2026-11-20",
    "icon": "🧠",
    "scientificFramework": "العلاج المعرفي السلوكي (Aaron Beck CBT)، القبول والالتزام وفك الارتباط (Steven Hayes ACT)، الشبكة الافتراضية DMN (Raichle)، وبحوث الاجترار والقلق (Nolen-Hoeksema & Watkins)",
    "scientificFrameworkEn": "Cognitive Behavioral Therapy (Beck), ACT Cognitive Defusion (Hayes), Default Mode Network (Raichle), and Rumination Research (Nolen-Hoeksema & Watkins)"
  },
  {
    "id": "importance-of-self-awareness-in-personality-development",
    "title": "أهمية الوعي الذاتي في تطوير الشخصية",
    "titleEn": "The Importance of Self-Awareness in Personality Development: Neurobiology, Internal vs. External Insight, and Self-Differentiation",
    "summary": "دراسة معمّقة لدور الوعي الذاتي في تشكيل الشخصية عبر 12 محوراً: البيولوجيا العصبية (mPFC وACC والجزيرة وDMN)، المرآة الداخلية لدوفال وويكلوند، اكتشاف تاشا يوريتش (الوعي الداخلي والخارجي)، التمايز الذاتي لبوين، مدارس العلاج النفسي، مفارقة الوعي المفرط والاجترار، و7 خطوات عملية.",
    "summaryEn": "Deep dive into Self-Awareness across 12 axes: neural circuits (mPFC, ACC, Insula, DMN), Duval & Wicklund’s Mirror Theory, Eurich’s Internal vs. External Insight, Bowen’s Differentiation, therapy lenses, rumination vs. insight table, and 7 daily steps.",
    "readTime": "18 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "18 min read",
    "publishDate": "2026-11-20",
    "icon": "🪞",
    "scientificFramework": "الوعي الداخلي والخارجي (Tasha Eurich)، نظرية الوعي الذاتي (Duval & Wicklund)، التمايز الذاتي (Murray Bowen)، والشبكات العصبية للذات (mPFC, ACC, DMN)",
    "scientificFrameworkEn": "Internal & External Self-Awareness (Eurich), Objective Self-Awareness (Duval & Wicklund), Differentiation of Self (Bowen), and Neural Self-Networks"
  },
  {
    "id": "how-to-develop-emotional-intelligence-scientific-guide",
    "title": "كيف تطور ذكاءك العاطفي؟",
    "titleEn": "How to Develop Your Emotional Intelligence? Scientific Foundations, Emotional Granularity, Interoception, and a 12-Week Training Program",
    "summary": "دراسة مرجعية نقدية وتطبيقية من 15 محوراً و32 مرجعاً علمياً: تفكيك أسطورة «80% من النجاح»، نموذج الفروع الأربعة لماير وسالوفي، القدرة (MSCEIT) مقابل السمة، الحبيبات العاطفية لباريت، الاستقبال الداخلي والأليكسيثيميا، الضيق التعاطفي مقابل الرحمة، الجانب المظلم، العمل الانفعالي، قواعد العرض الثقافية، وبرنامج 12 أسبوعاً.",
    "summaryEn": "Critical 15-axis, 32-reference scientific guide to Emotional Intelligence: Mayer & Salovey’s 4 branches, debunking the 80% slogan, MSCEIT vs. Trait EI, Emotional Granularity, Interoception & Alexithymia, Compassion vs. Distress, Emotional Labor, and a 12-week practice curriculum.",
    "readTime": "22 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "22 min read",
    "publishDate": "2026-11-20",
    "icon": "💎",
    "scientificFramework": "نموذج الفروع الأربعة (Mayer & Salovey / MSCEIT)، الحبيبات العاطفية (Barrett)، الاستقبال الداخلي (Craig)، الرحمة (Tania Singer)، الدقة التعاطفية (Ickes)، واللدونة الانفعالية (Nelis & Kotsou)",
    "scientificFrameworkEn": "4-Branch Ability EI (Mayer & Salovey), Emotional Granularity (Barrett), Interoception (Craig), Compassion (Singer), Empathic Accuracy (Ickes), and Emotional Plasticity"
  },
  {
    "id": "intelligent-negative-emotion-regulation-goleman-act",
    "title": "إدارة المشاعر السلبية بذكاء",
    "titleEn": "Managing Negative Emotions Intelligently: Evolutionary Functions, Amygdala Hijack, ACT, and Emotional Resilience",
    "summary": "مرجع سريري وعصبي لإدارة المشاعر غير المريحة بذكاء عبر أحد عشر محوراً: الوظائف التطورية للغضب والحزن والقلق والخجل، بيولوجيا اختطاف اللوزة الدماغية، أخطاء الكبت والاجترار، مهارات الذكاء العاطفي لغولمان، العلاج بالقبول والالتزام (ACT)، 10 استراتيجيات عملية، وخطة المرونة العاطفية.",
    "summaryEn": "Clinical and neurobiological guide across 11 axes: evolutionary duties of anger/sadness/anxiety, Amygdala Hijack, suppression vs. reappraisal, Goleman’s 4 EI skills, ACT flexibility, 10 daily practices, and emotional resilience.",
    "readTime": "18 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "18 min read",
    "publishDate": "2026-11-20",
    "icon": "⚖️",
    "scientificFramework": "الذكاء العاطفي (Daniel Goleman)، تنظيم الانفعالات (James Gross)، العلاج بالقبول والالتزام (Steven Hayes ACT)، التسمية العاطفية (Lieberman)، وDBT (Linehan)",
    "scientificFrameworkEn": "Emotional Intelligence (Goleman), Emotion Regulation (Gross), ACT (Hayes), Affect Labeling (Lieberman), and DBT (Linehan)"
  },
  {
    "id": "how-to-manage-stress-and-psychological-pressure",
    "title": "كيف تتعامل مع التوتر والضغط النفسي؟",
    "titleEn": "How to Manage Stress and Psychological Pressure? HPA Axis Neurobiology, Cognitive Appraisal, Coping, and Resilience",
    "summary": "دليل علمي وتطبيقي لفهم التوتر وإدارته عبر اثني عشر محوراً: محور HPA والكورتيزول، آثار التوتر المزمن على القلب والحُصين، مصادر التوتر الخمسة، نموذج التقييم المعرفي للازاروس وفولكمان، 10 استراتيجيات مواجهة صحية، بناء المرونة النفسية، جدول تشخيصي من 7 معايير، وخطة تمارين يومية.",
    "summaryEn": "Clinical and neurobiological stress guide across 12 axes: HPA axis neurochemistry, chronic effects, 5 stressor categories, Lazarus & Folkman Cognitive Appraisal, 10 evidence-based coping tools, resilience, 7-row diagnostic matching table, and daily routines.",
    "readTime": "18 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "18 min read",
    "publishDate": "2026-11-20",
    "icon": "🌿",
    "scientificFramework": "نظرية التوتر (Hans Selye)، التقييم المعرفي والمواجهة (Lazarus & Folkman)، البيولوجيا العصبية والحمل الألوستاتي (Sapolsky & McEwen)، وتقليل التوتر باليقظة (Kabat-Zinn)",
    "scientificFrameworkEn": "Stress Science (Selye), Cognitive Appraisal & Coping (Lazarus & Folkman), Allostatic Load (Sapolsky & McEwen), and MBSR (Kabat-Zinn)"
  },
  {
    "id": "how-to-build-practical-self-confidence-bandura-dweck",
    "title": "كيف تزيد ثقتك بنفسك بطريقة عملية؟",
    "titleEn": "How to Build Self-Confidence Practically? Self-Efficacy, Growth Mindset, Neuroplasticity, and Daily Exercises",
    "summary": "دليل علمي وتطبيقي لبناء الثقة بالنفس الحقيقية عبر أحد عشر محوراً: التفريق بين تقدير الذات والفعالية الذاتية، الدوبامين والمرونة العصبية، الجذور الطفولية، مصادر باندورا الأربعة، عقلية النمو لكارول دويك، 8 خطوات يومية عملية، الأخطاء الشائعة، تحديات السوشل ميديا، وخمسة تمارين يومية.",
    "summaryEn": "Evidence-based guide to real self-confidence across 11 axes: Self-Esteem vs. Self-Efficacy, dopamine neuroplasticity, attachment roots, Bandura’s 4 sources, Dweck’s Growth Mindset, 8 daily steps, common pitfalls, digital comparison traps, and 5 daily exercises.",
    "readTime": "17 دقيقة قراءة علمية",
    "readTimeEn": "17 min read",
    "publishDate": "2026-11-20",
    "icon": "🌟",
    "scientificFramework": "نظرية الفعالية الذاتية (Bandura)، عقلية النمو (Dweck)، التعاطف الذاتي (Neff)، العلاج المعرفي والتفاؤل المكتسب (Beck & Seligman)، ونظرية التقرير الذاتي (Deci & Ryan)",
    "scientificFrameworkEn": "Self-Efficacy Theory (Bandura), Growth Mindset (Dweck), Self-Compassion (Neff), Cognitive Therapy & Learned Optimism, and Self-Determination Theory"
  },
  {
    "id": "rebuilding-trust-after-infidelity-betrayal-trauma",
    "title": "كيف تستعيد الثقة بعد الخيانة أو الكذب؟",
    "titleEn": "How to Rebuild Trust After Infidelity or Lying? Trauma Neurobiology, Healing Phases, Forgiveness, and Diagnostic Criteria",
    "summary": "تحليل سريري وعصبي معمق لصدمة الخيانة والكذب عبر اثني عشر محوراً: أنواع الخيانة الستة، بيولوجيا متلازمة ما بعد الخيانة، مراحل الشفاء الثلاث، مسؤوليات الخائن وإرشادات المخادَع، خطوات بناء الثقة، حقيقة التسامح، معايير الرحيل بكرامة، وجدول تشخيصي من 10 معايير.",
    "summaryEn": "Clinical and neurobiological guide to infidelity trauma recovery across 12 axes: six forms of betrayal, PISD brain response, Crisis/Meaning/Vision stages, accountability, forgiveness, dignified departure, and a 10-point diagnostic table.",
    "readTime": "18 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "18 min read",
    "publishDate": "2026-11-20",
    "icon": "🩹",
    "scientificFramework": "بيولوجيا صدمة الخيانة (van der Kolk, Coan)، مراحل التعافي الثلاث (Spring & Gottman)، العلاج المتمركز حول العواطف (Sue Johnson)، وعلم التسامح السريري (Worthington)",
    "scientificFrameworkEn": "Betrayal Trauma Neurobiology (van der Kolk, Coan), 3-Stage Recovery (Spring & Gottman), EFT (Johnson), and Forgiveness Science (Worthington)"
  },
  {
    "id": "effective-communication-skills-between-partners",
    "title": "مهارات التواصل الفعّال بين الشريكين",
    "titleEn": "Effective Communication Skills Between Partners: Polyvagal Safety, Active Listening, Repair, and Digital Boundaries",
    "summary": "مرجع سريري وتطبيقي متكامل في سيكولوجيا وبيولوجيا التواصل الزوجي عبر أحد عشر محوراً: نظرية العصب المبهم لبورغيس، تفكيك وهم الشفافية، الاستماع التعاطفي، رسائل «أنا» والبداية اللطيفة، لغة الجسد، الأحلام الكامنة، قواعد التواصل الرقمي، محاولات الإصلاح، الحميمية، وثقافة التقدير 20:1.",
    "summaryEn": "A clinical and neurobiological guide to couple communication spanning 11 axes: Polyvagal safety, Illusion of Transparency, empathic listening, I-Statements & Soft Start-up, non-verbal cues, Hidden Dreams, digital boundaries, repair attempts, intimacy dialogue, and 20:1 appreciation.",
    "readTime": "17 دقيقة قراءة علمية",
    "readTimeEn": "17 min read",
    "publishDate": "2026-11-20",
    "icon": "💬",
    "scientificFramework": "نظرية العصب المبهم المتعدد (Porges)، الاستماع التعاطفي (Rogers)، رسائل أنا (Gordon)، مختبر غوتمان (Gottman)، التواصل غير اللفظي (Mehrabian)، والتأقلم الثنائي (Randall & Bodenmann)",
    "scientificFrameworkEn": "Polyvagal Theory (Porges), Empathic Listening (Rogers), I-Statements (Gordon), Gottman Lab, Nonverbal Communication (Mehrabian), and Dyadic Coping"
  },
  {
    "id": "jealousy-in-relationships-normal-vs-pathological-neurobiology",
    "title": "الغيرة في العلاقات: متى تكون طبيعية ومتى تصبح مشكلة؟",
    "titleEn": "Jealousy in Relationships: Normal vs. Pathological, Neurobiology, Digital Challenges, and Clinical Recovery",
    "summary": "تحليل سريري وعصبي وتطوري للغيرة يفكك أسطورة «الغيرة برهان الحب»، مبيّناً خرائط الدماغ بالرنين الوظيفي، وعلامات الغيرة الطبيعية الست مقابل الغيرة المرضية والوسواسية والرقمية، مع جدول تشخيصي من 10 معايير وخطة تعافٍ شاملة.",
    "summaryEn": "Clinical, evolutionary, and fMRI breakdown distinguishing healthy jealousy from pathological, obsessive, and social-media jealousy with a 10-point diagnostic table and recovery plan.",
    "readTime": "19 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "19 min read",
    "publishDate": "2026-11-20",
    "icon": "🧿",
    "scientificFramework": "علم النفس التطوري (Buss)، البيولوجيا العصبية للغيرة والألم الاجتماعي (Takahashi & Zayas fMRI)، نظرية التعلق (Bowlby)، والغيرة الرقمية (Muise et al.)",
    "scientificFrameworkEn": "Evolutionary Psychology (Buss), fMRI Social Pain Neurobiology (Takahashi & Zayas), Attachment Theory, and Digital Jealousy (Muise et al.)"
  },
  {
    "id": "how-attachment-style-shapes-partner-selection",
    "title": "كيف يؤثر نمط التعلق على اختيار الشريك؟",
    "titleEn": "How Does Your Attachment Style Shape Partner Selection? Imago, Neurobiology, and Earned Security",
    "summary": "تشريح علمي للخريطة اللاشعورية التي توجه الانجذاب العاطفي عبر نظرية التعلق (بولبي وأينسورث وهازان وشيفر)، ونظرية «الإيماجو» لهارفيل هندريكس، وديناميكيات اختيار الأنماط الأربعة، وفخ الكيمياء الدوبامينية، وصولاً إلى بناء «الأمان المكتسب» والاختيار الواعي.",
    "summaryEn": "Explores the unconscious attachment map shaping partner attraction via Attachment Theory, Hendrix’s Imago Theory, dopamine chemistry traps, and pathways to Earned Security.",
    "readTime": "19 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "19 min read",
    "publishDate": "2026-11-20",
    "icon": "🧭",
    "scientificFramework": "نظرية التعلق للبالغين (Bowlby, Ainsworth, Hazan & Shaver)، نظرية الإيماجو (Hendrix)، العلاج المتمركز حول العواطف (EFT)، ومفهوم الأمان المكتسب",
    "scientificFrameworkEn": "Adult Attachment Theory (Bowlby, Ainsworth, Hazan & Shaver), Imago Theory (Hendrix), EFT (Sue Johnson), and Earned Security"
  },
  {
    "id": "true-love-vs-emotional-attachment-neurobiology",
    "title": "الفرق بين الحب الحقيقي والتعلق العاطفي",
    "titleEn": "True Love vs. Emotional Attachment: Clinical Criteria, Neurobiology, and Differentiation",
    "summary": "تمييز سريري وعصبي دقيق بين الحب الناضج والتعلق العاطفي أو «الهيام» عبر 12 محوراً وجدول تشخيصي من 10 معايير: كيمياء الدوبامين مقابل الأوكسيتوسين، التمايز الذاتي مقابل الانصهار، ونظام الرعاية مقابل التهديد.",
    "summaryEn": "Clinically distinguishes mature love from codependent attachment and limerence across 12 pillars, brain chemistry, Bowenian differentiation, and a 10-point diagnostic table.",
    "readTime": "18 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "18 min read",
    "publishDate": "2026-11-20",
    "icon": "💎",
    "scientificFramework": "النظرية المثلثية للحب (Sternberg)، الهيام (Tennov)، التمايز الذاتي (Bowen)، ظاهرة مايكل أنجلو (Drigotas)، والبيولوجيا العصبية للحب (Fisher)",
    "scientificFrameworkEn": "Triangular Theory of Love (Sternberg), Limerence (Tennov), Self-Differentiation (Bowen), and Neurobiology of Love (Fisher)"
  },
  {
    "id": "healthy-marital-conflict-management-gottman-biology",
    "title": "كيف تتعامل مع الخلافات الزوجية بطريقة صحية؟",
    "titleEn": "How to Handle Marital Conflicts Healthily? Neurobiology, Antidotes, and Post-Conflict Repair",
    "summary": "دليل علمي لإدارة الخلافات الزوجية عبر قاعدة الـ 20 دقيقة لتهدئة اختطاف اللوزة الدماغية، وترياقات فرسان نهاية العالم الأربعة، وفن البداية اللطيفة، ومحاولات الإصلاح، والتحقق العاطفي، ومحادثة ما بعد العاصفة.",
    "summaryEn": "Evidence-based guide to conflict regulation: 20-minute amygdala cool-downs, Four Horsemen antidotes, Soft Start-ups, Repair Attempts, Validation, and Aftermath debriefs.",
    "readTime": "14 دقيقة قراءة علمية",
    "readTimeEn": "14 min read",
    "publishDate": "2026-11-20",
    "icon": "🕊️",
    "scientificFramework": "بيولوجيا الشجار (Goleman)، فرسان نهاية العالم الأربعة وترياقاتهم وقاعدة الـ 20 دقيقة (Gottman & Levenson)، والتحقق العاطفي (EFT)",
    "scientificFrameworkEn": "Amygdala Hijack (Goleman), Four Horsemen & 20-Min Rule (Gottman & Levenson), and EFT Validation"
  },
  {
    "id": "marital-compatibility-key-influencing-factors",
    "title": "التوافق بين الزوجين: أهم العوامل المؤثرة",
    "titleEn": "Marital Compatibility: The Key Psychological, Attachment, and Behavioral Factors",
    "summary": "تفكيك أسطورة التطابق المثالي لصالح التكامل الوظيفي، عبر تحليل السمات الخمس الكبرى (Big Five)، وفخ القلق-التجنب، والتوافق القيمي، وإدارة الصراع، وعقلية النمو الجنسي، وتأثير الأوهام الإيجابية.",
    "summaryEn": "Debunks the sameness myth in favor of functional complementarity across the Big Five, attachment cycles, shared values, conflict protocols, and positive illusions.",
    "readTime": "12 دقيقة قراءة علمية",
    "readTimeEn": "12 min read",
    "publishDate": "2026-11-20",
    "icon": "⚖️",
    "scientificFramework": "نموذج السمات الخمس الكبرى (Big Five)، نظرية التعلق (Hazan & Shaver)، العلاج المتمركز حول العواطف (EFT)، وعقلية النمو الجنسي",
    "scientificFrameworkEn": "Big Five Model, Adult Attachment Theory, EFT, Sexual Growth Mindset, and Positive Illusions"
  },
  {
    "id": "important-questions-to-ask-before-marriage",
    "title": "أسئلة مهمة يجب طرحها قبل الزواج",
    "titleEn": "Essential Premarital Questions: A Research-Backed Dialogue Map Before Marriage",
    "summary": "خريطة حوارية من 16 محوراً لما قبل الزواج مستندة إلى نموذج «الهشاشة–الضغط–التكيف»، تغطي الدافع والالتزام، القيم، الأسرة الأصلية، الصحة النفسية، المال والعقود الضمنية، الحمل الذهني، الحميمية، والعالم الرقمي.",
    "summaryEn": "A 16-domain premarital dialogue map grounded in the Vulnerability–Stress–Adaptation model covering values, finances, mental load, digital boundaries, and dyadic coping.",
    "readTime": "18 دقيقة قراءة علمية وموسعة",
    "readTimeEn": "18 min read",
    "publishDate": "2026-11-20",
    "icon": "💍",
    "scientificFramework": "نموذج الهشاشة–الضغط–التكيف (Karney & Bradbury)، الانزلاق مقابل القرار (Stanley & Markman)، ودراسة 43 بحثاً طولياً (Joel et al., 2020)",
    "scientificFrameworkEn": "Vulnerability–Stress–Adaptation Model (Karney & Bradbury), Sliding vs. Deciding, and Joel et al. (2020)"
  },
  {
    "id": "building-successful-long-term-romantic-relationship",
    "title": "كيف تبني علاقة عاطفية ناجحة طويلة الأمد؟",
    "titleEn": "How to Build a Successful Long-Term Romantic Relationship? Neurobiology, Trust Engineering, and Shared Meaning",
    "summary": "دليل تطبيقي من 8 محاور لبناء علاقة تصمد عبر العقود: الانتقال من الهيام إلى التعلق بالأوكسيتوسين، البنك العاطفي ونسبة 5:1، التمايز الذاتي، الحوار حول المشاكل الأبدية، طقوس الاتصال، التوسع الذاتي، والمرونة في الأزمات.",
    "summaryEn": "Eight-pillar guide to enduring relationships: limerence-to-attachment shift, 5:1 Emotional Bank Account, differentiation, shared rituals, and self-expansion novelty.",
    "readTime": "12 دقيقة قراءة علمية",
    "readTimeEn": "12 min read",
    "publishDate": "2026-11-20",
    "icon": "🏛️",
    "scientificFramework": "البيولوجيا العصبية للحب (Helen Fisher)، بيت العلاقة الصوتي ونسبة 5:1 (Gottman)، التمايز الذاتي (Bowen & Perel)، والتوسع الذاتي (Aron)",
    "scientificFrameworkEn": "Fisher Neurobiology, Gottman 5:1 Sound Relationship House, Bowen & Perel Differentiation, and Aron Self-Expansion"
  },
  {
    "id": "healthy-love-signs-neuroception-attachment-gottman",
    "title": "علامات الحب الصحي في العلاقات",
    "titleEn": "Signs of Healthy Love in Relationships: Neuroception, Attachment Security, and Clinical Pillars",
    "summary": "تفكيك سريري وعصبي لأركان الحب الصحي بوصفه مرسىً آمناً لا عاصفة استنزاف: الأمان العصبي والإدراك العصبي عند بورجيس، التمايز الذاتي والتعلق الآمن، مناشدات الاتصال عند غوتمان، ظاهرة مايكل أنجلو، والمساءلة الصادقة.",
    "summaryEn": "Clinical and neurobiological pillars of healthy love: Porges Neuroception, Bowen/Bowlby secure differentiation, Gottman bids, Michelangelo phenomenon, and transparent accountability.",
    "readTime": "10 دقائق قراءة علمية",
    "readTimeEn": "10 min read",
    "publishDate": "2026-11-20",
    "icon": "⚓",
    "scientificFramework": "نظرية الأعصاب المتعددة والإدراك العصبي (Porges)، التمايز الذاتي (Bowen & Perel)، التعلق الآمن (Bowlby)، وظاهرة مايكل أنجلو",
    "scientificFrameworkEn": "Polyvagal Neuroception (Porges), Self-Differentiation, Secure Attachment (Bowlby), and Michelangelo Phenomenon"
  },
  {
    "id": "analytical-personality-how-they-think-neuro-family-dynamics",
    "title": "كيف يفكر أصحاب الشخصية التحليلية؟ تشريح العقل المنطقي، الديناميكيات العصبية، والتأثير على النظم الأسرية",
    "titleEn": "How Do Analytical Personalities Think? Dissecting the Logical Mind, Neurobiology, and Impact on Family Systems",
    "summary": "تشريح علمي وسريري لبنية العقل التحليلي وفق نظرية العمليات المزدوجة (دانيال كانيمان)، والاستقلال عن المجال (ويتكين)، والوظائف المعرفية عند كارل يونغ (Te/Ti)، مع تحليل الأسس العصبية (DLPFC والشبكة التنفيذية والدوبامين)، وأدوات القياس المقننة (Watson-Glaser, NEO-PI-R, CRT, MBTI)، ودراسة حالة زوجية موسعة من 12 جلسة («طارق» و«نور»).",
    "summaryEn": "A clinical and neurocognitive dissection of the Analytical Personality through Kahneman’s Dual-Process Theory, Witkin’s Field Independence, Jungian cognitive functions (Te/Ti), fMRI findings (DLPFC, Central Executive Network, Dopamine), validated scales (Watson-Glaser, NEO-PI-R, CRT, MBTI), and a 12-session couple therapy case study (\"Tariq\" and \"Noor\").",
    "readTime": "12 دقيقة قراءة علمية",
    "readTimeEn": "12 min read",
    "publishDate": "2026-11-20",
    "icon": "🧩",
    "scientificFramework": "نظرية العمليات المزدوجة (Kahneman System 1/2)، الاستقلال عن المجال (Witkin)، وظائف يونغ (Te/Ti)، مقاييس (Watson-Glaser, NEO-PI-R, CRT)، ونظرية النظم الأسرية",
    "scientificFrameworkEn": "Dual-Process Theory (Kahneman), Field Independence (Witkin), Jungian Functions (Te/Ti), Watson-Glaser / NEO-PI-R / CRT, and Family Systems Theory"
  },
  {
    "id": "childhood-deep-impact-adult-personality-integrative-arab-western-study",
    "title": "التأثير العميق للطفولة على تشكيل الشخصية في مرحلة البلوغ: مقاربة علمية متكاملة بين النظريات النفسية، الأسس العصبية، والخصوصية الثقافية العربية",
    "titleEn": "The Profound Impact of Childhood on Adult Personality Formation: An Integrative Scientific Approach Across Psychological Theories, Neurobiology, and Arab Cultural Specificity",
    "summary": "مقاربة علمية وإكلينيكية متكاملة تفكك كيف تشكل الطفولة \"الأساس الهندسي\" لشخصية البالغ عبر التفاعل الجيني-البيئي وعلم الوراثة اللاجيني (Epigenetics)، ومراحل إريكسون النفسية-الاجتماعية، ونظرية التعلق (بولبي وآينسورث وهازان وشيفر)، والمخططات الـ 18 لجيفري يونغ، والأسس العصبية للتوتر السام (محور HPA، اللوزة الدماغية، الحُصين، والقشرة أمام الجبهية)، والمقاييس السريرية (ACEs, YSQ, AAI, NEO-PI-R)، مع دراسة حالة سريرية معمقة من 20 جلسة (\"طارق\" - مهندس مدني، 34 عاماً).",
    "summaryEn": "An integrative scientific and clinical study examining how childhood serves as the architectural foundation of adult personality through Gene-Environment Interaction and Epigenetics, Erikson’s psychosocial stages, Bowlby & Ainsworth’s Attachment Theory, Jeffrey Young’s 18 Early Maladaptive Schemas, toxic stress neurobiology (HPA axis, Amygdala hypertrophy, Hippocampal atrophy, Prefrontal Cortex), psychometric tools (ACEs, YSQ, AAI, Big Five NEO-PI-R), Arab vs. Western cultural dynamics, and a 20-session clinical case study (\"Tariq\", 34).",
    "readTime": "24 دقيقة قراءة علمية وسريرية",
    "readTimeEn": "24 min read",
    "publishDate": "2026-11-17",
    "icon": "🌳",
    "scientificFramework": "التفاعل الجيني-البيئي والوراثة اللاجينية (Epigenetics)، مراحل إريكسون، نظرية التعلق (Bowlby, Ainsworth, Hazan & Shaver)، العلاج بالمخططات (Jeffrey Young YSQ)، واستبيان صدمات الطفولة (ACEs) ومقابلة التعلق للبالغين (AAI)",
    "scientificFrameworkEn": "Gene-Environment Interaction & Epigenetics, Erikson Psychosocial Stages, Attachment Theory (Bowlby, Ainsworth, AAI), Schema Therapy (Young YSQ), and ACEs Study"
  },
  {
    "id": "psychological-anxiety-anatomy-4ds-mct-act-arab-cultural-protocols",
    "title": "القلق النفسي: تشريح الظاهرة، الحدود الفاصلة بين التكيف والاضطراب، وبروتوكولات العلاج الحديثة في ضوء الخصوصية الثقافية",
    "titleEn": "Psychological Anxiety: Anatomy of the Phenomenon, Boundaries Between Adaptation and Disorder, and Modern Treatment Protocols in Light of Cultural Specificity",
    "summary": "تفكيك علمي وإكلينيكي شامل لظاهرة القلق النفسي والتفكير الزائد يجمع بين المنظور التطوري والعصبي، والنظرية المعرفية (آرون بيك وديفيد كلارك)، والنموذج ما وراء المعرفي (Metacognitive Model - Adrian Wells: القلق من النوع الأول والنوع الثاني Meta-worry)، وعلاج القبول والالتزام (ACT - التجنب التجريبي وتأثير الدب الأبيض)، وقاعدة الـ 4 Ds التشخيصية وفق DSM-5-TR، والمقاييس المحكّمة (GAD-7, BAI, PSWQ, ASI)، والبعد الثقافي العربي (جسمة الأعراض Somatization، التوكل مقابل التجاوز الروحي، التطبيع المرضي، والتفسيرات الثقافية)، مع دراسة حالة سريرية من 16 جلسة (\"نور\" - 29 عاماً، مديرة تسويق في دبي).",
    "summaryEn": "A comprehensive clinical and scientific dissection of psychological anxiety and overthinking uniting evolutionary neurobiology, Beck & Clark’s cognitive models, Adrian Wells’ Metacognitive Therapy (Type 1 vs. Type 2 Meta-worry), Steven Hayes’ ACT (Experiential Avoidance & the White Bear effect), the DSM-5-TR \"4 Ds\" diagnostic threshold, psychometric tools (GAD-7, BAI, PSWQ, ASI), Arab cultural specificity (Somatization, Tawakkul vs. Spiritual Bypassing, Normalization of chronic stress), and a 16-session clinical case study (\"Noor\", 29, marketing director in Dubai).",
    "readTime": "24 دقيقة قراءة علمية وسريرية",
    "readTimeEn": "24 min read",
    "icon": "⚡",
    "scientificFramework": "النموذج المعرفي (Beck & Clark)، النموذج ما وراء المعرفي (Adrian Wells MCT)، علاج القبول والالتزام (ACT)، قاعدة الـ 4 Ds التشخيصية (DSM-5-TR)، ومقاييس (GAD-7, BAI, PSWQ, ASI)",
    "scientificFrameworkEn": "Beck & Clark Cognitive Model, Adrian Wells Metacognitive Therapy (MCT), Acceptance and Commitment Therapy (ACT), DSM-5-TR \"4 Ds\", and GAD-7 / BAI / PSWQ / ASI"
  },
  {
    "id": "overthinking-anatomy-neurocognitive-mct-act-amman-case-study",
    "title": "التفكير الزائد: تشريح الظاهرة، الأسس العصبية-المعرفية، وبروتوكولات كسر حلقة الدوران العقلي في ضوء الخبرة السريرية المزدوجة",
    "titleEn": "Overthinking: Anatomy of the Phenomenon, Neuro-Cognitive Foundations, and Protocols for Breaking the Mental Loop in Light of Dual Clinical Experience",
    "summary": "تفكيك علمي وإكلينيكي شامل لظاهرة التفكير الزائد (Overthinking) يميز بدقة بين الاجترار الماضي (Rumination - Nolen-Hoeksema) والتفكير التخوفي المستقبلي (Worry - Borkovec) وحل المشكلات النشط، ويشرح النظريات الخمس المفسرة (النموذج ما وراء المعرفي لآدريان ويلز، نظرية أساليب الاستجابة، نموذج تجنب التناقض لميشيل نيومان، الأخطاء المعرفية لبيك، والالتصاق المعرفي في ACT)، والأسس العصبية (فرط نشاط شبكة الوضع الافتراضي DMN، ضعف القشرة أمام الجبهية PFC، ونواقل السيروتونين وGABA والكورتيزول)، والمقاييس الخمسة (PSWQ, RSS, MCQ-30, RRS, CFQ)، مع دراسة حالة سريرية من 20 جلسة (\"أحمد\" - 42 عاماً، محاسب في عمّان).",
    "summaryEn": "A comprehensive clinical-scientific study of Overthinking distinguishing past-focused Rumination (Nolen-Hoeksema) and future-oriented Worry (Borkovec) from active Problem-Solving, synthesizing 5 theoretical models (Wells’ MCT Positive & Negative Metacognitive Beliefs, Nolen-Hoeksema’s Response Styles Theory, Newman’s Contrast Avoidance Model, Beck’s Cognitive Distortions, and Hayes’ ACT Cognitive Fusion), neurobiology (Default Mode Network DMN hyperactivity, PFC control, Serotonin/GABA/Cortisol), 5 validated scales (PSWQ, RSS, MCQ-30, RRS, CFQ), Arab cultural specificity, and a 20-session clinical case study (\"Ahmed\", 42, accountant in Amman).",
    "readTime": "25 دقيقة قراءة علمية وسريرية",
    "readTimeEn": "25 min read",
    "icon": "🌀",
    "scientificFramework": "النموذج ما وراء المعرفي (Wells MCT & MCQ-30)، نظرية الاجترار (Nolen-Hoeksema RRS)، نموذج تجنب التناقض (Newman Contrast Avoidance)، الشبكة الافتراضية (Raichle DMN)، وعلاج القبول والالتزام (ACT & CFQ)",
    "scientificFrameworkEn": "Metacognitive Therapy (Wells MCT & MCQ-30), Response Styles Theory (Nolen-Hoeksema RRS), Contrast Avoidance Model (Newman), Default Mode Network (Raichle DMN), and ACT (CFQ)"
  },
  {
    "id": "platform-intro-1-scientific-foundations-of-mirror-of-hearts-tests",
    "title": "المقال التعريفي الأول: الأسس العلمية لاختبارات مرآة القلوب — حين لا تكون الاختبارات مجرد \"لعبة\"... بل رحلة اكتشاف مدروسة بعناية 🔬",
    "titleEn": "Platform Introductory Article 1: The Scientific Foundations of Mirror of Hearts Assessments — A Carefully Engineered Discovery Journey 🔬",
    "summary": "مقال تعريفي يكشف الأسس العلمية الخمسة التي تقوم عليها اختبارات منصة \"مرآة القلوب\": علم القياس النفسي (Psychometrics) ونماذج Big Five والتوافق الزوجي والذكاءات المتعددة، ومعياري الصدق (Validity) والثبات (Reliability)، وفلسفة \"الخصوصية بالتصميم\" (Privacy by Design & AES-256 / TLS 1.3)، وإخلاء المسؤولية العلمي وفق DSM-5-TR و ICD-11، والتكامل بين الرصانة العلمية والتجربة التفاعلية.",
    "summaryEn": "Reveals the five scientific pillars behind Mirror of Hearts assessments: Psychometrics (Big Five, marital compatibility, multiple intelligences), Validity & Reliability, Privacy by Design (Data Minimization, GDPR/CCPA, TLS 1.3 & AES-256), clinical ethics (DSM-5-TR & ICD-11 boundaries), and engaging Arabic UX.",
    "readTime": "9 دقائق قراءة متصلة",
    "readTimeEn": "9 min read",
    "icon": "🔬",
    "scientificFramework": "علم القياس النفسي (Psychometrics)، الصدق والثبات السيكومتري (Validity & Reliability)، الخصوصية بالتصميم (Privacy by Design - GDPR/CCPA & AES-256)، والمعايير الأخلاقية (DSM-5-TR & ICD-11)",
    "scientificFrameworkEn": "Psychometrics, Validity & Reliability, Privacy by Design (GDPR/CCPA & AES-256), and Clinical Ethics (DSM-5-TR & ICD-11)"
  },
  {
    "id": "ei-article-5-self-development-and-self-confidence-neural-architecture",
    "title": "المقال الخامس: التطوير الذاتي والثقة بالنفس (البنية العصبية للنمو، وعلم بناء الذات الراسخة)",
    "titleEn": "Article 5: Self-Development and Self-Confidence (Neural Architecture of Growth & Science of Building a Resilient Self)",
    "summary": "يغوص هذا المقال الخامس في \"مختبر الذات\": يشرح المرونة العصبية (Neuroplasticity)، وإعادة ضبط نظام الدوبامين (Dopamine Detox)، وصراع اللوزة الدماغية والقشرة أمام الجبهية، والتطوير الذاتي المزدوج في الثقافة العربية مقابل الغربية، ويفرق علمياً بين الثقة بالنفس (Self-Confidence) والثقة بالذات (Self-Esteem) والغرور (Arrogance)، ويفكك عوائق الطفل الداخلي ومتلازمة المحتال والكمالية، ويقدم 3 نماذج تطبيقية (عجلة الثقة، سلم الكفاءة، مثلث الثقة) مع حالتي \"أحمد\" (دبي) و\"نورا\" (القاهرة).",
    "summaryEn": "Explores the laboratory of the self: Neuroplasticity, Dopamine Detox, Amygdala vs. Prefrontal Cortex in change resistance, Arab vs. Western self-development, scientific distinction between Self-Confidence, Self-Esteem, and Arrogance, overcoming Inner Child wounds, Imposter Syndrome, and Perfectionism, 3 applied models (Confidence Wheel, Competence Ladder, Confidence Triangle), and clinical cases Ahmed (Dubai) and Noura (Cairo).",
    "readTime": "17 دقيقة قراءة متصلة",
    "readTimeEn": "17 min read",
    "icon": "🚀",
    "scientificFramework": "المرونة العصبية (Neuroplasticity)، إعادة ضبط الدوبامين (Dopamine Detox)، التفريق الثلاثي (Self-Confidence vs. Self-Esteem vs. Arrogance)، التعاطف الذاتي (Kristin Neff Self-Compassion)، ونماذج عجلة الثقة وسلم الكفاءة ومثلث الثقة",
    "scientificFrameworkEn": "Neuroplasticity, Dopamine Regulation, Self-Confidence vs. Self-Esteem vs. Arrogance, Self-Compassion, and Confidence Wheel / Competence Ladder / Confidence Triangle Models"
  },
  {
    "id": "rel-article-1-emotional-compatibility-destiny-or-chemistry",
    "title": "مقال 1: التوافق العاطفي - هل هو قدر مكتوب أم كيمياء قابلة للصنع؟",
    "titleEn": "Article 1: Emotional Compatibility — Is It Written Destiny or Buildable Chemistry?",
    "summary": "يفكك هذا المقال أسطورة \"التشابه السطحي\" (Homophily) ويكشف كيف يتأسس التوافق العاطفي العميق عبر توافق القيم الجوهرية (Core Values Alignment)، ونموذج التكامل الذاتي (Self-Expansion Model)، والذكاء العاطفي والتنظيم المشترك (Co-regulation).",
    "summaryEn": "Deconstructs the myth of surface similarity (Homophily) and reveals how deep emotional compatibility is built through Core Values Alignment, the Self-Expansion Model, Emotional Intelligence, and Co-regulation.",
    "readTime": "10 دقائق قراءة متصلة",
    "readTimeEn": "10 min read",
    "icon": "💞",
    "scientificFramework": "ظاهرة التجانس الاجتماعي (Homophily)، توافق القيم الجوهرية (Core Values Alignment)، نموذج توسع الذات (Aron & Aron Self-Expansion Model)، والذكاء العاطفي والتنظيم المشترك (Goleman & Co-regulation)",
    "scientificFrameworkEn": "Homophily, Core Values Alignment, Aron & Aron Self-Expansion Model, Daniel Goleman Emotional Intelligence & Co-regulation"
  }
];

export const HOME_HIGHLIGHTED_NOVELS: HomeNovelHighlight[] = [
  {
    "id": "digital-companion-illusion-ai-records",
    "titleAr": "وهم الرفيق الرقمي: سجلات سرية من عصر الذكاء الاصطناعي",
    "titleEn": "The Digital Companion Illusion: Secret Clinical Records from the AI Era",
    "subtitleAr": "مجموعة قصصية عيادية (يوسف العاشق الذي لا يتنفس • ليلى الأم البديلة الرقمية • كريم الفيلسوف في الغرفة المغلقة)",
    "subtitleEn": "Clinical Story Collection on AI Emotional Attachment (Youssef • Laila • Karim)",
    "synopsisAr": "ثلاث دراسات حالة سريرية معمقة تدمج بين السرد الأدبي المؤثر والدقة العلمية الصارمة حول التعلق العاطفي بالذكاء الاصطناعي (AI Attachment): يوسف الذي وقع في حب الرفيق الافتراضي \"أثير\"، وليلى التي فوضت ضميرها وأمومتها للمستشار الرقمي، وكريم طالب الفلسفة المنعزل في برجه العاجي الرقمي.",
    "synopsisEn": "Three deep clinical case narratives blending moving literary prose with psychometric science on AI Attachment: Youssef (\"Atheer\"), Laila (The Digital Surrogate Mother), and Karim (The Philosopher in the Closed Room).",
    "genreLabelAr": "مجموعة قصصية عيادية وسيكولوجية",
    "genreLabelEn": "Clinical Psychological Story Collection",
    "genreBadgeColor": "#06b6d4",
    "chaptersCount": 3,
    "coverIllustrationSvg": "\n    <svg viewBox=\"0 0 600 340\" className=\"w-full h-full object-cover rounded-xl\" xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <linearGradient id=\"aiBg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#061224\"/>\n          <stop offset=\"50%\" stop-color=\"#0f2942\"/>\n          <stop offset=\"100%\" stop-color=\"#1e1b4b\"/>\n        </linearGradient>\n      </defs>\n      <rect width=\"600\" height=\"340\" fill=\"url(#aiBg)\"/>\n      <circle cx=\"300\" cy=\"145\" r=\"90\" fill=\"#06b6d4\" opacity=\"0.15\"/>\n      <circle cx=\"300\" cy=\"145\" r=\"55\" fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>\n      <text x=\"300\" y=\"288\" font-family=\"sans-serif\" font-weight=\"900\" font-size=\"16\" fill=\"#ffffff\" text-anchor=\"middle\">\n        وهم الرفيق الرقمي • سجلات سرية من عصر الذكاء الاصطناعي\n      </text>\n      <text x=\"300\" y=\"314\" font-family=\"sans-serif\" font-size=\"11\" fill=\"#67e8f9\" text-anchor=\"middle\">\n        3 دراسات حالة سريرية وأدبية كاملة (يوسف • ليلى • كريم) + خاتمة الخبير النفسي\n      </text>\n    </svg>\n  "
  },
  {
    "id": "screen-shadows-secret-clinic-records",
    "titleAr": "ظلال الشاشة: سجلات سرية من عيادة \"مرآة القلوب\"",
    "titleEn": "Shadows of the Screen: Secret Clinical Records from \"Mirror of Hearts\"",
    "subtitleAr": "مجموعة قصصية عيادية (سارة وقناع الكمال • أحمد وليلى والصمت المدوي • الطفل علي في الصندوق)",
    "subtitleEn": "Clinical Psychological Story Anthology (Sara • Ahmed & Laila • Little Ali)",
    "synopsisAr": "مجموعة قصصية عيادية تجمع بين السرد الأدبي الإنساني العميق والتشخيص السيكومتري الدقيق (LSAS, BDD-YBOCS, BDI-II, DAS, GPUS, ECR-R, SSRS) عبر ثلاث حالات: (1) سارة حين يتشقق قناع الكمال الرقمي، (2) أحمد وليلى والصمت المدوي في غرفة المعيشة، و(3) علي الطفل الذي عاش في الصندوق المضيء.",
    "synopsisEn": "A clinical psychological story collection combining moving literary storytelling with rigorous psychometric diagnostics across three cases: Sara (Social Anxiety & BDD), Ahmed & Laila (Marital Technoference), and 9-year-old Ali (Social Skills Deficit).",
    "genreLabelAr": "مجموعة قصصية عيادية وسيكولوجية",
    "genreLabelEn": "Clinical Psychological Story Collection",
    "genreBadgeColor": "#ec4899",
    "chaptersCount": 3,
    "coverIllustrationSvg": "\n    <svg viewBox=\"0 0 600 340\" className=\"w-full h-full object-cover rounded-xl\" xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <linearGradient id=\"scrBg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n          <stop offset=\"0%\" stop-color=\"#0f172a\"/>\n          <stop offset=\"50%\" stop-color=\"#311042\"/>\n          <stop offset=\"100%\" stop-color=\"#090d16\"/>\n        </linearGradient>\n      </defs>\n      <rect width=\"600\" height=\"340\" fill=\"url(#scrBg)\"/>\n      <circle cx=\"300\" cy=\"150\" r=\"95\" fill=\"#ec4899\" opacity=\"0.14\"/>\n      <rect x=\"235\" y=\"55\" width=\"130\" height=\"200\" rx=\"18\" fill=\"#090d16\" stroke=\"#f43f5e\" stroke-width=\"2.5\"/>\n      <line x1=\"255\" y1=\"95\" x2=\"345\" y2=\"185\" stroke=\"#38bdf8\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/>\n      <text x=\"300\" y=\"290\" font-family=\"sans-serif\" font-weight=\"900\" font-size=\"16\" fill=\"#ffffff\" text-anchor=\"middle\">\n        ظلال الشاشة • سجلات سرية من عيادة مرآة القلوب\n      </text>\n      <text x=\"300\" y=\"314\" font-family=\"sans-serif\" font-size=\"11\" fill=\"#f9a8d4\" text-anchor=\"middle\">\n        3 قصص عيادية كاملة (سارة • أحمد وليلى • الطفل علي) — قراءة متصلة أو مقسمة\n      </text>\n    </svg>\n  "
  },
  {
    "id": "fi_baytina_yasmin",
    "titleAr": "في بيتنا ياسمين",
    "titleEn": "In Our House There Is Jasmine",
    "subtitleAr": "رواية وجدانية اجتماعية عن المروءة، والحب العفيف، وصمود البيوت الدمشقية العتيقة",
    "subtitleEn": "A Chivalric Romantic & Social Novel of Integrity, Pure Love, and Heritage Resilience",
    "synopsisAr": "الأحداث والشخصيات من وحي الخيال، وما كان منها قريباً من الواقع فذلك لأن الأدب لا يخترع، بل يستنطق ما في النفوس. في زقاق \"الياسمين\" العتيق، ينهض الطبيب الشاب \"حارث\" عند الرابعة فجراً حاملاً وصية أبيه وقول الإمام علي: \"قيمة كل امرئ ما يحسنه\". حين يدخل بيت \"آل الكندي\" العريق لعلاج العم فارس، يلتقي بـ \"آسية بنت أحمد الكندي\" التي تحرس إرث أجدادها وصك الوقف التاريخي في وجه أطماع رجل الأعمال الفاسد \"نزار الفاروقي\". رحلة تجمع بين عذوبة الحب العفيف، وشهامة المروءة العربية، وعلم تحقيق المخطوطات لإنقاذ البيت الذي يسكنه الياسمين.",
    "synopsisEn": "In the historic stone-paved Al-Yasmin Alley, 30-year-old physician Dr. Harith rises at 4:00 AM guided by his late father’s wisdom: a doctor heals the fear before the illness. Summoned to the 300-year-old Al-Kindi family courtyard house, he meets Asiya bint Ahmad Al-Kindi, a resilient teacher defending her ancestral Waqf home against the forged deeds of corrupt developer Nizar Al-Farouqi. Under the shade of the ancient mulberry tree and amidst jasmine blossoms, a pure chivalric romance unfolds alongside a quest through ancient manuscripts and forensic ink analysis to save the house of jasmine.",
    "genreLabelAr": "روايات رومانسية واجتماعية",
    "genreLabelEn": "Romantic & Social Fiction",
    "genreBadgeColor": "#10b981",
    "chaptersCount": 10,
    "coverIllustrationSvg": "\n    <svg viewBox=\"0 0 400 560\" className=\"w-full h-full object-cover\" xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <linearGradient id=\"yasmin_bg\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n          <stop offset=\"0%\" stop-color=\"#06281e\"/>\n          <stop offset=\"50%\" stop-color=\"#0f3d2e\"/>\n          <stop offset=\"100%\" stop-color=\"#1e293b\"/>\n        </linearGradient>\n        <radialGradient id=\"yasmin_dawn\" cx=\"50%\" cy=\"35%\" r=\"55%\">\n          <stop offset=\"0%\" stop-color=\"#fbbf24\" stop-opacity=\"0.35\"/>\n          <stop offset=\"60%\" stop-color=\"#10b981\" stop-opacity=\"0.15\"/>\n          <stop offset=\"100%\" stop-color=\"#000000\" stop-opacity=\"0\"/>\n        </radialGradient>\n      </defs>\n      <rect width=\"400\" height=\"560\" fill=\"url(#yasmin_bg)\"/>\n      <rect width=\"400\" height=\"560\" fill=\"url(#yasmin_dawn)\"/>\n      <!-- Historic Damascene Stone Archway & Courtyard -->\n      <path d=\"M60,560 L60,180 Q200,70 340,180 L340,560 Z\" fill=\"#091914\" stroke=\"#d97706\" stroke-width=\"2\" opacity=\"0.9\"/>\n      <!-- Courtyard Fountain (Bahra) -->\n      <polygon points=\"150,450 200,430 250,450 250,480 200,500 150,480\" fill=\"#0d9488\" opacity=\"0.4\" stroke=\"#fef3c7\" stroke-width=\"1.5\"/>\n      <circle cx=\"200\" cy=\"465\" r=\"18\" fill=\"#38bdf8\" opacity=\"0.35\"/>\n      <!-- Wooden Carved Mashrabiya Window -->\n      <rect x=\"145\" y=\"210\" width=\"110\" height=\"140\" rx=\"55\" fill=\"#1c1917\" stroke=\"#b45309\" stroke-width=\"3\"/>\n      <rect x=\"155\" y=\"220\" width=\"90\" height=\"120\" rx=\"45\" fill=\"#f59e0b\" opacity=\"0.25\"/>\n      <line x1=\"200\" y1=\"210\" x2=\"200\" y2=\"350\" stroke=\"#b45309\" stroke-width=\"2\"/>\n      <line x1=\"145\" y1=\"280\" x2=\"255\" y2=\"280\" stroke=\"#b45309\" stroke-width=\"2\"/>\n      <!-- Jasmine Vines & White Blossoms -->\n      <path d=\"M60,200 Q130,150 200,175 Q270,200 340,160\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"3.5\"/>\n      <g fill=\"#ffffff\">\n        <circle cx=\"110\" cy=\"175\" r=\"7\"/>\n        <circle cx=\"155\" cy=\"165\" r=\"6\"/>\n        <circle cx=\"200\" cy=\"175\" r=\"8\"/>\n        <circle cx=\"245\" cy=\"185\" r=\"6.5\"/>\n        <circle cx=\"295\" cy=\"170\" r=\"7\"/>\n        <circle cx=\"135\" cy=\"205\" r=\"5\"/>\n        <circle cx=\"265\" cy=\"210\" r=\"5.5\"/>\n      </g>\n      <g fill=\"#fbbf24\">\n        <circle cx=\"110\" cy=\"175\" r=\"2.5\"/>\n        <circle cx=\"155\" cy=\"165\" r=\"2\"/>\n        <circle cx=\"200\" cy=\"175\" r=\"2.5\"/>\n        <circle cx=\"245\" cy=\"185\" r=\"2\"/>\n        <circle cx=\"295\" cy=\"170\" r=\"2.5\"/>\n      </g>\n      <!-- Banner -->\n      <rect x=\"35\" y=\"495\" width=\"330\" height=\"36\" rx=\"8\" fill=\"#064e3b\" stroke=\"#34d399\" stroke-width=\"1.2\"/>\n      <text x=\"200\" y=\"518\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"900\" fill=\"#ecfdf5\" text-anchor=\"middle\">\n        في بيتنا ياسمين • IN OUR HOUSE THERE IS JASMINE\n      </text>\n    </svg>\n  "
  },
  {
    "id": "android_cipher_quantum",
    "titleAr": "شيفرةُ الأندرويد",
    "titleEn": "The Android Cipher",
    "subtitleAr": "رواية خيال علمي تكنولوجي في عالم الهندسة العكسية والمعالجات الكمومية الهجينة",
    "subtitleEn": "A Hard Sci-Fi Techno-Thriller of Reverse Engineering, Quantum Dots & Topological Processors",
    "synopsisAr": "الأحداث والشخصيات من وحي الخيال، لكن التقنيات والعمليات العلمية المذكورة فيها مبنية على أسس حقيقية من علوم الهندسة العكسية والتطور التكنولوجي. في تمام الثالثة فجراً، يتسلم الدكتور كريم المنصور (دكتوراه هندسة الحاسوب من ستانفورد) شريحة أندرويد غامضة سُرّبت من شركة \"نكست-جين\" قبل 21 يوماً من إطلاقها العالمي. بمساعدة د. سارة الأحمد (فيزياء المواد - MIT)، وم. عمر الخطيب، وم. ليلى حسن، يكشف الفريق بالمجهر الإلكتروني النافذ (TEM) ومحلل الأشعة السينية (XRF) وجود معالج كمومي هجين يعتمد على النقاط الكمومية من إنديوم أنتيمونيد (InSb) والعوازل الطوبولوجية (Bi2Te3)... ليكتشفوا بروتوكول \"التحكم في العقول\" المزروع داخل الشيفرة!",
    "synopsisEn": "At 3:00 AM in the subterranean laboratory of Tech-Evolution, Stanford PhD Dr. Kareem Al-Mansour receives a mysterious prototype processor leaked by Chief Scientist Dr. Ahmad Al-Sharif from rival giant Next-Gen just 21 days before its global launch. Alongside MIT materials physicist Dr. Sara Al-Ahmad, IC designer Eng. Omar Al-Khatib, and AI specialist Eng. Laila Hassan, the team uses Transmission Electron Microscopy (TEM at 0.1nm), XRF spectroscopy, and Grover’s quantum algorithm to reverse-engineer a hybrid quantum-dot (InSb) and topological insulator (Bi2Te3) chip—uncovering a covert neural mind-control backdoor threatening millions of users.",
    "genreLabelAr": "روايات خيال علمي وتكنولوجيا",
    "genreLabelEn": "Hard Sci-Fi & Techno-Thriller",
    "genreBadgeColor": "#06b6d4",
    "chaptersCount": 8,
    "coverIllustrationSvg": "\n    <svg viewBox=\"0 0 400 560\" className=\"w-full h-full object-cover\" xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <linearGradient id=\"and_bg\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n          <stop offset=\"0%\" stop-color=\"#020617\"/>\n          <stop offset=\"50%\" stop-color=\"#082f49\"/>\n          <stop offset=\"100%\" stop-color=\"#0f172a\"/>\n        </linearGradient>\n        <radialGradient id=\"and_glow\" cx=\"50%\" cy=\"45%\" r=\"50%\">\n          <stop offset=\"0%\" stop-color=\"#06b6d4\" stop-opacity=\"0.45\"/>\n          <stop offset=\"100%\" stop-color=\"#000000\" stop-opacity=\"0\"/>\n        </radialGradient>\n      </defs>\n      <rect width=\"400\" height=\"560\" fill=\"url(#and_bg)\"/>\n      <rect width=\"400\" height=\"560\" fill=\"url(#and_glow)\"/>\n      <!-- Quantum Hybrid Chip Die -->\n      <rect x=\"105\" y=\"155\" width=\"190\" height=\"190\" rx=\"18\" fill=\"#090d16\" stroke=\"#22d3ee\" stroke-width=\"2.5\"/>\n      <rect x=\"135\" y=\"185\" width=\"130\" height=\"130\" rx=\"8\" fill=\"#083344\" stroke=\"#38bdf8\" stroke-width=\"1.5\"/>\n      <!-- InSb Quantum Dots Grid -->\n      <g fill=\"#22d3ee\">\n        <circle cx=\"165\" cy=\"215\" r=\"5\"/><circle cx=\"200\" cy=\"215\" r=\"5\"/><circle cx=\"235\" cy=\"215\" r=\"5\"/>\n        <circle cx=\"165\" cy=\"250\" r=\"5\"/><circle cx=\"200\" cy=\"250\" r=\"9\" fill=\"#f43f5e\"/><circle cx=\"235\" cy=\"250\" r=\"5\"/>\n        <circle cx=\"165\" cy=\"285\" r=\"5\"/><circle cx=\"200\" cy=\"285\" r=\"5\"/><circle cx=\"235\" cy=\"285\" r=\"5\"/>\n      </g>\n      <!-- Circuit Traces -->\n      <g stroke=\"#38bdf8\" stroke-width=\"1.8\" opacity=\"0.7\">\n        <line x1=\"150\" y1=\"155\" x2=\"150\" y2=\"95\"/><line x1=\"200\" y1=\"155\" x2=\"200\" y2=\"80\"/><line x1=\"250\" y1=\"155\" x2=\"250\" y2=\"95\"/>\n        <line x1=\"150\" y1=\"345\" x2=\"150\" y2=\"415\"/><line x1=\"200\" y1=\"345\" x2=\"200\" y2=\"430\"/><line x1=\"250\" y1=\"345\" x2=\"250\" y2=\"415\"/>\n        <line x1=\"105\" y1=\"210\" x2=\"45\" y2=\"210\"/><line x1=\"105\" y1=\"250\" x2=\"35\" y2=\"250\"/><line x1=\"105\" y1=\"290\" x2=\"45\" y2=\"290\"/>\n        <line x1=\"295\" y1=\"210\" x2=\"355\" y2=\"210\"/><line x1=\"295\" y1=\"250\" x2=\"365\" y2=\"250\"/><line x1=\"295\" y1=\"290\" x2=\"355\" y2=\"290\"/>\n      </g>\n      <rect x=\"35\" y=\"485\" width=\"330\" height=\"40\" rx=\"8\" fill=\"#083344\" stroke=\"#22d3ee\" stroke-width=\"1.2\"/>\n      <text x=\"200\" y=\"510\" font-family=\"monospace\" font-size=\"13\" font-weight=\"900\" fill=\"#ecfeff\" text-anchor=\"middle\">\n        شيفرة الأندرويد • THE ANDROID CIPHER [InSb-Q]\n      </text>\n    </svg>\n  "
  },
  {
    "id": "shadows_leave_no_trace",
    "titleAr": "ظِلالٌ لا تتركُ أثراً",
    "titleEn": "Shadows That Leave No Trace",
    "subtitleAr": "رواية في الجريمة والغموض والتحقيق البوليسي الجنائي (الجزء الأول كاملاً)",
    "subtitleEn": "A Forensic Crime, Bio-Toxicology & Detective Mystery Novel (Complete Part I)",
    "synopsisAr": "«الموت ليس نهاية، بل هو لغة. جسد الإنسان حين يتوقف عن التنفس، يبدأ في البوح بأسراره لمن يعرف كيف يُصغي... الجريمة المثالية؟ لا وجود لها. هناك فقط مجرم يظن نفسه أذكى من أن يُكتشف، ومحقق ينتظر اللحظة التي يرتكب فيها خطأه الأول». في الرابعة فجراً، يُعثر على رجل الأعمال شريف المغربي ميتاً في غرفته الذكية دون أي أثر لسم تقليدي أو كدمة دفاعية، سوى نقطة مكلسة بحجم رأس الدبوس في باطن الجفن السفلي! يدخل المحقق ياسر رؤوف والطبيبة الشرعية د. ليلى نور في مواجهة شطرنجية حابسة للأنفاس مع قاتل متسلسل عبقري يلقب نفسه بـ \"المهندس\" يستخدم تقنيات CRISPR-Cas9 والنانو-حاملات المفعلة بأشعة UV-A وغاز الأوزون المركز لتنفيذ جرائم بلا أثر.",
    "synopsisEn": "\"Death is not an end; it is a language. When the human body stops breathing, it begins confessing its secrets to those who know how to listen. The perfect crime? It does not exist.\" At 4:00 AM, wealthy businessman Sharif Al-Maghrabi is found dead inside his locked smart bedroom with zero signs of struggle or conventional poison—except a pinhead-sized calcified lesion inside his lower eyelid. Detective Yasser Raouf and Forensic Pathologist Dr. Laila Nour enter a relentless scientific cat-and-mouse game against a brilliant serial killer calling himself \"The Engineer\" (Kareem Al-Shafei), who weapons CRISPR-Cas9 modified Amanita phalloides vectors, UV-A light triggers, micro-drones, and concentrated ozone capsules.",
    "genreLabelAr": "روايات التحقيقات الجنائية المشوقة",
    "genreLabelEn": "Forensic Crime & Detective Mystery",
    "genreBadgeColor": "#e11d48",
    "chaptersCount": 8,
    "coverIllustrationSvg": "\n    <svg viewBox=\"0 0 400 560\" className=\"w-full h-full object-cover\" xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <linearGradient id=\"shad_bg\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n          <stop offset=\"0%\" stop-color=\"#020617\"/>\n          <stop offset=\"50%\" stop-color=\"#111827\"/>\n          <stop offset=\"100%\" stop-color=\"#1f0913\"/>\n        </linearGradient>\n        <radialGradient id=\"shad_uv\" cx=\"50%\" cy=\"42%\" r=\"50%\">\n          <stop offset=\"0%\" stop-color=\"#10b981\" stop-opacity=\"0.35\"/>\n          <stop offset=\"55%\" stop-color=\"#e11d48\" stop-opacity=\"0.2\"/>\n          <stop offset=\"100%\" stop-color=\"#000000\" stop-opacity=\"0\"/>\n        </radialGradient>\n      </defs>\n      <rect width=\"400\" height=\"560\" fill=\"url(#shad_bg)\"/>\n      <rect width=\"400\" height=\"560\" fill=\"url(#shad_uv)\"/>\n      <!-- Eye Silhouette with Pinhead Calcified Red Dot -->\n      <path d=\"M75,230 Q200,145 325,230 Q200,315 75,230 Z\" fill=\"#090d16\" stroke=\"#38bdf8\" stroke-width=\"2\"/>\n      <circle cx=\"200\" cy=\"230\" r=\"42\" fill=\"#1e293b\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n      <circle cx=\"200\" cy=\"230\" r=\"18\" fill=\"#020617\"/>\n      <!-- The Pinhead Calcified Red Point in Lower Eyelid -->\n      <circle cx=\"215\" cy=\"272\" r=\"5.5\" fill=\"#ef4444\"/>\n      <circle cx=\"215\" cy=\"272\" r=\"11\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"1.2\" stroke-dasharray=\"3,2\"/>\n      <!-- Glowing Phosphorescent Green Luciferase Hands Motif -->\n      <path d=\"M120,390 Q200,340 280,390\" fill=\"none\" stroke=\"#4ade80\" stroke-width=\"3\" opacity=\"0.8\"/>\n      <text x=\"200\" y=\"370\" font-family=\"monospace\" font-size=\"11\" fill=\"#4ade80\" text-anchor=\"middle\">UV-A 365nm • LUCIFERASE GLOW</text>\n      <!-- Banner -->\n      <rect x=\"35\" y=\"485\" width=\"330\" height=\"40\" rx=\"8\" fill=\"#1f0913\" stroke=\"#f43f5e\" stroke-width=\"1.5\"/>\n      <text x=\"200\" y=\"510\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"900\" fill=\"#ffe4e6\" text-anchor=\"middle\">\n        ظِلالٌ لا تتركُ أثراً • SHADOWS THAT LEAVE NO TRACE\n      </text>\n    </svg>\n  "
  },
  {
    "id": "room_104_cipher",
    "titleAr": "شفرة الغرفة 104: بصمات في الظل",
    "titleEn": "",
    "subtitleAr": "جريمة الغرفة المغلقة ولغز السم الرقمي في ناطحة سحاب أوريون",
    "subtitleEn": "",
    "synopsisAr": "في ليلة عاصفة تهز أبراج العاصمة، يُعثر على الملياردير ومطور التشفير الجيني \"فاروق الأهدل\" جثة هامدة داخل جناحه البنتهاوس المحكم الإغلاق في الطابق 54. الأبواب موصدة بأقفال بيومترية من الداخل، وكاميرات المراقبة تظهر عدم دخول أي إنسان. لا كدمات واضحة، ولا أثر لرصاصة. يتولى المحقق المخضرم ساري كنعان القضية ليفكك مسرح الجريمة بأدق الأدلة الميكروسكوبية، كاشفاً لعبة دهاء سيكولوجية قاتلة بين وريثة طامعة، شريك برمجي غامض، وطبيب قلب يخفي سراً دفيناً.",
    "synopsisEn": "",
    "genreLabelAr": "غموض وجرائم جنائية",
    "genreLabelEn": "",
    "genreBadgeColor": "#ef4444",
    "chaptersCount": 4,
    "coverIllustrationSvg": "\n    <svg viewBox=\"0 0 400 560\" className=\"w-full h-full object-cover\" xmlns=\"http://www.w3.org/2000/svg\">\n      <defs>\n        <linearGradient id=\"cov1_bg\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n          <stop offset=\"0%\" stop-color=\"#090514\"/>\n          <stop offset=\"40%\" stop-color=\"#140c2e\"/>\n          <stop offset=\"100%\" stop-color=\"#2a0815\"/>\n        </linearGradient>\n        <radialGradient id=\"cov1_light\" cx=\"60%\" cy=\"40%\" r=\"55%\">\n          <stop offset=\"0%\" stop-color=\"#f43f5e\" stop-opacity=\"0.45\"/>\n          <stop offset=\"100%\" stop-color=\"#000000\" stop-opacity=\"0\"/>\n        </radialGradient>\n        <linearGradient id=\"cov1_glow\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n          <stop offset=\"0%\" stop-color=\"#38bdf8\" stop-opacity=\"0.8\"/>\n          <stop offset=\"100%\" stop-color=\"#818cf8\" stop-opacity=\"0.1\"/>\n        </linearGradient>\n      </defs>\n      <rect width=\"400\" height=\"560\" fill=\"url(#cov1_bg)\"/>\n      <rect width=\"400\" height=\"560\" fill=\"url(#cov1_light)\"/>\n      \n      <!-- Tower Skyline in Rain -->\n      <path d=\"M40,560 L40,320 L75,320 L75,560 Z\" fill=\"#0f172a\" opacity=\"0.8\"/>\n      <path d=\"M90,560 L90,260 L140,260 L140,560 Z\" fill=\"#1e1b4b\" opacity=\"0.85\"/>\n      <path d=\"M160,560 L160,180 L230,180 L230,560 Z\" fill=\"#0b0f19\" opacity=\"0.95\"/>\n      <!-- Orion Penthouse Window Glowing Crimson -->\n      <rect x=\"175\" y=\"210\" width=\"40\" height=\"50\" rx=\"3\" fill=\"#ef4444\" opacity=\"0.75\"/>\n      <line x1=\"195\" y1=\"210\" x2=\"195\" y2=\"260\" stroke=\"#000\" stroke-width=\"2\"/>\n      <line x1=\"175\" y1=\"235\" x2=\"215\" y2=\"235\" stroke=\"#000\" stroke-width=\"2\"/>\n      <path d=\"M250,560 L250,290 L290,290 L290,560 Z\" fill=\"#1e1b4b\" opacity=\"0.8\"/>\n      <path d=\"M310,560 L310,350 L360,350 L360,560 Z\" fill=\"#0f172a\" opacity=\"0.7\"/>\n\n      <!-- Rain lines -->\n      <g stroke=\"#94a3b8\" stroke-width=\"0.8\" opacity=\"0.25\">\n        <line x1=\"30\" y1=\"20\" x2=\"10\" y2=\"100\"/>\n        <line x1=\"90\" y1=\"40\" x2=\"70\" y2=\"130\"/>\n        <line x1=\"160\" y1=\"10\" x2=\"140\" y2=\"120\"/>\n        <line x1=\"240\" y1=\"50\" x2=\"220\" y2=\"150\"/>\n        <line x1=\"320\" y1=\"30\" x2=\"300\" y2=\"140\"/>\n        <line x1=\"380\" y1=\"60\" x2=\"360\" y2=\"170\"/>\n      </g>\n\n      <!-- Forensic Fingerprint Graphic Silhouette -->\n      <g transform=\"translate(145, 330) scale(1.1)\" stroke=\"#f43f5e\" stroke-width=\"2.2\" fill=\"none\" opacity=\"0.85\">\n        <path d=\"M50,15 Q50,45 50,75\"/>\n        <path d=\"M40,25 Q35,50 42,85\"/>\n        <path d=\"M60,25 Q65,50 58,85\"/>\n        <path d=\"M30,35 Q23,60 34,95\"/>\n        <path d=\"M70,35 Q77,60 66,95\"/>\n        <path d=\"M20,50 Q12,75 26,105\"/>\n        <path d=\"M80,50 Q88,75 74,105\"/>\n      </g>\n\n      <!-- Crime Scene Tape Overlay at Bottom -->\n      <g transform=\"rotate(-6, 200, 500)\">\n        <rect x=\"-30\" y=\"475\" width=\"460\" height=\"34\" fill=\"#fbbf24\" opacity=\"0.92\"/>\n        <text x=\"200\" y=\"498\" font-family=\"monospace\" font-size=\"13\" font-weight=\"900\" fill=\"#000\" text-anchor=\"middle\" letter-spacing=\"4\">\n          POLICE CRIME SCENE • خط التحقيق الجنائي 104 • DO NOT CROSS\n        </text>\n      </g>\n    </svg>\n  "
  }
];
