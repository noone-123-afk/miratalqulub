import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sun,
  Moon,
  Check,
  FileText,
  GraduationCap,
  Clock,
  Calendar,
  BookMarked,
  Award,
  ListChecks,
  RotateCcw,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import {
  AcademicPaper,
  getFullContinuousAcademicText,
} from '../data/academicPapersData';
import {
  Article,
  getFullContinuousNarrativeText,
} from '../data/articlesData';
import {
  FormattedContinuousManuscript,
  ContinuousViewMode,
} from './ReaderToolbar';
import { ArticleBottomSocialShare } from './FullScreenResearchStudyModal';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';

export interface ResearchArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** The full continuous research study or article text content passed as a prop */
  content?: string;
  /** Optional structured AcademicPaper object for metadata, sections, and APA references */
  paper?: AcademicPaper | null;
  /** Optional structured Clinical Narrative Article object */
  article?: Article | null;
  /** Optional custom title override */
  title?: string;
  /** Optional custom abstract/summary override */
  abstract?: string;
  initialViewMode?: ContinuousViewMode;
}

export const ResearchArticleModal: React.FC<ResearchArticleModalProps> = ({
  isOpen,
  onClose,
  content,
  paper,
  article,
  title,
  abstract,
  initialViewMode = 'continuous_only',
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { appTheme, toggleAppTheme } = useAppTheme();
  const isLight = appTheme === 'light';
  const isAr = language === 'ar';

  const [fontSize, setFontSize] = useState<number>(18);
  const [viewMode, setViewMode] = useState<ContinuousViewMode>(initialViewMode);
  const [copiedFullText, setCopiedFullText] = useState(false);
  const [copiedApa, setCopiedApa] = useState(false);

  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode, paper?.id, article?.id, content]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || (!paper && !article && !content)) return null;

  const displayTitle =
    title ||
    (paper
      ? isAr
        ? paper.titleAr
        : paper.titleEn
      : article
      ? isAr
        ? article.title
        : article.titleEn
      : isAr
      ? 'دراسة بحثية / مقال علمي'
      : 'Research Study / Clinical Article');
  const secondaryTitle = paper
    ? isAr
      ? paper.titleEn
      : paper.titleAr
    : article
    ? isAr
      ? article.titleEn
      : article.title
    : '';
  const displayAbstract =
    abstract ||
    (paper
      ? isAr
        ? paper.abstractAr
        : paper.abstractEn
      : article
      ? isAr
        ? article.summary
        : article.summaryEn
      : content?.slice(0, 320) || '');
  const fullStudyContent =
    content ||
    (paper
      ? getFullContinuousAcademicText(paper, language)
      : article
      ? getFullContinuousNarrativeText(article, language)
      : '');
  const fontScalePercent = Math.round((fontSize / 16) * 100);

  const handleCopyFullManuscript = () => {
    soundManager.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullStudyContent);
      setCopiedFullText(true);
      setTimeout(() => setCopiedFullText(false), 2600);
    }
  };

  const handleCopyApaCitation = () => {
    if (!paper) return;
    soundManager.playTap();
    const year = paper.publishDate.slice(0, 4) || '2025';
    const citation = isAr
      ? `وحدة الأبحاث والدراسات النفسية - مرآة القلوب. (${year}). ${paper.titleAr}. موسوعة مرآة القلوب للأبحاث النفسية المحكّمة. https://miratalqulub.com/#/articles`
      : `Mirror of Hearts Psychological Research Unit. (${year}). ${paper.titleEn}. Mirror of Hearts Peer-Reviewed Encyclopedia. https://miratalqulub.com/#/articles`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(citation);
      setCopiedApa(true);
      setTimeout(() => setCopiedApa(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-black/85 backdrop-blur-md"
        dir={isRTL ? 'rtl' : 'ltr'}
        role="dialog"
        aria-modal="true"
        aria-label={displayTitle}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22 }}
          className={`w-full h-full flex flex-col overflow-hidden transition-colors duration-300 ${
            isLight
              ? 'bg-slate-50 text-slate-900'
              : 'bg-slate-950 text-slate-100'
          }`}
        >
          {/* Sticky Academic Reader Control Bar */}
          <header
            className={`shrink-0 px-4 sm:px-8 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 shadow-md z-20 ${
              isLight
                ? 'bg-white/95 border-slate-200 text-slate-900'
                : 'bg-slate-900/95 border-cyan-500/30 text-white'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-cyan-300 text-[11px] font-extrabold">
                    {isAr
                      ? 'القارئ الأكاديمي بملء الشاشة (ResearchArticleModal)'
                      : 'Full-Screen Academic Reader'}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hidden sm:inline">
                    • {isAr ? 'قراءة متصلة دون تجزئة' : 'Continuous Unsegmented Study'}
                  </span>
                </div>
                <h2 className="text-xs sm:text-sm font-black truncate max-w-xs sm:max-w-xl font-['Alexandria'] mt-0.5">
                  {displayTitle}
                </h2>
              </div>
            </div>

            {/* Integrated Font-Size Controller, Global Dark/Light Mode Toggle, View Mode, Close */}
            <div className="flex flex-wrap items-center gap-2">
              {paper && (
                <div
                  className={`inline-flex items-center p-1 rounded-xl border ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/10'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setViewMode('continuous_only');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                      viewMode === 'continuous_only'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    📜 {isAr ? 'النص الكامل دون تجزئة' : 'Full Continuous'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setViewMode('segmented_and_continuous');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                      viewMode === 'segmented_and_continuous'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    📑 {isAr ? 'الأقسام + النص الكامل' : 'Sections + Full'}
                  </button>
                </div>
              )}

              {/* Integrated Font-Size Controller */}
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${
                  isLight ? 'bg-slate-100 border-slate-300' : 'bg-black/40 border-white/15'
                }`}
                title={isAr ? 'التحكم في حجم الخط' : 'Font Size Controller'}
              >
                <span className="text-[11px] font-bold opacity-75 hidden md:inline">
                  {isAr ? 'حجم الخط:' : 'Font:'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setFontSize((prev) => Math.max(14, prev - 2));
                  }}
                  className={`px-2 py-0.5 rounded-lg text-xs font-black transition cursor-pointer ${
                    isLight ? 'hover:bg-white text-slate-800' : 'hover:bg-white/15 text-white'
                  }`}
                  aria-label={isAr ? 'تصغير حجم الخط' : 'Decrease Font Size'}
                >
                  A-
                </button>
                <input
                  type="range"
                  min={14}
                  max={28}
                  step={1}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-16 sm:w-20 accent-indigo-600 cursor-pointer hidden sm:inline-block"
                  aria-label={isAr ? 'شريط حجم الخط' : 'Font Size Slider'}
                />
                <span className="text-[11px] font-mono font-extrabold px-1 text-indigo-600 dark:text-cyan-300">
                  {fontScalePercent}%
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setFontSize((prev) => Math.min(28, prev + 2));
                  }}
                  className={`px-2 py-0.5 rounded-lg text-xs font-black transition cursor-pointer ${
                    isLight ? 'hover:bg-white text-slate-800' : 'hover:bg-white/15 text-white'
                  }`}
                  aria-label={isAr ? 'تكبير حجم الخط' : 'Increase Font Size'}
                >
                  A+
                </button>
                {fontSize !== 18 && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setFontSize(18);
                    }}
                    className="p-1 rounded-lg opacity-70 hover:opacity-100 cursor-pointer"
                    title={isAr ? 'إعادة ضبط حجم الخط' : 'Reset Font Size'}
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Dark / Light Mode Toggle Respecting Global App Theme */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  toggleAppTheme();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 transition cursor-pointer ${
                  isLight
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-indigo-950/80 hover:bg-indigo-900 text-amber-300 border-indigo-500/40'
                }`}
                title={isAr ? 'تبديل الوضع الليلي / النهاري' : 'Toggle Dark / Light Mode'}
              >
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span>
                  {isLight
                    ? isAr
                      ? 'الوضع الليلي'
                      : 'Dark Mode'
                    : isAr
                    ? 'الوضع النهاري'
                    : 'Light Mode'}
                </span>
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  toggleLanguage();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                }`}
              >
                {isAr ? 'EN 🇬🇧' : 'عربي 🇸🇦'}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                title={isAr ? 'إغلاق القارئ (Esc)' : 'Close Reader (Esc)'}
              >
                <X className="w-4 h-4" />
                <span>{isAr ? 'إغلاق' : 'Close'}</span>
              </button>
            </div>
          </header>

          {/* Full-Screen Scrollable Academic Reader Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-10">
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Academic Study Header Card */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border space-y-4 shadow-xl ${
                  isLight
                    ? 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50 border-indigo-200 text-slate-900'
                    : `bg-gradient-to-br ${paper?.coverGradient || 'from-indigo-950/60 via-slate-900 to-cyan-950/60'} border-cyan-500/35 text-white`
                }`}
              >
                {paper && (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-800 dark:text-cyan-200 text-xs font-extrabold flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      <span>{isAr ? paper.categoryLabelAr : paper.categoryLabelEn}</span>
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-800 dark:text-indigo-200 text-xs font-bold">
                      {isAr ? paper.methodologyBadgeAr : paper.methodologyBadgeEn}
                    </span>
                  </div>
                )}

                <h1 className="text-2xl sm:text-4xl font-black leading-snug font-['Alexandria']">
                  {displayTitle}
                </h1>

                {secondaryTitle && (
                  <p className="text-xs sm:text-sm font-semibold italic opacity-80">
                    {secondaryTitle}
                  </p>
                )}

                {paper && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(isAr ? paper.keywordsAr : paper.keywordsEn).map((kw, i) => (
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
                    ))}
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-black/40 border-white/10 text-cyan-100'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-extrabold flex items-center gap-1.5 text-indigo-700 dark:text-cyan-300">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>
                        {isAr
                          ? 'وحدة الأبحاث والدراسات النفسية المحكّمة — مرآة القلوب'
                          : 'Mirror of Hearts Peer-Reviewed Research Unit'}
                      </span>
                    </span>
                    {paper && (
                      <>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isAr ? paper.readTimeAr : paper.readTimeEn}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                          <span>{paper.publishDate}</span>
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          📚 {paper.apaReferences.length}{' '}
                          {isAr ? 'مرجعاً بصيغة APA 7th' : 'APA 7th References'}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {paper && (
                      <button
                        type="button"
                        onClick={handleCopyApaCitation}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {copiedApa ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <BookMarked className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {copiedApa
                            ? isAr
                              ? 'تم نسخ توثيق APA!'
                              : 'APA Citation Copied!'
                            : isAr
                            ? 'نسخ توثيق APA'
                            : 'Copy APA Citation'}
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleCopyFullManuscript}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedFullText ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedFullText
                          ? isAr
                            ? 'تم نسخ النص الكامل!'
                            : 'Full Text Copied!'
                          : isAr
                          ? 'نسخ البحث كاملاً'
                          : 'Copy Full Study'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional Segmented Sections View */}
              {paper && viewMode === 'segmented_and_continuous' && (
                <div
                  className="space-y-6 transition-all"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  <div
                    className={`p-6 rounded-3xl border space-y-2.5 ${
                      isLight
                        ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                        : 'bg-amber-500/10 border-amber-500/30 text-gray-200'
                    }`}
                  >
                    <h2 className="text-lg font-black text-amber-700 dark:text-amber-300 font-['Alexandria'] flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{isAr ? 'الملخص (Abstract)' : 'Abstract'}</span>
                    </h2>
                    <p className="leading-loose">{displayAbstract}</p>
                  </div>

                  <div
                    className={`p-6 rounded-3xl border space-y-3 ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-gray-200'
                    }`}
                  >
                    <h2 className="text-lg font-black text-indigo-600 dark:text-cyan-300 font-['Alexandria']">
                      {isAr ? '1. المقدمة (Introduction)' : '1. Introduction'}
                    </h2>
                    {(isAr ? paper.introductionAr : paper.introductionEn).map((p, idx) => (
                      <p key={idx} className="leading-loose">
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
                      {isAr
                        ? '2. الإطار النظري والدراسات السابقة (Theoretical Framework)'
                        : '2. Theoretical Framework'}
                    </h2>
                    <div className="space-y-4">
                      {paper.theoreticalFramework.map((sec, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border space-y-2 ${
                            isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                          }`}
                        >
                          <h3 className="text-base font-extrabold text-purple-700 dark:text-purple-300">
                            {sec.sectionNumber} {isAr ? sec.titleAr : sec.titleEn}
                          </h3>
                          <p className="leading-relaxed">
                            {isAr ? sec.contentAr : sec.contentEn}
                          </p>
                          {sec.subPointsAr && (
                            <ul className="space-y-1.5 pt-2">
                              {(isAr ? sec.subPointsAr : sec.subPointsEn || []).map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-cyan-500 font-bold">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
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
                      {isAr ? '3. منهجية البحث (Methodology)' : '3. Research Methodology'}
                    </h2>
                    <p className="font-semibold">
                      {isAr ? paper.methodology.approachAr : paper.methodology.approachEn}
                    </p>
                    <ul className="space-y-2">
                      {(isAr ? paper.methodology.pillarsAr : paper.methodology.pillarsEn).map(
                        (pil, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{pil}</span>
                          </li>
                        )
                      )}
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
                      {isAr
                        ? '4. النتائج والتحليل والمناقشة (Results, Analysis & Discussion)'
                        : '4. Results, Analysis and Discussion'}
                    </h2>
                    <div className="space-y-4">
                      {paper.analysisAndDiscussion.map((sec, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border space-y-2 ${
                            isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                          }`}
                        >
                          <h3 className="text-base font-extrabold text-rose-700 dark:text-rose-300">
                            {sec.sectionNumber} {isAr ? sec.titleAr : sec.titleEn}
                          </h3>
                          <p className="leading-relaxed">
                            {isAr ? sec.contentAr : sec.contentEn}
                          </p>
                          {sec.subPointsAr && (
                            <ul className="space-y-2 pt-2">
                              {(isAr ? sec.subPointsAr : sec.subPointsEn || []).map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-rose-500 font-bold">▪</span>
                                  <span className="leading-relaxed">{pt}</span>
                                </li>
                              ))}
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
                      {isAr ? '5. الخاتمة (Conclusion)' : '5. Conclusion'}
                    </h2>
                    <p className="leading-loose">
                      {isAr ? paper.conclusionAr : paper.conclusionEn}
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
                      <span>{isAr ? '6. التوصيات (Recommendations)' : '6. Recommendations'}</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                      {paper.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border space-y-2 ${
                            isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                          }`}
                        >
                          <h3 className="text-sm font-extrabold text-indigo-600 dark:text-cyan-300">
                            {isAr ? rec.categoryAr : rec.categoryEn}
                          </h3>
                          <ul className="space-y-1.5">
                            {(isAr ? rec.itemsAr : rec.itemsEn).map((item, iIdx) => (
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
                </div>
              )}

              {/* Full Continuous Academic Manuscript Container */}
              <div
                className={`p-6 sm:p-10 rounded-3xl border-2 space-y-6 shadow-xl ${
                  isLight
                    ? 'bg-white border-indigo-200 text-slate-900'
                    : 'bg-slate-900/90 border-cyan-500/35 text-gray-100'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-indigo-200 dark:border-white/15">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-cyan-300 text-xs font-extrabold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {isAr
                          ? 'النص الأكاديمي الكامل المتواصل (دون تجزئة)'
                          : 'Complete Unsegmented Academic Manuscript'}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-2xl font-black font-['Alexandria'] text-indigo-800 dark:text-cyan-300">
                      {isAr
                        ? '📜 المقال البحثي الكامل المتواصل (قراءة أكاديمية متصلة دون تجزئة)'
                        : '📜 Full Continuous Research Study'}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyFullManuscript}
                    className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    {copiedFullText ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    <span>
                      {copiedFullText
                        ? isAr
                          ? 'تم نسخ النص الكامل للبحث!'
                          : 'Full Study Copied!'
                        : isAr
                        ? 'نسخ النص الكامل المتواصل'
                        : 'Copy Full Continuous Text'}
                    </span>
                  </button>
                </div>

                <div
                  className={`p-5 sm:p-8 rounded-2xl border select-text ${
                    isLight
                      ? 'bg-slate-50/70 border-slate-200 text-slate-800'
                      : 'bg-black/40 border-white/10 text-gray-200'
                  }`}
                >
                  <FormattedContinuousManuscript
                    text={fullStudyContent}
                    fontSize={fontSize}
                    isLight={isLight}
                  />
                </div>
              </div>

              {/* Bottom Social Media Share Bar */}
              <ArticleBottomSocialShare
                title={displayTitle}
                summary={displayAbstract}
                url="https://miratalqulub.com/#/articles"
                isLight={isLight}
                language={language}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
