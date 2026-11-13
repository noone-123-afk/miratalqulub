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
  Sparkles,
  Compass,
  FileText,
  Star,
  RefreshCw,
  MapPin,
  Calendar,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { Novel, NovelGenre, NOVELS_CATALOG } from '../data/novelsData';
import { getAllNovels } from '../services/novelsService';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';

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
  const { language, setLanguage, isRTL } = useLanguage();
  const { appTheme, toggleAppTheme } = useAppTheme();
  const isLight = appTheme === 'light';

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
    { id: 'all', labelAr: 'كافة الروايات والقصص (جميع الأنواع)', labelEn: 'All Novels & Story Collections' },
    { id: 'clinical_stories', labelAr: '🩺 مجموعات قصصية عيادية وسيكولوجية', labelEn: '🩺 Clinical Psychological Stories' },
    { id: 'romance', labelAr: 'روايات رومانسية واجتماعية', labelEn: 'Romantic & Social Novels' },
    { id: 'crime_mystery', labelAr: 'روايات التحقيقات الجنائية المشوقة', labelEn: 'Forensic Crime & Mystery' },
    { id: 'sci_fi_future', labelAr: 'روايات خيال علمي وتكنولوجيا', labelEn: 'Sci-Fi & Reverse Engineering' },
    { id: 'tactical_action', labelAr: 'روايات أكشن ومغامرات تكتيكية', labelEn: 'Tactical Action Thrillers' },
    { id: 'sci_fantasy', labelAr: 'خيال علمي وفانتازيا فكرية', labelEn: 'Intellectual Sci-Fantasy' },
  ];

  const filteredNovels = novels
    .filter((novel) => {
      if (selectedGenre !== 'all' && novel.genre !== selectedGenre) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        novel.titleAr.toLowerCase().includes(q) ||
        (novel.titleEn && novel.titleEn.toLowerCase().includes(q)) ||
        novel.subtitleAr.toLowerCase().includes(q) ||
        novel.synopsisAr.toLowerCase().includes(q) ||
        novel.authorPersonaAr.toLowerCase().includes(q) ||
        (novel.placeSettingAr && novel.placeSettingAr.toLowerCase().includes(q)) ||
        (novel.timeSettingAr && novel.timeSettingAr.toLowerCase().includes(q))
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
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 selection:bg-rose-500/30 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      <PageSEO
        title={
          language === 'ar'
            ? 'مكتبة الروايات: رومانسية، تحقيقات جنائية، خيال علمي وأكشن | مرآة القلوب'
            : 'Novels Library: Romance, Forensic Crime, Sci-Fi & Action | Mirror of Hearts'
        }
        description={
          language === 'ar'
            ? 'استكشف مكتبة روايات مرآة القلوب: رواية في بيتنا ياسمين، شيفرة الأندرويد، وظلال لا تترك أثراً، مع تفاصيل الزمان والمكان والملاحق العلمية والأدبية.'
            : 'Explore Mirror of Hearts novels: In Our House There Is Jasmine, The Android Cipher, and Shadows That Leave No Trace, with full chapters and interactive dossiers.'
        }
        canonicalPath="/#/novels"
        language={language}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar with Navigation, Theme Toggle & Language Switcher */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 border-b pb-5 ${
            isLight ? 'border-slate-200' : 'border-slate-800/80'
          }`}
        >
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToHome();
            }}
            className={`inline-flex items-center gap-2 text-sm transition-colors group px-3.5 py-2 rounded-xl border ${
              isLight
                ? 'bg-white text-slate-700 border-slate-200 hover:border-rose-400 hover:text-rose-600 shadow-sm'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-rose-500/30 hover:text-rose-400'
            }`}
          >
            {isRTL ? (
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            )}
            <span>{language === 'ar' ? 'العودة للمنصة الرئيسية' : 'Back to Home Platform'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-500" />
              <span>
                {novels.length} {language === 'ar' ? 'روايات كاملة' : 'Full Novels'}
              </span>
            </span>
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {totalChapters} {language === 'ar' ? 'فصلاً روائياً' : 'Chapters'}
              </span>
            </span>
            <span
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>
                {totalWords.toLocaleString()} {language === 'ar' ? 'كلمة' : 'Words'}
              </span>
            </span>

            {/* Language Toggle */}
            <button
              onClick={() => {
                soundManager.playTap();
                setLanguage(language === 'ar' ? 'en' : 'ar');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold border transition ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => {
                soundManager.playTap();
                toggleAppTheme();
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold border transition ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                  : 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
              }`}
              title={language === 'ar' ? 'تبديل الوضع الليلي / النهاري' : 'Toggle Dark / Light Mode'}
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span>{isLight ? (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode') : (language === 'ar' ? 'الوضع النهاري' : 'Light Mode')}</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <header
          className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 shadow-xl ${
            isLight
              ? 'bg-gradient-to-br from-white via-rose-50/40 to-emerald-50/40 border-slate-200'
              : 'bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border-slate-800/80'
          }`}
        >
          <div className="relative z-10 max-w-4xl space-y-5">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-500 mb-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>
                    {language === 'ar'
                      ? 'قسم الروايات والقصص: رومانسية • تحقيقات جنائية • خيال علمي • أكشن'
                      : 'Novels & Stories Section: Romance • Forensic Crime • Sci-Fi • Action'}
                  </span>
                </div>
                <h1
                  className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'ar'
                    ? 'قصص إنسانية تحمل المعنى والتجربة'
                    : 'Human Stories Carrying Meaning & Experience'}
                </h1>
              </div>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {language === 'ar'
                ? 'يضم قسم الروايات والقصص أعمالاً سردية وإنسانية تعبر عن المشاعر والتجارب والمواقف الحياتية المختلفة، بأسلوب أدبي يجمع بين المتعة والفائدة والتأمل في العلاقات الإنسانية.'
                : 'The Novels & Stories section features narrative and humanistic works expressing emotions, life experiences, and complex dilemmas in a literary style uniting enjoyment with deep reflection.'}
            </p>

            {/* مميزات القسم + ماذا ستجد في هذا القسم */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-950/60 border-white/10'
                }`}
              >
                <h3 className="text-xs sm:text-sm font-black font-['Alexandria'] text-rose-500">
                  {language === 'ar' ? 'مميزات القسم:' : 'Section Features:'}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold">
                  {(language === 'ar'
                    ? [
                        'قصص وروايات باللغة العربية',
                        'أسلوب سردي جذاب',
                        'موضوعات إنسانية واجتماعية',
                        'شخصيات قريبة من الواقع',
                        'رسائل ومعانٍ هادفة',
                        'محتوى متجدد',
                      ]
                    : [
                        'Original Arabic & English stories',
                        'Engaging narrative style',
                        'Human & social themes',
                        'Relatable, realistic characters',
                        'Meaningful insights & lessons',
                        'Continuously updated library',
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
                <h3 className="text-xs sm:text-sm font-black font-['Alexandria'] text-amber-500">
                  {language === 'ar' ? 'ماذا ستجد في هذا القسم؟' : 'What You Will Find Here:'}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'ar'
                    ? [
                        'الروايات الاجتماعية',
                        'القصص الإنسانية',
                        'القصص النفسية والتأملية',
                        'قصص العلاقات والتجارب الحياتية',
                        'القصص القصيرة',
                        'السلاسل القصصية المتتابعة',
                      ]
                    : [
                        'Social Novels',
                        'Humanistic Stories',
                        'Psychological & Reflective Tales',
                        'Relationship Experiences',
                        'Short Stories',
                        'Serialized Story Collections',
                      ]
                  ).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                        isLight
                          ? 'bg-amber-50 border-amber-200 text-amber-900'
                          : 'bg-amber-500/15 border-amber-500/30 text-amber-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search & Genre Filter Bar */}
        <div
          className={`space-y-4 p-5 rounded-2xl border shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800/80'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'ابحث باسم الرواية (مثل: في بيتنا ياسمين، شيفرة الأندرويد، ظلال لا تترك أثراً)، المكان، أو البطل...'
                    : 'Search by novel title, place, time setting, or character...'
                }
                className={`w-full border text-sm rounded-xl py-2.5 px-9 focus:outline-none focus:border-rose-500/50 transition-colors ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                    : 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder:text-slate-500'
                }`}
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
              <span className="text-xs text-slate-400 hidden sm:inline">
                {language === 'ar' ? 'الترتيب:' : 'Sort:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'words')}
                className={`border text-xs rounded-xl px-3 py-2.5 focus:outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
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
                  className={`text-xs whitespace-nowrap px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md border border-rose-400/40'
                      : isLight
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
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
            <p className="text-sm text-slate-400">
              {language === 'ar' ? 'جارٍ تحميل مكتبة الروايات...' : 'Loading novels catalogue...'}
            </p>
          </div>
        ) : filteredNovels.length === 0 ? (
          <div
            className={`py-20 text-center space-y-4 rounded-2xl border p-8 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/30 border-slate-800/60'
            }`}
          >
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold">
              {language === 'ar' ? 'لم يتم العثور على روايات مطابقة' : 'No matching novels found'}
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
              }}
              className="text-xs text-rose-500 font-bold hover:underline inline-block mt-2"
            >
              {language === 'ar' ? 'إعادة ضبط عوامل التصفية' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNovels.map((novel, idx) => {
              const displayTitle = language === 'en' && novel.titleEn ? novel.titleEn : novel.titleAr;
              const displaySubtitle = language === 'en' && novel.subtitleEn ? novel.subtitleEn : novel.subtitleAr;
              const displaySynopsis = language === 'en' && novel.synopsisEn ? novel.synopsisEn : novel.synopsisAr;
              const displayGenre = language === 'en' && novel.genreLabelEn ? novel.genreLabelEn : novel.genreLabelAr;
              const displayTime = language === 'en' && novel.timeSettingEn ? novel.timeSettingEn : novel.timeSettingAr;
              const displayPlace = language === 'en' && novel.placeSettingEn ? novel.placeSettingEn : novel.placeSettingAr;

              return (
                <motion.article
                  key={novel.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all shadow-lg hover:shadow-2xl overflow-hidden ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-rose-400'
                      : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/80 hover:border-rose-500/40'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Novel Cover SVG */}
                    <div
                      onClick={() => {
                        soundManager.playTap();
                        onSelectNovel(novel.id);
                      }}
                      className="relative w-full h-52 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 cursor-pointer group-hover:scale-[1.01] transition-transform flex items-center justify-center p-1"
                      dangerouslySetInnerHTML={{ __html: novel.coverIllustrationSvg }}
                    />

                    {/* Metadata Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border"
                          style={{
                            borderColor: `${novel.genreBadgeColor}55`,
                            backgroundColor: `${novel.genreBadgeColor}18`,
                            color: novel.genreBadgeColor,
                          }}
                        >
                          {displayGenre}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{novel.rating.toFixed(2)}</span>
                        </div>
                      </div>

                      <h2
                        onClick={() => {
                          soundManager.playTap();
                          onSelectNovel(novel.id);
                        }}
                        className={`text-xl font-black group-hover:text-rose-500 transition-colors cursor-pointer leading-snug ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {displayTitle}
                      </h2>
                      <p className={`text-xs font-semibold ${isLight ? 'text-rose-700' : 'text-rose-300/90'}`}>
                        {displaySubtitle}
                      </p>
                    </div>

                    {/* Synopsis snippet */}
                    <p className={`text-xs line-clamp-3 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {displaySynopsis}
                    </p>

                    {/* Time & Place Setting Box (المكان والزمان) */}
                    {(displayTime || displayPlace) && (
                      <div
                        className={`rounded-xl p-3 space-y-1.5 border text-[11px] ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-700'
                            : 'bg-slate-950/70 border-slate-800/80 text-slate-300'
                        }`}
                      >
                        {displayTime && (
                          <div className="flex items-start gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>
                              <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                                {language === 'ar' ? 'الزمان: ' : 'Time: '}
                              </strong>
                              {displayTime}
                            </span>
                          </div>
                        )}
                        {displayPlace && (
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>
                              <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                                {language === 'ar' ? 'المكان: ' : 'Place: '}
                              </strong>
                              {displayPlace}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Author & Focus */}
                    <div
                      className={`space-y-1.5 pt-2 border-t text-[11px] ${
                        isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800/60 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{language === 'ar' ? 'المحور العلمي / الأدبي:' : 'Core Focus:'}</span>
                        <span className={`truncate max-w-[190px] font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                          {novel.forensicThemeAr}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Metrics & Actions */}
                  <div
                    className={`pt-4 mt-4 border-t space-y-3 ${
                      isLight ? 'border-slate-200' : 'border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{novel.estimatedReadingTime}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                        <span>
                          {novel.chapters?.length || 0} {language === 'ar' ? 'فصول كاملة' : 'chapters'}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-rose-500 font-semibold">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{novel.readsCount.toLocaleString()}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          soundManager.playTap();
                          onSelectNovel(novel.id);
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-colors border cursor-pointer ${
                          isLight
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700/60'
                        }`}
                      >
                        {language === 'ar' ? 'تفاصيل الرواية' : 'Novel Details'}
                      </button>
                      <button
                        onClick={() => {
                          soundManager.playTap();
                          onReadChapter(novel.id, 0);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>{language === 'ar' ? 'ابدأ القراءة' : 'Start Reading'}</span>
                        {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
