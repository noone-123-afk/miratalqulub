import { Novel, NovelGenre } from '../data/novelsData';

export type NovelLengthFilter = 'all' | 'short' | 'medium' | 'long';

export type NovelThemeFilter =
  | 'all'
  | 'attachment_identity'
  | 'love_ethics'
  | 'dark_psyche_investigation'
  | 'resilience_teamwork';

export type NovelSortOption = 'popular' | 'rating' | 'words';

export interface NovelLengthOption {
  id: NovelLengthFilter;
  labelAr: string;
  labelEn: string;
}

export interface NovelThemeOption {
  id: NovelThemeFilter;
  labelAr: string;
  labelEn: string;
}

export const NOVEL_LENGTH_OPTIONS: NovelLengthOption[] = [
  {
    id: 'all',
    labelAr: 'الكل',
    labelEn: 'All Lengths',
  },
  {
    id: 'short',
    labelAr: 'قصيرة (أقل من 5,500 كلمة)',
    labelEn: 'Short (< 5,500 words)',
  },
  {
    id: 'medium',
    labelAr: 'متوسطة (5,500 – 9,999 كلمة)',
    labelEn: 'Medium (5.5k – 9.9k words)',
  },
  {
    id: 'long',
    labelAr: 'طويلة (10,000+ كلمة)',
    labelEn: 'Long (10,000+ words)',
  },
];

export const NOVEL_THEME_OPTIONS: NovelThemeOption[] = [
  {
    id: 'all',
    labelAr: 'جميع المواضيع',
    labelEn: 'All Themes',
  },
  {
    id: 'attachment_identity',
    labelAr: 'التعلق، الهوية والعزلة',
    labelEn: 'Attachment, Identity & Isolation',
  },
  {
    id: 'love_ethics',
    labelAr: 'العلاقات، المروءة والأخلاق',
    labelEn: 'Relationships, Love & Ethics',
  },
  {
    id: 'dark_psyche_investigation',
    labelAr: 'النرجسية والتحليل النفسي',
    labelEn: 'Narcissism & Forensic Psyche',
  },
  {
    id: 'resilience_teamwork',
    labelAr: 'الصمود النفسي والعمل الجماعي',
    labelEn: 'Resilience & Teamwork',
  },
];

/**
 * Computes effective word count deterministically from actual novel metadata.
 */
export function getEffectiveWordCount(novel: Novel): number {
  if (typeof novel.totalWords === 'number' && novel.totalWords > 0) {
    return novel.totalWords;
  }
  if (Array.isArray(novel.chapters) && novel.chapters.length > 0) {
    const chapterSum = novel.chapters.reduce((sum, ch) => sum + (ch.wordsCount || 0), 0);
    if (chapterSum > 0) return chapterSum;
    return novel.chapters.length * 1400;
  }
  if (typeof novel.totalChapters === 'number' && novel.totalChapters > 0) {
    return novel.totalChapters * 1400;
  }
  return 0;
}

/**
 * Classifies novel length deterministically using real catalog word counts:
 * - short: < 5,500 words (typically 3–4 chapters / clinical stories, ~18–35 min)
 * - medium: 5,500 – 9,999 words (typically 3–5 mid-length chapters, ~38–45 min)
 * - long: >= 10,000 words (full-length multi-chapter novels, 8–10 chapters, ~55–65 min)
 */
export function classifyNovelLength(novel: Novel): Exclude<NovelLengthFilter, 'all'> {
  const words = getEffectiveWordCount(novel);
  if (words < 5500) return 'short';
  if (words < 10000) return 'medium';
  return 'long';
}

const THEME_KEYWORDS: Record<Exclude<NovelThemeFilter, 'all'>, string[]> = {
  attachment_identity: [
    'تعلق',
    'الهوية',
    'عزلة',
    'القلق الاجتماعي',
    'انفصال',
    'aias',
    'ego erosion',
    'des-ii',
    'technoference',
    'attachment',
    'isolation',
    'social anxiety',
  ],
  love_ethics: [
    'حب',
    'مروءة',
    'زواجي',
    'عاطفة',
    'عفيف',
    'أخلاقيات',
    'الإرادة البشرية',
    'وقار',
    'صلابة',
    'efct',
    'romance',
    'marital',
    'ethical',
    'dignity',
  ],
  dark_psyche_investigation: [
    'سيكوباتي',
    'نرجسية',
    'قاتل',
    'عقدة التفوق',
    'المحقق الجنائي',
    'بصمات في الظل',
    'psychopath',
    'narciss',
    'killer',
    'god complex',
  ],
  resilience_teamwork: [
    'أدرينالين',
    'الهدوء الذهني',
    'العمل الجماعي',
    'الثقة المتبادلة',
    'الشجاعة',
    'التضحية',
    'اتخاذ القرار',
    'المواقف الحرجة',
    'التفكير الابتكاري',
    'teamwork',
    'resilience',
    'sacrifice',
    'courage',
  ],
};

/**
 * Matches a novel deterministically against a psychological or emotional theme
 * based on its actual forensicThemeAr, psychologicalFocusAr, subtitle, and genre.
 */
export function matchesNovelTheme(novel: Novel, theme: NovelThemeFilter): boolean {
  if (theme === 'all') return true;

  const corpus = [
    novel.forensicThemeAr,
    novel.psychologicalFocusAr,
    novel.subtitleAr,
    novel.subtitleEn,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const keywords = THEME_KEYWORDS[theme];
  if (keywords.some((kw) => corpus.includes(kw))) {
    return true;
  }

  // Deterministic genre fallback for newly added custom novels lacking detailed keywords
  if (theme === 'love_ethics' && novel.genre === 'romance') return true;
  if (theme === 'dark_psyche_investigation' && novel.genre === 'crime_mystery') return true;
  if (theme === 'resilience_teamwork' && novel.genre === 'tactical_action') return true;

  return false;
}

export interface NovelFilterParams {
  searchQuery: string;
  selectedGenre: 'all' | NovelGenre;
  selectedLength: NovelLengthFilter;
  selectedTheme: NovelThemeFilter;
  sortBy: NovelSortOption;
}

export function filterAndSortNovels(novels: Novel[], params: NovelFilterParams): Novel[] {
  const { searchQuery, selectedGenre, selectedLength, selectedTheme, sortBy } = params;
  const q = searchQuery.trim().toLowerCase();

  return novels
    .filter((novel) => {
      if (selectedGenre !== 'all' && novel.genre !== selectedGenre) return false;
      if (selectedLength !== 'all' && classifyNovelLength(novel) !== selectedLength) return false;
      if (!matchesNovelTheme(novel, selectedTheme)) return false;

      if (!q) return true;
      return (
        novel.titleAr.toLowerCase().includes(q) ||
        (novel.titleEn ? novel.titleEn.toLowerCase().includes(q) : false) ||
        novel.subtitleAr.toLowerCase().includes(q) ||
        novel.synopsisAr.toLowerCase().includes(q) ||
        novel.authorPersonaAr.toLowerCase().includes(q) ||
        (novel.placeSettingAr ? novel.placeSettingAr.toLowerCase().includes(q) : false) ||
        (novel.timeSettingAr ? novel.timeSettingAr.toLowerCase().includes(q) : false) ||
        (novel.forensicThemeAr ? novel.forensicThemeAr.toLowerCase().includes(q) : false) ||
        (novel.psychologicalFocusAr ? novel.psychologicalFocusAr.toLowerCase().includes(q) : false)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'words') return getEffectiveWordCount(b) - getEffectiveWordCount(a);
      return b.readsCount - a.readsCount;
    });
}
