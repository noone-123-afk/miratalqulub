import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { getPreResultSimilarTest, IndexedTestCandidate } from '../utils/recommendationEngine';
import { ResolvedTestCard } from '../data/recommendationsMapping';
import {
  triggerTrackedTestNavigation,
  useRecommendationImpression,
} from './TrackedRecommendationCard';
import { soundManager } from '../utils/sound';

interface TestPreResultRecommendationCardProps {
  testId: string;
  sourcePage: string;
  /** When embedded inside AnalyzingStep or standalone pre-result gate */
  embedded?: boolean;
  /** Optional callback to proceed immediately to the final result screen */
  onRevealResult?: () => void;
  /** Optional custom callback to launch the recommended test */
  onLaunchTest?: (testCard: ResolvedTestCard) => boolean | void;
  onBeforeNavigate?: () => void;
  forceDark?: boolean;
}

export const TestPreResultRecommendationCard: React.FC<TestPreResultRecommendationCardProps> = ({
  testId,
  sourcePage,
  embedded = false,
  onRevealResult,
  onLaunchTest,
  onBeforeNavigate,
  forceDark = false,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = !forceDark && theme === 'light';

  const similarTest: IndexedTestCandidate = useMemo(
    () => getPreResultSimilarTest(testId),
    [testId]
  );

  const cardRef = useRecommendationImpression({
    sourcePage,
    sourceContentType: 'test',
    recommendedId: similarTest.id,
    recommendedTitle: isAr ? similarTest.titleAr : similarTest.titleEn,
    recommendedContentType: 'test',
    blockCategory: 'pre_result_similar',
    position: 1,
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const handleLaunchSimilar = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerTrackedTestNavigation({
      testCard: similarTest,
      sourcePage,
      sourceType: 'test',
      blockCategory: 'pre_result_similar',
      position: 1,
      journeyLabel: 'pre_result_similar_to_test',
      onBeforeNavigate,
      onLaunchTest,
    });
  };

  const innerCard = (
    <div
      ref={cardRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 text-start transition-all ${
        isLight
          ? 'bg-gradient-to-br from-indigo-50/90 via-white to-amber-50/60 border-indigo-200 text-slate-900 shadow-sm'
          : 'bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/50 border-indigo-500/35 text-white shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-extrabold ${
            isLight ? 'text-indigo-700' : 'text-amber-300'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{isAr ? 'اختبار مشابه قد يعجبك' : 'Similar Assessment You May Like'}</span>
        </span>
        <span className="text-lg shrink-0" aria-hidden="true">
          {similarTest.icon}
        </span>
      </div>

      <div className="space-y-1.5">
        <h4 className="font-black text-sm sm:text-base font-['Alexandria'] leading-snug">
          {isAr ? similarTest.titleAr : similarTest.titleEn}
        </h4>
        <p
          className={`text-xs leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}
        >
          {isAr
            ? `${similarTest.descriptionAr} · ${similarTest.domainLabelAr}`
            : `${similarTest.descriptionEn} · ${similarTest.domainLabelEn}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <a
          href={similarTest.route}
          onClick={handleLaunchSimilar}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 transition border ${
            isLight
              ? 'bg-white hover:bg-indigo-50 border-indigo-300 text-indigo-800'
              : 'bg-white/[0.06] hover:bg-white/[0.12] border-indigo-400/40 text-indigo-200'
          }`}
        >
          <span>{isAr ? 'استكشف هذا الاختبار المشابه' : 'Explore Similar Test'}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </a>

        {onRevealResult && (
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onRevealResult();
            }}
            className="min-h-[44px] px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md inline-flex items-center gap-2 transition cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isAr ? 'عرض نتيجتي النهائية الآن' : 'View My Final Result'}</span>
          </button>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return innerCard;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        className={`rounded-3xl border p-6 sm:p-8 space-y-6 text-center shadow-2xl ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900/90 border-white/15 text-white'
        }`}
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-500">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isAr
                ? 'تم تحليل إجاباتك واعتماد تقريرك النفسي بنجاح'
                : 'Your responses have been analyzed & validated'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-['Alexandria']">
            {isAr ? 'تقريرك جاهز للعرض!' : 'Your Assessment Report Is Ready!'}
          </h3>
          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr
              ? 'قبل استعراض نتائجك التفصيلية، رشّح لك محرك «مرآة القلوب» مقياساً مكملاً يرتبط مباشرة بملفك.'
              : 'Before viewing your full breakdown, our psychometric engine selected a complementary scale aligned with your profile.'}
          </p>
        </div>

        {innerCard}
      </div>
    </div>
  );
};

export default TestPreResultRecommendationCard;
