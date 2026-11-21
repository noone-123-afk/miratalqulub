import { ARTICLES_CATALOG, Article } from './articlesData';
import { HOME_NOVEL_CATEGORIES, HomeNovelCategory } from './homeHighlightsData';
import { NOVELS_CATALOG, Novel, NovelGenre } from './novelsData';
import { PERSONALITY_TESTS_CATALOG } from './personalityTestsData';
import {
  ASSESSMENTS_CATALOG,
  AssessmentType,
  PsychometricReport,
} from './psychologySuiteData';
import {
  INTELLIGENCE_BATTERIES_CATALOG,
  INTELLIGENCE_CATEGORIES,
  IntelligenceBatteryType,
  IntelligenceCategory,
  IntelligenceTestResult,
  ObjectiveBatteryResult,
} from './intelligenceTestData';
import { ANALYSIS_TIERS_CATALOG } from './tieredPsychologyBank';
import { PartnerAnalysisResult, TieredAssessmentReport } from '../types';

export type RecommendationTestGroup = 'personality' | 'compatibility' | 'intelligence';

export type RecommendationTestTargetId =
  | 'compatibility'
  | 'mbti_16types'
  | 'big_five_ocean'
  | 'psych_big_five'
  | 'psych_mmpi'
  | 'psych_epq'
  | 'psych_sixteen_pf'
  | 'psych_rorschach'
  | 'psych_tat'
  | 'psych_attachment_style'
  | 'psych_cultural_eq'
  | 'intel_multiple_intelligences'
  | 'intel_general_iq_raven_chc'
  | 'intel_emotional_intelligence_eq'
  | 'intel_cognitive_aptitude_cogat'
  | 'tiered_assessment';

export interface ResolvedArticleCard {
  kind: 'article';
  id: string;
  titleAr: string;
  titleEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
  readTimeAr: string;
  readTimeEn: string;
  reasonAr: string;
  reasonEn: string;
  route: string;
  icon: string;
}

export interface ResolvedTestCard {
  kind: 'test';
  id: RecommendationTestTargetId;
  titleAr: string;
  titleEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
  reasonAr: string;
  reasonEn: string;
  route: string;
  launchKind: 'compatibility' | 'personality_inline' | 'psych_modal' | 'intelligence_modal' | 'tiered';
  launchParam?: string;
  icon: string;
}

export interface ResolvedNovelCard {
  kind: 'novel' | 'novel_genre';
  id: string;
  novelId?: string;
  genre: NovelGenre;
  titleAr: string;
  titleEn: string;
  categoryLabelAr: string;
  categoryLabelEn: string;
  reasonAr: string;
  reasonEn: string;
  route: string;
  icon: string;
}

export interface NextStepRecommendationBundle {
  group: RecommendationTestGroup;
  sourceTestId: string;
  ruleKey: string;
  article: ResolvedArticleCard;
  test: ResolvedTestCard;
  novel: ResolvedNovelCard;
}

// ============================================================================
// Central Deterministic Catalog Lookups (Reads Directly from Actual Site Data)
// ============================================================================

function findArticleOrFallback(articleId: string): Article {
  const exact = ARTICLES_CATALOG.find((a) => a.id === articleId);
  if (exact) return exact;
  return ARTICLES_CATALOG[0];
}

function findNovelOrFallback(novelId: string): Novel {
  const exact = NOVELS_CATALOG.find((n) => n.id === novelId);
  if (exact) return exact;
  return NOVELS_CATALOG[0];
}

function findGenreOrFallback(genre: NovelGenre): HomeNovelCategory {
  const exact = HOME_NOVEL_CATEGORIES.find((g) => g.genre === genre);
  if (exact) return exact;
  return HOME_NOVEL_CATEGORIES[0];
}

function resolveTestDescriptor(targetId: RecommendationTestTargetId): Omit<ResolvedTestCard, 'reasonAr' | 'reasonEn'> {
  if (targetId === 'compatibility') {
    return {
      kind: 'test',
      id: 'compatibility',
      titleAr: 'اختبار كاشف شريك الحياة والتوافق العاطفي',
      titleEn: 'Partner Compatibility Detector Assessment',
      categoryLabelAr: 'التوافق الفكري والعاطفي',
      categoryLabelEn: 'Relational Compatibility',
      route: '/compatibility',
      launchKind: 'compatibility',
      icon: '💞',
    };
  }

  if (targetId === 'mbti_16types' || targetId === 'big_five_ocean') {
    const pTest =
      PERSONALITY_TESTS_CATALOG.find((t) => t.id === targetId) || PERSONALITY_TESTS_CATALOG[0];
    return {
      kind: 'test',
      id: targetId,
      titleAr: pTest.titleAr,
      titleEn: pTest.titleEn,
      categoryLabelAr: pTest.subtitleAr,
      categoryLabelEn: pTest.subtitleEn,
      route: '/personality-tests',
      launchKind: 'personality_inline',
      launchParam: pTest.id,
      icon: '🧬',
    };
  }

  if (targetId === 'tiered_assessment') {
    const tier = ANALYSIS_TIERS_CATALOG[1] || ANALYSIS_TIERS_CATALOG[0];
    return {
      kind: 'test',
      id: 'tiered_assessment',
      titleAr: `مختبر التحليل النفسي المتدرج (${tier.titleAr})`,
      titleEn: `Tiered Psychometric Lab (${tier.titleEn})`,
      categoryLabelAr: 'تقييم سيكومتري متعدد المحاور',
      categoryLabelEn: 'Multi-Axis Psychometric Suite',
      route: '/personality-tests',
      launchKind: 'tiered',
      launchParam: tier.id,
      icon: '📊',
    };
  }

  if (targetId.startsWith('psych_')) {
    const psychId = targetId.replace('psych_', '') as AssessmentType;
    const found = ASSESSMENTS_CATALOG.find((a) => a.id === psychId) || ASSESSMENTS_CATALOG[0];
    return {
      kind: 'test',
      id: targetId,
      titleAr: found.titleAr,
      titleEn: found.titleEn,
      categoryLabelAr: found.categoryTitleAr,
      categoryLabelEn: 'Specialized Psychometric Scale',
      route: '/personality-tests',
      launchKind: 'psych_modal',
      launchParam: found.id,
      icon: '🧠',
    };
  }

  const batteryId = targetId.replace('intel_', '') as IntelligenceBatteryType;
  const battery =
    INTELLIGENCE_BATTERIES_CATALOG.find((b) => b.id === batteryId) ||
    INTELLIGENCE_BATTERIES_CATALOG[0];
  return {
    kind: 'test',
    id: targetId,
    titleAr: battery.titleAr,
    titleEn: battery.titleEn,
    categoryLabelAr: 'مختبر الذكاء والقدرات المعرفية',
    categoryLabelEn: 'Cognitive & Intelligence Lab',
    route: '/iq-tests',
    launchKind: 'intelligence_modal',
    launchParam: battery.id,
    icon: battery.icon || '💡',
  };
}

interface MappingSpec {
  ruleKey: string;
  articleId: string;
  articleReasonAr: string;
  articleReasonEn: string;
  testId: RecommendationTestTargetId;
  testReasonAr: string;
  testReasonEn: string;
  novelMode: 'novel' | 'genre';
  novelId?: string;
  novelGenre: NovelGenre;
  novelReasonAr: string;
  novelReasonEn: string;
}

function buildBundle(
  group: RecommendationTestGroup,
  sourceTestId: string,
  spec: MappingSpec,
  excludedTestIds: RecommendationTestTargetId[] = []
): NextStepRecommendationBundle {
  const art = findArticleOrFallback(spec.articleId);

  // Deterministic anti-self-repetition & anti-duplication guard for Test
  const orderedFallbackTests: RecommendationTestTargetId[] = [
    'compatibility',
    'intel_emotional_intelligence_eq',
    'psych_attachment_style',
    'mbti_16types',
    'big_five_ocean',
    'intel_multiple_intelligences',
    'psych_sixteen_pf',
    'tiered_assessment',
  ];

  let resolvedTargetTestId = spec.testId;
  if (excludedTestIds.includes(resolvedTargetTestId)) {
    const replacement = orderedFallbackTests.find((t) => !excludedTestIds.includes(t));
    if (replacement) {
      resolvedTargetTestId = replacement;
    }
  }
  const testDesc = resolveTestDescriptor(resolvedTargetTestId);

  let novelCard: ResolvedNovelCard;
  if (spec.novelMode === 'novel' && spec.novelId) {
    const nv = findNovelOrFallback(spec.novelId);
    const cat = findGenreOrFallback(nv.genre);
    novelCard = {
      kind: 'novel',
      id: nv.id,
      novelId: nv.id,
      genre: nv.genre,
      titleAr: nv.titleAr,
      titleEn: nv.titleEn || cat.titleEn,
      categoryLabelAr: nv.genreLabelAr || cat.titleAr,
      categoryLabelEn: nv.genreLabelEn || cat.titleEn,
      reasonAr: spec.novelReasonAr,
      reasonEn: spec.novelReasonEn,
      route: `/novels/${encodeURIComponent(nv.id)}`,
      icon: cat.icon || '📖',
    };
  } else {
    const cat = findGenreOrFallback(spec.novelGenre);
    novelCard = {
      kind: 'novel_genre',
      id: `genre_${cat.genre}`,
      genre: cat.genre,
      titleAr: cat.titleAr,
      titleEn: cat.titleEn,
      categoryLabelAr: 'تصنيف من مكتبة الروايات والقصص',
      categoryLabelEn: 'Novels & Stories Genre',
      reasonAr: spec.novelReasonAr,
      reasonEn: spec.novelReasonEn,
      route: '/novels',
      icon: cat.icon || '📚',
    };
  }

  return {
    group,
    sourceTestId,
    ruleKey: spec.ruleKey,
    article: {
      kind: 'article',
      id: art.id,
      titleAr: art.title,
      titleEn: art.titleEn,
      categoryLabelAr: art.categoryLabelAr,
      categoryLabelEn: art.categoryLabelEn,
      readTimeAr: art.readTime,
      readTimeEn: art.readTimeEn,
      reasonAr: spec.articleReasonAr,
      reasonEn: spec.articleReasonEn,
      route: `/articles/${encodeURIComponent(art.id)}`,
      icon: art.icon || '📖',
    },
    test: {
      ...testDesc,
      reasonAr: spec.testReasonAr,
      reasonEn: spec.testReasonEn,
    },
    novel: novelCard,
  };
}

// ============================================================================
// 1. DETERMINISTIC PERSONALITY RULES (MBTI, Big Five, 16PF, EPQ, ECR-R, etc.)
// ============================================================================

