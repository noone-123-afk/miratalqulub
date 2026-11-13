import React, { useState } from 'react';
import {
  FileText,
  ShieldAlert,
  ShieldCheck,
  Scale,
  Users,
  Lock,
  ArrowRight,
  ArrowLeft,
  Globe,
  CheckCircle2,
  XCircle,
  Mail,
  Trash2,
  AlertTriangle,
  Sun,
  Moon,
  MapPin,
  Server,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { purgeAllUserDataPermanently } from '../services/userHistoryService';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';

export interface TermsOfServiceProps {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const [theme, toggleTheme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isAr ? 'شروط الاستخدام والخدمة | مرآة القلوب' : 'Terms of Service | Mirror of Hearts',
    description: isAr
      ? 'وثيقة شروط الاستخدام الرسمية لمنصة مرآة القلوب بإشراف هندسي في الأردن - عمّان، بروتوكول التشفير TLS 1.3، البريد one497303@gmail.com، وحق المستخدم في حذف بياناته نهائياً.'
      : 'Official Terms of Service of Mirror of Hearts platform supervised by our engineering team in Amman, Jordan, featuring TLS 1.3 security, one497303@gmail.com support, and permanent data deletion rights.',
    url: 'https://miratalqulub.com/#/terms',
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
            ? 'شروط الاستخدام والخدمة | مرآة القلوب — الإشراف الهندسي (الأردن - عمّان) وتشفير TLS 1.3'
            : 'Terms of Service | Mirror of Hearts — Engineering Supervision (Amman, Jordan) & TLS 1.3'
        }
        description={
          isAr
            ? 'اطلع على شروط استخدام منصة مرآة القلوب: الإشراف الهندسي في الأردن - عمّان، البريد one497303@gmail.com، بروتوكول التشفير TLS 1.3، إخلاء المسؤولية العلمي، وحق حذف البيانات نهائياً.'
            : 'Review the Terms of Service for Mirror of Hearts: Engineering supervision in Amman, Jordan, one497303@gmail.com, TLS 1.3 encryption, clinical disclaimer, and right to permanent data erasure.'
        }
        canonicalPath="/#/terms"
        language={language}
        pageType="terms"
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb and Controls */}
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
              {isAr ? 'شروط الاستخدام والخدمة' : 'Terms of Service'}
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

        {/* Header Title Banner */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isLight
              ? 'bg-gradient-to-r from-blue-50 via-white to-purple-50 border-blue-200'
              : 'bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-purple-950/40 border-blue-500/30 backdrop-blur-xl'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3.5 mb-4">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="شعار مرآة القلوب الرسمي"
              className="w-12 h-12 rounded-2xl object-cover border border-blue-500/40 shadow-lg shrink-0"
            />
            <div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isLight
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? 'اتفاقية الاستخدام الرسمية • الإشراف الهندسي: الأردن - عمّان'
                    : 'Official User Agreement • Engineering Supervision: Jordan - Amman'}
                </span>
              </div>
              <h1
                className={`text-2xl sm:text-3xl font-black font-['Alexandria'] mt-1.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'شروط الاستخدام والخدمة الشاملة' : 'Comprehensive Terms of Service & User Agreement'}
              </h1>
            </div>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تاريخ السريان: نوفمبر 2026. تنظّم هذه الوثيقة القانونية العلاقة بين الزائر ومنصة «مرآة القلوب» (Mirror of Hearts)، وتوضح الضوابط العلمية والأخلاقية لاستخدام المقاييس السيكومترية واختبارات الذكاء وكاشف التوافق والواحة المعرفية، تحت الإشراف الهندسي المباشر في (الأردن - عمّان)، وضمن حماية بروتوكول التشفير القياسي TLS 1.3.'
              : 'Effective Date: November 2026. This legal agreement governs your access to and use of Mirror of Hearts (miratalqulub.com), detailing the scientific, ethical, and legal terms of our psychometric scales, compatibility calculators, and literary encyclopedia, supervised by our engineering team in Amman, Jordan under TLS 1.3 encryption.'}
          </p>

          {/* Key Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-blue-500/20 text-xs">
            <div
              className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-slate-950/60 border-white/10 text-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className={`block text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isAr ? 'الإشراف الهندسي والاختصاص:' : 'Engineering Supervision & Jurisdiction:'}
                </span>
                <strong className="font-bold">
                  {isAr ? 'الأردن - عمّان (Jordan - Amman)' : 'Jordan - Amman (الأردن - عمّان)'}
                </strong>
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-slate-950/60 border-white/10 text-slate-200'
              }`}
            >
              <Mail className="w-4 h-4 text-sky-500 shrink-0" />
              <div>
                <span className={`block text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isAr ? 'البريد الرسمي للدعم والشؤون القانونية:' : 'Official Legal & Technical Email:'}
                </span>
                <a
                  href="mailto:one497303@gmail.com"
                  className="font-mono font-bold text-sky-500 hover:underline select-all"
                >
                  one497303@gmail.com
                </a>
              </div>
            </div>

            <div
              className={`p-3 rounded-2xl border flex items-center gap-2.5 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-slate-950/60 border-white/10 text-slate-200'
              }`}
            >
              <Lock className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <span className={`block text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isAr ? 'معيار التشفير وحقوق البيانات:' : 'Encryption & Data Rights:'}
                </span>
                <strong className="font-bold">
                  {isAr ? 'تشفير TLS 1.3 + حق الحذف النهائي' : 'TLS 1.3 + Permanent Deletion Right'}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Scientific & Clinical Disclaimer Banner */}
        <div
          className={`p-6 rounded-3xl border-2 shadow-lg space-y-3 ${
            isLight
              ? 'bg-amber-50/90 border-amber-400 text-slate-900'
              : 'bg-gradient-to-r from-amber-950/60 via-slate-950 to-amber-950/60 border-amber-500/50 text-slate-100'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-extrabold text-sm sm:text-base ${
              isLight ? 'text-amber-900' : 'text-amber-300'
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              {isAr
                ? 'تنبيه وإخلاء مسؤولية علمي وعيادي وقانوني إلزامي:'
                : 'Mandatory Scientific, Clinical & Legal Disclaimer:'}
            </span>
          </div>
          <p
            className={`text-xs sm:text-sm leading-relaxed font-medium ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}
          >
            {isAr
              ? '«إن كافة المقاييس النفسية، واختبارات الذكاءات المتعددة، وحاسبة التوافق العلائقي، والتقارير الصادرة عن منصة مرآة القلوب هي أدوات استكشافية، تثقيفية، ومعرفية بحتة، ولا تُعد بأي حال من الأحوال تشخيصاً طبياً أو سريرياً أو نفسياً رسمياً، ولا تغني عن استشارة الطبيب النفسي أو المعالج الإكلينيكي أو المستشار الأسري المرخص، كما لا تمثل ضماناً قطعياً لنجاح أو استمرار أي علاقة زوجية أو إنسانية».'
              : '“All personality inventories, multiple intelligences batteries, compatibility calculators, and analytical reports provided on Mirror of Hearts are strictly educational, exploratory, and self-reflective tools. They do not constitute formal medical, psychiatric, or clinical diagnosis, nor do they replace consultation with a licensed psychologist, psychiatrist, or marriage counselor.”'}
          </p>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="2345678901" format="auto" />

        {/* 1. Acceptance & Nature of the Platform */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isLight
                  ? 'bg-purple-50 border-purple-200 text-purple-600'
                  : 'bg-purple-500/20 border-purple-500/30 text-purple-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '1. قبول الشروط وطبيعة المسارات الثلاثة للمنصة'
                : '1. Acceptance of Terms & Nature of the Platform’s Three Pathways'}
            </h2>
          </div>
          <div
            className={`text-xs sm:text-sm space-y-3 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'بوصولك إلى موقع «مرآة القلوب» أو استخدامك لأي من مساراته الثلاثة الرئيسية: (1. استكشف ذاتك لمقاييس الشخصية واختبارات الذكاء، 2. اكتشف التوافق لكاشف الشريك وتجربة اللقاء الأعمى The Blind Date، 3. هدية الواحة المعرفية للمقالات المحكّمة والروايات الأدبية)، فإنك تقر بموافقتك الكاملة على هذه الشروط وسياسة الخصوصية الملحقة بها.'
                : 'By accessing Mirror of Hearts or using any of its three primary pathways—(1. Explore Yourself for personality & IQ tests, 2. Discover Compatibility for the partner calculator & The Blind Date, 3. Knowledge Oasis for peer-reviewed articles & novels)—you agree to be bound by these Terms of Service and our Privacy Policy.'}
            </p>
            <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
              {isAr
                ? 'تعتمد المنصة في جوهرها على القياس السيكومتري الذاتي الموثق بمراجع جمعية علم النفس الأمريكية (APA)، مثل نماذج جون غوتمان، وجون بولبي، وروبرت ستيرنبرغ، وكاتل (16PF)، والعوامل الخمسة الكبرى (Big Five)، وهاوارد غاردنر.'
                : 'The platform relies on self-reported psychometric inventories grounded in APA-referenced literature, including models by John Gottman, John Bowlby, Robert Sternberg, Raymond Cattell (16PF), the Big Five (OCEAN), and Howard Gardner.'}
            </p>
          </div>
        </section>

        {/* 2. Engineering Supervision (Jordan - Amman) & Independence */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isLight
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
              }`}
            >
              <Users className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '2. الإشراف الهندسي المستقل (الأردن - عمّان) والصفة القانونية'
                : '2. Independent Engineering Supervision (Jordan - Amman) & Legal Identity'}
            </h2>
          </div>
          <div
            className={`text-xs sm:text-sm space-y-3 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'تُدار وتُطوّر منصة «مرآة القلوب» تحت إشراف هندسي وبرمجي متخصص ومستقل في (الأردن - عمّان / Amman, Hashemite Kingdom of Jordan)، بهدف إثراء المحتوى العربي والعالمي بأدوات قياس سيكومترية رصينة ومحتوى معرفي وأدبي راقٍ.'
                : 'Mirror of Hearts is developed, supervised, and maintained by an independent team of specialized software and systems engineers in Amman, Hashemite Kingdom of Jordan (الأردن - عمّان), dedicated to advancing digital psychometric tools and literary content.'}
            </p>
            <div
              className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span
                className={`font-bold block ${
                  isLight ? 'text-blue-800' : 'text-sky-300'
                }`}
              >
                {isAr ? 'ضوابط وإقرارات الاستقلالية الملزمة:' : 'Binding Declarations of Operational Scope:'}
              </span>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  {isAr
                    ? 'الموقع مبادرة هندسية ومعرفية مستقلة في (الأردن - عمّان) ولا يتبع لأي مؤسسة حكومية أو شركة سمسرة بيانات.'
                    : 'The platform is an independent engineering and educational initiative based in Amman, Jordan, unaffiliated with government agencies or data brokers.'}
                </li>
                <li>
                  {isAr
                    ? 'جميع خدمات الموقع مجانية بالكامل (100% Free) ولا توجد أي رسوم خفية أو اشتراكات مالية.'
                    : 'All platform services and PDF exports are 100% free with zero paid subscriptions or hidden fees.'}
                </li>
                <li>
                  {isAr
                    ? 'الموقع ليس مكتب زواج أو وكالة خطبة تجارية، بل أداة قياس توافق سيكومتري واستكشاف معرفي.'
                    : 'The platform is not a marriage agency or commercial dating broker; it is a psychometric compatibility and self-discovery tool.'}
                </li>
                <li>
                  {isAr
                    ? 'يُمنع منعاً باتاً رفع الصور الشخصية للمستخدمين حفاظاً على الخصوصية والأمان الرقمي.'
                    : 'Uploading personal user photos is strictly prohibited to preserve privacy and digital safety.'}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. TLS 1.3 Security & Right to Permanent Data Deletion */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
              }`}
            >
              <Server className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '3. بروتوكول التشفير TLS 1.3 وحق المستخدم في حذف بياناته نهائياً'
                : '3. TLS 1.3 Encryption Protocol & User’s Right to Permanent Data Deletion'}
            </h2>
          </div>

          <div
            className={`text-xs sm:text-sm space-y-3 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'تلتزم المنصة بتأمين كافة جلسات الاستخدام عبر بروتوكول التشفير القياسي TLS 1.3 أثناء النقل وتشفير AES-256 في حالة التخزين، مع تطبيق مبدأ الحد الأدنى من جمع البيانات (الاكتفاء بالاسم المستعار وسنة الميلاد والخيارات الثقافية العامة ومربع الموافقة الإلزامي).'
                : 'The platform secures all user sessions via TLS 1.3 transport encryption and AES-256 storage encryption, while adhering to strict Data Minimization (pseudonym, birth year only, broad cultural options, and mandatory prior consent).'}
            </p>
            <p>
              {isAr
                ? 'كما تكفل شروط الاستخدام لكل مستخدم الحق القانوني والتقني الكامل في حذف بياناته وسجلاته نهائياً وفورياً دون أي قيد أو شرط، سواء عبر زر الحذف المباشر أدناه أو من خلال قائمة «ملفي» أو بمراسلة البريد الرسمي one497303@gmail.com.'
                : 'Furthermore, these Terms guarantee every user the absolute right to permanently delete their data and test history immediately without condition, via the direct action button below, the “My Profile” menu, or by emailing one497303@gmail.com.'}
            </p>

            {/* Direct Permanent Deletion Control inside Terms */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isLight
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-rose-950/20 border-rose-500/30'
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
                      ? 'خيار الحذف النهائي الفوري لبيانات المستخدم:'
                      : 'Instant Permanent User Data Deletion Control:'}
                  </span>
                </span>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {isAr
                    ? 'يمسح هذا الخيار كافة سجلاتك المحلية والسحابية فوراً وبشكل نهائي.'
                    : 'Immediately purges all your local browser and cloud records permanently.'}
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
                    {isAr ? 'تم حذف جميع بياناتك نهائياً.' : 'All data permanently deleted.'}
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
                    {isAr ? 'تراجع' : 'Cancel'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. User Conduct & Intellectual Property */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'bg-amber-500/20 border-amber-500/30 text-amber-400'
              }`}
            >
              <Scale className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '4. حقوق الملكية الفكرية وضوابط السلوك الأخلاقي'
                : '4. Intellectual Property Rights & Ethical Conduct Rules'}
            </h2>
          </div>
          <div
            className={`text-xs sm:text-sm space-y-3 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'جميع الأكواد البرمجية، والخوارزميات الرياضية، والمقالات الأكاديمية، والروايات الأدبية والتحقيقات البوليسية المنشورة في «مرآة القلوب» محمية بموجب قوانين الملكية الفكرية وحق المؤلف. يُسمح للمستخدم بتحميل ومشاركة تقاريره الشخصية (PDF) للاستخدام الفردي غير التجاري، ويُحظر نسخ أو اقتباس الروايات أو الخوارزميات لأغراض تجارية دون إذن خطي.'
                : 'All source code, mathematical scoring engines, academic articles, and literary novels published on Mirror of Hearts are protected under international copyright laws. Personal PDF dossiers may be downloaded for non-commercial individual use.'}
            </p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                {isAr
                  ? 'الالتزام بالاحترام المتبادل والآداب العامة عند استخدام ميزة الحوار التفاعلي (The Blind Date) أو كتابة التعليقات الأدبية.'
                  : 'Maintain mutual respect and public decency when engaging in The Blind Date interactive dialogue or literary comments.'}
              </li>
              <li>
                {isAr
                  ? 'حظر استخدام أي برمجيات آلية (Bots/Scrapers) أو محاولة المساس بأمان خوادم المنصة.'
                  : 'Automated scraping, bot traffic, or attempts to compromise platform servers are strictly prohibited.'}
              </li>
            </ul>
          </div>
        </section>

        {/* 5. Governing Law & Official Contact (Jordan - Amman) */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isLight
                  ? 'bg-sky-50 border-sky-200 text-sky-600'
                  : 'bg-sky-500/20 border-sky-500/30 text-sky-400'
              }`}
            >
              <Globe className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '5. القانون الحاكم والتواصل الرسمي (الأردن - عمّان)'
                : '5. Governing Law & Official Engineering Contact (Jordan - Amman)'}
            </h2>
          </div>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تخضع شروط الاستخدام هذه وتُفسّر وفقاً للقوانين والأنظمة المعمول بها في المملكة الأردنية الهاشمية (الأردن - عمّان). لأي استفسارات قانونية أو تقنية أو طلبات تتعلق بحقوق البيانات، يُرجى التواصل المباشر عبر البريد الإلكتروني الرسمي:'
              : 'These Terms of Service are governed by and construed in accordance with the laws of the Hashemite Kingdom of Jordan (Amman, Jordan). For any legal, technical, or data rights inquiries, contact us directly at:'}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="mailto:one497303@gmail.com"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>one497303@gmail.com</span>
            </a>
            <span
              className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>
                {isAr
                  ? 'الأردن - عمّان (Amman, Hashemite Kingdom of Jordan)'
                  : 'Jordan - Amman (الأردن - عمّان)'}
              </span>
            </span>
          </div>
        </section>

        {/* Footer Navigation Back Links */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl border ${
            isLight
              ? 'bg-white border-slate-200 shadow-2xs'
              : 'bg-slate-900/50 border-white/5'
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigatePage('privacy')}
            className="text-xs text-emerald-500 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>
              {isAr
                ? 'انتقل إلى: سياسة الخصوصية وحماية البيانات (Privacy Policy)'
                : 'View: Privacy Policy'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigatePage('about')}
            className="text-xs text-purple-500 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            <span>
              {isAr ? 'انتقل إلى: عن الموقع والإشراف الهندسي (About Us)' : 'View: About Us'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigatePage('contact')}
            className="text-xs text-sky-500 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{isAr ? 'تواصل مع الدعم القانوني والتقني' : 'Contact Legal & Tech Support'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsOfServicePage = TermsOfService;
export default TermsOfService;
