import React, { useState } from 'react';
import {
  Heart,
  Brain,
  Lightbulb,
  BookOpen,
  BookMarked,
  Wand2,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Lock,
  FileText,
  Award,
  Trash2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { UserProfile } from '../types';
import type { WebsiteTabKey } from '../components/WebsiteSectionsModal';
import { OFFICIAL_LOGO_URL, downloadOfficialLogoFile } from '../utils/logoAsset';

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
  const { user } = useAuth();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';
  const isAr = language === 'ar';

  const [isDownloadingLogo, setIsDownloadingLogo] = useState<'png' | 'jpg' | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDownloadLogo = async (format: 'png' | 'jpg') => {
    soundManager.playTap();
    setIsDownloadingLogo(format);
    try {
      await downloadOfficialLogoFile(format);
    } finally {
      setTimeout(() => setIsDownloadingLogo(null), 900);
    }
  };

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

  const openCompatibilitySection = () => {
    soundManager.playTap();
    if (props.onNavigatePage) {
      props.onNavigatePage('compatibility');
    } else {
      window.location.hash = '#/compatibility';
    }
  };

  const scrollToSections = () => {
    soundManager.playTap();
    const elem = document.getElementById('site-sections-directory');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // أقسام الموقع الـ 6 المعتمدة - كل قسم يفتح في صفحته أو مختبره المخصص
  const sectionCards = [
    {
      id: 'personality',
      titleAr: 'تحليل الشخصية',
      titleEn: 'Personality Analysis',
      descAr: 'اكتشف سماتك الشخصية وأنماط تفكيرك وسلوكك.',
      descEn: 'Discover your personality traits, thinking patterns, and behaviors.',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      action: () => {
        soundManager.playTap();
        if (props.onNavigatePage) {
          props.onNavigatePage('personality-tests');
        } else if (props.onOpenPsychologyTests) {
          props.onOpenPsychologyTests();
        }
      },
    },
    {
      id: 'compatibility',
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
      titleAr: 'اختبارات الذكاء',
      titleEn: 'Intelligence Tests',
      descAr: 'قياس القدرات المعرفية والمهارات العقلية.',
      descEn: 'Assess cognitive capacities and intellectual abilities.',
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-600',
      action: () => {
        soundManager.playTap();
        if (props.onOpenIntelligenceTests) props.onOpenIntelligenceTests();
      },
    },
    {
      id: 'articles',
      titleAr: 'المقالات المعرفية',
      titleEn: 'Knowledge Articles',
      descAr: 'محتوى متخصص في الشخصية والعلاقات والتطوير الذاتي.',
      descEn: 'Specialized content in personality, relationships, and self-growth.',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      action: () => {
        soundManager.playTap();
        if (props.onNavigatePage) {
          props.onNavigatePage('articles');
        } else if (props.onOpenArticles) {
          props.onOpenArticles();
        }
      },
    },
    {
      id: 'novels',
      titleAr: 'الروايات والقصص',
      titleEn: 'Novels & Stories',
      descAr: 'قصص وتجارب إنسانية تحمل معاني ودروساً قيمة.',
      descEn: 'Human stories and experiences carrying profound meaning and insight.',
      icon: BookMarked,
      color: 'from-cyan-500 to-blue-600',
      action: () => {
        soundManager.playTap();
        if (props.onNavigatePage) {
          props.onNavigatePage('novels');
        } else if (props.onOpenNovels) {
          props.onOpenNovels();
        }
      },
    },
    {
      id: 'interactive_tools',
      titleAr: 'الأدوات التفاعلية',
      titleEn: 'Interactive Tools',
      descAr: 'أدوات رقمية وخدمات ذكية تساعدك على الاستفادة من المنصة.',
      descEn: 'Digital utilities and smart services helping you maximize the platform.',
      icon: Wand2,
      color: 'from-violet-500 to-fuchsia-600',
      action: () => {
        soundManager.playTap();
        if (props.onOpenBlindDate) {
          props.onOpenBlindDate();
        } else if (props.onOpenUserDashboard) {
          props.onOpenUserDashboard();
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
                className="px-3 py-1 rounded-xl bg-gradient-to-r from-rose-600 to-violet-600 hover:from-rose-500 hover:to-violet-500 text-white text-[11px] font-bold shadow-sm transition cursor-pointer flex items-center gap-1"
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
            {isAr ? 'مرآة القلوب' : 'Mirror of Hearts'}
          </h1>

          {/* Hero Subtitle */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold font-['Alexandria'] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-300 dark:to-indigo-300 mb-6">
            {isAr ? 'افهم ذاتك... وابنِ علاقات أكثر وعياً' : 'Understand Yourself... Build More Mindful Relationships'}
          </h2>

          {/* Hero Description */}
          <div className="space-y-4 max-w-3xl mx-auto mb-8">
            <p
              className={`text-base sm:text-lg leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              {isAr
                ? 'منصة عربية متخصصة في تحليل الشخصية والتوافق النفسي والعاطفي والتطوير الذاتي، تجمع بين الاختبارات التفاعلية والمحتوى المعرفي والأدوات الذكية لمساعدتك على فهم نفسك والآخرين بصورة أعمق وأكثر وضوحاً.'
                : 'An Arab platform dedicated to personality analysis, psychological and emotional compatibility, and self-development, combining interactive tests, knowledge content, and smart tools to help you understand yourself and others with deeper clarity.'}
            </p>
            <p
              className={`text-sm sm:text-base font-semibold ${
                isLight ? 'text-indigo-600' : 'text-indigo-300'
              }`}
            >
              {isAr
                ? 'وايضا تتوفر الابحاث العلمية والمقالات والروايات'
                : 'Scientific research, clinical articles, and literary novels are also readily accessible'}
            </p>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'ابدأ رحلتك نحو معرفة أعمق لشخصيتك وعلاقاتك من خلال أدوات مصممة بلغتك بسهولة وتجربة استخدام متطورة.'
                : 'Embark on your journey toward deeper self-awareness and enriching relationships with cutting-edge tools thoughtfully tailored in your language.'}
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={openCompatibilitySection}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isAr ? 'ابدأ الآن' : 'Start Now'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

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
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-indigo-500 uppercase tracking-wider block">
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
              <button
                type="button"
                onClick={() => {
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
              </button>

              <button
                type="button"
                onClick={() => {
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
              </button>

              <button
                type="button"
                onClick={() => {
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
              </button>
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
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 font-bold text-xs">
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

      {/* ========================================================
          ثانياً: أقسام الموقع (بطاقات الأقسام الـ 6 المنظمة)
      ======================================================== */}
      <section
        id="site-sections-directory"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4"
      >
        <div className="text-center mb-7 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
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
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isAr
              ? 'اختر القسم الذي يناسب اهتمامك للدخول مباشرة إلى أدواته ومحتواه المتخصص'
              : 'Choose the section that matches your interest to enter its specialized tools and content'}
          </p>
        </div>

        {/* Section Cards Grid - 6 بطاقات مختصرة بزر "دخول القسم" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectionCards.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                onClick={card.action}
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
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {isAr ? card.descAr : card.descEn}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t flex items-center justify-between text-xs font-extrabold ${
                    isLight
                      ? 'border-slate-100 text-indigo-600 group-hover:text-indigo-700'
                      : 'border-white/5 text-indigo-400 group-hover:text-indigo-300'
                  }`}
                >
                  <span>{isAr ? 'دخول القسم' : 'Enter Section'}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                      isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          ثالثاً (مثبّت في أسفل الصفحة الأولى):
          قسم هندسة الخصوصية، سياسة الخصوصية، وإخلاء المسؤولية العلمي والعيادي والقانوني
      ======================================================== */}
      <section
        id="homepage-privacy-and-disclaimer"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4"
      >
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-5 ${
            isLight
              ? 'bg-white border-emerald-200/90 text-slate-800'
              : 'bg-slate-900/80 border-emerald-500/25 text-slate-100'
          }`}
        >
          {/* Top Header + Quick Access to Full Privacy Policy & Terms & Disclaimer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                }`}
              >
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-emerald-500 uppercase tracking-wider block">
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
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  if (props.onNavigatePage) props.onNavigatePage('privacy');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAr ? 'سياسة الخصوصية الكاملة' : 'Full Privacy Policy'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  if (props.onNavigatePage) props.onNavigatePage('terms');
                }}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-800'
                    : 'bg-sky-500/15 hover:bg-sky-500/25 border-sky-500/30 text-sky-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isAr ? 'شروط الاستخدام' : 'Terms of Service'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  if (props.onNavigatePage) props.onNavigatePage('disclaimer');
                }}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                    : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30 text-amber-300'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? 'إخلاء المسؤولية' : 'Disclaimer'}</span>
              </button>
            </div>
          </div>

          {/* Verbatim Privacy Engineering Text */}
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

          {/* Verbatim Scientific, Clinical & Legal Disclaimer */}
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
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
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
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'حذف بياناتي نهائياً' : 'Delete My Data Permanently'}</span>
              </button>
            )}

            {deleteSuccess && (
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
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
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs cursor-pointer"
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
                      ? 'bg-white border border-slate-300 text-slate-700'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