export function getMBTIRecommendations(input: {
  typeCode?: string;
  percentages?: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}): NextStepRecommendationBundle {
  const code = (input.typeCode || '').toUpperCase();
  const pct = input.percentages;

  // Compute deterministic margin per dominant pole when percentages exist
  const polePriority: Array<{ pole: string; score: number }> = pct
    ? [
        { pole: 'I', score: pct.I },
        { pole: 'E', score: pct.E },
        { pole: 'N', score: pct.N },
        { pole: 'F', score: pct.F },
        { pole: 'T', score: pct.T },
        { pole: 'J', score: pct.J },
        { pole: 'S', score: pct.S },
        { pole: 'P', score: pct.P },
      ].sort((a, b) => b.score - a.score)
    : [];

  const strongestPole = polePriority[0]?.pole || code[0] || '';

  // Rule 1: High Introversion (I >= 60 or dominant pole I)
  if ((pct && pct.I >= 60 && pct.I >= pct.E) || (!pct && code.startsWith('I') && strongestPole === 'I')) {
    return buildBundle(
      'personality',
      'mbti_16types',
      {
        ruleKey: 'mbti_introversion_dominant',
        articleId: 'article-1-introverted-personality-inner-world-hidden-power',
        articleReasonAr: `لأن مؤشر الانطواء التأملي لديك بارز (${pct?.I ?? code})، يوضح هذا المقال كيفية استثمار طاقتك الداخلية في بناء توازنك وعلاقاتك.`,
        articleReasonEn: `Because your reflective introversion score is prominent (${pct?.I ?? code}), this study explores harnessing inner depth in life and relationships.`,
        testId: 'psych_attachment_style',
        testReasonAr: 'لفهم أسلوب قربك العاطفي واحتياجاتك من الأمان والمساحة الشخصية مع الشريك.',
        testReasonEn: 'Explore your emotional attachment pattern and healthy balance between closeness and autonomy.',
        novelMode: 'novel',
        novelId: 'digital-companion-illusion-ai-records',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'قصص سيكولوجية تتأمل العزلة الداخلية، الحوار الذاتي، والحاجة إلى حضور إنساني حقيقي.',
        novelReasonEn: 'Clinical stories exploring solitude, inner dialogue, and authentic human presence.',
      },
      ['mbti_16types']
    );
  }

  // Rule 2: High Extraversion (E >= 60 or dominant pole E)
  if ((pct && pct.E >= 60 && pct.E > pct.I) || strongestPole === 'E') {
    return buildBundle(
      'personality',
      'mbti_16types',
      {
        ruleKey: 'mbti_extraversion_dominant',
        articleId: 'article-2-social-extraverted-personality-energy-dynamics',
        articleReasonAr: `بناءً على حيويتك الاجتماعية البارزة (${pct?.E ?? code})، يضع المقال قواعد إدارة الطاقة ومنع الإرهاق التفاعلي.`,
        articleReasonEn: `Tailored to your high social vitality (${pct?.E ?? code}), explaining how to channel energy without social burnout.`,
        testId: 'psych_cultural_eq',
        testReasonAr: 'لقياس مهارات اللباقة الاجتماعية والتعاطف التفاعلي عبر الثقافات والشخصيات.',
        testReasonEn: 'Measure your social empathy, emotional regulation, and interpersonal diplomacy.',
        novelMode: 'novel',
        novelId: 'fi_baytina_yasmin',
        novelGenre: 'romance',
        novelReasonAr: 'رواية اجتماعية دافئة تحتفي بالعلاقات الإنسانية الصادقة والمروءة والتواصل المجتمعي.',
        novelReasonEn: 'A warm social novel celebrating authentic bonds, chivalry, and community ties.',
      },
      ['mbti_16types']
    );
  }

  // Rule 3: Analytical Thinkers (N+T or dominant T)
  if ((code.includes('N') && code.includes('T')) || strongestPole === 'T') {
    return buildBundle(
      'personality',
      'mbti_16types',
      {
        ruleKey: 'mbti_analytical_thinking',
        articleId: 'clinic-emotional-intelligence-why-smart-people-fail-in-love',
        articleReasonAr: `لأنك تميل إلى التفكير التحليلي (${code})، يشرح هذا المقال لماذا لا يكفي المنطق وحده لإنجاح الروابط الوجدانية.`,
        articleReasonEn: `Matched to your analytical profile (${code}), showing why logic alone isn’t enough without emotional attunement.`,
        testId: 'intel_emotional_intelligence_eq',
        testReasonAr: 'لاختبار قدرتك العملية على قراءة المشاعر وإدارة المواقف الانفعالية وفق نموذج Bar-On وMSCEIT.',
        testReasonEn: 'Benchmark your applied emotional decoding and regulation using Bar-On & MSCEIT scenarios.',
        novelMode: 'novel',
        novelId: 'android_cipher_quantum',
        novelGenre: 'sci_fi_future',
        novelReasonAr: 'رواية خيال علمي وهندسة عكسية تخاطب شغفك بالتحليل المنطقي وفك الشيفرات المعقدة.',
        novelReasonEn: 'A hard sci-fi reverse-engineering thriller tailored to logical and strategic minds.',
      },
      ['mbti_16types']
    );
  }

  // Rule 4: Idealistic / Empathic Feelers (N+F or dominant F)
  if ((code.includes('N') && code.includes('F')) || strongestPole === 'F') {
    return buildBundle(
      'personality',
      'mbti_16types',
      {
        ruleKey: 'mbti_empathic_feeling',
        articleId: 'ei-article-2-precise-anatomy-and-science-of-emotion-regulation',
        articleReasonAr: `بناءً على رجحان البُعد الشعوري والحدسي (${code})، يقدم المقال تشريحاً علمياً لإدارة المشاعر المرهفة.`,
        articleReasonEn: `Aligned with your intuitive-feeling orientation (${code}), detailing the science of healthy emotion regulation.`,
        testId: 'compatibility',
        testReasonAr: 'لاكتشاف مواصفات الشريك المتناغم وجدانياً وفكرياً مع طبيعتك المرهفة.',
        testReasonEn: 'Discover the partner profile that harmonizes with your emotional depth and values.',
        novelMode: 'novel',
        novelId: 'screen-shadows-secret-clinic-records',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'قصص إنسانية عميقة تستكشف هشاشة المشاعر والحاجة إلى الأمان النفسي في العلاقات.',
        novelReasonEn: 'Deeply human clinical stories examining vulnerability and psychological safety.',
      },
      ['mbti_16types']
    );
  }

  // Rule 5: Structured / Judging & Sensing Strategists (S+J or dominant J/S)
  if ((code.includes('S') && code.includes('J')) || strongestPole === 'J' || strongestPole === 'S') {
    return buildBundle(
      'personality',
      'mbti_16types',
      {
        ruleKey: 'mbti_structured_executive',
        articleId: 'article-3-leadership-personalities-core-traits-effective-performance',
        articleReasonAr: `يتقاطع مع ميلك للتنظيم والحسم (${code}) عبر دراسة السمات القيادية والأداء المتوازن.`,
        articleReasonEn: `Matches your structured and decisive tendencies (${code}) with leadership trait science.`,
        testId: 'psych_sixteen_pf',
        testReasonAr: 'لتحليل عواملك الـ 16 بدقة معيارية (الضمير، القيادة، الثبات الانفعالي، والدقة).',
        testReasonEn: 'Measure your 16 foundational Cattell personality factors including order, leadership, and stability.',
        novelMode: 'novel',
        novelId: 'room_104_cipher',
        novelGenre: 'crime_mystery',
        novelReasonAr: 'رواية تحقيقات تعتمد على الملاحظة الدقيقة، ربط الأدلة الواقعية، والانضباط التحليلي.',
        novelReasonEn: 'A locked-room forensic mystery built on keen observation and methodical deduction.',
      },
      ['mbti_16types']
    );
  }

  // Fixed deterministic fallback for MBTI
  return buildBundle(
    'personality',
    'mbti_16types',
    {
      ruleKey: 'mbti_default_fallback',
      articleId: 'article-4-big-five-comprehensive-analysis-map-of-human-personality',
      articleReasonAr: 'مرجع شامل يوسّع قراءتك لشخصيتك عبر نموذج العوامل الخمسة الكبرى العلمي.',
      articleReasonEn: 'A comprehensive guide expanding your MBTI profile through the Big Five scientific framework.',
      testId: 'big_five_ocean',
      testReasonAr: 'مقياس العوامل الخمسة الكبرى لقياس درجاتك في الانفتاح، الضمير، الانبساط، الوفاق، والاتزان.',
      testReasonEn: 'Measure your exact percentages across Openness, Conscientiousness, Extraversion, Agreeableness, and Stability.',
      novelMode: 'genre',
      novelGenre: 'clinical_stories',
      novelReasonAr: 'قصص سيكولوجية تتناول تنوع الأنماط البشرية وصراعاتها الواقعية بعمق أدبي.',
      novelReasonEn: 'Psychological narratives portraying diverse personality archetypes and inner journeys.',
    },
    ['mbti_16types']
  );
}

