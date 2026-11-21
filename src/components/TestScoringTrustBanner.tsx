import React, { useState, lazy, Suspense } from 'react';
import { Calculator, ShieldCheck, ExternalLink, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { navigateCleanUrl } from '../utils/navigation';

const LazyHowTestResultsCalculatedPage = lazy(() =>
  import('../pages/HowTestResultsCalculatedPage').then((m) => ({
    default: m.HowTestResultsCalculatedPage,
  }))
);

export interface TestScoringTrustBannerProps {
  onNavigatePage?: (page: string) => void;
  compact?: boolean;
}

export const TestScoringTrustBanner: React.FC<TestScoringTrustBannerProps> = ({
  onNavigatePage,
  compact = false,
}) => {
  const { language } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openFullPage = () => {
    soundManager.playTap();
    if (onNavigatePage) {
      onNavigatePage('how-results-are-calculated');
    } else {
      navigateCleanUrl('/how-results-are-calculated');
    }
  };

  return (
    <>
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className={`rounded-2xl border transition-all ${
          compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-6'
        } ${
          isLight
            ? 'bg-gradient-to-r from-indigo-50/90 via-white to-emerald-50/90 border-indigo-200 text-slate-900 shadow-sm'
            : 'bg-gradient-to-r from-indigo-950/40 via-slate-900/90 to-emerald-950/35 border-indigo-500/30 text-slate-100 shadow-md'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAr ? 'شفافية علمية 100% لبناء الثقة' : '100% Scientific Scoring Transparency'}</span>
              </span>

              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
                {['Big Five', 'HEXACO', 'Attachment', 'Emotional Intelligence'].map((badge) => (
                  <span
                    key={badge}
                    className={`px-2 py-0.5 rounded-md border ${
                      isLight
                        ? 'bg-white text-indigo-900 border-indigo-200'
                        : 'bg-slate-800/90 text-indigo-200 border-white/10'
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <h3
              className={`font-black font-['Alexandria'] flex items-center gap-2 ${
                compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
              } ${isLight ? 'text-slate-900' : 'text-white'}`}
            >
              <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>
                {isAr
                  ? 'كيف يتم حساب نتائج الاختبارات؟'
                  : 'How Are Test Results Calculated?'}
              </span>
            </h3>

            {!compact && (
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {isAr
                  ? 'تعرف بطريقة مبسطة وواضحة على كيفية تحويل إجاباتك إلى نسب مئوية دقيقة عبر مقاييس العوامل الخمسة (Big Five)، هيكساكو (HEXACO)، أنماط التعلق (Attachment)، والذكاء العاطفي (EQ) دون أي عشوائية.'
                  : 'Discover in simple terms how your answers are mathematically converted into accurate scores across Big Five, HEXACO, Attachment Styles, and Emotional Intelligence.'}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setIsModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-extrabold text-xs transition cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? 'عرض طريقة حساب النتائج (مبسط)'
                  : 'View Simplified Scoring Guide'}
              </span>
            </button>

            <a
              href="/how-results-are-calculated"
              onClick={(e) => {
                e.preventDefault();
                openFullPage();
              }}
              className={`px-3.5 py-2.5 rounded-xl border font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 border-white/15 text-slate-200'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isAr ? 'فتح الصفحة الكاملة' : 'Open Full Page'}</span>
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Suspense fallback={null}>
          <LazyHowTestResultsCalculatedPage
            isModal={true}
            onCloseModal={() => setIsModalOpen(false)}
            onNavigatePage={(page) => {
              setIsModalOpen(false);
              if (onNavigatePage) onNavigatePage(page);
            }}
          />
        </Suspense>
      )}
    </>
  );
};
