import { Article } from '../data/articlesData';
import { AcademicPaper } from '../data/academicPapersData';
import { HOME_HIGHLIGHTED_ARTICLES } from '../data/homeHighlightsData';

export type ArticleCategoryFilter =
  | 'all'
  | 'relationships'
  | 'self_growth'
  | 'applied_psychology'
  | 'emotional_iq';

export type ArticleReadTimeFilter = 'all' | 'quick' | 'medium' | 'deep';

export type ArticleSortOption = 'newest' | 'most_read';

export type ArticleKeywordFilter =
  | 'all'
  | 'attachment'
  | 'emotional_iq'
  | 'anxiety_overthinking'
  | 'marriage_gottman'
  | 'personality_big_five'
  | 'therapy_cbt_act'
  | 'ai_digital'
  | 'psychometrics';

export interface ReadTimeFilterOption {
  id: ArticleReadTimeFilter;
  labelAr: string;
  labelEn: string;
}

export interface KeywordFilterOption {
  id: ArticleKeywordFilter;
  labelAr: string;
  labelEn: string;
  matchTerms: string[];
}

export const READ_TIME_FILTER_OPTIONS: ReadTimeFilterOption[] = [
  {
    id: 'all',
    labelAr: 'الكل',
    labelEn: 'All Durations',
  },
  {
    id: 'quick',
    labelAr: 'سريعة (≤ 10 دقائق)',
    labelEn: 'Quick (≤ 10 min)',
  },
  {
    id: 'medium',
    labelAr: 'متوسطة (11–17 دقيقة)',
    labelEn: 'Medium (11–17 min)',
  },
  {
    id: 'deep',
    labelAr: 'معمقة / طويلة (≥ 18 دقيقة)',
    labelEn: 'In-Depth (≥ 18 min)',
  },
];

export const ARTICLE_KEYWORD_OPTIONS: KeywordFilterOption[] = [
  {
    id: 'all',
    labelAr: 'جميع الوسوم',
    labelEn: 'All Tags',
    matchTerms: [],
  },
  {
    id: 'attachment',
    labelAr: '#أنماط التعلق',
    labelEn: '#Attachment',
    matchTerms: ['التعلق', 'attachment', 'بولبي', 'bowlby'],
  },
  {
    id: 'emotional_iq',
    labelAr: '#الذكاء العاطفي',
    labelEn: '#Emotional IQ',
    matchTerms: ['الذكاء العاطفي', 'emotional intelligence', 'msceit', 'eq-i'],
  },
  {
    id: 'anxiety_overthinking',
    labelAr: '#القلق والتفكير الزائد',
    labelEn: '#Anxiety & Overthinking',
    matchTerms: ['القلق', 'التفكير الزائد', 'anxiety', 'overthinking', 'gad-7'],
  },
  {
    id: 'marriage_gottman',
    labelAr: '#التوافق والزواج (غوتمان)',
    labelEn: '#Marriage & Gottman',
    matchTerms: ['التوافق', 'غوتمان', 'الزواج', 'الزواجي', 'gottman', 'compatibility'],
  },
  {
    id: 'personality_big_five',
    labelAr: '#الشخصية والعوامل الخمسة',
    labelEn: '#Big Five Personality',
    matchTerms: ['العوامل الخمسة', 'big five', 'الشخصية', 'أيزنك', 'neo-pi'],
  },
  {
    id: 'therapy_cbt_act',
    labelAr: '#العلاج النفسي (CBT/ACT)',
    labelEn: '#CBT / ACT / Neuroplasticity',
    matchTerms: ['cbt', 'act', 'emdr', 'المرونة العصبية', 'neuroplasticity', 'مخططات'],
  },
  {
    id: 'ai_digital',
    labelAr: '#الذكاء الاصطناعي والرقمي',
    labelEn: '#AI & Digital Psyche',
    matchTerms: ['الذكاء الاصطناعي', 'الرقمي', 'تيك توك', 'digital', 'generative ai', 'tiktok'],
  },
  {
    id: 'psychometrics',
    labelAr: '#علم القياس النفسي',
    labelEn: '#Psychometrics',
    matchTerms: ['القياس النفسي', 'psychometrics', 'الصدق والثبات', 'كرونباخ', 'irt'],
  },
];

// Explicit highlight rank from homepage editorial spotlights (1-based)
const HIGHLIGHT_RANK_MAP: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  HOME_HIGHLIGHTED_ARTICLES.forEach((h, idx) => {
    map[h.id] = idx + 1;
    map[`academic-${h.id}`] = idx + 1;
  });
  // Academic spotlight study highlighted in ArticlesEncyclopediaPage
  map['research-gcc-family-based-psychosocial-interventions-chronic-disorders'] = 0;
  return map;
})();

/**
 * Extracts exact integer reading minutes from catalog readTime string (handles Western & Arabic-Indic digits).
 */