export function getBigFiveRecommendations(
  scores: { O?: number; C?: number; E?: number; A?: number; ES?: number },
  sourceId: 'big_five_ocean' | 'psych_big_five' = 'big_five_ocean'
): NextStepRecommendationBundle {
  const safe = {
    O: typeof scores.O === 'number' ? scores.O : 50,
    C: typeof scores.C === 'number' ? scores.C : 50,
    E: typeof scores.E === 'number' ? scores.E : 50,
    A: typeof scores.A === 'number' ? scores.A : 50,
    ES: typeof scores.ES === 'number' ? scores.ES : 50,
  };

  // Priority rule: If Emotional Stability is significantly low (< 45), support stress/anxiety resilience first
  if (safe.ES < 45) {
    return buildBundle(
      'personality',
      sourceId,
      {
        ruleKey: 'big_five_low_emotional_stability',
        articleId: 'ei-article-6-stress-and-emotion-management-resilience-shield',
        articleReasonAr: `سجل بُعد الاتزان الانفعالي لديك ${safe.ES}%، لذا يزودك هذا المقال ببروتوكولات عملية لبناء المرونة النفسية وتهدئة التوتر.`,
        articleReasonEn: `With Emotional Stability at ${safe.ES}%, this article equips you with evidence-based stress resilience protocols.`,
        testId: 'psych_attachment_style',
        testReasonAr: 'لفهم علاقة الحساسية الانفعالية بأسلوب تعلقك العاطفي ومصادر الطمأنينة في العلاقات.',
        testReasonEn: 'Examine how emotional sensitivity interacts with your relational attachment security.',
        novelMode: 'novel',
        novelId: 'screen-shadows-secret-clinic-records',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'حكايات إنسانية تعالج الضغوط الداخلية والقلق اليومي وتفتح نافذة للتعافي الهادئ.',
        novelReasonEn: 'Clinical stories addressing inner anxiety and pathways toward calm emotional recovery.',
      },
      [sourceId, 'big_five_ocean', 'psych_big_five']
    );
  }

  // Deterministic ranking of top trait with explicit tie-break order O -> C -> A -> E -> ES
  const rawTraits: Array<{ key: 'O' | 'C' | 'A' | 'E' | 'ES'; score: number }> = [
    { key: 'O', score: safe.O },
    { key: 'C', score: safe.C },
    { key: 'A', score: safe.A },
    { key: 'E', score: safe.E },
    { key: 'ES', score: safe.ES },
  ];
  const ranked = rawTraits.sort((a, b) => b.score - a.score);

  const top = ranked[0];

  switch (top.key) {
    case 'O':
      return buildBundle(
        'personality',
        sourceId,
        {
          ruleKey: 'big_five_top_openness',
          articleId: 'article-4-big-five-comprehensive-analysis-map-of-human-personality',
          articleReasonAr: `بما أن «الانفتاح الفكري» هو السمة الأعلى لديك (${top.score}%)، يساعدك المقال على استثمار فضولك الإبداعي عبر خريطة OCEAN.`,
          articleReasonEn: `Openness is your leading trait (${top.score}%); this guide maps how creative curiosity interacts with other factors.`,
          testId: 'intel_multiple_intelligences',
          testReasonAr: 'لاكتشاف أي الذكاءات التسعة (الوجودي، اللغوي، البصري، المنطقي...) يغذي فضولك المعرفي.',
          testReasonEn: 'Identify which of the 9 Multiple Intelligences best channels your intellectual curiosity.',
          novelMode: 'novel',
          novelId: 'magnetic_rift_guardians',
          novelGenre: 'sci_fantasy',
          novelReasonAr: 'عمل سردي يجمع بين الخيال الإبداعي والرمزية الفلسفية لمحبي العوالم الفكرية الجديدة.',
          novelReasonEn: 'An imaginative sci-fantasy narrative crafted for curious, exploratory minds.',
        },
        [sourceId, 'big_five_ocean', 'psych_big_five']
      );

    case 'C':
      return buildBundle(
        'personality',
        sourceId,
        {
          ruleKey: 'big_five_top_conscientiousness',
          articleId: 'article-3-leadership-personalities-core-traits-effective-performance',
          articleReasonAr: `تتصدر سمة «يقظة الضمير والانضباط» نتيجتك (${top.score}%)، ويربط المقال بين التنظيم الشخصي والأداء القيادي الفعال.`,
          articleReasonEn: `Conscientiousness leads your profile (${top.score}%); learn how structured discipline drives effective leadership.`,
          testId: 'intel_cognitive_aptitude_cogat',
          testReasonAr: 'لقياس سرعة اتخاذ القرار والقدرات التنفيذية اللفظية والكمية في بطارية CogAT.',
          testReasonEn: 'Benchmark your analytical speed and structured problem-solving in the CogAT cognitive battery.',
          novelMode: 'novel',
          novelId: 'room_104_cipher',
          novelGenre: 'crime_mystery',
          novelReasonAr: 'رواية تحقيقات محكمة البناء تلائم عقليتك المنظمة وشغفك بالتفاصيل الدقيقة.',
          novelReasonEn: 'A tightly structured detective mystery suiting your precision and love for detail.',
        },
        [sourceId, 'big_five_ocean', 'psych_big_five']
      );

    case 'A':
      return buildBundle(
        'personality',
        sourceId,
        {
          ruleKey: 'big_five_top_agreeableness',
          articleId: 'rel-article-1-emotional-compatibility-destiny-or-chemistry',
          articleReasonAr: `لأن «الوفاق والتعاطف» هو الأعلى في ملفك (${top.score}%)، يوضح المقال كيفية تحويل اللطف إلى توافق علائقي ناضج دون تضحية بالحدود.`,
          articleReasonEn: `Agreeableness tops your profile (${top.score}%); discover how empathy builds healthy chemistry with firm boundaries.`,
          testId: 'compatibility',
          testReasonAr: 'لاستكشاف الشريك الذي يقدّر عطائك العاطفي ويبادلك الوفاء والاتزان.',
          testReasonEn: 'Explore the partner profile that reciprocates your warmth and relational harmony.',
          novelMode: 'novel',
          novelId: 'fi_baytina_yasmin',
          novelGenre: 'romance',
          novelReasonAr: 'رواية إنسانية عذبة عن المروءة والوفاء الأسري والروابط الوجدانية النقية.',
          novelReasonEn: 'A heartfelt novel of loyalty, integrity, and deep interpersonal warmth.',
        },
        [sourceId, 'big_five_ocean', 'psych_big_five']
      );

    case 'E':
      return buildBundle(
        'personality',
        sourceId,
        {
          ruleKey: 'big_five_top_extraversion',
          articleId: 'article-2-social-extraverted-personality-energy-dynamics',
          articleReasonAr: `مع تصدر «الانبساط والحيوية الاجتماعية» (${top.score}%)، يقدم المقال توازناً عملياً بين التأثير الاجتماعي وحفظ الطاقة.`,
          articleReasonEn: `Extraversion is your peak trait (${top.score}%); this article covers social influence and energy balance.`,
          testId: 'psych_cultural_eq',
          testReasonAr: 'لقياس ذكائك الاجتماعي وقدرتك على قراءة الإشارات الثقافية والعاطفية للآخرين.',
          testReasonEn: 'Assess your social dexterity, cultural awareness, and interpersonal empathy.',
          novelMode: 'genre',
          novelGenre: 'romance',
          novelReasonAr: 'تصنيف يضم قصصاً اجتماعية وعاطفية نابضة بالتفاعل الإنساني والحوار الحي.',
          novelReasonEn: 'Explore social and romantic narratives rich with human interaction and warmth.',
        },
        [sourceId, 'big_five_ocean', 'psych_big_five']
      );

    case 'ES':
    default:
      return buildBundle(
        'personality',
        sourceId,
        {
          ruleKey: 'big_five_top_stability',
          articleId: 'ei-article-5-self-development-and-self-confidence-neural-architecture',
          articleReasonAr: `تبرز صلابـتك و«اتزانك الانفعالي» (${top.score}%)، ويستعرض المقال البنية العصبية لتعزيز الثقة الراسخة والنمو الذاتي.`,
          articleReasonEn: `Emotional Stability leads your profile (${top.score}%); discover the neural architecture of grounded growth.`,
          testId: 'psych_sixteen_pf',
          testReasonAr: 'لرسم خريطة موسعة من 16 عاملاً سيكومترياً تكشف تفاصيل شخصيتك القيادية والعلائقية.',
          testReasonEn: 'Map 16 detailed psychometric factors across leadership, composure, and warmth.',
          novelMode: 'novel',
          novelId: 'black_scorpion_protocol',
          novelGenre: 'tactical_action',
          novelReasonAr: 'رواية إثارة وتحدٍّ تكتيكي تبرز ثبات الأعصاب واتخاذ القرار تحت الضغط العالي.',
          novelReasonEn: 'A high-stakes tactical thriller showcasing composure and decisive action under pressure.',
        },
        [sourceId, 'big_five_ocean', 'psych_big_five']
      );
  }
}

