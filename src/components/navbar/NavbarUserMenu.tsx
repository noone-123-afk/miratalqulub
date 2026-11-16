import React from 'react';
import {
  User,
  FileText,
  UserCheck,
  LogIn,
  CheckCircle2,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';
import { soundManager } from '../../utils/sound';

export interface NavbarUserMenuProps {
  isAr: boolean;
  isLight: boolean;
  user: FirebaseUser | null;
  confirmDeleteStep: boolean;
  isDeletingData: boolean;
  deleteSuccessToast: boolean;
  onSetConfirmDeleteStep: (val: boolean) => void;
  onPermanentDeleteData: () => void;
  onNavAction: (callback?: () => void) => void;
  onOpenUserDashboard?: () => void;
  onOpenHistory?: () => void;
  onOpenAuth?: () => void;
}

export const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({
  isAr,
  isLight,
  user,
  confirmDeleteStep,
  isDeletingData,
  deleteSuccessToast,
  onSetConfirmDeleteStep,
  onPermanentDeleteData,
  onNavAction,
  onOpenUserDashboard,
  onOpenHistory,
  onOpenAuth,
}) => {
  return (
    <div
      className={`absolute top-full mt-2 w-80 rounded-2xl border p-3 shadow-2xl z-50 space-y-2 ${
        isAr ? 'left-0 text-right' : 'right-0 text-left'
      } ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-950/95 border-violet-500/40 text-slate-100 backdrop-blur-xl'
      }`}
    >
      <div
        className={`pb-2 border-b flex items-center justify-between ${
          isLight ? 'border-slate-100' : 'border-white/10'
        }`}
      >
        <span
          className={`text-xs font-extrabold ${
            isLight ? 'text-violet-800' : 'text-violet-300'
          }`}
        >
          {isAr ? 'مركز التحكم الشخصي والخصوصية' : 'Personal Profile & Data Control'}
        </span>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
            isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/15 text-emerald-300'
          }`}
        >
          TLS 1.3
        </span>
      </div>

      {/* 1. Open User Psychometric Dashboard */}
      {onOpenUserDashboard && (
        <button
          type="button"
          onClick={() => onNavAction(onOpenUserDashboard)}
          className={`w-full p-2.5 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
            isLight ? 'hover:bg-violet-50 text-slate-800' : 'hover:bg-white/10 text-white'
          }`}
        >
          <User className="w-4 h-4 text-violet-500 shrink-0" />
          <div>
            <div>{isAr ? 'لوحة ملفي السيكومتري الشامل' : 'My Psychometric Dashboard'}</div>
            <div
              className={`text-[10px] font-normal ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {isAr
                ? 'استعراض بصمتك المعرفية وتقاريرك وتفضيلاتك'
                : 'View your cognitive fingerprint, reports & preferences'}
            </div>
          </div>
        </button>
      )}

      {/* 2. Saved Test History */}
      {onOpenHistory && (
        <button
          type="button"
          onClick={() => onNavAction(onOpenHistory)}
          className={`w-full p-2.5 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
            isLight ? 'hover:bg-emerald-50 text-slate-800' : 'hover:bg-white/10 text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
          <div>
            <div>
              {isAr
                ? 'سجل نتائجي المحفوظة وتصدير PDF'
                : 'Saved Results History & PDF Export'}
            </div>
            <div
              className={`text-[10px] font-normal ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {isAr
                ? 'جميع اختبارات الشخصية والذكاء والتوافق السابقة'
                : 'Access all past personality, IQ & compatibility records'}
            </div>
          </div>
        </button>
      )}

      {/* 3. Cloud Account / Sign In */}
      {onOpenAuth && (
        <button
          type="button"
          onClick={() => onNavAction(onOpenAuth)}
          className={`w-full p-2.5 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
            isLight ? 'hover:bg-sky-50 text-slate-800' : 'hover:bg-white/10 text-white'
          }`}
        >
          {user ? (
            <UserCheck className="w-4 h-4 text-sky-500 shrink-0" />
          ) : (
            <LogIn className="w-4 h-4 text-sky-500 shrink-0" />
          )}
          <div>
            <div>
              {user
                ? isAr
                  ? `حسابي المتصل (${user.displayName || user.email?.split('@')[0]})`
                  : `Connected Account (${user.displayName || user.email?.split('@')[0]})`
                : isAr
                ? 'تسجيل الدخول / مزامنة الحساب السحابي'
                : 'Sign In / Cloud Account Sync'}
            </div>
            <div
              className={`text-[10px] font-normal ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {isAr
                ? 'لحفظ سجلاتك عبر أجهزتك المختلفة بأمان'
                : 'Securely synchronize your records across devices'}
            </div>
          </div>
        </button>
      )}

      {/* 4. PERMANENT DATA DELETION OPTION */}
      <div className={`pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
        {deleteSuccessToast ? (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              {isAr
                ? 'تم حذف جميع بياناتك وسجلاتك نهائياً بنجاح.'
                : 'All your personal data and records have been permanently deleted.'}
            </span>
          </div>
        ) : !confirmDeleteStep ? (
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onSetConfirmDeleteStep(true);
            }}
            className={`w-full p-2.5 rounded-xl border transition flex items-center justify-between text-xs font-bold cursor-pointer ${
              isLight
                ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-500 shrink-0" />
              <span>
                {isAr ? 'حذف بياناتي وسجلاتي نهائياً' : 'Delete My Data Permanently'}
              </span>
            </div>
          </button>
        ) : (
          <div
            className={`p-3 rounded-xl border space-y-2.5 ${
              isLight
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-rose-950/60 border-rose-500/50 text-rose-100'
            }`}
          >
            <div className="flex items-start gap-2 text-[11px] leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                {isAr
                  ? 'هل أنت متأكد؟ سيتم مسح جميع نتائجك المحفوظة وملفك الشخصي من المتصفح والسحابة نهائياً ولا يمكن التراجع.'
                  : 'Are you sure? All saved test results and profile data will be permanently erased from local storage and cloud.'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isDeletingData}
                onClick={onPermanentDeleteData}
                className="flex-1 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition cursor-pointer"
              >
                {isDeletingData
                  ? isAr
                    ? 'جاري الحذف...'
                    : 'Deleting...'
                  : isAr
                  ? 'نعم، احذف نهائياً'
                  : 'Yes, Delete Forever'}
              </button>
              <button
                type="button"
                onClick={() => onSetConfirmDeleteStep(false)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isLight
                    ? 'bg-white border border-slate-300 text-slate-700'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
