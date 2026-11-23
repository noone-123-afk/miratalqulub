import { ARTICLES_CATALOG, Article } from '../data/articlesData';
import { ACADEMIC_PAPERS_CATALOG, AcademicPaper } from '../data/academicPapersData';
import { NOVELS_CATALOG, Novel, NovelGenre } from '../data/novelsData';
import { PERSONALITY_TESTS_CATALOG } from '../data/personalityTestsData';
import { ASSESSMENTS_CATALOG, AssessmentType } from '../data/psychologySuiteData';
import {
  INTELLIGENCE_BATTERIES_CATALOG,
  IntelligenceBatteryType,
} from '../data/intelligenceTestData';
import { ANALYSIS_TIERS_CATALOG } from '../data/tieredPsychologyBank';
import {
  ResolvedTestCard,
  RecommendationTestTargetId,
} from '../data/recommendationsMapping';
import {
  getPerformanceAndDiversityAdjustment,
  isWeakRecommendation,
  getPopularContentIdsByClicks,
  getSessionShownCount,
  getSessionVisitedPages,
} from './recommendationAnalytics';

export type TopicClusterId =
  | 'personality'
  | 'relationships'
  | 'emotional_intelligence'
  | 'communication'
  | 'self_discovery'
  | 'psychological_patterns'
  | 'cognitive_intelligence'
  | 'stories';

export interface TopicClusterMeta {
  id: TopicClusterId;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  hubRoute: string;
  keywords: string[];
  primaryTestIds: RecommendationTestTargetId[];
  educationalRoutes: string[];
}

export const TOPIC_CLUSTERS: Record<TopicClusterId, TopicClusterMeta> = {
  personality: {
    id: 'personality',
    labelAr: 'تحليل الشخصية والسمات السيكومترية',
    labelEn: 'Personality Traits & Psychometrics',
    descriptionAr: 'فهم البنية العميقة للشخصية وفق العوامل الخمسة الكبرى ونمط MBTI ومقاييس كاتل.',
    descriptionEn: 'Mapping core personality traits through Big Five, MBTI, and Cattell 16PF models.',
    hubRoute: '/personality-tests',
    keywords: [
      'الشخصية',
      'شخصية',
      'انطوائي',
      'انبساطي',
      'العوامل الخمسة',
      'ocean',
      'big five',
      'mbti',
      '16pf',
      'قيادة',
      'السمات',
      'تحليل الشخصية',
      'personality',
      'introvert',
      'extravert',
      'traits',
      'leadership',
      'temperament',
      'epq',
    ],
    primaryTestIds: ['mbti_16types', 'big_five_ocean', 'psych_sixteen_pf', 'psych_epq', 'tiered_assessment'],
    educationalRoutes: ['/how-results-are-calculated', '/methodology'],
  },
  relationships: {
    id: 'relationships',
    labelAr: 'العلاقات والتوافق العاطفي',
    labelEn: 'Relationships & Emotional Compatibility',
    descriptionAr: 'كيمياء الارتباط الصحي، التوافق القيمي والفكري، وصيانة الروابط من الصراعات.',
    descriptionEn: 'Healthy partnership chemistry, shared values compatibility, and relational resilience.',
    hubRoute: '/compatibility',
    keywords: [
      'علاقات',
      'العلاقات',
      'علاقة',
      'حب',
      'الحب',
      'زواج',
      'الزواج',
      'شريك',
      'شريك الحياة',
      'توافق',
      'التوافق',
      'غوتمان',
      'gottman',
      'خيانة',
      'الثقة',
      'طلاق',
      'ارتباط',
      'زوجي',
      'relationship',
      'compatibility',
      'marriage',
      'love',
      'partner',
      'betrayal',
    ],
    primaryTestIds: ['compatibility', 'psych_attachment_style', 'psych_cultural_eq'],
    educationalRoutes: ['/compatibility-algorithm', '/methodology'],
  },
  emotional_intelligence: {
    id: 'emotional_intelligence',
    labelAr: 'الذكاء العاطفي وتنظيم الانفعالات',
    labelEn: 'Emotional Intelligence & Regulation',
    descriptionAr: 'الوعي بالمشاعر، التنظيم الانفعالي وقت الأزمات، والتعاطف الاجتماعي المتزن.',
    descriptionEn: 'Emotional awareness, distress regulation, and balanced social empathy.',
    hubRoute: '/iq-tests',
    keywords: [
      'الذكاء العاطفي',
      'ذكاء عاطفي',
      'انفعال',
      'انفعالي',
      'المشاعر',
      'مشاعر',
      'تنظيم المشاعر',
      'غولمان',
      'goleman',
      'msceit',
      'bar-on',
      'تعاطف',
      'التعاطف',
      'مرونة',
      'emotional intelligence',
      'emotion regulation',
      'empathy',
      'eq',
    ],
    primaryTestIds: ['intel_emotional_intelligence_eq', 'psych_cultural_eq', 'compatibility'],
    educationalRoutes: ['/how-results-are-calculated', '/methodology'],
  },
  communication: {
    id: 'communication',
    labelAr: 'التواصل الفعال والحدود الصحية',
    labelEn: 'Effective Communication & Healthy Boundaries',
    descriptionAr: 'بناء الحدود النفسية الواضحة، الحوار البنّاء، وحل الخلافات دون استنزاف.',
    descriptionEn: 'Building firm compassionate boundaries, constructive dialogue, and conflict repair.',
    hubRoute: '/articles',
    keywords: [
      'حدود',
      'الحدود',
      'حدود صحية',
      'تواصل',
      'التواصل',
      'حوار',
      'النزاع',
      'خلاف',
      'الخلافات',
      'أنانية',
      'رفض',
      'حزم',
      'dear man',
      'التمايز',
      'التشابك',
      'boundaries',
      'communication',
      'conflict',
      'assertiveness',
    ],
    primaryTestIds: ['psych_cultural_eq', 'compatibility', 'psych_attachment_style'],
    educationalRoutes: ['/compatibility-algorithm', '/faq'],
  },
  self_discovery: {
    id: 'self_discovery',
    labelAr: 'اكتشاف الذات والنمو الشخصي',
    labelEn: 'Self-Discovery & Personal Growth',
    descriptionAr: 'ترميم الثقة بالنفس، العادات النفسية اليومية، وتطوير البصيرة الذاتية.',
    descriptionEn: 'Self-confidence architecture, daily mental habits, and deep self-awareness.',
    hubRoute: '/personality-tests',
    keywords: [
      'الثقة',
      'الثقة بالنفس',
      'نمو',
      'تطوير الذات',
      'الوعي الذاتي',
      'اكتشاف الذات',
      'عادات',
      'يوم',
      'يومي',
      'استقلالية',
      'تقدير الذات',
      'self-awareness',
      'confidence',
      'self-growth',
      'habits',
      'wellbeing',
      'self-discovery',
    ],
    primaryTestIds: ['tiered_assessment', 'big_five_ocean', 'mbti_16types', 'psych_mmpi'],
    educationalRoutes: ['/how-results-are-calculated', '/how-it-works'],
  },
  psychological_patterns: {
    id: 'psychological_patterns',
    labelAr: 'الأنماط النفسية والتعلق والقلق',
    labelEn: 'Psychological Patterns, Attachment & Anxiety',
    descriptionAr: 'فهم أنماط التعلق العاطفي، التفكير الزائد، وضغوط الطفولة والحساسية النفسية.',
    descriptionEn: 'Decoding attachment styles, overthinking loops, stress reactivity, and emotional sensitivity.',
    hubRoute: '/personality-tests',
    keywords: [
      'تعلق',
      'التعلق',
      'التفكير الزائد',
      'القلق',
      'قلق',
      'ضغط',
      'الضغوط',
      'إجهاد',
      'توتر',
      'حساسية',
      'الطفولة',
      'فحص',
      'إسقاطي',
      'مناعة',
      'صدمة',
      'overthinking',
      'anxiety',
      'attachment',
      'stress',
      'rumination',
      'childhood',
      'trauma',
      'sensitivity',
    ],
    primaryTestIds: ['psych_attachment_style', 'psych_mmpi', 'psych_rorschach', 'psych_tat', 'psych_epq'],
    educationalRoutes: ['/methodology', '/how-results-are-calculated'],
  },
  cognitive_intelligence: {
    id: 'cognitive_intelligence',
    labelAr: 'الذكاء المعرفي والقدرات الذهنية',
    labelEn: 'Cognitive Intelligence & Mental Aptitude',
    descriptionAr: 'الذكاء السائل ومصفوفات رافين، الذكاءات المتعددة، والتوافق الفكري العميق.',
    descriptionEn: 'Fluid intelligence, Raven matrices, Multiple Intelligences, and analytical reasoning.',
    hubRoute: '/iq-tests',
    keywords: [
      'الذكاء',
      'ذكاء',
      'iq',
      'raven',
      'رافين',
      'cogat',
      'غاردنر',
      'gardner',
      'الذكاءات المتعددة',
      'معرفي',
      'منطق',
      'فكري',
      'استدلال',
      'cognitive',
      'intelligence',
      'analytical',
      'reasoning',
      'aptitude',
      'executive',
    ],
    primaryTestIds: [
      'intel_general_iq_raven_chc',
      'intel_multiple_intelligences',
      'intel_cognitive_aptitude_cogat',
    ],
    educationalRoutes: ['/how-results-are-calculated', '/methodology'],
  },
  stories: {
    id: 'stories',
    labelAr: 'القصص العيادية والروايات الإنسانية',
    labelEn: 'Clinical Stories & Human Narratives',
    descriptionAr: 'حكايات نفسية وتحقيقات سلوكية تجسد علم النفس التطبيقي في مواقف حية.',
    descriptionEn: 'Psychological narratives and human dramas bringing clinical insight to life.',
    hubRoute: '/novels',
    keywords: [
      'قصة',
      'قصص',
      'رواية',
      'روايات',
      'عيادي',
      'سجلات',
      'دراما',
      'غموض',
      'جنائي',
      'خيال علمي',
      'story',
      'novel',
      'fiction',
      'clinical story',
    ],
    primaryTestIds: ['psych_tat', 'psych_rorschach', 'compatibility'],
    educationalRoutes: ['/novels', '/articles'],
  },
};

// ============================================================================
// Unified Indexed Catalog Item Interface (Articles, Papers, Tests, Novels, Docs)
// ============================================================================

export type CatalogContentType = 'article' | 'academic' | 'test' | 'novel' | 'educational';

export interface IndexedArticleCandidate {
  type: 'article' | 'academic';
  id: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
  readTimeAr: string;
  readTimeEn: string;
  route: string;
  icon: string;
  publishDate: string;
  clusters: TopicClusterId[];
  searchBlob: string;
}

export interface IndexedNovelCandidate {
  type: 'novel';
  id: string;
  genre: NovelGenre;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
  readTimeAr: string;
  readTimeEn: string;
  route: string;
  icon: string;
  clusters: TopicClusterId[];
  searchBlob: string;
}

export interface IndexedTestCandidate extends ResolvedTestCard {
  descriptionAr: string;
  descriptionEn: string;
  domainLabelAr: string;
  domainLabelEn: string;
  audienceAr: string;
  audienceEn: string;
  clusters: TopicClusterId[];
  searchBlob: string;
}

export interface EducationalResourceItem {
  id: string;
  kind: 'educational';
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
  route: string;
  icon: string;
  clusters: TopicClusterId[];
}

export interface ContextualLinkItem {
  titleAr: string;
  titleEn: string;
  anchorAr: string;
  anchorEn: string;
  descriptionAr: string;
  descriptionEn: string;
  route: string;
  kind: 'article' | 'test' | 'educational' | 'novel';
  testCard?: ResolvedTestCard;
  articleId?: string;
}

export interface SuggestedMixItem {
  kind: 'article' | 'test' | 'novel';
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
  metaAr: string;
  metaEn: string;
  ctaAr: string;
  ctaEn: string;
  route: string;
  icon: string;
  clusters: TopicClusterId[];
  testCard?: ResolvedTestCard;
  articleId?: string;
  novelGenre?: NovelGenre;
}

export interface JourneyStepItem {
  stepNumber: 1 | 2 | 3;
  stepRoleAr: string;
  stepRoleEn: string;
  kind: 'article' | 'test' | 'novel' | 'educational';
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  metaLineAr: string;
  metaLineEn: string;
  ctaAr: string;
  ctaEn: string;
  route: string;
  icon: string;
  testCard?: ResolvedTestCard;
  articleId?: string;
  novelGenre?: NovelGenre;
}

export interface LearningJourneyPath {
  headingAr: string;
  headingEn: string;
  subheadingAr: string;
  subheadingEn: string;
  contextTagAr: string;
  contextTagEn: string;
  steps: JourneyStepItem[];
}

// ============================================================================
// Dynamic Cluster Classification & Similarity Scoring
// ============================================================================

const ALL_CLUSTER_IDS: TopicClusterId[] = [
  'personality',
  'relationships',
  'emotional_intelligence',
  'communication',
  'self_discovery',
  'psychological_patterns',
  'cognitive_intelligence',
  'stories',
];

export function classifyTextIntoClusters(
  textBlob: string,
  baseCategoryHint?: string
): TopicClusterId[] {
  const lower = textBlob.toLowerCase();
  const scores: Record<TopicClusterId, number> = {
    personality: 0,
    relationships: 0,
    emotional_intelligence: 0,
    communication: 0,
    self_discovery: 0,
    psychological_patterns: 0,
    cognitive_intelligence: 0,
    stories: 0,
  };

  if (baseCategoryHint === 'relationships') scores.relationships += 3;
  if (baseCategoryHint === 'emotional_iq') scores.emotional_intelligence += 3;
  if (baseCategoryHint === 'self_growth') scores.self_discovery += 3;
  if (baseCategoryHint === 'applied_psychology') scores.personality += 2;

  for (const cid of ALL_CLUSTER_IDS) {
    for (const kw of TOPIC_CLUSTERS[cid].keywords) {
      if (lower.includes(kw.toLowerCase())) {
        scores[cid] += kw.length > 8 ? 3 : 2;
      }
    }
  }

  const ranked = ALL_CLUSTER_IDS
    .filter((cid) => scores[cid] > 0)
    .sort((a, b) => scores[b] - scores[a]);

  if (ranked.length === 0) {
    return ['self_discovery', 'personality'];
  }
  return ranked.slice(0, 3);
}

function tokenizeKeywords(text: string): Set<string> {
  const tokens = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3);
  return new Set(tokens);
}

function scoreClusterAndKeywordOverlap(
  sourceClusters: TopicClusterId[],
  sourceTokens: Set<string>,
  targetClusters: TopicClusterId[],
  targetBlob: string,
  targetId?: string,
  targetRoute?: string
): number {
  let score = 0;
  sourceClusters.forEach((sc, idx) => {
    const tIdx = targetClusters.indexOf(sc);
    if (tIdx !== -1) {
      score += (3 - idx) * 6 + (3 - Math.min(tIdx, 2)) * 2;
    }
  });

  const targetLower = targetBlob.toLowerCase();
  let kwMatches = 0;
  sourceTokens.forEach((tok) => {
    if (kwMatches < 10 && targetLower.includes(tok)) {
      score += 2;
      kwMatches++;
    }
  });

  // Historical CTR boost + session anti-loop / diversity adjustment
  if (targetId) {
    score += getPerformanceAndDiversityAdjustment(targetId, targetRoute);
  }
  return score;
}

// ============================================================================
// Educational & Platform Guides Catalog
// ============================================================================