export function getPsychologySuiteRecommendations(
  report: PsychometricReport
): NextStepRecommendationBundle {
  const testId = report.testId;

  // Big Five inside PsychologyTestsModal
  if (testId === 'big_five') {
    const getS = (k: string) => report.dimensionScores.find((d) => d.key === k)?.score ?? 50;
    return getBigFiveRecommendations(
      {
        O: getS('openness'),
        C: getS('conscientiousness'),
        E: getS('extraversion'),
        A: getS('agreeableness'),
        ES: getS('emotional_stability'),
      },
      'psych_big_five'
    );
  }

  const sortedDims = [...report.dimensionScores].sort((a, b) => b.score - a.score);
  const topDim = sortedDims[0];
  const lowDim = sortedDims[sortedDims.length - 1];

  // Attachment Style (ECR-R)
  if (testId === 'attachment_style') {
    const calmScore =
      report.dimensionScores.find((d) => d.key === 'calm_reassurance')?.score ?? 55;
    if (calmScore < 55) {
      return buildBundle(
        'personality',
        'psych_attachment_style',
        {
          ruleKey: 'psych_attachment_elevated_anxiety',
          articleId: 'rel-article-2-attachment-styles-hidden-maps-of-relationships',
          articleReasonAr: `بناءً على مؤشر الاطمئنان العلائقي (${calmScore}%)، يفكك المقال فخ القلق والتجنب ويشرح خطوات بناء الأمان المكتسب.`,
          articleReasonEn: `With relational reassurance at ${calmScore}%, this article explains breaking anxious-avoidant cycles toward earned security.`,
          testId: 'intel_emotional_intelligence_eq',
          testReasonAr: 'لتدريب مهارة التهدئة الانفعالية وإدارة الحساسية وقت التوتر العاطفي.',
          testReasonEn: 'Strengthen emotional self-regulation and distress tolerance with MSCEIT/Bar-On scenarios.',
          novelMode: 'novel',
          novelId: 'screen-shadows-secret-clinic-records',
          novelGenre: 'clinical_stories',
          novelReasonAr: 'سجلات عيادية تستكشف التعلق العاطفي وكيف يعيد الوعي ترميم القلوب المرهقة.',
          novelReasonEn: 'Clinical stories exploring attachment wounds and mindful emotional healing.',
        },
        ['psych_attachment_style']
      );
    }

    if (topDim?.key === 'conflict_repair') {
      return buildBundle(
        'personality',
        'psych_attachment_style',
        {
          ruleKey: 'psych_attachment_conflict_repair',
          articleId: 'rel-article-4-why-relationships-fail-scientific-anatomy-of-collapse',
          articleReasonAr: `لأن «مهارة إصلاح الخلاف» هي الأبرز لديك (${topDim.score}%)، يعرض المقال تشريح غوتمان للانهيار وترياقه العيادي.`,
          articleReasonEn: `Conflict Repair tops your results (${topDim.score}%); explore Gottman’s antidotes to relational collapse.`,
          testId: 'compatibility',
          testReasonAr: 'لاختبار مؤشرات التوافق الفعلي وأسلوب إدارة الخلاف مع شريك الحياة.',
          testReasonEn: 'Assess your real-world compatibility and shared conflict navigation.',
          novelMode: 'novel',
          novelId: 'fi_baytina_yasmin',
          novelGenre: 'romance',
          novelReasonAr: 'رواية وجدانية تبرز كيف تحفظ المروءة والصدق الهادئ دفء البيوت رغم التحديات.',
          novelReasonEn: 'A sincere social romance showing how integrity and patience protect bonds.',
        },
        ['psych_attachment_style']
      );
    }

    return buildBundle(
      'personality',
      'psych_attachment_style',
      {
        ruleKey: 'psych_attachment_secure_balance',
        articleId: 'rel-article-3-healthy-love-biological-chemistry-psychological-building',
        articleReasonAr: `بناءً على تصدر «${topDim?.labelAr.split('(')[0].trim() || 'القاعدة الآمنة'}» (${topDim?.score ?? 65}%)، يستعرض المقال ركائز الحب الصحي المستدام.`,
        articleReasonEn: `Led by "${topDim?.key || 'secure attachment'}" (${topDim?.score ?? 65}%), this study details the pillars of healthy enduring love.`,
        testId: 'compatibility',
        testReasonAr: 'لتطبيق بصمتك الآمنة في استكشاف شريك الحياة المتناغم فكرياً وعاطفياً.',
        testReasonEn: 'Apply your secure relational profile inside the Partner Compatibility Detector.',
        novelMode: 'novel',
        novelId: 'fi_baytina_yasmin',
        novelGenre: 'romance',
        novelReasonAr: 'قصة حب عفيفة وعائلية تجسد السكينة والاعتماد العاطفي المتبادل.',
        novelReasonEn: 'An authentic story embodying mutual emotional safety and chivalric devotion.',
      },
      ['psych_attachment_style']
    );
  }

  // Eysenck EPQ-R (4 Temperaments)
  if (testId === 'epq') {
    const ex = report.dimensionScores.find((d) => d.key === 'eysenck_extraversion')?.score ?? 50;
    const st = report.dimensionScores.find((d) => d.key === 'eysenck_stability')?.score ?? 50;

    if (ex < 52 && st < 52) {
      return buildBundle(
        'personality',
        'psych_epq',
        {
          ruleKey: 'epq_melancholic_profile',
          articleId: 'article-1-introverted-personality-inner-world-hidden-power',
          articleReasonAr: `نتيجتك تعكس عمقاً تأملياً وحساسية انفعالية (الاستقرار ${st}%)، ويساعدك هذا المقال على تحويل العزلة الهادئة إلى مصدر قوة.`,
          articleReasonEn: `Your temperament pairs deep reflection with sensitivity (Stability ${st}%); learn to turn solitude into quiet strength.`,
          testId: 'tiered_assessment',
          testReasonAr: 'لتحليل معمق يربط مزاجك العصبي بنمط تعلقك وإدارة التوتر.',
          testReasonEn: 'Run a multi-axis tiered evaluation connecting temperament with attachment and regulation.',
          novelMode: 'novel',
          novelId: 'digital-companion-illusion-ai-records',
          novelGenre: 'clinical_stories',
          novelReasonAr: 'مجموعة قصصية عيادية تحاور الشخصيات العميقة الباحثة عن الأمان والصدق النفسي.',
          novelReasonEn: 'Clinical stories resonating with introspective minds seeking authentic connection.',
        },
        ['psych_epq']
      );
    }

    if (ex >= 52 && st < 52) {
      return buildBundle(
        'personality',
        'psych_epq',
        {
          ruleKey: 'epq_choleric_profile',
          articleId: 'ei-article-2-precise-anatomy-and-science-of-emotion-regulation',
          articleReasonAr: `يمزج مزاجك بين الانطلاق القيادي (${ex}%) والحساسية السريعة للضغط، مما يجعل ضبط الانفعال أولوية عملية.`,
          articleReasonEn: `Your choleric energy combines drive (${ex}%) with high reactivity, making emotion regulation key.`,
          testId: 'intel_emotional_intelligence_eq',
          testReasonAr: 'لصقل مهارة التهدئة اللحظية واتخاذ قرارات متزنة تحت الضغط الانفعالي.',
          testReasonEn: 'Sharpen moment-to-moment emotional calibration under interpersonal stress.',
          novelMode: 'novel',
          novelId: 'black_scorpion_protocol',
          novelGenre: 'tactical_action',
          novelReasonAr: 'رواية إيقاعها متسارع وحاسم تعكس طاقة المبادرة والتحدي وتحتبر ضبط الأعصاب.',
          novelReasonEn: 'A fast-paced action thriller matching proactive energy and high-pressure decisions.',
        },
        ['psych_epq']
      );
    }

    if (ex >= 52 && st >= 52) {
      return buildBundle(
        'personality',
        'psych_epq',
        {
          ruleKey: 'epq_sanguine_profile',
          articleId: 'article-2-social-extraverted-personality-energy-dynamics',
          articleReasonAr: `يتميز مزاجك بالحيوية الاجتماعية (${ex}%) والثبات الانفعالي (${st}%)، ويعرض المقال طرق استدامة هذا الزخم الإيجابي.`,
          articleReasonEn: `Your sanguine temperament pairs high sociability (${ex}%) with stability (${st}%); sustain your vitality smartly.`,
          testId: 'compatibility',
          testReasonAr: 'لمطابقة حيويتك المتوازنة مع شريك يكمل إشراقتك الاجتماعية بالدفء والرسوخ.',
          testReasonEn: 'Match your upbeat, stable temperament with a complementary life partner.',
          novelMode: 'genre',
          novelGenre: 'romance',
          novelReasonAr: 'روايات إنسانية دافئة ومشرقة تلائم طبيعتك المتفائلة والمحبة للتواصل.',
          novelReasonEn: 'Warm, uplifting social novels fitting an optimistic and communicative spirit.',
        },
        ['psych_epq']
      );
    }

    return buildBundle(
      'personality',
      'psych_epq',
      {
        ruleKey: 'epq_phlegmatic_profile',
        articleId: 'ei-article-5-self-development-and-self-confidence-neural-architecture',
        articleReasonAr: `يعكس مزاجك البلغمي سكينة وثباتاً عالياً (${st}%) مع هدوء اجتماعي، ويدعم المقال توظيف هذا الاتزان في النمو الذاتي.`,
        articleReasonEn: `Your phlegmatic composure (${st}% stability) is a solid anchor for deliberate personal growth.`,
        testId: 'psych_sixteen_pf',
        testReasonAr: 'لاكتشاف أدق 16 سمة تكمن خلف هدوئك وثباتك الانفعالي.',
        testReasonEn: 'Uncover the 16 nuanced psychometric traits behind your calm demeanor.',
        novelMode: 'novel',
        novelId: 'fi_baytina_yasmin',
        novelGenre: 'romance',
        novelReasonAr: 'رواية هادئة الإيقاع عميقة المعاني تحتفي بالسكينة والوفاء والأصالة.',
        novelReasonEn: 'A serene, deeply meaningful novel celebrating steadiness and loyalty.',
      },
      ['psych_epq']
    );
  }

  // Cattell 16PF
  if (testId === 'sixteen_pf') {
    const key = topDim?.key || 'stability';
    if (['reasoning', 'abstractedness', 'openness_to_change', 'vigilance'].includes(key)) {
      return buildBundle(
        'personality',
        'psych_sixteen_pf',
        {
          ruleKey: '16pf_cognitive_exploratory',
          articleId: 'intellectual-compatibility-secrets',
          articleReasonAr: `تصدّر العامل «${topDim.labelAr.split(':')[1]?.split('(')[0]?.trim() || key}» (${topDim.score}%)، ويركز المقال على التوافق الفكري والحوار العقلاني.`,
          articleReasonEn: `Factor "${topDim.factorCode || key}" (${topDim.score}%) led your 16PF results; explore intellectual dialogue dynamics.`,
          testId: 'intel_general_iq_raven_chc',
          testReasonAr: 'لاختبار قدراتك الاستدلالية والتجريدية في مصفوفات رافين ونموذج CHC.',
          testReasonEn: 'Challenge your fluid and abstract reasoning via Raven’s Progressive Matrices.',
          novelMode: 'novel',
          novelId: 'android_cipher_quantum',
          novelGenre: 'sci_fi_future',
          novelReasonAr: 'رواية خيال علمي تقنية تستجيب لفضولك التحليلي وانفتاحك على الأفكار المتقدمة.',
          novelReasonEn: 'A technical sci-fi thriller tailored to high analytical and exploratory scores.',
        },
        ['psych_sixteen_pf']
      );
    }

    if (['rule_consciousness', 'perfectionism', 'dominance', 'self_reliance'].includes(key)) {
      return buildBundle(
        'personality',
        'psych_sixteen_pf',
        {
          ruleKey: '16pf_executive_structured',
          articleId: 'article-3-leadership-personalities-core-traits-effective-performance',
          articleReasonAr: `لأن سمة «${topDim.labelAr.split(':')[1]?.split('(')[0]?.trim() || key}» (${topDim.score}%) هي الأبرز، يعزز المقال فعالية القيادة المتزنة.`,
          articleReasonEn: `Your top 16PF factor (${topDim.factorCode || key} at ${topDim.score}%) aligns with structured executive performance.`,
          testId: 'intel_cognitive_aptitude_cogat',
          testReasonAr: 'لتقييم سرعة المعالجة واتخاذ القرار في اختبارات CogAT & Wonderlic.',
          testReasonEn: 'Measure decision speed and executive cognitive aptitude.',
          novelMode: 'novel',
          novelId: 'room_104_cipher',
          novelGenre: 'crime_mystery',
          novelReasonAr: 'لغز بوليسي يعتمد على الصرامة المنهجية والانضباط المنطقي في كشف الحقائق.',
          novelReasonEn: 'A forensic mystery driven by disciplined methodology and precision.',
        },
        ['psych_sixteen_pf']
      );
    }

    return buildBundle(
      'personality',
      'psych_sixteen_pf',
      {
        ruleKey: '16pf_warmth_relational',
        articleId: 'rel-article-3-healthy-love-biological-chemistry-psychological-building',
        articleReasonAr: `مع بروز عامل «${topDim?.labelAr.split(':')[1]?.split('(')[0]?.trim() || 'الدفء والاستقرار'}» (${topDim?.score ?? 65}%)، يناقش المقال أسس العلاقات الصحية المستقرة.`,
        articleReasonEn: `With ${topDim?.factorCode || 'Warmth/Stability'} leading at ${topDim?.score ?? 65}%, explore how warmth anchors healthy love.`,
        testId: 'compatibility',
        testReasonAr: 'لترجمة عوامل شخصيتك الـ 16 إلى خريطة توافق شاملة مع شريك الحياة.',
        testReasonEn: 'Translate your 16PF traits into a holistic partner compatibility blueprint.',
        novelMode: 'novel',
        novelId: 'fi_baytina_yasmin',
        novelGenre: 'romance',
        novelReasonAr: 'رواية إنسانية تعكس الدفء العائلي والالتزام القيمي والتناغم الوجداني.',
        novelReasonEn: 'A heartfelt novel mirroring emotional warmth and moral constancy.',
      },
      ['psych_sixteen_pf']
    );
  }

  // Cultural EQ (Goleman & Hofstede)
  if (testId === 'cultural_eq') {
    const key = topDim?.key || 'self_regulation';
    if (key === 'self_regulation' || key === 'forgiveness_grace') {
      return buildBundle(
        'personality',
        'psych_cultural_eq',
        {
          ruleKey: 'cultural_eq_regulation',
          articleId: 'ei-article-2-precise-anatomy-and-science-of-emotion-regulation',
          articleReasonAr: `تفوقك في «${topDim.labelAr.split('(')[0].trim()}» (${topDim.score}%) يرتبط مباشرة بآليات ضبط الانفعال العصبية في هذا المقال.`,
          articleReasonEn: `Your lead in ${topDim.key} (${topDim.score}%) connects directly to the neuroscience of emotion regulation.`,
          testId: 'compatibility',
          testReasonAr: 'لاختبار كيف يدعم نضجك الانفعالي والتغافل الكريم انسجامك مع شريك الحياة.',
          testReasonEn: 'See how your emotional maturity elevates long-term relationship harmony.',
          novelMode: 'novel',
          novelId: 'fi_baytina_yasmin',
          novelGenre: 'romance',
          novelReasonAr: 'حكاية تجسد المروءة وضبط النفس وحسن الخلق في المواقف الإنسانية الصعبة.',
          novelReasonEn: 'A narrative embodying patience, grace, and self-command.',
        },
        ['psych_cultural_eq']
      );
    }

    return buildBundle(
      'personality',
      'psych_cultural_eq',
      {
        ruleKey: 'cultural_eq_empathy_growth',
        articleId: 'ei-article-4-emotional-intelligence-in-marriage-shared-nervous-system',
        articleReasonAr: `بناءً على تصدر «${topDim?.labelAr.split('(')[0].trim() || 'التعاطف'}» (${topDim?.score ?? 65}%)، يستعرض المقال دور الذكاء العاطفي في الشراكة المستدامة.`,
        articleReasonEn: `Led by ${topDim?.key || 'empathy'} (${topDim?.score ?? 65}%), explore how emotional intelligence builds a shared nervous system.`,
        testId: 'intel_emotional_intelligence_eq',
        testReasonAr: 'لاختبار تطبيقات الذكاء العاطفي في مواقف واقعية مقاسة وفق معيار الخبراء (MSCEIT).',
        testReasonEn: 'Test your applied EQ responses against MSCEIT expert-consensus scenarios.',
        novelMode: 'genre',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'قصص سيكولوجية تكشف ديناميكيات التعاطف والحدود الصحية في عصرنا الحديث.',
        novelReasonEn: 'Psychological stories illuminating empathy and relational boundaries.',
      },
      ['psych_cultural_eq']
    );
  }

  // MMPI Exploratory Inventory
  if (testId === 'mmpi') {
    const lowNeedsAttention = lowDim && lowDim.score < 55;
    if (lowNeedsAttention) {
      return buildBundle(
        'personality',
        'psych_mmpi',
        {
          ruleKey: 'mmpi_support_lower_balance',
          articleId: 'psychological-anxiety-anatomy-4ds-mct-act-arab-cultural-protocols',
          articleReasonAr: `سجل مؤشر «${lowDim.labelAr.split('(')[0].trim()}» (${lowDim.score}%)، ما يجعل هذا المقال التثقيفي عن القلق والتوازن النفسي مفيداً جداً لك.`,
          articleReasonEn: `Since "${lowDim.key}" scored ${lowDim.score}%, this guide on anxiety anatomy and adaptive regulation offers helpful tools.`,
          testId: 'psych_attachment_style',
          testReasonAr: 'لاستكشاف مصادر الطمأنينة النفسية والدعم الآمن في علاقاتك المقربة.',
          testReasonEn: 'Explore sources of psychological safety and reassurance in close relationships.',
          novelMode: 'novel',
          novelId: 'screen-shadows-secret-clinic-records',
          novelGenre: 'clinical_stories',
          novelReasonAr: 'مجموعة قصصية عيادية تتناول أثر الضغوط النفسية والتعافي الذاتي بأسلوب دافئ.',
          novelReasonEn: 'Clinical narratives addressing psychological strain and calm self-recovery.',
        },
        ['psych_mmpi']
      );
    }

    return buildBundle(
      'personality',
      'psych_mmpi',
      {
        ruleKey: 'mmpi_balanced_profile',
        articleId: 'platform-intro-1-scientific-foundations-of-mirror-of-hearts-tests',
        articleReasonAr: `تظهر مؤشراتك اتزاناً جيداً (${report.totalScore}%)، ويشرح المقال المنهجية السيكومترية وراء مؤشرات الصدق والاتزان.`,
        articleReasonEn: `Your inventory reflects solid balance (${report.totalScore}%); learn the psychometric science behind validity scales.`,
        testId: 'tiered_assessment',
        testReasonAr: 'للانتقال إلى التقييم السيكومتري المتدرج وقياس 6 بنايات نفسية متكاملة.',
        testReasonEn: 'Progress to the Tiered Psychometric Lab across 6 integrated psychological constructs.',
        novelMode: 'genre',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'قصص سيكولوجية عميقة تحلل الدوافع النفسية للإنسان المعاصر.',
        novelReasonEn: 'Psychological story collections probing modern human motives.',
      },
      ['psych_mmpi']
    );
  }

  // Rorschach & TAT Projective Assessments
  if (testId === 'rorschach' || testId === 'tat') {
    const sourceKey = testId === 'rorschach' ? 'psych_rorschach' : 'psych_tat';
    const isCognitive =
      topDim?.key === 'cognitive_synthesis' || topDim?.key === 'achievement_motivation';
    return buildBundle(
      'personality',
      sourceKey,
      {
        ruleKey: `${testId}_${topDim?.key || 'default'}`,
        articleId: isCognitive
          ? 'ei-article-5-self-development-and-self-confidence-neural-architecture'
          : 'childhood-deep-impact-adult-personality-integrative-arab-western-study',
        articleReasonAr: `بناءً على تصدر «${topDim?.labelAr.split('(')[0].trim() || 'الإدراك العميق'}» (${topDim?.score ?? 65}%) في استجابتك الإسقاطية، يتعمق المقال في جذور الدوافع والشخصية.`,
        articleReasonEn: `Triggered by your projective lead in "${topDim?.key || 'depth'}" (${topDim?.score ?? 65}%), this study explores underlying personality roots.`,
        testId: isCognitive ? 'intel_multiple_intelligences' : 'psych_attachment_style',
        testReasonAr: isCognitive
          ? 'لربط دوافع الإنجاز والتركيب الكلي بخريطتك في الذكاءات التسعة.'
          : 'لاستكشاف كيف تتجلى دوافع الانتماء والاحتواء في نمط ارتباطك العاطفي.',
        testReasonEn: isCognitive
          ? 'Connect your cognitive synthesis and drive with your 9 Multiple Intelligences map.'
          : 'See how your underlying relational motives manifest in adult attachment.',
        novelMode: 'novel',
        novelId: isCognitive ? 'magnetic_rift_guardians' : 'digital-companion-illusion-ai-records',
        novelGenre: isCognitive ? 'sci_fantasy' : 'clinical_stories',
        novelReasonAr: isCognitive
          ? 'عمل روائي فكري مليء بالرمزية واستكشاف المعنى والدافع الإنساني.'
          : 'دراسات قصصية عيادية تحاور الأعماق النفسية والحاجة إلى الارتباط الحقيقي.',
        novelReasonEn: isCognitive
          ? 'A symbolic intellectual sci-fantasy novel exploring human drive and meaning.'
          : 'Clinical stories speaking directly to inner longing and authentic human connection.',
      },
      [sourceKey]
    );
  }

  // Generic Psychometric Suite Fallback
  return buildBundle(
    'personality',
    `psych_${testId}`,
    {
      ruleKey: 'psych_suite_fallback',
      articleId: 'article-4-big-five-comprehensive-analysis-map-of-human-personality',
      articleReasonAr: 'قراءة تأسيسية تربط نتائجك الحالية بالخريطة العلمية الشاملة للسمات الشخصية.',
      articleReasonEn: 'Foundational reading connecting your results to the five-factor personality map.',
      testId: 'compatibility',
      testReasonAr: 'لاكتشاف كيف تتكامل سماتك الشخصية مع مواصفات شريك الحياة المناسب.',
      testReasonEn: 'See how your personality traits align with an ideal partner profile.',
      novelMode: 'genre',
      novelGenre: 'clinical_stories',
      novelReasonAr: 'تصنيف يضم قصصاً نفسية واقعية تلامس تفاصيل التجربة الإنسانية.',
      novelReasonEn: 'Curated psychological stories exploring authentic human experiences.',
    },
    [`psych_${testId}` as RecommendationTestTargetId]
  );
}

