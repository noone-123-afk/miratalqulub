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
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { ProfileStep } from '../components/ProfileStep';
import { UserProfile } from '../types';
import { WebsiteTabKey } from '../components/WebsiteSectionsModal';

// Official Circular Golden-Arabic Logo
const OFFICIAL_LOGO_URL =
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80';

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

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    soundManager.playTap();
    setActiveFaq(activeFaq === index ? null : index);
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

  // 3. أقسام الموقع - بطاقات مختصرة فقط
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
    {
      id: 'community',
      titleAr: 'المجتمع والتفاعل',
      titleEn: 'Community & Interaction',
      descAr: 'تفاعل مع المهتمين بالتطوير الذاتي وصالون كتاب الأسبوع.',
      descEn: 'Connect with self-growth seekers and the weekly book discussion salon.',
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      action: () => {
        soundManager.playTap();
        if (props.onOpenCommunity) {
          props.onOpenCommunity();
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
      aAr: 'نعم، يمكن التواصل معنا لطلب حذف البيانات وفق الإجراءات الموضحة في سياسة الخصوصية، كما يتوفر خيار الحذف الدائم الفوري في أسفل الموقع.',
      aEn: 'Yes, users can contact us to request data erasure as outlined in the privacy policy, and an instant permanent deletion button is always available in the footer.',
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
          1. القسم الترحيبي (Hero)
      ======================================================== */}
      <section
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-10 text-center"
      >
        <div
          className={`relative p-8 sm:p-12 md:p-14 rounded-3xl border shadow-xl transition-all duration-300 ${
            isLight
              ? 'bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/80 border-indigo-100/80 text-slate-900 shadow-indigo-100/50'
              : 'bg-gradient-to-b from-slate-900/90 via-[#0d121f] to-slate-950 border-white/10 text-white shadow-black/60 backdrop-blur-xl'
          }`}
        >
          {/* Official Logo Emblem */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 shadow-2xl shadow-rose-500/25 overflow-hidden">
              <img
                src={OFFICIAL_LOGO_URL}
                alt={isAr ? 'شعار مرآة القلوب' : 'Mirror of Hearts Logo'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[20px]"
              />
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
          <div className="flex items-center gap-3 mb-4">
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
          3. أقسام الموقع (بطاقات مختصرة فقط)
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

        {/* Section Cards Grid - بطاقات مختصرة بزر "دخول القسم" */}
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
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8"
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
          6. الأسئلة الشائعة (FAQ)
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
          كاشف شريك الحياة والتوافق والمختبرات (الحاسبة المعتمدة المباشرة)
      ======================================================== */}
      <section id="compatibility-detector-section" className="w-full pt-4">
        <ProfileStep {...props} />
      </section>
    </div>
  );
};

export default HomePage;