export const EDUCATIONAL_RESOURCES_CATALOG: EducationalResourceItem[] = [
  {
    id: 'how-results-are-calculated',
    kind: 'educational',
    titleAr: 'كيف يتم حساب نتائج الاختبارات السيكومترية؟',
    titleEn: 'How Psychometric Test Results Are Calculated',
    descriptionAr: 'دليل شفاف يشرح المعادلات الرياضية وحساب البنود الطردية والعكسية دون تخمين عشوائي.',
    descriptionEn: 'Transparent mathematical guide explaining Likert scoring, reverse items, and percentiles.',
    categoryLabelAr: 'الشفافية السيكومترية',
    categoryLabelEn: 'Psychometric Transparency',
    route: '/how-results-are-calculated',
    icon: '📐',
    clusters: ['personality', 'self_discovery', 'emotional_intelligence', 'cognitive_intelligence'],
  },
  {
    id: 'compatibility-algorithm',
    kind: 'educational',
    titleAr: 'خوارزمية التوافق الفكري والعاطفي (كيف يقيس الموقع الانسجام؟)',
    titleEn: 'The Compatibility Algorithm Explained',
    descriptionAr: 'كيف تحسب المنصة مؤشرات التناغم في القيم والتواصل والتكامل النفسي بين الشريكين.',
    descriptionEn: 'Explore how shared values, emotional reciprocity, and communication patterns are weighted.',
    categoryLabelAr: 'علم التوافق العلائقي',
    categoryLabelEn: 'Relational Algorithm',
    route: '/compatibility-algorithm',
    icon: '💞',
    clusters: ['relationships', 'communication'],
  },
  {
    id: 'methodology',
    kind: 'educational',
    titleAr: 'المنهجية العلمية والمراجع الأكاديمية المعتمدة (APA)',
    titleEn: 'Scientific Methodology & Academic References',
    descriptionAr: 'المرجعيات العلمية المعتمدة من نظريات غوتمان وبولبي وبيك وجاردنر وكوستا وماكري.',
    descriptionEn: 'Explore our evidence-based psychological foundations from Gottman, Bowlby, and Costa & McCrae.',
    categoryLabelAr: 'المصادر والمنهجية',
    categoryLabelEn: 'Sources & Methodology',
    route: '/methodology',
    icon: '🎓',
    clusters: ['personality', 'relationships', 'emotional_intelligence', 'psychological_patterns', 'cognitive_intelligence'],
  },
  {
    id: 'faq',
    kind: 'educational',
    titleAr: 'الأسئلة الشائعة حول الاختبارات والخصوصية والنتائج',
    titleEn: 'Frequently Asked Questions on Tests & Privacy',
    descriptionAr: 'إجابات وافية حول دقة المقاييس، حفظ السجل الشخصي، وحماية البيانات.',
    descriptionEn: 'Clear answers about assessment accuracy, saved results, and privacy-by-design.',
    categoryLabelAr: 'دليل الاستخدام والخصوصية',
    categoryLabelEn: 'Platform FAQ & Privacy',
    route: '/faq',
    icon: '❓',
    clusters: ['self_discovery', 'personality', 'relationships'],
  },
  {
    id: 'tools',
    kind: 'educational',
    titleAr: 'الأدوات التفاعلية وتجارب الحوار التطبيقي (The Blind Date)',
    titleEn: 'Interactive Platform Tools & Couple Experiments',
    descriptionAr: 'أدوات عملية للحوار بين الشريكين ومقارنة الملفات النفسية واكتشاف ديناميكيات التواصل.',
    descriptionEn: 'Practical dialogue experiences, dual couple invites, and interactive comparison tools.',
    categoryLabelAr: 'أدوات تفاعلية',
    categoryLabelEn: 'Interactive Tools',
    route: '/tools',
    icon: '🛠️',
    clusters: ['relationships', 'communication', 'self_discovery'],
  },
];

// ============================================================================
// Lazy Memoized Catalog Builders (Auto-Discovers Future Additions)
// ============================================================================

let cachedArticles: IndexedArticleCandidate[] | null = null;
let cachedTests: IndexedTestCandidate[] | null = null;
let cachedNovels: IndexedNovelCandidate[] | null = null;

export function getAllIndexedArticles(): IndexedArticleCandidate[] {
  if (cachedArticles) return cachedArticles;

  const narrativeItems: IndexedArticleCandidate[] = ARTICLES_CATALOG.map((art: Article) => {
    const blob = [
      art.id,
      art.title,
      art.titleEn,
      art.summary,
      art.summaryEn,
      art.categoryLabelAr,
      art.scientificFramework,
      art.keyTakeaways.join(' '),
    ].join(' ');
    return {
      type: 'article',
      id: art.id,
      titleAr: art.title,
      titleEn: art.titleEn,
      summaryAr: art.summary,
      summaryEn: art.summaryEn,
      categoryLabelAr: art.categoryLabelAr,
      categoryLabelEn: art.categoryLabelEn,
      readTimeAr: art.readTime,
      readTimeEn: art.readTimeEn,
      route: `/articles/${encodeURIComponent(art.id)}`,
      icon: art.icon || '📖',
      publishDate: art.publishDate || '2026-01-01',
      clusters: classifyTextIntoClusters(blob, art.category),
      searchBlob: blob,
    };
  });

  const seenIds = new Set(narrativeItems.map((i) => i.id));
  const academicItems: IndexedArticleCandidate[] = ACADEMIC_PAPERS_CATALOG.filter(
    (p) => !seenIds.has(p.id)
  ).map((paper: AcademicPaper) => {
    const blob = [
      paper.id,
      paper.titleAr,
      paper.titleEn,
      paper.abstractAr,
      paper.abstractEn,
      paper.categoryLabelAr,
      paper.keywordsAr.join(' '),
      paper.keywordsEn.join(' '),
    ].join(' ');
    return {
      type: 'academic',
      id: paper.id,
      titleAr: paper.titleAr,
      titleEn: paper.titleEn,
      summaryAr: paper.abstractAr,
      summaryEn: paper.abstractEn,
      categoryLabelAr: paper.categoryLabelAr,
      categoryLabelEn: paper.categoryLabelEn,
      readTimeAr: paper.readTimeAr,
      readTimeEn: paper.readTimeEn,
      route: `/articles/${encodeURIComponent(paper.id)}`,
      icon: paper.icon || '🎓',
      publishDate: paper.publishDate || '2026-01-01',
      clusters: classifyTextIntoClusters(blob, paper.category),
      searchBlob: blob,
    };
  });

  cachedArticles = [...narrativeItems, ...academicItems];
  return cachedArticles;
}

export function getAllIndexedTests(): IndexedTestCandidate[] {
  if (cachedTests) return cachedTests;

  const list: IndexedTestCandidate[] = [];

  // 1. Partner Compatibility Detector
  list.push({
    kind: 'test',
    id: 'compatibility',
    titleAr: 'اختبار كاشف شريك الحياة والتوافق العاطفي',
    titleEn: 'Partner Compatibility Detector Assessment',
    categoryLabelAr: 'التوافق الفكري والعاطفي',
    categoryLabelEn: 'Relational Compatibility',
    reasonAr: 'تحليل شامل للتناغم القيمي والتواصل العاطفي وتوقعات الحياة المشتركة.',
    reasonEn: 'Holistic evaluation of shared values, emotional reciprocity, and relational harmony.',
    descriptionAr: 'اكتشف ملامح الشريك الأنسب لطبيعتك النفسية وأسلوبك العلائقي من خلال مؤشرات توافق دقيقة.',
    descriptionEn: 'Discover the partner profile matching your emotional depth, values, and communication style.',
    domainLabelAr: 'التوافق العاطفي والزواجي',
    domainLabelEn: 'Relational Compatibility',
    audienceAr: 'الباحثون عن شريك متناغم والمقبلون على الارتباط',
    audienceEn: 'Individuals & couples exploring compatibility',
    route: '/compatibility',
    launchKind: 'compatibility',
    icon: '💞',
    clusters: ['relationships', 'communication', 'emotional_intelligence'],
    searchBlob: 'كاشف شريك الحياة التوافق العاطفي العلاقات الزواج الشراكة التواصل compatibility partner relationship marriage',
  });

  // 2. MBTI, Big Five & Existential Fatigue on /personality-tests
  PERSONALITY_TESTS_CATALOG.forEach((t) => {
    if (
      t.id !== 'mbti_16types' &&
      t.id !== 'big_five_ocean' &&
      t.id !== 'existential_fatigue'
    )
      return;
    const isMbti = t.id === 'mbti_16types';
    const isFatigue = t.id === 'existential_fatigue';
    const blob = `${t.titleAr} ${t.titleEn} ${t.subtitleAr} ${t.shortDescriptionAr}`;
    list.push({
      kind: 'test',
      id: t.id as RecommendationTestTargetId,
      titleAr: t.titleAr,
      titleEn: t.titleEn,
      categoryLabelAr: t.subtitleAr,
      categoryLabelEn: t.subtitleEn,
      reasonAr: isFatigue
        ? 'يميز بدقة بين التعب الجسدي، التعب العقلي، والتعب الوجودي وفق معايير المقال الخامس مع خطة استعادة عملية.'
        : isMbti
        ? 'يصنف تفضيلاتك الإدراكية والتفاعلية ضمن 16 نمطاً مع خريطة نقاط القوة والتواصل.'
        : 'يقيس درجاتك الدقيقة عبر العوامل الخمسة الكبرى المعتمدة علمياً (OCEAN).',
      reasonEn: t.shortDescriptionEn,
      descriptionAr: t.shortDescriptionAr,
      descriptionEn: t.shortDescriptionEn,
      domainLabelAr: isFatigue
        ? 'تقييم التعب الوجودي والطاقة (المقال 5)'
        : isMbti
        ? 'الأنماط الشخصية (MBTI)'
        : 'العوامل الخمسة الكبرى (OCEAN)',
      domainLabelEn: isFatigue
        ? 'Existential Fatigue Evaluation'
        : isMbti
        ? 'Personality Typology'
        : 'Five-Factor Model',
      audienceAr: isFatigue
        ? 'من يشعرون بالتعب رغم الراحة ويرغبون في تحديد مصدر الاستنزاف بدقة'
        : 'الراغبون في فهم سماتهم الأساسية واتخاذ قراراتهم الشخصية',
      audienceEn: isFatigue
        ? 'Users exploring physical, mental, or existential fatigue drivers'
        : 'Self-explorers & personality learners',
      route: '/personality-tests',
      launchKind: 'personality_inline',
      launchParam: t.id,
      icon: isFatigue ? '🧭' : isMbti ? '🧬' : '🌊',
      clusters: isFatigue
        ? ['psychological_patterns', 'self_discovery', 'emotional_intelligence']
        : isMbti
        ? ['personality', 'communication', 'self_discovery']
        : ['personality', 'self_discovery', 'psychological_patterns'],
      searchBlob: blob,
    });
  });

  // 3. Tiered Psychometric Lab
  const advTier = ANALYSIS_TIERS_CATALOG[1] || ANALYSIS_TIERS_CATALOG[0];
  list.push({
    kind: 'test',
    id: 'tiered_assessment',
    titleAr: `مختبر التحليل النفسي المتدرج (${advTier.titleAr})`,
    titleEn: `Tiered Psychometric Self-Discovery Lab (${advTier.titleEn})`,
    categoryLabelAr: 'تقييم سيكومتري متعدد المحاور',
    categoryLabelEn: 'Multi-Axis Self-Discovery',
    reasonAr: 'تقييم متكامل للوعي الذاتي والنضج العاطفي وأنماط التعلق وإدارة الضغوط.',
    reasonEn: advTier.descriptionEn,
    descriptionAr: advTier.descriptionAr,
    descriptionEn: advTier.descriptionEn,
    domainLabelAr: 'اكتشاف الذات متعدد المستويات',
    domainLabelEn: 'Multi-Level Self-Discovery',
    audienceAr: 'الباحثون عن خريطة نفسية متكاملة مع تقارير تطور زمني',
    audienceEn: 'Users seeking structured multi-axis insight',
    route: '/personality-tests',
    launchKind: 'tiered',
    launchParam: advTier.id,
    icon: '📊',
    clusters: ['self_discovery', 'personality', 'emotional_intelligence'],
    searchBlob: `التحليل النفسي المتدرج اكتشاف الذات النضج العاطفي الثقة بالنفس ${advTier.descriptionAr}`,
  });

  // 4. Specialized Psychology Suite Scales
  const testClusterOverrides: Partial<Record<AssessmentType, TopicClusterId[]>> = {
    existential_fatigue: ['psychological_patterns', 'self_discovery', 'emotional_intelligence'],
    attachment_style: ['psychological_patterns', 'relationships', 'communication'],
    cultural_eq: ['emotional_intelligence', 'communication', 'relationships'],
    big_five: ['personality', 'self_discovery'],
    sixteen_pf: ['personality', 'cognitive_intelligence'],
    epq: ['personality', 'psychological_patterns'],
    mmpi: ['psychological_patterns', 'self_discovery'],
    rorschach: ['psychological_patterns', 'cognitive_intelligence'],
    tat: ['psychological_patterns', 'stories', 'relationships'],
  };

  ASSESSMENTS_CATALOG.forEach((a) => {
    const targetId = `psych_${a.id}` as RecommendationTestTargetId;
    const clusters =
      testClusterOverrides[a.id] ||
      classifyTextIntoClusters(`${a.titleAr} ${a.shortDesc} ${a.scientificReference}`);
    list.push({
      kind: 'test',
      id: targetId,
      titleAr: a.titleAr,
      titleEn: a.titleEn,
      categoryLabelAr: a.categoryTitleAr,
      categoryLabelEn: 'Specialized Psychometric Scale',
      reasonAr: a.shortDesc,
      reasonEn: a.scientificReference,
      descriptionAr: a.shortDesc,
      descriptionEn: a.scientificReference,
      domainLabelAr: a.categoryTitleAr,
      domainLabelEn: 'Specialized Psychometrics',
      audienceAr: 'المهتمون بالتعمق السلوكي وفهم الأنماط النفسية الخفية',
      audienceEn: 'Learners exploring deep behavioral & clinical frameworks',
      route: '/personality-tests',
      launchKind: 'psych_modal',
      launchParam: a.id,
      icon:
        a.id === 'existential_fatigue'
          ? '🧭'
          : a.id === 'attachment_style'
          ? '🔗'
          : a.id === 'cultural_eq'
          ? '💬'
          : a.id === 'sixteen_pf'
          ? '⚖️'
          : a.id === 'epq'
          ? '⚡'
          : '🧠',
      clusters,
      searchBlob: `${a.titleAr} ${a.titleEn} ${a.shortDesc} ${a.scientificReference} ${a.categoryTitleAr}`,
    });
  });

  // 5. Intelligence & EQ Batteries (4 Batteries)
  const batteryClusterOverrides: Record<IntelligenceBatteryType, TopicClusterId[]> = {
    multiple_intelligences: ['cognitive_intelligence', 'self_discovery'],
    general_iq_raven_chc: ['cognitive_intelligence', 'personality'],
    emotional_intelligence_eq: ['emotional_intelligence', 'communication', 'relationships'],
    cognitive_aptitude_cogat: ['cognitive_intelligence', 'self_discovery'],
  };

  INTELLIGENCE_BATTERIES_CATALOG.forEach((b) => {
    const targetId = `intel_${b.id}` as RecommendationTestTargetId;
    list.push({
      kind: 'test',
      id: targetId,
      titleAr: b.titleAr,
      titleEn: b.titleEn,
      categoryLabelAr: 'مختبر الذكاء والقدرات المعرفية',
      categoryLabelEn: 'Intelligence & Cognitive Lab',
      reasonAr: b.descriptionAr,
      reasonEn: b.scientificScaleName,
      descriptionAr: b.descriptionAr,
      descriptionEn: b.scientificScaleName,
      domainLabelAr: b.id === 'emotional_intelligence_eq' ? 'الذكاء العاطفي والانفعالي' : 'القدرات المعرفية والذكاء',
      domainLabelEn: b.id === 'emotional_intelligence_eq' ? 'Emotional Intelligence' : 'Cognitive Intelligence',
      audienceAr: 'الباحثون عن قياس موضوعي للقدرات الذهنية والعاطفية',
      audienceEn: 'Users benchmarking cognitive and emotional abilities',
      route: '/iq-tests',
      launchKind: 'intelligence_modal',
      launchParam: b.id,
      icon: b.icon || '💡',
      clusters: batteryClusterOverrides[b.id] || ['cognitive_intelligence'],
      searchBlob: `${b.titleAr} ${b.titleEn} ${b.descriptionAr} ${b.scientificScaleName}`,
    });
  });

  cachedTests = list;
  return cachedTests;
}

export function getAllIndexedNovels(): IndexedNovelCandidate[] {
  if (cachedNovels) return cachedNovels;

  cachedNovels = NOVELS_CATALOG.map((nv: Novel) => {
    const blob = [
      nv.id,
      nv.titleAr,
      nv.titleEn || '',
      nv.genre,
      nv.genreLabelAr,
      nv.synopsisAr,
      nv.forensicThemeAr,
      nv.psychologicalFocusAr,
    ].join(' ');

    const clusters: TopicClusterId[] = ['stories'];
    if (nv.genre === 'clinical_stories') {
      clusters.push('psychological_patterns', 'emotional_intelligence', 'relationships');
    } else if (nv.genre === 'romance') {
      clusters.push('relationships', 'communication', 'self_discovery');
    } else if (nv.genre === 'crime_mystery' || nv.genre === 'sci_fi_future') {
      clusters.push('cognitive_intelligence', 'personality');
    } else {
      clusters.push('personality', 'self_discovery');
    }

    return {
      type: 'novel',
      id: nv.id,
      genre: nv.genre,
      titleAr: nv.titleAr,
      titleEn: nv.titleEn || nv.titleAr,
      summaryAr: nv.synopsisAr,
      summaryEn: nv.synopsisEn || nv.synopsisAr,
      categoryLabelAr: nv.genreLabelAr,
      categoryLabelEn: nv.genreLabelEn || nv.genre,
      readTimeAr: nv.estimatedReadingTime,
      readTimeEn: `${nv.totalChapters} Chapters`,
      route: `/novels/${encodeURIComponent(nv.id)}`,
      icon:
        nv.genre === 'clinical_stories'
          ? '🧠'
          : nv.genre === 'romance'
          ? '🌸'
          : nv.genre === 'crime_mystery'
          ? '🕵️'
          : nv.genre === 'sci_fi_future'
          ? '🚀'
          : nv.genre === 'sci_fantasy'
          ? '✨'
          : '⚡',
      clusters,
      searchBlob: blob,
    };
  });

  return cachedNovels;
}

// ============================================================================
// Normalize Any Source Object into Scoring Context
// ============================================================================

export type ArticleOrPaperInput =
  | Article
  | AcademicPaper
  | {
      id: string;
      title?: string;
      titleAr?: string;
      titleEn?: string;
      summary?: string;
      abstractAr?: string;
      category?: string;
      categoryLabelAr?: string;
      keywordsAr?: string[];
      scientificFramework?: string;
    };