export function getTieredAssessmentRecommendations(
  report: TieredAssessmentReport
): NextStepRecommendationBundle {
  const getSub = (k: string) => report.subscales.find((s) => s.key === k)?.percentage ?? 50;
  const attAnxiety = getSub('att_anxiety');
  const attAvoidance = getSub('att_avoidance');

  // Rule 1: Elevated attachment anxiety or avoidance priority
  if (attAnxiety >= 62 || attAvoidance >= 62) {
    return buildBundle(
      'personality',
      `tiered_${report.tier}`,
      {
        ruleKey: 'tiered_attachment_vulnerability_priority',
        articleId: 'rel-article-2-attachment-styles-hidden-maps-of-relationships',
        articleReasonAr: `أظهر التقرير المتدرج ارتفاعاً في مؤشر التعلق (${Math.max(attAnxiety, attAvoidance)}%)، لذا يوضح هذا المقال آلية التحول نحو الأمان المكتسب.`,
        articleReasonEn: `Your tiered report flagged elevated attachment strain (${Math.max(attAnxiety, attAvoidance)}%); learn practical steps toward earned security.`,
        testId: 'psych_attachment_style',
        testReasonAr: 'للتدقيق المعمق في أبعاد القلق والتجنب وإصلاح الخلاف وفق مقياس ECR-R.',
        testReasonEn: 'Examine your anxiety, avoidance, and repair indices in depth via ECR-R.',
        novelMode: 'novel',
        novelId: 'screen-shadows-secret-clinic-records',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'قصص عيادية واقعية تضيء جذور الحذر والقلق في العلاقات وسبل الترميم.',
        novelReasonEn: 'Realistic clinical stories illuminating relational anxiety and recovery.',
      },
      ['tiered_assessment']
    );
  }

  // Rule 2: Determine top non-reverse subscale deterministically
  const rankedPositive = [...report.subscales]
    .filter((s) => s.key !== 'att_anxiety' && s.key !== 'att_avoidance')
    .sort((a, b) => b.percentage - a.percentage);

  const topSub = rankedPositive[0];
  const construct = topSub?.construct || 'big_five';

  if (construct === 'emotional_intelligence' || topSub?.key === 'att_security') {
    return buildBundle(
      'personality',
      `tiered_${report.tier}`,
      {
        ruleKey: 'tiered_emotional_security_lead',
        articleId: 'ei-article-4-emotional-intelligence-in-marriage-shared-nervous-system',
        articleReasonAr: `بناءً على تصدر «${topSub?.labelAr || 'الذكاء العاطفي'}» (${topSub?.percentage ?? report.overallMaturityIndex}%)، يعمّق المقال فهمك للتناغم العاطفي في الشراكة.`,
        articleReasonEn: `With "${topSub?.labelEn || 'Emotional Intelligence'}" leading (${topSub?.percentage ?? report.overallMaturityIndex}%), explore relational co-regulation.`,
        testId: 'compatibility',
        testReasonAr: 'لتوظيف نضجك العاطفي والأمان العلائقي في تحديد شريك الحياة الأكثر انسجاماً.',
        testReasonEn: 'Apply your high emotional maturity to discover your ideal compatible partner.',
        novelMode: 'novel',
        novelId: 'fi_baytina_yasmin',
        novelGenre: 'romance',
        novelReasonAr: 'رواية إنسانية عاطفية تبرز أثر الاحتواء والاحترام في العلاقات الناضجة.',
        novelReasonEn: 'An emotionally rich novel celebrating mutual respect and devotion.',
      },
      ['tiered_assessment']
    );
  }

  if (construct === 'self_regulation') {
    return buildBundle(
      'personality',
      `tiered_${report.tier}`,
      {
        ruleKey: 'tiered_self_regulation_lead',
        articleId: 'ei-article-6-stress-and-emotion-management-resilience-shield',
        articleReasonAr: `تفوقك في «${topSub.labelAr}» (${topSub.percentage}%) يعزز حصانتك أمام الضغوط، ويزودك المقال بتقنيات الحفاظ على هذا التوازن.`,
        articleReasonEn: `Your strength in ${topSub.labelEn} (${topSub.percentage}%) anchors resilience; read advanced emotion-shield protocols.`,
        testId: 'intel_cognitive_aptitude_cogat',
        testReasonAr: 'لاختبار سرعة الحسم والانضباط المعرفي تحت ضغط الوقت في بطارية CogAT.',
        testReasonEn: 'Test your executive focus and rapid problem-solving under timed CogAT tasks.',
        novelMode: 'novel',
        novelId: 'black_scorpion_protocol',
        novelGenre: 'tactical_action',
        novelReasonAr: 'رواية أكشن تكتيكية تختبر الثبات الانفعالي وضبط النفس في اللحظات الحرجة.',
        novelReasonEn: 'A tactical thriller highlighting self-control and poise under pressure.',
      },
      ['tiered_assessment']
    );
  }

  if (topSub?.key === 'bf_openness' || topSub?.key === 'hx_openness' || topSub?.key === 'com_analytical') {
    return buildBundle(
      'personality',
      `tiered_${report.tier}`,
      {
        ruleKey: 'tiered_cognitive_openness_lead',
        articleId: 'article-4-big-five-comprehensive-analysis-map-of-human-personality',
        articleReasonAr: `تصدّر «${topSub.labelAr}» (${topSub.percentage}%) نتيجتك؛ يعرض المقال كيفية تكامل الانفتاح والتحليل مع بقية أبعاد الشخصية.`,
        articleReasonEn: `${topSub.labelEn} leads your tiered profile (${topSub.percentage}%); see how openness harmonizes with personality structure.`,
        testId: 'intel_multiple_intelligences',
        testReasonAr: 'لاكتشاف بصمتك المعرفية عبر الذكاءات المتعددة التسعة (جاردنر).',
        testReasonEn: 'Map your cognitive strengths across Gardner’s 9 Multiple Intelligences.',
        novelMode: 'novel',
        novelId: 'neutron_sun_horizon',
        novelGenre: 'sci_fi_future',
        novelReasonAr: 'رواية خيال علمي ومستقبل تلائم عقليتك التحليلية وانفتاحك على آفاق المعرفة.',
        novelReasonEn: 'A visionary sci-fi novel suited to analytical and open-minded readers.',
      },
      ['tiered_assessment']
    );
  }

  if (construct === 'interpersonal' || topSub?.key === 'hx_honesty_humility' || topSub?.key === 'bf_conscientiousness') {
    return buildBundle(
      'personality',
      `tiered_${report.tier}`,
      {
        ruleKey: 'tiered_values_interpersonal_lead',
        articleId: 'clinic-family-compatibility-third-culture-bowen',
        articleReasonAr: `لأن «${topSub?.labelAr || 'القيم والشراكة'}» (${topSub?.percentage ?? 70}%) يتصدر مؤشراتك، يناقش المقال بناء الحدود الصحية والتكافل الأسري.`,
        articleReasonEn: `Driven by your lead in ${topSub?.labelEn || 'Interpersonal Values'} (${topSub?.percentage ?? 70}%), learn Bowen’s family harmony principles.`,
        testId: 'compatibility',
        testReasonAr: 'لقياس مدى انسجام قيمك وحدودك الأسرية في مقياس كاشف شريك الحياة.',
        testReasonEn: 'Assess how your values and boundaries align in the Partner Compatibility Detector.',
        novelMode: 'novel',
        novelId: 'room_104_cipher',
        novelGenre: 'crime_mystery',
        novelReasonAr: 'عمل بوليسي محبوك يركز على الدوافع الأخلاقية وتحليل السلوك البشري بدقة.',
        novelReasonEn: 'An intricate investigative mystery probing ethics and human motives.',
      },
      ['tiered_assessment']
    );
  }

  // Fixed deterministic fallback per tier
  return buildBundle(
    'personality',
    `tiered_${report.tier}`,
    {
      ruleKey: `tiered_fallback_${report.tier}`,
      articleId: 'platform-intro-1-scientific-foundations-of-mirror-of-hearts-tests',
      articleReasonAr: `وفق مؤشر نضجك العام (${report.overallMaturityIndex}%) في ${report.tierTitleAr}، يستعرض المقال المنهجية السيكومترية لهذه المؤشرات.`,
      articleReasonEn: `Based on your ${report.overallMaturityIndex}% maturity index, explore the psychometric foundations behind these constructs.`,
      testId: 'mbti_16types',
      testReasonAr: 'لاستكشاف نمطك الوظيفي ضمن مؤشر مايرز-بريغز (MBTI 16).',
      testReasonEn: 'Complement your trait profile with the 16-type MBTI cognitive classification.',
      novelMode: 'genre',
      novelGenre: 'clinical_stories',
      novelReasonAr: 'مجموعات قصصية سيكولوجية تثري تأملك في أنماط التفكير والمشاعر البشرية.',
      novelReasonEn: 'Psychological story collections enriching reflection on mind and emotion.',
    },
    ['tiered_assessment']
  );
}

