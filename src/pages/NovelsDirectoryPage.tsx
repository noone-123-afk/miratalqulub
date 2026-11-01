import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Clock,
  Flame,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Filter,
  Sparkles,
  ShieldCheck,
  Compass,
  FileText,
  UserCheck,
  Star,
  RefreshCw,
} from 'lucide-react';
import { Novel, NovelGenre, NOVELS_CATALOG } from '../data/novelsData';
import { getAllNovels } from '../services/novelsService';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';

interface Props {
  onSelectNovel: (novelId: string) => void;
  onReadChapter: (novelId: string, chapterIndex: number) => void;
  onBackToHome: () => void;
}

export const NovelsDirectoryPage: React.FC<Props> = ({
  onSelectNovel,
  onReadChapter,
  onBackToHome,
}) => {
  const { language, isRTL, t } = useLanguage();
  const [novels, setNovels] = useState<Novel[]>(NOVELS_CATALOG);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<'all' | NovelGenre>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'words'>('popular');

  useEffect(() => {
    let isMounted = true;
    getAllNovels().then((list) => {
      if (isMounted) {
        if (list && list.length > 0) {
          setNovels(list);
        }
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const genres: Array<{ id: 'all' | NovelGenre; labelAr: string; labelEn: string }> = [
    { id: 'all', labelAr: 'كافة الروايات والتحقيقات', labelEn: 'All Investigations' },
    { id: 'crime_mystery', labelAr: 'جرائم وغموض جنائي', labelEn: 'Forensic & Mystery' },
    { id: 'tactical_action', labelAr: 'مغامرات وحركة تكتيكية', labelEn: 'Tactical Action' },
    { id: 'sci_fi_future', labelAr: 'خيال علمي ومستقبلي', labelEn: 'Speculative Sci-Fi' },
    { id: 'sci_fantasy', labelAr: 'خيال علمي وفانتازيا فكرية', labelEn: 'Intellectual Fantasy' },
  ];

  const filteredNovels = novels
    .filter((novel) => {
      if (selectedGenre !== 'all' && novel.genre !== selectedGenre) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        novel.titleAr.toLowerCase().includes(q) ||
        novel.subtitleAr.toLowerCase().includes(q) ||
        novel.synopsisAr.toLowerCase().includes(q) ||
        novel.authorPersonaAr.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'words') return b.totalWords - a.totalWords;
      return b.readsCount - a.readsCount;
    });

  const totalWords = novels.reduce((acc, curr) => acc + curr.totalWords, 0);
  const totalChapters = novels.reduce((acc, curr) => acc + (curr.chapters?.length || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-rose-500/30 selection:text-rose-200">
      <PageSEO
        title={
          language === 'ar'
            ? 'مكتبة الروايات البوليسية والتحقيقات التشويقية | مرآة القلوب'
            : 'Forensic Novels & Suspense Library | Mirror of Hearts'
        }
        description={
          language === 'ar'
            ? 'استكشف مكتبة حصرية من الروايات البوليسية والتحقيقات الجنائية العميقة والخيال العلمي الفكري. قضايا غامضة، أدلة جنائية، وتحليل نفسي دقيق للشخصيات.'
            : 'Explore exclusive forensic mystery, deductive detective, and speculative fiction novels with interactive evidence boards and suspect dossiers.'
        }
        canonicalPath="/#/novels"
        language={language}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToHome();
            }}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors group px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-rose-500/30"
          >
            {isRTL ? (
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            )}
            <span>{language === 'ar' ? 'العودة للمنصة الرئيسية' : 'Back to Home Platform'}</span>
          </button>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              <BookOpen className="w-3.5 h-3.5 text-rose-400" />
              <span>
                {novels.length} {language === 'ar' ? 'روايات أصلية' : 'Original Novels'}
              </span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {totalChapters} {language === 'ar' ? 'فصلاً كاملاً' : 'Full Chapters'}
              </span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {totalWords.toLocaleString()} {language === 'ar' ? 'كلمة مكتوبة' : 'Words'}
              </span>
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'أدب التحقيق الجنائي والغموض الفكري' : 'Deductive & Forensic Literary Fiction'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'ar' ? 'مكتبة التحقيقات والروايات التشويقية' : 'Suspense & Forensic Mystery Library'}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'استمتع بروايات أدبية أصلية غنية بالتفاصيل المخبرية، وتحليل السلوك النفسي للخصوم والمشتبه بهم، مع لوحة أدلة جنائية تفاعلية وملفات قضايا حصرية.'
                : 'Immerse yourself in deeply researched, standalone detective and investigative novels featuring interactive evidence boards, toxicology reports, and psychological profiling.'}
            </p>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 shadow-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'ابحث باسم الرواية، القضية، المحقق، أو موضوع التحقيق...'
                    : 'Search by title, detective, case theme, or forensic subject...'
                }
                className="w-full bg-slate-950/80 border border-slate-800 text-sm text-slate-100 rounded-xl py-2.5 px-9 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 text-xs text-slate-400 hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">{language === 'ar' ? 'الترتيب:' : 'Sort:'}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-rose-500/40"
              >
                <option value="popular">{language === 'ar' ? 'الأكثر قراءة' : 'Most Read'}</option>
                <option value="rating">{language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
                <option value="words">{language === 'ar' ? 'أطول الروايات' : 'Longest Word Count'}</option>
              </select>
            </div>
          </div>

          {/* Genre Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {genres.map((g) => {
              const isSelected = selectedGenre === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedGenre(g.id);
                  }}
                  className={`text-xs whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition-all ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-950 border border-rose-400/40'
                      : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {language === 'ar' ? g.labelAr : g.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Novels Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <RefreshCw className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
            <p className="text-sm text-slate-400">{language === 'ar' ? 'جارٍ تحميل ملفات الروايات...' : 'Loading novels catalogue...'}</p>
          </div>
        ) : filteredNovels.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-slate-900/30 rounded-2xl border border-slate-800/60 p-8">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">
              {language === 'ar' ? 'لم يتم العثور على روايات مطابقة' : 'No matching novels found'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {language === 'ar'
                ? 'جرب تعديل كلمات البحث أو اختيار تصنيف آخر لاستعراض التحقيقات المتاحة.'
                : 'Try adjusting your search terms or genre filter to browse available cases.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
              }}
              className="text-xs text-rose-400 hover:underline inline-block mt-2"
            >
              {language === 'ar' ? 'إعادة ضبط عوامل التصفية' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNovels.map((novel, idx) => (
              <motion.article
                key={novel.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between bg-slate-900/70 hover:bg-slate-900 rounded-2xl border border-slate-800/80 hover:border-rose-500/40 p-5 transition-all shadow-lg hover:shadow-2xl overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Novel Cover SVG */}
                  <div
                    onClick={() => {
                      soundManager.playTap();
                      onSelectNovel(novel.id);
                    }}
                    className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 cursor-pointer group-hover:scale-[1.02] transition-transform flex items-center justify-center p-2"
                    dangerouslySetInnerHTML={{ __html: novel.coverIllustrationSvg }}
                  />

                  {/* Metadata Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-slate-800/90 text-rose-300 border border-slate-700/60">
                        {novel.genreLabelAr}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{novel.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h2
                      onClick={() => {
                        soundManager.playTap();
                        onSelectNovel(novel.id);
                      }}
                      className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors cursor-pointer leading-snug"
                    >
                      {novel.titleAr}
                    </h2>
                    <p className="text-xs text-rose-200/80 font-medium">{novel.subtitleAr}</p>
                  </div>

                  {/* Synopsis snippet */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {novel.synopsisAr}
                  </p>

                  {/* Forensic theme and author pill */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>{language === 'ar' ? 'المحقق المسؤول:' : 'Lead Investigator:'}</span>
                      <span className="text-slate-200 font-medium">{novel.authorPersonaAr}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'ar' ? 'الموضوع الجنائي:' : 'Forensic Focus:'}</span>
                      <span className="text-slate-300 truncate max-w-[160px]">{novel.forensicThemeAr}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{novel.estimatedReadingTime}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>
                        {novel.chapters?.length || 0} {language === 'ar' ? 'فصول' : 'chapters'}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>{novel.readsCount.toLocaleString()}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onSelectNovel(novel.id);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-slate-700/60"
                    >
                      {language === 'ar' ? 'ملف القضية والأدلة' : 'Case Dossier'}
                    </button>
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onReadChapter(novel.id, 0);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-all shadow-md hover:shadow-rose-900/50 flex items-center justify-center gap-1"
                    >
                      <span>{language === 'ar' ? 'ابدأ القراءة' : 'Read Chapter 1'}</span>
                      {isRTL ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
