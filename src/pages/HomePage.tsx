import React, { useState, lazy, Suspense } from 'react';
import {
  Heart,
  Brain,
  BookOpen,
  BookMarked,
  Sparkles,
  ArrowRight,
  Compass,
  HelpCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { UserProfile } from '../types';
import type { WebsiteTabKey } from '../components/WebsiteSectionsModal';
import { OFFICIAL_LOGO_URL, downloadOfficialLogoFile } from '../utils/logoAsset';
import { PageSEO } from '../components/PageSEO';
import { navigateCleanUrl } from '../utils/navigation';

const HomeBelowFoldSections = lazy(() =>
  import('../components/HomeBelowFoldSections').then((m) => ({
    default: m.HomeBelowFoldSections,
  }))
);

export interface HomePageProps {
  onStart: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
  savedTestsCount?: number;
  onOpenSavedHistory?: () => void;
  onOpenBlindDate?: () => void;
  onOpenDomainHosting?: () => void;
  onOpenWebsiteSection?: (tab?: WebsiteTabKey) => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenUserDashboard?: () => void;
  onOpenArticles?: () => void;
  onOpenNovels?: () => void;
  onOpenContactFeedback?: () => void;
  onOpenCommunity?: () => void;
  onNavigatePage?: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = (props) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';
  const isAr = language === 'ar';

  const [isDownloadingLogo, setIsDownloadingLogo] = useState<'png' | 'jpg' | null>(null);

  const handleDownloadLogo = async (format: 'png' | 'jpg') => {
    soundManager.playTap();
    setIsDownloadingLogo(format);
    try {
      await downloadOfficialLogoFile(format);
    } finally {
      setTimeout(() => setIsDownloadingLogo(null), 900);
    }
  };

  const openCompatibilitySection = () => {
    soundManager.playTap();
    if (props.onNavigatePage) {
      props.onNavigatePage('compatibility');
    } else {
      navigateCleanUrl('/compatibility');
    }
  };

  const scrollToSections = () => {
    soundManager.playTap();
    const elem = document.getElementById('site-sections-directory');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // عناصر قسم "من أين أبدأ؟" في أعلى الصفحة الرئيسية
  const whereToStartItems = [
    {
      id: 'start_personality',
      href: '/personality-tests',
      intentAr: 'أريد فهم نفسي',
      intentEn: 'I want to understand myself',
      ctaAr: 'ابدأ باختبار الشخصية الشامل',
      ctaEn: 'Start the Comprehensive Personality Test',
      icon: Brain,
      accent: 'from-purple-500 to-indigo-600',
      action: () => {
        soundManager.playTap();
        if (props.onNavigatePage) {
          props.onNavigatePage('personality-tests');
        } else {
          navigateCleanUrl('/personality-tests');
        }
      },
    },
    {
      id: 'start_compatibility',
      href: '/compatibility',
      intentAr: 'أريد معرفة توافق شريك الحياة',
      intentEn: 'I want to know partner compatibility',
      ctaAr: 'ابدأ باختبار التوافق العاطفي',
      ctaEn: 'Start the Emotional Compatibility Test',
      icon: Heart,
      accent: 'from-rose-500 to-pink-600',
      action: openCompatibilitySection,
    },
    {
      id: 'start_articles',
      href: '/articles',
      intentAr: 'أريد تطوير ذاتي',
      intentEn: 'I want to develop myself',
      ctaAr: 'تصفح المقالات النفسية',
      ctaEn: 'Browse Psychological Articles',
      icon: BookOpen,
      accent: 'from-emerald-500 to-teal-600',
      action: () => {
        soundManager.playTap();
        if (props.onNavigatePage) {
          props.onNavigatePage('articles');
        } else {
          navigateCleanUrl('/articles');
        }
      },
    },
    {
      id: 'start_novels',
      href: '/novels',
      intentAr: 'أريد تجربة أدبية وتأملية',
      intentEn: 'I want a literary & reflective experience',
      ctaAr: 'اقرأ الروايات والقصص',
      ctaEn: 'Read Novels & Stories',
      icon: BookMarked,
      accent: 'from-cyan-500 to-blue-600',
      action: () => {
        soundManager.playTap();
        if (props.onNavigatePage) {
          props.onNavigatePage('novels');
        } else {
          navigateCleanUrl('/novels');
        }
      },
    },
  ];



  // لماذا مرآة القلوب؟ (المميزات الـ 6 ضمن التعريف بالموقع)
  const whyPoints = [
    { titleAr: 'محتوى عربي متخصص', titleEn: 'Specialized Arabic Content' },
    { titleAr: 'أدوات تحليل تفاعلية', titleEn: 'Interactive Analytical Tools' },
    { titleAr: 'تجربة استخدام سهلة', titleEn: 'Easy & Smooth User Experience' },
    { titleAr: 'خصوصية وأمان', titleEn: 'Privacy & Data Security' },
    { titleAr: 'تطوير مستمر', titleEn: 'Continuous Evolution' },
    { titleAr: 'متوافق مع جميع الأجهزة', titleEn: 'Compatible Across All Devices' },
  ];

  return (
    <div className="w-full space-y-6 pb-8">
      <PageSEO
        title={
          isAr
            ? 'مرآة القلوب | كاشف شريك الحياة والتوافق النفسي'
            : 'Mirror of Hearts | Psychometric Compatibility & Personality Platform'
        }
        description={
          isAr
            ? 'موقع ومنصة مرآة القلوب التفاعلية: اكتشف مواصفات وتوافق شريك الحياة وفق المقاييس النفسية والاجتماعية، وخض تجربة The Blind Date بمراحلها الأربع والدردشة المفتوحة.'
            : 'Mirror of Hearts interactive platform: discover partner compatibility, validated personality assessments, IQ batteries, scientific research articles, and The Blind Date experience.'
        }
        canonicalPath="/"
        language={language}
      />
      {/* ========================================================
          أولاً: التعريف بالموقع (القسم الترحيبي Hero + نبذة عن مرآة القلوب)
      ======================================================== */}
      <section
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 space-y-6"
      >
        {/* 1. بطاقة الترحيب الرئيسية (Hero) بالشعار الرسمي حصراً */}
        <div
          className={`relative p-8 sm:p-12 md:p-14 rounded-3xl border shadow-xl text-center transition-all duration-300 ${
            isLight
              ? 'bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/80 border-indigo-100/80 text-slate-900 shadow-indigo-100/50'
              : 'bg-gradient-to-b from-slate-900/90 via-[#0d121f] to-slate-950 border-white/10 text-white shadow-black/60 backdrop-blur-xl'
          }`}
        >
          {/* Official Interlocking Crystal Hearts Logo Emblem */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[26px] p-1 bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 shadow-2xl shadow-rose-500/30 overflow-hidden mb-3">
              <div className="w-full h-full rounded-[22px] bg-[#0b0e17] overflow-hidden flex items-center justify-center">
                <img
                  src={OFFICIAL_LOGO_URL}
                  alt={isAr ? 'الشعار الرسمي لمنصة مرآة القلوب' : 'Mirror of Hearts Official Logo'}
                  width={112}
                  height={112}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
            </div>

            {/* Direct Logo Download Buttons (PNG / JPG) */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleDownloadLogo('png')}
                className="px-3 py-1 rounded-xl bg-gradient-to-r from-rose-700 to-violet-700 hover:from-rose-600 hover:to-violet-600 text-white text-[11px] font-bold shadow-sm transition cursor-pointer flex items-center gap-1"
              >
                <span>⬇</span>
                <span>
                  {isDownloadingLogo === 'png'
                    ? isAr
                      ? 'جاري تجهيز PNG...'
                      : 'Preparing PNG...'
                    : isAr
                    ? 'تحميل الشعار الرسمي (PNG)'
                    : 'Download Logo (PNG)'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadLogo('jpg')}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                }`}
              >
                <span>⬇</span>
                <span>
                  {isDownloadingLogo === 'jpg'
                    ? isAr
                      ? 'جاري تجهيز JPG...'
                      : 'Preparing JPG...'
                    : isAr
                    ? 'تحميل الشعار (JPG)'
                    : 'Download Logo (JPG)'}
                </span>
              </button>
            </div>
          </div>

          {/* Hero Title */}
          <h1
            className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-['Alexandria',sans-serif] leading-tight sm:leading-tight mb-3 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr ? 'مِـرآة القـلوب' : 'Mirror of Hearts'}
          </h1>

          {/* Hero Subtitle */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold font-['Alexandria'] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-300 mb-6">
            {isAr
              ? 'اكتشف ذاتك... وافهم الآخرين... وابنِ علاقات أكثر وعياً'
              : 'Discover Yourself... Understand Others... Build More Mindful Relationships'}
          </h2>

          {/* Hero Description */}
          <div className="space-y-4 max-w-3xl mx-auto mb-8">
            <p
              className={`text-base sm:text-lg leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              {isAr
                ? 'مرآة القلوب منصة عربية متخصصة في اكتشاف الذات وفهم العلاقات الإنسانية، تجمع بين التحليل الشخصي والتوافق النفسي والمحتوى العلمي والقصص الإنسانية الهادفة.'
                : 'Mirror of Hearts is an Arab platform dedicated to self-discovery and understanding human relationships, combining personality analysis, psychological compatibility, scientific content, and purposeful human stories.'}
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'صُممت المنصة لمساعدة الأفراد على فهم شخصياتهم بصورة أعمق، والتعرف إلى أنماط التفكير والسلوك لديهم، واكتشاف فرص التوافق مع شركاء الحياة والأصدقاء، مع توفير محتوى معرفي وأدبي يساهم في بناء وعي أكثر نضجاً بالذات والإنسان والحياة.'
                : 'Designed to help individuals understand their personalities more deeply, recognize their thinking and behavioral patterns, and discover compatibility opportunities with life partners and friends, while providing knowledge and literary content that fosters a more mature awareness of self, humanity, and life.'}
            </p>
            <p
              className={`text-sm sm:text-base font-semibold leading-relaxed ${
                isLight ? 'text-indigo-600' : 'text-indigo-300'
              }`}
            >
              {isAr
                ? 'ابدأ رحلتك نحو فهم أعمق لنفسك وعلاقاتك من خلال أدوات تفاعلية ومحتوى موثوق وتجربة عربية متكاملة.'
                : 'Start your journey toward a deeper understanding of yourself and your relationships through interactive tools, reliable content, and a complete Arabic experience.'}
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <a
              href="/compatibility"
              onClick={(e) => {
                e.preventDefault();
                openCompatibilitySection();
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isAr ? 'ابدأ الآن' : 'Start Now'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </a>

            <button
              type="button"
              onClick={scrollToSections}
              className={`px-7 py-3.5 rounded-2xl border font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/15 hover:border-white/25'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>{isAr ? 'استكشف الأقسام' : 'Explore Sections'}</span>
            </button>
          </div>
        </div>

        {/* 1.5 قسم "من أين أبدأ؟" في أعلى الصفحة الرئيسية */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-5 ${
            isLight
              ? 'bg-white border-indigo-200/80 text-slate-900'
              : 'bg-slate-900/75 border-indigo-500/25 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'من أين أبدأ؟' : 'Where Do I Start?'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {whereToStartItems.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    item.action();
                  }}
                  className={`group w-full text-start p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 hover:-translate-y-0.5 shadow-xs hover:shadow-md ${
                    isLight
                      ? 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-indigo-300'
                      : 'bg-slate-950/60 hover:bg-slate-900 border-white/10 hover:border-indigo-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${item.accent} text-white flex items-center justify-center shadow-sm shrink-0`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div
                        className={`text-sm sm:text-base font-black font-['Alexandria'] ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {isAr ? item.intentAr : item.intentEn}
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                          isLight
                            ? 'text-indigo-700 group-hover:text-indigo-800'
                            : 'text-indigo-300 group-hover:text-indigo-200'
                        }`}
                      >
                        <span>{isRTL ? '←' : '→'}</span>
                        <span>{isAr ? item.ctaAr : item.ctaEn}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                      isLight ? 'text-slate-500 group-hover:text-indigo-600' : 'text-slate-400 group-hover:text-indigo-300'
                    } ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* 2. بطاقة التعريف بالموقع (نبذة عن مرآة القلوب + مميزات المنصة + روابط الصفحات التعريفية) */}
        <div
          className={`p-7 sm:p-10 rounded-3xl border transition-all duration-300 space-y-6 ${
            isLight
              ? 'bg-white border-slate-200/90 text-slate-800 shadow-sm'
              : 'bg-slate-900/70 border-white/10 text-slate-200 shadow-lg'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
                  isLight
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`text-[11px] font-extrabold uppercase tracking-wider block ${
                    isLight ? 'text-indigo-700' : 'text-indigo-300'
                  }`}
                >
                  {isAr ? 'نبذة عن الموقع' : 'About the Platform'}
                </span>
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl font-black font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isAr ? 'ما هي مرآة القلوب؟' : 'What is Mirror of Hearts?'}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (props.onNavigatePage) props.onNavigatePage('about');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700'
                    : 'bg-indigo-500/15 hover:bg-indigo-500/25 border-indigo-400/30 text-indigo-300'
                }`}
              >
                <span>{isAr ? 'من نحن' : 'About Us'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </a>

              <a
                href="/methodology"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (props.onNavigatePage) props.onNavigatePage('methodology');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700'
                    : 'bg-purple-500/15 hover:bg-purple-500/25 border-purple-400/30 text-purple-300'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isAr ? 'المنهجية العلمية' : 'Scientific Methodology'}</span>
              </a>

              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playTap();
                  if (props.onNavigatePage) props.onNavigatePage('faq');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700'
                    : 'bg-sky-500/15 hover:bg-sky-500/25 border-sky-400/30 text-sky-300'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p
              className={`text-sm sm:text-base leading-relaxed md:leading-loose ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'مرآة القلوب منصة معرفية وتفاعلية تهدف إلى تعزيز الوعي الذاتي وتحسين فهم العلاقات الإنسانية من خلال مجموعة متكاملة من الاختبارات والتحليلات والمحتوى المتخصص. نسعى إلى تقديم تجربة عربية حديثة تساعد الأفراد على اكتشاف شخصياتهم وفهم أنماط التفكير والسلوك والتعرف إلى عوامل التوافق بين الأشخاص بطريقة مبسطة وعملية.'
                : 'Mirror of Hearts is an interactive knowledge platform dedicated to elevating self-awareness and deepening human connection through an integrated suite of tests, analytics, and specialized content. We deliver a modern Arabic experience empowering individuals to discover their personality, understand cognitive and behavioral patterns, and explore interpersonal compatibility in practical ways.'}
            </p>

            <p
              className={`text-sm sm:text-base leading-relaxed md:leading-loose ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'تجمع المنصة بين المعرفة النفسية والتقنيات الحديثة لتوفير أدوات ومصادر معرفية تدعم النمو الشخصي واتخاذ قرارات أكثر وعياً في مختلف جوانب الحياة، مع الاعتماد على نماذج علمية مدروسة والالتزام الصارم بمبادئ الخصوصية وأخلاقيات البيانات.'
                : 'The platform fuses psychological expertise with modern technologies to provide knowledge resources and instruments supporting personal growth and mindful decision-making across all facets of life.'}
            </p>
          </div>

          {/* لماذا مرآة القلوب؟ مدمج بأناقة داخل بطاقة التعريف بالموقع */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10">
            <h3
              className={`text-xs sm:text-sm font-black font-['Alexandria'] mb-3 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'لماذا مرآة القلوب؟' : 'Why Mirror of Hearts?'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {whyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border flex items-center gap-2 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200/90 text-slate-800'
                      : 'bg-slate-950/60 border-white/10 text-slate-100'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      isLight
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-xs font-bold leading-snug">
                    {isAr ? point.titleAr : point.titleEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div id="site-sections-directory" className="w-full max-w-5xl mx-auto px-4 min-h-[600px]" />
        }
      >
        <HomeBelowFoldSections
          isAr={isAr}
          isRTL={isRTL}
          isLight={isLight}
          onNavigatePage={props.onNavigatePage}
          onOpenIntelligenceTests={props.onOpenIntelligenceTests}
          onOpenBlindDate={props.onOpenBlindDate}
          openCompatibilitySection={openCompatibilitySection}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