// ============================================================================
// 2. DETERMINISTIC PARTNER COMPATIBILITY RULES (ResultStep.tsx)
// ============================================================================

export function getCompatibilityRecommendations(
  result: PartnerAnalysisResult
): NextStepRecommendationBundle {
  const overall = result.compatibilityScore ?? 85;
  const intellectual = result.intellectualScore ?? 85;
  const emotional = result.emotionalScore ?? 85;
  const sociological = result.sociologicalScore ?? 85;
  const lifestyle = result.lifestyleScore ?? 85;
  const attachmentText = (result.attachmentStyle || '').toLowerCase();

  // Rule 1: Explicit anxious/avoidant attachment signal or notable low compatibility score
  if (overall < 72 || attachmentText.includes('قلق') || attachmentText.includes('تجنب') || attachmentText.includes('anxious') || attachmentText.includes('avoidant')) {
    return buildBundle(
      'compatibility',
      'compatibility',
      {
        ruleKey: 'compat_attachment_or_repair_priority',
        articleId: 'rel-article-2-attachment-styles-hidden-maps-of-relationships',
        articleReasonAr: `بناءً على مؤشر التوافق (${overall}%) ونمط الارتباط «${result.attachmentStyle}»، يشرح المقال الخرائط الخفية للتعلق وكيف نبني أماناً مشتركاً.`,
        articleReasonEn: `Tailored to your ${overall}% compatibility and attachment profile, mapping how to shift anxious/avoidant dynamics into earned security.`,
        testId: 'psych_attachment_style',
        testReasonAr: 'لقياس أبعاد التعلق العاطفي ومهارة إصلاح الخلاف بدقة سيكومترية عبر مقياس ECR-R.',
        testReasonEn: 'Measure your attachment anxiety, avoidance, and conflict repair skills with ECR-R.',
        novelMode: 'novel',
        novelId: 'screen-shadows-secret-clinic-records',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'تضم حكاية «أحمد وليلى والصمت المدوي» التي تعالج فجوات التواصل في العلاقة.',
        novelReasonEn: 'Features "Ahmed & Laila and the Loud Silence," exploring relational communication gaps.',
      },
      ['compatibility']
    );
  }

  // Rule 2: Lowest axis needs targeted strengthening if significantly lagging (gap >= 8 and < 82)
  const axes = [
    { key: 'intellectual' as const, score: intellectual },
    { key: 'emotional' as const, score: emotional },
    { key: 'sociological' as const, score: sociological },
    { key: 'lifestyle' as const, score: lifestyle },
  ];
  const highestAxis = [...axes].sort((a, b) => b.score - a.score)[0];
  const lowestAxis = [...axes].sort((a, b) => a.score - b.score)[0];

  if (highestAxis.score - lowestAxis.score >= 8 && lowestAxis.score < 84) {
    if (lowestAxis.key === 'emotional') {
      return buildBundle(
        'compatibility',
        'compatibility',
        {
          ruleKey: 'compat_boost_emotional_axis',
          articleId: 'ei-article-4-emotional-intelligence-in-marriage-shared-nervous-system',
          articleReasonAr: `المؤشر العاطفي (${emotional}%) هو الأقل نسبياً مقارنة بالتوافق الفكري (${intellectual}%)؛ يقدم المقال خريطة التنظيم المشترك والاحتواء.`,
          articleReasonEn: `Emotional alignment (${emotional}%) trails intellectual fit (${intellectual}%); discover co-regulation strategies for deeper warmth.`,
          testId: 'intel_emotional_intelligence_eq',
          testReasonAr: 'لتقوية قراءة المشاعر وإدارتها يومياً عبر مواقف Bar-On وMSCEIT.',
          testReasonEn: 'Build practical emotional decoding and regulation using Bar-On & MSCEIT scenarios.',
          novelMode: 'novel',
          novelId: 'fi_baytina_yasmin',
          novelGenre: 'romance',
          novelReasonAr: 'رواية إنسانية تجسد لغة المودة الصادقة والاحتواء الهادئ بين القلوب.',
          novelReasonEn: 'A tender social romance showcasing emotional warmth and genuine care.',
        },
        ['compatibility']
      );
    }

    if (lowestAxis.key === 'intellectual') {
      return buildBundle(
        'compatibility',
        'compatibility',
        {
          ruleKey: 'compat_boost_intellectual_axis',
          articleId: 'clinic-measuring-intellectual-emotional-compatibility',
          articleReasonAr: `لتعزيز التوافق الفكري (${intellectual}%) وتقليص الفارق مع البعد العاطفي (${emotional}%) عبر أدوات حوار عملية.`,
          articleReasonEn: `Strengthen intellectual alignment (${intellectual}%) to match your emotional score (${emotional}%) using practical dialogue tools.`,
          testId: 'intel_multiple_intelligences',
          testReasonAr: 'لاكتشاف نمط تفكيرك وذكائك المهيمن لتسهيل الحوار المشترك مع الشريك.',
          testReasonEn: 'Uncover your dominant thinking styles via Multiple Intelligences to enrich partner dialogue.',
          novelMode: 'novel',
          novelId: 'android_cipher_quantum',
          novelGenre: 'sci_fi_future',
          novelReasonAr: 'رواية فكرية تقنية تفتح آفاق الحوار العقلاني وتكامل العقول في مواجهة التحديات.',
          novelReasonEn: 'An intellectual sci-fi narrative highlighting collaborative problem-solving.',
        },
        ['compatibility']
      );
    }
  }

  // Rule 3: Match by highest/dominant compatibility axis deterministically
  switch (highestAxis.key) {
    case 'intellectual':
      return buildBundle(
        'compatibility',
        'compatibility',
        {
          ruleKey: 'compat_dominant_intellectual',
          articleId: 'intellectual-compatibility-secrets',
          articleReasonAr: `يتصدر «التوافق الفكري» نتيجتك بنسبة ${intellectual}%؛ يتناول المقال آليات صناعة القرار المشترك وتحويل الاختلاف إلى تكامل.`,
          articleReasonEn: `Intellectual compatibility leads your profile at ${intellectual}%; learn frameworks for shared decision-making.`,
          testId: 'intel_multiple_intelligences',
          testReasonAr: 'لربط تقاربك الفكري مع الشريك بخريطتك في الذكاءات التسعة ومسارات التكامل.',
          testReasonEn: 'Connect your intellectual synergy with your 9 Multiple Intelligences profile.',
          novelMode: 'novel',
          novelId: 'room_104_cipher',
          novelGenre: 'crime_mystery',
          novelReasonAr: 'رواية غموض وتحليل عقلي تناسب القراء الشغوفين بالتفكير الاستنتاجي العميق.',
          novelReasonEn: 'A cerebral mystery thriller ideal for analytical and intellectually curious minds.',
        },
        ['compatibility']
      );

    case 'emotional':
      return buildBundle(
        'compatibility',
        'compatibility',
        {
          ruleKey: 'compat_dominant_emotional',
          articleId: 'rel-article-1-emotional-compatibility-destiny-or-chemistry',
          articleReasonAr: `تتصدر «الكيمياء العاطفية» مؤشراتك (${emotional}%)؛ يوضح المقال كيف تتحول المودة الفطرية إلى علاقة واعية مستدامة.`,
          articleReasonEn: `Emotional synergy peaks in your report at ${emotional}%; explore how natural chemistry matures into lasting connection.`,
          testId: 'mbti_16types',
          testReasonAr: 'لتحديد نمط شخصيتك الدقيق وفهم احتياجاتك النفسية في التواصل مع الشريك.',
          testReasonEn: 'Identify your 16-type personality archetype to refine partner communication.',
          novelMode: 'novel',
          novelId: 'fi_baytina_yasmin',
          novelGenre: 'romance',
          novelReasonAr: 'رواية رومانسية واجتماعية راقية تعكس المودة الصادقة والالتزام الأسري.',
          novelReasonEn: 'An uplifting social-romantic novel reflecting pure affection and loyalty.',
        },
        ['compatibility']
      );

    case 'sociological':
      return buildBundle(
        'compatibility',
        'compatibility',
        {
          ruleKey: 'compat_dominant_sociological',
          articleId: 'clinic-family-compatibility-third-culture-bowen',
          articleReasonAr: `يبرز «التوافق الاجتماعي والأسري» (${sociological}%) كركيزة أساسية لديك؛ يناقش المقال التوازن بين الأسرة الممتدة واستقلال البيت.`,
          articleReasonEn: `Sociological harmony stands out at ${sociological}%; explore Bowen’s guidance on balancing extended family and boundaries.`,
          testId: 'psych_sixteen_pf',
          testReasonAr: 'لتحليل عوامل شخصيتك الاجتماعية والأسرية الـ 16 (الدفء، الخصوصية، والضمير).',
          testReasonEn: 'Inspect 16 detailed relational traits including warmth, privateness, and conscientiousness.',
          novelMode: 'novel',
          novelId: 'fi_baytina_yasmin',
          novelGenre: 'romance',
          novelReasonAr: 'رواية تجسد تلاحم البيوت العريقة وحفظ المروءة والروابط الاجتماعية الأصيلة.',
          novelReasonEn: 'A novel celebrating heritage family bonds, dignity, and social integrity.',
        },
        ['compatibility']
      );

    case 'lifestyle':
    default:
      return buildBundle(
        'compatibility',
        'compatibility',
        {
          ruleKey: 'compat_dominant_lifestyle',
          articleId: 'rel-article-3-healthy-love-biological-chemistry-psychological-building',
          articleReasonAr: `يعكس انسجام «نمط الحياة والأهداف» (${lifestyle}%) ونسبة التوافق العام (${overall}%) أرضية متينة لبناء شراكة صحية طويلة الأمد.`,
          articleReasonEn: `Lifestyle harmony (${lifestyle}%) and ${overall}% overall fit create a strong foundation for healthy love architecture.`,
          testId: 'tiered_assessment',
          testReasonAr: 'للتعمق في ملفك القيمي والتخطيط الأسري عبر التحليل النفسي المتدرج.',
          testReasonEn: 'Explore your life-goals, values, and partnership indicators in the Tiered Lab.',
          novelMode: 'genre',
          novelGenre: 'romance',
          novelReasonAr: 'قصص وروايات وجدانية واجتماعية تستلهم تفاصيل الحياة المشتركة الهادئة.',
          novelReasonEn: 'Romantic and social fiction inspired by shared values and everyday harmony.',
        },
        ['compatibility']
      );
  }
}

// ============================================================================
// 3. DETERMINISTIC INTELLIGENCE TEST RULES (MI 9 Domains + IQ + EQ + CogAT)
// ============================================================================

