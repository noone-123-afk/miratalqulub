import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Clock,
  Flame,
  Star,
  Share2,
  Check,
  Target,
  FileText,
  UserCheck,
  Bookmark,
  MessageSquare,
  Sparkles,
  MapPin,
  Calendar,
  Sun,
  Moon,
  Globe,
  ScrollText,
} from 'lucide-react';
import {
  Novel,
  NOVELS_CATALOG,
  getFullNovelContinuousText,
} from '../data/novelsData';
import { getAllNovels } from '../services/novelsService';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { NovelCommentsSection } from '../components/NovelCommentsSection';
import {
  ReaderToolbar,
  FormattedContinuousManuscript,
  ContinuousViewMode,
} from '../components/ReaderToolbar';

interface Props {
  novelId: string;
  onBackToDirectory: () => void;
  onReadChapter: (novelId: string, chapterIndex: number) => void;
}

type TabType = 'chapters' | 'full_continuous' | 'appendix' | 'evidence' | 'suspects' | 'comments';

export const NovelDetailPage: React.FC<Props> = ({
  novelId,
  onBackToDirectory,
  onReadChapter,
}) => {
  const { language, setLanguage, isRTL } = useLanguage();
  const { appTheme, toggleAppTheme } = useAppTheme();
  const isLight = appTheme === 'light';

  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('chapters');
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedFullStory, setCopiedFullStory] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<number>(18);
  const [readerViewMode, setReaderViewMode] = useState<ContinuousViewMode>('continuous_only');
  const [bookmarkChapterIndex, setBookmarkChapterIndex] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    getAllNovels().then((list) => {
      if (!isMounted) return;
      const found = list.find((n) => n.id === novelId) || NOVELS_CATALOG.find((n) => n.id === novelId);
      if (found) {
        setNovel(found);
      }
      setLoading(false);
    });

    try {
      const raw = localStorage.getItem(`mirat_novel_bookmark_${novelId}`);
      if (raw !== null) {
        setBookmarkChapterIndex(parseInt(raw, 10));
      }
    } catch {
      // Ignore
    }

    return () => {
      isMounted = false;
    };
  }, [novelId]);

  const handleShare = () => {
    soundManager.playTap();
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      });
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-100'
        }`}
      >
        <p className="text-sm text-slate-400">
          {language === 'ar' ? 'جارٍ فتح ملف الرواية...' : 'Opening novel dossier...'}
        </p>
      </div>
    );
  }

  if (!novel) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 space-y-4 ${
          isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-100'
        }`}
      >
        <BookOpen className="w-12 h-12 text-slate-500" />
        <h2 className="text-xl font-bold">{language === 'ar' ? 'الرواية غير موجودة' : 'Novel Not Found'}</h2>
        <button
          onClick={onBackToDirectory}
          className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold"
        >
          {language === 'ar' ? 'العودة للمكتبة' : 'Back to Library'}
        </button>
      </div>
    );
  }

  const allClues = novel.chapters.flatMap((c) => c.investigationClues || []);
  const displayTitle = language === 'en' && novel.titleEn ? novel.titleEn : novel.titleAr;
  const displaySubtitle = language === 'en' && novel.subtitleEn ? novel.subtitleEn : novel.subtitleAr;
  const displaySynopsis = language === 'en' && novel.synopsisEn ? novel.synopsisEn : novel.synopsisAr;
  const displayGenre = language === 'en' && novel.genreLabelEn ? novel.genreLabelEn : novel.genreLabelAr;
  const displayTime = language === 'en' && novel.timeSettingEn ? novel.timeSettingEn : novel.timeSettingAr;
  const displayPlace = language === 'en' && novel.placeSettingEn ? novel.placeSettingEn : novel.placeSettingAr;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 selection:bg-rose-500/30 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
      }`}
    >
      <PageSEO
        title={`${displayTitle} | ${language === 'ar' ? 'مرآة القلوب' : 'Mirror of Hearts'}`}
        description={displaySynopsis.slice(0, 155)}
        canonicalPath={`/#/novels/${novel.id}`}
        language={language}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Breadcrumb, Theme, Language & Share */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800/80'
          }`}
        >
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToDirectory();
            }}
            className={`inline-flex items-center gap-2 text-sm transition-colors group px-3.5 py-2 rounded-xl border ${
              isLight
                ? 'bg-white text-slate-700 border-slate-200 hover:border-rose-400 hover:text-rose-600 shadow-sm'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-rose-500/30 hover:text-rose-400'
            }`}
          >
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            <span>{language === 'ar' ? 'العودة لمكتبة الروايات' : 'Back to Novels Library'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playTap();
                setLanguage(language === 'ar' ? 'en' : 'ar');
              }}
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                toggleAppTheme();
              }}
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                  : 'bg-slate-900/60 border-slate-800 text-amber-300 hover:bg-slate-800'
              }`}
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span>{isLight ? (language === 'ar' ? 'ليلي' : 'Dark') : (language === 'ar' ? 'نهاري' : 'Light')}</span>
            </button>

            <button
              onClick={handleShare}
              className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl border ${
                isLight
                  ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  : 'bg-slate-900/60 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
              }`}
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">
                    {language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>{language === 'ar' ? 'مشاركة الرواية' : 'Share Novel'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Novel Dossier Card */}
        <div
          className={`border rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-slate-800/80'
          }`}
        >
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Novel Cover */}
            <div
              className="w-full h-64 md:h-80 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shadow-inner"
              dangerouslySetInnerHTML={{ __html: novel.coverIllustrationSvg }}
            />

            {/* Novel Info & Stats */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full border"
                  style={{
                    borderColor: `${novel.genreBadgeColor}55`,
                    backgroundColor: `${novel.genreBadgeColor}18`,
                    color: novel.genreBadgeColor,
                  }}
                >
                  {displayGenre}
                </span>
                <span
                  className={`flex items-center gap-1 text-amber-500 text-xs font-bold px-2.5 py-1 rounded-full border ${
                    isLight ? 'bg-amber-50 border-amber-200' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{novel.rating.toFixed(2)}</span>
                </span>
                <span
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${
                    isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>
                    {novel.readsCount.toLocaleString()} {language === 'ar' ? 'قراءة' : 'reads'}
                  </span>
                </span>
              </div>

              <div>
                <h1
                  className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {displayTitle}
                </h1>
                <p className={`text-sm sm:text-base font-semibold mt-1 ${isLight ? 'text-rose-700' : 'text-rose-300/90'}`}>
                  {displaySubtitle}
                </p>
              </div>

              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {displaySynopsis}
              </p>

              {/* Time & Place Setting Cards (المكان والزمان) */}
              {(displayTime || displayPlace) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {displayTime && (
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                        isLight
                          ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                          : 'bg-slate-950/80 border-amber-500/30 text-slate-200'
                      }`}
                    >
                      <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-amber-500 mb-0.5">
                          {language === 'ar' ? 'الزمان والإطار الزمني:' : 'Time Setting:'}
                        </span>
                        <span className="leading-relaxed">{displayTime}</span>
                      </div>
                    </div>
                  )}
                  {displayPlace && (
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                        isLight
                          ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                          : 'bg-slate-950/80 border-emerald-500/30 text-slate-200'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-emerald-500 mb-0.5">
                          {language === 'ar' ? 'المكان ومسرح الأحداث:' : 'Place & Setting:'}
                        </span>
                        <span className="leading-relaxed">{displayPlace}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Meta details */}
              <div
                className={`grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t text-xs ${
                  isLight ? 'border-slate-200' : 'border-slate-800/80'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800/60'
                  }`}
                >
                  <span className="text-slate-400 block text-[11px]">
                    {language === 'ar' ? 'الشخصيات المحورية:' : 'Key Figures:'}
                  </span>
                  <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {novel.authorPersonaAr}
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800/60'
                  }`}
                >
                  <span className="text-slate-400 block text-[11px]">
                    {language === 'ar' ? 'زمن القراءة:' : 'Read Time:'}
                  </span>
                  <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {novel.estimatedReadingTime}
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded-xl border col-span-2 sm:col-span-1 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800/60'
                  }`}
                >
                  <span className="text-slate-400 block text-[11px]">
                    {language === 'ar' ? 'إجمالي الكلمات:' : 'Total Words:'}
                  </span>
                  <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {novel.totalWords.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Read Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    soundManager.playTap();
                    onReadChapter(novel.id, 0);
                  }}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{language === 'ar' ? 'ابدأ القراءة من الفصل الأول' : 'Start Chapter 1'}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTab('full_continuous');
                    setTimeout(() => {
                      const el = document.getElementById('novel-full-continuous-reader');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all border flex items-center gap-2 cursor-pointer shadow-md ${
                    activeTab === 'full_continuous'
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : isLight
                      ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-300'
                      : 'bg-indigo-950/70 hover:bg-indigo-900/80 text-cyan-200 border-indigo-500/40'
                  }`}
                >
                  <ScrollText className="w-4 h-4 text-cyan-400" />
                  <span>
                    {language === 'ar'
                      ? '📜 قراءة القصة / الرواية كاملة دون تجزئة'
                      : '📜 Read Full Story Unsegmented'}
                  </span>
                </button>

                {bookmarkChapterIndex !== null && bookmarkChapterIndex < novel.chapters.length && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onReadChapter(novel.id, bookmarkChapterIndex);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border flex items-center gap-2 cursor-pointer ${
                      isLight
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700/80'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 text-amber-500" />
                    <span>
                      {language === 'ar'
                        ? `استئناف القراءة (الفصل ${bookmarkChapterIndex + 1})`
                        : `Resume Chapter ${bookmarkChapterIndex + 1}`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          className={`flex items-center gap-2 border-b pb-2 overflow-x-auto ${
            isLight ? 'border-slate-200' : 'border-slate-800/80'
          }`}
        >
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('chapters');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'chapters'
                ? 'bg-rose-600 text-white shadow-md'
                : isLight
                ? 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'ar' ? 'فصول القصة / الرواية' : 'Story Chapters'}</span>
            <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{novel.chapters.length}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('full_continuous');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'full_continuous'
                ? 'bg-indigo-600 text-white shadow-md'
                : isLight
                ? 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200'
                : 'bg-indigo-950/60 text-cyan-200 hover:bg-indigo-900/70 border border-indigo-500/40'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? '📜 قراءة كاملة دون تجزئة (النص الكامل)'
                : '📜 Full Unsegmented Story'}
            </span>
          </button>

          {(novel.appendixItems || novel.authorWordAr) && (
            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('appendix');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'appendix'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isLight
                  ? 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {language === 'ar'
                  ? novel.appendixTitleAr || 'الملحق الأدبي / العلمي وكلمة المؤلف'
                  : novel.appendixTitleEn || 'Literary / Scientific Appendix'}
              </span>
            </button>
          )}

          {allClues.length > 0 && (
            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('evidence');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'evidence'
                  ? 'bg-rose-600 text-white shadow-md'
                  : isLight
                  ? 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{language === 'ar' ? 'لوحة الأدلة والتقارير' : 'Evidence Board'}</span>
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{allClues.length}</span>
            </button>
          )}

          {novel.suspectsDossier && novel.suspectsDossier.length > 0 && (
            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('suspects');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'suspects'
                  ? 'bg-rose-600 text-white shadow-md'
                  : isLight
                  ? 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{language === 'ar' ? 'الشخصيات والمشتبه بهم' : 'Characters & Suspects'}</span>
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{novel.suspectsDossier.length}</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('comments');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'comments'
                ? 'bg-rose-600 text-white shadow-md'
                : isLight
                ? 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'ar' ? 'التعليقات ومناقشات القراء' : 'Reader Comments'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* 1. Chapters Tab */}
          {activeTab === 'chapters' && (
            <div className="space-y-3">
              {novel.chapters.map((chapter, idx) => {
                const chapTitle = language === 'en' && chapter.titleEn ? chapter.titleEn : chapter.titleAr;
                const chapSynopsis = language === 'en' && chapter.synopsisEn ? chapter.synopsisEn : chapter.synopsisAr;
                return (
                  <div
                    key={chapter.chapterNumber}
                    className={`rounded-2xl border p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
                      isLight
                        ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-rose-500">
                          {language === 'ar' ? `الجزء ${chapter.chapterNumber}` : `Part ${chapter.chapterNumber}`}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {chapter.estimatedMinutes} {language === 'ar' ? 'دقيقة' : 'mins'}
                          </span>
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-xs text-slate-400">
                          {chapter.wordsCount.toLocaleString()} {language === 'ar' ? 'كلمة' : 'words'}
                        </span>
                      </div>

                      <h3
                        className={`text-base font-bold group-hover:text-rose-500 transition-colors ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {chapTitle}
                      </h3>
                      <p className={`text-xs line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {chapSynopsis}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onReadChapter(novel.id, idx);
                      }}
                      className="self-end sm:self-center px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <span>{language === 'ar' ? 'قراءة الفصل' : 'Read Chapter'}</span>
                      {isRTL ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* 1-B. Full Continuous Unsegmented Story / Novel Reader Tab */}
          {activeTab === 'full_continuous' && (
            <div id="novel-full-continuous-reader" className="space-y-5">
              <ReaderToolbar
                fontSize={readerFontSize}
                onChangeFontSize={setReaderFontSize}
                viewMode={readerViewMode}
                onChangeViewMode={(mode) => {
                  setReaderViewMode(mode);
                  if (mode === 'segmented_and_continuous') {
                    setActiveTab('chapters');
                  }
                }}
                shareTitle={displayTitle}
                shareSummary={displaySynopsis}
                shareUrl={window.location.href}
                contentTypeLabelAr="للقصة / الرواية"
                contentTypeLabelEn="Story"
              />

              <div
                className={`p-6 sm:p-10 rounded-3xl border-2 space-y-5 shadow-xl ${
                  isLight
                    ? 'bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-indigo-300 text-slate-900'
                    : 'bg-gradient-to-b from-indigo-950/35 via-slate-900/95 to-slate-950 border-indigo-500/40 text-slate-100'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-indigo-200 dark:border-slate-800">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-cyan-300 text-xs font-extrabold">
                      <ScrollText className="w-3.5 h-3.5" />
                      <span>
                        {language === 'ar'
                          ? 'وضع القراءة المتصلة الكاملة دون تجزئة'
                          : 'Full Continuous Unsegmented Reading Mode'}
                      </span>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black">
                      {displayTitle} — {language === 'ar' ? 'النص الكامل المتواصل' : 'Complete Unsegmented Text'}
                    </h2>
                    <p className="text-xs opacity-80">
                      {language === 'ar'
                        ? 'جميع الفصول والحالات السريرية والملاحق معروضة بشكل متصل ومتواصل دون أي تجزئة لقراءة غامرة.'
                        : 'All chapters, clinical cases, and appendices presented continuously without segmentation.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      const fullText = getFullNovelContinuousText(novel, language);
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(fullText);
                        setCopiedFullStory(true);
                        setTimeout(() => setCopiedFullStory(false), 2500);
                      }
                    }}
                    className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    {copiedFullStory ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    <span>
                      {copiedFullStory
                        ? language === 'ar'
                          ? 'تم نسخ النص الكامل!'
                          : 'Full Text Copied!'
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
                      : 'bg-slate-950/70 border-slate-800 text-slate-200'
                  }`}
                >
                  <FormattedContinuousManuscript
                    text={getFullNovelContinuousText(novel, language)}
                    fontSize={readerFontSize}
                    isLight={isLight}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. Literary / Scientific Appendix & Author Word Tab */}
          {activeTab === 'appendix' && (
            <div className="space-y-6">
              {novel.appendixItems &&
                novel.appendixItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-6 space-y-3 ${
                      isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800/80'
                    }`}
                  >
                    <h3 className="text-lg font-black text-emerald-500 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      <span>{language === 'en' && item.titleEn ? item.titleEn : item.titleAr}</span>
                    </h3>
                    <div
                      className={`text-sm leading-relaxed whitespace-pre-line font-serif ${
                        isLight ? 'text-slate-700' : 'text-slate-200'
                      }`}
                    >
                      {language === 'en' && item.contentEn ? item.contentEn : item.contentAr}
                    </div>
                  </div>
                ))}

              {(novel.authorWordAr || novel.authorWordEn) && (
                <div
                  className={`rounded-2xl border p-6 space-y-3 ${
                    isLight
                      ? 'bg-amber-50/80 border-amber-200 text-slate-800'
                      : 'bg-amber-950/20 border-amber-500/30 text-amber-100'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-line font-serif">
                    {language === 'en' && novel.authorWordEn ? novel.authorWordEn : novel.authorWordAr}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Evidence Tab */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allClues.map((clue) => (
                  <div
                    key={clue.id}
                    className={`border rounded-2xl p-5 space-y-3 ${
                      isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-500 uppercase">{clue.type}</span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold border border-amber-500/30">
                        {clue.significanceLevel}
                      </span>
                    </div>
                    <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {clue.titleAr}
                    </h4>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{clue.descriptionAr}</p>
                    <div
                      className={`p-3 rounded-xl border text-xs font-mono ${
                        isLight
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-slate-950 border-slate-800/60 text-emerald-300/90'
                      }`}
                    >
                      <span className="text-slate-400 block text-[10px] mb-1 font-sans">
                        {language === 'ar' ? 'التقرير المخبري الجنائي:' : 'Forensic Lab Report:'}
                      </span>
                      {clue.forensicLabReportAr}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Suspects / Characters Tab */}
          {activeTab === 'suspects' && novel.suspectsDossier && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {novel.suspectsDossier.map((suspect, idx) => (
                <div
                  key={idx}
                  className={`border rounded-2xl p-5 space-y-3 ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/70 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {suspect.nameAr}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {suspect.roleAr} • {suspect.age} {language === 'ar' ? 'سنة' : 'y/o'}
                      </p>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-500 font-bold border border-rose-500/30">
                      {suspect.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 block">
                      {language === 'ar' ? 'الدافع النفسي والسلوكي:' : 'Psychological Profile:'}
                    </span>
                    <p className={isLight ? 'text-slate-700' : 'text-slate-200'}>{suspect.psychologicalMotiveAr}</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 block">
                      {language === 'ar' ? 'الدور في الأحداث:' : 'Role & Alibi:'}
                    </span>
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>{suspect.alibiAr}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {suspect.behavioralTraitsAr?.map((trait, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] px-2 py-0.5 rounded-md border ${
                          isLight
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-slate-950 text-slate-300 border-slate-800'
                        }`}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. Comments Tab */}
          {activeTab === 'comments' && (
            <div
              className={`border rounded-2xl p-6 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800/80'
              }`}
            >
              <NovelCommentsSection novelId={novel.id} novelTitle={displayTitle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
