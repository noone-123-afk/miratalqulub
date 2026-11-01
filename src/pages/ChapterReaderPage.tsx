import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Bookmark,
  Volume2,
  VolumeX,
  Type,
  Maximize2,
  Minimize2,
  Check,
  Target,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Novel, NOVELS_CATALOG } from '../data/novelsData';
import { getAllNovels } from '../services/novelsService';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';

interface Props {
  novelId: string;
  chapterIndex: number;
  onBackToNovel: () => void;
  onNavigateChapter: (chapterIndex: number) => void;
}

type ReaderTheme = 'noir' | 'cyber' | 'amber';

export const ChapterReaderPage: React.FC<Props> = ({
  novelId,
  chapterIndex,
  onBackToNovel,
  onNavigateChapter,
}) => {
  const { language, isRTL } = useLanguage();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<number>(18);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('noir');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState(false);

  // Audio Context Ref for procedural ambient sound
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

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

  // Procedural Suspense Ambience Generator (Clean Web Audio API)
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
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Low 55Hz cinematic drone
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
    } catch {
      // Audio autoplay restrictions
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
        <p className="text-sm text-slate-400">{language === 'ar' ? 'جارٍ تحضير الفصل...' : 'Preparing chapter...'}</p>
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
          {language === 'ar' ? 'العودة لملف القضية' : 'Back to Case'}
        </button>
      </div>
    );
  }

  const currentChapter = novel.chapters[chapterIndex];
  const hasPrev = chapterIndex > 0;
  const hasNext = chapterIndex < novel.chapters.length - 1;

  // Theme styles
  const themeClasses = {
    noir: 'bg-slate-950 text-slate-100',
    cyber: 'bg-[#090d16] text-[#e0e7ff]',
    amber: 'bg-[#18130e] text-[#f7e6ce]',
  };

  const themePaperClasses = {
    noir: 'bg-slate-900/60 border-slate-800/80 text-slate-200',
    cyber: 'bg-[#0f172a]/70 border-cyan-900/40 text-slate-200',
    amber: 'bg-[#231a12]/70 border-amber-900/40 text-[#ede0d4]',
  };

  return (
    <div className={`min-h-screen ${themeClasses[readerTheme]} py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 selection:bg-rose-500/30 selection:text-rose-200`}>
      <PageSEO
        title={
          language === 'ar'
            ? `${currentChapter.titleAr} - ${novel.titleAr} | مرآة القلوب`
            : `${currentChapter.titleAr} - ${novel.titleAr} | Mirror of Hearts`
        }
        description={
          language === 'ar'
            ? `قراءة ${currentChapter.titleAr} من رواية ${novel.titleAr}. ${currentChapter.synopsisAr}`
            : `Reading Chapter ${currentChapter.chapterNumber}: ${currentChapter.titleAr} of ${novel.titleAr}.`
        }
        canonicalPath={`/#/novels/${novel.id}/chapter/${currentChapter.chapterNumber}`}
        language={language}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <header className="sticky top-2 z-30 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playTap();
                onBackToNovel();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title={language === 'ar' ? 'العودة لملف القضية' : 'Back to Dossier'}
            >
              {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            <div>
              <p className="text-[11px] text-rose-400 font-semibold">{novel.titleAr}</p>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                {language === 'ar' ? `الفصل ${currentChapter.chapterNumber}: ` : `Ch ${currentChapter.chapterNumber}: `}
                {currentChapter.titleAr}
              </h2>
            </div>
          </div>

          {/* Reader Preferences (Font Size, Themes, Ambience, Bookmark) */}
          <div className="flex items-center gap-2">
            {/* Ambient Sound */}
            <button
              onClick={toggleAmbience}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
                isAmbiencePlaying
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title={language === 'ar' ? 'المؤثرات الصوتية والتركيز' : 'Procedural Suspense Drone'}
            >
              {isAmbiencePlaying ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline text-[11px]">
                {isAmbiencePlaying ? (language === 'ar' ? 'مؤثر مفعل' : 'Drone On') : (language === 'ar' ? 'هدوء' : 'Mute')}
              </span>
            </button>

            {/* Font Size controls */}
            <div className="flex items-center bg-slate-800/80 rounded-xl border border-slate-700/60 p-0.5">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setFontSize((prev) => Math.max(14, prev - 1));
                }}
                className="px-2 py-1 text-xs text-slate-300 hover:text-white"
                title={language === 'ar' ? 'تصغير الخط' : 'Smaller font'}
              >
                A-
              </button>
              <span className="text-[11px] px-1 text-slate-400 font-mono">{fontSize}</span>
              <button
                onClick={() => {
                  soundManager.playTap();
                  setFontSize((prev) => Math.min(26, prev + 1));
                }}
                className="px-2 py-1 text-xs text-slate-300 hover:text-white"
                title={language === 'ar' ? 'تكبير الخط' : 'Larger font'}
              >
                A+
              </button>
            </div>

            {/* Themes */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setReaderTheme('noir')}
                className={`w-5 h-5 rounded-full bg-slate-950 border ${
                  readerTheme === 'noir' ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700'
                }`}
                title="Noir Dark"
              />
              <button
                onClick={() => setReaderTheme('cyber')}
                className={`w-5 h-5 rounded-full bg-[#090d16] border ${
                  readerTheme === 'cyber' ? 'border-cyan-400 ring-1 ring-cyan-400' : 'border-slate-700'
                }`}
                title="Cyber Midnight"
              />
              <button
                onClick={() => setReaderTheme('amber')}
                className={`w-5 h-5 rounded-full bg-[#231a12] border ${
                  readerTheme === 'amber' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-slate-700'
                }`}
                title="Warm Sepia"
              />
            </div>

            {/* Bookmark button */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title={language === 'ar' ? 'حفظ إشارة مرجعية' : 'Save Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </header>

        {/* Scene Illustration SVG (if available) */}
        {currentChapter.sceneIllustrationSvg && (
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 p-3 shadow-md max-w-2xl mx-auto">
            <div
              className="w-full h-48 sm:h-64 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: currentChapter.sceneIllustrationSvg }}
            />
            {currentChapter.illustrationCaptionAr && (
              <p className="text-center text-xs text-slate-400 mt-2 font-serif italic">
                {currentChapter.illustrationCaptionAr}
              </p>
            )}
          </div>
        )}

        {/* Chapter Title & Synopsis */}
        <div className="text-center space-y-2 py-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
            {language === 'ar' ? `الفصل رقم ${currentChapter.chapterNumber}` : `Chapter ${currentChapter.chapterNumber}`}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-2">
            {currentChapter.titleAr}
          </h1>
          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentChapter.estimatedMinutes} {language === 'ar' ? 'دقيقة قراءة' : 'min read'}</span>
            </span>
            <span>•</span>
            <span>{currentChapter.wordsCount.toLocaleString()} {language === 'ar' ? 'كلمة' : 'words'}</span>
          </div>
        </div>

        {/* Main Text Content */}
        <article
          className={`rounded-3xl border p-6 sm:p-12 shadow-2xl leading-relaxed font-serif ${themePaperClasses[readerTheme]}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
        >
          {currentChapter.contentAr.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="mb-6 text-justify">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Detective Notes Callout (if present) */}
        {currentChapter.detectiveNotesAr && currentChapter.detectiveNotesAr.length > 0 && (
          <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>{language === 'ar' ? 'ملاحظات المحقق الجنائي:' : 'Detective Observations:'}</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
              {currentChapter.detectiveNotesAr.map((note, nIdx) => (
                <li key={nIdx}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Chapter Navigation Footer */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-6">
          {hasPrev ? (
            <button
              onClick={() => {
                soundManager.playTap();
                onNavigateChapter(chapterIndex - 1);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
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
            className="text-xs text-slate-400 hover:text-rose-400 underline"
          >
            {language === 'ar' ? 'فهرس الفصول' : 'Table of Contents'}
          </button>

          {hasNext ? (
            <button
              onClick={() => {
                soundManager.playTap();
                onNavigateChapter(chapterIndex + 1);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-all shadow-md shadow-rose-950"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'ar' ? 'اكتملت الرواية' : 'Completed Novel'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