export function getMultipleIntelligencesRecommendations(
  result: IntelligenceTestResult
): NextStepRecommendationBundle {
  // Deterministic tie-breaking via sorted entries
  const rankedCategories = (Object.keys(INTELLIGENCE_CATEGORIES) as IntelligenceCategory[])
    .map((cat) => ({
      cat,
      pct: result.categoryScores?.[cat]?.percentage ?? 0,
    }))
    .sort((a, b) => b.pct - a.pct);

  const primary: IntelligenceCategory =
    result.primaryIntelligence && INTELLIGENCE_CATEGORIES[result.primaryIntelligence]
      ? result.primaryIntelligence
      : rankedCategories[0]?.cat || 'logical';

  const primaryPct = result.categoryScores?.[primary]?.percentage ?? result.overallAverage ?? 70;

  const mapByMI: Record<IntelligenceCategory, MappingSpec> = {
    linguistic: {
      ruleKey: 'mi_linguistic',
      articleId: 'ei-article-1-concept-philosophical-roots-neural-cultural-interplay',
      articleReasonAr: `لأن «الذكاء اللغوي واللفظي» هو الأقوى لديك (${primaryPct}%)، يربط المقال بين قوة التعبير اللفظي والوعي الجذري بالمشاعر.`,
      articleReasonEn: `Linguistic Intelligence leads your profile (${primaryPct}%); connect verbal fluency with deeper emotional literacy.`,
      testId: 'mbti_16types',
      testReasonAr: 'لاستكشاف نمطك التواصلي والإدراكي ضمن مصفوفة مايرز-بريغز الـ 16.',
      testReasonEn: 'Explore your communication and perception style across the 16 MBTI archetypes.',
      novelMode: 'novel',
      novelId: 'fi_baytina_yasmin',
      novelGenre: 'romance',
      novelReasonAr: 'رواية غنية بالبلاغة العربية والحوارات الأدبية الراقية التي تستهوي ذائقتك اللغوية.',
      novelReasonEn: 'A richly written literary novel resonating with verbal artistry and dialogue.',
    },
    logical: {
      ruleKey: 'mi_logical',
      articleId: 'clinic-emotional-intelligence-why-smart-people-fail-in-love',
      articleReasonAr: `مع تصدر «الذكاء المنطقي والرياضي» (${primaryPct}%)، يكشف المقال كيف يوازن العقل التحليلي بين المنطق وحقائق الشعور.`,
      articleReasonEn: `Logical-Mathematical Intelligence tops your map (${primaryPct}%); learn how analytical minds thrive emotionally too.`,
      testId: 'intel_general_iq_raven_chc',
      testReasonAr: 'لاختبار قدراتك الاستدلالية البصرية والكمية في مصفوفات رافين القياسية (IQ).',
      testReasonEn: 'Challenge your fluid and quantitative reasoning in Raven’s Progressive Matrices.',
      novelMode: 'novel',
      novelId: 'room_104_cipher',
      novelGenre: 'crime_mystery',
      novelReasonAr: 'لغز جريمة الغرفة المغلقة الذي يتحدى قدرتك على الاستنتاج المنطقي وربط القرائن.',
      novelReasonEn: 'A locked-room mystery testing pure logical deduction and pattern recognition.',
    },
    spatial: {
      ruleKey: 'mi_spatial',
      articleId: 'platform-intro-2-how-scientifically-validated-psychological-tests-are-built',
      articleReasonAr: `تفوقك في «الذكاء البصري والمكاني» (${primaryPct}%) يلتقي مع هندسة النماذج السيكومترية وتصور الأبعاد في هذا المقال.`,
      articleReasonEn: `Visual-Spatial strength (${primaryPct}%) pairs well with understanding structural models behind psychometric design.`,
      testId: 'intel_cognitive_aptitude_cogat',
      testReasonAr: 'لقياس التصور الهندسي غير اللفظي وسرعة معالجة الأنماط في بطارية CogAT.',
      testReasonEn: 'Measure your nonverbal spatial agility and pattern processing in the CogAT battery.',
      novelMode: 'novel',
      novelId: 'neutron_sun_horizon',
      novelGenre: 'sci_fi_future',
      novelReasonAr: 'رواية خيال علمي حافلة بالتصور البصري للفضاء والتقنيات الهندسية المستقبلية.',
      novelReasonEn: 'A visually vivid sci-fi narrative set across futuristic engineering horizons.',
    },
    kinesthetic: {
      ruleKey: 'mi_kinesthetic',
      articleId: 'clinic-early-burnout-syndrome-toxic-productivity',
      articleReasonAr: `تتمتع بـ «ذكاء حركي ونشاط عملي» بارز (${primaryPct}%)؛ يحميك المقال من فخ الاستنزاف والإرهاق الجسدي-النفسي.`,
      articleReasonEn: `Your high Bodily-Kinesthetic drive (${primaryPct}%) benefits from pacing strategies to prevent burnout.`,
      testId: 'psych_epq',
      testReasonAr: 'لفهم إيقاعك العصبي ومستوى الحيوية الجسدية والانفعالية عبر استبيان آيزنك EPQ-R.',
      testReasonEn: 'Map your physiological arousal and vitality rhythm using Eysenck’s EPQ-R.',
      novelMode: 'novel',
      novelId: 'black_scorpion_protocol',
      novelGenre: 'tactical_action',
      novelReasonAr: 'رواية أكشن ومطاردات ميدانية تنسجم مع طاقتك الحركية وحبك للإيقاع السريع.',
      novelReasonEn: 'A dynamic tactical-action thriller matching kinetic energy and quick reflexes.',
    },
    musical: {
      ruleKey: 'mi_musical',
      articleId: 'ei-article-2-precise-anatomy-and-science-of-emotion-regulation',
      articleReasonAr: `تلتقط نغمة الشعور بدقة بفضل «ذكائك الموسيقي والإيقاعي» (${primaryPct}%)؛ يعمّق المقال فهمك لتنظيم النغمات الشعورية.`,
      articleReasonEn: `Musical-Rhythmic sensitivity (${primaryPct}%) pairs naturally with subtle emotional attunement and regulation.`,
      testId: 'psych_rorschach',
      testReasonAr: 'لاستكشاف إدراكك البصري-الوجداني وتداعيك الإبداعي في اختبار رورشاخ الإسقاطي.',
      testReasonEn: 'Explore creative perception and affective integration in the Rorschach Exner task.',
      novelMode: 'novel',
      novelId: 'magnetic_rift_guardians',
      novelGenre: 'sci_fantasy',
      novelReasonAr: 'فانتازيا إبداعية وإيقاع سردي متناغم يغذي الحس الفني والخيال الواسع.',
      novelReasonEn: 'An imaginative sci-fantasy narrative rich in rhythm and artistic symbolism.',
    },
    interpersonal: {
      ruleKey: 'mi_interpersonal',
      articleId: 'rel-article-1-emotional-compatibility-destiny-or-chemistry',
      articleReasonAr: `يتصدر «الذكاء الاجتماعي والتواصلي» (${primaryPct}%) نتيجتك؛ يكشف المقال أسس الكيمياء البشرية والتفاهم العميق بين الشركاء.`,
      articleReasonEn: `Interpersonal Intelligence leads your map (${primaryPct}%); uncover the science of healthy chemistry and attunement.`,
      testId: 'compatibility',
      testReasonAr: 'لتوظيف قدرتك الفطرية على فهم الآخرين في اختبار كاشف شريك الحياة.',
      testReasonEn: 'Apply your strong social intuition in the Partner Compatibility Detector.',
      novelMode: 'novel',
      novelId: 'fi_baytina_yasmin',
      novelGenre: 'romance',
      novelReasonAr: 'رواية إنسانية تحتفي بفن الإصغاء والمودة وبناء الثقة بين الناس.',
      novelReasonEn: 'A deeply relational novel celebrating empathy, trust, and community bonds.',
    },
    intrapersonal: {
      ruleKey: 'mi_intrapersonal',
      articleId: 'article-1-introverted-personality-inner-world-hidden-power',
      articleReasonAr: `لأن «الذكاء الذاتي والتأملي» هو الأعلى (${primaryPct}%)، يتناغم هذا المقال مع وعيك الداخلي وعمق مراجعتك لنفسك.`,
      articleReasonEn: `Intrapersonal Intelligence leads (${primaryPct}%); this study deepens self-knowledge and mindful inner power.`,
      testId: 'big_five_ocean',
      testReasonAr: 'لقياس الأبعاد الخمسة لشخصيتك وتوثيق بصمتك الداخلية بمقياس OCEAN.',
      testReasonEn: 'Quantify your inner traits across the Big Five OCEAN dimensions.',
      novelMode: 'novel',
      novelId: 'digital-companion-illusion-ai-records',
      novelGenre: 'clinical_stories',
      novelReasonAr: 'مجموعة قصصية تأملية تفتح أسئلة صادقة حول الهوية الذاتية والعالم الداخلي.',
      novelReasonEn: 'Introspective clinical stories examining self-identity and inner truth.',
    },
    naturalistic: {
      ruleKey: 'mi_naturalistic',
      articleId: 'ei-article-6-stress-and-emotion-management-resilience-shield',
      articleReasonAr: `يمتاز «الذكاء الطبيعي» لديك (${primaryPct}%) بحس التوازن البيئي؛ يربط المقال بين استعادة الهدوء الطبيعي والمرونة النفسية.`,
      articleReasonEn: `Naturalistic Intelligence (${primaryPct}%) thrives on equilibrium; learn how grounding shields you from stress.`,
      testId: 'psych_sixteen_pf',
      testReasonAr: 'لاستكشاف سمات السكينة والانضباط والاستقلالية في مقياس كاتل الـ 16.',
      testReasonEn: 'Explore calmness, self-reliance, and sensitivity across Cattell’s 16PF scales.',
      novelMode: 'novel',
      novelId: 'magnetic_rift_guardians',
      novelGenre: 'sci_fantasy',
      novelReasonAr: 'رواية تستكشف قوى الطبيعة والصدوع الكونية والتوازن بين الإنسان والبيئة.',
      novelReasonEn: 'An adventurous sci-fantasy tale centered on natural forces and equilibrium.',
    },
    existential: {
      ruleKey: 'mi_existential',
      articleId: 'clinic-existential-anxiety-future-fog-resilience',
      articleReasonAr: `مع بروز «الذكاء الوجودي والفلسفي» (${primaryPct}%)، يناقش المقال صناعة المعنى والصلابة النفسية أمام أسئلة المستقبل الكبرى.`,
      articleReasonEn: `Existential Intelligence tops your results (${primaryPct}%); explore meaning-making and resilience facing big life questions.`,
      testId: 'psych_tat',
      testReasonAr: 'لاستكشاف الدوافع الإنسانية العميقة وصناعة المعنى عبر اختبار تفهم الموضوع (TAT).',
      testReasonEn: 'Examine deep human drives and meaning-making through Murray’s TAT assessment.',
      novelMode: 'novel',
      novelId: 'android_cipher_quantum',
      novelGenre: 'sci_fi_future',
      novelReasonAr: 'رواية خيال علمي تطرح أسئلة فلسفية وأخلاقية حول الوعي البشري ومستقبل التكنولوجيا.',
      novelReasonEn: 'A philosophical sci-fi thriller questioning consciousness, ethics, and humanity’s future.',
    },
  };

  const chosenSpec = mapByMI[primary] || mapByMI.logical;
  return buildBundle(
    'intelligence',
    'multiple_intelligences',
    chosenSpec,
    ['intel_multiple_intelligences']
  );
}

