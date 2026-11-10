import React, { useState } from 'react';
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
  X,
  GraduationCap,
  Stethoscope,
  FileText,
  BookMarked,
  ListChecks,
  Quote,
  ExternalLink,
  Sun,
  Moon,
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
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import {
  ReaderToolbar,
  FormattedContinuousManuscript,
  ContinuousViewMode,
} from './ReaderToolbar';
import { ArticleBottomSocialShare } from './FullScreenResearchStudyModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialArticleId?: string;
  onOpenStandalonePage?: () => void;
}

type ContentTrack = 'narrative' | 'academic';
type FilterCategory = 'all' | 'relationships' | 'self_growth' | 'applied_psychology' | 'emotional_iq';

export const ArticlesSectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialArticleId,
  onOpenStandalonePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const [theme, toggleTheme] = useAppTheme();
  const isLight = theme === 'light';

  const [activeTrack, setActiveTrack] = useState<ContentTrack>('academic');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNarrative, setActiveNarrative] = useState<Article | null>(() => {
    if (initialArticleId) {
      return ARTICLES_CATALOG.find((a) => a.id === initialArticleId) || null;
    }
    return null;
  });
  const [activeAcademic, setActiveAcademic] = useState<AcademicPaper | null>(() => {
    if (initialArticleId) {
      const foundPaper = ACADEMIC_PAPERS_CATALOG.find((p) => p.id === initialArticleId);
      return foundPaper || null;
    }
    return null;
  });
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedFullText, setCopiedFullText] = useState(false);
  const [copiedStoryFullText, setCopiedStoryFullText] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<number>(17);
  const [readerViewMode, setReaderViewMode] = useState<ContinuousViewMode>('segmented_and_continuous');

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

  if (!isOpen) return null;

  const categories: { key: FilterCategory; labelAr: string; labelEn: string; icon: string }[] = [
    { key: 'all', labelAr: 'جميع التخصصات', labelEn: 'All Specialties', icon: '✨' },
    { key: 'relationships', labelAr: 'عيادة العلاقات والزواج', labelEn: 'Relationships & Marriage', icon: '💑' },
    { key: 'applied_psychology', labelAr: 'علم النفس التطبيقي والعصبي', labelEn: 'Applied & Neuro-Psychology', icon: '🧠' },
    { key: 'self_growth', labelAr: 'الهوية والاحتراق المبكر', labelEn: 'Identity & Burnout Recovery', icon: '🌱' },
    { key: 'emotional_iq', labelAr: 'الذكاء العاطفي والتواصل', labelEn: 'Emotional Intelligence (EQ)', icon: '🎯' },
  ];

  const q = searchQuery.trim().toLowerCase();

  const filteredNarrativeArticles = ARTICLES_CATALOG.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesQuery =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.titleEn.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.summaryEn.toLowerCase().includes(q) ||
      art.scientificFramework.toLowerCase().includes(q) ||
      art.scientificFrameworkEn.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const filteredAcademicPapers = ACADEMIC_PAPERS_CATALOG.filter((paper) => {
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesQuery =
      !q ||
      paper.titleAr.toLowerCase().includes(q) ||
      paper.titleEn.toLowerCase().includes(q) ||
      paper.abstractAr.toLowerCase().includes(q) ||
      paper.abstractEn.toLowerCase().includes(q) ||
      paper.keywordsAr.some((k) => k.toLowerCase().includes(q)) ||
      paper.keywordsEn.some((k) => k.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const handleBackToList = () => {
    soundManager.playTap();
    setActiveNarrative(null);
    setActiveAcademic(null);
  };

  const handleShareContent = (title: string, summary: string) => {
    soundManager.playTap();
    const textToShare = `📖 ${title}\n${summary}\nhttps://miratalqulub.com/#/articles`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2400);
    }
  };

  const isReading = Boolean(activeNarrative || activeAcademic);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className={`w-full max-w-5xl h-[93vh] max-h-[890px] rounded-3xl overflow-hidden shadow-2xl flex flex-col relative border transition-colors ${
          isLight
            ? 'bg-slate-50 border-slate-300 text-slate-900'
            : 'bg-slate-950 border-purple-500/30 text-white'
        }`}
      >
        {/* Top Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between shrink-0 ${
            isLight
              ? 'bg-gradient-to-r from-indigo-50 via-white to-rose-50 border-slate-200'
              : 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/25 shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className={`text-base sm:text-lg font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'ar'
                    ? 'موسوعة مرآة القلوب للمقالات والأبحاث النفسية'
                    : 'Mirror of Hearts Clinical & Academic Encyclopedia'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  {language === 'ar' ? 'مراجع علمية موثقة APA 7th' : 'APA 7th Peer-Reviewed'}
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                {language === 'ar'
                  ? 'فصل برمجي وعلمي دقيق بين المقالات القصصية العيادية والأبحاث الأكاديمية المحكّمة'
                  : 'Distinct tracks for Clinical Narrative Case Articles & Full Academic Research Papers'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                toggleTheme();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-amber-300 border-white/15'
              }`}
              title={language === 'ar' ? 'تبديل الوضع الليلي / النهاري' : 'Toggle Dark / Light Mode'}
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">
                {isLight
                  ? language === 'ar'
                    ? 'ليلي'
                    : 'Dark'
                  : language === 'ar'
                  ? 'نهاري'
                  : 'Light'}
              </span>
            </button>

            {/* Instant Language Switcher */}
            <button
              onClick={() => {
                soundManager.playTap();
                toggleLanguage();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
              }`}
              title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              {language === 'ar' ? 'EN 🇬🇧' : 'عربي 🇸🇦'}
            </button>

            {onOpenStandalonePage && (
              <button
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                  onOpenStandalonePage();
                }}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  isLight
                    ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                    : 'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border-indigo-500/30'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'فتح كصفحة كاملة' : 'Full Page View'}</span>
              </button>
            )}

            {isReading && (
              <button
                onClick={handleBackToList}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isLight
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200'
                }`}
              >
                <ArrowRight className={`w-3.5 h-3.5 ${!isRTL ? 'rotate-180' : ''}`} />
                <span>{language === 'ar' ? 'الفهرس' : 'Catalog'}</span>
              </button>
            )}

            <button
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isLight
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          <AnimatePresence mode="wait">
            {!isReading ? (
              /* ==============================================================
                 CATALOG VIEW: 2 DISTINCT TRACKS (NARRATIVE vs ACADEMIC)
                 ============================================================== */
              <motion.div
                key="catalog-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Dual-Track Switcher Banner — Track 1: Academic Research FIRST */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setActiveTrack('academic');
                    }}
                    className={`p-4 rounded-2xl border text-start transition cursor-pointer flex items-start gap-3.5 ${
                      activeTrack === 'academic'
                        ? isLight
                          ? 'bg-gradient-to-r from-indigo-700 to-cyan-700 text-white border-indigo-600 shadow-lg'
                          : 'bg-gradient-to-r from-indigo-600/35 to-cyan-600/30 text-white border-cyan-400 shadow-lg shadow-cyan-500/10'
                        : isLight
                        ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 border-white/10'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        activeTrack === 'academic'
                          ? 'bg-white/20 text-white'
                          : 'bg-cyan-500/15 text-cyan-400'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-black text-sm sm:text-base font-['Alexandria']">
                          {language === 'ar'
                            ? 'أولاً: الأبحاث العلمية الكاملة (APA 7th)'
                            : 'First: Full Academic Research Papers'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            activeTrack === 'academic'
                              ? 'bg-white/25 text-white'
                              : 'bg-cyan-500/20 text-cyan-400'
                          }`}
                        >
                          {ACADEMIC_PAPERS_CATALOG.length} {language === 'ar' ? 'أبحاث محكّمة' : 'Papers'}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          activeTrack === 'academic'
                            ? 'text-white/90'
                            : isLight
                            ? 'text-slate-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {language === 'ar'
                          ? 'دراسات أكاديمية رصينة متكاملة (أقسام البحث العلمي + النص الكامل المتواصل دون تجزئة + مراجع APA 7th).'
                          : 'Rigorous peer-reviewed structure (Segmented sections + Full continuous unsegmented manuscript + APA 7th).'}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setActiveTrack('narrative');
                    }}
                    className={`p-4 rounded-2xl border text-start transition cursor-pointer flex items-start gap-3.5 ${
                      activeTrack === 'narrative'
                        ? isLight
                          ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white border-rose-500 shadow-lg'
                          : 'bg-gradient-to-r from-rose-600/30 to-purple-600/30 text-white border-rose-400 shadow-lg shadow-rose-500/10'
                        : isLight
                        ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 border-white/10'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        activeTrack === 'narrative'
                          ? 'bg-white/20 text-white'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-black text-sm sm:text-base font-['Alexandria']">
                          {language === 'ar'
                            ? 'ثانياً: المقالات القصصية العلمية'
                            : 'Second: Clinical Narrative Articles'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            activeTrack === 'narrative'
                              ? 'bg-white/25 text-white'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {ARTICLES_CATALOG.length} {language === 'ar' ? 'مقالاً' : 'Articles'}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          activeTrack === 'narrative'
                            ? 'text-white/90'
                            : isLight
                            ? 'text-slate-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {language === 'ar'
                          ? 'أسلوب سردي عيادي جذاب مبني على حالات واقعية من العيادة مع تحليل نفسي وأدوات تشخيصية عملية.'
                          : 'Engaging clinical storytelling based on real therapy cases, psychological deconstruction, and diagnostic tools.'}
                      </p>
                    </div>
                  </button>
                </div>

                {/* Search & Category Filter Controls */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search
                      className={`w-4 h-4 text-gray-400 absolute top-3.5 ${
                        isRTL ? 'right-3.5' : 'left-3.5'
                      }`}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        language === 'ar'
                          ? 'ابحث في المقالات والأبحاث (التوافق، الانهيار النرجسي، الذكاء العاطفي، الاحتراق، الهوية)...'
                          : 'Search clinical articles & research papers (compatibility, narcissistic collapse, EQ, burnout)...'
                      }
                      className={`w-full ${
                        isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
                      } py-3 rounded-2xl border text-xs sm:text-sm focus:outline-none transition ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                          : 'bg-white/5 border-white/15 text-white placeholder-gray-400 focus:border-purple-400'
                      }`}
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.key;
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
                              ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md border border-purple-400/50'
                              : isLight
                              ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{language === 'ar' ? cat.labelAr : cat.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* TRACK 1 GRID: CLINICAL NARRATIVE ARTICLES */}
                {activeTrack === 'narrative' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredNarrativeArticles.map((art) => (
                      <motion.div
                        key={art.id}
                        whileHover={{ scale: 1.01, y: -2 }}
                        onClick={() => {
                          soundManager.playTap();
                          setActiveNarrative(art);
                        }}
                        className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-md ${
                          isLight
                            ? 'bg-white hover:bg-rose-50/40 border-slate-200 hover:border-rose-400'
                            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-rose-500/40'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="px-2.5 py-1 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-300 text-[10px] font-bold border border-rose-500/30 flex items-center gap-1">
                              <span>{art.icon}</span>
                              <span>{language === 'ar' ? art.categoryLabelAr : art.categoryLabelEn}</span>
                            </span>
                            <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                              <Clock className="w-3 h-3" />
                              <span>{language === 'ar' ? art.readTime : art.readTimeEn}</span>
                            </div>
                          </div>

                          <h3
                            className={`text-sm sm:text-base font-extrabold leading-snug font-['Alexandria'] ${
                              isLight
                                ? 'text-slate-900 group-hover:text-rose-600'
                                : 'text-white group-hover:text-rose-300'
                            }`}
                          >
                            {language === 'ar' ? art.title : art.titleEn}
                          </h3>

                          <p
                            className={`text-xs line-clamp-3 leading-relaxed ${
                              isLight ? 'text-slate-600' : 'text-gray-300'
                            }`}
                          >
                            {language === 'ar' ? art.summary : art.summaryEn}
                          </p>
                        </div>

                        <div
                          className={`pt-3 border-t flex items-center justify-between text-xs ${
                            isLight ? 'border-slate-200' : 'border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-1 text-[10px] text-purple-600 dark:text-purple-300 font-medium truncate max-w-[65%]">
                            <Award className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">
                              {language === 'ar' ? art.scientificFramework : art.scientificFrameworkEn}
                            </span>
                          </div>

                          <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 shrink-0">
                            <span>{language === 'ar' ? 'قراءة القصة والتحليل' : 'Read Clinical Story'}</span>
                            <ChevronRight className={`w-3.5 h-3.5 ${ isRTL ? 'rotate-180' : ''}`} />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* TRACK 2 GRID: FULL ACADEMIC RESEARCH PAPERS */}
                {activeTrack === 'academic' && (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredAcademicPapers.map((paper) => (
                      <motion.div
                        key={paper.id}
                        whileHover={{ scale: 1.005, y: -2 }}
                        onClick={() => {
                          soundManager.playTap();
                          setActiveAcademic(paper);
                        }}
                        className={`p-5 sm:p-6 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-md ${
                          isLight
                            ? 'bg-white hover:bg-indigo-50/40 border-slate-200 hover:border-indigo-400'
                            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-1 rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 text-[10px] font-extrabold border border-cyan-500/30 flex items-center gap-1">
                                <span>{paper.icon}</span>
                                <span>
                                  {language === 'ar' ? paper.categoryLabelAr : paper.categoryLabelEn}
                                </span>
                              </span>
                              <span className="px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                                {language === 'ar' ? paper.methodologyBadgeAr : paper.methodologyBadgeEn}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{language === 'ar' ? paper.readTimeAr : paper.readTimeEn}</span>
                            </div>
                          </div>

                          <h3
                            className={`text-base sm:text-lg font-black leading-snug font-['Alexandria'] ${
                              isLight
                                ? 'text-slate-900 group-hover:text-indigo-700'
                                : 'text-white group-hover:text-cyan-300'
                            }`}
                          >
                            {language === 'ar' ? paper.titleAr : paper.titleEn}
                          </h3>

                          <p
                            className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                              isLight ? 'text-slate-600' : 'text-gray-300'
                            }`}
                          >
                            {language === 'ar' ? paper.abstractAr : paper.abstractEn}
                          </p>

                          {/* Keywords */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {(language === 'ar' ? paper.keywordsAr : paper.keywordsEn).map((kw, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${
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
                          className={`pt-3 border-t flex items-center justify-between text-xs ${
                            isLight ? 'border-slate-200' : 'border-white/10'
                          }`}
                        >
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                            📚 {paper.apaReferences.length}{' '}
                            {language === 'ar'
                              ? 'مرجعاً أكاديمياً موثقاً بصيغة APA 7th'
                              : 'Verified APA 7th Citations'}
                          </span>

                          <span className="text-indigo-600 dark:text-cyan-400 font-extrabold flex items-center gap-1">
                            <span>
                              {language === 'ar'
                                ? 'استعراض الدراسة العلمية الكاملة'
                                : 'Read Full Research Paper'}
                            </span>
                            <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeNarrative ? (
              /* ==============================================================
                 READER VIEW 1: CLINICAL NARRATIVE ARTICLE
                 ============================================================== */
              <motion.div
                key="narrative-reader"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                {/* Header Card */}
                <div
                  className={`p-6 rounded-3xl border space-y-4 shadow-xl ${
                    isLight
                      ? 'bg-gradient-to-br from-rose-50 via-white to-purple-50 border-rose-200'
                      : `bg-gradient-to-br ${activeNarrative.coverGradient} border-purple-500/30`
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

                    <div
                      className={`flex items-center gap-3 text-xs ${
                        isLight ? 'text-slate-600' : 'text-gray-300'
                      }`}
                    >
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

                  <h1
                    className={`text-xl sm:text-2xl font-black leading-tight font-['Alexandria'] ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {language === 'ar' ? activeNarrative.title : activeNarrative.titleEn}
                  </h1>

                  <p
                    className={`text-sm leading-relaxed font-medium ${
                      isLight ? 'text-slate-700' : 'text-gray-200'
                    }`}
                  >
                    {language === 'ar' ? activeNarrative.summary : activeNarrative.summaryEn}
                  </p>

                  <div
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                      isLight
                        ? 'bg-white/90 border-slate-200 text-slate-800'
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
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
                    >
                      {copiedShare ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedShare
                          ? language === 'ar'
                            ? 'تم النسخ!'
                            : 'Copied!'
                          : language === 'ar'
                          ? 'مشاركة'
                          : 'Share'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Reader Toolbar: Font Size, Dark/Light Mode, View Mode Toggle, Social Media Share */}
                <ReaderToolbar
                  fontSize={readerFontSize}
                  onChangeFontSize={setReaderFontSize}
                  viewMode={readerViewMode}
                  onChangeViewMode={setReaderViewMode}
                  shareTitle={language === 'ar' ? activeNarrative.title : activeNarrative.titleEn}
                  shareSummary={language === 'ar' ? activeNarrative.summary : activeNarrative.summaryEn}
                  shareUrl="https://miratalqulub.com/#/articles"
                  contentTypeLabelAr="للقصة والسجل العيادي"
                  contentTypeLabelEn="Story"
                />

                {readerViewMode === 'segmented_and_continuous' && (
                  <div
                    className="space-y-6 transition-all"
                    style={{ fontSize: `${readerFontSize}px` }}
                  >
                    {/* Clinical Case Quote Box */}
                    {activeNarrative.clinicalCaseQuoteAr && (
                      <div
                        className={`p-5 rounded-3xl border-s-4 border-rose-500 space-y-2 ${
                          isLight
                            ? 'bg-rose-50/70 text-slate-800 border border-rose-200'
                            : 'bg-rose-950/25 text-rose-100 border border-rose-500/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                          <Quote className="w-4 h-4" />
                          <span>
                            {language === 'ar'
                              ? 'مقتطف من جلسة العيادة الواقعية:'
                              : 'Clinical Session Case Excerpt:'}
                          </span>
                        </div>
                        <p className="italic leading-relaxed font-medium" style={{ fontSize: `${readerFontSize}px` }}>
                          {language === 'ar'
                            ? activeNarrative.clinicalCaseQuoteAr
                            : activeNarrative.clinicalCaseQuoteEn}
                        </p>
                      </div>
                    )}

                    {/* Key Takeaways Box */}
                    <div
                      className={`p-5 rounded-3xl border space-y-3 ${
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

                    {/* Main Content Paragraphs */}
                    <div className="space-y-4">
                      {activeNarrative.contentParagraphs.map((para, i) => (
                        <div
                          key={i}
                          className={`p-5 rounded-2xl border space-y-2.5 ${
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
                            {language === 'ar' ? para.text : para.textEn}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Optional Diagnostic Table */}
                    {activeNarrative.diagnosticTable && (
                      <div
                        className={`p-5 rounded-3xl border space-y-4 overflow-x-auto ${
                          isLight
                            ? 'bg-white border-indigo-200 shadow-sm'
                            : 'bg-indigo-950/20 border-indigo-500/30'
                        }`}
                      >
                        <h3
                          className={`text-sm sm:text-base font-black font-['Alexandria'] ${
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
                                className={`border-b ${
                                  isLight ? 'border-slate-200' : 'border-white/5'
                                }`}
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

                    {/* Practical Exercise / Diagnostic Tools Box */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-3 shadow-lg ${
                        isLight
                          ? 'bg-emerald-50/90 border-emerald-300 text-slate-900'
                          : 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border-emerald-500/35 text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-black text-base">
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

                    {/* Clinical Conclusion */}
                    {activeNarrative.conclusionAr && (
                      <div
                        className={`p-5 rounded-3xl border space-y-2 ${
                          isLight
                            ? 'bg-purple-50 border-purple-200 text-slate-800'
                            : 'bg-purple-950/30 border-purple-500/30 text-purple-100'
                        }`}
                      >
                        <p className="leading-relaxed font-semibold" style={{ fontSize: `${readerFontSize}px` }}>
                          {language === 'ar'
                            ? activeNarrative.conclusionAr
                            : activeNarrative.conclusionEn}
                        </p>
                      </div>
                    )}

                    {/* APA References for Clinical Article */}
                    {activeNarrative.apaReferences && activeNarrative.apaReferences.length > 0 && (
                      <div
                        className={`p-5 rounded-3xl border space-y-3 ${
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
                              className={`p-3 rounded-xl border ${
                                isLight
                                  ? 'bg-white border-slate-200'
                                  : 'bg-black/30 border-white/5'
                              }`}
                            >
                              <p className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-300 dir-ltr text-left">
                                {ref.citation}
                              </p>
                              <p className="mt-1 text-[11px] opacity-90">
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
                  className={`p-5 sm:p-7 rounded-3xl border-2 space-y-4 shadow-xl ${
                    isLight
                      ? 'bg-gradient-to-b from-rose-50/70 via-white to-slate-50 border-rose-300 text-slate-900'
                      : 'bg-gradient-to-b from-rose-950/35 via-slate-900/95 to-slate-950 border-rose-500/40 text-gray-100'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-rose-200 dark:border-white/15">
                    <div className="space-y-1">
                      <h2 className="text-base sm:text-xl font-black font-['Alexandria'] text-rose-700 dark:text-rose-300">
                        {language === 'ar'
                          ? '📜 النص الكامل المتواصل للقصة / السجلات السريرية (دون تجزئة)'
                          : '📜 Full Continuous Unsegmented Story Manuscript'}
                      </h2>
                      <p className="text-xs opacity-80">
                        {language === 'ar'
                          ? 'قراءة كاملة متصلة للقصة والسجلات السريرية من البداية إلى النهاية دون أي تجزئة.'
                          : 'Complete continuous story reading without segmentation.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyStoryFullText(activeNarrative)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
                    >
                      {copiedStoryFullText ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedStoryFullText
                          ? language === 'ar'
                            ? 'تم النسخ!'
                            : 'Copied!'
                          : language === 'ar'
                          ? 'نسخ النص الكامل للقصة'
                          : 'Copy Full Story Text'}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`p-4 sm:p-6 rounded-2xl border select-text ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800 shadow-inner'
                        : 'bg-black/40 border-white/10 text-gray-200'
                    }`}
                  >
                    <FormattedContinuousManuscript
                      text={getFullContinuousNarrativeText(activeNarrative, language)}
                      fontSize={readerFontSize}
                      isLight={isLight}
                    />
                  </div>
                </div>

                {/* Bottom Social Media Share Bar */}
                <ArticleBottomSocialShare
                  title={language === 'ar' ? activeNarrative.title : activeNarrative.titleEn}
                  summary={language === 'ar' ? activeNarrative.summary : activeNarrative.summaryEn}
                  url="https://miratalqulub.com/#/articles"
                  isLight={isLight}
                  language={language}
                />
              </motion.div>
            ) : activeAcademic ? (
              /* ==============================================================
                 READER VIEW 2: FULL PEER-REVIEWED ACADEMIC RESEARCH PAPER
                 ============================================================== */
              <motion.div
                key="academic-reader"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                {/* Academic Paper Header */}
                <div
                  className={`p-6 sm:p-7 rounded-3xl border space-y-4 shadow-xl ${
                    isLight
                      ? 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border-indigo-200'
                      : `bg-gradient-to-br ${activeAcademic.coverGradient} border-cyan-500/35`
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

                  <h1
                    className={`text-xl sm:text-2xl font-black leading-snug font-['Alexandria'] ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn}
                  </h1>

                  {/* Secondary Language Title for Academic Rigor */}
                  <p
                    className={`text-xs font-semibold italic ${
                      isLight ? 'text-slate-500' : 'text-gray-400'
                    }`}
                  >
                    {language === 'ar' ? activeAcademic.titleEn : activeAcademic.titleAr}
                  </p>

                  {/* Keywords Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(language === 'ar'
                      ? activeAcademic.keywordsAr
                      : activeAcademic.keywordsEn
                    ).map((kw, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          isLight
                            ? 'bg-indigo-100/80 text-indigo-900'
                            : 'bg-white/10 text-cyan-200'
                        }`}
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reader Toolbar: Font Size, Dark/Light Mode, View Mode Toggle, Social Media Share */}
                <ReaderToolbar
                  fontSize={readerFontSize}
                  onChangeFontSize={setReaderFontSize}
                  viewMode={readerViewMode}
                  onChangeViewMode={setReaderViewMode}
                  shareTitle={language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn}
                  shareSummary={language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn}
                  shareUrl="https://miratalqulub.com/#/articles"
                  contentTypeLabelAr="للبحث العلمي"
                  contentTypeLabelEn="Paper"
                />

                {readerViewMode === 'segmented_and_continuous' && (
                  <div
                    className="space-y-6 transition-all"
                    style={{ fontSize: `${readerFontSize}px` }}
                  >
                    {/* Abstract (الملخص) */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-2.5 ${
                        isLight
                          ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                          : 'bg-amber-500/10 border-amber-500/30 text-gray-200'
                      }`}
                    >
                      <h2 className="text-base font-black text-amber-700 dark:text-amber-300 font-['Alexandria'] flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{language === 'ar' ? 'الملخص (Abstract)' : 'Abstract'}</span>
                      </h2>
                      <p className="leading-loose" style={{ fontSize: `${readerFontSize}px` }}>
                        {language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn}
                      </p>
                    </div>

                    {/* 1. Introduction (المقدمة) */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-3 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-gray-200'
                      }`}
                    >
                      <h2 className="text-base sm:text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                        {language === 'ar' ? '1. المقدمة (Introduction)' : '1. Introduction'}
                      </h2>
                      {(language === 'ar'
                        ? activeAcademic.introductionAr
                        : activeAcademic.introductionEn
                      ).map((p, idx) => (
                        <p key={idx} className="leading-loose" style={{ fontSize: `${readerFontSize}px` }}>
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* 2. Theoretical Framework (الإطار النظري) */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-gray-200'
                      }`}
                    >
                      <h2 className="text-base sm:text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                        {language === 'ar'
                          ? '2. الإطار النظري والدراسات السابقة (Theoretical Framework)'
                          : '2. Theoretical Framework'}
                      </h2>
                      <div className="space-y-4">
                        {activeAcademic.theoreticalFramework.map((sec, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border space-y-2 ${
                              isLight
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-black/30 border-white/5'
                            }`}
                          >
                            <h3 className="text-sm font-extrabold text-purple-700 dark:text-purple-300">
                              {sec.sectionNumber}{' '}
                              {language === 'ar' ? sec.titleAr : sec.titleEn}
                            </h3>
                            <p className="leading-relaxed" style={{ fontSize: `${readerFontSize}px` }}>
                              {language === 'ar' ? sec.contentAr : sec.contentEn}
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

                    {/* 3. Methodology (منهجية البحث) */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-3 ${
                        isLight
                          ? 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                          : 'bg-indigo-950/30 border-indigo-500/30 text-gray-200'
                      }`}
                    >
                      <h2 className="text-base sm:text-lg font-black text-indigo-700 dark:text-indigo-300 font-['Alexandria']">
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

                    {/* 4. Analysis & Discussion (التحليل والمناقشة) */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-gray-200'
                      }`}
                    >
                      <h2 className="text-base sm:text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                        {language === 'ar'
                          ? '4. التحليل والمناقشة (Analysis and Discussion)'
                          : '4. Analysis and Discussion'}
                      </h2>
                      <div className="space-y-4">
                        {activeAcademic.analysisAndDiscussion.map((sec, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border space-y-2 ${
                              isLight
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-black/30 border-white/5'
                            }`}
                          >
                            <h3 className="text-sm font-extrabold text-rose-700 dark:text-rose-300">
                              {sec.sectionNumber}{' '}
                              {language === 'ar' ? sec.titleAr : sec.titleEn}
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
                          className={`mt-4 p-4 rounded-2xl border space-y-3 overflow-x-auto ${
                            isLight
                              ? 'bg-indigo-50/60 border-indigo-200'
                              : 'bg-indigo-950/25 border-indigo-500/30'
                          }`}
                        >
                          <h3 className="text-xs sm:text-sm font-black text-indigo-800 dark:text-cyan-300 font-['Alexandria']">
                            📊{' '}
                            {language === 'ar'
                              ? activeAcademic.summaryTable.titleAr
                              : activeAcademic.summaryTable.titleEn}
                          </h3>
                          <table className="w-full text-xs border-collapse">
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
                                  <th key={hIdx} className="p-2.5 text-start font-extrabold">
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
                                    isLight
                                      ? 'border-indigo-100 bg-white/80'
                                      : 'border-white/10 bg-black/20'
                                  }`}
                                >
                                  <td className="p-2.5 font-bold text-indigo-700 dark:text-cyan-300">
                                    {language === 'ar' ? row.col1Ar : row.col1En}
                                  </td>
                                  <td className="p-2.5">
                                    {language === 'ar' ? row.col2Ar : row.col2En}
                                  </td>
                                  <td className="p-2.5">
                                    {language === 'ar' ? row.col3Ar : row.col3En}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* 5. Conclusion (الخاتمة) */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-2 ${
                        isLight
                          ? 'bg-emerald-50 border-emerald-200 text-slate-800'
                          : 'bg-emerald-950/30 border-emerald-500/30 text-gray-200'
                      }`}
                    >
                      <h2 className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300 font-['Alexandria']">
                        {language === 'ar' ? '5. الخاتمة (Conclusion)' : '5. Conclusion'}
                      </h2>
                      <p className="leading-loose" style={{ fontSize: `${readerFontSize}px` }}>
                        {language === 'ar' ? activeAcademic.conclusionAr : activeAcademic.conclusionEn}
                      </p>
                    </div>

                    {/* 6. Recommendations (التوصيات) */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-gray-200'
                      }`}
                    >
                      <h2 className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-300 font-['Alexandria'] flex items-center gap-2">
                        <ListChecks className="w-5 h-5" />
                        <span>{language === 'ar' ? '6. التوصيات (Recommendations)' : '6. Recommendations'}</span>
                      </h2>
                      <div className="grid grid-cols-1 gap-3">
                        {activeAcademic.recommendations.map((rec, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border space-y-2 ${
                              isLight
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-black/30 border-white/5'
                            }`}
                          >
                            <h3 className="text-xs sm:text-sm font-extrabold text-indigo-600 dark:text-cyan-300">
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

                    {/* 7. APA 7th Edition References */}
                    <div
                      className={`p-5 sm:p-6 rounded-3xl border space-y-3 ${
                        isLight
                          ? 'bg-slate-100 border-slate-300 text-slate-800'
                          : 'bg-slate-900/90 border-white/15 text-gray-300'
                      }`}
                    >
                      <h2 className="text-base font-black flex items-center gap-2 font-['Alexandria']">
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
                            className={`p-2.5 rounded-xl border ${
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
                  className={`p-5 sm:p-7 rounded-3xl border-2 space-y-4 shadow-xl ${
                    isLight
                      ? 'bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-indigo-300 text-slate-900'
                      : 'bg-gradient-to-b from-indigo-950/40 via-slate-900/95 to-slate-950 border-cyan-500/40 text-gray-100'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-indigo-200 dark:border-white/15">
                    <div className="space-y-1">
                      <h2 className="text-base sm:text-xl font-black font-['Alexandria'] text-indigo-800 dark:text-cyan-300">
                        {language === 'ar'
                          ? '📜 النص الكامل المتواصل للبحث العلمي (دون تجزئة)'
                          : '📜 Full Continuous Unsegmented Research Paper'}
                      </h2>
                      <p className="text-xs opacity-80">
                        {language === 'ar'
                          ? 'يُعرض هنا المقال العلمي كاملاً ومتواصلاً من البداية إلى النهاية دون أي تجزئة مع الحفاظ على التنسيق الأكاديمي والجداول والمراجع.'
                          : 'The complete research manuscript is presented below continuously without segmentation.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyFullText(activeAcademic)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
                    >
                      {copiedFullText ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedFullText
                          ? language === 'ar'
                            ? 'تم النسخ!'
                            : 'Copied!'
                          : language === 'ar'
                          ? 'نسخ النص الكامل للبحث'
                          : 'Copy Full Paper Text'}
                      </span>
                    </button>
                  </div>

                  <div
                    className={`p-4 sm:p-6 rounded-2xl border select-text ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800 shadow-inner'
                        : 'bg-black/40 border-white/10 text-gray-200'
                    }`}
                  >
                    <FormattedContinuousManuscript
                      text={getFullContinuousAcademicText(activeAcademic, language)}
                      fontSize={readerFontSize}
                      isLight={isLight}
                    />
                  </div>
                </div>

                {/* Bottom Social Media Share Bar */}
                <ArticleBottomSocialShare
                  title={language === 'ar' ? activeAcademic.titleAr : activeAcademic.titleEn}
                  summary={language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn}
                  url="https://miratalqulub.com/#/articles"
                  isLight={isLight}
                  language={language}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
