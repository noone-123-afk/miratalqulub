import React from 'react';
import { Brain, Heart, BookOpen, Trash2 } from 'lucide-react';
import { navigateCleanUrl } from '../../utils/navigation';

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
        <div
          className={`font-extrabold flex items-center gap-1.5 ${
            isLight ? 'text-purple-800' : 'text-purple-300'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>
            {isAr
              ? '١. استكشف ذاتك (مقاييس الشخصية والذكاء)'
              : '1. Explore Yourself (Personality & IQ)'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <a
            href="/personality-tests"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('personality-tests');
                else {
                  navigateCleanUrl('/personality-tests');
                  if (onOpenPsychologyTests) onOpenPsychologyTests();
                }
              });
            }}
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-purple-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            🧠 {isAr ? 'مقاييس الشخصية (MBTI & Big Five)' : 'Personality Lab (MBTI & Big Five)'}
          </a>
          <a
            href="/iq-tests"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('iq-tests');
                else {
                  navigateCleanUrl('/iq-tests');
                  if (onOpenIntelligenceTests) onOpenIntelligenceTests();
                }
              });
            }}
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-purple-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            💡 {isAr ? 'اختبارات الذكاء المتعدد و رافين' : 'Multiple Intelligences & IQ Lab'}
          </a>
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
          <a
            href="/how-results-are-calculated"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() =>
                onNavigatePage
                  ? onNavigatePage('how-results-are-calculated')
                  : navigateCleanUrl('/how-results-are-calculated')
              );
            }}
            className={`p-2.5 rounded-xl border font-bold text-start sm:col-span-2 cursor-pointer ${
              isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
            }`}
          >
            🛡️{' '}
            {isAr
              ? 'كيف يتم حساب نتائج الاختبارات؟ (Big Five • HEXACO • Attachment • EQ)'
              : 'How Are Test Results Calculated? (Big Five • HEXACO • Attachment • EQ)'}
          </a>
        </div>
      </div>

      {/* Pathway 2 Mobile Block: اكتشف التوافق */}
      <div
        className={`p-3 rounded-2xl border space-y-2 ${
          isLight ? 'bg-rose-50/60 border-rose-200' : 'bg-rose-950/25 border-rose-500/30'
        }`}
      >
        <div
          className={`font-extrabold flex items-center gap-1.5 ${
            isLight ? 'text-rose-800' : 'text-rose-300'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>
            {isAr
              ? '٢. اكتشف التوافق (كاشف التوافق و The Blind Date)'
              : '2. Discover Compatibility & The Blind Date'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <a
            href="/compatibility"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('compatibility');
                else navigateCleanUrl('/compatibility');
                if (onReset) onReset();
              });
            }}
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-rose-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            💖 {isAr ? 'كاشف التوافق الفكري والعاطفي' : 'Partner Compatibility Calculator'}
          </a>
          <a
            href="/tools"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('tools');
                else {
                  navigateCleanUrl('/tools');
                  if (onOpenBlindDate) onOpenBlindDate();
                }
              });
            }}
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-rose-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            🪄 {isAr ? 'الأدوات التفاعلية و The Blind Date' : 'Interactive Tools & Blind Date'}
          </a>
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
        <div
          className={`font-extrabold flex items-center gap-1.5 ${
            isLight ? 'text-emerald-800' : 'text-emerald-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>
            {isAr
              ? '٣. هدية الواحة المعرفية والمقالات والروايات'
              : '3. Knowledge Oasis: Articles & Novels'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <a
            href="/articles"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('articles');
                else {
                  navigateCleanUrl('/articles');
                  if (onOpenArticles) onOpenArticles();
                }
              });
            }}
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-emerald-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            📚 {isAr ? 'موسوعة المقالات والأبحاث المحكّمة' : 'Clinical Articles & Research'}
          </a>
          <a
            href="/novels"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('novels');
                else {
                  navigateCleanUrl('/novels');
                  if (onOpenNovels) onOpenNovels();
                }
              });
            }}
            className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-emerald-200 text-slate-800'
                : 'bg-slate-900/90 border-white/10 text-slate-100'
            }`}
          >
            🕵️‍♂️ {isAr ? 'مكتبة الروايات والتحقيقات' : 'Novels & Forensic Library'}
          </a>
        </div>
      </div>

      {/* Mobile Profile & Permanent Data Deletion Block */}
      <div
        className={`p-3 rounded-2xl border space-y-2 ${
          isLight ? 'bg-violet-50/70 border-violet-200' : 'bg-violet-950/30 border-violet-500/30'
        }`}
      >
        <div
          className={`font-extrabold flex items-center justify-between ${
            isLight ? 'text-violet-800' : 'text-violet-300'
          }`}
        >
          <span>👤 {isAr ? 'ملفي والتحكم بالبيانات' : 'My Profile & Data Control'}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <a
            href="/profile"
            onClick={(e) => {
              e.preventDefault();
              onNavAction(() => {
                if (onNavigatePage) onNavigatePage('profile');
                else {
                  navigateCleanUrl('/profile');
                  if (onOpenUserDashboard) onOpenUserDashboard();
                }
              });
            }}
            className={`p-2 rounded-xl border font-bold text-start cursor-pointer ${
              isLight
                ? 'bg-white border-violet-200 text-slate-800'
                : 'bg-slate-900 border-white/10 text-slate-100'
            }`}
          >
            {isAr ? 'صفحة ملفي الشامل' : 'Profile Page'}
          </a>
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
            className={`w-full p-2 rounded-xl border font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              isLight
                ? 'bg-rose-50 border-rose-300 text-rose-800'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>
              {isAr ? 'حذف جميع بياناتي نهائياً' : 'Delete All My Data Permanently'}
            </span>
          </button>
        ) : (
          <div
            className={`p-2.5 rounded-xl border space-y-2 ${
              isLight
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-100'
            }`}
          >
            <p className="text-[11px] font-bold">
              {isAr
                ? 'تأكيد المسح النهائي لجميع البيانات المحلية والسحابية؟'
                : 'Confirm permanent erasure of all local and cloud data?'}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPermanentDeleteData}
                className="flex-1 py-1.5 rounded-lg bg-rose-700 text-white font-bold cursor-pointer"
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
