import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Target,
  Compass,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Users,
  Brain,
  Globe,
  Mail,
  Lock,
  Layers,
  Award,
  Trash2,
  Sun,
  Moon,
  MapPin,
  FileText,
  Lightbulb,
  BookOpen,
  BookMarked,
  Wand2,
  MessageSquareHeart,
  Send,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { purgeAllUserDataPermanently } from '../services/userHistoryService';

export interface AboutUsProps {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
  onStartQuiz?: () => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenArticles?: () => void;
  onOpenNovels?: () => void;
}

export const AboutUsPage: React.FC<AboutUsProps> = ({
  onBackToHome,
  onNavigatePage,
  onStartQuiz,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenArticles,
  onOpenNovels,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const [theme, toggleTheme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    soundManager.playTap();
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePermanentDelete = async () => {
    soundManager.playTap();
    setIsDeleting(true);
    try {
      await purgeAllUserDataPermanently(user);
      setIsDeleting(false);
      setConfirmDelete(false);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 5000);
    } catch {
      setIsDeleting(false);
    }
  };

  // Structured Data Schema for Search Engines and Rich Snippets
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isAr ? 'من نحن — مرآة القلوب' : 'About Us — Mirror of Hearts',
    description: isAr
      ? 'مرآة القلوب منصة عربية معرفية وتفاعلية تهدف إلى مساعدة الأفراد على فهم أنفسهم وفهم الآخرين بصورة أعمق من خلال أدوات تحليل الشخصية ودراسة التوافق النفسي والعاطفي والمحتوى المعرفي المتخصص.'
      : 'Mirror of Hearts is an Arab knowledge and interactive platform designed to help individuals understand themselves and others more deeply through personality analysis tools, psychological compatibility, and specialized educational content.',
    url: 'https://miratalqulub.com/#/about',
    publisher: {
      '@type': 'Organization',
      name: 'مرآة القلوب - Mirror of Hearts',
      url: 'https://miratalqulub.com/',
      email: 'one497303@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amman',
        addressCountry: 'JO',
      },
    },
  };

  // 6 Primary Goals
  const goals = [
    {
      ar: 'تعزيز الوعي الذاتي وفهم الشخصية.',
      en: 'Fostering self-awareness and deeper personality understanding.',
    },
    {
      ar: 'نشر المعرفة المتعلقة بالعلاقات الإنسانية والتوافق النفسي.',
      en: 'Disseminating knowledge on human relationships and psychological compatibility.',
    },
    {
      ar: 'توفير أدوات تفاعلية تساعد المستخدم على اكتشاف ذاته بصورة أعمق.',
      en: 'Providing interactive tools that empower users to explore their inner potential.',
    },
    {
      ar: 'تقديم محتوى عربي هادف يجمع بين الفائدة وسهولة الوصول إلى المعرفة.',
      en: 'Delivering purposeful Arabic content uniting utility with effortless access.',
    },
    {
      ar: 'المساهمة في بناء مجتمع أكثر وعياً بأهمية فهم النفس والآخرين.',
      en: 'Contributing to building a conscious community mindful of self and interpersonal insight.',
    },
    {
      ar: 'تطوير خدمات رقمية حديثة تلبي احتياجات المستخدم العربي.',
      en: 'Developing modern digital services that meet the genuine needs of Arab users.',
    },
  ];

  // 5 Core Values
  const coreValues = [
    {
      titleAr: 'المصداقية',
      titleEn: 'Credibility',
      descAr: 'نسعى إلى تقديم محتوى وأدوات مبنية على مفاهيم معرفية واضحة ومصاغة بأسلوب مسؤول.',
      descEn: 'We deliver content and tools rooted in clear conceptual frameworks and expressed with responsible ethics.',
      icon: ShieldCheck,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      titleAr: 'احترام الخصوصية',
      titleEn: 'Respect for Privacy',
      descAr: 'نؤمن بأن خصوصية المستخدم حق أساسي ونعمل على حماية البيانات والتعامل معها وفق السياسات المعتمدة في المنصة.',
      descEn: 'We regard user privacy as an uncompromising right, safeguarding data strictly under certified platform policies.',
      icon: Lock,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      titleAr: 'التطوير المستمر',
      titleEn: 'Continuous Evolution',
      descAr: 'نعمل باستمرار على تحسين الخدمات وإضافة مزايا جديدة بما يحقق تجربة أفضل للمستخدمين.',
      descEn: 'We continuously refine our services and deploy thoughtful features to elevate user satisfaction.',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
    },
    {
      titleAr: 'سهولة الوصول',
      titleEn: 'Accessibility & Simplicity',
      descAr: 'نحرص على تقديم تجربة استخدام بسيطة وواضحة تناسب مختلف فئات المستخدمين.',
      descEn: 'We curate a frictionless, clean interface designed to be intuitive and accessible for all audiences.',
      icon: Layers,
      color: 'from-amber-500 to-orange-600',
    },
    {
      titleAr: 'القيمة المعرفية',
      titleEn: 'Knowledge Value',
      descAr: 'نهدف إلى أن يحصل كل زائر على معرفة أو تجربة تضيف إليه فائدة حقيقية.',
      descEn: 'We strive to ensure that every visitor gains practical knowledge or experiences that enrich their daily life.',
      icon: Award,
      color: 'from-rose-500 to-red-600',
    },
  ];

  // 6 Services / Offerings
  const offerings = [
    {
      id: 'personality',
      titleAr: 'تحليل الشخصية',
      titleEn: 'Personality Analysis',
      descAr: 'فهم السمات الشخصية وأنماط التفكير والسلوك لاكتشاف نقاط القوة ومسارات النمو.',
      descEn: 'Explore cognitive traits, behavioral patterns, core strengths, and growth avenues.',
      icon: Brain,
      action: () => {
        soundManager.playTap();
        if (onOpenPsychologyTests) {
          onOpenPsychologyTests();
        } else {
          onNavigatePage('personality-tests');
        }
      },
    },
    {
      id: 'compatibility',
      titleAr: 'كاشف شريك الحياة',
      titleEn: 'Partner Compatibility Detector',
      descAr: 'استكشاف التوافق النفسي والعاطفي والفكري والقيمي بطريقة واضحة ومسؤولة.',
      descEn: 'Evaluate psychological, affective, intellectual, and value harmony constructively.',
      icon: Heart,
      action: () => {
        soundManager.playTap();
        if (onStartQuiz) {
          onStartQuiz();
        } else {
          onNavigatePage('home');
        }
      },
    },
    {
      id: 'intelligence',
      titleAr: 'اختبارات الذكاء والقدرات المعرفية',
      titleEn: 'Intelligence & Cognitive Tests',
      descAr: 'قياس جوانب متنوعة من التفكير المنطقي وسرعة الاستيعاب والتحليل الذهني.',
      descEn: 'Standardized assessment batteries measuring logic, memory, and cognitive speed.',
      icon: Lightbulb,
      action: () => {
        soundManager.playTap();
        if (onOpenIntelligenceTests) {
          onOpenIntelligenceTests();
        } else {
          onNavigatePage('intelligence-tests');
        }
      },
    },
    {
      id: 'articles',
      titleAr: 'المقالات المعرفية والتثقيفية',
      titleEn: 'Knowledge & Educational Articles',
      descAr: 'مقالات وأبحاث متخصصة في العلاقات والذكاء العاطفي والتطوير الذاتي بلغة رصينة.',
      descEn: 'Clinical essays and research on emotional intelligence and interpersonal psychology.',
      icon: BookOpen,
      action: () => {
        soundManager.playTap();
        if (onOpenArticles) {
          onOpenArticles();
        } else {
          onNavigatePage('articles');
        }
      },
    },
    {
      id: 'novels',
      titleAr: 'الروايات والقصص ذات البعد الإنساني',
      titleEn: 'Humanistic Novels & Stories',
      descAr: 'محتوى أدبي وإنساني يستعرض مواقف وتجارب ملهمة تعزز التأمل وفهم المشاعر.',
      descEn: 'Reflective stories exploring transformative human experiences, emotions, and dilemmas.',
      icon: BookMarked,
      action: () => {
        soundManager.playTap();
        if (onOpenNovels) {
          onOpenNovels();
        } else {
          onNavigatePage('novels');
        }
      },
    },
    {
      id: 'interactive_tools',
      titleAr: 'الأدوات والخدمات التفاعلية',
      titleEn: 'Interactive Tools & Services',
      descAr: 'خدمات رقمية ذكية تساعد على تطبيق النتائج وفهم مؤشرات التوافق بصورة عملية.',
      descEn: 'Digital utilities engineered to apply insights practically and deepen awareness.',
      icon: Wand2,
      action: () => {
        soundManager.playTap();
        onNavigatePage('home');
      },
    },
  ];

  // Frequently Asked Questions
  const faqs = isAr
    ? [
        {
          q: 'ما هو هدف منصة «مرآة القلوب»؟',
          a: 'تهدف المنصة إلى تقديم بيئة عربية متكاملة تجمع بين اختبارات الشخصية، وتحليل التوافق النفسي والعاطفي، والمحتوى المعرفي المتخصص، لتعزيز الوعي الذاتي ومساعدة الأفراد على بناء علاقات أكثر استقراراً وتوازناً.',
        },
        {
          q: 'من يشرف هندسياً وتقنياً على المنصة وأين مقر إدارتها؟',
          a: 'تخضع منصة «مرآة القلوب» للإشراف الهندسي والبرمجي المباشر من قِبل فريق من المهندسين ومطوري النظم المستقلين في (الأردن - عمّان / Amman, Jordan)، ويمكن التواصل المباشر مع الإدارة عبر البريد الرسمي المعتمد: one497303@gmail.com.',
        },
        {
          q: 'كيف يتم حماية خصوصية وبيانات المستخدم؟',
          a: 'نلتزم بمبدأ الحد الأدنى من جمع البيانات (Data Minimization) دون طلب تواريخ ميلاد دقيقة أو صور شخصية. تُشفّر كافة الاتصالات عبر بروتوكول TLS 1.3 أثناء النقل ومعيار AES-256 أثناء التخزين السحابي الآمن على خوادم Google Cloud، مع الامتناع التام عن بيع أو مشاركة أي بيانات.',
        },
        {
          q: 'هل يمتلك المستخدم حق حذف بياناته نهائياً؟',
          a: 'نعم، يمتلك كل مستخدم الحق المطلق والفوري في حذف جميع بياناته وسجلات اختباراته نهائياً وبلا رجعة بنقرة واحدة عبر زر «حذف بياناتي نهائياً» المتاح في هذه الصفحة وفي أسفل الموقع، أو بمراسلتنا على one497303@gmail.com.',
        },
        {
          q: 'هل تعتبر نتائج المنصة تشخيصاً طبياً أو نفسياً معتمداً؟',
          a: 'لا. جميع المقاييس والاختبارات والأدوات قُدمت لأغراض التوعية، والتثقيف الذاتي، والاستكشاف المعرفي، ولا تُعد بأي حال من الأحوال بديلاً عن التشخيص الطبي أو الاستشارات النفسية والأسرية المتخصصة من قبل أطباء وأخصائيين مرخصين.',
        },
        {
          q: 'هل تقدم المنصة خدمات وساطة زواج أو خطبة تجارية؟',
          a: 'قطعاً لا. الموقع منصة معرفية، بحثية، وأدبية تفاعلية تُعنى بالقياس السيكومتري والتثقيف الذاتي، ولا تقدم أي خدمات تعارف تجاري أو وساطة زواج.',
        },
      ]
    : [
        {
          q: 'What is the core purpose of Mirror of Hearts?',
          a: 'Mirror of Hearts is an Arab knowledge platform uniting psychometric assessments, relational compatibility analytics, and specialized content to foster mindful self-awareness and enduring human relationships.',
        },
        {
          q: 'Who oversees engineering and where is the management located?',
          a: 'The platform is engineered, supervised, and maintained by an independent team of software and systems engineers based in Jordan - Amman (الأردن - عمّان). Official correspondence is handled via one497303@gmail.com.',
        },
        {
          q: 'How is user privacy protected and what encryption is used?',
          a: 'We strictly practice Data Minimization with zero collection of precise birthdates or photos. All network traffic is encrypted via TLS 1.3 in transit and AES-256 at rest on Google Cloud, ensuring no user data is ever sold or commercialized.',
        },
        {
          q: 'Can users permanently delete their data?',
          a: 'Yes. Every user holds the unconditional right to permanently and irreversibly erase all profile records and assessment history with a single click using the "Delete My Data Permanently" button or via one497303@gmail.com.',
        },
        {
          q: 'Are platform results considered a medical or clinical diagnosis?',
          a: 'No. All inventories and reports are provided strictly for self-awareness and psychoeducational exploration, never substituting licensed clinical consultation or psychiatric diagnosis.',
        },
        {
          q: 'Does the platform offer matchmaking or marriage brokerage?',
          a: 'Absolutely not. Mirror of Hearts is strictly an educational, scientific, and literary platform and does not offer matchmaking or dating agency services.',
        },
      ];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`w-full min-h-screen py-6 sm:py-10 px-3 sm:px-6 transition-colors duration-300 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'text-slate-100'
      }`}
    >
      <PageSEO
        title={
          isAr
            ? 'من نحن — مرآة القلوب | منصة عربية متخصصة في فهم الشخصية والعلاقات الإنسانية'
            : 'About Us — Mirror of Hearts | Personality Analysis & Human Relationships'
        }
        description={
          isAr
            ? 'مرآة القلوب منصة عربية معرفية وتفاعلية تهدف إلى مساعدة الأفراد على فهم أنفسهم وفهم الآخرين بصورة أعمق من خلال أدوات تحليل الشخصية ودراسة التوافق النفسي والعاطفي.'
            : 'Mirror of Hearts is an Arab knowledge and interactive platform designed to help individuals understand themselves and others through personality analysis and emotional compatibility.'
        }
        canonicalPath="/#/about"
        language={language}
        pageType="about"
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* ========================================================
            Navigation Breadcrumb & Controls Bar
        ======================================================== */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div
            className={`flex items-center gap-2 text-xs ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-rose-500 transition cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr ? 'من نحن' : 'About Us'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                toggleTheme();
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-amber-700 shadow-2xs'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-amber-300'
              }`}
              title={isAr ? 'تبديل الوضع الليلي/النهاري' : 'Toggle Dark/Light Mode'}
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span>{isLight ? (isAr ? 'ليلي' : 'Dark') : isAr ? 'نهاري' : 'Light'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                toggleLanguage();
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-sky-700 shadow-2xs'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-sky-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                isLight
                  ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                  : 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/40 text-rose-300'
              }`}
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            1. Hero Header & Platform Introduction (مرآة القلوب)
        ======================================================== */}
        <section
          className={`relative rounded-3xl p-6 sm:p-10 border shadow-xl overflow-hidden transition-all duration-300 ${
            isLight
              ? 'bg-gradient-to-br from-indigo-50/80 via-white to-rose-50/70 border-indigo-100 shadow-indigo-100/40'
              : 'bg-gradient-to-br from-indigo-950/50 via-slate-900/80 to-slate-950 border-white/10 backdrop-blur-xl shadow-black/50'
          }`}
        >
          <div className="relative z-10 space-y-5 max-w-4xl">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-extrabold ${
                isLight
                  ? 'bg-indigo-100/80 border-indigo-200 text-indigo-800'
                  : 'bg-indigo-500/20 border-indigo-400/30 text-indigo-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>
                {isAr
                  ? 'من نحن • منصة عربية معرفية وتفاعلية'
                  : 'About Us • Arab Knowledge & Interactive Platform'}
              </span>
            </div>

            <h1
              className={`text-3xl sm:text-5xl font-black font-['Alexandria',sans-serif] tracking-tight leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'من نحن — مرآة القلوب' : 'About Us — Mirror of Hearts'}
            </h1>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed md:leading-loose">
              <p
                className={`font-semibold ${
                  isLight ? 'text-slate-800' : 'text-slate-100'
                }`}
              >
                {isAr
                  ? 'مرآة القلوب منصة عربية معرفية وتفاعلية تهدف إلى مساعدة الأفراد على فهم أنفسهم وفهم الآخرين بصورة أعمق من خلال أدوات تحليل الشخصية ودراسة التوافق النفسي والعاطفي والمحتوى المعرفي المتخصص.'
                  : 'Mirror of Hearts is an Arab knowledge and interactive platform designed to help individuals understand themselves and others more deeply through personality analysis tools, psychological and emotional compatibility evaluations, and specialized educational content.'}
              </p>

              <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                {isAr
                  ? 'جاءت فكرة المنصة انطلاقاً من الحاجة إلى توفير مساحة عربية تجمع بين المعرفة والتقنية في بيئة واحدة، وتقدم محتوى وأدوات تساعد على تعزيز الوعي الذاتي وتحسين جودة العلاقات الإنسانية واتخاذ قرارات أكثر وعياً في مختلف جوانب الحياة.'
                  : 'The concept was born out of the necessity for an Arabic digital space that unites knowledge with technology in a single environment, providing tools that foster self-awareness, improve relationship quality, and support mindful decision-making across all facets of life.'}
              </p>

              <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                {isAr
                  ? 'نؤمن بأن معرفة الإنسان لنفسه هي الخطوة الأولى نحو النمو الشخصي وبناء علاقات أكثر استقراراً وتوازناً، لذلك نعمل باستمرار على تطوير محتوى وخدمات تسهم في تحقيق هذا الهدف.'
                  : 'We believe self-knowledge is the foundational step toward personal development and sustainable, balanced relationships. Thus, we continuously evolve our services and content to realize this goal.'}
              </p>
            </div>

            {/* Quick Badges: Governance, Security, Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 text-xs">
              <div
                className={`p-3.5 rounded-2xl border space-y-1 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-950/70 border-white/10 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'الإشراف الهندسي' : 'Supervision'}</span>
                </div>
                <p className="font-bold">
                  {isAr ? 'الأردن - عمّان (Amman, JO)' : 'Jordan - Amman (الأردن - عمّان)'}
                </p>
              </div>

              <div
                className={`p-3.5 rounded-2xl border space-y-1 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-950/70 border-white/10 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-sky-500 font-bold">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'البريد الرسمي' : 'Official Email'}</span>
                </div>
                <a
                  href="mailto:one497303@gmail.com"
                  className="font-mono font-bold text-sky-500 hover:underline block select-all"
                >
                  one497303@gmail.com
                </a>
              </div>

              <div
                className={`p-3.5 rounded-2xl border space-y-1 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-950/70 border-white/10 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-purple-500 font-bold">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'التشفير والأمان' : 'Encryption'}</span>
                </div>
                <p className="font-bold">TLS 1.3 + AES-256</p>
              </div>

              <div
                className={`p-3.5 rounded-2xl border space-y-1 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-950/70 border-white/10 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                  <Trash2 className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'خصوصية البيانات' : 'Data Rights'}</span>
                </div>
                <p className="font-bold">
                  {isAr ? 'حق الحذف الفوري التام' : 'Right to Instant Erasure'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="7890123456" format="auto" />

        {/* ========================================================
            2. رؤيتنا ورسالتنا (Vision & Mission)
        ======================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* رؤيتنا */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm hover:shadow-md space-y-4 ${
              isLight
                ? 'bg-white border-slate-200 hover:border-indigo-300'
                : 'bg-slate-900/70 border-white/10 hover:border-indigo-400/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isLight
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-600'
                    : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400'
                }`}
              >
                <Compass className="w-6 h-6" />
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'رؤيتنا' : 'Our Vision'}
              </h2>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed md:leading-loose ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'أن تصبح مرآة القلوب من أبرز المنصات العربية المتخصصة في فهم الشخصية والعلاقات الإنسانية والتوافق النفسي، وأن تكون مرجعاً معرفياً موثوقاً يساعد الأفراد على تطوير ذواتهم وبناء علاقات أكثر وعياً واستقراراً.'
                : 'To establish Mirror of Hearts as a leading Arab platform specializing in personality understanding, human relationships, and psychological compatibility, serving as a trusted knowledge authority that aids individuals in personal growth and building conscious, enduring relationships.'}
            </p>
          </div>

          {/* رسالتنا */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm hover:shadow-md space-y-4 ${
              isLight
                ? 'bg-white border-slate-200 hover:border-rose-300'
                : 'bg-slate-900/70 border-white/10 hover:border-rose-400/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isLight
                    ? 'bg-rose-50 border border-rose-200 text-rose-600'
                    : 'bg-rose-500/20 border border-rose-500/30 text-rose-400'
                }`}
              >
                <Target className="w-6 h-6" />
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'رسالتنا' : 'Our Mission'}
              </h2>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed md:leading-loose ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'تقديم أدوات تحليلية ومحتوى معرفي وتجارب تفاعلية تساعد المستخدمين على اكتشاف شخصياتهم وفهم أنماط التفكير والسلوك والعلاقات الإنسانية من خلال تجربة عربية حديثة تجمع بين البساطة والفائدة والموثوقية.'
                : 'To deliver analytical tools, knowledge content, and interactive experiences that help users uncover their personalities and comprehend cognitive, behavioral, and relational dynamics through a modern Arabic experience blending simplicity, utility, and reliability.'}
            </p>
          </div>
        </section>

        {/* ========================================================
            3. أهدافنا (Our Goals)
        ======================================================== */}
        <section
          className={`p-6 sm:p-9 rounded-3xl border transition-all duration-300 shadow-sm ${
            isLight
              ? 'bg-white border-slate-200/90'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isLight
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                  : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'أهدافنا' : 'Our Goals'}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {isAr
                  ? 'نسعى من خلال مرآة القلوب إلى تحقيق المنطلقات التالية:'
                  : 'Through Mirror of Hearts, we persistently pursue the following objectives:'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition flex items-start gap-3 ${
                  isLight
                    ? 'bg-slate-50/70 border-slate-200/70 hover:bg-slate-100/70'
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <p
                  className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                    isLight ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  {isAr ? goal.ar : goal.en}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            4. لماذا أنشأنا مرآة القلوب؟ (Why We Created It)
        ======================================================== */}
        <section
          className={`p-6 sm:p-9 rounded-3xl border transition-all duration-300 shadow-sm space-y-4 ${
            isLight
              ? 'bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 border-amber-200/80'
              : 'bg-gradient-to-br from-amber-950/20 via-slate-900/70 to-slate-950 border-amber-500/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isLight
                  ? 'bg-amber-100 border border-amber-300 text-amber-700'
                  : 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
              }`}
            >
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'لماذا أنشأنا مرآة القلوب؟' : 'Why We Created Mirror of Hearts?'}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed md:leading-loose">
            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              {isAr
                ? 'شهد المحتوى العربي خلال السنوات الماضية تطوراً كبيراً في العديد من المجالات، إلا أن المحتوى المتخصص في فهم الشخصية والعلاقات الإنسانية ما زال بحاجة إلى المزيد من المنصات التي تقدم المعرفة بصورة منظمة وسهلة الوصول.'
                : 'While Arabic digital content has witnessed substantial advancements across diverse industries, specialized insight into personality psychology and relational dynamics remains in urgent need of structured, accessible, and reputable platforms.'}
            </p>

            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              {isAr
                ? 'من هنا جاءت فكرة مرآة القلوب لتوفير منصة تجمع بين الاختبارات والتحليلات والمقالات والأدوات التفاعلية في مكان واحد، بما يساعد المستخدم على الوصول إلى معلومات وتجارب مفيدة تسهم في تطوير فهمه لنفسه ولعلاقاته.'
                : 'Hence, Mirror of Hearts was founded to unite psychometric assessments, analytical indices, educational essays, and interactive tools under one roof, empowering users with actionable experiences that deepen their understanding of self and others.'}
            </p>
          </div>
        </section>

        {/* ========================================================
            5. قيمنا (Our Core Values)
        ======================================================== */}
        <section
          className={`p-6 sm:p-9 rounded-3xl border transition-all duration-300 shadow-sm space-y-6 ${
            isLight
              ? 'bg-white border-slate-200/90'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isLight
                    ? 'bg-purple-50 border border-purple-200 text-purple-600'
                    : 'bg-purple-500/20 border border-purple-500/30 text-purple-400'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'قيمنا' : 'Our Core Values'}
              </h2>
            </div>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {isAr
                ? 'تستند مرآة القلوب إلى مجموعة من القيم الأساسية التي توجه عملنا وتطوير خدماتنا:'
                : 'Mirror of Hearts is guided by foundational values steering all our development and editorial ethics:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((val, idx) => {
              const IconC = val.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all duration-200 space-y-3 ${
                    isLight
                      ? 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:shadow-md'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${val.color} text-white flex items-center justify-center shadow-sm`}
                  >
                    <IconC className="w-5 h-5" />
                  </div>
                  <h3
                    className={`text-base font-extrabold font-['Alexandria'] ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr ? val.titleAr : val.titleEn}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {isAr ? val.descAr : val.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            6. ماذا نقدم؟ (What We Offer)
        ======================================================== */}
        <section
          className={`p-6 sm:p-9 rounded-3xl border transition-all duration-300 shadow-sm space-y-6 ${
            isLight
              ? 'bg-white border-slate-200/90'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isLight
                    ? 'bg-cyan-50 border border-cyan-200 text-cyan-600'
                    : 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400'
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'ماذا نقدم؟' : 'What We Offer?'}
              </h2>
            </div>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {isAr
                ? 'توفر المنصة مجموعة متنوعة من الأقسام والخدمات، من أبرزها:'
                : 'The platform provides an integrated suite of sections and services, notably:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offerings.map((item) => {
              const IconC = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group ${
                    isLight
                      ? 'bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-indigo-300 hover:shadow-md'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.07] hover:border-indigo-400/40'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                      <IconC className="w-5 h-5" />
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-extrabold font-['Alexandria'] ${
                        isLight ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-300'
                      }`}
                    >
                      {isAr ? item.titleAr : item.titleEn}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>
                  <div
                    className={`pt-2 flex items-center gap-1.5 text-xs font-bold text-indigo-500 group-hover:translate-x-0.5 transition-transform`}
                  >
                    <span>{isAr ? 'استكشف القسم' : 'Explore'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <p
            className={`text-xs sm:text-sm font-semibold text-center pt-2 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'وتعمل هذه الأقسام معاً لتقديم تجربة متكاملة تساعد المستخدم على الاستكشاف والتعلم والتطوير.'
              : 'These sections work synergistically together to provide a cohesive experience that facilitates exploration, learning, and self-growth.'}
          </p>
        </section>

        {/* ========================================================
            7. فريق العمل (The Team)
        ======================================================== */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-4 ${
            isLight
              ? 'bg-white border-slate-200/90'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isLight
                  ? 'bg-blue-50 border border-blue-200 text-blue-600'
                  : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
              }`}
            >
              <Users className="w-5 h-5" />
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'فريق العمل' : 'The Team'}
            </h2>
          </div>

          <div className="space-y-3 text-sm sm:text-base leading-relaxed md:leading-loose">
            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              {isAr
                ? 'مرآة القلوب مشروع عربي مستقل يتم تطويره وإدارته بصورة مستمرة بهدف تقديم تجربة معرفية وتفاعلية عالية الجودة للمستخدم العربي.'
                : 'Mirror of Hearts is an independent Arab project developed and continuously managed with the dedication to providing high-quality educational and interactive experiences for the Arab world.'}
            </p>

            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              {isAr
                ? 'نعمل على تطوير المنصة وتحسين خدماتها ومحتواها بشكل متواصل، مع التركيز على جودة تجربة المستخدم وسهولة الوصول إلى المعرفة والأدوات التي تقدمها المنصة.'
                : 'We continuously evolve the platform and refine its tools and content, maintaining keen focus on user experience quality, clarity, and intuitive access to our instruments.'}
            </p>
          </div>
        </section>

        {/* ========================================================
            8. التزامنا تجاه المستخدم وحق حذف البيانات (Commitment & Data Rights)
        ======================================================== */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-5 ${
            isLight
              ? 'bg-white border-slate-200/90'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isLight
                  ? 'bg-rose-50 border border-rose-200 text-rose-600'
                  : 'bg-rose-500/20 border border-rose-500/30 text-rose-400'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'التزامنا تجاه المستخدم' : 'Our Commitment to the User'}
            </h2>
          </div>

          <div className="space-y-3 text-sm sm:text-base leading-relaxed md:leading-loose">
            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              {isAr
                ? 'نلتزم بالسعي إلى تقديم تجربة آمنة ومفيدة ومحترمة لجميع المستخدمين، ونعمل باستمرار على تحسين جودة المحتوى والخدمات بما ينسجم مع أهداف المنصة واحتياجات زوارها.'
                : 'We are committed to delivering a secure, beneficial, and respectful experience for all users, continuously refining our content and utilities to align with our platform goals and visitor aspirations.'}
            </p>

            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              {isAr
                ? 'كما نرحب دائماً بملاحظات واقتراحات المستخدمين، لأن التطوير المستمر والتفاعل البنّاء يمثلان جزءاً أساسياً من رحلة نمو مرآة القلوب.'
                : 'We warmly welcome user feedback and constructive suggestions, as persistent refinement and positive dialogue form the bedrock of our evolution.'}
            </p>
          </div>

          {/* ================= هندسة الخصوصية، مبدأ الحد الأدنى من جمع البيانات، وتشفير TLS 1.3 ================= */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLight
                ? 'bg-slate-50/90 border-slate-200'
                : 'bg-white/[0.02] border-white/10'
            }`}
          >
            <h3
              className={`text-base font-black font-['Alexandria'] flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>
                {isAr
                  ? 'هندسة الخصوصية، مبدأ الحد الأدنى من جمع البيانات، وتشفير TLS 1.3'
                  : 'Privacy Engineering, Data Minimization & TLS 1.3 Security'}
              </span>
            </h3>

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

          {/* ================= رابعاً: إخلاء المسؤولية العلمي والعيادي والقانوني ================= */}
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
              <Award className="w-5 h-5 text-amber-500" />
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

          {/* User Data Deletion Rights Box (حفظ كامل لحق الحذف الفوري) */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
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
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>
                  {isAr
                    ? 'حق المستخدم في حذف بياناته نهائياً (تحكم فوري):'
                    : 'User’s Right to Permanently Delete Data (Instant Control):'}
                </span>
              </span>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {isAr
                  ? 'اضغط هنا لمسح جميع بياناتك وسجل اختباراتك من المتصفح والسحابة نهائياً.'
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
                  {isAr ? 'تم مسح جميع بياناتك نهائياً.' : 'All data permanently erased.'}
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
        </section>

        {/* ========================================================
            9. الأسئلة الشائعة حول المنصة (FAQ)
        ======================================================== */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                  : 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400'
              }`}
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-xl font-bold font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? 'الأسئلة الشائعة حول الموقع والإشراف والخصوصية'
                  : 'Frequently Asked Questions (FAQ)'}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {isAr
                  ? 'إجابات واضحة حول أهداف المنصة، الإشراف في الأردن - عمّان، وتشفير TLS 1.3'
                  : 'Clear answers regarding our mission, supervision, and TLS 1.3 privacy guarantees'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border overflow-hidden transition ${
                    isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-slate-950/60 border-white/5'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={`w-full p-4 text-start flex items-center justify-between gap-3 text-xs sm:text-sm font-bold transition cursor-pointer ${
                      isLight
                        ? 'text-slate-900 hover:text-indigo-600'
                        : 'text-white hover:text-indigo-400'
                    }`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={`p-4 pt-2 text-xs sm:text-sm border-t leading-relaxed ${
                        isLight
                          ? 'text-slate-700 border-slate-200 bg-white'
                          : 'text-slate-300 border-white/5 bg-white/[0.02]'
                      }`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            10. تواصل معنا وخاتمة المنصة (Contact Us & Links)
        ======================================================== */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
            isLight
              ? 'bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border-indigo-100'
              : 'bg-gradient-to-br from-indigo-950/30 via-slate-900/80 to-slate-950 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isLight
                  ? 'bg-indigo-100 border border-indigo-300 text-indigo-700'
                  : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
              }`}
            >
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'تواصل معنا' : 'Contact Us'}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed md:leading-loose">
            <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
              {isAr
                ? 'إذا كانت لديك استفسارات أو اقتراحات أو ملاحظات تتعلق بالمنصة أو خدماتها، يمكنك التواصل معنا من خلال صفحة "اتصل بنا" أو عبر وسائل التواصل الرسمية المتاحة داخل الموقع.'
                : 'For inquiries, suggestions, or notes regarding the platform or its tools, feel free to contact us through the "Contact Us" page or via the official contact channels provided across the website.'}
            </p>

            <p
              className={`font-bold italic text-base sm:text-lg ${
                isLight ? 'text-indigo-900' : 'text-indigo-200'
              }`}
            >
              {isAr
                ? 'شكراً لزيارتك مرآة القلوب، ونتطلع لأن تكون رحلتك معنا خطوة نحو فهم أعمق لذاتك وعلاقاتك.'
                : 'Thank you for visiting Mirror of Hearts; we look forward to your journey with us being a step toward deeper self-understanding and more conscious relationships.'}
            </p>
          </div>

          {/* Quick Buttons: Contact Us, Privacy, Terms, Official Email */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-sky-500" />
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr ? 'البريد الرسمي:' : 'Official Email:'}
              </span>
              <a
                href="mailto:one497303@gmail.com"
                className="font-mono font-bold text-sky-500 hover:underline select-all"
              >
                one497303@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onNavigatePage('contact');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'صفحة اتصل بنا' : 'Contact Us Page'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onNavigatePage('privacy');
                }}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                    : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-300'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onNavigatePage('terms');
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const AboutUs = AboutUsPage;
export default AboutUsPage;
