import React, { useState } from 'react';
import {
  Heart,
  Brain,
  Lightbulb,
  BookOpen,
  BookMarked,
  Wand2,
  Users,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
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
import { ProfileStep } from '../components/ProfileStep';
import { UserProfile } from '../types';
import { WebsiteTabKey } from '../components/WebsiteSectionsModal';
import { OFFICIAL_LOGO_URL, downloadOfficialLogoFile } from '../utils/logoAsset';
import { purgeAllUserDataPermanently } from '../services/userHistoryService';

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

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isDownloadingLogo, setIsDownloadingLogo] = useState<'png' | 'jpg' | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    soundManager.playTap();
    setActiveFaq(activeFaq === index ? null : index);
  };

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
      await purgeAllUserDataPermanently(user);
      setIsDeleting(false);
      setConfirmDelete(false);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 4000);
    } catch {
      setIsDeleting(false);
    }
  };

  const scrollToCompatibility = () => {
    soundManager.playTap();
    const elem = document.getElementById('compatibility-detector-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSections = () => {
    soundManager.playTap();
    const elem = document.getElementById('site-sections-directory');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 3. أقسام الموقع - بطاقات مختصرة فقط (تظهر مرة واحدة فقط دون أي تكرار)
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
      action: scrollToCompatibility,
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

  // 4. لماذا مرآة القلوب؟ (النقاط الست المعتمدة)
  const whyPoints = [
    { titleAr: 'محتوى عربي متخصص', titleEn: 'Specialized Arabic Content' },
    { titleAr: 'أدوات تحليل تفاعلية', titleEn: 'Interactive Analytical Tools' },
    { titleAr: 'تجربة استخدام سهلة', titleEn: 'Easy & Smooth User Experience' },
    { titleAr: 'خصوصية وأمان', titleEn: 'Privacy & Data Security' },
    { titleAr: 'تطوير مستمر', titleEn: 'Continuous Evolution' },
    { titleAr: 'متوافق مع جميع الأجهزة', titleEn: 'Compatible Across All Devices' },
  ];

  // 6. الأسئلة الشائعة
  const faqList = [
    {
      qAr: 'ما هي مرآة القلوب؟',
      qEn: 'What is Mirror of Hearts?',
      aAr: 'منصة عربية متخصصة في تحليل الشخصية والتوافق النفسي والعلاقات الإنسانية والتطوير الذاتي.',
      aEn: 'An Arab platform specializing in personality analysis, psychological compatibility, human relationships, and self-development.',
    },
    {
      qAr: 'هل الخدمات مجانية؟',
      qEn: 'Are the services free?',
      aAr: 'يتوفر عدد من الخدمات والمحتويات مجاناً، وقد تتوفر مستقبلاً خدمات أو مزايا إضافية متقدمة.',
      aEn: 'A core selection of services and knowledge content is freely accessible, with potential advanced features in the future.',
    },
    {
      qAr: 'هل بياناتي آمنة؟',
      qEn: 'Is my data secure?',
      aAr: 'نولي خصوصية المستخدم أهمية كبيرة ونعمل على حماية البيانات وفق السياسات المعتمدة بالموقع وتشفير TLS 1.3.',
      aEn: 'We place utmost priority on user confidentiality and safeguard data in accordance with our strict privacy framework and TLS 1.3 encryption.',
    },
    {
      qAr: 'هل يمكن حذف بياناتي؟',
      qEn: 'Can I delete my data?',
      aAr: 'نعم، يمكن التواصل معنا لطلب حذف البيانات وفق الإجراءات الموضحة في سياسة الخصوصية، كما يتوفر خيار الحذف الدائم الفوري في الصفحة الرئيسية وأسفل الموقع.',
      aEn: 'Yes, users can contact us to request data erasure as outlined in the privacy policy, and an instant permanent deletion button is always available on the homepage and footer.',
    },
    {
      qAr: 'هل تعتبر النتائج تشخيصاً نفسياً؟',
      qEn: 'Are results considered a clinical diagnosis?',
      aAr: 'لا، تهدف النتائج إلى التوعية والفهم الشخصي ولا تُعد بديلاً عن الاستشارات أو التشخيص المهني المتخصص.',
      aEn: 'No. Results are designed for psychoeducational awareness and personal reflection; they never substitute licensed professional counseling or medical diagnosis.',
    },
    {
      qAr: 'هل يمكن استخدام الموقع من الهاتف؟',
      qEn: 'Can the platform be accessed on mobile?',
      aAr: 'نعم، تم تصميم المنصة لتعمل بكفاءة وسلاسة تامة على الهواتف والأجهزة اللوحية وأجهزة الحاسوب.',
      aEn: 'Yes, the platform is crafted to perform flawlessly across smartphones, tablets, and desktop computers.',
    },
  ];

  return (
    <div className="w-full">
      {/* ========================================================
          1. القسم الترحيبي (Hero) - بالشعار الرسمي المعتمد حصراً
      ======================================================== */}
      <section
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-8 text-center"
      >
        <div
          className={`relative p-8 sm:p-12 md:p-14 rounded-3xl border shadow-xl transition-all duration-300 ${
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
              onClick={scrollToCompatibility}
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
      </section>

      {/* ========================================================
          2. نبذة عن مرآة القلوب
      ======================================================== */}
      <section
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6"
      >
        <div
          className={`p-7 sm:p-10 rounded-3xl border transition-all duration-300 ${
            isLight
              ? 'bg-white border-slate-200/90 text-slate-800 shadow-sm'
              : 'bg-slate-900/70 border-white/10 text-slate-200 shadow-lg'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'ما هي مرآة القلوب؟' : 'What is Mirror of Hearts?'}
              </h2>
            </div>

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
              <span>{isAr ? 'صفحة من نحن الكاملة' : 'Full About Us Page'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="space-y-4">
            <p
              className={`text-base sm:text-lg leading-relaxed md:leading-loose ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'مرآة القلوب منصة معرفية وتفاعلية تهدف إلى تعزيز الوعي الذاتي وتحسين فهم العلاقات الإنسانية من خلال مجموعة متكاملة من الاختبارات والتحليلات والمحتوى المتخصص. نسعى إلى تقديم تجربة عربية حديثة تساعد الأفراد على اكتشاف شخصياتهم وفهم أنماط التفكير والسلوك والتعرف إلى عوامل التوافق بين الأشخاص بطريقة مبسطة وعملية.'
                : 'Mirror of Hearts is an interactive knowledge platform dedicated to elevating self-awareness and deepening human connection through an integrated suite of tests, analytics, and specialized content. We deliver a modern Arabic experience empowering individuals to discover their personality, understand cognitive and behavioral patterns, and explore interpersonal compatibility in practical ways.'}
            </p>

            <p
              className={`text-base sm:text-lg leading-relaxed md:leading-loose ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'تجمع المنصة بين المعرفة النفسية والتقنيات الحديثة لتوفير أدوات ومصادر معرفية تدعم النمو الشخصي واتخاذ قرارات أكثر وعياً في مختلف جوانب الحياة.'
                : 'The platform fuses psychological expertise with modern technologies to provide knowledge resources and instruments supporting personal growth and mindful decision-making across all facets of life.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. أقسام الموقع (بطاقات مختصرة فقط - بدون أي تكرار)
      ======================================================== */}
      <section
        id="site-sections-directory"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8"
      >
        <div className="text-center mb-8 space-y-2">
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
              ? 'اختر القسم الذي يناسب اهتمامك لاستكشاف الأدوات والمحتوى المتخصص'
              : 'Choose the section that matches your interest to explore specialized tools and content'}
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
          4. لماذا مرآة القلوب؟ (النقاط الست)
      ======================================================== */}
      <section
        id="why-choose-us"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8"
      >
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'مميزات المنصة' : 'Platform Features'}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black font-['Alexandria'] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr ? 'لماذا مرآة القلوب؟' : 'Why Mirror of Hearts?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyPoints.map((point, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 ${
                isLight
                  ? 'bg-white border-slate-200/90 shadow-sm hover:border-indigo-300 hover:shadow-md'
                  : 'bg-slate-900/70 border-white/10 shadow-md hover:border-indigo-400/40'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-sm">
                ✓
              </div>
              <p
                className={`text-xs sm:text-sm font-bold leading-snug ${
                  isLight ? 'text-slate-800' : 'text-slate-100'
                }`}
              >
                {isAr ? point.titleAr : point.titleEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. المنهجية العلمية (مختصر في الرئيسية + زر للمقال الكامل)
      ======================================================== */}
      <section
        id="scientific-methodology-summary"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6"
      >
        <div
          className={`p-6 sm:p-9 rounded-3xl border text-center space-y-4 transition-all duration-300 ${
            isLight
              ? 'bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border-indigo-100 shadow-sm'
              : 'bg-gradient-to-br from-indigo-950/20 via-slate-900/70 to-slate-950 border-white/10 shadow-md'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>

          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-black font-['Alexandria'] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr ? 'المنهجية العلمية' : 'Scientific Methodology'}
          </h2>

          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed md:leading-loose ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تعتمد مرآة القلوب على مجموعة من المفاهيم والنماذج المستخدمة في دراسة الشخصية والعلاقات الإنسانية والتوافق النفسي، مع الالتزام بمبادئ الخصوصية وأخلاقيات استخدام البيانات.'
              : 'Mirror of Hearts relies on established concepts and models in personality science, human relations, and psychological compatibility, with strict adherence to privacy principles and data ethics.'}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                if (props.onNavigatePage) {
                  props.onNavigatePage('methodology');
                } else {
                  window.location.hash = '#/methodology';
                }
              }}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all duration-200 cursor-pointer inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isAr ? 'اقرأ المنهجية العلمية' : 'Read Scientific Methodology'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. سياسة الخصوصية، هندسة الخصوصية (TLS 1.3)، وإخلاء المسؤولية العلمي والعيادي والقانوني
          (الجزئية الثابتة الإلزامية في الصفحة الأولى - ممنوع المساس بها أو حذفها مطلقاً)
      ======================================================== */}
      <section
        id="homepage-privacy-and-disclaimer"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6"
      >
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-5 ${
            isLight
              ? 'bg-white border-emerald-200/90 text-slate-800'
              : 'bg-slate-900/80 border-emerald-500/25 text-slate-100'
          }`}
        >
          {/* Top Header + Quick Access to Full Privacy Policy & Terms */}
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

      {/* ========================================================
          7. الأسئلة الشائعة (FAQ)
      ======================================================== */}
      <section
        id="faq-section"
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8"
      >
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-purple-500/10 border border-purple-500/20 text-purple-500">
            <HelpCircle className="w-4 h-4" />
            <span>{isAr ? 'إجابات واضحة وموثوقة' : 'Transparent Answers'}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-black font-['Alexandria'] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p
            className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isAr
              ? 'إجابات صريحة ودقيقة حول أهداف المنصة، الخصوصية، والخدمات المتاحة'
              : 'Honest, evidence-based answers regarding our mission, data privacy, and services'}
          </p>
        </div>

        <div className="space-y-3.5">
          {faqList.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm'
                    : 'bg-slate-900/75 border-white/10 shadow-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className={`w-full p-5 text-start flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isOpen
                      ? isLight
                        ? 'bg-slate-50'
                        : 'bg-white/[0.04]'
                      : 'hover:bg-slate-50/50'
                  }`}
                >
                  <span
                    className={`text-sm sm:text-base font-extrabold font-['Alexandria'] ${
                      isOpen
                        ? 'text-indigo-600'
                        : isLight
                        ? 'text-slate-900'
                        : 'text-white'
                    }`}
                  >
                    {isAr ? faq.qAr : faq.qEn}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? 'bg-indigo-500 text-white border-indigo-600 rotate-180'
                        : isLight
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-slate-800 text-slate-300 border-white/10'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`p-5 pt-2 border-t text-xs sm:text-sm leading-relaxed ${
                      isLight
                        ? 'border-slate-100 text-slate-600'
                        : 'border-white/5 text-slate-300'
                    }`}
                  >
                    <p>{isAr ? faq.aAr : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          8. قسم كاشف شريك الحياة (المعالج المباشر من 4 خطوات بدون تكرار للأقسام)
      ======================================================== */}
      <section id="compatibility-detector-section" className="w-full pt-4">
        <ProfileStep {...props} />
      </section>
    </div>
  );
};

export default HomePage;