function extractArticleContext(source: ArticleOrPaperInput): {
  id: string;
  route: string;
  titleText: string;
  blob: string;
  clusters: TopicClusterId[];
  tokens: Set<string>;
} {
  const rec = source as Record<string, unknown>;
  const id = String(rec.id || '');
  const titleText = String(rec.titleAr || rec.title || '');
  const titleEn = String(rec.titleEn || '');
  const summary = String(rec.abstractAr || rec.summary || '');
  const fw = String(rec.scientificFramework || '');
  const kws = Array.isArray(rec.keywordsAr) ? rec.keywordsAr.join(' ') : '';
  const cat = String(rec.category || '');
  const blob = `${titleText} ${titleEn} ${summary} ${fw} ${kws} ${String(rec.categoryLabelAr || '')}`;

  return {
    id,
    route: `/articles/${encodeURIComponent(id)}`,
    titleText,
    blob,
    clusters: classifyTextIntoClusters(blob, cat),
    tokens: tokenizeKeywords(blob),
  };
}

export function normalizeTestTargetId(rawId: string): RecommendationTestTargetId {
  const map: Record<string, RecommendationTestTargetId> = {
    mbti_16: 'mbti_16types',
    mbti_16types: 'mbti_16types',
    existential_fatigue: 'existential_fatigue',
    psych_existential_fatigue: 'psych_existential_fatigue',
    big_five: 'psych_big_five',
    big_five_ocean: 'big_five_ocean',
    psych_big_five: 'psych_big_five',
    mmpi: 'psych_mmpi',
    psych_mmpi: 'psych_mmpi',
    epq: 'psych_epq',
    psych_epq: 'psych_epq',
    sixteen_pf: 'psych_sixteen_pf',
    psych_sixteen_pf: 'psych_sixteen_pf',
    cattell_16pf: 'psych_sixteen_pf',
    rorschach: 'psych_rorschach',
    psych_rorschach: 'psych_rorschach',
    tat: 'psych_tat',
    psych_tat: 'psych_tat',
    attachment_style: 'psych_attachment_style',
    attachment_ecrr: 'psych_attachment_style',
    psych_attachment_style: 'psych_attachment_style',
    cultural_eq: 'psych_cultural_eq',
    psych_cultural_eq: 'psych_cultural_eq',
    multiple_intelligences: 'intel_multiple_intelligences',
    intel_multiple_intelligences: 'intel_multiple_intelligences',
    general_iq_raven_chc: 'intel_general_iq_raven_chc',
    intel_general_iq_raven_chc: 'intel_general_iq_raven_chc',
    emotional_intelligence_eq: 'intel_emotional_intelligence_eq',
    intel_emotional_intelligence_eq: 'intel_emotional_intelligence_eq',
    cognitive_aptitude_cogat: 'intel_cognitive_aptitude_cogat',
    intel_cognitive_aptitude_cogat: 'intel_cognitive_aptitude_cogat',
    compatibility: 'compatibility',
    tiered_assessment: 'tiered_assessment',
  };
  return map[rawId] || 'compatibility';
}

// ============================================================================
// REQUIREMENT 1: "اقرأ أيضاً" (3–6 Relevant Articles at the end of every article)
// ============================================================================

export function getRelatedArticlesForContent(
  source: ArticleOrPaperInput | { clusters: TopicClusterId[]; keywordsText?: string; excludeIds?: string[] },
  count = 4
): IndexedArticleCandidate[] {
  const safeCount = Math.min(6, Math.max(3, count));
  const all = getAllIndexedArticles();

  let excludeIds = new Set<string>();
  let sourceClusters: TopicClusterId[] = ['personality'];
  let sourceTokens = new Set<string>();

  if ('clusters' in source) {
    sourceClusters = source.clusters;
    sourceTokens = tokenizeKeywords(source.keywordsText || '');
    (source.excludeIds || []).forEach((id) => excludeIds.add(id));
  } else {
    const ctx = extractArticleContext(source);
    excludeIds.add(ctx.id);
    // Also exclude mirror academic/narrative sibling of exact same base slug if duplicate title
    sourceClusters = ctx.clusters;
    sourceTokens = ctx.tokens;
  }

  const nonCurrent = all.filter((item) => !excludeIds.has(item.id));
  const prunedPool = nonCurrent.filter((item) => !isWeakRecommendation(item.id));
  const activePool = prunedPool.length >= safeCount ? prunedPool : nonCurrent;

  const scored = activePool
    .map((item) => ({
      item,
      score: scoreClusterAndKeywordOverlap(
        sourceClusters,
        sourceTokens,
        item.clusters,
        item.searchBlob,
        item.id,
        item.route
      ),
    }))
    .sort((a, b) => b.score - a.score);

  const picked: IndexedArticleCandidate[] = [];
  const seenTitles = new Set<string>();
  const clusterSpread = new Map<TopicClusterId, number>();

  for (const entry of scored) {
    const titleKey = entry.item.titleAr.trim().slice(0, 32);
    if (seenTitles.has(titleKey)) continue;
    // Slight diversity guard so we don't repeat identical cluster angles endlessly when alternatives score closely
    const leadCluster = entry.item.clusters[0] || 'personality';
    const clusterCount = clusterSpread.get(leadCluster) || 0;
    if (clusterCount >= 3 && scored.length > safeCount * 2) continue;

    seenTitles.add(titleKey);
    clusterSpread.set(leadCluster, clusterCount + 1);
    picked.push(entry.item);
    if (picked.length >= safeCount) break;
  }

  // Fallback fill if diversity skip left fewer than safeCount
  if (picked.length < safeCount) {
    for (const entry of scored) {
      const titleKey = entry.item.titleAr.trim().slice(0, 32);
      if (seenTitles.has(titleKey)) continue;
      seenTitles.add(titleKey);
      picked.push(entry.item);
      if (picked.length >= safeCount) break;
    }
  }
  return picked;
}

// ============================================================================
// REQUIREMENT 2: "اختبارات قد تهمك" (2–4 Relevant Tests at the end of every article)
// ============================================================================

export function getRelatedTestsForArticle(
  source: ArticleOrPaperInput,
  count = 3
): IndexedTestCandidate[] {
  const safeCount = Math.min(4, Math.max(2, count));
  const ctx = extractArticleContext(source);
  const allTests = getAllIndexedTests();

  const nonWeak = allTests.filter((t) => !isWeakRecommendation(t.id));
  const testPool = nonWeak.length >= safeCount ? nonWeak : allTests;

  const scored = testPool
    .map((test) => {
      let score = scoreClusterAndKeywordOverlap(
        ctx.clusters,
        ctx.tokens,
        test.clusters,
        test.searchBlob,
        test.id,
        test.route
      );

      // Extra topic specificity boosts
      const blobLower = ctx.blob.toLowerCase();
      if (
        (blobLower.includes('توافق') || blobLower.includes('شريك') || blobLower.includes('زواج') || blobLower.includes('علاق')) &&
        test.id === 'compatibility'
      ) {
        score += 12;
      }
      if (
        (blobLower.includes('تعلق') || blobLower.includes('attachment')) &&
        test.id === 'psych_attachment_style'
      ) {
        score += 14;
      }
      if (
        (blobLower.includes('ذكاء عاطفي') || blobLower.includes('مشاعر') || blobLower.includes('emotional intelligence')) &&
        (test.id === 'intel_emotional_intelligence_eq' || test.id === 'psych_cultural_eq')
      ) {
        score += 12;
      }
      if (
        (blobLower.includes('تواصل') || blobLower.includes('حدود') || blobLower.includes('خلاف')) &&
        (test.id === 'psych_cultural_eq' || test.id === 'compatibility' || test.id === 'psych_attachment_style')
      ) {
        score += 9;
      }
      if (
        (blobLower.includes('العوامل الخمسة') || blobLower.includes('big five') || blobLower.includes('انطوائي') || blobLower.includes('شخصي')) &&
        (test.id === 'big_five_ocean' || test.id === 'mbti_16types' || test.id === 'psych_sixteen_pf')
      ) {
        score += 10;
      }
      if (
        (blobLower.includes('تعب') || blobLower.includes('الوجودي') || blobLower.includes('ارهاق') || blobLower.includes('إرهاق') || blobLower.includes('fatigue')) &&
        (test.id === 'existential_fatigue' || test.id === 'psych_existential_fatigue')
      ) {
        score += 14;
      }
      if (
        (blobLower.includes('تفكير زائد') || blobLower.includes('قلق') || blobLower.includes('ضغط')) &&
        (test.id === 'psych_mmpi' || test.id === 'psych_epq' || test.id === 'tiered_assessment')
      ) {
        score += 9;
      }
      return { test, score };
    })
    .sort((a, b) => b.score - a.score);

  // Deduplicate semantically overlapping variants (big_five_ocean vs psych_big_five, existential_fatigue vs psych_existential_fatigue)
  const picked: IndexedTestCandidate[] = [];
  const seenFamily = new Set<string>();
  for (const { test } of scored) {
    const family =
      test.id === 'psych_big_five'
        ? 'big_five_ocean'
        : test.id === 'psych_existential_fatigue'
        ? 'existential_fatigue'
        : test.id;
    if (seenFamily.has(family)) continue;
    seenFamily.add(family);
    picked.push(test);
    if (picked.length >= safeCount) break;
  }
  return picked;
}

// ============================================================================
// REQUIREMENT 3: "اختبار مشابه قد يعجبك" (After Test Completion, BEFORE Final Result)
// ============================================================================

export function getPreResultSimilarTest(rawTestId: string): IndexedTestCandidate {
  const currentId = normalizeTestTargetId(rawIdOrSelf(rawTestId));
  const all = getAllIndexedTests();
  const current = all.find((t) => t.id === currentId);
  const visitedPages = getSessionVisitedPages();

  const directPairMap: Partial<Record<RecommendationTestTargetId, RecommendationTestTargetId>> = {
    compatibility: 'psych_attachment_style',
    mbti_16types: 'big_five_ocean',
    big_five_ocean: 'mbti_16types',
    existential_fatigue: 'big_five_ocean',
    psych_existential_fatigue: 'psych_epq',
    psych_big_five: 'psych_sixteen_pf',
    psych_sixteen_pf: 'big_five_ocean',
    psych_epq: 'psych_mmpi',
    psych_mmpi: 'tiered_assessment',
    psych_attachment_style: 'compatibility',
    psych_cultural_eq: 'intel_emotional_intelligence_eq',
    psych_rorschach: 'psych_tat',
    psych_tat: 'psych_attachment_style',
    tiered_assessment: 'psych_attachment_style',
    intel_multiple_intelligences: 'intel_cognitive_aptitude_cogat',
    intel_general_iq_raven_chc: 'intel_cognitive_aptitude_cogat',
    intel_emotional_intelligence_eq: 'psych_cultural_eq',
    intel_cognitive_aptitude_cogat: 'intel_general_iq_raven_chc',
  };

  const targetId = directPairMap[currentId];
  const exact = all.find((t) => t.id === targetId && t.id !== currentId);
  if (
    exact &&
    !isWeakRecommendation(exact.id) &&
    getSessionShownCount(exact.id) === 0 &&
    !visitedPages.has(exact.route)
  ) {
    return exact;
  }

  // Rotate to highest-CTR, non-weak, non-repeated related test when direct pair was weak or already shown
  const rankedAlternatives = getTryAnotherTests(rawTestId, 4);
  if (rankedAlternatives.length > 0) {
    return rankedAlternatives[0];
  }

  if (exact && !isWeakRecommendation(exact.id)) return exact;

  const sourceClusters = current?.clusters || ['personality', 'self_discovery'];
  const fallback = all.find(
    (t) =>
      t.id !== currentId &&
      !isWeakRecommendation(t.id) &&
      t.clusters.some((c) => sourceClusters.includes(c))
  );
  return fallback || exact || all[0];
}

function rawIdOrSelf(id: string): string {
  return (id || 'compatibility').trim();
}

// ============================================================================
// REQUIREMENT 4: "جرّب اختباراً آخر" (3–6 Related Tests Below Every Result Page)
// ============================================================================

