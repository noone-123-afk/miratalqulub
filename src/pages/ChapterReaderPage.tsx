import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Bookmark,
  Volume2,
  VolumeX,
  Check,
  FileText,
  Clock,
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
import { FormattedContinuousManuscript } from '../components/ReaderToolbar';

interface Props {
  novelId: string;
  chapterIndex: number;
  onBackToNovel: () => void;
  onNavigateChapter: (chapterIndex: number) => void;
}

type ReaderTheme = 'light' | 'noir' | 'cyber' | 'amber';

export const ChapterReaderPage: React.FC<Props> = ({
  novelId,
  chapterIndex,
  onBackToNovel,
  onNavigateChapter,
}) => {
  const { language, setLanguage, isRTL } = useLanguage();
  const { appTheme, toggleAppTheme } = useAppTheme();

  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<number>(19);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(appTheme === 'light' ? 'light' : 'noir');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState(false);
  const [isFullContinuousMode, setIsFullContinuousMode] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setReaderTheme(appTheme === 'light' ? 'light' : 'noir');
  }, [appTheme]);

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
      const savedBookmark = localStorage.getItem(`mirat_novel_bookmark_${novelId}`);
      if (savedBookmark !== null && parseInt(savedBookmark, 10) === chapterIndex) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    } catch {
      // Ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
      stopAmbience();
    };
  }, [novelId, chapterIndex]);

  const toggleAmbience = () => {
    soundManager.playTap();
    if (isAmbiencePlaying) {
      stopAmbience();
      setIsAmbiencePlaying(false);
    } else {
      startAmbience();
      setIsAmbiencePlaying(true);
    }
  };

  const startAmbience = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
    } catch {
      // Ignore
    }
  };

  const stopAmbience = () => {
    try {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
      }
      setTimeout(() => {
        try {
          oscRef.current?.stop();
          oscRef.current?.disconnect();
          gainRef.current?.disconnect();
          audioCtxRef.current?.close();
        } catch {
          // Ignore
        }
      }, 550);
    } catch {
      // Ignore
    }
  };

  const handleToggleBookmark = () => {
    soundManager.playTap();
    try {
      if (isBookmarked) {
        localStorage.removeItem(`mirat_novel_bookmark_${novelId}`);
        setIsBookmarked(false);
      } else {
        localStorage.setItem(`mirat_novel_bookmark_${novelId}`, chapterIndex.toString());
        setIsBookmarked(true);
      }
    } catch {
      // Ignore
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-400">
          {language === 'ar' ? 'جارٍ تحضير الفصل...' : 'Preparing chapter...'}
        </p>
      </div>
    );
  }

  if (!novel || !novel.chapters || !novel.chapters[chapterIndex]) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 space-y-4">
        <BookOpen className="w-12 h-12 text-slate-600" />
        <h2 className="text-xl font-bold">{language === 'ar' ? 'الفصل غير متاح' : 'Chapter Unavailable'}</h2>
        <button
          onClick={onBackToNovel}
          className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold"
        >
          {language === 'ar' ? 'العودة لملف الرواية' : 'Back to Novel'}
        </button>
      </div>
    );
  }

  const currentChapter = novel.chapters[chapterIndex];
  const hasPrev = chapterIndex > 0;
  const hasNext = chapterIndex < novel.chapters.length - 1;

  const displayNovelTitle = language === 'en' && novel.titleEn ? novel.titleEn : novel.titleAr;
  const displayChapterTitle = language === 'en' && currentChapter.titleEn ? currentChapter.titleEn : currentChapter.titleAr;
  const displayContent = language === 'en' && currentChapter.contentEn ? currentChapter.contentEn : currentChapter.contentAr;
  const displayTime = language === 'en' && novel.timeSettingEn ? novel.timeSettingEn : novel.timeSettingAr;
  const displayPlace = language === 'en' && novel.placeSettingEn ? novel.placeSettingEn : novel.placeSettingAr;

  const isLightReader = readerTheme === 'light';

  const themeClasses: Record<ReaderTheme, string> = {
    light: 'bg-slate-50 text-slate-900',
    noir: 'bg-slate-950 text-slate-100',
    cyber: 'bg-[#090d16] text-[#e0e7ff]',
    amber: 'bg-[#18130e] text-[#f7e6ce]',
  };

  const themePaperClasses: Record<ReaderTheme, string> = {
    light: 'bg-white border-slate-200 text-slate-800 shadow-lg',
    noir: 'bg-slate-900/60 border-slate-800/80 text-slate-200 shadow-2xl',
    cyber: 'bg-[#0f172a]/70 border-cyan-900/40 text-slate-200 shadow-2xl',
    amber: 'bg-[#231a12]/70 border-amber-900/40 text-[#ede0d4] shadow-2xl',
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen ${themeClasses[readerTheme]} py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 selection:bg-rose-500/30`}
    >
      <PageSEO
        title={`${displayChapterTitle} - ${displayNovelTitle} | ${language === 'ar' ? 'مرآة القلوب' : 'Mirror of Hearts'}`}
        description={currentChapter.synopsisAr}
        canonicalPath={`/#/novels/${novel.id}/chapter/${currentChapter.chapterNumber}`}
        language={language}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Sticky Reader Control Bar */}
        <header
          className={`sticky top-2 z-30 backdrop-blur-md border rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 ${
            isLightReader ? 'bg-white/95 border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playTap();
                onBackToNovel();
              }}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isLightReader
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title={language === 'ar' ? 'العودة لملف الرواية' : 'Back to Novel'}
            >
              {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            <div>
              <p className="text-[11px] text-rose-500 font-bold">{displayNovelTitle}</p>
              <h2
                className={`text-xs sm:text-sm font-bold truncate max-w-[180px] sm:max-w-xs ${
                  isLightReader ? 'text-slate-900' : 'text-white'
                }`}
              >
                {displayChapterTitle}
              </h2>
            </div>
          </div>

          {/* Reader Preferences */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Full Continuous Unsegmented Story Toggle */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setIsFullContinuousMode((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                isFullContinuousMode
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : isLightReader
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100'
                  : 'bg-indigo-950/70 border-indigo-500/40 text-cyan-200 hover:bg-indigo-900/80'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>
                {isFullContinuousMode
                  ? language === 'ar'
                    ? 'العودة لقراءة الفصول'
                    : 'Chapter View'
                  : language === 'ar'
                  ? '📜 قراءة كاملة دون تجزئة'
                  : '📜 Full Unsegmented'}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => {
                soundManager.playTap();
                setLanguage(language === 'ar' ? 'en' : 'ar');
              }}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                isLightReader
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Ambient Sound */}
            <button
              onClick={toggleAmbience}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isAmbiencePlaying
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  : isLightReader
                  ? 'bg-slate-100 border-slate-200 text-slate-600'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title={language === 'ar' ? 'المؤثرات الصوتية والتركيز' : 'Ambient Focus Drone'}
            >
              {isAmbiencePlaying ? <Volume2 className="w-4 h-4 text-rose-500" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Font Size controls */}
            <div
              className={`flex items-center rounded-xl border p-0.5 ${
                isLightReader ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/80 border-slate-700/60'
              }`}
            >
              <button
                onClick={() => {
                  soundManager.playTap();
                  setFontSize((prev) => Math.max(14, prev - 1));
                }}
                className="px-2 py-1 text-xs font-bold cursor-pointer"
              >
                A-
              </button>
              <span className="text-[11px] px-1 text-slate-400 font-mono">{fontSize}</span>
              <button
                onClick={() => {
                  soundManager.playTap();
                  setFontSize((prev) => Math.min(28, prev + 1));
                }}
                className="px-2 py-1 text-xs font-bold cursor-pointer"
              >
                A+
              </button>
            </div>

            {/* 4 Reader Themes (Light, Noir, Cyber, Sepia) */}
            <div
              className={`flex items-center gap-1.5 p-1 rounded-xl border ${
                isLightReader ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/80 border-slate-700/60'
              }`}
            >
              <button
                onClick={() => {
                  setReaderTheme('light');
                  if (appTheme !== 'light') toggleAppTheme();
                }}
                className={`p-1 rounded-lg flex items-center gap-1 text-[11px] font-bold cursor-pointer ${
                  readerTheme === 'light' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-400'
                }`}
                title={language === 'ar' ? 'الوضع النهاري الفاتح' : 'Light Mode'}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setReaderTheme('noir');
                  if (appTheme !== 'dark') toggleAppTheme();
                }}
                className={`p-1 rounded-lg flex items-center gap-1 text-[11px] font-bold cursor-pointer ${
                  readerTheme === 'noir' ? 'bg-slate-950 text-rose-400 shadow-sm' : 'text-slate-400'
                }`}
                title={language === 'ar' ? 'الوضع الليلي الداكن' : 'Dark Mode'}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme('amber')}
                className={`w-5 h-5 rounded-full bg-[#231a12] border cursor-pointer ${
                  readerTheme === 'amber' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-slate-600'
                }`}
                title={language === 'ar' ? 'وضع الورق الدافئ' : 'Warm Sepia'}
              />
            </div>

            {/* Bookmark button */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                  : isLightReader
                  ? 'bg-slate-100 border-slate-200 text-slate-600'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title={language === 'ar' ? 'حفظ إشارة مرجعية' : 'Save Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </header>

        {/* Time & Place Context Banner */}
        {(displayTime || displayPlace) && (
          <div
            className={`rounded-2xl border p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs ${
              isLightReader
                ? 'bg-white border-slate-200 text-slate-700 shadow-sm'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
            }`}
          >
            {displayTime && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong className="text-amber-500">{language === 'ar' ? 'الزمان: ' : 'Time: '}</strong>
                  {displayTime}
                </span>
              </div>
            )}
            {displayPlace && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  <strong className="text-emerald-500">{language === 'ar' ? 'المكان: ' : 'Place: '}</strong>
                  {displayPlace}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Scene Illustration SVG */}
        {currentChapter.sceneIllustrationSvg && (
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 p-3 shadow-md max-w-2xl mx-auto">
            <div
              className="w-full h-48 sm:h-60 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: currentChapter.sceneIllustrationSvg }}
            />
            {currentChapter.illustrationCaptionAr && (
              <p className="text-center text-xs text-slate-300 mt-2 font-serif italic">
                {currentChapter.illustrationCaptionAr}
              </p>
            )}
          </div>
        )}

        {/* Chapter Title & Metrics */}
        <div className="text-center space-y-2 py-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
            {language === 'ar' ? `الفصل ${currentChapter.chapterNumber}` : `Chapter ${currentChapter.chapterNumber}`}
          </span>
          <h1
            className={`text-2xl sm:text-4xl font-black tracking-tight mt-2 ${
              isLightReader ? 'text-slate-900' : 'text-white'
            }`}
          >
            {displayChapterTitle}
          </h1>
          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {currentChapter.estimatedMinutes} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}
              </span>
            </span>
            <span>•</span>
            <span>
              {currentChapter.wordsCount.toLocaleString()} {language === 'ar' ? 'كلمة' : 'words'}
            </span>
          </div>
        </div>

        {/* Main Narrative Content */}
        {isFullContinuousMode ? (
          <article
            className={`rounded-3xl border p-6 sm:p-12 leading-relaxed ${themePaperClasses[readerTheme]}`}
          >
            <div className="mb-6 pb-4 border-b border-rose-500/20 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 dark:text-cyan-300 text-xs font-extrabold">
                <ScrollText className="w-3.5 h-3.5" />
                <span>
                  {language === 'ar'
                    ? 'وضع القراءة الكاملة المتواصلة للقصة / الرواية (دون تجزئة)'
                    : 'Full Continuous Unsegmented Story Mode'}
                </span>
              </span>
            </div>
            <FormattedContinuousManuscript
              text={getFullNovelContinuousText(novel, language)}
              fontSize={fontSize}
              isLight={isLightReader}
            />
          </article>
        ) : (
          <article
            className={`rounded-3xl border p-6 sm:p-12 leading-relaxed font-serif ${themePaperClasses[readerTheme]}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.95 }}
          >
            {displayContent.split('\n\n').map((block, pIdx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;
              if (trimmed === '***' || trimmed === '---') {
                return (
                  <div key={pIdx} className="my-8 flex items-center justify-center gap-3 opacity-50">
                    <span className="w-12 h-px bg-current" />
                    <span>✦ ✦ ✦</span>
                    <span className="w-12 h-px bg-current" />
                  </div>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h2
                    key={pIdx}
                    className="text-xl sm:text-2xl font-black text-rose-500 mt-8 mb-4 pb-2 border-b border-rose-500/20"
                  >
                    {trimmed.replace(/^##\s+/, '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-lg sm:text-xl font-bold text-amber-500 mt-6 mb-3">
                    {trimmed.replace(/^###\s+/, '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('>')) {
                return (
                  <blockquote
                    key={pIdx}
                    className={`my-6 p-5 rounded-2xl border-r-4 rtl:border-r-4 ltr:border-l-4 ltr:border-r-0 border-rose-500 italic ${
                      isLightReader ? 'bg-rose-50/70 text-slate-800' : 'bg-rose-950/20 text-rose-100'
                    }`}
                  >
                    {trimmed.replace(/^>\s*/gm, '')}
                  </blockquote>
                );
              }
              return (
                <p key={pIdx} className="mb-6 whitespace-pre-line">
                  {trimmed}
                </p>
              );
            })}
          </article>
        )}

        {/* Detective Notes Callout (if present) */}
        {currentChapter.detectiveNotesAr && currentChapter.detectiveNotesAr.length > 0 && (
          <div
            className={`border border-amber-500/30 rounded-2xl p-5 space-y-2 ${
              isLightReader ? 'bg-amber-50 text-slate-800' : 'bg-slate-900/80 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>{language === 'ar' ? 'ملاحظات التحقيق:' : 'Investigative Observations:'}</span>
            </div>
            <ul className="space-y-1 text-xs list-disc list-inside">
              {currentChapter.detectiveNotesAr.map((note, nIdx) => (
                <li key={nIdx}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Chapter Navigation Footer */}
        <div
          className={`flex items-center justify-between border-t pt-6 ${
            isLightReader ? 'border-slate-200' : 'border-slate-800/80'
          }`}
        >
          {hasPrev ? (
            <button
              onClick={() => {
                soundManager.playTap();
                onNavigateChapter(chapterIndex - 1);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                isLightReader
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
              }`}
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{language === 'ar' ? 'الفصل السابق' : 'Previous Chapter'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              onBackToNovel();
            }}
            className="text-xs text-rose-500 font-bold hover:underline cursor-pointer"
          >
            {language === 'ar' ? 'فهرس الفصول وتفاصيل الرواية' : 'Table of Contents'}
          </button>

          {hasNext ? (
            <button
              onClick={() => {
                soundManager.playTap();
                onNavigateChapter(chapterIndex + 1);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-all shadow-md cursor-pointer"
            >
              <span>{language === 'ar' ? 'الفصل التالي' : 'Next Chapter'}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          ) : (
            <button
              onClick={() => {
                soundManager.playTap();
                onBackToNovel();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'ar' ? 'اكتملت الرواية — العودة للملف' : 'Completed Novel'}</span>
            </button>
          )}
        </div>

        {/* Interactive Reader Comments Section */}
        <div
          className={`border rounded-3xl p-6 mt-8 ${
            isLightReader ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800/80'
          }`}
        >
          <NovelCommentsSection novelId={novel.id} novelTitle={displayNovelTitle} />
        </div>
      </div>
    </div>
  );
};
