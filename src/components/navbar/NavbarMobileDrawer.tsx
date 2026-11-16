import React from 'react';
import { Brain, Heart, BookOpen, Trash2 } from 'lucide-react';

export interface NavbarMobileDrawerProps {
  isAr: boolean;
  isLight: boolean;
  confirmDeleteStep: boolean;
  onSetConfirmDeleteStep: (val: boolean) => void;
  onPermanentDeleteData: () => void;
  onNavAction: (callback?: () => void) => void;
  onNavigatePage?: (page: string) => void;
  onReset?: () => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenBlindDate?: () => void;
  onOpenArticles?: () => void;
  onOpenNovels?: () => void;
  onOpenUserDashboard?: () => void;
  onOpenHistory?: () => void;
}

export const NavbarMobileDrawer: React.FC<NavbarMobileDrawerProps> = ({
  isAr,
  isLight,
  confirmDeleteStep,
  onSetConfirmDeleteStep,
  onPermanentDeleteData,
  onNavAction,
  onNavigatePage,
  onReset,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenBlindDate,
  onOpenArticles,
  onOpenNovels,
  onOpenUserDashboard,
  onOpenHistory,
}) => {
  return (
    <div
      className={`lg:hidden mt-3 pt-3 border-t overflow-hidden text-xs space-y-3 ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}
    >
      {/* Pathway 1 Mobile Block: استكشف ذاتك */}
      <div
        className={`p-3 rounded-2xl border space-y-2 ${
          isLight ? 'bg-purple-50/60 border-purple-200' : 'bg-purple-950/25 border-purple-500/30'
        }`}
      >
        <div className="font-extrabold text-purple-500 flex items-center gap-1.5">
          <Brain className="w-4 h-4" />
          <span>
            {isAr
              ? '١. استكشف ذاتك (مقاييس الشخصية والذكاء)'
              : '1. Explore Yourself (Personality & IQ)'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() =>
              onNavAction(() =>
                onNavigatePage
                  ? onNavigatePage('personality-tests')
                  : onOpenPsychologyTests && onOpenPsychologyTests()
              )
            }
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-purple-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            🧠 {isAr ? 'مقاييس الشخصية (MBTI & Big Five)' : 'Personality Lab (MBTI & Big Five)'}
          </button>
          {onOpenIntelligenceTests && (
            <button
              type="button"
              onClick={() => onNavAction(onOpenIntelligenceTests)}
              className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                isLight
                  ? 'bg-white border-purple-200 text-slate-800'
                  : 'bg-slate-900/90 border-white/10 text-slate-100'
              }`}
            >
              💡 {isAr ? 'اختبارات الذكاء المتعدد و رافين' : 'Multiple Intelligences & IQ Lab'}
            </button>
          )}
          {onOpenPsychologyTests && (
            <button
              type="button"
              onClick={() => onNavAction(onOpenPsychologyTests)}
              className={`p-2.5 rounded-xl border font-bold text-start sm:col-span-2 cursor-pointer ${
                isLight
                  ? 'bg-white border-purple-200 text-slate-800'
                  : 'bg-slate-900/90 border-white/10 text-slate-100'
              }`}
            >
              📊{' '}
              {isAr
                ? 'المقاييس الإكلينيكية المتخصصة (16PF • EPQ • التعلق)'
                : 'Specialized Clinical Scales (16PF • EPQ)'}
            </button>
          )}
        </div>
      </div>

      {/* Pathway 2 Mobile Block: اكتشف التوافق */}
      <div
        className={`p-3 rounded-2xl border space-y-2 ${
          isLight ? 'bg-rose-50/60 border-rose-200' : 'bg-rose-950/25 border-rose-500/30'
        }`}
      >
        <div className="font-extrabold text-rose-500 flex items-center gap-1.5">
          <Heart className="w-4 h-4" />
          <span>
            {isAr
              ? '٢. اكتشف التوافق (كاشف التوافق و The Blind Date)'
              : '2. Discover Compatibility & The Blind Date'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() =>
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('compatibility');
                if (onReset) onReset();
              })
            }
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-rose-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            💖 {isAr ? 'كاشف التوافق الفكري والعاطفي' : 'Partner Compatibility Calculator'}
          </button>
          {onOpenBlindDate && (
            <button
              type="button"
              onClick={() => onNavAction(onOpenBlindDate)}
              className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                isLight
                  ? 'bg-white border-rose-200 text-slate-800'
                  : 'bg-slate-900/90 border-white/10 text-slate-100'
              }`}
            >
              💬 {isAr ? 'اللقاء الأعمى (The Blind Date)' : 'The Blind Date Experience'}
            </button>
          )}
        </div>
      </div>

      {/* Pathway 3 Mobile Block: هدية الواحة المعرفية والمقالات والروايات */}
      <div
        className={`p-3 rounded-2xl border space-y-2 ${
          isLight
            ? 'bg-emerald-50/60 border-emerald-200'
            : 'bg-emerald-950/25 border-emerald-500/30'
        }`}
      >
        <div className="font-extrabold text-emerald-500 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>
            {isAr
              ? '٣. هدية الواحة المعرفية والمقالات والروايات'
              : '3. Knowledge Oasis: Articles & Novels'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() =>
              onNavAction(() =>
                onNavigatePage
                  ? onNavigatePage('articles')
                  : onOpenArticles && onOpenArticles()
              )
            }
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-emerald-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            📚 {isAr ? 'موسوعة المقالات والأبحاث المحكّمة' : 'Clinical Articles & Research'}
          </button>
          <button
            type="button"
            onClick={() =>
              onNavAction(() =>
                onNavigatePage
                  ? onNavigatePage('novels')
                  : onOpenNovels && onOpenNovels()
              )
            }
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-emerald-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            🕵️‍♂️ {isAr ? 'مكتبة الروايات والتحقيقات' : 'Novels & Forensic Library'}
          </button>
        </div>
      </div>

      {/* Mobile Profile & Permanent Data Deletion Block */}
      <div
        className={`p-3 rounded-2xl border space-y-2 ${
          isLight ? 'bg-violet-50/70 border-violet-200' : 'bg-violet-950/30 border-violet-500/30'
        }`}
      >
        <div className="font-extrabold text-violet-500 flex items-center justify-between">
          <span>👤 {isAr ? 'ملفي والتحكم بالبيانات' : 'My Profile & Data Control'}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {onOpenUserDashboard && (
            <button
              type="button"
              onClick={() => onNavAction(onOpenUserDashboard)}
              className={`p-2 rounded-xl border font-bold text-start cursor-pointer ${
                isLight
                  ? 'bg-white border-violet-200 text-slate-800'
                  : 'bg-slate-900 border-white/10 text-slate-100'
              }`}
            >
              {isAr ? 'لوحة ملفي الشامل' : 'Profile Dashboard'}
            </button>
          )}
          {onOpenHistory && (
            <button
              type="button"
              onClick={() => onNavAction(onOpenHistory)}
              className={`p-2 rounded-xl border font-bold text-start cursor-pointer ${
                isLight
                  ? 'bg-white border-violet-200 text-slate-800'
                  : 'bg-slate-900 border-white/10 text-slate-100'
              }`}
            >
              {isAr ? 'سجل نتائجي المحفوظة' : 'Saved History'}
            </button>
          )}
        </div>

        {/* Permanent Delete in Mobile */}
        {!confirmDeleteStep ? (
          <button
            type="button"
            onClick={() => onSetConfirmDeleteStep(true)}
            className="w-full p-2 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-500 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>
              {isAr ? 'حذف جميع بياناتي نهائياً' : 'Delete All My Data Permanently'}
            </span>
          </button>
        ) : (
          <div className="p-2.5 rounded-xl bg-rose-600/15 border border-rose-500/40 space-y-2">
            <p className="text-[11px] font-bold text-rose-500">
              {isAr
                ? 'تأكيد المسح النهائي لجميع البيانات المحلية والسحابية؟'
                : 'Confirm permanent erasure of all local and cloud data?'}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPermanentDeleteData}
                className="flex-1 py-1.5 rounded-lg bg-rose-600 text-white font-bold cursor-pointer"
              >
                {isAr ? 'نعم، احذف نهائياً' : 'Yes, Delete'}
              </button>
              <button
                type="button"
                onClick={() => onSetConfirmDeleteStep(false)}
                className="py-1.5 px-3 rounded-lg bg-slate-700 text-white font-bold cursor-pointer"
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
