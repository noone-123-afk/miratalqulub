import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Target,
  Compass,
  Cpu,
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
  AlertTriangle,
  Sun,
  Moon,
  MapPin,
  FileText,
  Server,
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
}

export const AboutUs: React.FC<AboutUsProps> = ({
  onBackToHome,
  onNavigatePage,
  onStartQuiz,
  onOpenPsychologyTests,
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

  const faqs = isAr
    ? [
        {
          q: 'ما هي المنطلقات العلمية التي تستند إليها منصة «مرآة القلوب»؟',
          a: 'ترتكز المنصة على نماذج ومقاييس سيكومترية عالمية رصينة موثقة بمراجع APA، منها: نموذج البيت العلائقي المتين للدكتور جون غوتمان (Gottman Sound Relationship House)، ومقياس التعلق العاطفي للراشدين (ECR-R) المستند لأبحاث جون بولبي، ونماذج آرون بيك المعرفية، ونظرية الحب الثلاثية لروبرت ستيرنبرغ، ومقياس السمات الـ16 لريموند كاتل (16PF)، ونموذج العوامل الخمسة الكبرى (Big Five - OCEAN)، إضافةً إلى بطاريات الذكاءات المتعددة لهوارد غاردنر ومصفوفات رافن المتتابعة.',
        },
        {
          q: 'من يشرف هندسياً وتقنياً على منصة «مرآة القلوب» وأين يقع مقرها؟',
          a: 'تخضع منصة «مرآة القلوب» للإشراف الهندسي والبرمجي المباشر من قِبل فريق من المهندسين ومطوري البرمجيات المتخصصين في (الأردن - عمّان / Amman, Jordan)، ويمكن التواصل المباشر مع الإدارة الهندسية عبر البريد الرسمي المعتمد: one497303@gmail.com.',
        },
        {
          q: 'كيف يتم تأمين بيانات المستخدمين وما هو بروتوكول التشفير المعتمد؟',
          a: 'يتم تأمين جميع البيانات المتبادلة عبر بروتوكول التشفير القياسي TLS 1.3 أثناء النقل وتشفير AES-256 في حالة السكون على بنية Google Cloud (Europe-West1)، مع تطبيق مبدأ الحد الأدنى من جمع البيانات (Data Minimization) بالاكتفاء بالاسم المستعار وسنة الميلاد والخيارات الثقافية العامة دون طلب تواريخ ميلاد دقيقة أو أوصاف جسدية.',
        },
        {
          q: 'كيف يمارس المستخدم حقه في حذف بياناته نهائياً؟',
          a: 'يمتلك كل مستخدم الحق المطلق والفوري في حذف جميع بياناته وسجلات اختباراته نهائياً وبلا رجعة (Right to Permanent Erasure) من المتصفح والسحابة بنقرة واحدة عبر زر «حذف بياناتي نهائياً» الموجود في هذه الصفحة، أو في قائمة «ملفي» العلوية، أو في الفوتر، أو بمراسلة البريد الرسمي one497303@gmail.com.',
        },
        {
          q: 'هل يقدم الموقع خدمات زواج أو خطبة أو وساطة تعارف تجارية؟',
          a: 'قطعاً لا. الموقع منصة بحثية، معرفية، وتثقيفية تفاعلية تعنى بفهم الذات وقياس التوافق النفسي والفكري وإثراء الثقافة عبر المقالات والروايات. الموقع لا يقدم أي خدمات زواج فعلية أو وساطة خطبة تجارية.',
        },
        {
          q: 'هل نتائج وتوصيات الموقع تعتبر تشخيصاً طبياً أو بديلاً عن الاستشارات المرخصة؟',
          a: 'كلا. جميع المقاييس والاختبارات والتقارير الصادرة عن المنصة هي لأغراض استكشافية وتثقيفية ومعرفية فقط، وليست تشخيصاً طبياً أو سريرياً، وتتطلب استشارة مختص نفسي أو أسري مرخص عند الحاجة.',
        },
      ]
    : [
        {
          q: 'What scientific frameworks underpin the Mirror of Hearts platform?',
          a: 'The platform is anchored in peer-reviewed APA-referenced psychometric models, including Dr. John Gottman’s Sound Relationship House model, John Bowlby’s Adult Attachment Theory (ECR-R), Aaron Beck’s Cognitive Models, Robert Sternberg’s Triangular Theory of Love, Raymond Cattell’s 16PF, the Big Five (OCEAN), Howard Gardner’s Multiple Intelligences, and Raven’s Progressive Matrices.',
        },
        {
          q: 'Who provides engineering supervision for Mirror of Hearts and where is it based?',
          a: 'Mirror of Hearts is developed, supervised, and maintained by an independent team of specialized software and systems engineers in Jordan - Amman (الأردن - عمّان). Official engineering and legal correspondence is handled directly via one497303@gmail.com.',
        },
        {
          q: 'How is user data secured and what encryption protocol is used?',
          a: 'All data packets are secured in transit using the industry-standard TLS 1.3 encryption protocol and AES-256 encryption at rest on Google Cloud Platform (Europe-West1), enforcing strict Data Minimization (pseudonym, birth year only, and broad cultural regions without physical profiling).',
        },
        {
          q: 'How can a user exercise their right to permanently delete their data?',
          a: 'Every user holds the unconditional right to permanently delete all local and cloud records anytime with a single click using the “Delete Data Permanently” button on this page, in the “My Profile” navbar panel, in the Footer, or by emailing one497303@gmail.com.',
        },
        {
          q: 'Does the platform provide matchmaking, marriage brokerage, or dating agency services?',
          a: 'Absolutely not. Mirror of Hearts is strictly an educational, exploratory, and literary self-discovery platform focusing on psychometric compatibility and psychological insight.',
        },
        {
          q: 'Are the results considered medical diagnosis or clinical therapy?',
          a: 'No. All tools and reports are strictly exploratory and educational, do not constitute medical or clinical diagnosis, and require consulting a licensed specialist if clinical care is needed.',
        },
      ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isAr ? 'عن الموقع (من نحن) | مرآة القلوب' : 'About Us | Mirror of Hearts',
    description: isAr
      ? 'تعرف على منصة مرآة القلوب، الإشراف الهندسي في الأردن - عمّان، البريد الرسمي one497303@gmail.com، بروتوكول التشفير TLS 1.3، وحق المستخدم الكامل في حذف بياناته نهائياً.'
      : 'Learn about Mirror of Hearts, our engineering supervision in Amman, Jordan, official contact one497303@gmail.com, TLS 1.3 encryption, and user rights to permanent data deletion.',
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
            ? 'عن الموقع (من نحن) | مرآة القلوب — الإشراف الهندسي (الأردن - عمّان) وتشفير TLS 1.3'
            : 'About Us | Mirror of Hearts — Engineering Supervision (Amman, Jordan) & TLS 1.3'
        }
        description={
          isAr
            ? 'اكتشف رؤية ومنهجية منصة مرآة القلوب: إشراف هندسي في الأردن - عمّان، البريد الرسمي one497303@gmail.com، تشفير TLS 1.3، وحق المستخدم في حذف بياناته نهائياً.'
            : 'Discover the vision and methodology of Mirror of Hearts: Engineering supervision in Amman, Jordan, contact one497303@gmail.com, TLS 1.3 security, and permanent data deletion rights.'
        }
        canonicalPath="/#/about"
        language={language}
        pageType="about"
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Back Bar */}
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
              {isAr ? 'عن الموقع (من نحن)' : 'About Us'}
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

        {/* Hero Section */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 border shadow-xl overflow-hidden ${
            isLight
              ? 'bg-gradient-to-br from-purple-50 via-white to-rose-50 border-purple-200'
              : 'bg-gradient-to-br from-purple-950/60 via-slate-900/80 to-slate-950 border-purple-500/30 backdrop-blur-xl'
          }`}
        >
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${
                isLight
                  ? 'bg-purple-100 border-purple-300 text-purple-800'
                  : 'bg-purple-500/20 border-purple-400/30 text-purple-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>
                {isAr
                  ? 'المنصة العلمية والأدبية المستقلة • الإشراف الهندسي: الأردن - عمّان'
                  : 'Independent Scientific & Literary Platform • Engineering Supervision: Jordan - Amman'}
              </span>
            </div>

            <h1
              className={`text-2xl sm:text-4xl font-black font-['Alexandria',sans-serif] leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'عن الموقع (من نحن) — منصة مِـرآة القـلوب'
                : 'About Us — Mirror of Hearts (miratalqulub.com)'}
            </h1>

            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'تُعد منصة «مرآة القلوب» (Mirror of Hearts) مبادرة رقمية علمية ومعرفية وأدبية مستقلة، تعمل تحت إشراف هندسي وتقني مباشر في (الأردن - عمّان). تجمع المنصة بين المقاييس السيكومترية الموثقة بمراجع جمعية علم النفس الأمريكية (APA)، وبطاريات الذكاءات المتعددة، وخوارزميات التوافق العلائقي (نماذج غوتمان وبولبي وبيك)، إلى جانب واحة معرفية شاملة للمقالات المحكّمة والروايات الأدبية، ضمن بيئة مشفرة بالكامل ببروتوكول TLS 1.3 تحترم خصوصية المستخدم وتكفل حقه المطلق في حذف بياناته نهائياً.'
                : 'Mirror of Hearts (miratalqulub.com) is an independent scientific, educational, and literary digital platform operating under direct engineering supervision in Jordan - Amman (الأردن - عمّان). It integrates APA-referenced psychometric scales, multiple intelligences batteries, and relational compatibility algorithms (Gottman, Bowlby, and Beck models) with a peer-reviewed research encyclopedia and literary novels library, all protected by TLS 1.3 encryption and unconditional user data deletion rights.'}
            </p>

            {/* Key Governance & Security Highlights Grid */}
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
                  <span>{isAr ? 'الإشراف الهندسي' : 'Engineering Supervision'}</span>
                </div>
                <p className="font-bold">
                  {isAr ? 'الأردن - عمّان (Jordan - Amman)' : 'Jordan - Amman (الأردن - عمّان)'}
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
                  <span>{isAr ? 'البريد الرسمي المعتمد' : 'Official Contact Email'}</span>
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
                  <span>{isAr ? 'بروتوكول التشفير' : 'Encryption Protocol'}</span>
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
                  <span>{isAr ? 'السيادة على البيانات' : 'Data Sovereignty'}</span>
                </div>
                <p className="font-bold">
                  {isAr ? 'حق الحذف النهائي الفوري' : 'Instant Permanent Erasure'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onStartQuiz && (
                <button
                  type="button"
                  onClick={onStartQuiz}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/20 transition cursor-pointer flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>
                    {isAr ? 'ابدأ معالج التوافق (4 خطوات)' : 'Start 4-Step Compatibility Wizard'}
                  </span>
                </button>
              )}

              {onOpenPsychologyTests && (
                <button
                  type="button"
                  onClick={onOpenPsychologyTests}
                  className={`px-5 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 ${
                    isLight
                      ? 'bg-white hover:bg-purple-50 border-purple-300 text-purple-800'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-purple-500/30 text-purple-200'
                  }`}
                >
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span>
                    {isAr ? 'استكشف المقاييس السيكومترية' : 'Explore Psychometric Scales'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="7890123456" format="auto" />

        {/* Engineering Supervision, TLS 1.3 & Data Deletion Charter Section */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-gradient-to-r from-blue-950/40 via-slate-900/70 to-purple-950/40 border-blue-500/30 shadow-xl'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-blue-500/20 border-blue-500/40 text-blue-300'
              }`}
            >
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-lg sm:text-xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? 'الإشراف الهندسي (الأردن - عمّان)، تشفير TLS 1.3، وحق حذف البيانات نهائياً'
                  : 'Engineering Supervision (Jordan - Amman), TLS 1.3 Security & Right to Erasure'}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-blue-300/80'}`}>
                {isAr
                  ? 'الأردن - عمّان • البريد الرسمي: one497303@gmail.com'
                  : 'Jordan - Amman • Official Email: one497303@gmail.com'}
              </p>
            </div>
          </div>

          <div
            className={`text-xs sm:text-sm space-y-3 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'يشرف على هندسة وتطوير وإدارة موقع «مرآة القلوب» فريق متخصص من المهندسين ومطوري النظم البرمجية المستقلين في (الأردن - عمّان / Amman, Hashemite Kingdom of Jordan). تأسست المنصة لتكون مرجعاً علمياً وأدبياً عربياً وعالمياً يلتزم بأعلى معايير النزاهة الأكاديمية وحماية الخصوصية الرقمية.'
                : 'Mirror of Hearts is engineered, supervised, and maintained by an independent team of specialized software and systems engineers in Jordan - Amman (الأردن - عمّان). The platform was established as an authoritative scientific and literary hub committed to academic integrity and digital privacy.'}
            </p>
            <p>
              {isAr
                ? 'تُشفّر جميع البيانات المتبادلة داخل المنصة بواسطة بروتوكول التشفير القياسي TLS 1.3 أثناء النقل ومعيار AES-256 أثناء التخزين السحابي في منطقة الاتحاد الأوروبي (Google Cloud Europe-West1)، مع الالتزام التام بمبدأ الحد الأدنى من جمع البيانات (Data Minimization) وعدم بيع أو مشاركة بيانات المستخدمين مع أي طرف ثالث. كما نكفل لكل مستخدم حقه الكامل في حذف جميع بياناته نهائياً وفورياً.'
                : 'All data transmitted across the platform is secured via the TLS 1.3 cryptographic protocol in transit and AES-256 encryption at rest on Google Cloud (Europe-West1), adhering to strict Data Minimization and zero third-party data sales. Every user is guaranteed the unconditional right to permanently delete their data at any time.'}
            </p>

            <div
              className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/80 border-blue-500/20'
              }`}
            >
              <div
                className={`font-bold flex items-center gap-1.5 ${
                  isLight ? 'text-blue-900' : 'text-amber-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>
                  {isAr
                    ? 'التزاماتنا الهندسية والقانونية تجاه كل مستخدم:'
                    : 'Our Binding Engineering & Legal Commitments:'}
                </span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>
                  {isAr
                    ? 'الإشراف الهندسي المباشر في (الأردن - عمّان) والتواصل الفوري عبر البريد الرسمي: one497303@gmail.com.'
                    : 'Direct engineering supervision in Jordan - Amman with direct support via one497303@gmail.com.'}
                </li>
                <li>
                  {isAr
                    ? 'حماية كافة الاتصالات ببروتوكول التشفير القياسي TLS 1.3 وعدم جمع تواريخ الميلاد الدقيقة أو الصور الشخصية.'
                    : 'Full TLS 1.3 transport encryption with zero collection of exact birthdates or personal photos.'}
                </li>
                <li>
                  {isAr
                    ? 'تمكين المستخدم من حذف بياناته وسجلاته نهائياً من المتصفح والسحابة بنقرة واحدة في أي وقت.'
                    : 'Empowering users to permanently delete all local and cloud records with a single click anytime.'}
                </li>
                <li>
                  {isAr
                    ? 'مجانية كاملة لجميع المقاييس والاختبارات والمقالات والروايات دون أي اشتراكات مالية.'
                    : '100% free access to all psychometric scales, intelligence tests, articles, and novels.'}
                </li>
              </ul>
            </div>

            {/* Direct Permanent Data Deletion Box inside About Us */}
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
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition cursor-pointer shrink-0 flex items-center gap-1.5"
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
          </div>
        </section>

        {/* Core Pillars: Concept, Vision, Mission, Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`p-6 rounded-3xl border transition shadow-md space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 hover:border-purple-300'
                : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isLight
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-rose-500/20 border-rose-500/30 text-rose-400'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <h2
              className={`text-lg font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'فكرة المنصة ومساراتها الثلاثة' : 'Platform Concept & Three Pathways'}
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'تنتظم المنصة في ثلاثة مسارات متكاملة: (1) استكشف ذاتك لمقاييس الشخصية واختبارات الذكاء، (2) اكتشف التوافق لمعالج التوافق الرباعي وتجربة اللقاء الأعمى خلف الستار، و(3) هدية الواحة المعرفية للمقالات المحكّمة والروايات الأدبية.'
                : 'The platform is structured around three synergistic pathways: (1) Explore Yourself for personality and IQ scales, (2) Discover Compatibility for the 4-step wizard and The Blind Date, and (3) Knowledge Oasis for peer-reviewed articles and novels.'}
            </p>
          </div>

          <div
            className={`p-6 rounded-3xl border transition shadow-md space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 hover:border-blue-300'
                : 'bg-slate-900/60 border-slate-800 hover:border-blue-500/40'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isLight
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <h2
              className={`text-lg font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'رؤيتنا العلمية والأخلاقية' : 'Our Scientific & Ethical Vision'}
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'أن نكون المنصة العربية والعالمية الأكثر موثوقية في القياس السيكومتري والتوافق النفسي، مع تقديم نموذج يُحتذى به في احترام الخصوصية وتشفير TLS 1.3 وعدم المتاجرة ببيانات المستخدمين.'
                : 'To serve as the most trusted digital reference in psychometric assessment and relational compatibility while exemplifying TLS 1.3 privacy protection and zero data monetization.'}
            </p>
          </div>

          <div
            className={`p-6 rounded-3xl border transition shadow-md space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 hover:border-emerald-300'
                : 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
              }`}
            >
              <Target className="w-5 h-5" />
            </div>
            <h2
              className={`text-lg font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'رسالتنا الأكاديمية' : 'Our Academic Mission'}
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'تبسيط النظريات النفسية الرصينة (غوتمان، بولبي، بيك، كاتل، وغاردنر) وتقديمها في قوالب تفاعلية شيقة ومجانية تعزز الوعي الذاتي والتفاهم الأسري.'
                : 'Translating peer-reviewed psychological frameworks (Gottman, Bowlby, Beck, Cattell, and Gardner) into accessible, free interactive tools that foster self-awareness and relational harmony.'}
            </p>
          </div>

          <div
            className={`p-6 rounded-3xl border transition shadow-md space-y-3 ${
              isLight
                ? 'bg-white border-slate-200 hover:border-amber-300'
                : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'bg-amber-500/20 border-amber-500/30 text-amber-400'
              }`}
            >
              <Award className="w-5 h-5" />
            </div>
            <h2
              className={`text-lg font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'إخلاء المسؤولية العلمي والعيادي' : 'Scientific & Clinical Disclaimer'}
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'جميع الأدوات والمقاييس في المنصة ذات طبيعة استكشافية وتثقيفية بحتة، وليست أداة للتشخيص الطبي أو السريري، وتتطلب استشارة مختص مرخص في حال الحاجة.'
                : 'All tools and inventories on the platform are strictly exploratory and educational, do not constitute medical or clinical diagnosis, and require consulting a licensed specialist when needed.'}
            </p>
          </div>
        </div>

        {/* Section: Interactive FAQ Accordion */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900/70 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                isLight
                  ? 'bg-pink-50 border-pink-200 text-pink-600'
                  : 'bg-pink-500/20 border-pink-500/30 text-pink-400'
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
                  ? 'الأسئلة الشائعة حول الموقع والإشراف الهندسي والخصوصية'
                  : 'Frequently Asked Questions (FAQ)'}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {isAr
                  ? 'إجابات وافية حول المنهجية العلمية، الإشراف في الأردن - عمّان، وتشفير TLS 1.3'
                  : 'Clear answers regarding our methodology, Amman engineering team, and TLS 1.3 privacy'}
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
                        ? 'text-slate-900 hover:text-rose-600'
                        : 'text-white hover:text-rose-400'
                    }`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-rose-500' : 'text-slate-400'
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
        </div>

        {/* Bottom CTA & Internal Links */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl border ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/60 border-white/10'
          }`}
        >
          <div className="space-y-1">
            <h3
              className={`font-bold text-sm sm:text-base ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'تواصل مباشر مع الإشراف الهندسي (الأردن - عمّان)'
                : 'Direct Contact with Engineering Supervision (Jordan - Amman)'}
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {isAr
                ? 'البريد الرسمي المعتمد: one497303@gmail.com • تشفير قياسي TLS 1.3'
                : 'Official Email: one497303@gmail.com • Standard TLS 1.3 Encryption'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="mailto:one497303@gmail.com"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>one497303@gmail.com</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigatePage('privacy')}
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
              onClick={() => onNavigatePage('terms')}
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
      </div>
    </div>
  );
};

export const AboutUsPage = AboutUs;
export default AboutUs;
