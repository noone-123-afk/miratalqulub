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
  GraduationCap,
  Stethoscope,
  FileText,
  BookMarked,
  ListChecks,
  Quote,
  Home,
} from 'lucide-react';
import { Article, ARTICLES_CATALOG } from '../data/articlesData';
import { AcademicPaper, ACADEMIC_PAPERS_CATALOG } from '../data/academicPapersData';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

type ContentTrack = 'narrative' | 'academic';
type FilterCategory = 'all' | 'relationships' | 'self_growth' | 'applied_psychology' | 'emotional_iq';

export const ArticlesEncyclopediaPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';

  const [activeTrack, setActiveTrack] = useState<ContentTrack>('narrative');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNarrative, setActiveNarrative] = useState<Article | null>(null);
  const [activeAcademic, setActiveAcademic] = useState<AcademicPaper | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageSEO
        title={
          language === 'ar'
            ? 'موسوعة المقالات القصصية العيادية والأبحاث العلمية المحكّمة | مرآة القلوب'
            : 'Clinical Narrative Articles & Peer-Reviewed Research Papers | Mirror of Hearts'
        }
        description={
          language === 'ar'
            ? 'موسوعة مرآة القلوب العلمية: مقالات قصصية عيادية من واقع الجلسات النفسية، وأبحاث أكاديمية محكّمة متكاملة بتوثيق APA 7th حول التوافق، الذكاء العاطفي، والهوية.'
            : 'Mirror of Hearts Encyclopedia: Clinical narrative case studies and full peer-reviewed academic research papers (APA 7th) on relationship compatibility, EQ, and digital psychology.'
        }
        canonicalPath="/#/articles"
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

      {/* Hero Section */}
      {!isReading && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-5 shadow-xl ${
            isLight
              ? 'bg-gradient-to-br from-indigo-50 via-white to-rose-50 border-slate-200 text-slate-900'
              : 'bg-gradient-to-br from-purple-950/60 via-slate-900/90 to-indigo-950/60 border-white/15 text-white'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-extrabold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {language === 'ar'
                  ? 'المكتبة العلمية والعيادية المتخصصة'
                  : 'Specialized Clinical & Academic Library'}
              </span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              {language === 'ar' ? 'توثيق مرجعي APA 7th Edition' : 'APA 7th Edition Verified'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-['Alexandria'] leading-tight">
            {language === 'ar'
              ? 'موسوعة مرآة القلوب للمقالات القصصية والأبحاث العلمية'
              : 'Mirror of Hearts Clinical Narratives & Academic Research'}
          </h1>

          <p
            className={`text-sm sm:text-base max-w-3xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-gray-300'
            }`}
          >
            {language === 'ar'
              ? 'تم تقسيم المحتوى العلمي في المنصة برمجياً ومنهجياً إلى مسارين متمايزين: (1) المقالات القصصية العلمية المستندة إلى حالات عيادية واقعية وأدوات تشخيص سلوكية، و(2) المقالات العلمية البحثية الكاملة المصاغة وفق المعايير الأكاديمية المحكّمة.'
              : 'Our knowledge repository is methodologically structured into two distinct tracks: (1) Clinical Narrative Articles grounded in real therapy case studies and behavioral diagnostics, and (2) Full Peer-Reviewed Academic Research Papers.'}
          </p>

          {/* Dual Track Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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
                    {language === 'ar' ? '1. المقالات القصصية العلمية' : '1. Clinical Narrative Articles'}
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
                      ? '2. المقالات العلمية البحثية الكاملة'
                      : '2. Full Academic Research Papers'}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      activeTrack === 'academic'
                        ? 'bg-white/25 text-white'
                        : 'bg-cyan-500/15 text-cyan-500'
                    }`}
                  >
                    {ACADEMIC_PAPERS_CATALOG.length} {language === 'ar' ? 'أبحاث كاملة' : 'Papers'}
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
            {/* Search & Category Bar */}
            <div className="space-y-3">
              <div className="relative">
                <Search
                  className={`w-4 h-4 text-gray-400 absolute top-3.5 ${
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
                    isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'
                  } py-3.5 rounded-2xl border text-sm focus:outline-none transition ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600 shadow-sm'
                      : 'bg-white/5 border-white/15 text-white placeholder-gray-400 focus:border-purple-400'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
                      className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md'
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

            {/* Track 1: Clinical Narrative Articles */}
            {activeTrack === 'narrative' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredNarrativeArticles.map((art) => (
                  <motion.article
                    key={art.id}
                    whileHover={{ scale: 1.01, y: -3 }}
                    onClick={() => {
                      soundManager.playTap();
                      setActiveNarrative(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-6 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-md ${
                      isLight
                        ? 'bg-white hover:bg-rose-50/40 border-slate-200 hover:border-rose-400'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-rose-500/40'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-300 text-xs font-bold border border-rose-500/30 flex items-center gap-1.5">
                          <span>{art.icon}</span>
                          <span>{language === 'ar' ? art.categoryLabelAr : art.categoryLabelEn}</span>
                        </span>
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
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
                      className={`pt-3 border-t flex items-center justify-between text-xs ${
                        isLight ? 'border-slate-200' : 'border-white/10'
                      }`}
                    >
                      <span className="text-[11px] text-purple-600 dark:text-purple-300 font-semibold truncate max-w-[65%]">
                        🔬 {language === 'ar' ? art.scientificFramework : art.scientificFrameworkEn}
                      </span>
                      <span className="text-rose-600 dark:text-rose-400 font-extrabold flex items-center gap-1 shrink-0">
                        <span>{language === 'ar' ? 'قراءة المقال كاملاً' : 'Read Full Article'}</span>
                        <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Track 2: Full Academic Research Papers */}
            {activeTrack === 'academic' && (
              <div className="grid grid-cols-1 gap-5">
                {filteredAcademicPapers.map((paper) => (
                  <motion.article
                    key={paper.id}
                    whileHover={{ scale: 1.005, y: -2 }}
                    onClick={() => {
                      soundManager.playTap();
                      setActiveAcademic(paper);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
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
                          <span className="px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 text-xs font-extrabold border border-cyan-500/30 flex items-center gap-1.5">
                            <span>{paper.icon}</span>
                            <span>
                              {language === 'ar' ? paper.categoryLabelAr : paper.categoryLabelEn}
                            </span>
                          </span>
                          <span className="px-3 py-1 rounded-xl bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-500/30">
                            {language === 'ar' ? paper.methodologyBadgeAr : paper.methodologyBadgeEn}
                          </span>
                        </div>
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? paper.readTimeAr : paper.readTimeEn}</span>
                        </span>
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
                      className={`pt-3 border-t flex items-center justify-between text-xs ${
                        isLight ? 'border-slate-200' : 'border-white/10'
                      }`}
                    >
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        📚 {paper.apaReferences.length}{' '}
                        {language === 'ar'
                          ? 'مرجعاً أكاديمياً موثقاً بصيغة APA 7th'
                          : 'Verified APA 7th Citations'}
                      </span>
                      <span className="text-indigo-600 dark:text-cyan-400 font-extrabold flex items-center gap-1">
                        <span>
                          {language === 'ar'
                            ? 'قراءة البحث العلمي الكامل'
                            : 'Read Full Research Paper'}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
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
                <p className="text-sm sm:text-base italic leading-relaxed font-medium">
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
              <ul className="space-y-2 text-xs sm:text-sm">
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
              {activeNarrative.contentParagraphs.map((para, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-3xl border space-y-2.5 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-white/[0.02] border-white/10 text-gray-200'
                  }`}
                >
                  <h3
                    className={`text-base sm:text-lg font-extrabold font-['Alexandria'] flex items-center gap-2 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{language === 'ar' ? para.heading : para.headingEn}</span>
                  </h3>
                  <p
                    className={`leading-loose text-sm sm:text-base ${
                      isLight ? 'text-slate-700' : 'text-gray-300'
                    }`}
                  >
                    {language === 'ar' ? para.text : para.textEn}
                  </p>
                </div>
              ))}
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

            {activeNarrative.conclusionAr && (
              <div
                className={`p-6 rounded-3xl border space-y-2 ${
                  isLight
                    ? 'bg-purple-50 border-purple-200 text-slate-800'
                    : 'bg-purple-950/30 border-purple-500/30 text-purple-100'
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed font-semibold">
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
            </div>

            <div
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
              <p className="text-sm leading-loose">
                {language === 'ar' ? activeAcademic.abstractAr : activeAcademic.abstractEn}
              </p>
            </div>

            <div
              className={`p-6 rounded-3xl border space-y-3 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                  : 'bg-white/[0.02] border-white/10 text-gray-200'
              }`}
            >
              <h2 className="text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                {language === 'ar' ? '1. المقدمة (Introduction)' : '1. Introduction'}
              </h2>
              {(language === 'ar'
                ? activeAcademic.introductionAr
                : activeAcademic.introductionEn
              ).map((p, idx) => (
                <p key={idx} className="text-sm leading-loose">
                  {p}
                </p>
              ))}
            </div>

            <div
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
                    <p className="text-sm leading-relaxed">
                      {language === 'ar' ? sec.contentAr : sec.contentEn}
                    </p>
                    {sec.subPointsAr && (
                      <ul className="space-y-1.5 pt-2 text-xs sm:text-sm">
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
              className={`p-6 rounded-3xl border space-y-3 ${
                isLight
                  ? 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                  : 'bg-indigo-950/30 border-indigo-500/30 text-gray-200'
              }`}
            >
              <h2 className="text-lg font-black text-indigo-700 dark:text-indigo-300 font-['Alexandria']">
                {language === 'ar' ? '3. منهجية البحث (Methodology)' : '3. Research Methodology'}
              </h2>
              <p className="text-sm font-semibold">
                {language === 'ar'
                  ? activeAcademic.methodology.approachAr
                  : activeAcademic.methodology.approachEn}
              </p>
              <ul className="space-y-2 text-sm">
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
                    <p className="text-sm leading-relaxed">
                      {language === 'ar' ? sec.contentAr : sec.contentEn}
                    </p>
                    {sec.subPointsAr && (
                      <ul className="space-y-2 pt-2 text-xs sm:text-sm">
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
            </div>

            <div
              className={`p-6 rounded-3xl border space-y-2 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-slate-800'
                  : 'bg-emerald-950/30 border-emerald-500/30 text-gray-200'
              }`}
            >
              <h2 className="text-lg font-black text-emerald-700 dark:text-emerald-300 font-['Alexandria']">
                {language === 'ar' ? '5. الخاتمة (Conclusion)' : '5. Conclusion'}
              </h2>
              <p className="text-sm leading-loose">
                {language === 'ar' ? activeAcademic.conclusionAr : activeAcademic.conclusionEn}
              </p>
            </div>

            <div
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
                    <ul className="space-y-1.5 text-xs sm:text-sm">
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
                    {cite}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>

      {/* Bottom AdSense Banner */}
      <div className="pt-4">
        <AdSenseBanner slot="5678901234" format="auto" />
      </div>
    </div>
  );
};
