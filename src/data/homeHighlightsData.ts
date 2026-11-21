// Ultra-lightweight homepage preview highlights (keeps initial "/" JS bundle fast for Core Web Vitals)
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

export const HOME_HIGHLIGHTED_ARTICLES: HomeArticleHighlight[] = [
  {
    id: 'how-to-set-healthy-boundaries-in-relationships',
    title: 'كيف تضع حدوداً صحية في علاقاتك؟',
    titleEn: 'How to Set Healthy Boundaries in Your Relationships? Neurobiology, Bowen Differentiation, DBT DEAR MAN, and Cultural Assertiveness',
    summary:
      'دليل علمي وتطبيقي عبر 11 محوراً و10 مراجع لبناء الحدود الصحية وحمايتها بلطف وحزم دون ذنب زائف: التمايز الذاتي لبوين، البيولوجيا العصبية للألم الاجتماعي (fMRI) واستجابة التملق (Fawn)، الأنواع الستة للحدود، الخصوصية العربية، مهارة DEAR MAN والأسطوانة المشروخة، انفجار الانقراض، وثلاثة تمارين تطبيقية.',
    summaryEn:
      'Practical 11-axis guide to healthy boundaries: Bowen Self-Differentiation, dACC/insula neurobiology and the Fawn defense, 6 boundary types, Arab cultural assertiveness, DBT DEAR MAN, Extinction Bursts, and 3 daily exercises.',
    readTime: '17 دقيقة قراءة علمية وتطبيقية',
    readTimeEn: '17 min read',
    publishDate: '2026-11-21',
    icon: '🛡️',
    scientificFramework:
      'التمايز الذاتي (Murray Bowen)، مهارة DEAR MAN في العلاج السلوكي الجدلي (Linehan)، الألم الاجتماعي (Eisenberger & Lieberman)، التشابك الأسري (Minuchin)، واستجابة التملق (Walker)',
    scientificFrameworkEn:
      'Self-Differentiation (Bowen), DBT DEAR MAN (Linehan), Social Pain fMRI (Eisenberger & Lieberman), Enmeshment (Minuchin), and Fawn Response (Walker)',
  },
];
