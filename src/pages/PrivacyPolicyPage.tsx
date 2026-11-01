import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  UserCheck,
  Cookie,
  Trash2,
  Mail,
  ArrowRight,
  ArrowLeft,
  Globe,
  CheckCircle2,
  AlertCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const isAr = language === 'ar';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isAr ? 'سياسة الخصوصية وحماية البيانات | مرآة القلوب' : 'Privacy Policy | Mirror of Hearts',
    description: isAr
      ? 'وثيقة سياسة الخصوصية الرسمية لمنصة مرآة القلوب، متوافقة مع متطلبات Google AdSense و GDPR وتوضح حماية البيانات والتشفير وحقوق المستخدم.'
      : 'Official Privacy Policy of Mirror of Hearts, compliant with Google AdSense requirements and GDPR principles.',
    url: 'https://miratalqulub.com/#/privacy',
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
    <div className="w-full min-h-screen text-slate-100 py-6 sm:py-10 px-3 sm:px-6">
      <PageSEO
        title={
          isAr
            ? 'سياسة الخصوصية وحماية البيانات | مرآة القلوب - متوافقة مع AdSense و GDPR'
            : 'Privacy Policy | Mirror of Hearts - Google AdSense & GDPR Compliant'
        }
        description={
          isAr
            ? 'اطلع على سياسة الخصوصية لمنصة مرآة القلوب: توضيح للبيانات المحفوظة لخدمة المستخدم حصراً، وضمان عدم بيع البيانات، وسياسة ملفات الكوكيز و Google AdSense.'
            : 'Read the Mirror of Hearts Privacy Policy: comprehensive breakdown of user data protection, zero data sales, cookie usage, and Google AdSense compliance.'
        }
        canonicalPath="/#/privacy"
        language={language}
        pageType="privacy"
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumbs & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBackToHome}
              className="hover:text-rose-400 transition cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className="text-white font-bold">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-sky-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 transition flex items-center gap-1 cursor-pointer"
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </button>
          </div>
        </div>

        {/* Header Title Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-blue-950/40 border border-emerald-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>{isAr ? 'معتمدة ومتوافقة مع Google AdSense و GDPR' : 'Google AdSense & GDPR Certified'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Alexandria'] mt-1">
                {isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy Policy & Data Protection'}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'تاريخ آخر تحديث: 31 أكتوبر 2026. تحرص منصة «مرآة القلوب» على حماية خصوصيتك وبياناتك الشخصية بأعلى معايير الأمان والتشفير العالمية.'
              : 'Last Updated: October 31, 2026. Mirror of Hearts is firmly committed to safeguarding your privacy with state-of-the-art encryption and regulatory compliance.'}
          </p>
        </div>

        {/* Core Explicit Guarantee Box (Mandatory Requirement) */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-950 to-emerald-950/60 border-2 border-emerald-500/50 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm sm:text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{isAr ? 'تأكيد وإقرار الخصوصية الصريح والإلزامي:' : 'Our Core & Unconditional Privacy Guarantee:'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {isAr
              ? '«نؤكد بصورة صريحة وجازمة أن جميع البيانات والمعلومات التي قد يتم تسجيلها داخل موقع مرآة القلوب تحفظ فقط وحصراً لخدمة المستخدم وتمكينه من العودة إلى حسابه ومتابعة نتائج اختباراته السابقة وسجله السيكومتري. نحن لا نبيع، ولا نؤجر، ولا نشارك، ولا نبادل، ولا نستغل بيانات المستخدمين تجارياً لأي جهة أو طرف ثالث على الإطلاق تحت أي ظرف كان».'
              : '“We explicitly and unconditionally affirm that all data and records stored within the Mirror of Hearts platform are retained solely and exclusively to serve the user, allowing them to access their account, test progress, and psychometric history. We do not sell, rent, lease, trade, share, or commercially monetize user data with any third party whatsoever under any circumstance.”'}
          </p>
        </div>

        {/* AdSense In-Page Unit */}
        <AdSenseBanner slot="1234567890" format="auto" />

        {/* 1. What Data is Collected */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Eye className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '1. البيانات التي قد يتم جمعها وتخزينها' : '1. Information We May Collect and Store'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'عند تفاعلك مع خدمات المنصة أو إجرائك للاستبيانات أو إنشاء حساب، قد نقوم بحفظ البيانات التالية بصورة آمنة ومشفرة:'
              : 'When interacting with our diagnostic tools, assessments, or creating an account, we may securely store the following data points:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">👤 {isAr ? 'الاسم أو اللقب المستعار' : 'Name or Pseudonym'}</span>
              <span className="text-slate-400">{isAr ? 'لتخصيص تقارير الاختبار وتنسيق الحوار.' : 'To personalize your diagnostic report.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">🎂 {isAr ? 'العمر' : 'Age'}</span>
              <span className="text-slate-400">{isAr ? 'لحساب المؤشرات العمرية السيكومترية.' : 'To calibrate developmental age brackets.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">⚧ {isAr ? 'الجنس' : 'Gender'}</span>
              <span className="text-slate-400">{isAr ? 'لضبط معادلات المقارنة والتوافق الثنائي.' : 'To adjust dyadic compatibility formulas.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">🌍 {isAr ? 'الدولة' : 'Country'}</span>
              <span className="text-slate-400">{isAr ? 'لمراعاة الخصوصية الثقافية والاجتماعية.' : 'To respect sociocultural context.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">📧 {isAr ? 'البريد الإلكتروني' : 'Email Address'}</span>
              <span className="text-slate-400">{isAr ? 'لتمكين تسجيل الدخول واستعادة النتائج.' : 'To authenticate and retrieve dossiers.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">📊 {isAr ? 'نتائج الاختبارات' : 'Assessment Results'}</span>
              <span className="text-slate-400">{isAr ? 'لحفظ سجلك وتطور درجاتك السيكومترية.' : 'To maintain your longitudinal test history.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">💬 {isAr ? 'نصوص الرسائل' : 'User Messages'}</span>
              <span className="text-slate-400">{isAr ? 'في الدردشة التفاعلية لتمكين التواصل الآني.' : 'In live interactions for real-time exchange.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">🍪 {isAr ? 'ملفات تعريف الارتباط' : 'Cookies & Storage'}</span>
              <span className="text-slate-400">{isAr ? 'لحفظ تفضيل اللغة ونمط الإضاءة والتحليلات.' : 'For language, theme preferences & session.'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-white block">🚫 {isAr ? 'منع رفع الصور' : 'No Photo Uploads'}</span>
              <span className="text-emerald-400 font-semibold">{isAr ? 'لا نطلب أو نسمح برفع صور شخصية.' : 'User photos are strictly disallowed.'}</span>
            </div>
          </div>
        </div>

        {/* 2. Google AdSense & Third-Party Cookies Policy */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Cookie className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '2. إعلانات Google AdSense وملفات تعريف الارتباط (Cookies)' : '2. Google AdSense & Third-Party Advertising Cookies'}
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              {isAr
                ? 'يستخدم موقع «مرآة القلوب» خدمة Google AdSense لعرض الإعلانات لدعم تكاليف تشغيل الخوادم السحابية وإبقاء جميع الأدوات مجانية للجمهور. فيما يلي تفصيل لكيفية تعامل Google مع بياناتك الإعلانية:'
                : 'Mirror of Hearts utilizes Google AdSense to serve advertisements, sustaining our enterprise cloud infrastructure and keeping all tools 100% free. Below is an outline of Google advertising practices:'}
            </p>

            <ul className="space-y-2 list-disc list-inside text-slate-300">
              <li>
                <strong className="text-white">
                  {isAr ? 'ملفات تعريف الارتباط الإعلانية:' : 'Advertising Cookies:'}
                </strong>{' '}
                {isAr
                  ? 'تستخدم Google وبائعو الجهات الخارجية ملفات تعريف ارتباط (مثل ملف DoubleClick cookie) لعرض الإعلانات استناداً إلى زيارات المستخدم السابقة لهذا الموقع أو لمواقع أخرى على شبكة الإنترنت.'
                  : 'Google and third-party vendors use cookies (including the DoubleClick cookie) to serve ads based on prior visits to this website or other websites on the internet.'}
              </li>
              <li>
                <strong className="text-white">
                  {isAr ? 'معرف الناشر المعتمد:' : 'Certified Publisher ID:'}
                </strong>{' '}
                <span className="font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  ca-pub-7880718645976012
                </span>{' '}
                {isAr ? 'الموثق في ملف ads.txt وقاعدة بيانات الموقع.' : 'verified across ads.txt and site infrastructure.'}
              </li>
              <li>
                <strong className="text-white">
                  {isAr ? 'إلغاء الاشتراك والتحكم في الإعلانات المخصصة:' : 'Opt-Out & Ad Personalization Control:'}
                </strong>{' '}
                {isAr
                  ? 'يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة في أي وقت عبر زيارة إعدادات إعلانات Google الرسمية على الرابط: '
                  : 'Users may opt out of personalized advertising anytime by visiting Google Ads Settings: '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline hover:text-sky-300 font-semibold"
                >
                  adssettings.google.com
                </a>
                {isAr
                  ? '، أو إلغاء اشتراك بائعي الطرف الثالث عبر '
                  : ', or opt out of third-party cookies via '}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline hover:text-sky-300 font-semibold"
                >
                  aboutads.info
                </a>.
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Google Analytics & Anonymous Metrics */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Server className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '3. تحليلات الموقع ومقاييس الأداء (Google Analytics)' : '3. Website Analytics & Performance Metrics'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'نستخدم مقاييس تحليلات مجهولة المصدر لتقييم سرعة تحميل الصفحات، والتوزيع الجغرافي العام للزوار، ومدى كفاءة الاستبيانات. هذه البيانات إحصائية بحتة مجمعة (Aggregated Data) ولا ترتبط بهوية شخصية محددة أو بيانات سرية.'
              : 'We utilize aggregated, privacy-conscious performance analytics to monitor server responsiveness, bandwidth efficiency, and page latency. These metrics remain strictly statistical and anonymized.'}
          </p>
        </div>

        {/* 4. Data Security, Encryption & Cloud Hosting */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '4. حماية وتشفير البيانات (Google Cloud Platform)' : '4. Data Security, Encryption & Cloud Infrastructure'}
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              {isAr
                ? 'تتم استضافة جميع قواعد البيانات والخوادم السحابية على منصة Google Cloud Platform في منطقة الاتحاد الأوروبي (Europe-West1)، مع تطبيق أعلى بروتوكولات الأمان:'
                : 'All database records and backend APIs are hosted on Google Cloud Platform enterprise servers within the European Union (Europe-West1), enforcing maximum security:'}
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              <li>{isAr ? 'تشفير كامل لجميع الاتصالات أثناء النقل باستخدام بروتوكول TLS 1.3 و HTTPS.' : 'Complete encryption in transit via TLS 1.3 and strict HTTPS transport.'}</li>
              <li>{isAr ? 'تشفير البيانات في حالة السكون (At Rest) بخوارزمية AES-256 القياسية.' : 'Complete encryption at rest using industry-standard AES-256.'}</li>
              <li>{isAr ? 'قواعد أمان سحابية صارمة (Hardened Security Rules) تمنع أي وصول غير مصرح به.' : 'Granular cloud security rules strictly barring unauthorized access.'}</li>
              <li>{isAr ? 'إمكانية قفل تقرير النتائج بكلمة مرور PIN محلية على جهاز المستخدم مباشرة.' : 'Optional local client-side PIN lock to secure test results on your device.'}</li>
            </ul>
          </div>
        </div>

        {/* 5. User Rights (GDPR Compliance) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '5. حقوق المستخدم القانونية (وفق مبادئ GDPR)' : '5. Your Legal Rights (GDPR & Data Protection Principles)'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-300 block">✓ {isAr ? 'حق الاطلاع والوصول (Access)' : 'Right of Access'}</span>
              <span className="text-slate-400">{isAr ? 'لك الحق الكامل في مراجعة كافة بياناتك ونتائج اختباراتك في أي وقت.' : 'You have the right to view your stored diagnostic records anytime.'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-300 block">✓ {isAr ? 'حق التصحيح والتعديل (Rectification)' : 'Right to Rectification'}</span>
              <span className="text-slate-400">{isAr ? 'يمكنك تحديث اسمك، عمرك، تفضيلاتك واستبياناتك من لوحة ملفك.' : 'You can update and modify your profile and preference entries.'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-rose-300 block">✓ {isAr ? 'حق المحو والنسيان (Right to be Forgotten)' : 'Right to Erasure (Be Forgotten)'}</span>
              <span className="text-slate-400">{isAr ? 'يمكنك حذف حسابك وسجل اختباراتك نهائياً بنقرة واحدة أو بمراسلتنا.' : 'You can permanently purge your account and records upon request.'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-300 block">✓ {isAr ? 'حق نقل وتصدير البيانات (Portability)' : 'Right to Data Portability'}</span>
              <span className="text-slate-400">{isAr ? 'تصدير تقريرك السيكومتري كاملاً بصيغة PDF عالية الدقة ومجانية.' : 'Download your complete psychometric dossier as high-resolution PDF.'}</span>
            </div>
          </div>
        </div>

        {/* 6. Contact Data Protection Officer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Mail className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '6. التواصل بخصوص الخصوصية وحماية البيانات' : '6. Contacting Us Regarding Privacy'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'إذا كان لديك أي سؤال، أو رغبت في ممارسة حقوقك في تصحيح أو محو بياناتك، يرجى مراسلة فريقنا الهندسي عبر البريد الإلكتروني الرسمي:'
              : 'If you have inquiries regarding privacy or wish to exercise your rights to amend or erase your records, reach out directly to our engineering team:'}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="mailto:one497303@gmail.com"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>one497303@gmail.com</span>
            </a>
            <span className="text-xs text-slate-400">
              📍 {isAr ? 'عمّان، المملكة الأردنية الهاشمية' : 'Amman, Hashemite Kingdom of Jordan'}
            </span>
          </div>
        </div>

        {/* Footer Navigation Back Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/50 border border-white/5">
          <button
            onClick={() => onNavigatePage('terms')}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isAr ? 'انتقل إلى: شروط الاستخدام (Terms of Service)' : 'View: Terms of Service'}</span>
          </button>
          <button
            onClick={() => onNavigatePage('contact')}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{isAr ? 'نموذج التواصل السريع (Contact Us)' : 'Contact Us Form'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