export function parseReadTimeMinutes(readTimeText?: string): number {
  if (!readTimeText) return 0;
  const normalized = readTimeText.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  const match = normalized.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function classifyReadTime(minutes: number): Exclude<ArticleReadTimeFilter, 'all'> {
  if (minutes <= 10) return 'quick';
  if (minutes <= 17) return 'medium';
  return 'deep';
}

function parsePublishTimestamp(dateStr?: string): number {
  if (!dateStr) return 0;
  const ms = Date.parse(dateStr);
  return Number.isNaN(ms) ? 0 : ms;
}

function getOptionalReadsCount(item: Article | AcademicPaper): number {
  const maybe = (item as unknown as { readsCount?: unknown }).readsCount;
  return typeof maybe === 'number' && Number.isFinite(maybe) ? maybe : 0;
}

function matchesKeywordTerms(searchableText: string, keywordFilter: ArticleKeywordFilter): boolean {
  if (keywordFilter === 'all') return true;
  const opt = ARTICLE_KEYWORD_OPTIONS.find((k) => k.id === keywordFilter);
  if (!opt || opt.matchTerms.length === 0) return true;
  return opt.matchTerms.some((term) => searchableText.includes(term));
}

export interface ArticleFilterParams {
  searchQuery: string;
  selectedCategory: ArticleCategoryFilter;
  selectedReadTime: ArticleReadTimeFilter;
  selectedKeyword: ArticleKeywordFilter;
  sortBy: ArticleSortOption;
}

export function filterAndSortNarrativeArticles(
  articles: Article[],
  params: ArticleFilterParams
): Article[] {
  const { searchQuery, selectedCategory, selectedReadTime, selectedKeyword, sortBy } = params;
  const q = searchQuery.trim().toLowerCase();

  const indexed = articles.map((art, index) => ({ art, index }));

  const filtered = indexed.filter(({ art }) => {
    if (selectedCategory !== 'all' && art.category !== selectedCategory) return false;

    const mins = parseReadTimeMinutes(art.readTime || art.readTimeEn);
    if (selectedReadTime !== 'all' && classifyReadTime(mins) !== selectedReadTime) return false;

    const searchableText = [
      art.title,
      art.titleEn,
      art.summary,
      art.summaryEn,
      art.scientificFramework,
      art.scientificFrameworkEn,
      art.categoryLabelAr,
      art.categoryLabelEn,
      ...(art.keyTakeaways || []),
      ...(art.keyTakeawaysEn || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (!matchesKeywordTerms(searchableText, selectedKeyword)) return false;

    if (!q) return true;
    return searchableText.includes(q);
  });

  filtered.sort((a, b) => {
    if (sortBy === 'newest') {
      const diff = parsePublishTimestamp(b.art.publishDate) - parsePublishTimestamp(a.art.publishDate);
      if (diff !== 0) return diff;
      return a.index - b.index;
    }

    // 'most_read': use explicit readsCount if available; otherwise deterministic highlight rank + catalog editorial order
    const readsDiff = getOptionalReadsCount(b.art) - getOptionalReadsCount(a.art);
    if (readsDiff !== 0) return readsDiff;

    const rankA = HIGHLIGHT_RANK_MAP[a.art.id] ?? Number.MAX_SAFE_INTEGER;
    const rankB = HIGHLIGHT_RANK_MAP[b.art.id] ?? Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;

    return a.index - b.index;
  });

  return filtered.map((entry) => entry.art);
}

export function filterAndSortAcademicPapers(
  papers: AcademicPaper[],
  params: ArticleFilterParams
): AcademicPaper[] {
  const { searchQuery, selectedCategory, selectedReadTime, selectedKeyword, sortBy } = params;
  const q = searchQuery.trim().toLowerCase();

  const indexed = papers.map((paper, index) => ({ paper, index }));

  const filtered = indexed.filter(({ paper }) => {
    if (selectedCategory !== 'all' && paper.category !== selectedCategory) return false;

    const mins = parseReadTimeMinutes(paper.readTimeAr || paper.readTimeEn);
    if (selectedReadTime !== 'all' && classifyReadTime(mins) !== selectedReadTime) return false;

    const searchableText = [
      paper.titleAr,
      paper.titleEn,
      paper.abstractAr,
      paper.abstractEn,
      paper.methodologyBadgeAr,
      paper.methodologyBadgeEn,
      paper.categoryLabelAr,
      paper.categoryLabelEn,
      ...(paper.keywordsAr || []),
      ...(paper.keywordsEn || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (!matchesKeywordTerms(searchableText, selectedKeyword)) return false;

    if (!q) return true;
    return searchableText.includes(q);
  });

  filtered.sort((a, b) => {
    if (sortBy === 'newest') {
      const diff =
        parsePublishTimestamp(b.paper.publishDate) - parsePublishTimestamp(a.paper.publishDate);
      if (diff !== 0) return diff;
      return a.index - b.index;
    }

    // 'most_read': explicit readsCount if provided, else spotlight / highlight rank, else catalog editorial order
    const readsDiff = getOptionalReadsCount(b.paper) - getOptionalReadsCount(a.paper);
    if (readsDiff !== 0) return readsDiff;

    const rankA = HIGHLIGHT_RANK_MAP[a.paper.id] ?? Number.MAX_SAFE_INTEGER;
    const rankB = HIGHLIGHT_RANK_MAP[b.paper.id] ?? Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;

    return a.index - b.index;
  });

  return filtered.map((entry) => entry.paper);
}