export function getObjectiveBatteryRecommendations(
  result: ObjectiveBatteryResult
): NextStepRecommendationBundle {
  const batteryId = result.batteryId;
  const selfTargetId: RecommendationTestTargetId = `intel_${batteryId}` as RecommendationTestTargetId;

  const sortedDomains = [...(result.domainScores || [])].sort((a, b) => b.percentage - a.percentage);
  const topDomain = sortedDomains[0];
  const lowDomain = sortedDomains[sortedDomains.length - 1];

  // 1. General IQ (Raven & CHC)
  if (batteryId === 'general_iq_raven_chc') {
    const key = topDomain?.domainKey || 'fluid_reasoning';
    if (key === 'verbal_comprehension') {
      return buildBundle(
        'intelligence',
        batteryId,
        {
          ruleKey: 'iq_top_verbal',
          articleId: 'clinic-emotional-intelligence-why-smart-people-fail-in-love',
          articleReasonAr: `سجلت أعلى أداء في «${topDomain.domainTitleAr}» (${topDomain.percentage}%)؛ يوضح المقال كيف يتكامل الذكاء اللغوي والذهني مع الذكاء الوجداني.`,
          articleReasonEn: `Verbal comprehension led your IQ profile (${topDomain.percentage}%); see how intellect pairs with emotional wisdom.`,
          testId: 'intel_multiple_intelligences',
          testReasonAr: 'لاستكشاف توزيع ذكاءاتك التسعة (اللغوي، المنطقي، الاجتماعي، الوجودي...).',
          testReasonEn: 'Map your 9 Multiple Intelligences alongside your standardized IQ score.',
          novelMode: 'novel',
          novelId: 'room_104_cipher',
          novelGenre: 'crime_mystery',
          novelReasonAr: 'رواية تحقيقات تعتمد على تحليل الأقوال وفك الشيفرات اللغوية والمنطقية.',
          novelReasonEn: 'A detective thriller built on verbal clue dissection and sharp deduction.',
        },
        [selfTargetId]
      );
    }

    if (key === 'quantitative_reasoning' || key === 'visual_spatial') {
      return buildBundle(
        'intelligence',
        batteryId,
        {
          ruleKey: `iq_top_${key}`,
          articleId: 'platform-intro-2-how-scientifically-validated-psychological-tests-are-built',
          articleReasonAr: `تفوقك في «${topDomain.domainTitleAr}» (${topDomain.percentage}%) يتقاطع مع المنهجية الإحصائية والنماذج التحليلية في هذا المقال.`,
          articleReasonEn: `Your lead in ${topDomain.domainKey} (${topDomain.percentage}%) aligns with quantitative psychometric modeling.`,
          testId: 'intel_cognitive_aptitude_cogat',
          testReasonAr: 'لقياس قدراتك التطبيقية الكمية وغير اللفظية وسرعة الحل في بطارية CogAT & Wonderlic.',
          testReasonEn: 'Benchmark your applied quantitative and spatial speed in the CogAT battery.',
          novelMode: 'novel',
          novelId: 'android_cipher_quantum',
          novelGenre: 'sci_fi_future',
          novelReasonAr: 'رواية خيال علمي هندسي وكمومي تحفز التفكير المكاني والتحليلي الدقيق.',
          novelReasonEn: 'A hard sci-fi quantum thriller engaging spatial and quantitative reasoning.',
        },
        [selfTargetId]
      );
    }

    // fluid_reasoning / working_memory / default IQ
    return buildBundle(
      'intelligence',
      batteryId,
      {
        ruleKey: `iq_top_${key}`,
        articleId: 'overthinking-anatomy-neurocognitive-mct-act-amman-case-study',
        articleReasonAr: `لأن «${topDomain?.domainTitleAr || 'الاستدلال المرن'}» (${topDomain?.percentage ?? result.overallPercentage}%) هو الأبرز، يساعد المقال العقول عالية التحليل على منع التفكير الزائد.`,
        articleReasonEn: `Strong fluid reasoning (${topDomain?.percentage ?? result.overallPercentage}%) benefits from knowing how to prevent analytical overthinking.`,
        testId: 'intel_emotional_intelligence_eq',
        testReasonAr: 'لموازنة درجة ذكائك المعرفي (IQ: ' + result.standardScore + ') بقياس ذكائك العاطفي (EQ).',
        testReasonEn: `Balance your cognitive IQ (${result.standardScore}) by measuring your Emotional Intelligence (EQ).`,
        novelMode: 'novel',
        novelId: 'shadows_leave_no_trace',
        novelGenre: 'crime_mystery',
        novelReasonAr: 'مواجهة ذهنية بين محقق عبقري ولغز جنائي معقد تختبر قوة الذاكرة العاملة والاستدلال.',
        novelReasonEn: 'A cerebral chess-match crime novel testing working memory and logic.',
      },
      [selfTargetId]
    );
  }

  // 2. Emotional Intelligence (Bar-On & MSCEIT)
  if (batteryId === 'emotional_intelligence_eq') {
    if (lowDomain && (lowDomain.domainKey === 'stress_management_eq' || lowDomain.percentage < 65)) {
      return buildBundle(
        'intelligence',
        batteryId,
        {
          ruleKey: 'eq_stress_or_growth_priority',
          articleId: 'ei-article-6-stress-and-emotion-management-resilience-shield',
          articleReasonAr: `سجل محور «${lowDomain.domainTitleAr}» (${lowDomain.percentage}%) كأولوية تطوير؛ يقدم المقال أدوات الدرع الواقي وتنظيم التوتر.`,
          articleReasonEn: `"${lowDomain.domainTitleAr}" (${lowDomain.percentage}%) is your top growth lever; read evidence-based stress resilience techniques.`,
          testId: 'psych_attachment_style',
          testReasonAr: 'لاكتشاف أثر إدارة الضغوط والانفعالات على شعورك بالأمان في العلاقات القريبة.',
          testReasonEn: 'Explore how emotion regulation interacts with relational attachment security.',
          novelMode: 'novel',
          novelId: 'screen-shadows-secret-clinic-records',
          novelGenre: 'clinical_stories',
          novelReasonAr: 'قصص نفسية واقعية تبرز أهمية تفريغ الضغوط وطلب الاحتواء الصادق.',
          novelReasonEn: 'Realistic clinical stories highlighting stress relief and genuine empathy.',
        },
        [selfTargetId]
      );
    }

    if (topDomain?.domainKey === 'interpersonal_eq') {
      return buildBundle(
        'intelligence',
        batteryId,
        {
          ruleKey: 'eq_top_interpersonal',
          articleId: 'ei-article-4-emotional-intelligence-in-marriage-shared-nervous-system',
          articleReasonAr: `تفوقك في «${topDomain.domainTitleAr}» (${topDomain.percentage}%) يؤهلك لقيادة حوارات دافئة؛ يركز المقال على الشراكة الواعية.`,
          articleReasonEn: `Interpersonal EQ leads (${topDomain.percentage}%); deepen your insight into shared emotional regulation in partnership.`,
          testId: 'compatibility',
          testReasonAr: 'لاستثمار نضجك العاطفي (EQ: ' + result.standardScore + ') في كاشف شريك الحياة.',
          testReasonEn: `Apply your Interpersonal EQ (${result.standardScore}) inside the Partner Compatibility Detector.`,
          novelMode: 'novel',
          novelId: 'fi_baytina_yasmin',
          novelGenre: 'romance',
          novelReasonAr: 'رواية إنسانية عاطفية تبرز قيمة الوفاء والتواصل الوجداني الراقي.',
          novelReasonEn: 'A heartfelt humanistic novel emphasizing empathy and faithful bonds.',
        },
        [selfTargetId]
      );
    }

    return buildBundle(
      'intelligence',
      batteryId,
      {
        ruleKey: `eq_top_${topDomain?.domainKey || 'balanced'}`,
        articleId: 'ei-article-3-how-to-measure-eq-scientific-tools-cultural-challenges-roadmap',
        articleReasonAr: `استناداً إلى تصدر «${topDomain?.domainTitleAr || 'الوعي الذاتي'}» (${topDomain?.percentage ?? result.overallPercentage}%)، يرسم المقال خريطة تطوير الذكاء العاطفي.`,
        articleReasonEn: `Building on your top domain (${topDomain?.percentage ?? result.overallPercentage}%), follow a structured EQ growth roadmap.`,
        testId: 'psych_cultural_eq',
        testReasonAr: 'لتعميق قراءتك في الذكاء العاطفي والأبعاد الثقافية والقيمية وفق غولمان وهوفستيد.',
        testReasonEn: 'Expand your EQ insights across cultural values and social grace (Goleman & Hofstede).',
        novelMode: 'novel',
        novelId: 'digital-companion-illusion-ai-records',
        novelGenre: 'clinical_stories',
        novelReasonAr: 'قصص إنسانية تقارن بين الزيف الرقمي ودفء الذكاء العاطفي البشري الصادق.',
        novelReasonEn: 'Clinical narratives contrasting artificial responses with genuine human empathy.',
      },
      [selfTargetId]
    );
  }

  // 3. Cognitive & Professional Aptitude (CogAT & Wonderlic)
  const cogKey = topDomain?.domainKey || 'nonverbal_battery';
  if (cogKey === 'verbal_battery') {
    return buildBundle(
      'intelligence',
      batteryId,
      {
        ruleKey: 'cogat_top_verbal',
        articleId: 'ei-article-5-self-development-and-self-confidence-neural-architecture',
        articleReasonAr: `تفوقت في «${topDomain?.domainTitleAr || 'البطارية اللفظية'}» (${topDomain?.percentage ?? result.overallPercentage}%)؛ يدعم المقال توظيف كفاءتك في بناء الثقة المهنية والشخصية.`,
        articleReasonEn: `Verbal battery mastery (${topDomain?.percentage ?? result.overallPercentage}%) pairs with neural strategies for grounded confidence.`,
        testId: 'mbti_16types',
        testReasonAr: 'لربط قدراتك اللفظية وسرعة قراراتك بنمط شخصيتك القيادي في MBTI.',
        testReasonEn: 'Link your verbal agility with your 16-type MBTI leadership and communication style.',
        novelMode: 'novel',
        novelId: 'room_104_cipher',
        novelGenre: 'crime_mystery',
        novelReasonAr: 'قضية تحقيقات مشوقة تعتمد على قراءة الحجج، الدقة اللفظية، وكشف التناقضات.',
        novelReasonEn: 'A gripping mystery anchored in verbal precision and cross-examination.',
      },
      [selfTargetId]
    );
  }

  if (cogKey === 'quantitative_battery') {
    return buildBundle(
      'intelligence',
      batteryId,
      {
        ruleKey: 'cogat_top_quantitative',
        articleId: 'intellectual-compatibility-secrets',
        articleReasonAr: `مع بروز «${topDomain?.domainTitleAr || 'القدرات الكمية'}» (${topDomain?.percentage ?? result.overallPercentage}%)، يناقش المقال تطبيق العقلانية المنظمة في القرارات الحياتية.`,
        articleReasonEn: `Quantitative leadership (${topDomain?.percentage ?? result.overallPercentage}%) fits structured life-decision frameworks.`,
        testId: 'intel_general_iq_raven_chc',
        testReasonAr: 'لاختبار الاستدلال العام ومصفوفات رافين القياسية في بطارية IQ & CHC.',
        testReasonEn: 'Extend your analytical score in the Raven & CHC General Intelligence battery.',
        novelMode: 'novel',
        novelId: 'android_cipher_quantum',
        novelGenre: 'sci_fi_future',
        novelReasonAr: 'رواية تكنولوجية وكمومية تخاطب دقتك الرياضية وحبك للأنظمة المعقدة.',
        novelReasonEn: 'A quantum tech-thriller crafted for precision quantitative minds.',
      },
      [selfTargetId]
    );
  }

  // nonverbal_battery / fallback for CogAT
  return buildBundle(
    'intelligence',
    batteryId,
    {
      ruleKey: 'cogat_top_nonverbal',
      articleId: 'clinic-cognitive-neuro-emotional-fatigue-without-moving',
      articleReasonAr: `تظهر سرعة بديهتك في «${topDomain?.domainTitleAr || 'البطارية غير اللفظية'}» (${topDomain?.percentage ?? result.overallPercentage}%)؛ يشرح المقال حماية الذهن النشيط من الإجهاد المعرفي.`,
      articleReasonEn: `High nonverbal speed (${topDomain?.percentage ?? result.overallPercentage}%) thrives when protected against hidden cognitive fatigue.`,
      testId: 'intel_multiple_intelligences',
      testReasonAr: 'لتحديد الذكاءات المكانية والمنطقية والحركية المساندة لأدائك المهني.',
      testReasonEn: 'Discover the spatial and logical intelligences supporting your aptitude score.',
      novelMode: 'novel',
      novelId: 'black_scorpion_protocol',
      novelGenre: 'tactical_action',
      novelReasonAr: 'رواية تكتيكية سريعة الإيقاع تتطلب سرعة البديهة وتحليل المواقف الميدانية.',
      novelReasonEn: 'A rapid-fire tactical thriller demanding quick situational problem-solving.',
    },
    [selfTargetId]
  );
}
