import React, { useState } from 'react';
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
  AlertTriangle,
  FileText,
  ExternalLink,
  Sun,
  Moon,
  MapPin,
  Cpu,
  Database,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { purgeAllUserDataPermanently } from '../services/userHistoryService';

export interface PrivacyPolicyProps {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
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
    name: isAr
      ? 'سياسة الخصوصية وحماية البيانات | مرآة القلوب'
      : 'Privacy Policy & Data Protection | Mirror of Hearts',
    description: isAr
      ? 'وثيقة سياسة الخصوصية الرسمية لمنصة مرآة القلوب بإشراف هندسي في الأردن - عمّان، بروتوكول التشفير TLS 1.3، وحق المستخدم الكامل في حذف بياناته نهائياً.'
      : 'Official Privacy Policy of Mirror of Hearts supervised by our engineering team in Amman, Jordan, featuring TLS 1.3 encryption and the unconditional right to permanent data deletion.',
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
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`w-full min-h-screen py-6 sm:py-10 px-3 sm:px-6 transition-colors duration-300 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'text-slate-100'
      }`}
    >
      <PageSEO
        title={
          isAr
            ? 'سياسة الخصوصية وحماية البيانات | مرآة القلوب — تشفير TLS 1.3 وحق حذف البيانات نهائياً'
            : 'Privacy Policy | Mirror of Hearts — TLS 1.3 Encryption & Right to Erasure'
        }
        description={
          isAr
            ? 'اطلع على سياسة الخصوصية الكاملة لمنصة مرآة القلوب (الإشراف الهندسي: الأردن - عمّان، البريد: one497303@gmail.com، بروتوكول التشفير TLS 1.3، وحق المستخدم في حذف بياناته نهائياً).'
            : 'Read the full Mirror of Hearts Privacy Policy: Engineering Supervision in Amman, Jordan, contact one497303@gmail.com, TLS 1.3 encryption, and permanent data deletion rights.'
        }
        canonicalPath="/#/privacy"
        language={language}
        pageType="privacy"
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumbs & Controls */}
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
              {isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy Policy & Data Protection'}
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
              ? 'bg-gradient-to-r from-emerald-50 via-white to-sky-50 border-emerald-200'
              : 'bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-blue-950/40 border-emerald-500/30 backdrop-blur-xl'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3.5 mb-4">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              }`}
            >
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? 'وثيقة رسمية معتمدة • تشفير TLS 1.3 • متوافقة مع GDPR و Google AdSense'
                    : 'Official Certified Policy • TLS 1.3 Encrypted • GDPR & Google AdSense Compliant'}
                </span>
              </div>
              <h1
                className={`text-2xl sm:text-3xl font-black font-['Alexandria'] mt-1.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? 'سياسة الخصوصية وحماية البيانات الشاملة'
                  : 'Comprehensive Privacy Policy & Data Protection Charter'}
              </h1>
            </div>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تاريخ السريان وآخر تحديث: نوفمبر 2026. تلتزم منصة «مرآة القلوب» (Mirror of Hearts)، الخاضعة للإشراف الهندسي والتقني المباشر في (الأردن - عمّان)، بحماية الخصوصية الرقمية والبيانات السيكومترية للمستخدمين وفق أعلى المعايير الأمنية العالمية وبروتوكول التشفير القياسي TLS 1.3، مع ضمان الحق الأصيل والمطلق لكل مستخدم في حذف بياناته نهائياً في أي وقت.'
              : 'Effective & Last Updated: November 2026. Mirror of Hearts (miratalqulub.com), operating under direct engineering supervision in Amman, Jordan, is committed to safeguarding digital privacy and psychometric data under strict TLS 1.3 cryptographic protocols, while guaranteeing every user’s unconditional right to permanently delete their data at any time.'}
          </p>

          {/* Key Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-emerald-500/20 text-xs">
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
                  {isAr ? 'الإشراف الهندسي والمقر:' : 'Engineering Supervision & HQ:'}
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
                  {isAr ? 'البريد الرسمي ومسؤول الخصوصية:' : 'Official DPO & Support Email:'}
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
              <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <span className={`block text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isAr ? 'بروتوكول التشفير المعتمد:' : 'Transport & Storage Encryption:'}
                </span>
                <strong className="font-bold">TLS 1.3 + AES-256 (Zero-Sale)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Core Explicit Guarantee Box */}
        <div
          className={`p-6 rounded-3xl border-2 shadow-lg space-y-3 ${
            isLight
              ? 'bg-emerald-50/90 border-emerald-400 text-slate-900'
              : 'bg-gradient-to-r from-blue-950/60 via-slate-950 to-emerald-950/60 border-emerald-500/50 text-slate-100'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-extrabold text-sm sm:text-base ${
              isLight ? 'text-emerald-900' : 'text-emerald-300'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>
              {isAr
                ? 'الميثاق الصريح لحماية البيانات وعدم المتاجرة بها:'
                : 'Unconditional Charter of Data Protection & Zero Monetization:'}
            </span>
          </div>
          <p
            className={`text-xs sm:text-sm leading-relaxed font-medium ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}
          >
            {isAr
              ? '«نؤكد بصورة قاطعة وملزمة قانونياً وأخلاقياً أن جميع الإجابات والمدخلات السيكومترية التي يُجريها المستخدم داخل منصة مرآة القلوب تُعالج وتُحفظ حصراً لخدمة المستخدم نفسه وتمكينه من استعراض نتائجه وتطوره المعرفي. نحن لا نبيع، ولا نؤجر، ولا نقايض، ولا نشارك بيانات المستخدمين الشخصية أو النفسية مع أي شركات إعلانية أو أطراف ثالثة تحت أي ظرف كان، وتتم كافة عمليات النقل عبر بروتوكول التشفير القياسي TLS 1.3 بإشراف فريقنا الهندسي في الأردن - عمّان».'
              : '“We unconditionally affirm that all psychometric inputs and responses processed within Mirror of Hearts are retained exclusively to serve the user and enable access to their personal analytical dossier. We never sell, rent, trade, or disclose personal or psychological data to any third party under any circumstance. All transmissions are secured via TLS 1.3 encryption under the direct supervision of our engineering team in Amman, Jordan.”'}
          </p>
        </div>

        {/* Interactive Permanent Data Deletion Action Card (Right to Erasure) */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border-2 space-y-4 ${
            isLight
              ? 'bg-rose-50/70 border-rose-300 text-slate-900'
              : 'bg-rose-950/25 border-rose-500/40 text-slate-100'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-rose-500 shrink-0" />
                <h2
                  className={`text-base sm:text-lg font-black font-['Alexandria'] ${
                    isLight ? 'text-rose-950' : 'text-rose-200'
                  }`}
                >
                  {isAr
                    ? 'ممارسة حق المستخدم في حذف بياناته نهائياً (Right to Permanent Erasure)'
                    : 'Exercise Your Right to Permanent Data Deletion (GDPR Article 17)'}
                </h2>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'يحق لكل مستخدم في أي وقت مسح كافة بياناته، وملفه التعريفي، وسجل اختباراته النفسية وتقارير التوافق نهائياً وبشكل فوري غير قابل للاسترجاع سواء من التخزين المحلي للمتصفح (LocalStorage) أو من قواعد البيانات السحابية، بنقرة زر واحدة أدناه أو عبر مراسلتنا على البريد الرسمي one497303@gmail.com.'
                  : 'Every user holds the unconditional right to permanently and irreversibly erase all profile data, psychometric test records, and compatibility reports from both local browser storage and cloud databases at any time via the instant button below or by emailing one497303@gmail.com.'}
              </p>
            </div>

            {!confirmDelete && !deleteSuccess && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setConfirmDelete(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer shrink-0 flex items-center gap-2 shadow-md"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isAr ? 'حذف جميع بياناتي نهائياً الآن' : 'Permanently Delete All My Data Now'}</span>
              </button>
            )}
          </div>

          {deleteSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs sm:text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                {isAr
                  ? 'تم مسح وحذف جميع بياناتك وسجلاتك المحلية والسحابية نهائياً بنجاح.'
                  : 'All your local and cloud records have been permanently and irreversibly erased.'}
              </span>
            </div>
          )}

          {confirmDelete && (
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isLight
                  ? 'bg-white border-rose-300 text-rose-950'
                  : 'bg-slate-950/90 border-rose-500/50 text-rose-100'
              }`}
            >
              <div className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'تأكيد الحذف النهائي: هل أنت متأكد من رغبتك في إزالة جميع بياناتك وسجل اختباراتك من المتصفح والسحابة فوراً؟ لا يمكن التراجع عن هذا الإجراء.'
                    : 'Confirm Permanent Erasure: Are you sure you want to immediately purge all your profile data and test history from browser and cloud storage? This action is irreversible.'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handlePermanentDelete}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs cursor-pointer"
                >
                  {isDeleting
                    ? isAr
                      ? 'جاري الحذف النهائي...'
                      : 'Erasing Data...'
                    : isAr
                    ? 'نعم، احذف بياناتي نهائياً'
                    : 'Yes, Permanently Erase My Data'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AdSense In-Page Unit */}
        <AdSenseBanner slot="1234567890" format="auto" />

        {/* Section 1: Data Minimization Principle */}
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
              <Eye className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '1. مبدأ الحد الأدنى من جمع البيانات (Data Minimization Principle)'
                : '1. Data Minimization Principle & Information We Process'}
            </h2>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تطبّق منصة «مرآة القلوب» سياسة صارمة لتقليل البيانات المطلوبة إلى الحد الأدنى الضروري لتشغيل المعادلات السيكومترية (Data Minimization)، ولا نطلب أي بيانات تعريفية حساسة أو تواريخ ميلاد تفصيلية أو أوصاف جسدية:'
              : 'Mirror of Hearts enforces a strict Data Minimization architecture, collecting only the minimal non-invasive parameters required for psychometric calibration:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                👤 {isAr ? 'الاسم المستعار / اللقب فقط' : 'Pseudonym / Nickname Only'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'لا يُشترط إدخال الاسم الحقيقي الكامل؛ يكفي لقب رمزي لتخصيص التقرير.'
                  : 'Real full names are not required; a simple nickname personalizes your report.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                📅 {isAr ? 'سنة الميلاد فقط (بدون يوم/شهر)' : 'Birth Year Only (No Exact DOB)'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'نكتفي بسنة الميلاد لتحديد الشريحة العمرية دون جمع تاريخ الميلاد الدقيق.'
                  : 'Only birth year is used to calibrate age brackets without exact birthdates.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                🌍 {isAr ? 'النطاق الثقافي والإقليمي العام' : 'Broad Cultural & Regional Scope'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'خيارات ثقافية عامة (خليجي، شامي، مصري، مغاربي، عالمي) بدلاً من الأوصاف الجسدية.'
                  : 'General regional scopes instead of intrusive physical or racial profiling.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                📊 {isAr ? 'استجابات المقاييس السيكومترية' : 'Psychometric Scale Responses'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'تُعالج إجابات مقياس ليكرت رياضياً لتوليد نسب التوافق والسمات الشخصية.'
                  : 'Likert-scale answers are processed mathematically to compute trait vectors.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                📧 {isAr ? 'البريد الإلكتروني الاختياري' : 'Optional Email Authentication'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'اختياري تماماً لمن يرغب في مزامنة سجلاته عبر أجهزته مع إمكانية حذفه فوراً.'
                  : 'Strictly optional for syncing test history across devices, erasable anytime.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-emerald-950/30 border-emerald-500/30'
              }`}
            >
              <span
                className={`font-bold block ${
                  isLight ? 'text-emerald-900' : 'text-emerald-300'
                }`}
              >
                🚫 {isAr ? 'حظر قاطع لرفع الصور الشخصية' : 'Strict Ban on Personal Photos'}
              </span>
              <span className={isLight ? 'text-emerald-800' : 'text-emerald-400'}>
                {isAr
                  ? 'لا نطلب ولا نسمح برفع أي صور شخصية للمستخدمين صوناً للخصوصية.'
                  : 'We never request or allow uploading personal user photographs.'}
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: TLS 1.3 Encryption & Cryptographic Security Architecture */}
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
                ? '2. بروتوكول التشفير القياسي TLS 1.3 والبنية الأمنية السحابية'
                : '2. TLS 1.3 Cryptographic Protocol & Cloud Security Architecture'}
            </h2>
          </div>

          <div
            className={`text-xs sm:text-sm space-y-3 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'يشرف الفريق الهندسي في (الأردن - عمّان) على تطبيق بنية أمنية متعددة الطبقات لحماية كل حزمة بيانات متبادلة بين متصفح المستخدم والخوادم السحابية (Google Cloud Platform - Europe-West1):'
                : 'Our engineering team in Amman, Jordan enforces a multi-layered security architecture protecting every data packet exchanged between the client browser and Google Cloud Platform (Europe-West1):'}
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                  {isAr
                    ? 'بروتوكول التشفير أثناء النقل (TLS 1.3 In-Transit Encryption):'
                    : 'TLS 1.3 In-Transit Encryption Protocol:'}
                </strong>{' '}
                {isAr
                  ? 'تُشفّر كافة الاتصالات والطلبات البرمجية باستخدام بروتوكول أمان طبقة النقل القياسي TLS 1.3 مع تفعيل سرية التوجيه التامة (Perfect Forward Secrecy - PFS) لمنع أي اعتراض أو تنصت شبكي.'
                  : 'All communications and API payloads are encrypted using Transport Layer Security (TLS 1.3) with Perfect Forward Secrecy (PFS), preventing man-in-the-middle interception.'}
              </li>
              <li>
                <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                  {isAr
                    ? 'تشفير البيانات في حالة السكون (AES-256 At-Rest Encryption):'
                    : 'AES-256 Encryption at Rest:'}
                </strong>{' '}
                {isAr
                  ? 'تُحفظ السجلات الاختيارية في قواعد بيانات Google Cloud Firestore مشفرة بالكامل بمعيار التشفير المتقدم AES-256 مع قواعد وصول صارمة (Zero-Trust Firestore Rules).'
                  : 'Optional user records stored in Google Cloud Firestore are encrypted at rest via AES-256 with strict Zero-Trust security rules.'}
              </li>
              <li>
                <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                  {isAr
                    ? 'المعالجة المحلية الفورية وقفل الخصوصية (Client-Side Processing & Local PIN):'
                    : 'Client-Side Processing & Local PIN Lock:'}
                </strong>{' '}
                {isAr
                  ? 'تُجرى الحسابات الرياضية للمقاييس النفسية واختبارات الذكاء محلياً في ذاكرة متصفحك، مع توفير ميزة قفل التقارير برمز PIN محلي لحماية خصوصيتك على الأجهزة المشتركة.'
                  : 'Psychometric calculations execute locally within your browser memory, complemented by an optional local PIN lock to protect reports on shared devices.'}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Google AdSense & Cookies */}
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
              <Cookie className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '3. سياسة ملفات تعريف الارتباط (Cookies) وإعلانات Google AdSense'
                : '3. Cookies Policy & Google AdSense Advertising Compliance'}
            </h2>
          </div>

          <div
            className={`text-xs sm:text-sm space-y-3 leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'لضمان استمرارية تقديم كافة المقاييس السيكومترية والمقالات والروايات مجاناً بالكامل دون أي اشتراكات مالية، تستعين المنصة بخدمة Google AdSense:'
                : 'To keep all psychometric batteries, research encyclopedias, and literary novels 100% free without subscriptions, Mirror of Hearts utilizes Google AdSense:'}
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                {isAr
                  ? 'يستخدم موردون خارجيون، بما في ذلك شركة Google، ملفات تعريف الارتباط (Cookies مثل ملف DART / DoubleClick) لعرض الإعلانات استناداً إلى زيارات المستخدم السابقة لموقعنا أو لمواقع أخرى على شبكة الإنترنت.'
                  : 'Third-party vendors, including Google, use cookies (such as the DoubleClick DART cookie) to serve ads based on a user’s prior visits to this website or other websites.'}
              </li>
              <li>
                {isAr
                  ? 'لا يتم إطلاقاً تمرير أي إجابات من مقاييس الشخصية أو اختبارات الذكاء أو كاشف التوافق إلى شبكة Google AdSense أو أي معلن خارجي.'
                  : 'Zero responses from personality inventories, IQ tests, or compatibility calculators are ever transmitted to Google AdSense or external advertisers.'}
              </li>
              <li>
                {isAr
                  ? 'يمكن للمستخدمين تعطيل ملفات تعريف الارتباط الإعلانية المخصصة في أي وقت عبر زيارة: '
                  : 'Users may opt out of personalized advertising at any time by visiting '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 underline font-semibold inline-flex items-center gap-1"
                >
                  Google Ads Settings <ExternalLink className="w-3 h-3" />
                </a>{' '}
                {isAr ? 'أو عبر بوابة ' : 'or via '}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 underline font-semibold inline-flex items-center gap-1"
                >
                  aboutads.info <ExternalLink className="w-3 h-3" />
                </a>
                .
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Full User Rights & Permanent Data Deletion Procedure */}
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
              <UserCheck className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '4. حقوق المستخدم القانونية وآلية حذف البيانات نهائياً (GDPR & CCPA)'
                : '4. User Legal Rights & Permanent Data Deletion Mechanism'}
            </h2>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تضمن المنصة لكل زائر ومستخدم السيادة الكاملة على بياناته وفق اللائحة الأوروبية العامة لحماية البيانات (GDPR) والتشريعات الدولية:'
              : 'We guarantee every visitor and user full sovereignty over their data in accordance with GDPR and international privacy regulations:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className="font-bold text-rose-500 block">
                1. {isAr ? 'الحق في الحذف النهائي والمحو الفوري (Right to Erasure):' : 'Right to Permanent Deletion (Erasure):'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'يمكنك حذف جميع بياناتك نهائياً في أي لحظة عبر زر «حذف بياناتي نهائياً» الموجود في هذه الصفحة، أو في شريط التنقل العلوي (ملفي)، أو في الفوتر، ليتم مسحها فوراً من المتصفح والسحابة.'
                  : 'You can permanently delete all your data at any moment via the “Delete Data Permanently” button on this page, in the Navbar (My Profile), or in the Footer.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className="font-bold text-sky-500 block">
                2. {isAr ? 'الحق في الوصول والتصدير المجاني (Access & Portability):' : 'Right of Access & PDF Portability:'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'يمكنك الاطلاع على كامل تقاريرك السيكومترية وتصديرها بصيغة PDF عالية الدقة مجاناً للاحتفاظ الشخصي بها.'
                  : 'You may inspect all your psychometric reports and export high-resolution PDF dossiers free of charge.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className="font-bold text-emerald-500 block">
                3. {isAr ? 'الموافقة المسبقة الصريحة (Explicit Consent):' : 'Explicit Prior Consent:'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'لا تبدأ خوارزمية حساب التوافق إلا بعد تفعيل المستخدم لمربع الموافقة الإلزامي الصريح في الخطوة الرابعة من المعالج.'
                  : 'Compatibility calculations only execute after the user checks the mandatory consent box in Step 4 of the wizard.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-950/70 border-white/5'
              }`}
            >
              <span className="font-bold text-amber-500 block">
                4. {isAr ? 'إخلاء مسؤولية المشاركة الطوعية العلنية:' : 'Voluntary Public Sharing Disclaimer:'}
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isAr
                  ? 'تبقى نتائجك سرية تماماً ما لم تختر بنفسك مشاركة بطاقة النتيجة علناً عبر شبكات التواصل الاجتماعي.'
                  : 'Your results remain strictly private unless you voluntarily choose to share your result card on social networks.'}
              </span>
            </div>
          </div>
        </section>

        {/* Section 5: Engineering Supervision & Official Contact */}
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
              <Mail className="w-4 h-4" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? '5. الإشراف الهندسي وقنوات الاتصال الرسمية (الأردن - عمّان)'
                : '5. Engineering Supervision & Official Contact (Amman, Jordan)'}
            </h2>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تخضع منصة «مرآة القلوب» للإشراف الهندسي والبرمجي المباشر من قِبل فريق المهندسين المختصين في (الأردن - عمّان). لأي استفسارات تتعلق بسياسة الخصوصية، أو بروتوكول التشفير TLS 1.3، أو طلبات حذف البيانات النهائية، يُرجى التواصل مباشرة عبر البريد الرسمي المعتمد:'
              : 'Mirror of Hearts operates under direct software and systems engineering supervision in Amman, Jordan. For any inquiries regarding this Privacy Policy, TLS 1.3 encryption, or permanent data deletion requests, please contact our Data Protection Officer directly:'}
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
            onClick={() => onNavigatePage('terms')}
            className="text-xs text-cyan-500 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>
              {isAr
                ? 'انتقل إلى: شروط الاستخدام والخدمة (Terms of Service)'
                : 'View: Terms of Service'}
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
            className="text-xs text-emerald-500 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{isAr ? 'نموذج الاتصال المباشر (Contact Us)' : 'Direct Contact Form'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage = PrivacyPolicy;
export default PrivacyPolicy;
