import React, { useState } from 'react';
import {
  User,
  Home,
  FileText,
  LogIn,
  UserCheck,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Brain,
  Heart,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { PageSEO } from '../components/PageSEO';
import { soundManager } from '../utils/sound';
import type { DashboardTabKey } from '../components/UserProfileDashboard';

interface ProfilePageProps {
  savedTestsCount: number;
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
  onOpenDashboard: (tab?: DashboardTabKey) => void;
  onOpenAuth: () => void;
  onDataDeleted?: () => void;
  onReset?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  savedTestsCount,
  onBackToHome,
  onNavigatePage,
  onOpenDashboard,
  onOpenAuth,
  onDataDeleted,
  onReset,
}) => {
  const { language, isRTL } = useLanguage();
  const { user } = useAuth();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

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
      onDataDeleted?.();
      onReset?.();
      setTimeout(() => setDeleteSuccess(false), 3500);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 space-y-8"
    >
      <PageSEO
        title={
          isAr
            ? 'ملفي والتحكم الشخصي بالبيانات وسجل النتائج | مرآة القلوب'
            : 'My Profile, Psychometric Dossier & Privacy Control | Mirror of Hearts'
        }
        description={
          isAr
            ? 'إدارة ملفك السيكومتري الشخصي، استعراض سجل اختبارات الشخصية والتوافق والذكاء، مزامنة الحساب السحابي المشفر TLS 1.3، أو حذف جميع بياناتك نهائياً بضغطة واحدة.'
            : 'Manage your psychometric profile, review saved personality and compatibility history, sync across devices, or permanently erase your data anytime.'
        }
        canonicalPath="/profile"
        language={language}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: isAr ? 'ملفي السيكومتري | مرآة القلوب' : 'My Profile | Mirror of Hearts',
          url: 'https://miratalqulub.com/profile',
          inLanguage: language,
        }}
      />

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onBackToHome();
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 border transition ${
            isLight
              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              : 'bg-white/5 hover:bg-white/10 text-gray-200 border-white/10'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-rose-500" />
          <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </a>

        <a
          href="/privacy"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onNavigatePage('privacy');
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 border transition ${
            isLight
              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
              : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 border-emerald-500/30'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy Policy'}</span>
        </a>
      </div>

      {/* Main Profile Header Card */}
      <header
        className={`p-6 sm:p-10 rounded-3xl border shadow-xl space-y-6 ${
          isLight
            ? 'bg-gradient-to-br from-violet-50 via-white to-rose-50/70 border-violet-200 text-slate-900'
            : 'bg-gradient-to-br from-slate-900/95 via-violet-950/25 to-slate-950 border-violet-500/30 text-white'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-rose-600 text-white flex items-center justify-center shadow-lg shrink-0">
              <User className="w-7 h-7" />
            </div>
            <div>
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wider block ${
                  isLight ? 'text-violet-800' : 'text-violet-300'
                }`}
              >
                {isAr ? 'مركز التحكم الشخصي والخصوصية • TLS 1.3' : 'Personal Control & Privacy Hub'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-['Alexandria']">
                {isAr ? 'ملفي السيكومتري وسجلاتي' : 'My Profile & Saved Records'}
              </h1>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-2xl border text-xs font-extrabold self-start sm:self-auto ${
              isLight
                ? 'bg-white border-violet-200 text-violet-900'
                : 'bg-white/5 border-white/10 text-violet-200'
            }`}
          >
            {isAr
              ? `السجلات المحفوظة: ${savedTestsCount}`
              : `Saved Assessments: ${savedTestsCount}`}
          </div>
        </div>

        <p className={`text-sm leading-relaxed max-w-3xl ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {isAr
            ? 'من هنا يمكنك فتح لوحة ملفي الشاملة لاستعراض بصمتك النفسية وتطور نتائجك عبر الزمن، أو إدارة مزامنة الحساب السحابي، أو تنفيذ الحذف الفوري والنهائي لبياناتك في أي وقت.'
            : 'Access your comprehensive psychometric dossier, view saved assessments and longitudinal progress, manage cloud sync, or trigger permanent erasure anytime.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenDashboard('overview');
            }}
            className="p-4 rounded-2xl bg-gradient-to-r from-violet-700 to-rose-700 hover:from-violet-600 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center justify-between shadow-md"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'لوحة ملفي السيكومتري' : 'Open Dossier Dashboard'}</span>
            </span>
            <ArrowRight className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenDashboard('history');
            }}
            className={`p-4 rounded-2xl border font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${
              isLight
                ? 'bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-slate-900 hover:bg-emerald-950/40 border-emerald-500/35 text-emerald-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{isAr ? 'سجل النتائج وتصدير PDF' : 'Saved History & PDF'}</span>
            </span>
            <ArrowRight className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenAuth();
            }}
            className={`p-4 rounded-2xl border font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${
              isLight
                ? 'bg-white hover:bg-sky-50 border-sky-200 text-sky-900'
                : 'bg-slate-900 hover:bg-sky-950/40 border-sky-500/35 text-sky-200'
            }`}
          >
            <span className="flex items-center gap-2">
              {user ? (
                <UserCheck className="w-4 h-4 text-sky-500 shrink-0" />
              ) : (
                <LogIn className="w-4 h-4 text-sky-500 shrink-0" />
              )}
              <span>
                {user
                  ? isAr
                    ? `حسابي: ${user.displayName || user.email?.split('@')[0]}`
                    : `Signed in: ${user.displayName || user.email?.split('@')[0]}`
                  : isAr
                  ? 'تسجيل الدخول / المزامنة'
                  : 'Sign In / Cloud Sync'}
              </span>
            </span>
            <ArrowRight className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </header>

      {/* Quick Test Pathways from Profile */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/personality-tests"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onNavigatePage('personality-tests');
          }}
          className={`p-5 rounded-2xl border flex items-center justify-between gap-4 transition hover:-translate-y-0.5 ${
            isLight
              ? 'bg-white border-slate-200 hover:border-purple-400 text-slate-900'
              : 'bg-slate-900/70 border-white/10 hover:border-purple-400/50 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-500 shrink-0" />
            <div>
              <div className="font-black text-sm font-['Alexandria']">
                {isAr ? 'مقاييس الشخصية (MBTI & Big Five)' : 'Personality Assessments'}
              </div>
              <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {isAr ? 'أضف تحليلاً جديداً إلى ملفك السيكومتري' : 'Add a new personality assessment'}
              </div>
            </div>
          </div>
          <ArrowRight className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
        </a>

        <a
          href="/compatibility"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onNavigatePage('compatibility');
          }}
          className={`p-5 rounded-2xl border flex items-center justify-between gap-4 transition hover:-translate-y-0.5 ${
            isLight
              ? 'bg-white border-slate-200 hover:border-rose-400 text-slate-900'
              : 'bg-slate-900/70 border-white/10 hover:border-rose-400/50 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 shrink-0" />
            <div>
              <div className="font-black text-sm font-['Alexandria']">
                {isAr ? 'كاشف شريك الحياة والتوافق' : 'Partner Compatibility Detector'}
              </div>
              <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {isAr ? 'اكتشف مؤشر توافقك الفكري والعاطفي' : 'Discover your compatibility matrix'}
              </div>
            </div>
          </div>
          <ArrowRight className={`w-4 h-4 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
        </a>
      </section>

      {/* Permanent Data Deletion Section */}
      <section
        className={`p-6 rounded-3xl border space-y-4 ${
          isLight ? 'bg-rose-50/75 border-rose-200 text-rose-950' : 'bg-rose-950/20 border-rose-500/35 text-rose-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-black font-['Alexandria'] flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-500 shrink-0" />
              <span>{isAr ? 'حذف جميع البيانات والسجلات نهائياً' : 'Permanent Data & History Deletion'}</span>
            </h2>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-rose-900/80' : 'text-rose-200/80'}`}>
              {isAr
                ? 'عملاً بمبدأ الحد الأدنى من البيانات وحقوق GDPR/CCPA، يمكنك مسح ملفك وجميع نتائجك المخزنة محلياً وسحابياً فوراً وبشكل نهائي.'
                : 'Under GDPR/CCPA data control rights, you can permanently erase your profile and all stored test history immediately.'}
            </p>
          </div>

          {!confirmDelete && !deleteSuccess && (
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setConfirmDelete(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-extrabold text-xs transition cursor-pointer shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isAr ? 'حذف بياناتي نهائياً' : 'Delete Data Permanently'}</span>
            </button>
          )}
        </div>

        {deleteSuccess && (
          <div
            className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
              isLight
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              {isAr
                ? 'تم حذف جميع بياناتك وسجلاتك المحلية والسحابية نهائياً بنجاح.'
                : 'All local and cloud records have been permanently erased.'}
            </span>
          </div>
        )}

        {confirmDelete && (
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-rose-300 text-rose-950' : 'bg-slate-950/70 border-rose-500/50 text-rose-100'
            }`}
          >
            <div className="flex items-start gap-2 text-xs leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                {isAr
                  ? 'تأكيد الحذف النهائي: سيتم مسح ملفك الشخصي وجميع نتائج اختباراتك فوراً دون إمكانية الاسترجاع.'
                  : 'Confirm permanent deletion: All saved results and profile data will be erased immediately.'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={handlePermanentDelete}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 disabled:opacity-75 text-white font-extrabold text-xs cursor-pointer"
              >
                {isDeleting
                  ? isAr
                    ? 'جاري المسح...'
                    : 'Deleting...'
                  : isAr
                  ? 'نعم، احذف نهائياً'
                  : 'Confirm Permanent Erase'}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                  isLight ? 'bg-slate-100 text-slate-800' : 'bg-slate-800 text-slate-200'
                }`}
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