export function getTryAnotherTests(
  rawTestId: string,
  count = 4
): IndexedTestCandidate[] {
  const safeCount = Math.min(6, Math.max(3, count));
  const currentId = normalizeTestTargetId(rawTestId);
  const all = getAllIndexedTests();
  const current = all.find((t) => t.id === currentId);
  const currentClusters = current?.clusters || ['personality', 'self_discovery'];
  const currentTokens = tokenizeKeywords(current?.searchBlob || '');

  const excludedFamily =
    currentId === 'big_five_ocean' || currentId === 'psych_big_five'
      ? new Set(['big_five_ocean', 'psych_big_five'])
      : currentId === 'existential_fatigue' || currentId === 'psych_existential_fatigue'
      ? new Set(['existential_fatigue', 'psych_existential_fatigue'])
      : new Set([currentId]);

  const nonCurrentTests = all.filter((t) => !excludedFamily.has(t.id));
  const prunedTests = nonCurrentTests.filter((t) => !isWeakRecommendation(t.id));
  const testPool = prunedTests.length >= safeCount ? prunedTests : nonCurrentTests;

  const scored = testPool
    .map((t) => ({
      test: t,
      score:
        scoreClusterAndKeywordOverlap(
          currentClusters,
          currentTokens,
          t.clusters,
          t.searchBlob,
          t.id,
          t.route
        ) + (t.launchKind === current?.launchKind ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score);

  const picked: IndexedTestCandidate[] = [];
  const seenFamily = new Set<string>();
  for (const { test } of scored) {
    const family =
      test.id === 'psych_big_five'
        ? 'big_five_ocean'
        : test.id === 'psych_existential_fatigue'
        ? 'existential_fatigue'
        : test.id;
    if (seenFamily.has(family)) continue;
    seenFamily.add(family);
    picked.push(test);
    if (picked.length >= safeCount) break;
  }
  return picked;
}

// ============================================================================
// REQUIREMENT 5: "محتوى مقترح لك" (Curated Mix of Articles + Tests + Stories)
// ============================================================================

export function getSuggestedContentMix(
  options: {
    clusters?: TopicClusterId[];
    excludeIds?: string[];
    excludeRoutes?: string[];
    keywordsText?: string;
    count?: number;
  } = {}
): SuggestedMixItem[] {
  const targetCount = Math.min(6, Math.max(3, options.count ?? 6));
  const excludeIds = new Set(options.excludeIds || []);
  const excludeRoutes = new Set(options.excludeRoutes || []);
  const sourceClusters: TopicClusterId[] =
    options.clusters && options.clusters.length > 0
      ? options.clusters
      : ['personality', 'relationships', 'emotional_intelligence', 'self_discovery'];
  const sourceTokens = tokenizeKeywords(options.keywordsText || '');

  const articlesPool = getAllIndexedArticles()
    .filter((a) => !excludeIds.has(a.id) && !excludeRoutes.has(a.route) && !isWeakRecommendation(a.id))
    .map((a) => ({
      score: scoreClusterAndKeywordOverlap(
        sourceClusters,
        sourceTokens,
        a.clusters,
        a.searchBlob,
        a.id,
        a.route
      ),
      item: {
        kind: 'article' as const,
        id: a.id,
        titleAr: a.titleAr,
        titleEn: a.titleEn,
        descriptionAr: a.summaryAr,
        descriptionEn: a.summaryEn,
        categoryLabelAr: a.categoryLabelAr,
        categoryLabelEn: a.categoryLabelEn,
        metaAr: `مقال معرفي · ${a.readTimeAr}`,
        metaEn: `Article · ${a.readTimeEn}`,
        ctaAr: 'اقرأ المقال الآن',
        ctaEn: 'Read Article',
        route: a.route,
        icon: a.icon,
        clusters: a.clusters,
        articleId: a.id,
      },
    }))
    .sort((a, b) => b.score - a.score);

  const testsPool = getAllIndexedTests()
    .filter((t) => !excludeIds.has(t.id) && !excludeRoutes.has(t.route + '#' + t.id) && !isWeakRecommendation(t.id))
    .map((t) => ({
      score: scoreClusterAndKeywordOverlap(
        sourceClusters,
        sourceTokens,
        t.clusters,
        t.searchBlob,
        t.id,
        t.route
      ),
      item: {
        kind: 'test' as const,
        id: t.id,
        titleAr: t.titleAr,
        titleEn: t.titleEn,
        descriptionAr: t.descriptionAr,
        descriptionEn: t.descriptionEn,
        categoryLabelAr: t.domainLabelAr,
        categoryLabelEn: t.domainLabelEn,
        metaAr: `مقياس تفاعلي · ${t.categoryLabelAr}`,
        metaEn: `Assessment · ${t.categoryLabelEn}`,
        ctaAr: 'ابدأ الاختبار الآن',
        ctaEn: 'Start Assessment',
        route: t.route,
        icon: t.icon,
        clusters: t.clusters,
        testCard: t,
      },
    }))
    .sort((a, b) => b.score - a.score);

  const novelsPool = getAllIndexedNovels()
    .filter((n) => !excludeIds.has(n.id) && !excludeRoutes.has(n.route) && !isWeakRecommendation(n.id))
    .map((n) => ({
      score: scoreClusterAndKeywordOverlap(
        sourceClusters,
        sourceTokens,
        n.clusters,
        n.searchBlob,
        n.id,
        n.route
      ),
      item: {
        kind: 'novel' as const,
        id: n.id,
        titleAr: n.titleAr,
        titleEn: n.titleEn,
        descriptionAr: n.summaryAr,
        descriptionEn: n.summaryEn,
        categoryLabelAr: n.categoryLabelAr,
        categoryLabelEn: n.categoryLabelEn,
        metaAr: `قصة ورواية · ${n.readTimeAr}`,
        metaEn: `Story · ${n.readTimeEn}`,
        ctaAr: 'تصفح القصة',
        ctaEn: 'Read Story',
        route: n.route,
        icon: n.icon,
        clusters: n.clusters,
        novelGenre: n.genre,
      },
    }))
    .sort((a, b) => b.score - a.score);

  // Interleave fairly: Article, Test, Story, Article, Test, Story
  const result: SuggestedMixItem[] = [];
  const seenKeys = new Set<string>();
  let aIdx = 0;
  let tIdx = 0;
  let nIdx = 0;

  const tryPush = (candidate?: { item: SuggestedMixItem }) => {
    if (!candidate) return false;
    const key = `${candidate.item.kind}:${candidate.item.titleAr.slice(0, 28)}`;
    if (seenKeys.has(key)) return false;
    seenKeys.add(key);
    result.push(candidate.item);
    return true;
  };

  while (result.length < targetCount && (aIdx < articlesPool.length || tIdx < testsPool.length || nIdx < novelsPool.length)) {
    while (aIdx < articlesPool.length && !tryPush(articlesPool[aIdx++])) {
      // advance
    }
    if (result.length >= targetCount) break;
    while (tIdx < testsPool.length && !tryPush(testsPool[tIdx++])) {
      // advance
    }
    if (result.length >= targetCount) break;
    while (nIdx < novelsPool.length && !tryPush(novelsPool[nIdx++])) {
      // advance
    }
  }

  return result;
}

// ============================================================================
// SMART CATEGORY: "Popular Content" (Combines Historical Clicks/CTR + Flagship Picks)
// ============================================================================

export function getPopularContentRecommendations(
  options: {
    excludeIds?: string[];
    excludeRoutes?: string[];
    count?: number;
  } = {}
): SuggestedMixItem[] {
  const targetCount = Math.min(6, Math.max(3, options.count ?? 4));
  const excludeIds = new Set(options.excludeIds || []);
  const excludeRoutes = new Set(options.excludeRoutes || []);
  const clickedIdsOrder = getPopularContentIdsByClicks();

  // Build broader candidate pool across all non-weak articles, tests, and stories
  const fallbackMix = getSuggestedContentMix({
    clusters: ['relationships', 'personality', 'emotional_intelligence', 'communication'],
    excludeIds: Array.from(excludeIds),
    excludeRoutes: Array.from(excludeRoutes),
    count: 6,
  });

  if (clickedIdsOrder.length === 0) {
    return fallbackMix.slice(0, targetCount);
  }

  const rankIdxMap = new Map<string, number>();
  clickedIdsOrder.forEach((id, i) => rankIdxMap.set(id, i));

  const allCandidates: SuggestedMixItem[] = [
    ...getAllIndexedArticles()
      .filter((a) => !excludeIds.has(a.id) && !excludeRoutes.has(a.route) && !isWeakRecommendation(a.id))
      .map((a) => ({
        kind: 'article' as const,
        id: a.id,
        titleAr: a.titleAr,
        titleEn: a.titleEn,
        descriptionAr: a.summaryAr,
        descriptionEn: a.summaryEn,
        categoryLabelAr: a.categoryLabelAr,
        categoryLabelEn: a.categoryLabelEn,
        metaAr: `مقال رائج · ${a.readTimeAr}`,
        metaEn: `Trending Article · ${a.readTimeEn}`,
        ctaAr: 'اقرأ المقال الآن',
        ctaEn: 'Read Article',
        route: a.route,
        icon: a.icon,
        clusters: a.clusters,
        articleId: a.id,
      })),
    ...getAllIndexedTests()
      .filter((t) => !excludeIds.has(t.id) && !excludeRoutes.has(t.route + '#' + t.id) && !isWeakRecommendation(t.id))
      .map((t) => ({
        kind: 'test' as const,
        id: t.id,
        titleAr: t.titleAr,
        titleEn: t.titleEn,
        descriptionAr: t.descriptionAr,
        descriptionEn: t.descriptionEn,
        categoryLabelAr: t.domainLabelAr,
        categoryLabelEn: t.domainLabelEn,
        metaAr: `مقياس شائع · ${t.categoryLabelAr}`,
        metaEn: `Popular Test · ${t.categoryLabelEn}`,
        ctaAr: 'ابدأ الاختبار الآن',
        ctaEn: 'Start Assessment',
        route: t.route,
        icon: t.icon,
        clusters: t.clusters,
        testCard: t,
      })),
    ...getAllIndexedNovels()
      .filter((n) => !excludeIds.has(n.id) && !excludeRoutes.has(n.route) && !isWeakRecommendation(n.id))
      .map((n) => ({
        kind: 'novel' as const,
        id: n.id,
        titleAr: n.titleAr,
        titleEn: n.titleEn,
        descriptionAr: n.summaryAr,
        descriptionEn: n.summaryEn,
        categoryLabelAr: n.categoryLabelAr,
        categoryLabelEn: n.categoryLabelEn,
        metaAr: `قصة شائعة · ${n.readTimeAr}`,
        metaEn: `Popular Story · ${n.readTimeEn}`,
        ctaAr: 'تصفح القصة',
        ctaEn: 'Read Story',
        route: n.route,
        icon: n.icon,
        clusters: n.clusters,
        novelGenre: n.genre,
      })),
  ];

  const clickedTop = allCandidates
    .filter((item) => rankIdxMap.has(item.id))
    .sort((a, b) => (rankIdxMap.get(a.id) ?? 999) - (rankIdxMap.get(b.id) ?? 999));

  const merged: SuggestedMixItem[] = [];
  const seen = new Set<string>();
  for (const item of [...clickedTop, ...fallbackMix]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    merged.push(item);
    if (merged.length >= targetCount) break;
  }
  return merged;
}

// ============================================================================
// REQUIREMENT: Personalized User Journey System ("خطوتك التالية")
// After reading an article | After completing a test | After viewing a result
// ============================================================================

export function getArticleLearningJourney(source: ArticleOrPaperInput): LearningJourneyPath {
  const ctx = extractArticleContext(source);
  const relatedArticles = getRelatedArticlesForContent(source, 3);
  const relatedTests = getRelatedTestsForArticle(source, 2);
  const relatedMix = getSuggestedContentMix({
    clusters: ctx.clusters,
    excludeIds: [ctx.id, ...relatedArticles.map((a) => a.id)],
    keywordsText: ctx.blob,
    count: 6,
  });

  const nextArticle = relatedArticles[0];
  const nextTest = relatedTests[0];
  const nextStory = relatedMix.find((m) => m.kind === 'novel') || getAllIndexedNovels()[0];

  const primaryCluster = ctx.clusters[0] || 'self_discovery';
  const clusterLabelAr = TOPIC_CLUSTERS[primaryCluster].labelAr;
  const clusterLabelEn = TOPIC_CLUSTERS[primaryCluster].labelEn;

  const steps: JourneyStepItem[] = [
    {
      stepNumber: 1,
      stepRoleAr: 'تطبيق عملي مباشر',
      stepRoleEn: 'Apply What You Read',
      kind: 'test',
      id: nextTest.id,
      titleAr: nextTest.titleAr,
      titleEn: nextTest.titleEn,
      descriptionAr: `حوّل ما قرأته في هذا المقال إلى قياس شخصي فوري يكشف نقاط قوتك وأسلوبك العملي.`,
      descriptionEn: `Turn what you just read into an immediate psychometric snapshot of your own patterns.`,
      metaLineAr: `مقياس مرتبط · ${nextTest.domainLabelAr}`,
      metaLineEn: `Matched Assessment · ${nextTest.domainLabelEn}`,
      ctaAr: 'ابدأ الاختبار الآن',
      ctaEn: 'Take Matched Test',
      route: nextTest.route,
      icon: nextTest.icon,
      testCard: nextTest,
    },
    {
      stepNumber: 2,
      stepRoleAr: 'قراءة معمقة مكملة',
      stepRoleEn: 'Deepen Understanding',
      kind: 'article',
      id: nextArticle.id,
      titleAr: nextArticle.titleAr,
      titleEn: nextArticle.titleEn,
      descriptionAr: nextArticle.summaryAr,
      descriptionEn: nextArticle.summaryEn,
      metaLineAr: `مقال مكمل · ${nextArticle.readTimeAr}`,
      metaLineEn: `Follow-up Study · ${nextArticle.readTimeEn}`,
      ctaAr: 'تابع القراءة العلمية',
      ctaEn: 'Read Follow-up Article',
      route: nextArticle.route,
      icon: nextArticle.icon,
      articleId: nextArticle.id,
    },
    {
      stepNumber: 3,
      stepRoleAr: 'قصة عيادية / سرد إنساني',
      stepRoleEn: 'Narrative & Reflection',
      kind: 'novel',
      id: nextStory.id,
      titleAr: nextStory.titleAr,
      titleEn: nextStory.titleEn,
      descriptionAr: 'descriptionAr' in nextStory ? nextStory.descriptionAr : nextStory.summaryAr,
      descriptionEn: 'descriptionEn' in nextStory ? nextStory.descriptionEn : nextStory.summaryEn,
      metaLineAr: `مكتبة القصص · ${nextStory.categoryLabelAr}`,
      metaLineEn: `Stories Library · ${nextStory.categoryLabelEn}`,
      ctaAr: 'افتح القصة المرتبطة',
      ctaEn: 'Open Related Story',
      route: nextStory.route,
      icon: nextStory.icon,
      novelGenre: 'genre' in nextStory ? nextStory.genre : nextStory.novelGenre,
    },
  ];

  return {
    headingAr: 'خطوتك التالية',
    headingEn: 'Your Next Step',
    subheadingAr: `مسار تعلم متصل صُمّم بناءً على قراءتك في محور «${clusterLabelAr}» لينقلك من الفهم النظري إلى التطبيق الذاتي.`,
    subheadingEn: `A connected learning path tailored to your reading in "${clusterLabelEn}" moving from theory to personal practice.`,
    contextTagAr: 'بعد قراءة هذا المقال',
    contextTagEn: 'After Reading This Article',
    steps,
  };
}

export function getTestResultLearningJourney(
  rawTestId: string,
  hintText = ''
): LearningJourneyPath {
  const testId = normalizeTestTargetId(rawTestId);
  const allTests = getAllIndexedTests();
  const currentTest = allTests.find((t) => t.id === testId);
  const currentClusters = currentTest?.clusters || ['personality'];

  // Route-tailored journeys matching Personality, Compatibility, Emotional Intelligence & Cognitive profiles
  const matchedArticles = getRelatedArticlesForContent(
    {
      clusters: currentClusters,
      keywordsText: `${currentTest?.searchBlob || ''} ${hintText}`,
    },
    3
  );
  const followUpTests = getTryAnotherTests(testId, 3);
  const novels = getAllIndexedNovels();
  const matchedNovel =
    novels.find((n) => n.clusters.some((c) => currentClusters.includes(c))) || novels[0];

  const isCompatibility = testId === 'compatibility' || currentClusters[0] === 'relationships';
  const isEQ =
    testId === 'intel_emotional_intelligence_eq' ||
    testId === 'psych_cultural_eq' ||
    currentClusters[0] === 'emotional_intelligence';

  if (isCompatibility) {
    const commTest =
      allTests.find((t) => t.id === 'psych_cultural_eq' || t.id === 'psych_attachment_style') ||
      followUpTests[0];
    const compatArticle = matchedArticles[0];
    const guidanceArticle = matchedArticles[1] || matchedArticles[0];

    return {
      headingAr: 'خطوتك التالية',
      headingEn: 'Your Next Step',
      subheadingAr:
        'حوّل مؤشرات التوافق في تقريرك إلى مهارات حوار وتقارب عملي عبر هذا المسار الثلاثي المخصص للعلاقات.',
      subheadingEn:
        'Turn your compatibility insights into real-world dialogue and relational strength through this 3-step path.',
      contextTagAr: 'مسار تطوير التوافق والعلاقات',
      contextTagEn: 'Compatibility Learning Path',
      steps: [
        {
          stepNumber: 1,
          stepRoleAr: 'مقال علمي في التوافق',
          stepRoleEn: 'Compatibility Science Article',
          kind: 'article',
          id: compatArticle.id,
          titleAr: compatArticle.titleAr,
          titleEn: compatArticle.titleEn,
          descriptionAr: compatArticle.summaryAr,
          descriptionEn: compatArticle.summaryEn,
          metaLineAr: `الخطوة الأولى · ${compatArticle.readTimeAr}`,
          metaLineEn: `Step 1 · ${compatArticle.readTimeEn}`,
          ctaAr: 'اقرأ تحليل التوافق',
          ctaEn: 'Read Compatibility Study',
          route: compatArticle.route,
          icon: compatArticle.icon,
          articleId: compatArticle.id,
        },
        {
          stepNumber: 2,
          stepRoleAr: 'اختبار أسلوب التواصل والتعلق',
          stepRoleEn: 'Communication Style Assessment',
          kind: 'test',
          id: commTest.id,
          titleAr: commTest.titleAr,
          titleEn: commTest.titleEn,
          descriptionAr: commTest.descriptionAr,
          descriptionEn: commTest.descriptionEn,
          metaLineAr: `الخطوة الثانية · ${commTest.domainLabelAr}`,
          metaLineEn: `Step 2 · ${commTest.domainLabelEn}`,
          ctaAr: 'ابدأ اختبار التواصل الآن',
          ctaEn: 'Start Communication Assessment',
          route: commTest.route,
          icon: commTest.icon,
          testCard: commTest,
        },
        {
          stepNumber: 3,
          stepRoleAr: 'دليل الإرشاد العلائقي',
          stepRoleEn: 'Relationship Guidance Article',
          kind: 'article',
          id: guidanceArticle.id,
          titleAr: guidanceArticle.titleAr,
          titleEn: guidanceArticle.titleEn,
          descriptionAr: guidanceArticle.summaryAr,
          descriptionEn: guidanceArticle.summaryEn,
          metaLineAr: `الخطوة الثالثة · ${guidanceArticle.categoryLabelAr}`,
          metaLineEn: `Step 3 · ${guidanceArticle.categoryLabelEn}`,
          ctaAr: 'استكشف دليل الإرشاد',
          ctaEn: 'Read Relationship Guide',
          route: guidanceArticle.route,
          icon: guidanceArticle.icon,
          articleId: guidanceArticle.id,
        },
      ],
    };
  }

  if (isEQ) {
    const selfAwarenessTest =
      allTests.find((t) => t.id === 'tiered_assessment' || t.id === 'big_five_ocean') ||
      followUpTests[0];
    const eqArticle = matchedArticles[0];
    const growthArticle =
      getAllIndexedArticles().find((a) => a.clusters.includes('self_discovery') && a.id !== eqArticle.id) ||
      matchedArticles[1] ||
      eqArticle;

    return {
      headingAr: 'خطوتك التالية',
      headingEn: 'Your Next Step',
      subheadingAr:
        'بناءً على نتيجتك في الذكاء العاطفي، اتبع هذا المسار لصقل الوعي الذاتي وتحويل الفهم الشعوري إلى نمو متوازن.',
      subheadingEn:
        'Based on your Emotional Intelligence result, follow this structured path toward deeper self-awareness and personal growth.',
      contextTagAr: 'مسار الذكاء العاطفي والوعي الذاتي',
      contextTagEn: 'Emotional Intelligence Path',
      steps: [
        {
          stepNumber: 1,
          stepRoleAr: 'مقال تشريح الذكاء العاطفي',
          stepRoleEn: 'Emotional Intelligence Article',
          kind: 'article',
          id: eqArticle.id,
          titleAr: eqArticle.titleAr,
          titleEn: eqArticle.titleEn,
          descriptionAr: eqArticle.summaryAr,
          descriptionEn: eqArticle.summaryEn,
          metaLineAr: `الخطوة الأولى · ${eqArticle.readTimeAr}`,
          metaLineEn: `Step 1 · ${eqArticle.readTimeEn}`,
          ctaAr: 'اقرأ مقال الذكاء العاطفي',
          ctaEn: 'Read EQ Article',
          route: eqArticle.route,
          icon: eqArticle.icon,
          articleId: eqArticle.id,
        },
        {
          stepNumber: 2,
          stepRoleAr: 'اختبار الوعي الذاتي المتعمق',
          stepRoleEn: 'Self-Awareness Assessment',
          kind: 'test',
          id: selfAwarenessTest.id,
          titleAr: selfAwarenessTest.titleAr,
          titleEn: selfAwarenessTest.titleEn,
          descriptionAr: selfAwarenessTest.descriptionAr,
          descriptionEn: selfAwarenessTest.descriptionEn,
          metaLineAr: `الخطوة الثانية · ${selfAwarenessTest.domainLabelAr}`,
          metaLineEn: `Step 2 · ${selfAwarenessTest.domainLabelEn}`,
          ctaAr: 'خض اختبار الوعي الذاتي',
          ctaEn: 'Start Self-Awareness Test',
          route: selfAwarenessTest.route,
          icon: selfAwarenessTest.icon,
          testCard: selfAwarenessTest,
        },
        {
          stepNumber: 3,
          stepRoleAr: 'موارد النمو والتطوير الذاتي',
          stepRoleEn: 'Personal Growth Resource',
          kind: 'article',
          id: growthArticle.id,
          titleAr: growthArticle.titleAr,
          titleEn: growthArticle.titleEn,
          descriptionAr: growthArticle.summaryAr,
          descriptionEn: growthArticle.summaryEn,
          metaLineAr: `الخطوة الثالثة · ${growthArticle.categoryLabelAr}`,
          metaLineEn: `Step 3 · ${growthArticle.categoryLabelEn}`,
          ctaAr: 'افتح موارد النمو الشخصي',
          ctaEn: 'Open Growth Resource',
          route: growthArticle.route,
          icon: growthArticle.icon,
          articleId: growthArticle.id,
        },
      ],
    };
  }

  // Default Personality / Psychometric / Cognitive Journey
  const explainingArticle = matchedArticles[0];
  const nextAssessment = followUpTests[0];

  return {
    headingAr: 'خطوتك التالية',
    headingEn: 'Your Next Step',
    subheadingAr:
      'مسار تعلم متكامل ينقلك من فهم تفاصيل نمطك إلى مقياس سيكومتري مكمل ثم تجربة سردية تجسد الديناميكيات النفسية.',
    subheadingEn:
      'A structured path guiding you from your personality explanation article to a complementary assessment and story.',
    contextTagAr: 'مسار اكتشاف الشخصية المخصص',
    contextTagEn: 'Personality Learning Path',
    steps: [
      {
        stepNumber: 1,
        stepRoleAr: 'مقال علمي يشرح نمطك',
        stepRoleEn: 'Scientific Personality Explanation',
        kind: 'article',
        id: explainingArticle.id,
        titleAr: explainingArticle.titleAr,
        titleEn: explainingArticle.titleEn,
        descriptionAr: explainingArticle.summaryAr,
        descriptionEn: explainingArticle.summaryEn,
        metaLineAr: `الخطوة الأولى · ${explainingArticle.readTimeAr}`,
        metaLineEn: `Step 1 · ${explainingArticle.readTimeEn}`,
        ctaAr: 'اقرأ التفسير العلمي',
        ctaEn: 'Read Scientific Guide',
        route: explainingArticle.route,
        icon: explainingArticle.icon,
        articleId: explainingArticle.id,
      },
      {
        stepNumber: 2,
        stepRoleAr: 'مقياس سيكومتري مكمل',
        stepRoleEn: 'Related Psychometric Assessment',
        kind: 'test',
        id: nextAssessment.id,
        titleAr: nextAssessment.titleAr,
        titleEn: nextAssessment.titleEn,
        descriptionAr: nextAssessment.descriptionAr,
        descriptionEn: nextAssessment.descriptionEn,
        metaLineAr: `الخطوة الثانية · ${nextAssessment.domainLabelAr}`,
        metaLineEn: `Step 2 · ${nextAssessment.domainLabelEn}`,
        ctaAr: 'ابدأ الاختبار المكمل',
        ctaEn: 'Start Complementary Test',
        route: nextAssessment.route,
        icon: nextAssessment.icon,
        testCard: nextAssessment,
      },
      {
        stepNumber: 3,
        stepRoleAr: 'قصة نفسية ذات صلة',
        stepRoleEn: 'Relevant Psychological Story',
        kind: 'novel',
        id: matchedNovel.id,
        titleAr: matchedNovel.titleAr,
        titleEn: matchedNovel.titleEn,
        descriptionAr: matchedNovel.summaryAr,
        descriptionEn: matchedNovel.summaryEn,
        metaLineAr: `الخطوة الثالثة · ${matchedNovel.categoryLabelAr}`,
        metaLineEn: `Step 3 · ${matchedNovel.categoryLabelEn}`,
        ctaAr: 'تصفح القصة الآن',
        ctaEn: 'Explore Story',
        route: matchedNovel.route,
        icon: matchedNovel.icon,
        novelGenre: matchedNovel.genre,
      },
    ],
  };
}

export function getNovelLearningJourney(novel: Novel): LearningJourneyPath {
  const blob = `${novel.titleAr} ${novel.synopsisAr} ${novel.psychologicalFocusAr} ${novel.forensicThemeAr}`;
  const clusters = classifyTextIntoClusters(blob);
  const matchedArticles = getRelatedArticlesForContent(
    { clusters, keywordsText: blob },
    2
  );
  const allTests = getAllIndexedTests();
  const matchedTest =
    allTests.find((t) => t.clusters.some((c) => clusters.includes(c))) || allTests[0];
  const nextNovel =
    getAllIndexedNovels().find((n) => n.id !== novel.id) || getAllIndexedNovels()[0];

  return {
    headingAr: 'خطوتك التالية',
    headingEn: 'Your Next Step',
    subheadingAr:
      'تابع الرحلة من السرد القصصي إلى الجذور النفسية والأدوات التطبيقية التي تعمّق فهمك للدوافع والشخصيات.',
    subheadingEn:
      'Continue from this narrative into the psychological principles, assessment, and next story.',
    contextTagAr: 'بعد قراءة هذه القصة',
    contextTagEn: 'After Reading This Story',
    steps: [
      {
        stepNumber: 1,
        stepRoleAr: 'التحليل العلمي للثيمة النفسية',
        stepRoleEn: 'Psychological Deep Dive',
        kind: 'article',
        id: matchedArticles[0].id,
        titleAr: matchedArticles[0].titleAr,
        titleEn: matchedArticles[0].titleEn,
        descriptionAr: matchedArticles[0].summaryAr,
        descriptionEn: matchedArticles[0].summaryEn,
        metaLineAr: `مقال تحليلي · ${matchedArticles[0].readTimeAr}`,
        metaLineEn: `Analytical Article · ${matchedArticles[0].readTimeEn}`,
        ctaAr: 'اقرأ التحليل النفسي',
        ctaEn: 'Read Psychological Study',
        route: matchedArticles[0].route,
        icon: matchedArticles[0].icon,
        articleId: matchedArticles[0].id,
      },
      {
        stepNumber: 2,
        stepRoleAr: 'مقياس استكشاف ذاتي مرتبط',
        stepRoleEn: 'Related Assessment',
        kind: 'test',
        id: matchedTest.id,
        titleAr: matchedTest.titleAr,
        titleEn: matchedTest.titleEn,
        descriptionAr: matchedTest.descriptionAr,
        descriptionEn: matchedTest.descriptionEn,
        metaLineAr: `مقياس تفاعلي · ${matchedTest.domainLabelAr}`,
        metaLineEn: `Interactive Scale · ${matchedTest.domainLabelEn}`,
        ctaAr: 'اختبر أسلوبك الآن',
        ctaEn: 'Take Related Assessment',
        route: matchedTest.route,
        icon: matchedTest.icon,
        testCard: matchedTest,
      },
      {
        stepNumber: 3,
        stepRoleAr: 'الرواية أو القصة التالية',
        stepRoleEn: 'Next Recommended Story',
        kind: 'novel',
        id: nextNovel.id,
        titleAr: nextNovel.titleAr,
        titleEn: nextNovel.titleEn,
        descriptionAr: nextNovel.summaryAr,
        descriptionEn: nextNovel.summaryEn,
        metaLineAr: `مكتبة الروايات · ${nextNovel.categoryLabelAr}`,
        metaLineEn: `Novels Library · ${nextNovel.categoryLabelEn}`,
        ctaAr: 'افتح الرواية التالية',
        ctaEn: 'Open Next Story',
        route: nextNovel.route,
        icon: nextNovel.icon,
        novelGenre: nextNovel.genre,
      },
    ],
  };
}

// ============================================================================
// REQUIREMENT (Internal Linking): 2–5 Contextual Links for Every Test & Result Page
// ============================================================================

export function getContextualLinksForTest(
  rawTestId: string,
  count = 4
): ContextualLinkItem[] {
  const safeCount = Math.min(5, Math.max(2, count));
  const testId = normalizeTestTargetId(rawTestId);
  const testObj = getAllIndexedTests().find((t) => t.id === testId);
  const clusters = testObj?.clusters || ['personality', 'self_discovery'];

  const links: ContextualLinkItem[] = [];
  const seenRoutes = new Set<string>();

  // 1. Add 2–3 deeply relevant explanatory articles
  const relatedArticles = getRelatedArticlesForContent(
    { clusters, keywordsText: testObj?.searchBlob || '' },
    3
  );
  for (const art of relatedArticles) {
    if (seenRoutes.has(art.route)) continue;
    seenRoutes.add(art.route);
    links.push({
      titleAr: art.titleAr,
      titleEn: art.titleEn,
      anchorAr: art.titleAr,
      anchorEn: art.titleEn,
      descriptionAr: art.summaryAr,
      descriptionEn: art.summaryEn,
      route: art.route,
      kind: 'article',
      articleId: art.id,
    });
    if (links.length >= safeCount - 1) break;
  }

  // 2. Add Educational / Methodology / Algorithm link(s)
  const eduPriorityRoutes =
    testId === 'compatibility'
      ? ['/compatibility-algorithm', '/how-results-are-calculated', '/methodology']
      : ['/how-results-are-calculated', '/methodology', '/faq'];

  for (const r of eduPriorityRoutes) {
    if (links.length >= safeCount) break;
    const edu = EDUCATIONAL_RESOURCES_CATALOG.find((e) => e.route === r);
    if (!edu || seenRoutes.has(edu.route)) continue;
    seenRoutes.add(edu.route);
    links.push({
      titleAr: edu.titleAr,
      titleEn: edu.titleEn,
      anchorAr: edu.titleAr,
      anchorEn: edu.titleEn,
      descriptionAr: edu.descriptionAr,
      descriptionEn: edu.descriptionEn,
      route: edu.route,
      kind: 'educational',
    });
  }

  return links.slice(0, safeCount);
}

// ============================================================================
// REQUIREMENT (Internal Linking): Dynamic In-Prose Contextual Links (3–8 per article)
// ============================================================================

interface AnchorRule {
  phrases: string[];
  route: string;
  articleId?: string;
  testTargetId?: RecommendationTestTargetId;
  labelAr: string;
  labelEn: string;
}

const CONTEXTUAL_ANCHOR_RULES: AnchorRule[] = [
  {
    phrases: [
      'تحليل أنماط التواصل',
      'أنماط التواصل',
      'مهارات التواصل الفعال',
      'التواصل العاطفي',
    ],
    route: '/personality-tests',
    testTargetId: 'psych_cultural_eq',
    labelAr: 'تحليل أنماط التواصل والذكاء الاجتماعي',
    labelEn: 'Communication Style Assessment',
  },
  {
    phrases: [
      'اختبار الذكاء العاطفي',
      'الذكاء العاطفي',
      'تنظيم المشاعر',
      'Emotional Intelligence',
    ],
    route: '/iq-tests',
    testTargetId: 'intel_emotional_intelligence_eq',
    labelAr: 'اختبار الذكاء العاطفي السيكومتري (Bar-On & MSCEIT)',
    labelEn: 'Emotional Intelligence Assessment',
  },
  {
    phrases: [
      'أنماط التعلق العاطفي',
      'نمط التعلق',
      'أنماط التعلق',
      'التعلق القلق',
      'Attachment Styles',
    ],
    route: '/personality-tests',
    testTargetId: 'psych_attachment_style',
    labelAr: 'مقياس أنماط التعلق العاطفي (ECR-R)',
    labelEn: 'Attachment Style Assessment (ECR-R)',
  },
  {
    phrases: [
      'اختبار تحليل الشخصية',
      'تحليل الشخصية',
      'العوامل الخمسة الكبرى',
      'Big Five',
      'مؤشر الشخصيات',
      'MBTI',
    ],
    route: '/personality-tests',
    testTargetId: 'big_five_ocean',
    labelAr: 'اختبار تحليل الشخصية (Big Five & MBTI)',
    labelEn: 'Personality Analysis Assessment',
  },
  {
    phrases: [
      'التوافق العاطفي',
      'كاشف شريك الحياة',
      'شريك الحياة',
      'التوافق الفكري',
      'Partner Compatibility',
    ],
    route: '/compatibility',
    testTargetId: 'compatibility',
    labelAr: 'اختبار كاشف التوافق وشريك الحياة',
    labelEn: 'Partner Compatibility Test',
  },
  {
    phrases: [
      'الحدود الصحية',
      'وضع حدود صحية',
      'التمايز الذاتي',
      'Healthy Boundaries',
    ],
    route: '/articles/how-to-set-healthy-boundaries-in-relationships',
    articleId: 'how-to-set-healthy-boundaries-in-relationships',
    labelAr: 'دليل بناء الحدود الصحية في العلاقات',
    labelEn: 'Guide to Healthy Relationship Boundaries',
  },
  {
    phrases: [
      'حل النزاعات',
      'مهارات حل النزاعات',
      'التواصل اللاعنفي',
      'التفاوض التكاملي',
      'Conflict Resolution',
    ],
    route: '/articles/conflict-resolution-and-dispute-skills',
    articleId: 'conflict-resolution-and-dispute-skills',
    labelAr: 'مهارات حل النزاعات والخلافات والتفاوض التكاملي',
    labelEn: 'Conflict & Dispute Resolution Skills',
  },
  {
    phrases: [
      'الشخصية المتوازنة',
      'شخصية قوية ومتوازنة',
      'المرونة النفسية',
      'تكامل الظل',
      'Psychological Flexibility',
    ],
    route: '/articles/how-to-build-a-strong-balanced-personality',
    articleId: 'how-to-build-a-strong-balanced-personality',
    labelAr: 'كيف تبني شخصية قوية ومتوازنة؟ (الأبعاد الخمسة والمرونة النفسية)',
    labelEn: 'How to Build a Strong, Balanced Personality',
  },
  {
    phrases: [
      'الإرهاق النفسي',
      'الاحتراق النفسي',
      'الاحتراق الوظيفي',
      'ضبابية الدماغ',
      'Psychological Burnout',
    ],
    route: '/articles/how-to-know-you-have-psychological-burnout',
    articleId: 'how-to-know-you-have-psychological-burnout',
    labelAr: 'كيف تعرف أنك تعاني من الإرهاق النفسي؟ (مؤشرات ماسلاش والدماغ)',
    labelEn: 'How to Know You Have Psychological Burnout',
  },
  {
    phrases: [
      'الضغط النفسي',
      'الفرق بين الضغط النفسي والاحتراق',
      'الاحتراق تحت الضغط',
      'محور HPA',
      'Stress vs Burnout',
    ],
    route: '/articles/difference-between-stress-and-burnout',
    articleId: 'difference-between-stress-and-burnout',
    labelAr: 'الفرق بين الضغط النفسي والاحتراق الوظيفي (الدليل التشخيصي)',
    labelEn: 'Difference Between Psychological Stress and Burnout',
  },
  {
    phrases: [
      'استنزاف المشاعر',
      'التسطح العاطفي',
      'التنميل الحسي',
      'فقدان الشغف',
      'Emotional Depletion',
    ],
    route: '/articles/emotional-depletion-signs-before-depression',
    articleId: 'emotional-depletion-signs-before-depression',
    labelAr: 'علامات استنزاف المشاعر قبل الوصول للاكتئاب (خريطة الإنقاذ المبكر)',
    labelEn: 'Early Signs of Emotional Depletion Before Depression',
  },
  {
    phrases: [
      'الصدمات القديمة',
      'التكرار القهري',
      'النمو ما بعد الصدمة',
      'اليقظة الجسدية',
      'Childhood Trauma',
    ],
    route: '/articles/how-old-trauma-shapes-current-decisions',
    articleId: 'how-old-trauma-shapes-current-decisions',
    labelAr: 'كيف تؤثر الصدمات القديمة على قراراتك الحالية؟ (علم الأعصاب والشفاء)',
    labelEn: 'How Old Trauma Shapes Your Current Decisions',
  },
  {
    phrases: [
      'التعب المزمن',
      'التعب العاطفي',
      'التعب الروحي',
      'التنافر المعرفي',
      'Chronic Fatigue',
    ],
    route: '/articles/why-do-you-feel-tired-despite-rest',
    articleId: 'why-do-you-feel-tired-despite-rest',
    labelAr: 'لماذا تشعر بالتعب رغم حصولك على الراحة؟ (خريطة الأنواع الخمسة)',
    labelEn: 'Why Do You Feel Tired Even After Rest',
  },
  {
    phrases: [
      'المقارنة الاجتماعية',
      'متلازمة المحتال',
      'FOMO',
      'الاجترار الذاتي',
      'Social Comparison',
    ],
    route: '/articles/social-comparison-impact-on-mental-health',
    articleId: 'social-comparison-impact-on-mental-health',
    labelAr: 'أثر المقارنة الاجتماعية على الصحة النفسية (العلم وطرق التحرر)',
    labelEn: 'Impact of Social Comparison on Mental Health',
  },
  {
    phrases: [
      'التوازن النفسي',
      'تسمية المشاعر',
      'التعافي من الأزمات',
      'إعادة السردية الذاتية',
      'Psychological Equilibrium',
    ],
    route: '/articles/how-to-recover-psychological-equilibrium-after-hard-times',
    articleId: 'how-to-recover-psychological-equilibrium-after-hard-times',
    labelAr: 'كيف تستعيد توازنك النفسي بعد فترة صعبة؟ (خريطة التعافي الكاملة)',
    labelEn: 'How to Restore Psychological Equilibrium After Hard Times',
  },
  {
    phrases: [
      'استشارة نفسية',
      'معايير DSM-5',
      'الضيق الطبيعي',
      'طلب المساعدة النفسية',
      'Psychological Counseling',
    ],
    route: '/articles/when-do-you-need-psychological-counseling',
    articleId: 'when-do-you-need-psychological-counseling',
    labelAr: 'متى تحتاج إلى استشارة نفسية؟ (الفرق السريري واختبار الفحص الذاتي)',
    labelEn: 'When Do You Need Psychological Counseling?',
  },
  {
    phrases: [
      'الأخصائي النفسي',
      'التحالف العلاجي',
      'العلاج عن بُعد',
      'قاعدة الجلسات الثلاث',
      'Therapeutic Alliance',
    ],
    route: '/articles/how-to-choose-right-psychologist',
    articleId: 'how-to-choose-right-psychologist',
    labelAr: 'كيف تختار الأخصائي النفسي المناسب؟ (المعايير والعلامات التحذيرية)',
    labelEn: 'How to Choose the Right Psychologist?',
  },
  {
    phrases: [
      'المفاهيم الخاطئة عن العلاج النفسي',
      'السرية المهنية',
      'الأدوية النفسية',
      'ضعف إيمان',
      'Psychotherapy Myths',
    ],
    route: '/articles/most-common-myths-about-psychotherapy',
    articleId: 'most-common-myths-about-psychotherapy',
    labelAr: 'أكثر المفاهيم الخاطئة عن العلاج النفسي (تفنيد 15 خرافة بالعلم)',
    labelEn: '15 Common Myths About Psychotherapy Debunked',
  },
  {
    phrases: [
      'جلسة العلاج النفسي',
      'غرفة العلاج النفسي',
      'التحويل الإيجابي',
      'نافذة التسامح',
      'Psychotherapy Session',
    ],
    route: '/articles/what-happens-inside-psychotherapy-session',
    articleId: 'what-happens-inside-psychotherapy-session',
    labelAr: 'ماذا يحدث داخل جلسة العلاج النفسي؟ (دليل الجلسة الأولى ومراحل العلاج)',
    labelEn: 'What Happens Inside a Psychotherapy Session?',
  },
  {
    phrases: [
      'دون أدوية',
      'العلاج الدوائي',
      'الدمج بين العلاج النفسي والأدوية',
      'التمارين الرياضية واليقظة',
      'Without Medication',
    ],
    route: '/articles/can-psychological-problems-be-solved-without-medication',
    articleId: 'can-psychological-problems-be-solved-without-medication',
    labelAr: 'هل يمكن حل المشكلات النفسية دون أدوية؟ (دليل الأدلة العلمية وجدول القرار)',
    labelEn: 'Can Psychological Problems Be Solved Without Medication?',
  },
  {
    phrases: [
      'الشريك الفعال',
      'الصدع والإصلاح',
      'الفكرنة',
      'الصدق الجذري',
      'Active Client Participation',
    ],
    route: '/articles/how-to-get-the-most-out-of-counseling',
    articleId: 'how-to-get-the-most-out-of-counseling',
    labelAr: 'كيف تستفيد من الاستشارة النفسية بأفضل شكل؟ (دليل الشريك الفعال)',
    labelEn: 'How to Get the Most Out of Psychological Counseling?',
  },
  {
    phrases: [
      'الطبيب النفسي والأخصائي النفسي',
      'الأخصائي الاجتماعي الإكلينيكي',
      'الرعاية المتكاملة',
      'الفريق العلاجي المتكامل',
      'Psychiatrist vs Psychologist',
    ],
    route: '/articles/difference-between-psychiatrist-and-psychologist',
    articleId: 'difference-between-psychiatrist-and-psychologist',
    labelAr: 'ما الفرق بين الطبيب النفسي والأخصائي النفسي؟ (دليل التخصصات والرعاية المتكاملة)',
    labelEn: 'Difference Between a Psychiatrist and a Psychologist',
  },
  {
    phrases: [
      'العلاج السلوكي المعرفي',
      'العلاج المعرفي السلوكي',
      'المثلث المعرفي',
      'إعادة الهيكلة المعرفية',
      'التنشيط السلوكي',
      'Cognitive Behavioral Therapy',
    ],
    route: '/articles/what-is-cbt-explained-simply',
    articleId: 'what-is-cbt-explained-simply',
    labelAr: 'ما هو العلاج السلوكي المعرفي بطريقة مبسطة؟ (المثلث المعرفي والتقنيات السبع)',
    labelEn: 'What Is Cognitive Behavioral Therapy (CBT) Simply Explained?',
  },
  {
    phrases: [
      'الأفكار التلقائية',
      'المعتقدات الأساسية',
      'المعتقدات الوسيطة',
      'نظرية التقييم المعرفي',
      'حلقات التغذية الراجعة',
      'Automatic Thoughts',
      'Core Beliefs',
    ],
    route: '/articles/how-thoughts-affect-emotions-and-behavior',
    articleId: 'how-thoughts-affect-emotions-and-behavior',
    labelAr: 'كيف تؤثر أفكارك على مشاعرك وسلوكك؟ (الآلية العصبية ومستويات التفكير)',
    labelEn: 'How Do Your Thoughts Affect Your Emotions and Behavior?',
  },
  {
    phrases: [
      'التشوهات المعرفية',
      'التعميم المفرط',
      'القراءة الذهنية',
      'التصفية الذهنية',
      'الاستدلال العاطفي',
      'Cognitive Distortions',
    ],
    route: '/articles/most-common-cognitive-distortions',
    articleId: 'most-common-cognitive-distortions',
    labelAr: 'أشهر التشوهات المعرفية التي يقع فيها الناس (الدليل الشامل لـ 15 تشوهاً وتمرين التحدي)',
    labelEn: 'The Most Common Cognitive Distortions People Fall Into',
  },
  {
    phrases: [
      'التفكير الكارثي',
      'كارثية ماذا لو',
      'سلسلة الاحتمالات',
      'نافذة القلق',
      'Catastrophizing',
      'Worry Window',
    ],
    route: '/articles/how-to-overcome-catastrophizing',
    articleId: 'how-to-overcome-catastrophizing',
    labelAr: 'كيف تتخلص من التفكير الكارثي؟ (سلسلة الاحتمالات، نافذة القلق، والبيولوجيا العصبية)',
    labelEn: 'How Do You Overcome Catastrophizing? (Probability Chains & CBT Tools)',
  },
  {
    phrases: [
      'القلق اليومي',
      'إدارة القلق',
      'التنفس المربع',
      'التأريض الحسي',
      'وقت القلق',
      'Everyday Anxiety',
      'Box Breathing',
    ],
    route: '/articles/practical-steps-to-manage-everyday-anxiety',
    articleId: 'practical-steps-to-manage-everyday-anxiety',
    labelAr: 'خطوات عملية لإدارة القلق اليومي (التنفس المربع، وقت القلق، والروتين اليومي)',
    labelEn: 'Practical Steps to Manage Everyday Anxiety (Box Breathing, Worry Time & CBT)',
  },
  {
    phrases: [
      'الحوار الداخلي',
      'الناقد الداخلي',
      'التعاطف الذاتي',
      'نظام الأسرة الداخلية',
      'الصديق الرحيم',
      'Inner Critic',
      'Self-Compassion',
    ],
    route: '/articles/how-to-rebuild-your-inner-dialogue',
    articleId: 'how-to-rebuild-your-inner-dialogue',
    labelAr: 'كيف تعيد بناء الحوار الداخلي مع نفسك؟ (من الناقد القاسي إلى الصديق الرحيم)',
    labelEn: 'How Do You Rebuild Your Inner Dialogue? (Inner Critic, Self-Compassion & IFS)',
  },
  {
    phrases: [
      'تمارين CBT',
      'الفعالية الذاتية',
      'سجل الإنجازات اليومي',
      'سلم التجاوز',
      'التأكيدات الواقعية',
      'Self-Efficacy',
      'Exposure Ladder',
    ],
    route: '/articles/cbt-exercises-to-improve-self-confidence',
    articleId: 'cbt-exercises-to-improve-self-confidence',
    labelAr: 'تمارين CBT لتحسين الثقة بالنفس (15 تمريناً عملياً وخطة 12 أسبوعاً)',
    labelEn: 'CBT Exercises to Improve Self-Confidence (15 Drills & 12-Week Plan)',
  },
  {
    phrases: [
      'المدير الصعب',
      'التنمر الوظيفي',
      'المدير المتحكم',
      'المدير السام',
      'المدير المتقلب',
      'Difficult Manager',
      'Workplace Bullying',
    ],
    route: '/articles/how-to-deal-with-a-difficult-manager',
    articleId: 'how-to-deal-with-a-difficult-manager',
    labelAr: 'كيف تتعامل مع المدير الصعب؟ (الأنماط السبعة، الذكاء العاطفي في العمل، وحماية الصحة النفسية)',
    labelEn: 'How Do You Deal with a Difficult Manager? (7 Archetypes & Workplace EQ)',
  },
  {
    phrases: [
      'لماذا يفشل بعض الأذكياء',
      'متلازمة الطفل الموهوب',
      'فخ الكفاءة',
      'فخ التحليل المفرط',
      'العقلية الثابتة',
      'الجريت',
      'Why Smart People Fail',
      'Gifted Child Syndrome',
      'Competence Trap',
      'Analysis Paralysis',
    ],
    route: '/articles/why-smart-people-fail-at-work',
    articleId: 'why-smart-people-fail-at-work',
    labelAr: 'لماذا يفشل بعض الأذكياء في بيئة العمل؟ (الفخاخ السبعة ومتلازمة الطفل الموهوب)',
    labelEn: 'Why Do Some Smart People Fail at Work? (7 Traps & Gifted Child Syndrome)',
  },
  {
    phrases: [
      'الخلافات المهنية',
      'العمل الانفعالي',
      'التسرب العاطفي',
      'بروتوكول الخلاف',
      'الاعتذار الجزئي',
      'اللغة المحايدة',
      'التعاطف الاستباقي',
      'Emotional Labor',
      'Emotional Leakage',
      'Neutral Language',
    ],
    route: '/articles/emotional-control-during-workplace-conflicts',
    articleId: 'emotional-control-during-workplace-conflicts',
    labelAr: 'مهارات التحكم بالمشاعر أثناء الخلافات المهنية (التنظيم المعرفي واللغة المحايدة)',
    labelEn: 'Emotional Control Skills During Workplace Conflicts (Regulation & Neutral Language)',
  },
  {
    phrases: [
      'زميل العمل السلبي',
      'الزميل السلبي',
      'العدوى الانفعالية',
      'التفاحة الفاسدة',
      'الحدود الرحيمة',
      'الدرع العقلي',
      'Negative Colleague',
      'Emotional Contagion',
      'Bad Apple Effect',
      'Compassionate Boundaries',
    ],
    route: '/articles/how-to-deal-with-a-negative-colleague',
    articleId: 'how-to-deal-with-a-negative-colleague',
    labelAr: 'كيف تتعامل مع زميل العمل السلبي؟ (العدوى الانفعالية والحدود الرحيمة)',
    labelEn: 'How Do You Deal with a Negative Colleague? (Emotional Contagion & Boundaries)',
  },
  {
    phrases: [
      'القيادة الرنانة',
      'القيادة النافرة',
      'العلامة الجسدية',
      'الأمن النفسي',
      'خطأ ديكارت',
      'الحدس القيادي',
      'القائد المُعدي',
      'Somatic Marker',
      'Psychological Safety',
      'Resonant Leadership',
    ],
    route: '/articles/emotional-intelligence-in-leadership-and-decision-making',
    articleId: 'emotional-intelligence-in-leadership-and-decision-making',
    labelAr: 'الذكاء العاطفي في القيادة واتخاذ القرار (العلامة الجسدية، القيادة الرنانة، والأمن النفسي)',
    labelEn: 'Emotional Intelligence in Leadership & Decision Making (Somatic Markers & Psychological Safety)',
  },
  {
    phrases: [
      'نقاط قوتك المهنية',
      'تدقيق الطاقة',
      'نموذج العجز',
      'نقاط القوة المفرطة',
      'إعادة التصميم الوظيفي',
      'حالة التدفق',
      'أفضل نسخة من نفسك',
      'Strengths-Based Development',
      'Energy Audit',
      'Job Crafting',
    ],
    route: '/articles/how-to-discover-your-professional-strengths',
    articleId: 'how-to-discover-your-professional-strengths',
    labelAr: 'كيف تكتشف نقاط قوتك المهنية؟ (معادلة القوة، تدقيق الطاقة، وحالة التدفق)',
    labelEn: 'How Do You Discover Your Professional Strengths? (Strength Equation, Energy Audit & Flow)',
  },
  {
    phrases: [
      'التقدم الوظيفي',
      'فجوة الحضور',
      'العمل بصمت',
      'الكمالية المفرطة',
      'المسار المزدوج',
      'التواضع المفرط',
      'الاعتماد على الجدارة',
      'Meritocracy Myth',
      'Silent Worker',
      'Executive Presence',
    ],
    route: '/articles/mistakes-that-prevent-career-advancement',
    articleId: 'mistakes-that-prevent-career-advancement',
    labelAr: 'أخطاء تمنعك من التقدم الوظيفي (18 خطأً خفياً، معادلة المسار المزدوج، وخطة 90 يوماً)',
    labelEn: 'Mistakes That Prevent Your Career Advancement (18 Blockers, Presence Gap & 90-Day Plan)',
  },
  {
    phrases: [
      'خطة التطوير المهني',
      'تطوير مهني شخصية',
      'نموذج 70-20-10',
      'تحليل الفجوة',
      'السيرة الذاتية المستقبلية',
      'عجلة الحياة المهنية',
      'شريك المساءلة',
      'Personal Development Plan',
      '70-20-10 Model',
      'Future CV',
    ],
    route: '/articles/how-to-build-a-personal-development-plan',
    articleId: 'how-to-build-a-personal-development-plan',
    labelAr: 'كيف تبني خطة تطوير مهني شخصية؟ (النموذج السداسي، 70-20-10، والسياق الخليجي)',
    labelEn: 'How Do You Build a Personal Development Plan? (6-Stage Model, 70-20-10 & GCC Insights)',
  },
  {
    phrases: [
      'مهارات المستقبل',
      'سوق العمل الخليجي',
      'المهارات الهجينة',
      'نموذج Ikigai',
      'الحوسبة السحابية',
      'الأمن السيبراني',
      'سرد القصص بالبيانات',
      'Future Skills',
      'Ikigai',
      'Data Storytelling',
    ],
    route: '/articles/future-skills-in-the-gulf-labor-market',
    articleId: 'future-skills-in-the-gulf-labor-market',
    labelAr: 'مهارات المستقبل المطلوبة في سوق العمل الخليجي (رؤى 2030، المهارات الهجينة، وIkigai)',
    labelEn: 'Future Skills Demanded in the Gulf Labor Market (Vision 2030, Hybrid Skills & Ikigai)',
  },
  {
    phrases: [
      'النفور من الخسارة',
      '90 يوماً الأولى',
      'فترة التجربة',
      'نموذج STAR',
      'حاسبة الانتقال',
      'صندوق طوارئ',
      'الانتقال الوظيفي',
      'Loss Aversion',
      'First 90 Days',
      'STAR Method',
    ],
    route: '/articles/how-to-move-to-a-better-job-safely',
    articleId: 'how-to-move-to-a-better-job-safely',
    labelAr: 'كيف تنتقل إلى وظيفة أفضل دون مخاطر كبيرة؟ (النفور من الخسارة، صندوق الطوارئ، والـ 90 يوماً)',
    labelEn: 'How Do You Transition to a Better Job Without Big Risks? (Loss Aversion & First 90 Days)',
  },
  {
    phrases: [
      'العمل الذكي',
      'العمل الجاد',
      'ثقافة الانشغال',
      'العمل العميق',
      'قانون باريتو',
      'قانون باركنسون',
      'مصفوفة أيزنهاور',
      'صنع القرار المتعب',
      'Deep Work',
      'Hustle Culture',
    ],
    route: '/articles/hard-work-vs-smart-work',
    articleId: 'hard-work-vs-smart-work',
    labelAr: 'الفرق بين العمل الجاد والعمل الذكي (العمل العميق، باريتو، وإدارة الطاقة)',
    labelEn: 'The Difference Between Hard Work and Smart Work (Deep Work, Pareto & Energy Renewal)',
  },
  {
    phrases: [
      'القائد يولد أم يصنع',
      'القائد يولد أم يُصنع',
      'نظرية الرجل العظيم',
      'القائد بالفطرة',
      'الإرهاق القيادي',
      'الصفات الفطرية للقيادة',
      'Great Man Theory',
      'Born or Made',
      'Trait-Based Leadership',
      'Leadership Development',
    ],
    route: '/articles/is-a-leader-born-or-made',
    articleId: 'is-a-leader-born-or-made',
    labelAr: 'هل القائد يولد أم يُصنع؟ (نظرية الرجل العظيم، المهارات المكتسبة، والقيادة تحت الضغط)',
    labelEn: 'Is a Leader Born or Made? (Great Man Theory, Learned Skills & Leadership Under Pressure)',
  },
  {
    phrases: [
      'نمط الشخصية القيادية',
      'المناصب القيادية',
      'القادة الانطوائيون',
      'القائد الكاريزمي',
      'القائد التحليلي',
      'القائد الخدمي',
      'القائد الاستراتيجي',
      'Servant Leadership',
      'Charismatic Leader',
      'Introverted Leaders',
    ],
    route: '/articles/best-personality-for-leadership',
    articleId: 'best-personality-for-leadership',
    labelAr: 'ما نمط الشخصية الأنسب للمناصب القيادية؟ (السمات الخمس الكبرى، القائد الهادئ، والسياق)',
    labelEn: 'What Personality Best Fits Leadership? (Big Five Traits, Quiet Leaders & Context)',
  },
  {
    phrases: [
      'أسلوب القيادة',
      'أسلوبي القيادي',
      'القائد الحدسي',
      'الأزمات تكشف الشخصية',
      'العدسة المكبرة للسلطة',
      'خريطة نقاط القوة القيادية',
      'مرآة القرارات',
      'Leadership Style',
      'Authentic Leadership',
      'Intuitive Leader',
    ],
    route: '/articles/how-personality-shapes-leadership-style',
    articleId: 'how-personality-shapes-leadership-style',
    labelAr: 'كيف تؤثر شخصيتك على أسلوب قيادتك؟ (القرار، الضغوط، السلطة، وتوسيع النطاق السلوكي)',
    labelEn: 'How Personality Shapes Your Leadership Style (Decisions, Stress, Power & Range)',
  },
  {
    phrases: [
      'القيادة الانفعالية',
      'القيادة الواعية',
      'قاعدة العشر دقائق',
      'رد الفعل القيادي',
      'يوميات القيادة',
      'التوقف الواعي',
      'تضخم الأنا القيادي',
      'Reactive Leadership',
      'Conscious Leadership',
      'Conscious Response',
    ],
    route: '/articles/reactive-vs-conscious-leadership',
    articleId: 'reactive-vs-conscious-leadership',
    labelAr: 'القيادة الانفعالية مقابل القيادة الواعية (دماغ البقاء، الأمان النفسي، وقاعدة العشر دقائق)',
    labelEn: 'Reactive vs. Conscious Leadership (Threat Neurobiology, Psychological Safety & 10-Min Rule)',
  },
  {
    phrases: [
      'كسب احترام الآخرين',
      'الاحترام القيادي',
      'الاتساق بين الكلام والفعل',
      'العدالة القيادية',
      'الحزم دون قسوة',
      'التواضع المهني',
      'الوعود غير المنفذة',
      'Earned Respect',
      'Fear vs Respect',
      'Servant Credibility',
    ],
    route: '/articles/traits-of-leaders-who-earn-respect',
    articleId: 'traits-of-leaders-who-earn-respect',
    labelAr: 'صفات القادة الذين يكسبون احترام الآخرين (الصفات السبع، السلطة مقابل الاحترام، والخوف)',
    labelEn: 'Traits of Leaders Who Earn Respect (7 Core Traits, Authority vs. Respect & Fear)',
  },
  {
    phrases: [
      'أخطاء القيادة',
      'تدمر فرق العمل',
      'وهم السيطرة',
      'الإدارة التفصيلية',
      'الإدارة بالخوف',
      'القائد الهادم',
      'القائد البنّاء',
      'إهمال الإنجازات',
      'Team Destruction',
      'Leadership Pitfalls',
    ],
    route: '/articles/leadership-mistakes-that-destroy-teams',
    articleId: 'leadership-mistakes-that-destroy-teams',
    labelAr: 'أخطاء القيادة التي تدمر فرق العمل (الأخطاء العشرة، تضخم الأنا، والقائد الهادم والبنّاء)',
    labelEn: 'Leadership Mistakes That Destroy Teams (10 Pitfalls, Ego & Destructive vs. Constructive)',
  },
  {
    phrases: [
      'التخصص الجامعي',
      'نظرية جون هولاند',
      'النمط البحثي',
      'النمط الريادي',
      'الملاءمة المهنية',
      'Holland Theory',
      'Career Construction',
    ],
    route: '/articles/choosing-university-major-by-personality',
    articleId: 'choosing-university-major-by-personality',
    labelAr: 'كيف تعرف التخصص الجامعي المناسب لشخصيتك؟ (نموذج هولاند والركائز الأربع)',
    labelEn: 'How to Know Which University Major Fits Your Personality (Holland RIASEC & 4 Pillars)',
  },
  {
    phrases: [
      'أخطاء اختيار التخصص',
      'إرضاء الآخرين',
      'الندم المهني',
      'الاختيار الواعي',
      'ثقافة المقارنة',
      'Major Selection Mistakes',
    ],
    route: '/articles/common-mistakes-choosing-university-major',
    articleId: 'common-mistakes-choosing-university-major',
    labelAr: 'أشهر الأخطاء عند اختيار التخصص الجامعي (تأثير الهالة، ضغط العائلة، والاختيار الاندفاعي)',
    labelEn: 'Common Mistakes When Choosing a University Major (Prestige Traps & Informed Choice)',
  },
  {
    phrases: [
      'بين الشغف والفرص',
      'تخصص الأحلام',
      'الشغف أم سوق العمل',
      'الهواية والمهنة',
      'Passion vs Career',
    ],
    route: '/articles/university-major-passion-vs-job-market',
    articleId: 'university-major-passion-vs-job-market',
    labelAr: 'اختيار التخصص بين الشغف والفرص الوظيفية (الثلاثة أضلاع ونموذج التقاطع)',
    labelEn: 'Choosing a Major Between Passion and Career Prospects (The 3-Triangle Fit Model)',
  },
  {
    phrases: [
      'التخصص الطبي',
      'الشخصية الطبية',
      'دراسة الطب',
      'الحساسية والطب',
      'Medical Major',
    ],
    route: '/articles/is-your-personality-suited-for-medicine',
    articleId: 'is-your-personality-suited-for-medicine',
    labelAr: 'هل شخصيتك تناسب التخصص الطبي؟ (الحقيقة النفسية والسريرية لدراسة الطب وممارسته)',
    labelEn: 'Does Your Personality Fit Medicine? (Psychological & Clinical Realities of Medical Training)',
  },
  {
    phrases: [
      'دراسة الهندسة',
      'الفضول التقني',
      'التفكير التحليلي والهندسة',
      'Engineering Major',
    ],
    route: '/articles/is-your-personality-suited-for-engineering',
    articleId: 'is-your-personality-suited-for-engineering',
    labelAr: 'هل شخصيتك تناسب الهندسة؟ (العقلية الهندسية، القدرة التحليلية، ومساراتها الستة)',
    labelEn: 'Does Your Personality Fit Engineering? (Engineering Mindset, Tolerance & Core Tracks)',
  },
  {
    phrases: [
      'تخصص إدارة الأعمال',
      'إدارة الأعمال مناسب',
      'Business Administration',
    ],
    route: '/articles/is-business-administration-right-for-you',
    articleId: 'is-business-administration-right-for-you',
    labelAr: 'هل تخصص إدارة الأعمال مناسب لك؟ (الصور النمطية، المهارات القيادية، والتشعبات الخمسة)',
    labelEn: 'Is Business Administration Right for You? (Myths, Organizational Traits & Tracks)',
  },
  {
    phrases: [
      'قرار جامعي لا تندم',
      'نموذج الدوائر الأربع',
      'ضغط العائلة',
      'تغيير التخصص',
      'Four Circles Model',
    ],
    route: '/articles/how-to-make-a-regret-free-university-decision',
    articleId: 'how-to-make-a-regret-free-university-decision',
    labelAr: 'كيف تتخذ قراراً جامعياً لا تندم عليه؟ (مصفوفة القرار الدوائر الأربع وخطة الـ 7 خطوات)',
    labelEn: 'How to Make a Regret-Free University Decision (Weighted Matrix & 7-Step Plan)',
  },
  {
    phrases: [
      'تختار مسارك المهني',
      'الوظيفة والمسار المهني',
      'القيم المهنية',
      'الاهتمام العابر',
      'Career Path Guide',
      'Four Circles Career',
    ],
    route: '/articles/choosing-your-career-path-guide',
    articleId: 'choosing-your-career-path-guide',
    labelAr: 'كيف تختار مسارك المهني؟ (دليل نفسي وعملي لبناء مستقبل يناسبك والدوائر الأربع)',
    labelEn: 'How Do You Choose Your Career Path? (Psychological & Practical Career Guide)',
  },
  {
    phrases: [
      'الميول المهنية الحقيقية',
      'الميول والقدرات',
      'سجل الفضول',
      'تحليل الطاقة المهنية',
      'التخصصات الهجينة',
      'Vocational Interests',
    ],
    route: '/articles/discovering-true-vocational-interests',
    articleId: 'discovering-true-vocational-interests',
    labelAr: 'كيف تكتشف ميولك المهنية الحقيقية؟ (هولاند، الميول مقابل القدرات والشغف، والمسارات الهجينة)',
    labelEn: 'How Do You Discover Your True Vocational Interests? (Holland, Interests vs. Skills)',
  },
  {
    phrases: [
      'الوظيفة المناسبة لشخصيتك',
      'الشخصية المنظمة',
      'الشخصية الريادية',
      'الرضا الوظيفي',
      'Right Job Fit',
    ],
    route: '/articles/right-job-for-your-personality',
    articleId: 'right-job-for-your-personality',
    labelAr: 'ما الوظيفة المناسبة لشخصيتك؟ (الأنماط الخمسة والتركيبات المزيجة ولماذا تختلف طاقتنا)',
    labelEn: 'What Job Fits Your Personality? (Five Archetypes, Blended Profiles & Burnout Fit)',
  },
  {
    phrases: [
      'الموهبة والمهارة',
      'العقلية النامية',
      'Growth Mindset',
      'التطور التدريجي المتراكم',
      'الممارسة الواعية',
      'Talent vs Skill',
    ],
    route: '/articles/talent-vs-professional-skill',
    articleId: 'talent-vs-professional-skill',
    labelAr: 'الفرق بين الموهبة والمهارة المهنية (العقلية النامية، خطوات التعلم، والمواهب الخفية)',
    labelEn: 'Talent vs. Professional Skill (Carol Dweck’s Growth Mindset & Deliberate Practice)',
  },
  {
    phrases: [
      'الشخصية التحليلية',
      'محلل البيانات',
      'عالم البيانات',
      'التحليل المالي',
      'الطب التشخيصي',
      'Analytical Personality',
    ],
    route: '/articles/best-jobs-for-analytical-personality',
    articleId: 'best-jobs-for-analytical-personality',
    labelAr: 'الوظائف المناسبة للشخصية التحليلية (أفضل 10 وظائف، القيادة التحليلية، وقائمة الفحص)',
    labelEn: 'Best Jobs for Analytical Personalities (Top 10 Roles, Strategy Fit & Self-Check)',
  },
  {
    phrases: [
      'الشخصية الاجتماعية',
      'تستنزف الشخصية الاجتماعية',
      'العمل الاجتماعي',
      'بناء الثقة والتواصل',
      'Social Personality',
    ],
    route: '/articles/best-jobs-for-social-personality',
    articleId: 'best-jobs-for-social-personality',
    labelAr: 'الوظائف المناسبة للشخصية الاجتماعية (أفضل 10 وظائف إنسانية، الحدود الصحية، وفرص الخليج)',
    labelEn: 'Best Jobs for Social Personalities (Top 10 People Roles, Boundaries & Empathy Fit)',
  },
  {
    phrases: [
      'خطة مهنية لعشر سنوات',
      'رأس المال المهني',
      'هويتك المهنية',
      'مهارات قابلة للنقل',
      'Ten-Year Career Plan',
    ],
    route: '/articles/building-a-ten-year-career-plan',
    articleId: 'building-a-ten-year-career-plan',
    labelAr: 'كيف تبني خطة مهنية لعشر سنوات قادمة؟ (المراحل الثلاث، المهارات القابلة للنقل، ورأس المال المهني)',
    labelEn: 'How to Build a 10-Year Career Plan (3 Horizons, Transferable Skills & Career Capital)',
  },
  {
    phrases: [
      'الصحة النفسية لدى الشباب',
      'ضغوط الواقع',
      'تحديات الشباب في السعودية',
      'الوصمة النفسية',
      'Saudi Youth Mental Health',
    ],
    route: '/articles/saudi-youth-mental-health-challenges',
    articleId: 'saudi-youth-mental-health-challenges',
    labelAr: 'تحديات الصحة النفسية لدى الشباب في السعودية (الضواغط الخمسة، الوصمة، والمرونة النفسية)',
    labelEn: 'Youth Mental Health in Saudi Arabia (5 Stressors, Stigma & Psychological Resilience)',
  },
  {
    phrases: [
      'ضغوط العمل في الخليج',
      'ثقافة الإنجاز المستمر',
      'الحدود بين العمل والحياة',
      'Gulf Workplace Burnout',
    ],
    route: '/articles/gulf-workplace-stress-and-burnout',
    articleId: 'gulf-workplace-stress-and-burnout',
    labelAr: 'ضغوط العمل في بيئة العمل الخليجية (الاحتراق الوظيفي، المتميزون، ودور المدير)',
    labelEn: 'Workplace Stress in the Gulf (Burnout Paradox, Always-On Pressure & Leadership)',
  },
  {
    phrases: [
      'الشباب السعودي والتخصص',
      'اختيار الواعي للتخصص',
      'Saudi Major Selection',
    ],
    route: '/articles/saudi-youth-choosing-university-major',
    articleId: 'saudi-youth-choosing-university-major',
    labelAr: 'كيف يختار الشباب السعودي التخصص المناسب؟ (المعدل كمفتاح، الأسرة، وسوق العمل)',
    labelEn: 'How Saudi Youth Choose a University Major (Ambition, Family & Market Realities)',
  },
  {
    phrases: [
      'التوقعات العائلية',
      'بر الوالدين والاستقلال',
      'النصيحة والضغط',
      'Family Expectations Autonomy',
    ],
    route: '/articles/family-expectations-and-personal-decisions',
    articleId: 'family-expectations-and-personal-decisions',
    labelAr: 'التوقعات العائلية وأثرها على القرارات الشخصية (برّ الأسرة، النصيحة مقابل الضغط، وتحقيق الذات)',
    labelEn: 'Family Expectations & Personal Decisions (Filial Respect vs. Authentic Autonomy)',
  },
  {
    phrases: [
      'التوازن بين الحياة والعمل',
      'الاختلال المزمن',
      'الحضور الدائم للعمل',
      'Gulf Work-Life Balance',
    ],
    route: '/articles/work-life-balance-gulf-society',
    articleId: 'work-life-balance-gulf-society',
    labelAr: 'التوازن بين الحياة والعمل في المجتمع الخليجي (إدارة الطموح، الحضور الذهني، والراحة)',
    labelEn: 'Work-Life Balance in Gulf Society (Sustainable Ambition, Recovery & Boundaries)',
  },
  {
    phrases: [
      'وسائل التواصل والعلاقات الزوجية',
      'الغيرة الرقمية',
      'تآكل الحوار',
      'الاستخدام الرقمي الصحي',
      'Social Media Gulf Marriages',
    ],
    route: '/articles/social-media-impact-gulf-marriages',
    articleId: 'social-media-impact-gulf-marriages',
    labelAr: 'تأثير وسائل التواصل على العلاقات الزوجية في الخليج (المقارنة، الشك، وحماية الحوار)',
    labelEn: 'Social Media Impact on Gulf Marriages (Comparison Traps, Jealousy & Screen Boundaries)',
  },
  {
    phrases: [
      'ضغوط الزواج',
      'متى نفرح بك',
      'الاستعداد والكمال',
      'تأخر الزواج',
      'Marriage Pressure Youth',
    ],
    route: '/articles/youth-coping-with-marriage-pressure',
    articleId: 'youth-coping-with-marriage-pressure',
    labelAr: 'كيف يتعامل الشباب مع ضغوط الزواج؟ (الاستعداد مقابل الكمال، العبء المادي، وتقدير الذات)',
    labelEn: 'Coping With Marriage Pressure (Readiness vs. Perfectionism & Self-Worth)',
  },
  {
    phrases: [
      'شريك الحياة المناسب',
      'الانجذاب والتوافق',
      'التوافق في القيم',
      'Choosing Life Partner',
    ],
    route: '/articles/choosing-right-life-partner-personality',
    articleId: 'choosing-right-life-partner-personality',
    labelAr: 'كيف تختار شريك الحياة المناسب لشخصيتك؟ (الانجذاب مقابل التوافق، القيم، وعلامات النضج)',
    labelEn: 'Choosing the Right Life Partner (Chemistry vs. Compatibility & Pre-Marriage Checks)',
  },
  {
    phrases: [
      'هل هي الشخص المناسب',
      'تُختار أم أنك فقط متاح',
      'تفسد الاحترام',
      'Choosing Right Partner Signs',
    ],
    route: '/articles/is-partner-truly-right-for-you',
    articleId: 'is-partner-truly-right-for-you',
    labelAr: 'كيف تعرف أن شريك الحياة مناسب لك؟ (الأمان النفسي، الحوار الصعب، وتقارب القيم)',
    labelEn: 'Is Your Partner Truly Right for You? (Emotional Safety, Hard Talks & Shared Values)',
  },
  {
    phrases: [
      'علامات التوافق قبل الزواج',
      'الأمان النفسي في العلاقة',
      'إدارة المال قبل الزواج',
      'Pre-Marriage Compatibility',
    ],
    route: '/articles/ten-signs-compatibility-before-marriage',
    articleId: 'ten-signs-compatibility-before-marriage',
    labelAr: 'أهم علامات التوافق قبل الزواج (القيم، المال، النضج العاطفي، والثقة المتبادلة)',
    labelEn: 'Key Signs of Compatibility Before Marriage (Values, Money, Maturity & Trust)',
  },
  {
    phrases: [
      'الانجذاب والتوافق الحقيقي',
      'جمال الباب ومتانة البيت',
      'تأثير الهالة العاطفي',
      'Attraction vs Compatibility',
    ],
    route: '/articles/attraction-vs-real-compatibility',
    articleId: 'attraction-vs-real-compatibility',
    labelAr: 'الفرق بين الانجذاب والتوافق الحقيقي (تأثير الهالة وسد الاحتياجات وتكرار الأنماط)',
    labelEn: 'Attraction vs. Real Compatibility (Halo Effect & Hidden Attachment Drivers)',
  },
  {
    phrases: [
      'فشل العلاقات رغم الحب',
      'خرافة الحب يحل كل شيء',
      'الحب ليس منزلاً كاملاً',
      'Love Is Not Enough',
    ],
    route: '/articles/why-relationships-fail-despite-love',
    articleId: 'why-relationships-fail-despite-love',
    labelAr: 'أسباب فشل العلاقات رغم الحب (لماذا لا يكفي الحب وحده لبناء علاقة مستقرة؟)',
    labelEn: 'Why Relationships Fail Despite Love (Relational Skills Beyond Raw Emotion)',
  },
  {
    phrases: [
      'قرار الزواج بوعي',
      'الحماس لفكرة الزواج',
      'الرغبة والاستعداد للزواج',
      'Conscious Marriage Decision',
    ],
    route: '/articles/conscious-marriage-decision-guide',
    articleId: 'conscious-marriage-decision-guide',
    labelAr: 'كيف تتخذ قرار الزواج بوعي؟ (توازن القلب والعقل ومقارنة الرغبة بالاستعداد)',
    labelEn: 'How to Make a Conscious Marriage Decision (Heart-Mind Balance & Readiness)',
  },
  {
    phrases: [
      'الشخصيات المختلفة تنجح معاً',
      'المنظم والعفوي في الزواج',
      'لغة حب مختلفة',
      'Different Personalities Marriage',
    ],
    route: '/articles/can-different-personalities-succeed-together',
    articleId: 'can-different-personalities-succeed-together',
    labelAr: 'هل الشخصيات المختلفة تنجح معاً؟ (درجات الاختلاف، التكامل، ولغات التعبير عن الحب)',
    labelEn: 'Can Different Personalities Thrive Together? (Complementarity vs. Core Values)',
  },
  {
    phrases: [
      '25 سؤالاً قبل الارتباط',
      'أسئلة مهمة قبل الارتباط الرسمي',
      'التطابق في التفاصيل والجوهر',
      'Pre-Engagement Questions',
    ],
    route: '/articles/essential-questions-before-engagement',
    articleId: 'essential-questions-before-engagement',
    labelAr: 'أسئلة مهمة قبل الارتباط الرسمي: 25 سؤالاً في القيم والمال والأسرة والمستقبل',
    labelEn: '25 Essential Questions Before Engagement (Values, Money, Family & Conflict)',
  },
  {
    phrases: [
      'التوافق الفكري أم العاطفي',
      'جناحا الطائر في العلاقة',
      'الشهادات والتوافق الفكري',
      'Intellectual vs Emotional Fit',
    ],
    route: '/articles/intellectual-vs-emotional-compatibility',
    articleId: 'intellectual-vs-emotional-compatibility',
    labelAr: 'التوافق الفكري أم العاطفي: أيهما أهم لبناء شراكة مستقرة؟',
    labelEn: 'Intellectual vs. Emotional Compatibility: Balancing Warmth and Shared Thinking',
  },
  {
    phrases: [
      'الخلافات في بداية العلاقة',
      'أول خلاف بينكما',
      'محاولات الإصلاح بعد الخلاف',
      'First Relationship Conflict',
    ],
    route: '/articles/handling-first-relationship-conflicts',
    articleId: 'handling-first-relationship-conflicts',
    labelAr: 'كيف تتعامل مع الخلافات في بداية العلاقة؟ (ماذا يكشف أول خلاف ومحاولات الإصلاح؟)',
    labelEn: 'Navigating Early Relationship Conflicts (What Your First Disagreement Reveals)',
  },
  {
    phrases: [
      'اختبارات الشخصية واختيار الشريك',
      'اختبار السمات الخمس الكبرى والشريك',
      'الخريطة وليست الطريق',
      'Personality Tests Partner Choice',
    ],
    route: '/articles/personality-tests-in-partner-selection',
    articleId: 'personality-tests-in-partner-selection',
    labelAr: 'اختبارات الشخصية ودورها في اختيار الشريك (ما تكشفه كخريطة وما تعجز عن قياسه)',
    labelEn: 'Personality Tests in Partner Selection (What They Reveal vs. Cannot Predict)',
  },
  {
    phrases: [
      'هل أنت مستعد للزواج فعلاً',
      'تبحث عن شريك أم منقذ',
      'الرغبة في الزواج والاستعداد له',
      'Marriage Readiness Assessment',
    ],
    route: '/articles/are-you-truly-ready-for-marriage',
    articleId: 'are-you-truly-ready-for-marriage',
    labelAr: 'هل أنت مستعد للزواج فعلاً؟ (فحص الدوافع، الاستعداد النفسي والمالي، والاعتذار)',
    labelEn: 'Are You Truly Ready for Marriage? (Readiness Markers, Motives & Accountability)',
  },
  {
    phrases: [
      'لماذا لا يعرف الناس أنفسهم',
      'قصتك عن نفسك',
      'النسخة التي يريدها الآخرون',
      'Why People Don\'t Know Themselves',
    ],
    route: '/articles/why-people-dont-know-themselves',
    articleId: 'why-people-dont-know-themselves',
    labelAr: 'لماذا لا يعرف كثير من الناس أنفسهم؟ (الضجيج، التوقعات، والخوف من الحقيقة)',
    labelEn: 'Why Do Many People Not Know Themselves? (Digital Noise, Roles & Inner Insight)',
  },
  {
    phrases: [
      'تعرف صورتك عن نفسك',
      'الذات الحقيقية والصورة الذاتية',
      'تحمل تعريفاً خاطئاً لنفسك',
      'True Self vs Self Image',
    ],
    route: '/articles/true-self-vs-self-image-story',
    articleId: 'true-self-vs-self-image-story',
    labelAr: 'هل تعرف نفسك حقًا أم تعرف صورتك عن نفسك؟ (تفكيك القصة الذهنية القديمة)',
    labelEn: 'True Self vs. Self-Image: Challenging Outdated Mental Stories Through Action',
  },
  {
    phrases: [
      'تكتشف نقاط قوتك الحقيقية',
      'نقطة القوة مخفية داخل الألم',
      'الشيء الذي يميزك',
      'Discover True Strengths',
    ],
    route: '/articles/how-to-discover-your-true-strengths',
    articleId: 'how-to-discover-your-true-strengths',
    labelAr: 'كيف تكتشف نقاط قوتك الحقيقية؟ (الإشارات الخمس، تدقيق الطاقة، والأعمدة الثلاثة)',
    labelEn: 'How to Discover Your True Strengths (Energy Clues, Five Categories & Audit)',
  },
  {
    phrases: [
      'تكتشف نقاط ضعفك دون تحطيم ثقتك',
      'لدي نقطة ضعف وأنا شخص ضعيف',
      'نقاط الضعف الخفية',
      'Discover Weaknesses Without Shame',
    ],
    route: '/articles/discover-weaknesses-without-breaking-confidence',
    articleId: 'discover-weaknesses-without-breaking-confidence',
    labelAr: 'كيف تكتشف نقاط ضعفك دون أن تحطم ثقتك بنفسك؟ (فهم النمو لا جلد الذات)',
    labelEn: 'Discovering Weaknesses Without Breaking Confidence (Healthy Growth Over Shame)',
  },
  {
    phrases: [
      'التعب الوجودي',
      'الفراغ الوجودي',
      'Existential Fatigue',
    ],
    route: '/personality-tests',
    testTargetId: 'existential_fatigue',
    labelAr: 'خض اختبار التعب الوجودي (جسدي أم عقلي أم وجودي؟)',
    labelEn: 'Take the Existential Fatigue Assessment',
  },
  {
    phrases: [
      'التفكير الزائد',
      'الاجترار الذهني',
      'Overthinking',
    ],
    route: '/articles/overthinking-anatomy-neurocognitive-mct-act-amman-case-study',
    articleId: 'overthinking-anatomy-neurocognitive-mct-act-amman-case-study',
    labelAr: 'التشريح المعرفي للتفكير الزائد وطرق علاجه',
    labelEn: 'Neurocognitive Anatomy of Overthinking',
  },
  {
    phrases: [
      'نموذج غوتمان',
      'فرسان نهاية العالم',
      'إصلاح الخلاف',
      'انهيار العلاقات',
    ],
    route: '/articles/rel-article-4-why-relationships-fail-scientific-anatomy-of-collapse',
    articleId: 'rel-article-4-why-relationships-fail-scientific-anatomy-of-collapse',
    labelAr: 'تشريح انهيار العلاقات وأدوات غوتمان لإصلاح الخلاف',
    labelEn: 'Why Relationships Fail: Gottman Clinical Anatomy',
  },
  {
    phrases: [
      'الثقة بالنفس',
      'تطوير الذات',
      'الوعي الذاتي',
      'Self-Confidence',
    ],
    route: '/articles/ei-article-5-self-development-and-self-confidence-neural-architecture',
    articleId: 'ei-article-5-self-development-and-self-confidence-neural-architecture',
    labelAr: 'البنية العصبية للثقة بالنفس والنمو الذاتي',
    labelEn: 'Neural Architecture of Self-Confidence',
  },
  {
    phrases: [
      'إدارة الضغوط',
      'المرونة النفسية',
      'الاحتراق النفسي',
      'Stress Management',
    ],
    route: '/articles/ei-article-6-stress-and-emotion-management-resilience-shield',
    articleId: 'ei-article-6-stress-and-emotion-management-resilience-shield',
    labelAr: 'الدرع النفسي لإدارة الضغوط وبناء المرونة',
    labelEn: 'Stress & Emotion Resilience Protocol',
  },
  {
    phrases: [
      'الذكاءات المتعددة',
      'مصفوفات رافين',
      'القدرات المعرفية',
      'Multiple Intelligences',
    ],
    route: '/iq-tests',
    testTargetId: 'intel_multiple_intelligences',
    labelAr: 'مقياس الذكاءات المتعددة ومختبر القدرات المعرفية',
    labelEn: 'Multiple Intelligences & Cognitive Lab',
  },
  {
    phrases: [
      'حساب نتائج الاختبارات',
      'المعايير السيكومترية',
      'القياس النفسي',
      'psychometric scoring',
    ],
    route: '/how-results-are-calculated',
    labelAr: 'كيف يتم حساب نتائج الاختبارات السيكومترية',
    labelEn: 'How Psychometric Scores Are Calculated',
  },
  {
    phrases: [
      'خوارزمية التوافق',
      'نسب التوافق',
      'compatibility algorithm',
    ],
    route: '/compatibility-algorithm',
    labelAr: 'خوارزمية حساب التوافق الفكري والعاطفي',
    labelEn: 'Compatibility Scoring Algorithm',
  },
];

export interface TextLinkSegment {
  text: string;
  route?: string;
  title?: string;
  testCard?: ResolvedTestCard;
  articleId?: string;
}

export function findContextualLinksInParagraph(
  paragraphText: string,
  options: {
    excludeArticleId?: string;
    excludeRoute?: string;
    usedTargets?: Set<string>;
    maxLinksInParagraph?: number;
    maxTotalLinks?: number;
  } = {}
): TextLinkSegment[] {
  if (!paragraphText || paragraphText.length < 40) {
    return [{ text: paragraphText }];
  }

  const maxLinksInPara = options.maxLinksInParagraph ?? 1;
  const maxTotal = options.maxTotalLinks ?? 7;
  const usedTargets = options.usedTargets ?? new Set<string>();

  if (usedTargets.size >= maxTotal) {
    return [{ text: paragraphText }];
  }

  const lower = paragraphText.toLowerCase();
  const allTests = getAllIndexedTests();
  const matches: Array<{
    start: number;
    end: number;
    rule: AnchorRule;
    dedupeKey: string;
  }> = [];

  for (const rule of CONTEXTUAL_ANCHOR_RULES) {
    if (matches.length >= maxLinksInPara) break;
    if (usedTargets.size + matches.length >= maxTotal) break;

    if (options.excludeArticleId && rule.articleId === options.excludeArticleId) continue;
    if (options.excludeRoute && rule.route === options.excludeRoute && !rule.testTargetId) continue;

    const dedupeKey = rule.testTargetId ? `test:${rule.testTargetId}` : `route:${rule.route}`;
    if (usedTargets.has(dedupeKey)) continue;

    for (const phrase of rule.phrases) {
      const idx = lower.indexOf(phrase.toLowerCase());
      if (idx === -1) continue;

      const start = idx;
      const end = idx + phrase.length;

      // Verify word boundary so we don't slice mid-word
      const charBefore = start > 0 ? paragraphText[start - 1] : ' ';
      const charAfter = end < paragraphText.length ? paragraphText[end] : ' ';
      const boundaryRegex = /^[\s،.,:;()«»"'\-—–[\]]$/;
      if (!boundaryRegex.test(charBefore) || !boundaryRegex.test(charAfter)) {
        continue;
      }

      // Avoid overlap with existing matches in same paragraph
      const overlaps = matches.some((m) => !(end <= m.start || start >= m.end));
      if (overlaps) continue;

      matches.push({ start, end, rule, dedupeKey });
      usedTargets.add(dedupeKey);
      break;
    }
  }

  if (matches.length === 0) {
    return [{ text: paragraphText }];
  }

  matches.sort((a, b) => a.start - b.start);

  const segments: TextLinkSegment[] = [];
  let cursor = 0;

  for (const m of matches) {
    if (m.start > cursor) {
      segments.push({ text: paragraphText.slice(cursor, m.start) });
    }
    const matchedText = paragraphText.slice(m.start, m.end);
    const resolvedTest = m.rule.testTargetId
      ? allTests.find((t) => t.id === m.rule.testTargetId)
      : undefined;

    segments.push({
      text: matchedText,
      route: m.rule.route,
      title: m.rule.labelAr,
      testCard: resolvedTest,
      articleId: m.rule.articleId,
    });
    cursor = m.end;
  }

  if (cursor < paragraphText.length) {
    segments.push({ text: paragraphText.slice(cursor) });
  }

  return segments;
}

export function getContextualBridgeLinksForArticle(
  source: ArticleOrPaperInput,
  count = 4
): ContextualLinkItem[] {
  const safeCount = Math.min(6, Math.max(3, count));
  const ctx = extractArticleContext(source);
  const relTests = getRelatedTestsForArticle(source, 2);
  const relArticles = getRelatedArticlesForContent(source, 3);
  const links: ContextualLinkItem[] = [];
  const seenRoutes = new Set<string>([ctx.route]);

  for (const t of relTests) {
    links.push({
      titleAr: t.titleAr,
      titleEn: t.titleEn,
      anchorAr: t.titleAr,
      anchorEn: t.titleEn,
      descriptionAr: t.reasonAr,
      descriptionEn: t.reasonEn,
      route: t.route,
      kind: 'test',
      testCard: t,
    });
  }

  for (const art of relArticles) {
    if (links.length >= safeCount - 1) break;
    if (seenRoutes.has(art.route)) continue;
    seenRoutes.add(art.route);
    links.push({
      titleAr: art.titleAr,
      titleEn: art.titleEn,
      anchorAr: art.titleAr,
      anchorEn: art.titleEn,
      descriptionAr: art.summaryAr,
      descriptionEn: art.summaryEn,
      route: art.route,
      kind: 'article',
      articleId: art.id,
    });
  }

  const edu =
    ctx.clusters[0] === 'relationships' || ctx.clusters[0] === 'communication'
      ? EDUCATIONAL_RESOURCES_CATALOG[1]
      : EDUCATIONAL_RESOURCES_CATALOG[0];

  if (links.length < safeCount && !seenRoutes.has(edu.route)) {
    links.push({
      titleAr: edu.titleAr,
      titleEn: edu.titleEn,
      anchorAr: edu.titleAr,
      anchorEn: edu.titleEn,
      descriptionAr: edu.descriptionAr,
      descriptionEn: edu.descriptionEn,
      route: edu.route,
      kind: 'educational',
    });
  }

  return links.slice(0, safeCount);
}

export function resetCatalogIndexCache(): void {
  cachedArticles = null;
  cachedTests = null;
  cachedNovels = null;
}
