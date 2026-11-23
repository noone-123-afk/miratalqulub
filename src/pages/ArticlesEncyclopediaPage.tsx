import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Share2,
  Check,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Stethoscope,
  FileText,
  BookMarked,
  ListChecks,
  Quote,
  Home,
  Sun,
  Moon,
  Maximize2,
  SlidersHorizontal,
  RotateCcw,
  Hash,
  ArrowUpDown,
} from 'lucide-react';
import {
  Article,
  ARTICLES_CATALOG,
  getFullContinuousNarrativeText,
} from '../data/articlesData';
import {
  AcademicPaper,
  ACADEMIC_PAPERS_CATALOG,
  getFullContinuousAcademicText,
} from '../data/academicPapersData';
import { PLATFORM_INTRODUCTORY_ARTICLES } from '../data/platformIntroductoryArticles';
import { EMOTIONAL_IQ_NARRATIVE_ARTICLES } from '../data/emotionalIntelligenceSeriesArticles';
import { RELATIONSHIP_FOUR_NARRATIVE_ARTICLES } from '../data/relationshipFourArticles';
import { PDF_FOUR_NARRATIVE_ARTICLES } from '../data/pdfFourBigFiveArticles';
import { CLINICAL_CHILDHOOD_ANXIETY_NARRATIVE_ARTICLES } from '../data/clinicalChildhoodAnxietyOverthinkingArticle';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { PageSEO } from '../components/PageSEO';
import {
  ReaderToolbar,
  FormattedContinuousManuscript,
  ContinuousViewMode,
} from '../components/ReaderToolbar';
import {
  ArticleBottomSocialShare,
} from '../components/FullScreenResearchStudyModal';
import {
  ResearchArticleModal,
  ResearchArticleModalProps,
} from '../components/ResearchArticleModal';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';
import {
  ArticleCategoryFilter,
  ArticleReadTimeFilter,
  ArticleKeywordFilter,
  ArticleSortOption,
  READ_TIME_FILTER_OPTIONS,
  ARTICLE_KEYWORD_OPTIONS,
  filterAndSortNarrativeArticles,
  filterAndSortAcademicPapers,
} from '../utils/articleFilters';
import { navigateCleanUrl } from '../utils/navigation';
import { ContextualLinkedText } from '../components/ContextualLinkedText';
import { ArticleRecommendationsSection } from '../components/ArticleRecommendationsSection';
import { ExistentialFatigueQuiz } from '../components/ExistentialFatigueQuiz';
import { CognitiveDistortionChallenge } from '../components/CognitiveDistortionChallenge';

export { ResearchArticleModal };
export type { ResearchArticleModalProps };

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

type ContentTrack = 'narrative' | 'academic';
type FilterCategory = ArticleCategoryFilter;

export const ArticlesEncyclopediaPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const [theme, toggleTheme] = useAppTheme();
  const isLight = theme === 'light';

  const [activeTrack, setActiveTrack] = useState<ContentTrack>('narrative');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedReadTime, setSelectedReadTime] = useState<ArticleReadTimeFilter>('all');
  const [selectedKeyword, setSelectedKeyword] = useState<ArticleKeywordFilter>('all');
  const [sortBy, setSortBy] = useState<ArticleSortOption>('newest');
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNarrative, setActiveNarrative] = useState<Article | null>(null);
  const [activeAcademic, setActiveAcademic] = useState<AcademicPaper | null>(null);
  const [fullScreenPaper, setFullScreenPaper] = useState<AcademicPaper | null>(null);
  const [fullScreenArticle, setFullScreenArticle] = useState<Article | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);
  const [copiedFullText, setCopiedFullText] = useState(false);
  const [copiedStoryFullText, setCopiedStoryFullText] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<number>(17);
  const [readerViewMode, setReaderViewMode] = useState<ContinuousViewMode>('segmented_and_continuous');

  useEffect(() => {
    const validCategories: FilterCategory[] = [
      'all',
      'relationships',
      'self_growth',
      'applied_psychology',
      'emotional_iq',
    ];

    const checkDeepLinkedArticle = () => {
      try {
        const rawHash = window.location.hash.replace(/^#\/?/, '');
        const [hashPath, hashQueryStr] = rawHash.split('?');
        const hashParts = hashPath.split('/').filter(Boolean);
        const pathParts = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

        const searchParams = new URLSearchParams(window.location.search || hashQueryStr || '');
        const queryCat = searchParams.get('category') as FilterCategory | null;
        const storedCat = sessionStorage.getItem('mirat_open_article_category') as FilterCategory | null;
        const targetCategory = queryCat || storedCat;

        if (targetCategory && validCategories.includes(targetCategory)) {
          sessionStorage.removeItem('mirat_open_article_category');
          setSelectedCategory(targetCategory);
        }

        const routeArticleId =
          (pathParts[0] === 'articles' || pathParts[0] === 'research') && pathParts[1]
            ? decodeURIComponent(pathParts[1])
            : (hashParts[0] === 'articles' || hashParts[0] === 'research') && hashParts[1]
            ? decodeURIComponent(hashParts[1])
            : null;
        const targetId = routeArticleId || sessionStorage.getItem('mirat_open_article_id');
        if (targetId) {
          sessionStorage.removeItem('mirat_open_article_id');
          if (validCategories.includes(targetId as FilterCategory)) {
            setSelectedCategory(targetId as FilterCategory);
            return;
          }
          const foundNarrative = ARTICLES_CATALOG.find((a) => a.id === targetId);
          if (foundNarrative) {
            setActiveTrack('narrative');
            setActiveAcademic(null);
            setActiveNarrative(foundNarrative);
            navigateCleanUrl(`/articles/${encodeURIComponent(foundNarrative.id)}`, {
              replace: true,
              scrollToTop: true,
            });
            return;
          }
          const foundAcademic = ACADEMIC_PAPERS_CATALOG.find((p) => p.id === targetId);
          if (foundAcademic) {
            setActiveTrack('academic');
            setActiveNarrative(null);
            setActiveAcademic(foundAcademic);
            navigateCleanUrl(`/articles/${encodeURIComponent(foundAcademic.id)}`, {
              replace: true,
              scrollToTop: true,
            });
            return;
          }
        } else if (pathParts[0] === 'articles' && !pathParts[1]) {
          setActiveNarrative(null);
          setActiveAcademic(null);
        }
      } catch {
        // ignore storage errors
      }
    };

    checkDeepLinkedArticle();
    window.addEventListener('popstate', checkDeepLinkedArticle);
    window.addEventListener('hashchange', checkDeepLinkedArticle);
    window.addEventListener('mirat:navigate', checkDeepLinkedArticle);
    return () => {
      window.removeEventListener('popstate', checkDeepLinkedArticle);
      window.removeEventListener('hashchange', checkDeepLinkedArticle);
      window.removeEventListener('mirat:navigate', checkDeepLinkedArticle);
    };
  }, []);

  const featuredGccFamilyStudy =
    ACADEMIC_PAPERS_CATALOG.find(
      (p) => p.id === 'research-gcc-family-based-psychosocial-interventions-chronic-disorders'
    ) || null;

  const handleCopyFullText = (paper: AcademicPaper) => {
    soundManager.playTap();
    const fullText = getFullContinuousAcademicText(paper, language);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopiedFullText(true);
      setTimeout(() => setCopiedFullText(false), 2600);
    }
  };

  const handleCopyStoryFullText = (article: Article) => {
    soundManager.playTap();
    const fullText = getFullContinuousNarrativeText(article, language);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
      setCopiedStoryFullText(true);
      setTimeout(() => setCopiedStoryFullText(false), 2600);
    }
  };

  const handleCopyApaCitation = (paper: AcademicPaper, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playTap();
    const year = paper.publishDate.slice(0, 4) || '2026';
    const citationUrl = `https://miratalqulub.com/articles/${encodeURIComponent(paper.id)}`;
    const citationText =
      language === 'ar'
        ? `وحدة الأبحاث والدراسات النفسية - مرآة القلوب. (${year}). ${paper.titleAr}. موسوعة مرآة القلوب للأبحاث النفسية المحكّمة. ${citationUrl}`
        : `Mirror of Hearts Psychological Research Unit. (${year}). ${paper.titleEn}. Mirror of Hearts Peer-Reviewed Encyclopedia. ${citationUrl}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(citationText);
      setCopiedCitationId(paper.id);
      setTimeout(() => setCopiedCitationId(null), 2500);
    }
  };

  const categories: { key: FilterCategory; labelAr: string; labelEn: string; icon: string }[] = [
    { key: 'all', labelAr: 'جميع التخصصات', labelEn: 'All Specialties', icon: '✨' },
    { key: 'relationships', labelAr: 'عيادة العلاقات والزواج', labelEn: 'Relationships & Marriage', icon: '💑' },
    { key: 'applied_psychology', labelAr: 'علم النفس التطبيقي والعصبي', labelEn: 'Applied & Neuro-Psychology', icon: '🧠' },
    { key: 'self_growth', labelAr: 'الهوية والاحتراق المبكر', labelEn: 'Identity & Burnout Recovery', icon: '🌱' },
    { key: 'emotional_iq', labelAr: 'الذكاء العاطفي والتواصل', labelEn: 'Emotional Intelligence (EQ)', icon: '🎯' },
  ];

  const filteredNarrativeArticles = useMemo(
    () =>
      filterAndSortNarrativeArticles(ARTICLES_CATALOG, {
        searchQuery,
        selectedCategory,
        selectedReadTime,
        selectedKeyword,
        sortBy,
      }),
    [searchQuery, selectedCategory, selectedReadTime, selectedKeyword, sortBy]
  );

  const filteredAcademicPapers = useMemo(
    () =>
      filterAndSortAcademicPapers(ACADEMIC_PAPERS_CATALOG, {
        searchQuery,
        selectedCategory,
        selectedReadTime,
        selectedKeyword,
        sortBy,
      }),
    [searchQuery, selectedCategory, selectedReadTime, selectedKeyword, sortBy]
  );

  // Deterministic faceted counts reflecting the active track
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: 0,
      relationships: 0,
      applied_psychology: 0,
      self_growth: 0,
      emotional_iq: 0,
    };
    const keys: FilterCategory[] = [
      'all',
      'relationships',
      'applied_psychology',
      'self_growth',
      'emotional_iq',
    ];
    keys.forEach((cat) => {
      counts[cat] =
        activeTrack === 'narrative'
          ? filterAndSortNarrativeArticles(ARTICLES_CATALOG, {
              searchQuery,
              selectedCategory: cat,
              selectedReadTime,
              selectedKeyword,
              sortBy,
            }).length
          : filterAndSortAcademicPapers(ACADEMIC_PAPERS_CATALOG, {
              searchQuery,
              selectedCategory: cat,
              selectedReadTime,
              selectedKeyword,
              sortBy,
            }).length;
    });
    return counts;
  }, [activeTrack, searchQuery, selectedReadTime, selectedKeyword, sortBy]);

  const readTimeCounts = useMemo(() => {
    const counts: Record<ArticleReadTimeFilter, number> = {
      all: 0,
      quick: 0,
      medium: 0,
      deep: 0,
    };
    READ_TIME_FILTER_OPTIONS.forEach((opt) => {
      counts[opt.id] =
        activeTrack === 'narrative'
          ? filterAndSortNarrativeArticles(ARTICLES_CATALOG, {
              searchQuery,
              selectedCategory,
              selectedReadTime: opt.id,
              selectedKeyword,
              sortBy,
            }).length
          : filterAndSortAcademicPapers(ACADEMIC_PAPERS_CATALOG, {
              searchQuery,
              selectedCategory,
              selectedReadTime: opt.id,
              selectedKeyword,
              sortBy,
            }).length;
    });
    return counts;
  }, [activeTrack, searchQuery, selectedCategory, selectedKeyword, sortBy]);

  const keywordCounts = useMemo(() => {
    const counts = {} as Record<ArticleKeywordFilter, number>;
    ARTICLE_KEYWORD_OPTIONS.forEach((opt) => {
      counts[opt.id] =
        activeTrack === 'narrative'
          ? filterAndSortNarrativeArticles(ARTICLES_CATALOG, {
              searchQuery,
              selectedCategory,
              selectedReadTime,
              selectedKeyword: opt.id,
              sortBy,
            }).length
          : filterAndSortAcademicPapers(ACADEMIC_PAPERS_CATALOG, {
              searchQuery,
              selectedCategory,
              selectedReadTime,
              selectedKeyword: opt.id,
              sortBy,
            }).length;
    });
    return counts;
  }, [activeTrack, searchQuery, selectedCategory, selectedReadTime, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedReadTime !== 'all' ||
    selectedKeyword !== 'all';

  const activeSecondaryFiltersCount =
    (selectedReadTime !== 'all' ? 1 : 0) + (selectedKeyword !== 'all' ? 1 : 0);

  const activeTrackTotal =
    activeTrack === 'narrative' ? ARTICLES_CATALOG.length : ACADEMIC_PAPERS_CATALOG.length;
  const activeTrackFilteredCount =
    activeTrack === 'narrative'
      ? filteredNarrativeArticles.length
      : filteredAcademicPapers.length;

  const resetAllFilters = () => {
    soundManager.playTap();
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedReadTime('all');
    setSelectedKeyword('all');
  };

  const openNarrativeArticle = (art: Article) => {
    setActiveAcademic(null);
    setActiveNarrative(art);
    navigateCleanUrl(`/articles/${encodeURIComponent(art.id)}`);
  };

  const openAcademicPaper = (paper: AcademicPaper) => {
    setActiveNarrative(null);
    setActiveAcademic(paper);
    navigateCleanUrl(`/articles/${encodeURIComponent(paper.id)}`);
  };

  const handleBackToList = () => {
    soundManager.playTap();
    setActiveNarrative(null);
    setActiveAcademic(null);
    navigateCleanUrl('/articles');
  };

  const activeArticleCanonicalPath = activeNarrative
    ? `/articles/${encodeURIComponent(activeNarrative.id)}`
    : activeAcademic
    ? `/articles/${encodeURIComponent(activeAcademic.id)}`
    : '/articles';

  const handleShareContent = (title: string, summary: string) => {
    soundManager.playTap();
    const shareTargetUrl = `https://miratalqulub.com${activeArticleCanonicalPath}`;
    const textToShare = `📖 ${title}\n${summary}\n${shareTargetUrl}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2400);
    }
  };

  const isReading = Boolean(activeNarrative || activeAcademic);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageSEO
        title={
          activeNarrative
            ? `${language === 'ar' ? activeNarrative.title : activeNarrative.titleEn} | ${language === 'ar' ? 'مرآة القلوب' : 'Mirror of Hearts'}`
            : activeAcademic
            ? `${language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn} | ${language === 'ar' ? 'مرآة القلوب' : 'Mirror of Hearts'}`
            : language === 'ar'
            ? 'موسوعة مرآة القلوب للمقالات والأبحاث النفسية المحكّمة (APA 7th) | مرآة القلوب'
            : 'Peer-Reviewed Psychological Research Papers & Clinical Articles | Mirror of Hearts'
        }
        description={
          activeNarrative
            ? language === 'ar'
              ? activeNarrative.summary
              : activeNarrative.summaryEn
            : activeAcademic
            ? language === 'ar'
              ? activeAcademic.abstractAr
              : activeAcademic.abstractEn
            : language === 'ar'
            ? 'موسوعة مرآة القلوب للمقالات والأبحاث النفسية: أولاً الأبحاث العلمية الكاملة المحكّمة بتوثيق APA 7th، وثانياً المقالات القصصية العيادية من واقع الجلسات النفسية.'
            : 'Mirror of Hearts Encyclopedia: Full peer-reviewed academic research papers (APA 7th) and clinical narrative case studies on relationship compatibility, EQ, and digital psychology.'
        }
        canonicalPath={activeArticleCanonicalPath}
        pageType={isReading ? 'article' : 'website'}
        language={language}
      />

      {/* Top Breadcrumb & Language Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToHome();
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-gray-200 border-white/10'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </button>

          {isReading && (
            <button
              onClick={handleBackToList}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                isLight
                  ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                  : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border-indigo-400/30'
              }`}
            >
              <ArrowRight className={`w-3.5 h-3.5 ${!isRTL ? 'rotate-180' : ''}`} />
              <span>{language === 'ar' ? 'العودة لفهرس الموسوعة' : 'Back to Encyclopedia Index'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              toggleTheme();
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1.5 ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-amber-200 border-indigo-400/30'
            }`}
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>
              {isLight
                ? language === 'ar'
                  ? 'الوضع الليلي'
                  : 'Dark Mode'
                : language === 'ar'
                ? 'الوضع النهاري'
                : 'Light Mode'}
            </span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              toggleLanguage();
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            {language === 'ar' ? 'Read in English 🇬🇧' : 'القراءة باللغة العربية 🇸🇦'}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      {!isReading && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-5 shadow-xl ${
            isLight
              ? 'bg-gradient-to-br from-indigo-50 via-white to-rose-50 border-slate-200 text-slate-900'
              : 'bg-gradient-to-br from-purple-950/60 via-slate-900/90 to-indigo-950/60 border-white/15 text-white'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 shadow-lg shadow-rose-500/25 shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-[14px] bg-[#0b0e17] overflow-hidden flex items-center justify-center">
                <img
                  src={OFFICIAL_LOGO_URL}
                  alt={language === 'ar' ? 'شعار مرآة القلوب الرسمي' : 'Mirror of Hearts Official Logo'}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-cyan-300 text-xs font-extrabold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>
                    {language === 'ar'
                      ? 'قسم المقالات المعرفية والأبحاث العلمية المحكّمة'
                      : 'Knowledge Articles & Peer-Reviewed Research Section'}
                  </span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  {language === 'ar' ? 'توثيق مرجعي APA 7th Edition' : 'APA 7th Edition Verified'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black font-['Alexandria'] leading-tight">
                {language === 'ar'
                  ? 'محتوى معرفي يعزز الوعي الذاتي والعلاقات الإنسانية'
                  : 'Knowledge Content Elevating Self-Awareness & Human Relationships'}
              </h1>
            </div>
          </div>

          <p
            className={`text-sm sm:text-base max-w-4xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-gray-300'
            }`}
          >
            {language === 'ar'
              ? 'يقدم قسم المقالات المعرفية محتوى متخصصاً ومبسطاً يتناول موضوعات الشخصية والعلاقات الإنسانية والتوافق النفسي والتطوير الذاتي، بالإضافة إلى الأبحاث العلمية المحكّمة، بهدف إثراء معرفة القارئ ومساعدته على فهم نفسه والآخرين بصورة أعمق.'
              : 'The Knowledge Articles & Research section offers specialized yet accessible content covering personality, human relationships, psychological compatibility, and self-development alongside peer-reviewed studies.'}
          </p>

          {/* مميزات القسم + ماذا ستجد في هذا القسم */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-950/60 border-white/10'
              }`}
            >
              <h3 className="text-xs sm:text-sm font-black font-['Alexandria'] text-emerald-600 dark:text-emerald-400">
                {language === 'ar' ? 'مميزات القسم:' : 'Section Features:'}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold">
                {(language === 'ar'
                  ? [
                      'مقالات متخصصة باللغة العربية',
                      'أسلوب واضح وسهل القراءة',
                      'موضوعات متنوعة ومفيدة',
                      'محتوى متجدد باستمرار',
                      'تركيز على التطبيق العملي',
                      'مناسب لمختلف القراء',
                    ]
                  : [
                      'Specialized Arabic & English articles',
                      'Clear and readable style',
                      'Diverse & practical topics',
                      'Continuously updated content',
                      'Focus on real-life application',
                      'Accessible for all readers',
                    ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-950/60 border-white/10'
              }`}
            >
              <h3 className="text-xs sm:text-sm font-black font-['Alexandria'] text-indigo-600 dark:text-indigo-300">
                {language === 'ar' ? 'ماذا ستجد في هذا القسم؟' : 'What You Will Find Here:'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(language === 'ar'
                  ? [
                      'مقالات تحليل الشخصية',
                      'مقالات العلاقات الإنسانية',
                      'مقالات التوافق الزواجي والعاطفي',
                      'مقالات التطوير الذاتي',
                      'مهارات التواصل',
                      'الذكاء العاطفي',
                      'نصائح وإرشادات عملية',
                    ]
                  : [
                      'Personality Analysis Articles',
                      'Human Relationships',
                      'Marital & Emotional Compatibility',
                      'Self-Development',
                      'Communication Skills',
                      'Emotional Intelligence',
                      'Practical Guidance',
                    ]
                ).map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                      isLight
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                        : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-200'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Spotlight Series: سلسلة علم النفس الإكلينيكي ونمو الطفل والقلق النفسي */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border space-y-3.5 ${
              isLight
                ? 'bg-gradient-to-r from-teal-50/90 via-white to-emerald-50/80 border-teal-300 shadow-sm'
                : 'bg-gradient-to-r from-teal-950/55 via-slate-900/85 to-emerald-950/45 border-teal-500/35 shadow-lg'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/30">
                  🩺{' '}
                  {language === 'ar'
                    ? `سلسلة علم النفس الإكلينيكي ونمو الطفل والقلق النفسي (${CLINICAL_CHILDHOOD_ANXIETY_NARRATIVE_ARTICLES.length} مقالات ودراسات سريرية)`
                    : `Clinical Psychology, Child Development & Anxiety Series (${CLINICAL_CHILDHOOD_ANXIETY_NARRATIVE_ARTICLES.length} Clinical Studies)`}
                </span>
                <h2
                  className={`text-sm sm:text-base font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'ar'
                    ? 'الأبحاث الإكلينيكية المتعمقة: أثر الطفولة في البلوغ، تشريح القلق النفسي، والتفكير الزائد في ضوء الخصوصية الثقافية العربية'
                    : 'In-Depth Clinical Studies: Childhood Impact on Adulthood, Anatomy of Psychological Anxiety & Overthinking in Arab Contexts'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setSelectedCategory('all');
                  setActiveTrack('narrative');
                }}
                className={`text-[11px] font-bold px-3 py-1 rounded-xl border transition cursor-pointer ${
                  isLight
                    ? 'bg-teal-100 hover:bg-teal-200 text-teal-900 border-teal-300'
                    : 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border-teal-500/40'
                }`}
              >
                {language === 'ar' ? 'عرض السلسلة الإكلينيكية ←' : 'View Clinical Series →'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {CLINICAL_CHILDHOOD_ANXIETY_NARRATIVE_ARTICLES.map((art, index) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedCategory(art.category);
                    setActiveTrack('narrative');
                    openNarrativeArticle(art);
                  }}
                  className={`p-3.5 rounded-2xl border text-start transition cursor-pointer flex flex-col justify-between gap-2 group ${
                    isLight
                      ? 'bg-white hover:bg-teal-50/70 border-slate-200 hover:border-teal-400 text-slate-900 shadow-xs'
                      : 'bg-slate-950/70 hover:bg-teal-950/50 border-white/10 hover:border-teal-400/50 text-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-lg">{art.icon}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isLight
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-teal-500/20 text-teal-300'
                        }`}
                      >
                        {language === 'ar' ? `الدراسة الإكلينيكية ${index + 1}` : `Clinical Study ${index + 1}`}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-black font-['Alexandria'] leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">
                      {language === 'ar' ? art.title : art.titleEn}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 dark:border-white/10 text-[10px] font-bold text-teal-600 dark:text-teal-300">
                    <span>{language === 'ar' ? art.readTime : art.readTimeEn}</span>
                    <span>{language === 'ar' ? 'اقرأ الدراسة ←' : 'Read Study →'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Series 0: المقالات التعريفية عن الموقع (2 Introductory Articles) */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border space-y-3.5 ${
              isLight
                ? 'bg-gradient-to-r from-cyan-50/90 via-white to-indigo-50/80 border-cyan-200 shadow-sm'
                : 'bg-gradient-to-r from-cyan-950/50 via-slate-900/80 to-indigo-950/40 border-cyan-500/30 shadow-lg'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                  🔬{' '}
                  {language === 'ar'
                    ? 'المقالات التعريفية عن الموقع — المنهجية العلمية وبناء المقاييس (مقالان)'
                    : 'Platform Introductory Articles — Scientific Foundations & Psychometric Design (2 Articles)'}
                </span>
                <h2
                  className={`text-sm sm:text-base font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'ar'
                    ? 'الأسس العلمية لاختبارات مرآة القلوب وكيف تُبنى الاختبارات النفسية المعتمدة علمياً؟'
                    : 'Scientific Foundations of Mirror of Hearts & How Scientifically Validated Psychological Tests Are Built'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setSelectedCategory('applied_psychology');
                  setActiveTrack('narrative');
                }}
                className={`text-[11px] font-bold px-3 py-1 rounded-xl border transition cursor-pointer ${
                  isLight
                    ? 'bg-cyan-100 hover:bg-cyan-200 text-cyan-900 border-cyan-300'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border-cyan-500/40'
                }`}
              >
                {language === 'ar' ? 'عرض المقالات التعريفية ←' : 'View Introductory Articles →'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PLATFORM_INTRODUCTORY_ARTICLES.map((art, index) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedCategory('applied_psychology');
                    setActiveTrack('narrative');
                    openNarrativeArticle(art);
                  }}
                  className={`p-4 rounded-2xl border text-start transition cursor-pointer flex flex-col justify-between gap-2.5 group ${
                    isLight
                      ? 'bg-white hover:bg-cyan-50/70 border-slate-200 hover:border-cyan-400 text-slate-900 shadow-xs'
                      : 'bg-slate-950/70 hover:bg-cyan-950/50 border-white/10 hover:border-cyan-400/50 text-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xl">{art.icon}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isLight
                            ? 'bg-cyan-100 text-cyan-800'
                            : 'bg-cyan-500/20 text-cyan-300'
                        }`}
                      >
                        {language === 'ar' ? `المقال التعريفي ${index + 1}` : `Intro Article ${index + 1}`}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-black font-['Alexandria'] leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {language === 'ar' ? art.title : art.titleEn}
                    </h3>
                    <p
                      className={`text-[11px] leading-relaxed line-clamp-2 ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {language === 'ar' ? art.summary : art.summaryEn}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 dark:border-white/10 text-[10px] font-bold text-cyan-600 dark:text-cyan-300">
                    <span>{language === 'ar' ? art.readTime : art.readTimeEn}</span>
                    <span>{language === 'ar' ? 'اقرأ المقال التعريفي كاملاً ←' : 'Read Full Article →'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Series 1: 6 Emotional Intelligence Articles (سلسلة الذكاء العاطفي وعلم النفس السلوكي) */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border space-y-3.5 ${
              isLight
                ? 'bg-gradient-to-r from-amber-50/90 via-white to-violet-50/80 border-amber-200 shadow-sm'
                : 'bg-gradient-to-r from-amber-950/50 via-slate-900/80 to-violet-950/40 border-amber-500/30 shadow-lg'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  🧠{' '}
                  {language === 'ar'
                    ? 'سلسلة الذكاء العاطفي وعلم النفس السلوكي — موسوعة متكاملة (6 مقالات شاملة)'
                    : 'Emotional Intelligence & Behavioral Psychology — Complete 6-Article Series'}
                </span>
                <h2
                  className={`text-sm sm:text-base font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'ar'
                    ? 'سلسلة الذكاء العاطفي: من الجذور العصبية والقياس السيكومتري إلى الزواج، الثقة بالنفس، وإدارة الضغوط'
                    : 'Emotional Intelligence Series: From Neural Roots & Measurement to Marriage, Self-Confidence & Stress Mastery'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setSelectedCategory('emotional_iq');
                  setActiveTrack('narrative');
                }}
                className={`text-[11px] font-bold px-3 py-1 rounded-xl border transition cursor-pointer ${
                  isLight
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                    : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/40'
                }`}
              >
                {language === 'ar' ? 'عرض قسم الذكاء العاطفي ←' : 'Filter Emotional IQ Category →'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {EMOTIONAL_IQ_NARRATIVE_ARTICLES.map((art, index) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedCategory('emotional_iq');
                    setActiveTrack('narrative');
                    openNarrativeArticle(art);
                  }}
                  className={`p-3.5 rounded-2xl border text-start transition cursor-pointer flex flex-col justify-between gap-2 group ${
                    isLight
                      ? 'bg-white hover:bg-amber-50/70 border-slate-200 hover:border-amber-400 text-slate-900 shadow-xs'
                      : 'bg-slate-950/70 hover:bg-amber-950/50 border-white/10 hover:border-amber-400/50 text-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-lg">{art.icon}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isLight
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {language === 'ar' ? `المقال ${index + 1} من 6` : `EQ Article ${index + 1} of 6`}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-black font-['Alexandria'] leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      {language === 'ar' ? art.title : art.titleEn}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 dark:border-white/10 text-[10px] font-bold text-amber-600 dark:text-amber-300">
                    <span>{language === 'ar' ? art.readTime : art.readTimeEn}</span>
                    <span>{language === 'ar' ? 'اقرأ المقال ←' : 'Read →'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Series 2: 4 Relationship Articles (موضوع العلاقات) */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border space-y-3.5 ${
              isLight
                ? 'bg-gradient-to-r from-rose-50/90 via-white to-amber-50/80 border-rose-200 shadow-sm'
                : 'bg-gradient-to-r from-rose-950/50 via-slate-900/80 to-purple-950/40 border-rose-500/30 shadow-lg'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                  💞{' '}
                  {language === 'ar'
                    ? 'قسم العلاقات والزواج — سلسلة علمية متكاملة (4 مقالات + خاتمة واعية)'
                    : 'Relationships & Marriage — Complete 4-Article Series'}
                </span>
                <h2
                  className={`text-sm sm:text-base font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'ar'
                    ? 'موسوعة العلاقات الواعية: التوافق العاطفي، أنماط التعلق، الحب الصحي، والتشريح العلمي لانهيار العلاقات'
                    : 'Conscious Relationships: Emotional Compatibility, Attachment Styles, Healthy Love & Anatomy of Failure'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setSelectedCategory('relationships');
                  setActiveTrack('narrative');
                }}
                className={`text-[11px] font-bold px-3 py-1 rounded-xl border transition cursor-pointer ${
                  isLight
                    ? 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300'
                    : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border-rose-500/40'
                }`}
              >
                {language === 'ar' ? 'عرض قسم مقالات العلاقات ←' : 'Filter Relationships Category →'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {RELATIONSHIP_FOUR_NARRATIVE_ARTICLES.map((art, index) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedCategory('relationships');
                    setActiveTrack('narrative');
                    openNarrativeArticle(art);
                  }}
                  className={`p-3.5 rounded-2xl border text-start transition cursor-pointer flex flex-col justify-between gap-2 group ${
                    isLight
                      ? 'bg-white hover:bg-rose-50/70 border-slate-200 hover:border-rose-400 text-slate-900 shadow-xs'
                      : 'bg-slate-950/70 hover:bg-rose-950/50 border-white/10 hover:border-rose-400/50 text-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-lg">{art.icon}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isLight
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {language === 'ar' ? `مقال العلاقات ${index + 1}` : `Rel. Article ${index + 1}`}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-black font-['Alexandria'] leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors">
                      {language === 'ar' ? art.title : art.titleEn}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 dark:border-white/10 text-[10px] font-bold text-rose-600 dark:text-rose-300">
                    <span>{language === 'ar' ? art.readTime : art.readTimeEn}</span>
                    <span>{language === 'ar' ? 'اقرأ المقال ←' : 'Read →'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Series 3: 4 Big Five Articles from PDF: من النفس الباطنة إلى العقل القيادي */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border space-y-3.5 ${
              isLight
                ? 'bg-gradient-to-r from-indigo-50/90 via-white to-emerald-50/80 border-indigo-200 shadow-sm'
                : 'bg-gradient-to-r from-indigo-950/50 via-slate-900/80 to-emerald-950/40 border-indigo-500/30 shadow-lg'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                  📚{' '}
                  {language === 'ar'
                    ? 'سلسلة علمية متكاملة (4 مقالات مقسمة)'
                    : 'Complete 4-Article Scientific Series'}
                </span>
                <h2
                  className={`text-sm sm:text-base font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'ar'
                    ? 'من النفس الباطنة إلى العقل القيادي: تحليل علمي متكامل لأنواع الشخصية عبر العوامل الخمسة'
                    : 'From the Inner Psyche to the Leadership Mind: Integrated Scientific Analysis Across the Big Five'}
                </h2>
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
                  isLight
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {language === 'ar' ? 'اختر أياً من المقالات الـ 4 لقراءته فوراً' : 'Select any of the 4 articles'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PDF_FOUR_NARRATIVE_ARTICLES.map((art, index) => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTrack('narrative');
                    openNarrativeArticle(art);
                  }}
                  className={`p-3.5 rounded-2xl border text-start transition cursor-pointer flex flex-col justify-between gap-2 group ${
                    isLight
                      ? 'bg-white hover:bg-indigo-50/70 border-slate-200 hover:border-indigo-400 text-slate-900 shadow-xs'
                      : 'bg-slate-950/70 hover:bg-indigo-950/50 border-white/10 hover:border-indigo-400/50 text-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-lg">{art.icon}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isLight
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-indigo-500/20 text-indigo-300'
                        }`}
                      >
                        {language === 'ar' ? `مقال ${index + 1} من 4` : `Article ${index + 1} of 4`}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-black font-['Alexandria'] leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      {language === 'ar' ? art.title : art.titleEn}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 dark:border-white/10 text-[10px] font-bold text-indigo-600 dark:text-indigo-300">
                    <span>{language === 'ar' ? art.readTime : art.readTimeEn}</span>
                    <span>{language === 'ar' ? 'اقرأ المقال ←' : 'Read →'}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Track Selector Cards — Track 1: Academic Research FIRST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveTrack('academic');
              }}
              className={`p-5 rounded-3xl border text-start transition cursor-pointer flex items-start gap-4 ${
                activeTrack === 'academic'
                  ? isLight
                    ? 'bg-gradient-to-r from-indigo-700 to-cyan-700 text-white border-indigo-600 shadow-xl'
                    : 'bg-gradient-to-r from-indigo-600/40 to-cyan-600/35 text-white border-cyan-400 shadow-xl'
                  : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 border-white/10'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  activeTrack === 'academic'
                    ? 'bg-white/20 text-white'
                    : 'bg-cyan-500/15 text-cyan-500'
                }`}
              >
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-black text-base sm:text-lg font-['Alexandria']">
                    {language === 'ar'
                      ? 'أولاً: الأبحاث العلمية الكاملة (APA 7th)'
                      : 'First: Full Academic Research Papers'}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      activeTrack === 'academic'
                        ? 'bg-white/25 text-white'
                        : 'bg-cyan-500/15 text-cyan-500'
                    }`}
                  >
                    {ACADEMIC_PAPERS_CATALOG.length} {language === 'ar' ? 'أبحاث محكّمة' : 'Papers'}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                    activeTrack === 'academic'
                      ? 'text-white/95'
                      : isLight
                      ? 'text-slate-600'
                      : 'text-gray-400'
                  }`}
                >
                  {language === 'ar'
                    ? 'دراسات بحثية أكاديمية متكاملة (ملخص، مقدمة، إطار نظري، منهجية، تحليل ومناقشة، توصيات، ومراجع APA 7th).'
                    : 'Complete scholarly research papers (Abstract, Introduction, Theoretical Framework, Methodology, Analysis, & APA 7th References).'}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveTrack('narrative');
              }}
              className={`p-5 rounded-3xl border text-start transition cursor-pointer flex items-start gap-4 ${
                activeTrack === 'narrative'
                  ? isLight
                    ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white border-rose-600 shadow-xl'
                    : 'bg-gradient-to-r from-rose-600/35 to-purple-600/35 text-white border-rose-400 shadow-xl'
                  : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-sm'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 border-white/10'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  activeTrack === 'narrative'
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-500/15 text-rose-500'
                }`}
              >
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-black text-base sm:text-lg font-['Alexandria']">
                    {language === 'ar' ? 'ثانياً: المقالات القصصية العلمية' : 'Second: Clinical Narrative Articles'}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      activeTrack === 'narrative'
                        ? 'bg-white/25 text-white'
                        : 'bg-rose-500/15 text-rose-500'
                    }`}
                  >
                    {ARTICLES_CATALOG.length} {language === 'ar' ? 'مقالاً' : 'Articles'}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                    activeTrack === 'narrative'
                      ? 'text-white/95'
                      : isLight
                      ? 'text-slate-600'
                      : 'text-gray-400'
                  }`}
                >
                  {language === 'ar'
                    ? 'جولات داخل عيادة العلاج النفسي والأسري: قصص واقعية، تفكيك سيكولوجي، واختبارات سلوكية عملية.'
                    : 'Inside the psychotherapy clinic: real-world case narratives, psychological deconstruction, and practical behavioral tests.'}
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!isReading ? (
          <motion.div
            key="catalog-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Structured Filter & Sort Bar */}
            <div
              className={`p-4 sm:p-5 rounded-3xl border space-y-3.5 shadow-sm ${
                isLight
                  ? 'bg-white border-slate-200'
                  : 'bg-slate-900/50 border-white/10'
              }`}
            >
              {/* Search & Sort Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className={`w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                      isRTL ? 'right-4' : 'left-4'
                    }`}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      language === 'ar'
                        ? 'ابحث في المقالات والأبحاث (غوتمان، التوافق، الانهيار النرجسي، الذكاء الاصطناعي، الاحتراق، تيك توك)...'
                        : 'Search articles & research papers (Gottman, compatibility, narcissistic collapse, AI dependency, burnout)...'
                    }
                    className={`w-full ${
                      isRTL ? 'pr-11 pl-9' : 'pl-11 pr-9'
                    } py-3 rounded-2xl border text-sm focus:outline-none transition ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600'
                        : 'bg-white/5 border-white/15 text-white placeholder-gray-400 focus:border-purple-400'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label={language === 'ar' ? 'مسح البحث' : 'Clear search'}
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? 'left-3' : 'right-3'
                      } text-xs text-slate-400 hover:text-slate-200 cursor-pointer`}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Deterministic Sort Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      isLight ? 'text-slate-600' : 'text-gray-300'
                    }`}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="hidden sm:inline">
                      {language === 'ar' ? 'الترتيب:' : 'Sort:'}
                    </span>
                  </span>
                  <select
                    aria-label={language === 'ar' ? 'ترتيب المقالات والأبحاث' : 'Sort articles and papers'}
                    title={language === 'ar' ? 'ترتيب المقالات والأبحاث' : 'Sort articles and papers'}
                    value={sortBy}
                    onChange={(e) => {
                      soundManager.playTap();
                      setSortBy(e.target.value as ArticleSortOption);
                    }}
                    className={`px-3.5 py-3 rounded-2xl border text-xs font-bold focus:outline-none cursor-pointer ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-600'
                        : 'bg-slate-950/90 border-white/15 text-white focus:border-purple-400'
                    }`}
                  >
                    <option value="newest">
                      {language === 'ar' ? 'الأحدث نشراً' : 'Newest First'}
                    </option>
                    <option value="most_read">
                      {language === 'ar' ? 'الأكثر قراءة وتميزاً' : 'Most Read & Featured'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.key;
                  const count = categoryCounts[cat.key];
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        soundManager.playTap();
                        setSelectedCategory(cat.key);
                      }}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md'
                          : isLight
                          ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{language === 'ar' ? cat.labelAr : cat.labelEn}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : isLight
                            ? 'bg-slate-200/80 text-slate-600'
                            : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Collapsible Trigger for Reading Time & Keywords */}
              <div
                className={`pt-3 border-t flex items-center justify-between gap-2 md:hidden ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setMobileFiltersExpanded((prev) => !prev);
                  }}
                  aria-expanded={mobileFiltersExpanded}
                  className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl border transition cursor-pointer ${
                    activeSecondaryFiltersCount > 0
                      ? isLight
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'bg-indigo-500/20 border-indigo-400/40 text-cyan-200'
                      : isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-white/5 border-white/10 text-gray-200'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                  <span>
                    {language === 'ar' ? 'تصفية حسب مدة القراءة والوسوم' : 'Reading Time & Keywords'}
                  </span>
                  {activeSecondaryFiltersCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px] font-black">
                      {activeSecondaryFiltersCount}
                    </span>
                  )}
                  {mobileFiltersExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                <span className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                  {language === 'ar'
                    ? `${activeTrackFilteredCount} نتيجة`
                    : `${activeTrackFilteredCount} results`}
                </span>
              </div>

              {/* Secondary Filters: Reading Time & Keywords (Always visible on Desktop, collapsible on Mobile) */}
              <div
                className={`${
                  mobileFiltersExpanded ? 'grid' : 'hidden md:grid'
                } grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                {/* Reading Time Filter */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className={isLight ? 'text-slate-700' : 'text-gray-200'}>
                      {language === 'ar' ? 'مدة القراءة:' : 'Reading Time:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {READ_TIME_FILTER_OPTIONS.map((opt) => {
                      const isSelected = selectedReadTime === opt.id;
                      const count = readTimeCounts[opt.id];
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setSelectedReadTime(opt.id);
                          }}
                          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-semibold border transition cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm font-bold'
                              : isLight
                              ? 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                              : 'bg-white/5 text-gray-300 hover:text-white hover:border-white/25 border-white/10'
                          }`}
                        >
                          <span>{language === 'ar' ? opt.labelAr : opt.labelEn}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                              isSelected
                                ? 'bg-slate-950/15 text-slate-950'
                                : isLight
                                ? 'bg-slate-200/80 text-slate-600'
                                : 'bg-white/10 text-gray-300'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Keywords / Tags Filter */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Hash className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span className={isLight ? 'text-slate-700' : 'text-gray-200'}>
                      {language === 'ar' ? 'الكلمات المفتاحية والوسوم:' : 'Keywords & Tags:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {ARTICLE_KEYWORD_OPTIONS.map((opt) => {
                      const isSelected = selectedKeyword === opt.id;
                      const count = keywordCounts[opt.id];
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setSelectedKeyword(opt.id);
                          }}
                          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-semibold border transition cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-cyan-600 text-white border-cyan-400 shadow-sm font-bold'
                              : isLight
                              ? 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                              : 'bg-white/5 text-gray-300 hover:text-white hover:border-white/25 border-white/10'
                          }`}
                        >
                          <span>{language === 'ar' ? opt.labelAr : opt.labelEn}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : isLight
                                ? 'bg-slate-200/80 text-slate-600'
                                : 'bg-white/10 text-gray-300'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Results Count & Reset Filters Summary Bar */}
              <div
                className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                  isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-gray-300'
                }`}
              >
                <span className="font-semibold">
                  {activeTrack === 'academic'
                    ? language === 'ar'
                      ? `عرض ${activeTrackFilteredCount} من أصل ${activeTrackTotal} بحثاً علمياً محكّماً`
                      : `Showing ${activeTrackFilteredCount} of ${activeTrackTotal} peer-reviewed papers`
                    : language === 'ar'
                    ? `عرض ${activeTrackFilteredCount} من أصل ${activeTrackTotal} مقالاً قصصياً وعلمياً`
                    : `Showing ${activeTrackFilteredCount} of ${activeTrackTotal} clinical narrative articles`}
                </span>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border transition cursor-pointer ${
                      isLight
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                        : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border-rose-500/30'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
                  </button>
                )}
              </div>
            </div>

              {/* Integrated Encyclopedia Reader Control Bar (Always Visible on Index & Reader) */}
              <div className="pt-1 space-y-2">
                <ReaderToolbar
                  fontSize={readerFontSize}
                  onChangeFontSize={setReaderFontSize}
                  viewMode={readerViewMode}
                  onChangeViewMode={setReaderViewMode}
                  shareTitle={
                    language === 'ar'
                      ? 'موسوعة مرآة القلوب للمقالات والأبحاث النفسية المحكّمة'
                      : 'Mirror of Hearts Encyclopedia of Peer-Reviewed Research & Clinical Articles'
                  }
                  shareSummary={
                    language === 'ar'
                      ? 'أبحاث علمية محكّمة بصيغة APA 7th ودراسات حالة عيادية وقصصية كاملة مع قارئ متكامل يدعم التحكم بحجم الخط والوضع الليلي.'
                      : 'Peer-reviewed APA 7th research papers and clinical case studies with an integrated reader supporting font-size control and Dark/Light mode.'
                  }
                  shareUrl="https://miratalqulub.com/articles"
                  contentTypeLabelAr="للمقالات والأبحاث"
                  contentTypeLabelEn="Articles & Papers"
                />

                {/* Quick-Launch Reader Selector Bar */}
                <div
                  className={`p-3 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-white/[0.03] border-white/10 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-indigo-700 dark:text-cyan-300">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'القارئ المتكامل السريع — اختر بحثاً أو مقالاً لفتحه مباشرة:'
                        : 'Integrated Quick Reader — Select a study or article to open directly:'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label={
                        language === 'ar'
                          ? 'اختر بحثاً علمياً أو مقالاً لفتحه في القارئ المتكامل'
                          : 'Select a research paper or article to open in the integrated reader'
                      }
                      value=""
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!val) return;
                        soundManager.playTap();
                        if (val.startsWith('paper:')) {
                          const paperId = val.replace('paper:', '');
                          const foundPaper = ACADEMIC_PAPERS_CATALOG.find((p) => p.id === paperId);
                          if (foundPaper) {
                            openAcademicPaper(foundPaper);
                          }
                        } else if (val.startsWith('article:')) {
                          const artId = val.replace('article:', '');
                          const foundArt = ARTICLES_CATALOG.find((a) => a.id === artId);
                          if (foundArt) {
                            openNarrativeArticle(foundArt);
                          }
                        }
                      }}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer max-w-xs sm:max-w-md truncate ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-800'
                          : 'bg-slate-900 border-white/15 text-white'
                      }`}
                    >
                      <option value="">
                        {language === 'ar'
                          ? '📖 اختر من قائمة الأبحاث المحكّمة والمقالات السريرية...'
                          : '📖 Choose from Peer-Reviewed Papers & Clinical Articles...'}
                      </option>
                      <optgroup
                        label={
                          language === 'ar'
                            ? 'أولاً: الأبحاث العلمية المحكّمة (APA 7th)'
                            : '1. Peer-Reviewed Research Papers (APA 7th)'
                        }
                      >
                        {ACADEMIC_PAPERS_CATALOG.map((p, idx) => (
                          <option key={p.id} value={`paper:${p.id}`}>
                            {idx + 1}. {language === 'ar' ? p.titleAr : p.titleEn}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup
                        label={
                          language === 'ar'
                            ? 'ثانياً: المقالات والسجلات القصصية السريرية'
                            : '2. Clinical Narrative Articles & Case Records'
                        }
                      >
                        {ARTICLES_CATALOG.map((a, idx) => (
                          <option key={a.id} value={`article:${a.id}`}>
                            {idx + 1}. {language === 'ar' ? a.title : a.titleEn}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

            {/* Track 1: Clinical Narrative Articles */}
            {activeTrack === 'narrative' && (
              filteredNarrativeArticles.length === 0 ? (
                <div
                  className={`py-16 px-6 text-center space-y-4 rounded-3xl border ${
                    isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <BookOpen className="w-11 h-11 text-rose-500/80 mx-auto" />
                  <h3 className="text-base sm:text-lg font-black font-['Alexandria']">
                    {language === 'ar'
                      ? 'لم يتم العثور على مقالات مطابقة للفلاتر المحددة'
                      : 'No matching articles found for the selected filters'}
                  </h3>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredNarrativeArticles.map((art) => (
                    <motion.article
                      key={art.id}
                      whileHover={{ scale: 1.01, y: -3 }}
                      onClick={() => {
                        soundManager.playTap();
                        openNarrativeArticle(art);
                      }}
                      className={`p-6 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-md ${
                        isLight
                          ? 'bg-white hover:bg-rose-50/40 border-slate-200 hover:border-rose-400'
                          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-rose-500/40'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-300 text-xs font-bold border border-rose-500/30 flex items-center gap-1.5 whitespace-nowrap">
                            <span>{art.icon}</span>
                            <span>{language === 'ar' ? art.categoryLabelAr : art.categoryLabelEn}</span>
                          </span>
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{language === 'ar' ? art.readTime : art.readTimeEn}</span>
                          </span>
                        </div>

                        <h3
                          className={`text-base sm:text-lg font-black leading-snug font-['Alexandria'] ${
                            isLight
                              ? 'text-slate-900 group-hover:text-rose-600'
                              : 'text-white group-hover:text-rose-300'
                          }`}
                        >
                          {language === 'ar' ? art.title : art.titleEn}
                        </h3>

                        <p
                          className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-gray-300'
                          }`}
                        >
                          {language === 'ar' ? art.summary : art.summaryEn}
                        </p>
                      </div>

                      <div
                        className={`pt-3 border-t space-y-2.5 text-xs ${
                          isLight ? 'border-slate-200' : 'border-white/10'
                        }`}
                      >
                        <div className="text-[11px] text-purple-600 dark:text-purple-300 font-semibold truncate">
                          🔬 {language === 'ar' ? art.scientificFramework : art.scientificFrameworkEn}
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                soundManager.playTap();
                                setFullScreenArticle(art);
                              }}
                              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-[11px] font-extrabold inline-flex items-center gap-1 shadow-sm transition cursor-pointer whitespace-nowrap"
                            >
                              <Maximize2 className="w-3 h-3 shrink-0" />
                              <span>{language === 'ar' ? 'ملء الشاشة' : 'Full Screen'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                soundManager.playTap();
                                setReaderViewMode('continuous_only');
                                openNarrativeArticle(art);
                              }}
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer whitespace-nowrap ${
                                isLight
                                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                  : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border-rose-400/30'
                              }`}
                            >
                              📜 {language === 'ar' ? 'قراءة كاملة دون تجزئة' : 'Full Unsegmented'}
                            </button>
                          </div>
                          <span className="text-rose-600 dark:text-rose-400 font-extrabold inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                            <span>{language === 'ar' ? 'قراءة المقال' : 'Read'}</span>
                            <ChevronRight className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )
            )}

            {/* Track 1: Full Academic Research Papers (أولاً: الأبحاث العلمية الكاملة) */}
            {activeTrack === 'academic' && (
              <div className="space-y-5">
                {/* Academic Methodology & Peer-Review Charter Banner */}
                <div
                  className={`p-5 sm:p-6 rounded-3xl border space-y-3 ${
                    isLight
                      ? 'bg-gradient-to-r from-indigo-50 via-cyan-50/60 to-slate-50 border-indigo-200 text-slate-800 shadow-sm'
                      : 'bg-gradient-to-r from-indigo-950/50 via-slate-900/80 to-cyan-950/40 border-cyan-500/30 text-gray-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-indigo-700 dark:text-cyan-300 font-black text-sm sm:text-base font-['Alexandria']">
                      <GraduationCap className="w-5 h-5 shrink-0" />
                      <span>
                        {language === 'ar'
                          ? 'ميثاق الأبحاث العلمية الكاملة ومنهجية التوثيق المرجعي (APA 7th Edition)'
                          : 'Full Academic Research Charter & Peer-Review Methodology (APA 7th Edition)'}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                      {language === 'ar'
                        ? 'إشراف: وحدة الأبحاث والدراسات النفسية — مرآة القلوب'
                        : 'Supervised by: Mirror of Hearts Psychological Research Unit'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {language === 'ar'
                      ? 'يضم هذا القسم أوراقاً بحثية ودراسات نفسية وعصبية متكاملة مصاغة وفق المعايير الأكاديمية المحكّمة: (الملخص، الكلمات المفتاحية، المقدمة والإشكالية البحثية، الإطار النظري والدراسات السابقة، منهجية البحث، التحليل والمناقشة، الخاتمة، التوصيات السريرية والتشريعية، وقائمة المراجع بصيغة APA 7th). جميع الأبحاث متاحة للقراءة الكاملة والاستشهاد العلمي المباشر.'
                      : 'This section houses complete peer-reviewed psychological and neuroscientific papers structured according to rigorous academic standards: Abstract, Keywords, Introduction & Research Problem, Theoretical Framework, Methodology, Analysis & Discussion, Conclusion, Multi-Tier Recommendations, and verified APA 7th References.'}
                  </p>
                </div>

                {/* Featured Research Study Spotlight: GCC Family-Based Psychosocial Interventions */}
                {featuredGccFamilyStudy && (
                  <div
                    className={`p-6 sm:p-7 rounded-3xl border-2 space-y-4 shadow-xl transition-all ${
                      isLight
                        ? 'bg-gradient-to-br from-indigo-50 via-white to-emerald-50/70 border-indigo-300 text-slate-900'
                        : 'bg-gradient-to-br from-indigo-950/60 via-slate-900/95 to-emerald-950/45 border-cyan-400/45 text-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center gap-1.5 shadow-sm">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>
                            {language === 'ar'
                              ? 'دراسة مرجعية مميزة — العرض الكامل بملء الشاشة'
                              : 'Featured Reference Study — Full-Screen Scrollable View'}
                          </span>
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                          {language === 'ar'
                            ? featuredGccFamilyStudy.methodologyBadgeAr
                            : featuredGccFamilyStudy.methodologyBadgeEn}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {language === 'ar'
                            ? featuredGccFamilyStudy.readTimeAr
                            : featuredGccFamilyStudy.readTimeEn}
                        </span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-black leading-snug font-['Alexandria']">
                      {language === 'ar'
                        ? featuredGccFamilyStudy.titleAr
                        : featuredGccFamilyStudy.titleEn}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? 'text-slate-700' : 'text-gray-200'
                      }`}
                    >
                      {language === 'ar'
                        ? featuredGccFamilyStudy.abstractAr
                        : featuredGccFamilyStudy.abstractEn}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-200/70 dark:border-white/10">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-indigo-700 dark:text-cyan-300">
                          🎛️{' '}
                          {language === 'ar'
                            ? 'يدعم التحكم بحجم الخط (A-/A+) • الوضع الليلي/النهاري • المشاركة الاجتماعية'
                            : 'Supports Font-Size Control • Dark/Light Mode • Social Sharing'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setFullScreenPaper(featuredGccFamilyStudy);
                          }}
                          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg transition cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4" />
                          <span>
                            {language === 'ar'
                              ? 'فتح الدراسة في نافذة ملء الشاشة القابلة للتمرير'
                              : 'Open in Full-Screen Scrollable View'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setReaderViewMode('continuous_only');
                            openAcademicPaper(featuredGccFamilyStudy);
                          }}
                          className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition cursor-pointer flex items-center gap-1.5 ${
                            isLight
                              ? 'bg-white hover:bg-indigo-50 text-indigo-800 border-indigo-300'
                              : 'bg-white/10 hover:bg-white/20 text-cyan-200 border-white/15'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          <span>
                            {language === 'ar'
                              ? 'قراءة متصلة داخل الصفحة'
                              : 'Read Inline Unsegmented'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Academic Papers Grid */}
                {filteredAcademicPapers.length === 0 ? (
                  <div
                    className={`py-16 px-6 text-center space-y-4 rounded-3xl border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <GraduationCap className="w-11 h-11 text-cyan-500/80 mx-auto" />
                    <h3 className="text-base sm:text-lg font-black font-['Alexandria']">
                      {language === 'ar'
                        ? 'لم يتم العثور على أبحاث محكّمة مطابقة للفلاتر المحددة'
                        : 'No matching peer-reviewed papers found for the selected filters'}
                    </h3>
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
                    </button>
                  </div>
                ) : (
                <div className="grid grid-cols-1 gap-5">
                  {filteredAcademicPapers.map((paper, pIdx) => (
                    <motion.article
                      key={paper.id}
                      whileHover={{ scale: 1.005, y: -2 }}
                      onClick={() => {
                        soundManager.playTap();
                        openAcademicPaper(paper);
                      }}
                      className={`p-6 sm:p-7 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-md ${
                        isLight
                          ? 'bg-white hover:bg-indigo-50/40 border-slate-200 hover:border-indigo-400'
                          : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-black border border-amber-500/30 whitespace-nowrap">
                              {language === 'ar' ? `الدراسة البحثية #${pIdx + 1}` : `Research Study #${pIdx + 1}`}
                            </span>
                            <span className="px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 text-xs font-extrabold border border-cyan-500/30 flex items-center gap-1.5 whitespace-nowrap">
                              <span>{paper.icon}</span>
                              <span>
                                {language === 'ar' ? paper.categoryLabelAr : paper.categoryLabelEn}
                              </span>
                            </span>
                            <span className="px-3 py-1 rounded-xl bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-500/30">
                              {language === 'ar' ? paper.methodologyBadgeAr : paper.methodologyBadgeEn}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs shrink-0">
                            <span className="text-amber-600 dark:text-amber-400 font-semibold inline-flex items-center gap-1 whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              <span>{language === 'ar' ? paper.readTimeAr : paper.readTimeEn}</span>
                            </span>
                            <span className="text-slate-500 dark:text-gray-400 font-medium inline-flex items-center gap-1 whitespace-nowrap">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              <span>{paper.publishDate}</span>
                            </span>
                          </div>
                        </div>

                        <h3
                          className={`text-lg sm:text-xl font-black leading-snug font-['Alexandria'] ${
                            isLight
                              ? 'text-slate-900 group-hover:text-indigo-700'
                              : 'text-white group-hover:text-cyan-300'
                          }`}
                        >
                          {language === 'ar' ? paper.titleAr : paper.titleEn}
                        </h3>

                        <p
                          className={`text-xs italic font-medium ${
                            isLight ? 'text-slate-500' : 'text-gray-400'
                          }`}
                        >
                          {language === 'ar' ? paper.titleEn : paper.titleAr}
                        </p>

                        <p
                          className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                            isLight ? 'text-slate-600' : 'text-gray-300'
                          }`}
                        >
                          {language === 'ar' ? paper.abstractAr : paper.abstractEn}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(language === 'ar' ? paper.keywordsAr : paper.keywordsEn).map((kw, idx) => (
                            <span
                              key={idx}
                              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold ${
                                isLight
                                  ? 'bg-slate-100 text-slate-700 border border-slate-200'
                                  : 'bg-white/5 text-gray-300 border border-white/10'
                              }`}
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                          isLight ? 'border-slate-200' : 'border-white/10'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            📚 {paper.apaReferences.length}{' '}
                            {language === 'ar'
                              ? 'مرجعاً أكاديمياً موثقاً بصيغة APA 7th'
                              : 'Verified APA 7th Citations'}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyApaCitation(paper, e)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                              copiedCitationId === paper.id
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : isLight
                                ? 'bg-slate-100 hover:bg-indigo-50 text-slate-700 border-slate-300'
                                : 'bg-white/5 hover:bg-white/10 text-cyan-200 border-white/15'
                            }`}
                          >
                            {copiedCitationId === paper.id ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <BookMarked className="w-3 h-3" />
                            )}
                            <span>
                              {copiedCitationId === paper.id
                                ? language === 'ar'
                                  ? 'تم نسخ توثيق APA!'
                                  : 'APA Citation Copied!'
                                : language === 'ar'
                                ? 'نسخ التوثيق (APA)'
                                : 'Copy APA Citation'}
                            </span>
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playTap();
                              setFullScreenPaper(paper);
                            }}
                            className="px-3 py-1 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>
                              {language === 'ar' ? 'عرض بملء الشاشة' : 'Full-Screen View'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playTap();
                              setReaderViewMode('continuous_only');
                              openAcademicPaper(paper);
                            }}
                            className={`px-3 py-1 rounded-xl text-[11px] font-extrabold border transition cursor-pointer ${
                              isLight
                                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                                : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200 border-cyan-400/30'
                            }`}
                          >
                            📜 {language === 'ar' ? 'قراءة كاملة دون تجزئة' : 'Full Continuous'}
                          </button>
                          <span className="text-indigo-600 dark:text-cyan-400 font-extrabold inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                            <span>
                              {language === 'ar'
                                ? 'قراءة البحث العلمي الكامل'
                                : 'Read Full Research Paper'}
                            </span>
                            <ChevronRight className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
                )}
              </div>
            )}

            {/* Interactive CBT Thought Record & Cognitive Distortion Challenge Section */}
            <div className="pt-2">
              <CognitiveDistortionChallenge
                onOpenDistortionsArticle={() => {
                  const target = ARTICLES_CATALOG.find(
                    (a) => a.id === 'most-common-cognitive-distortions'
                  );
                  if (target) {
                    setActiveTrack('narrative');
                    openNarrativeArticle(target);
                  }
                }}
              />
            </div>
          </motion.div>
        ) : activeNarrative ? (
          /* Full-Page Narrative Article Reader */
          <motion.article
            key="page-narrative-reader"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-4 shadow-xl ${
                isLight
                  ? 'bg-gradient-to-br from-rose-50 via-white to-purple-50 border-rose-200 text-slate-900'
                  : `bg-gradient-to-br ${activeNarrative.coverGradient} border-purple-500/30 text-white`
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-700 dark:text-rose-200 text-xs font-extrabold flex items-center gap-1.5">
                  <span>{activeNarrative.icon}</span>
                  <span>
                    {language === 'ar'
                      ? activeNarrative.categoryLabelAr
                      : activeNarrative.categoryLabelEn}
                  </span>
                </span>
                <div className="flex items-center gap-3 text-xs opacity-80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      {language === 'ar' ? activeNarrative.readTime : activeNarrative.readTimeEn}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>{activeNarrative.publishDate}</span>
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black leading-tight font-['Alexandria']">
                {language === 'ar' ? activeNarrative.title : activeNarrative.titleEn}
              </h1>

              <p className="text-sm sm:text-base leading-relaxed opacity-90">
                {language === 'ar' ? activeNarrative.summary : activeNarrative.summaryEn}
              </p>

              <div
                className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-black/40 border-white/10 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>
                    <strong>
                      {language === 'ar' ? 'الإطار العلمي المعتمد: ' : 'Scientific Framework: '}
                    </strong>
                    {language === 'ar'
                      ? activeNarrative.scientificFramework
                      : activeNarrative.scientificFrameworkEn}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleShareContent(
                      language === 'ar' ? activeNarrative.title : activeNarrative.titleEn,
                      language === 'ar' ? activeNarrative.summary : activeNarrative.summaryEn
                    )
                  }
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>
                    {copiedShare
                      ? language === 'ar'
                        ? 'تم النسخ!'
                        : 'Copied!'
                      : language === 'ar'
                      ? 'مشاركة المقال'
                      : 'Share Article'}
                  </span>
                </button>
              </div>
            </div>

            {/* Reader Toolbar: Font Size, Dark/Light Mode, View Mode Toggle, Full-Screen, Social Media Share */}
            <ReaderToolbar
              fontSize={readerFontSize}
              onChangeFontSize={setReaderFontSize}
              viewMode={readerViewMode}
              onChangeViewMode={setReaderViewMode}
              onJumpToContinuous={() => {
                const el = document.getElementById('sec-full-continuous-story');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              onOpenFullScreen={() => setFullScreenArticle(activeNarrative)}
              shareTitle={language === 'ar' ? activeNarrative.title : activeNarrative.titleEn}
              shareSummary={language === 'ar' ? activeNarrative.summary : activeNarrative.summaryEn}
              shareUrl={`https://miratalqulub.com/articles/${encodeURIComponent(activeNarrative.id)}`}
              contentTypeLabelAr="للقصة والسجل العيادي"
              contentTypeLabelEn="Story"
            />

            {readerViewMode === 'segmented_and_continuous' && (
              <div
                className="space-y-6 transition-all"
                style={{ fontSize: `${readerFontSize}px` }}
              >
                {activeNarrative.clinicalCaseQuoteAr && (
                  <div
                    className={`p-5 sm:p-6 rounded-3xl border-s-4 border-rose-500 space-y-2 ${
                      isLight
                        ? 'bg-rose-50/70 text-slate-800 border border-rose-200'
                        : 'bg-rose-950/25 text-rose-100 border border-rose-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                      <Quote className="w-4 h-4" />
                      <span>
                        {language === 'ar'
                          ? 'من داخل غرفة الاستشارة النفسية:'
                          : 'Inside the Clinical Consultation Room:'}
                      </span>
                    </div>
                    <p className="italic leading-relaxed font-medium" style={{ fontSize: `${readerFontSize}px` }}>
                      {language === 'ar'
                        ? activeNarrative.clinicalCaseQuoteAr
                        : activeNarrative.clinicalCaseQuoteEn}
                    </p>
                  </div>
                )}

                <div
                  className={`p-5 sm:p-6 rounded-3xl border space-y-3 ${
                    isLight
                      ? 'bg-amber-50 border-amber-200 text-slate-800'
                      : 'bg-amber-500/10 border-amber-500/30 text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-extrabold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {language === 'ar'
                        ? 'الخلاصة الإكلينيكية وأبرز النقاط المستفادة:'
                        : 'Key Clinical Takeaways:'}
                    </span>
                  </div>
                  <ul className="space-y-2" style={{ fontSize: `${Math.max(14, readerFontSize - 1)}px` }}>
                    {(language === 'ar'
                      ? activeNarrative.keyTakeaways
                      : activeNarrative.keyTakeawaysEn
                    ).map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">✓</span>
                        <span className="leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  {(() => {
                    const narrativeUsedTargets = new Set<string>();
                    const narrativeRoute = `/articles/${encodeURIComponent(activeNarrative.id)}`;
                    return activeNarrative.contentParagraphs.map((para, i) => (
                      <div
                        key={i}
                        className={`p-6 rounded-3xl border space-y-2.5 ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-gray-200'
                        }`}
                      >
                        <h3
                          className={`font-extrabold font-['Alexandria'] flex items-center gap-2 ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                          style={{ fontSize: `${readerFontSize + 2}px` }}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                          <span>{language === 'ar' ? para.heading : para.headingEn}</span>
                        </h3>
                        <p
                          className={`leading-loose whitespace-pre-line ${
                            isLight ? 'text-slate-700' : 'text-gray-300'
                          }`}
                          style={{ fontSize: `${readerFontSize}px` }}
                        >
                          <ContextualLinkedText
                            text={language === 'ar' ? para.text : para.textEn}
                            excludeArticleId={activeNarrative.id}
                            excludeRoute={narrativeRoute}
                            usedTargets={narrativeUsedTargets}
                            maxLinksInParagraph={2}
                            maxTotalLinks={7}
                            isLight={isLight}
                          />
                        </p>
                      </div>
                    ));
                  })()}
                </div>

                {activeNarrative.diagnosticTable && (
                  <div
                    className={`p-6 rounded-3xl border space-y-4 overflow-x-auto ${
                      isLight
                        ? 'bg-white border-indigo-200 shadow-sm'
                        : 'bg-indigo-950/20 border-indigo-500/30'
                    }`}
                  >
                    <h3
                      className={`text-base font-black font-['Alexandria'] ${
                        isLight ? 'text-indigo-900' : 'text-indigo-300'
                      }`}
                    >
                      ⚖️{' '}
                      {language === 'ar'
                        ? activeNarrative.diagnosticTable.titleAr
                        : activeNarrative.diagnosticTable.titleEn}
                    </h3>
                    <table className="w-full text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr
                          className={
                            isLight
                              ? 'bg-indigo-50 text-indigo-900 border-b border-indigo-200'
                              : 'bg-white/5 text-white border-b border-white/10'
                          }
                        >
                          <th className="p-3 text-start font-bold">
                            {language === 'ar'
                              ? activeNarrative.diagnosticTable.col1Ar
                              : activeNarrative.diagnosticTable.col1En}
                          </th>
                          <th className="p-3 text-start font-bold text-emerald-600 dark:text-emerald-400">
                            {language === 'ar'
                              ? activeNarrative.diagnosticTable.col2Ar
                              : activeNarrative.diagnosticTable.col2En}
                          </th>
                          <th className="p-3 text-start font-bold text-rose-600 dark:text-rose-400">
                            {language === 'ar'
                              ? activeNarrative.diagnosticTable.col3Ar
                              : activeNarrative.diagnosticTable.col3En}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeNarrative.diagnosticTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={`border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}
                          >
                            <td className="p-3 font-bold">
                              {language === 'ar' ? row.criterionAr : row.criterionEn}
                            </td>
                            <td className="p-3">
                              {language === 'ar' ? row.naturalAr : row.naturalEn}
                            </td>
                            <td className="p-3">
                              {language === 'ar' ? row.manipulationAr : row.manipulationEn}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div
                  className={`p-6 rounded-3xl border space-y-3 shadow-lg ${
                    isLight
                      ? 'bg-emerald-50/90 border-emerald-300 text-slate-900'
                      : 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border-emerald-500/35 text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-black text-base sm:text-lg">
                    <span>⚡</span>
                    <h3 className="font-['Alexandria']">
                      {language === 'ar'
                        ? activeNarrative.practicalExercise.title
                        : activeNarrative.practicalExercise.titleEn}
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {(language === 'ar'
                      ? activeNarrative.practicalExercise.steps
                      : activeNarrative.practicalExercise.stepsEn
                    ).map((st, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {activeNarrative.id === 'why-do-you-feel-tired-despite-rest' && (
                  <ExistentialFatigueQuiz
                    onNavigateToArticle={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

                {activeNarrative.id === 'most-common-cognitive-distortions' && (
                  <CognitiveDistortionChallenge />
                )}

                {activeNarrative.conclusionAr && (
                  <div
                    className={`p-6 rounded-3xl border space-y-2 ${
                      isLight
                        ? 'bg-purple-50 border-purple-200 text-slate-800'
                        : 'bg-purple-950/30 border-purple-500/30 text-purple-100'
                    }`}
                  >
                    <p className="leading-relaxed font-semibold" style={{ fontSize: `${readerFontSize}px` }}>
                      {language === 'ar' ? activeNarrative.conclusionAr : activeNarrative.conclusionEn}
                    </p>
                  </div>
                )}

                {activeNarrative.apaReferences && activeNarrative.apaReferences.length > 0 && (
                  <div
                    className={`p-6 rounded-3xl border space-y-3 ${
                      isLight
                        ? 'bg-slate-100 border-slate-300 text-slate-800'
                        : 'bg-slate-900/80 border-white/10 text-gray-300'
                    }`}
                  >
                    <h4 className="font-extrabold text-sm flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-indigo-500" />
                      <span>
                        {language === 'ar'
                          ? 'أبرز المراجع العلمية الحديثة المعتمدة في المقال (2023 - 2025):'
                          : 'Verified Modern Scientific References (2023–2025):'}
                      </span>
                    </h4>
                    <ul className="space-y-3 text-xs">
                      {activeNarrative.apaReferences.map((ref, idx) => (
                        <li
                          key={idx}
                          className={`p-3.5 rounded-xl border ${
                            isLight ? 'bg-white border-slate-200' : 'bg-black/30 border-white/5'
                          }`}
                        >
                          <p className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-300 dir-ltr text-left">
                            {ref.citation}
                          </p>
                          <p className="mt-1 text-xs opacity-90">
                            {language === 'ar' ? ref.noteAr : ref.noteEn}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* FULL CONTINUOUS UNSEGMENTED STORY / NARRATIVE SECTION (قراءة كاملة متواصلة للقصص دون تجزئة) */}
            <div
              id="sec-full-continuous-story"
              className={`p-6 sm:p-8 rounded-3xl border-2 space-y-5 shadow-xl ${
                isLight
                  ? 'bg-gradient-to-b from-rose-50/70 via-white to-slate-50 border-rose-300 text-slate-900'
                  : 'bg-gradient-to-b from-rose-950/35 via-slate-900/95 to-slate-950 border-rose-500/40 text-gray-100'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-rose-200 dark:border-white/15">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-extrabold">
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {language === 'ar'
                        ? 'خيار القراءة الكاملة المتواصلة للقصص والسجلات العيادية (دون تجزئة)'
                        : 'Full Continuous Unsegmented Story & Clinical Case Manuscript'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black font-['Alexandria'] text-rose-700 dark:text-rose-300">
                    {language === 'ar'
                      ? '📜 النص الكامل المتواصل للقصة / السجلات السريرية (قراءة متصلة دون تجزئة)'
                      : '📜 Full Continuous Unsegmented Story Manuscript'}
                  </h2>
                  <p className="text-xs opacity-80">
                    {language === 'ar'
                      ? 'استمتع بقراءة المجموعة القصصية أو السجل العيادي كاملاً ومتواصلاً من السطر الأول حتى الخاتمة دون أي تجزئة.'
                      : 'Read the complete clinical story collection continuously from start to finish without segmentation.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyStoryFullText(activeNarrative)}
                  className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
                >
                  {copiedStoryFullText ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  <span>
                    {copiedStoryFullText
                      ? language === 'ar'
                        ? 'تم نسخ القصة الكاملة!'
                        : 'Full Story Copied!'
                      : language === 'ar'
                      ? 'نسخ النص الكامل للقصة'
                      : 'Copy Full Story Text'}
                  </span>
                </button>
              </div>

              <div
                className={`p-5 sm:p-8 rounded-2xl border select-text ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800 shadow-inner'
                    : 'bg-black/40 border-white/10 text-gray-200'
                }`}
              >
                <FormattedContinuousManuscript
                  text={getFullContinuousNarrativeText(activeNarrative, language)}
                  fontSize={readerFontSize}
                  isLight={isLight}
                  excludeArticleId={activeNarrative.id}
                  excludeRoute={`/articles/${encodeURIComponent(activeNarrative.id)}`}
                />
              </div>
            </div>

            {/* Bottom Social Media Share Bar for Narrative Story */}
            <ArticleBottomSocialShare
              title={language === 'ar' ? activeNarrative.title : activeNarrative.titleEn}
              summary={language === 'ar' ? activeNarrative.summary : activeNarrative.summaryEn}
              url={`https://miratalqulub.com/articles/${encodeURIComponent(activeNarrative.id)}`}
              isLight={isLight}
              language={language}
            />

            {/* Smart Recommendation Engine + Personalized Learning Path */}
            <ArticleRecommendationsSection
              source={activeNarrative}
              sourcePage={`/articles/${encodeURIComponent(activeNarrative.id)}`}
            />
          </motion.article>
        ) : activeAcademic ? (
          /* Full-Page Academic Research Paper Reader */
          <motion.article
            key="page-academic-reader"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-4 shadow-xl ${
                isLight
                  ? 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border-indigo-200 text-slate-900'
                  : `bg-gradient-to-br ${activeAcademic.coverGradient} border-cyan-500/35 text-white`
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-800 dark:text-cyan-200 text-xs font-extrabold flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>
                    {language === 'ar'
                      ? activeAcademic.categoryLabelAr
                      : activeAcademic.categoryLabelEn}
                  </span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-800 dark:text-indigo-200 text-xs font-bold">
                  {language === 'ar'
                    ? activeAcademic.methodologyBadgeAr
                    : activeAcademic.methodologyBadgeEn}
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black leading-snug font-['Alexandria']">
                {language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn}
              </h1>

              <p className="text-xs sm:text-sm font-semibold italic opacity-75">
                {language === 'ar' ? activeAcademic.titleEn : activeAcademic.titleAr}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(language === 'ar' ? activeAcademic.keywordsAr : activeAcademic.keywordsEn).map(
                  (kw, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        isLight
                          ? 'bg-indigo-100/80 text-indigo-900'
                          : 'bg-white/10 text-cyan-200'
                      }`}
                    >
                      #{kw}
                    </span>
                  )
                )}
              </div>

              {/* Academic Metadata & Citation Actions Bar */}
              <div
                className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-black/40 border-white/10 text-cyan-100'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-indigo-700 dark:text-cyan-300">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'جهة الإصدار والتحكيم: وحدة الأبحاث والدراسات النفسية — مرآة القلوب (عمّان، الأردن)'
                        : 'Published & Peer-Reviewed by: Mirror of Hearts Psychological Research Unit (Amman, Jordan)'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] opacity-85">
                    <span>
                      📅 {language === 'ar' ? 'تاريخ النشر:' : 'Published:'} {activeAcademic.publishDate}
                    </span>
                    <span>
                      ⏱️ {language === 'ar' ? activeAcademic.readTimeAr : activeAcademic.readTimeEn}
                    </span>
                    <span>
                      📚 {activeAcademic.apaReferences.length}{' '}
                      {language === 'ar' ? 'مرجعاً بصيغة APA 7th' : 'APA 7th References'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setFullScreenPaper(activeAcademic);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>
                      {language === 'ar'
                        ? 'وضع ملء الشاشة القابل للتمرير'
                        : 'Full-Screen Scrollable View'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyApaCitation(activeAcademic)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedCitationId === activeAcademic.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <BookMarked className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedCitationId === activeAcademic.id
                        ? language === 'ar'
                          ? 'تم نسخ توثيق APA!'
                          : 'APA Citation Copied!'
                        : language === 'ar'
                        ? 'نسخ التوثيق المرجعي (APA)'
                        : 'Copy APA Citation'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleShareContent(
                        language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn,
                        language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn
                      )
                    }
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>
                      {copiedShare
                        ? language === 'ar'
                          ? 'تم النسخ!'
                          : 'Copied!'
                        : language === 'ar'
                        ? 'مشاركة البحث'
                        : 'Share Paper'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reader Toolbar: Font Size, Dark/Light Mode, View Mode Toggle, Full-Screen, Social Media Share */}
            <ReaderToolbar
              fontSize={readerFontSize}
              onChangeFontSize={setReaderFontSize}
              viewMode={readerViewMode}
              onChangeViewMode={setReaderViewMode}
              onJumpToContinuous={() => {
                const el = document.getElementById('sec-full-continuous-text');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              onOpenFullScreen={() => setFullScreenPaper(activeAcademic)}
              shareTitle={language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn}
              shareSummary={language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn}
              shareUrl={`https://miratalqulub.com/articles/${encodeURIComponent(activeAcademic.id)}`}
              contentTypeLabelAr="للبحث العلمي"
              contentTypeLabelEn="Paper"
            />

            {readerViewMode === 'segmented_and_continuous' && (
              <div
                className="space-y-6 transition-all"
                style={{ fontSize: `${readerFontSize}px` }}
              >
                {/* Interactive Table of Contents for Full Paper */}
                <div
                  className={`p-5 rounded-3xl border space-y-3 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-white/[0.03] border-white/10 text-gray-200'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-black text-indigo-700 dark:text-cyan-300 font-['Alexandria']">
                    📑{' '}
                    {language === 'ar'
                      ? 'الفهرس الهيكلي للدراسة العلمية المحكّمة:'
                      : 'Structured Index of the Peer-Reviewed Study:'}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      { id: 'sec-abstract', ar: 'الملخص (Abstract)', en: 'Abstract' },
                      { id: 'sec-intro', ar: '1. المقدمة', en: '1. Introduction' },
                      { id: 'sec-theory', ar: '2. الإطار النظري', en: '2. Theoretical Framework' },
                      { id: 'sec-method', ar: '3. منهجية البحث', en: '3. Methodology' },
                      { id: 'sec-analysis', ar: '4. النتائج والتحليل والمناقشة', en: '4. Results & Discussion' },
                      { id: 'sec-conclusion', ar: '5. الخاتمة', en: '5. Conclusion' },
                      { id: 'sec-recommendations', ar: '6. التوصيات', en: '6. Recommendations' },
                      { id: 'sec-references', ar: '7. المراجع (APA 7th)', en: '7. APA 7th References' },
                      {
                        id: 'sec-full-continuous-text',
                        ar: '📜 النص الكامل المتواصل للبحث (دون تجزئة)',
                        en: '📜 Full Continuous Unsegmented Paper',
                      },
                    ].map((secItem) => (
                      <button
                        key={secItem.id}
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(secItem.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold border transition cursor-pointer ${
                          isLight
                            ? 'bg-white hover:bg-indigo-50 text-slate-700 border-slate-200'
                            : 'bg-black/30 hover:bg-white/10 text-gray-300 border-white/10'
                        }`}
                      >
                        {language === 'ar' ? secItem.ar : secItem.en}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  id="sec-abstract"
                  className={`p-6 rounded-3xl border space-y-2.5 ${
                    isLight
                      ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                      : 'bg-amber-500/10 border-amber-500/30 text-gray-200'
                  }`}
                >
                  <h2 className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-300 font-['Alexandria'] flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{language === 'ar' ? 'الملخص (Abstract)' : 'Abstract'}</span>
                  </h2>
                  <p className="leading-loose" style={{ fontSize: `${readerFontSize}px` }}>
                    {language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn}
                  </p>
                </div>

                <div
                  id="sec-intro"
                  className={`p-6 rounded-3xl border space-y-3 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-gray-200'
                  }`}
                >
                  <h2 className="text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                    {language === 'ar' ? '1. المقدمة (Introduction)' : '1. Introduction'}
                  </h2>
                  {(() => {
                    const academicIntroTargets = new Set<string>();
                    const academicRoute = `/articles/${encodeURIComponent(activeAcademic.id)}`;
                    return (language === 'ar'
                      ? activeAcademic.introductionAr
                      : activeAcademic.introductionEn
                    ).map((p, idx) => (
                      <p key={idx} className="leading-loose" style={{ fontSize: `${readerFontSize}px` }}>
                        <ContextualLinkedText
                          text={p}
                          excludeArticleId={activeAcademic.id}
                          excludeRoute={academicRoute}
                          usedTargets={academicIntroTargets}
                          maxLinksInParagraph={2}
                          maxTotalLinks={5}
                          isLight={isLight}
                        />
                      </p>
                    ));
                  })()}
                </div>

                <div
                  id="sec-theory"
                  className={`p-6 rounded-3xl border space-y-4 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-gray-200'
                  }`}
                >
                  <h2 className="text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                    {language === 'ar'
                      ? '2. الإطار النظري والدراسات السابقة (Theoretical Framework)'
                      : '2. Theoretical Framework'}
                  </h2>
                  <div className="space-y-4">
                    {activeAcademic.theoreticalFramework.map((sec, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border space-y-2 ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                        }`}
                      >
                        <h3 className="text-sm sm:text-base font-extrabold text-purple-700 dark:text-purple-300">
                          {sec.sectionNumber} {language === 'ar' ? sec.titleAr : sec.titleEn}
                        </h3>
                        <p className="leading-relaxed" style={{ fontSize: `${readerFontSize}px` }}>
                          <ContextualLinkedText
                            text={language === 'ar' ? sec.contentAr : sec.contentEn}
                            excludeArticleId={activeAcademic.id}
                            excludeRoute={`/articles/${encodeURIComponent(activeAcademic.id)}`}
                            maxLinksInParagraph={1}
                            maxTotalLinks={2}
                            isLight={isLight}
                          />
                        </p>
                        {sec.subPointsAr && (
                          <ul className="space-y-1.5 pt-2" style={{ fontSize: `${Math.max(14, readerFontSize - 1)}px` }}>
                            {(language === 'ar' ? sec.subPointsAr : sec.subPointsEn || []).map(
                              (pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-cyan-500 font-bold">•</span>
                                  <span>{pt}</span>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  id="sec-method"
                  className={`p-6 rounded-3xl border space-y-3 ${
                    isLight
                      ? 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                      : 'bg-indigo-950/30 border-indigo-500/30 text-gray-200'
                  }`}
                >
                  <h2 className="text-lg font-black text-indigo-700 dark:text-indigo-300 font-['Alexandria']">
                    {language === 'ar' ? '3. منهجية البحث (Methodology)' : '3. Research Methodology'}
                  </h2>
                  <p className="font-semibold" style={{ fontSize: `${readerFontSize}px` }}>
                    {language === 'ar'
                      ? activeAcademic.methodology.approachAr
                      : activeAcademic.methodology.approachEn}
                  </p>
                  <ul className="space-y-2" style={{ fontSize: `${readerFontSize}px` }}>
                    {(language === 'ar'
                      ? activeAcademic.methodology.pillarsAr
                      : activeAcademic.methodology.pillarsEn
                    ).map((pil, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{pil}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  id="sec-analysis"
                  className={`p-6 rounded-3xl border space-y-4 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-gray-200'
                  }`}
                >
                  <h2 className="text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                    {language === 'ar'
                      ? '4. التحليل والمناقشة (Analysis and Discussion)'
                      : '4. Analysis and Discussion'}
                  </h2>
                  <div className="space-y-4">
                    {activeAcademic.analysisAndDiscussion.map((sec, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border space-y-2 ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                        }`}
                      >
                        <h3 className="text-sm sm:text-base font-extrabold text-rose-700 dark:text-rose-300">
                          {sec.sectionNumber} {language === 'ar' ? sec.titleAr : sec.titleEn}
                        </h3>
                        <p className="leading-relaxed" style={{ fontSize: `${readerFontSize}px` }}>
                          {language === 'ar' ? sec.contentAr : sec.contentEn}
                        </p>
                        {sec.subPointsAr && (
                          <ul className="space-y-2 pt-2" style={{ fontSize: `${Math.max(14, readerFontSize - 1)}px` }}>
                            {(language === 'ar' ? sec.subPointsAr : sec.subPointsEn || []).map(
                              (pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-rose-500 font-bold">▪</span>
                                  <span className="leading-relaxed">{pt}</span>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {activeAcademic.summaryTable && (
                    <div
                      className={`mt-4 p-5 rounded-2xl border space-y-3 overflow-x-auto ${
                        isLight
                          ? 'bg-indigo-50/60 border-indigo-200'
                          : 'bg-indigo-950/25 border-indigo-500/30'
                      }`}
                    >
                      <h3 className="text-sm sm:text-base font-black text-indigo-800 dark:text-cyan-300 font-['Alexandria']">
                        📊{' '}
                        {language === 'ar'
                          ? activeAcademic.summaryTable.titleAr
                          : activeAcademic.summaryTable.titleEn}
                      </h3>
                      <table className="w-full text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr
                            className={
                              isLight
                                ? 'bg-indigo-100/80 text-indigo-950 border-b border-indigo-200'
                                : 'bg-white/10 text-white border-b border-white/15'
                            }
                          >
                            {(language === 'ar'
                              ? activeAcademic.summaryTable.headersAr
                              : activeAcademic.summaryTable.headersEn
                            ).map((hdr, hIdx) => (
                              <th key={hIdx} className="p-3 text-start font-extrabold">
                                {hdr}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {activeAcademic.summaryTable.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={`border-b ${
                                isLight ? 'border-indigo-100 bg-white/80' : 'border-white/10 bg-black/20'
                              }`}
                            >
                              <td className="p-3 font-bold text-indigo-700 dark:text-cyan-300">
                                {language === 'ar' ? row.col1Ar : row.col1En}
                              </td>
                              <td className="p-3">
                                {language === 'ar' ? row.col2Ar : row.col2En}
                              </td>
                              <td className="p-3">
                                {language === 'ar' ? row.col3Ar : row.col3En}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div
                  id="sec-conclusion"
                  className={`p-6 rounded-3xl border space-y-2 ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-200 text-slate-800'
                      : 'bg-emerald-950/30 border-emerald-500/30 text-gray-200'
                  }`}
                >
                  <h2 className="text-lg font-black text-emerald-700 dark:text-emerald-300 font-['Alexandria']">
                    {language === 'ar' ? '5. الخاتمة (Conclusion)' : '5. Conclusion'}
                  </h2>
                  <p className="leading-loose" style={{ fontSize: `${readerFontSize}px` }}>
                    {language === 'ar' ? activeAcademic.conclusionAr : activeAcademic.conclusionEn}
                  </p>
                </div>

                <div
                  id="sec-recommendations"
                  className={`p-6 rounded-3xl border space-y-4 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-gray-200'
                  }`}
                >
                  <h2 className="text-lg font-black text-amber-600 dark:text-amber-300 font-['Alexandria'] flex items-center gap-2">
                    <ListChecks className="w-5 h-5" />
                    <span>{language === 'ar' ? '6. التوصيات (Recommendations)' : '6. Recommendations'}</span>
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {activeAcademic.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border space-y-2 ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                        }`}
                      >
                        <h3 className="text-sm font-extrabold text-indigo-600 dark:text-cyan-300">
                          {language === 'ar' ? rec.categoryAr : rec.categoryEn}
                        </h3>
                        <ul className="space-y-1.5" style={{ fontSize: `${Math.max(14, readerFontSize - 1)}px` }}>
                          {(language === 'ar' ? rec.itemsAr : rec.itemsEn).map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  id="sec-references"
                  className={`p-6 rounded-3xl border space-y-3 ${
                    isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-800'
                      : 'bg-slate-900/90 border-white/15 text-gray-300'
                  }`}
                >
                  <h2 className="text-base sm:text-lg font-black flex items-center gap-2 font-['Alexandria']">
                    <BookMarked className="w-4 h-4 text-cyan-500" />
                    <span>
                      {language === 'ar'
                        ? '7. المراجع العلمية الموثقة (References - APA 7th Edition)'
                        : '7. References (APA 7th Edition)'}
                    </span>
                  </h2>
                  <ul className="space-y-2 text-xs font-mono dir-ltr text-left">
                    {activeAcademic.apaReferences.map((cite, idx) => (
                      <li
                        key={idx}
                        className={`p-3 rounded-xl border ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-800'
                            : 'bg-black/40 border-white/5 text-cyan-100'
                        }`}
                      >
                        {idx + 1}. {cite}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* FULL CONTINUOUS UNSEGMENTED RESEARCH PAPER SECTION (النص الكامل المتواصل للبحث العلمي دون تجزئة) */}
            <div
              id="sec-full-continuous-text"
              className={`p-6 sm:p-8 rounded-3xl border-2 space-y-5 shadow-xl ${
                isLight
                  ? 'bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-indigo-300 text-slate-900'
                  : 'bg-gradient-to-b from-indigo-950/40 via-slate-900/95 to-slate-950 border-cyan-500/40 text-gray-100'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-indigo-200 dark:border-white/15">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-cyan-300 text-xs font-extrabold">
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {language === 'ar'
                        ? 'النسخة المرجعية الكاملة المتواصلة (دون تجزئة)'
                        : 'Complete Unsegmented Reference Manuscript'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black font-['Alexandria'] text-indigo-800 dark:text-cyan-300">
                    {language === 'ar'
                      ? '📜 النص الكامل المتواصل للبحث العلمي (قراءة متصلة دون تجزئة)'
                      : '📜 Full Continuous Unsegmented Research Paper'}
                  </h2>
                  <p className="text-xs opacity-80">
                    {language === 'ar'
                      ? 'يُعرض هنا المقال العلمي كاملاً ومتواصلاً من البداية إلى النهاية دون أي تجزئة أو اختصار مع الحفاظ على التنسيق الأكاديمي والجداول والمراجع.'
                      : 'The complete research manuscript is presented below continuously from start to finish without segmentation, preserving academic formatting, tables, and citations.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyFullText(activeAcademic)}
                  className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
                >
                  {copiedFullText ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  <span>
                    {copiedFullText
                      ? language === 'ar'
                        ? 'تم نسخ النص الكامل للبحث!'
                        : 'Full Paper Text Copied!'
                      : language === 'ar'
                      ? 'نسخ النص الكامل المتواصل للبحث'
                      : 'Copy Full Continuous Paper Text'}
                  </span>
                </button>
              </div>

              <div
                className={`p-5 sm:p-8 rounded-2xl border select-text ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800 shadow-inner'
                    : 'bg-black/40 border-white/10 text-gray-200'
                }`}
              >
                <FormattedContinuousManuscript
                  text={getFullContinuousAcademicText(activeAcademic, language)}
                  fontSize={readerFontSize}
                  isLight={isLight}
                  excludeArticleId={activeAcademic.id}
                  excludeRoute={`/articles/${encodeURIComponent(activeAcademic.id)}`}
                />
              </div>
            </div>

            {/* Bottom Social Media Share Button & Bar */}
            <ArticleBottomSocialShare
              title={language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn}
              summary={language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn}
              url={`https://miratalqulub.com/articles/${encodeURIComponent(activeAcademic.id)}`}
              isLight={isLight}
              language={language}
            />

            {/* Smart Recommendation Engine + Personalized Learning Path */}
            <ArticleRecommendationsSection
              source={activeAcademic}
              sourcePage={`/articles/${encodeURIComponent(activeAcademic.id)}`}
            />

            {/* Scientific & Clinical Disclaimer Box */}
            <div
              className={`p-5 rounded-3xl border text-xs leading-relaxed ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
              }`}
            >
              <strong className="block mb-1 font-extrabold">
                {language === 'ar'
                  ? '⚖️ إخلاء مسؤولية علمي وعيادي (Scientific & Clinical Disclaimer):'
                  : '⚖️ Scientific & Clinical Disclaimer:'}
              </strong>
              {language === 'ar'
                ? 'تم إعداد هذه الدراسة البحثية لأغراض التثقيف النفسي والأكاديمي وتعميق الوعي الذاتي والعلائقي، ولا تُعد بديلاً عن التشخيص الطبي أو العيادي المباشر لدى طبيب نفسي أو معالج إكلينيكي مرخص.'
                : 'This academic research paper is published for psychoeducational and scholarly awareness purposes and does not constitute a substitute for formal psychiatric or clinical diagnosis by a licensed mental health professional.'}
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>

      {/* Full-Screen Scrollable Academic Research & Clinical Article Reader Modal (ResearchArticleModal) */}
      <ResearchArticleModal
        isOpen={Boolean(fullScreenPaper || fullScreenArticle)}
        onClose={() => {
          setFullScreenPaper(null);
          setFullScreenArticle(null);
        }}
        content={
          fullScreenPaper
            ? getFullContinuousAcademicText(fullScreenPaper, language)
            : fullScreenArticle
            ? getFullContinuousNarrativeText(fullScreenArticle, language)
            : undefined
        }
        paper={fullScreenPaper}
        article={fullScreenArticle}
        initialViewMode="continuous_only"
      />
    </div>
  );
};
