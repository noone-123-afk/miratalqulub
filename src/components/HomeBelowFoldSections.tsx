import React, { useState, lazy, Suspense } from 'react';
import {
  Heart,
  Brain,
  Lightbulb,
  BookOpen,
  BookMarked,
  Wand2,
  ArrowRight,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Lock,
  FileText,
  Award,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/sound';
import { navigateCleanUrl } from '../utils/navigation';
import { TestScoringTrustBanner } from './TestScoringTrustBanner';
import {
  HOME_HIGHLIGHTED_ARTICLES,
  HOME_NOVEL_CATEGORIES,
} from '../data/homeHighlightsData';

const LazySuggestedContentMixSection = lazy(() => import('./SuggestedContentMixSection'));

export interface HomeBelowFoldSectionsProps {
  isAr: boolean;
  isRTL: boolean;
  isLight: boolean;
  onNavigatePage?: (page: string) => void;
  onOpenIntelligenceTests?: () => void;
  onOpenBlindDate?: () => void;
  openCompatibilitySection: () => void;
}

export const HomeBelowFoldSections: React.FC<HomeBelowFoldSectionsProps> = ({
  isAr,
  isRTL,
  isLight,
  onNavigatePage,
  onOpenIntelligenceTests,
  onOpenBlindDate,
  openCompatibilitySection,
}) => {
  const { user } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handlePermanentDelete = async () => {
    soundManager.playTap();
    setIsDeleting(true);
    try {
      const { purgeAllUserDataPermanently } = await import('../services/userHistoryService');
      await purgeAllUserDataPermanently(user);
      setIsDeleting(false);
      setConfirmDelete(false);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 4000);
    } catch {
      setIsDeleting(false);
    }
  };

  // عرض أحدث مقال واحد فقط داخل قسم "المقالات المعرفية" في الصفحة الرئيسية
  const latestArticle =
    [...HOME_HIGHLIGHTED_ARTICLES.filter(Boolean)].sort((a, b) =>
      (b.publishDate || '').localeCompare(a.publishDate || '')
    )[0] || null;

  const novelCategories = HOME_NOVEL_CATEGORIES;

  // بطاقات الاختبارات والأدوات الـ 4 ضمن أقسام الموقع
  const interactiveToolCards = [
    {
      id: 'personality',
      href: '/personality-tests',
      titleAr: 'تحليل الشخصية',
      titleEn: 'Personality Analysis',
      descAr: 'اكتشف سماتك الشخصية وأنماط تفكيرك وسلوكك.',
      descEn: 'Discover your personality traits, thinking patterns, and behaviors.',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      action: () => {
        soundManager.playTap();
        if (onNavigatePage) {
          onNavigatePage('personality-tests');
        } else {
          navigateCleanUrl('/personality-tests');
        }
      },
    },
    {
      id: 'compatibility',
      href: '/compatibility',
      titleAr: 'كاشف شريك الحياة',
      titleEn: 'Partner Compatibility Detector',
      descAr: 'استكشف جوانب التوافق النفسي والعاطفي والفكري.',
      descEn: 'Explore psychological, emotional, and intellectual compatibility.',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      action: openCompatibilitySection,
    },
    {
      id: 'intelligence',
      href: '/iq-tests',
      titleAr: 'اختبارات الذكاء',
      titleEn: 'Intelligence Tests',
      descAr: 'قياس القدرات المعرفية والمهارات العقلية.',
      descEn: 'Assess cognitive capacities and intellectual abilities.',
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-600',
      action: () => {
        soundManager.playTap();
        if (onNavigatePage) {
          onNavigatePage('iq-tests');
        } else if (onOpenIntelligenceTests) {
          onOpenIntelligenceTests();
        } else {
          navigateCleanUrl('/iq-tests');
        }
      },
    },
    {
      id: 'interactive_tools',
      href: '/tools',
      titleAr: 'الأدوات التفاعلية',
      titleEn: 'Interactive Tools',
      descAr: 'أدوات رقمية وخدمات ذكية تساعدك على الاستفادة من المنصة.',
      descEn: 'Digital utilities and smart services helping you maximize the platform.',
      icon: Wand2,
      color: 'from-violet-500 to-fuchsia-600',
      action: () => {
        soundManager.playTap();
        if (onNavigatePage) {
          onNavigatePage('tools');
        } else if (onOpenBlindDate) {
          onOpenBlindDate();
        } else {
          navigateCleanUrl('/tools');
        }
      },
    },
  ];

  return (
    <>
      {/* ========================================================
          ثانياً: أقسام الموقع (بطاقات الأقسام الـ 6 المنظمة)
      ======================================================== */}
      <section
        id="site-sections-directory"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
      >
        <div className="text-center mb-7 space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold border ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                : 'bg-indigo-500/15 border-indigo-400/30 text-indigo-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isAr ? 'دليل أقسام المنصة' : 'Platform Sections Directory'}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black font-['Alexandria'] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr ? 'أقسام الموقع' : 'Platform Sections'}
          </h2>
          <p
            className={`text-sm sm:text-base max-w-xl mx-auto ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'اختر القسم الذي يناسب اهتمامك للدخول مباشرة إلى أدواته ومحتواه المتخصص'
              : 'Choose the section that matches your interest to enter its specialized tools and content'}
          </p>
        </div>

        <div className="space-y-7">
          {/* 1. قسم المقالات المعرفية */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-6 ${
              isLight
                ? 'bg-white border-emerald-200/90 text-slate-900'
                : 'bg-slate-900/75 border-emerald-500/25 text-white'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-['Alexandria']">
                    {isAr ? 'المقالات المعرفية' : 'Knowledge Articles'}
                  </h3>
                  <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isAr
                      ? 'محتوى متخصص في الشخصية والعلاقات والتطوير الذاتي.'
                      : 'Specialized content in personality, relationships, and self-growth.'}
                  </p>
                </div>
              </div>

              <a
                href="/articles"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (onNavigatePage) {
                    onNavigatePage('articles');
                  } else {
                    navigateCleanUrl('/articles');
                  }
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>{isAr ? 'دخول القسم' : 'Enter Section'}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </div>

            {latestArticle && (
              <article key={latestArticle.id}>
                <a
                  href={`/articles/${encodeURIComponent(latestArticle.id)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    soundManager.playTap();
                    try {
                      sessionStorage.setItem('mirat_open_article_id', latestArticle.id);
                    } catch {
                      // ignore
                    }
                    if (onNavigatePage) {
                      onNavigatePage(`articles/${encodeURIComponent(latestArticle.id)}`);
                    } else {
                      navigateCleanUrl(`/articles/${encodeURIComponent(latestArticle.id)}`);
                    }
                  }}
                  className={`group rounded-2xl border overflow-hidden transition-all duration-200 cursor-pointer flex flex-col md:flex-row justify-between hover:-translate-y-0.5 shadow-xs hover:shadow-lg ${
                    isLight
                      ? 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-emerald-400'
                      : 'bg-slate-950/60 hover:bg-slate-900 border-white/10 hover:border-emerald-400/50'
                  }`}
                >
                  <div className="relative md:w-72 shrink-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-5 flex flex-col justify-between gap-4 overflow-hidden">
                    <div className="flex items-center justify-between gap-2 relative z-10">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
                        {isAr ? 'أحدث مقال' : 'Latest Article'}
                      </span>
                      <span className="text-3xl drop-shadow-md group-hover:scale-110 transition-transform">
                        {latestArticle.icon}
                      </span>
                    </div>
                    <div className="space-y-1.5 relative z-10">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-100 border border-white/15">
                        {isAr ? latestArticle.readTime : latestArticle.readTimeEn}
                      </span>
                      <p className="text-[11px] font-bold text-emerald-100/90 line-clamp-2">
                        {isAr ? latestArticle.scientificFramework : latestArticle.scientificFrameworkEn}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      <h4
                        className={`text-base sm:text-lg font-black font-['Alexandria'] leading-snug transition-colors ${
                          isLight
                            ? 'text-slate-900 group-hover:text-emerald-700'
                            : 'text-white group-hover:text-emerald-300'
                        }`}
                      >
                        {isAr ? latestArticle.title : latestArticle.titleEn}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                          isLight ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {isAr ? latestArticle.summary : latestArticle.summaryEn}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <div
                        className={`py-2.5 px-5 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 transition ${
                          isLight
                            ? 'bg-emerald-50 group-hover:bg-emerald-600 text-emerald-800 group-hover:text-white border border-emerald-200 group-hover:border-emerald-600'
                            : 'bg-emerald-500/15 group-hover:bg-emerald-600 text-emerald-300 group-hover:text-white border border-emerald-500/30 group-hover:border-emerald-500'
                        }`}
                      >
                        <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            )}
          </div>

          {/* 2. قسم الروايات والقصص */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-6 ${
              isLight
                ? 'bg-white border-cyan-200/90 text-slate-900'
                : 'bg-slate-900/75 border-cyan-500/25 text-white'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <BookMarked className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-['Alexandria']">
                    {isAr ? 'الروايات والقصص' : 'Novels & Stories'}
                  </h3>
                  <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isAr
                      ? 'قصص وتجارب إنسانية تحمل معاني ودروساً قيمة.'
                      : 'Human stories and experiences carrying profound meaning and insight.'}
                  </p>
                </div>
              </div>

              <a
                href="/novels"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (onNavigatePage) {
                    onNavigatePage('novels');
                  } else {
                    navigateCleanUrl('/novels');
                  }
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs sm:text-sm font-extrabold transition cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>{isAr ? 'دخول القسم' : 'Enter Section'}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {novelCategories.map((cat) => (
                <a
                  key={cat.genre}
                  href="/novels"
                  onClick={(e) => {
                    e.preventDefault();
                    soundManager.playTap();
                    try {
                      sessionStorage.setItem('mirat_open_novel_genre', cat.genre);
                    } catch {
                      // ignore
                    }
                    if (onNavigatePage) {
                      onNavigatePage('novels');
                    } else {
                      navigateCleanUrl('/novels');
                    }
                  }}
                  className={`group text-start rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 hover:-translate-y-1 shadow-xs hover:shadow-lg ${
                    isLight
                      ? 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-cyan-400'
                      : 'bg-slate-950/60 hover:bg-slate-900 border-white/10 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl border shrink-0"
                        style={{
                          borderColor: `${cat.accentColor}44`,
                          backgroundColor: `${cat.accentColor}18`,
                        }}
                      >
                        {cat.icon}
                      </span>
                      <span
                        className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border"
                        style={{
                          borderColor: `${cat.accentColor}55`,
                          backgroundColor: `${cat.accentColor}15`,
                          color: cat.accentColor,
                        }}
                      >
                        {isAr ? 'تصنيف متوفر' : 'Available Genre'}
                      </span>
                    </div>

                    <h4
                      className={`text-base font-black font-['Alexandria'] leading-snug transition-colors ${
                        isLight
                          ? 'text-slate-900 group-hover:text-cyan-700'
                          : 'text-white group-hover:text-cyan-300'
                      }`}
                    >
                      {isAr ? cat.titleAr : cat.titleEn}
                    </h4>

                    <p
                      className={`text-xs leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {isAr ? cat.descAr : cat.descEn}
                    </p>
                  </div>

                  <div
                    className={`w-full py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition ${
                      isLight
                        ? 'bg-cyan-50 group-hover:bg-cyan-600 text-cyan-800 group-hover:text-white border border-cyan-200 group-hover:border-cyan-600'
                        : 'bg-cyan-500/15 group-hover:bg-cyan-600 text-cyan-300 group-hover:text-white border border-cyan-500/30 group-hover:border-cyan-500'
                    }`}
                  >
                    <span>{isAr ? 'استعراض الصنف' : 'Browse Genre'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 3. أقسام الاختبارات والأدوات التفاعلية الـ 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {interactiveToolCards.map((card) => {
              const IconComp = card.icon;
              return (
                <a
                  key={card.id}
                  href={card.href}
                  onClick={(e) => {
                    e.preventDefault();
                    card.action();
                  }}
                  className={`group p-6 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1 shadow-sm hover:shadow-xl ${
                    isLight
                      ? 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-indigo-300'
                      : 'bg-slate-900/70 hover:bg-slate-800/80 border-white/10 hover:border-indigo-400/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md shrink-0`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3
                      className={`text-lg sm:text-xl font-black font-['Alexandria'] ${
                        isLight
                          ? 'text-slate-900 group-hover:text-indigo-600'
                          : 'text-white group-hover:text-indigo-300'
                      } transition-colors`}
                    >
                      {isAr ? card.titleAr : card.titleEn}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      {isAr ? card.descAr : card.descEn}
                    </p>
                  </div>

                  <div
                    className={`pt-3 border-t flex items-center justify-between text-xs font-extrabold ${
                      isLight
                        ? 'border-slate-200 text-indigo-700 group-hover:text-indigo-800'
                        : 'border-white/10 text-indigo-300 group-hover:text-indigo-200'
                    }`}
                  >
                    <span>{isAr ? 'دخول القسم' : 'Enter Section'}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                        isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                      }`}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Visitor Trust & Scoring Transparency Callout */}
        <div className="pt-4">
          <TestScoringTrustBanner onNavigatePage={onNavigatePage} />
        </div>
      </section>

      {/* ========================================================
          ثالثاً (مثبّت في أسفل الصفحة الأولى):
          قسم هندسة الخصوصية، سياسة الخصوصية، وإخلاء المسؤولية العلمي والعيادي والقانوني
      ======================================================== */}
      <section
        id="homepage-privacy-and-disclaimer"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 [content-visibility:auto] [contain-intrinsic-size:auto_650px]"
      >
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-5 ${
            isLight
              ? 'bg-white border-emerald-200/90 text-slate-800'
              : 'bg-slate-900/80 border-emerald-500/25 text-slate-100'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                }`}
              >
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span
                  className={`text-[11px] font-extrabold uppercase tracking-wider block ${
                    isLight ? 'text-emerald-800' : 'text-emerald-300'
                  }`}
                >
                  {isAr ? 'سياسة الخصوصية والضمانات القانونية والعيادية' : 'Privacy Policy & Legal/Clinical Safeguards'}
                </span>
                <h2
                  className={`text-lg sm:text-2xl font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isAr
                    ? 'هندسة الخصوصية، مبدأ الحد الأدنى من جمع البيانات، وتشفير TLS 1.3'
                    : 'Privacy Engineering, Data Minimization & TLS 1.3 Encryption'}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (onNavigatePage) onNavigatePage('privacy');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAr ? 'سياسة الخصوصية الكاملة' : 'Full Privacy Policy'}</span>
              </a>

              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (onNavigatePage) onNavigatePage('terms');
                }}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-800'
                    : 'bg-sky-500/15 hover:bg-sky-500/25 border-sky-500/30 text-sky-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isAr ? 'شروط الاستخدام' : 'Terms of Service'}</span>
              </a>

              <a
                href="/disclaimer"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (onNavigatePage) onNavigatePage('disclaimer');
                }}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                    : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30 text-amber-300'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? 'إخلاء المسؤولية' : 'Disclaimer'}</span>
              </a>
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLight
                ? 'bg-slate-50/90 border-slate-200'
                : 'bg-white/[0.02] border-white/10'
            }`}
          >
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {isAr
                ? 'تتبنى منصة «مرآة القلوب» فلسفة «الخصوصية بالتصميم» (Privacy by Design) وتطبق بصرامة مبدأ الحد الأدنى من جمع البيانات (Data Minimization Principle) المتوافق مع اللوائح العالمية لحماية البيانات (GDPR / CCPA). لا تطلب المنصة من الزوار أي وثائق رسمية، أو أرقام هواتف شخصية، أو عناوين سكنية، أو رفع صور شخصية لإجراء اختبارات التوافق والمقاييس النفسية؛ بل تكتفي بالمتغيرات الديموغرافية والسيكومترية الضرورية حصراً لتشغيل المعادلات التحليلية.'
                : 'Mirror of Hearts embraces "Privacy by Design" and enforces strict Data Minimization under GDPR/CCPA. We never ask for national IDs, telephone numbers, home addresses, or personal photographs; only minimal psychometric metrics strictly needed for scoring are processed.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div
                className={`p-3.5 rounded-xl border ${
                  isLight
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-emerald-950/20 border-emerald-500/30'
                }`}
              >
                <strong className="block mb-1 font-bold text-emerald-900 dark:text-emerald-300">
                  {isAr
                    ? 'بروتوكول التشفير القياسي TLS 1.3 و AES-256:'
                    : 'TLS 1.3 & AES-256 Encryption Standard:'}
                </strong>
                <span className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {isAr
                    ? 'تُؤمّن كافة حزم البيانات المتبادلة بين متصفح المستخدم وخوادم السحابة عبر بروتوكول التشفير القياسي الحديث (TLS 1.3 - Transport Layer Security) مع سرية التوجيه التام (Perfect Forward Secrecy)، مما يمنع أي اعتراض أو تنصت سيبراني، بالإضافة إلى إمكانية قفل النتائج محلياً برمز سري خاص (PIN Lock).'
                    : 'All network traffic between browser and cloud endpoints is secured using TLS 1.3 with Perfect Forward Secrecy and AES-256 encryption at rest, preventing any interception or cyber eavesdropping.'}
                </span>
              </div>

              <div
                className={`p-3.5 rounded-xl border ${
                  isLight
                    ? 'bg-blue-50/70 border-blue-200'
                    : 'bg-blue-950/20 border-blue-500/30'
                }`}
              >
                <strong className="block mb-1 font-bold text-blue-900 dark:text-blue-300">
                  {isAr
                    ? 'مبدأ الحد الأدنى من البيانات وعدم المشاركة التجارية:'
                    : 'Data Minimization & Zero Commercial Sharing:'}
                </strong>
                <span className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {isAr
                    ? 'تُعالج إجابات الاستبيانات لحظياً لتوليد التقرير التوافقي، ولا تقوم المنصة ببيع أو تأجير أو المتاجرة بأي بيانات سيكومترية أو شخصية مع سماسرة البيانات أو شركات الإعلانات الموجهة، مع منح المستخدم حق الحذف الفوري الكامل لسجله في أي وقت.'
                    : 'Questionnaire responses are computed in real time to generate reports; we never sell, lease, or monetize personal data with data brokers or targeted advertising firms, with instant permanent erasure rights guaranteed.'}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isLight
                ? 'bg-amber-50/80 border-amber-300 text-slate-800'
                : 'bg-amber-950/20 border-amber-500/35 text-slate-200'
            }`}
          >
            <h3
              className={`text-base font-black font-['Alexandria'] flex items-center gap-2 ${
                isLight ? 'text-amber-950' : 'text-amber-300'
              }`}
            >
              <Award className="w-5 h-5 text-amber-500 shrink-0" />
              <span>
                {isAr
                  ? 'رابعاً: إخلاء المسؤولية العلمي والعيادي والقانوني (Scientific & Clinical Disclaimer)'
                  : 'Scientific, Clinical & Legal Disclaimer'}
              </span>
            </h3>

            <p className="text-xs sm:text-sm leading-relaxed">
              {isAr
                ? 'إن جميع المقاييس السيكومترية، وحاسبات التوافق الفكري والعاطفي، والدراسات البحثية، والمقالات العيادية القصصية المنشورة عبر منصة «مرآة القلوب» قُدّمت لأغراض التثقيف العلمي، وتعزيز الوعي الذاتي، وإثراء الحوار البناء بين الشركاء والمقبلين على الزواج. لا تُعد هذه الأدوات أو النتائج المستخلصة منها بأي حال من الأحوال بديلاً عن التشخيص الطبي النفسي أو التقييم الإكلينيكي المباشر وفق الدليل التشخيصي والإحصائي للاضطرابات النفسية (DSM-5-TR) أو التصنيف الدولي للأمراض (ICD-11).'
                : 'All psychometric tools, compatibility assessments, and clinical narrative essays on Mirror of Hearts are presented strictly for psychoeducational awareness, self-discovery, and constructive dialogue. They never substitute for clinical psychiatric evaluation or medical diagnosis under DSM-5-TR or ICD-11.'}
            </p>

            <p
              className={`text-xs sm:text-sm font-semibold leading-relaxed pt-1 ${
                isLight ? 'text-amber-900' : 'text-amber-200/90'
              }`}
            >
              {isAr
                ? 'تؤكد إدارة المنصة أن التوافق الإنساني عملية ديناميكية حية تقوم على المسؤولية الأخلاقية، والمروءة، والاحترام المتبادل، والجهد الواعي المستمر من كلا الطرفين، وفي حالات الاضطرابات النفسية الحادة أو النزاعات الأسرية العميقة يُوصى دائماً بمراجعة الأخصائيين النفسيين والاستشاريين الأسريين المرخصين.'
                : 'Human compatibility is an evolving dynamic grounded in mutual chivalry, moral integrity, and shared conscious effort. In cases of acute psychological distress or deep marital conflict, consulting certified and licensed mental health clinicians is unconditionally advised.'}
            </p>
          </div>

          {/* Instant Data Deletion Control Box on Homepage */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isLight
                ? 'bg-rose-50/70 border-rose-200'
                : 'bg-rose-950/25 border-rose-500/35'
            }`}
          >
            <div className="space-y-1">
              <span
                className={`font-bold text-xs sm:text-sm flex items-center gap-1.5 ${
                  isLight ? 'text-rose-900' : 'text-rose-200'
                }`}
              >
                <Trash2 className="w-4 h-4 text-rose-500 shrink-0" />
                <span>
                  {isAr
                    ? 'حق المستخدم في حذف بياناته نهائياً (تحكم فوري):'
                    : 'User’s Right to Permanently Delete Data (Instant Control):'}
                </span>
              </span>
              <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                {isAr
                  ? 'اضغط هنا لمسح جميع بياناتك وسجل اختباراتك من المتصفح والسحابة نهائياً وبلا رجعة.'
                  : 'Click here to permanently erase all your profile data and test history from browser and cloud storage.'}
              </p>
            </div>

            {!confirmDelete && !deleteSuccess && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setConfirmDelete(true);
                }}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs transition cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'حذف بياناتي نهائياً' : 'Delete My Data Permanently'}</span>
              </button>
            )}

            {deleteSuccess && (
              <span
                className={`text-xs font-bold flex items-center gap-1.5 ${
                  isLight ? 'text-emerald-800' : 'text-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isAr ? 'تم مسح جميع بياناتك نهائياً بنجاح.' : 'All data permanently erased.'}
                </span>
              </span>
            )}

            {confirmDelete && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handlePermanentDelete}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-600 disabled:bg-rose-800 disabled:opacity-80 text-white font-extrabold text-xs cursor-pointer"
                >
                  {isDeleting
                    ? isAr
                      ? 'جاري الحذف...'
                      : 'Deleting...'
                    : isAr
                    ? 'تأكيد الحذف النهائي'
                    : 'Confirm Permanent Erase'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                    isLight
                      ? 'bg-white border border-slate-300 text-slate-800'
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Smart Content Discovery ("محتوى مقترح لك" + "الأكثر تفاعلاً وشعبية") */}
      <Suspense fallback={null}>
        <section className="space-y-8" aria-label={isAr ? 'اكتشاف المحتوى الذكي' : 'Smart Content Discovery'}>
          <LazySuggestedContentMixSection
            sourcePage="/"
            sourceType="home"
            count={6}
            variant="you_may_also_like"
          />
          <LazySuggestedContentMixSection
            sourcePage="/"
            sourceType="home"
            count={6}
            variant="popular_content"
          />
        </section>
      </Suspense>
    </>
  );
};

export default HomeBelowFoldSections;
