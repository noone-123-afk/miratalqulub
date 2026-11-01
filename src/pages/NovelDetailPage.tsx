import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShieldAlert,
} from 'lucide-react';
import { Novel, NOVELS_CATALOG } from '../data/novelsData';
import { getAllNovels } from '../services/novelsService';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { NovelCommentsSection } from '../components/NovelCommentsSection';

interface Props {
  novelId: string;
  onBackToDirectory: () => void;
  onReadChapter: (novelId: string, chapterIndex: number) => void;
}

type TabType = 'chapters' | 'evidence' | 'suspects' | 'comments';

export const NovelDetailPage: React.FC<Props> = ({
  novelId,
  onBackToDirectory,
  onReadChapter,
}) => {
  const { language, isRTL } = useLanguage();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('chapters');
  const [copiedShare, setCopiedShare] = useState(false);
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
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-400">{language === 'ar' ? 'جارٍ فتح ملف القضية...' : 'Opening case files...'}</p>
      </div>
    );
  }

  if (!novel) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 space-y-4">
        <BookOpen className="w-12 h-12 text-slate-600" />
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-rose-500/30 selection:text-rose-200">
      <PageSEO
        title={
          language === 'ar'
            ? `${novel.titleAr} - ملف القضية والرواية الكاملة | مرآة القلوب`
            : `${novel.titleAr} - Novel & Case Dossier | Mirror of Hearts`
        }
        description={
          language === 'ar'
            ? `${novel.synopsisAr.slice(0, 150)}... اقرأ فصول الرواية وتعرف على الأدلة الجنائية والمشتبه بهم.`
            : `Read forensic detective novel ${novel.titleAr}. Full chapters, clues, and suspect investigation.`
        }
        canonicalPath={`/#/novels/${novel.id}`}
        language={language}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Breadcrumb & Share */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToDirectory();
            }}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors group px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-rose-500/30"
          >
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            <span>{language === 'ar' ? 'العودة لمكتبة الروايات' : 'Back to Novels Directory'}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-rose-400" />
                <span>{language === 'ar' ? 'مشاركة الرواية' : 'Share Novel'}</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Case Dossier Card */}
        <div className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Novel Cover */}
            <div
              className="w-full h-64 md:h-72 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shadow-inner"
              dangerouslySetInnerHTML={{ __html: novel.coverIllustrationSvg }}
            />

            {/* Novel Info & Stats */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {novel.genreLabelAr}
                </span>
                <span className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{novel.rating.toFixed(1)}</span>
                </span>
                <span className="flex items-center gap-1 text-slate-300 text-xs bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>{novel.readsCount.toLocaleString()} {language === 'ar' ? 'قراءة' : 'reads'}</span>
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {novel.titleAr}
                </h1>
                <p className="text-sm sm:text-base text-rose-300/90 font-medium mt-1">{novel.subtitleAr}</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{novel.synopsisAr}</p>

              {/* Meta details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                  <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'المحقق المسؤول:' : 'Investigator:'}</span>
                  <span className="text-slate-200 font-semibold">{novel.authorPersonaAr}</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                  <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'زمن القراءة:' : 'Read Time:'}</span>
                  <span className="text-slate-200 font-semibold">{novel.estimatedReadingTime}</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'إجمالي الكلمات:' : 'Total Words:'}</span>
                  <span className="text-slate-200 font-semibold">{novel.totalWords.toLocaleString()}</span>
                </div>
              </div>

              {/* Read Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    soundManager.playTap();
                    onReadChapter(novel.id, 0);
                  }}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-rose-900/40 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{language === 'ar' ? 'ابدأ من الفصل الأول' : 'Start Chapter 1'}</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                {bookmarkChapterIndex !== null && bookmarkChapterIndex < novel.chapters.length && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onReadChapter(novel.id, bookmarkChapterIndex);
                    }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-sm font-semibold transition-all border border-slate-700/80 flex items-center gap-2"
                  >
                    <Bookmark className="w-4 h-4 text-amber-400" />
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
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('chapters');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'chapters'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'ar' ? 'فصول الرواية' : 'Chapters'}</span>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">{novel.chapters.length}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('evidence');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'evidence'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>{language === 'ar' ? 'لوحة الأدلة والتقارير' : 'Evidence Board'}</span>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">{allClues.length}</span>
          </button>

          {novel.suspectsDossier && novel.suspectsDossier.length > 0 && (
            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('suspects');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'suspects'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{language === 'ar' ? 'ملف المشتبه بهم' : 'Suspects Dossier'}</span>
              <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">{novel.suspectsDossier.length}</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('comments');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'comments'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === 'ar' ? 'آراء ومناقشات القراء' : 'Reader Discussions'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* 1. Chapters Tab */}
          {activeTab === 'chapters' && (
            <div className="space-y-3">
              {novel.chapters.map((chapter, idx) => (
                <div
                  key={chapter.chapterNumber}
                  className="bg-slate-900/60 hover:bg-slate-900 rounded-2xl border border-slate-800/80 p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-400">
                        {language === 'ar' ? `الفصل ${chapter.chapterNumber}` : `Chapter ${chapter.chapterNumber}`}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{chapter.estimatedMinutes} {language === 'ar' ? 'دقيقة' : 'mins'}</span>
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-400">
                        {chapter.wordsCount.toLocaleString()} {language === 'ar' ? 'كلمة' : 'words'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                      {chapter.titleAr}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{chapter.synopsisAr}</p>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onReadChapter(novel.id, idx);
                    }}
                    className="self-end sm:self-center px-4 py-2 bg-slate-800 group-hover:bg-rose-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>{language === 'ar' ? 'قراءة الفصل' : 'Read Chapter'}</span>
                    {isRTL ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 2. Evidence Tab */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'لوحة الأدلة الجنائية تحتوي على العينات المحرزة والتقارير السمية والبصمات الرقمية المستخلصة من مسرح الأحداث:'
                  : 'The forensic evidence board showcases recovered artifacts, toxicology results, and digital forensics from the crime scene:'}
              </div>

              {allClues.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  {language === 'ar' ? 'لا توجد أدلة محرزة مسجلة في هذا الملف.' : 'No recorded evidence entries in this dossier.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allClues.map((clue) => (
                    <div
                      key={clue.id}
                      className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-300 uppercase">{clue.type}</span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                          {clue.significanceLevel}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">{clue.titleAr}</h4>
                      <p className="text-xs text-slate-300">{clue.descriptionAr}</p>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60 text-xs text-emerald-300/90 font-mono">
                        <span className="text-slate-400 block text-[10px] mb-1 font-sans">
                          {language === 'ar' ? 'التقرير المخبري الجنائي:' : 'Forensic Lab Report:'}
                        </span>
                        {clue.forensicLabReportAr}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Suspects Tab */}
          {activeTab === 'suspects' && novel.suspectsDossier && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {novel.suspectsDossier.map((suspect, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{suspect.nameAr}</h4>
                      <p className="text-xs text-slate-400">
                        {suspect.roleAr} • {suspect.age} {language === 'ar' ? 'سنة' : 'y/o'}
                      </p>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-slate-700">
                      {suspect.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 block">{language === 'ar' ? 'الدافع النفسي المرصود:' : 'Psychological Motive:'}</span>
                    <p className="text-slate-200">{suspect.psychologicalMotiveAr}</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 block">{language === 'ar' ? 'حجة الغياب (Alibi):' : 'Alibi:'}</span>
                    <p className="text-slate-300">{suspect.alibiAr}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {suspect.behavioralTraitsAr?.map((trait, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Comments Tab */}
          {activeTab === 'comments' && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <NovelCommentsSection novelId={novel.id} novelTitle={novel.titleAr} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
