import React from 'react';
import { Crown, ChevronDown, ShieldCheck, Cloud, DollarSign, BarChart3 } from 'lucide-react';
import type { User } from 'firebase/auth';

export interface NavbarOwnerControlsProps {
  isAr: boolean;
  isLight: boolean;
  isOpen: boolean;
  user: User | null;
  onToggle: () => void;
  onNavAction: (callback?: () => void) => void;
  onNavigatePage?: (page: string) => void;
  onOpenDomainHosting?: () => void;
  onOpenAdSense?: () => void;
  onOpenAnalytics?: () => void;
}

export const NavbarOwnerControls: React.FC<NavbarOwnerControlsProps> = ({
  isAr,
  isLight,
  isOpen,
  user,
  onToggle,
  onNavAction,
  onNavigatePage,
  onOpenDomainHosting,
  onOpenAdSense,
  onOpenAnalytics,
}) => {
  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={isAr ? 'قائمة إدارة المنصة وتحميل الملفات' : 'Platform Admin & Files Menu'}
        title={isAr ? 'قائمة إدارة المنصة وتحميل الملفات' : 'Platform Admin & Files Menu'}
        className={`flex items-center gap-1 px-2.5 py-1.5 sm:py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
          isLight
            ? 'bg-amber-50 border-amber-300 text-amber-900'
            : 'bg-amber-500/20 border-amber-400/50 text-amber-300'
        }`}
      >
        <Crown className="w-3.5 h-3.5 text-amber-500" />
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-72 p-2.5 rounded-2xl border shadow-2xl z-50 space-y-1.5 ${
            isAr ? 'left-0 text-right' : 'right-0 text-left'
          } ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-slate-950 border-amber-500/40 text-slate-100'
          }`}
        >
          <button
            type="button"
            onClick={() =>
              onNavAction(async () => {
                try {
                  const { downloadOwnerProtectedZip } = await import('../../utils/ownerDownload');
                  await downloadOwnerProtectedZip(
                    '/api/download-cloudflare-zip',
                    'miratalqulub-cloudflare-ready.zip',
                    user
                  );
                } catch {}
              })
            }
            className="w-full p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 flex items-center gap-2 text-xs font-extrabold cursor-pointer text-start"
          >
            <span>📦</span>
            <span>
              {isAr ? 'تحميل ملفات الموقع للنشر (ZIP)' : 'Download Ready Website (ZIP)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              onNavAction(async () => {
                try {
                  const { downloadOwnerProtectedZip } = await import('../../utils/ownerDownload');
                  await downloadOwnerProtectedZip(
                    '/api/download-source-zip',
                    'miratalqulub-full-source.zip',
                    user
                  );
                } catch {}
              })
            }
            className="w-full p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 text-xs font-bold cursor-pointer text-start"
          >
            <span>💻</span>
            <span>
              {isAr ? 'تحميل الكود المصدري الكامل (ZIP)' : 'Download Full Source Code (ZIP)'}
            </span>
          </button>

          {onNavigatePage && (
            <button
              type="button"
              onClick={() => onNavAction(() => onNavigatePage('admin-cms'))}
              className="w-full p-2 rounded-xl hover:bg-rose-500/15 text-rose-500 flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'مركز إدارة المحتوى والمنصة' : 'CMS & Platform Audit'}</span>
            </button>
          )}

          {onOpenDomainHosting && (
            <button
              type="button"
              onClick={() => onNavAction(onOpenDomainHosting)}
              className="w-full p-2 rounded-xl hover:bg-blue-500/15 text-blue-500 flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <Cloud className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'الاستضافة والدومين وتحميل الحزمة' : 'Hosting & Domain'}</span>
            </button>
          )}

          {onOpenAnalytics && (
            <button
              type="button"
              onClick={() => onNavAction(onOpenAnalytics)}
              className="w-full p-2 rounded-xl hover:bg-emerald-500/15 text-emerald-500 flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'إحصائيات الزوار' : 'Visitor Analytics'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
