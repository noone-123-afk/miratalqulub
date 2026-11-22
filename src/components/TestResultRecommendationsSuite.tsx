import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import {
  getTestResultLearningJourney,
  getTryAnotherTests,
  IndexedTestCandidate,
} from '../utils/recommendationEngine';
import {
  NextStepRecommendationBundle,
  ResolvedTestCard,
} from '../data/recommendationsMapping';
import {
  triggerTrackedTestNavigation,
  useRecommendationImpression,
} from './TrackedRecommendationCard';
import { NextStepRecommendations } from './NextStepRecommendations';
import { ContextualLinksStrip } from './ContextualLinksStrip';
import { SuggestedContentMixSection } from './SuggestedContentMixSection';

interface TestResultRecommendationsSuiteProps {
  testId: string;
  sourcePage: string;
  /** Optional text hint from result (e.g., personality archetype, dominant EQ dimension) */
  resultHintText?: string;
  /** Legacy compatibility bundle if caller already resolved one */
  legacyBundle?: NextStepRecommendationBundle;
  forceDark?: boolean;
  onBeforeNavigate?: () => void;
  onLaunchTest?: (testCard: ResolvedTestCard) => boolean | void;
  /** How many "جرّب اختباراً آخر" cards (3-6) */
  tryAnotherCount?: number;
}

const TryAnotherTestCard: React.FC<{
  test: IndexedTestCandidate;
  index: number;
  sourcePage: string;
  isAr: boolean;
  isRTL: boolean;
  isLight: boolean;
  onBeforeNavigate?: () => void;
  onLaunchTest?: (testCard: ResolvedTestCard) => boolean | void;
}> = ({
  test,
  index,
  sourcePage,
  isAr,
  isRTL,
  isLight,
  onBeforeNavigate,
  onLaunchTest,
}) => {
  const ref = useRecommendationImpression({
    sourcePage,
    sourceContentType: 'result_page',
    recommendedId: test.id,
    recommendedTitle: isAr ? test.titleAr : test.titleEn,
    recommendedContentType: 'test',
    blockCategory: 'try_another_test',
    position: index + 1,
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div ref={ref} className="h-full">
      <a
        href={test.route}
        onClick={(e) => {
          e.preventDefault();
          triggerTrackedTestNavigation({
            testCard: test,
            sourcePage,
            sourceType: 'result_page',
            blockCategory: 'try_another_test',
            position: index + 1,
            onBeforeNavigate,
            onLaunchTest,
          });
        }}
        className={`group h-full p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 ${
          isLight
            ? 'bg-white hover:bg-indigo-50/40 border-slate-200 hover:border-indigo-300 shadow-xs text-slate-900'
            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-indigo-400/50 text-white'
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
            <span className={isLight ? 'text-indigo-700' : 'text-indigo-300'}>
              {isAr ? test.domainLabelAr : test.domainLabelEn}
              {' · '}
              {isAr ? test.audienceAr : test.audienceEn}
            </span>
            <span className="text-lg shrink-0" aria-hidden="true">
              {test.icon}
            </span>
          </div>

          <h4 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-indigo-500 dark:group-hover:text-cyan-300 transition-colors font-['Alexandria']">
            {isAr ? test.titleAr : test.titleEn}
          </h4>

          <p className={`text-xs leading-relaxed line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr ? test.descriptionAr : test.descriptionEn}
          </p>
        </div>

        <div
          className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-extrabold flex items-center justify-between transition ${
            isLight
              ? 'bg-indigo-50 group-hover:bg-indigo-600 border-indigo-200 text-indigo-800 group-hover:text-white'
              : 'bg-indigo-500/15 group-hover:bg-indigo-600 border-indigo-500/30 text-indigo-200 group-hover:text-white'
          }`}
        >
          <span>{isAr ? 'ابدأ هذا الاختبار' : 'Start Assessment'}</span>
          <ArrowIcon className="w-4 h-4 shrink-0" />
        </div>
      </a>
    </div>
  );
};

export const TestResultRecommendationsSuite: React.FC<TestResultRecommendationsSuiteProps> = ({
  testId,
  sourcePage,
  resultHintText = '',
  legacyBundle,
  forceDark = false,
  onBeforeNavigate,
  onLaunchTest,
  tryAnotherCount = 4,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = !forceDark && theme === 'light';

  const journey = useMemo(
    () => getTestResultLearningJourney(testId, resultHintText),
    [testId, resultHintText]
  );

  const tryAnotherTests = useMemo(
    () => getTryAnotherTests(testId, tryAnotherCount),
    [testId, tryAnotherCount]
  );

  return (
    <div className="space-y-6 pt-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Personalized "خطوتك التالية" User Journey */}
      <NextStepRecommendations
        bundle={legacyBundle}
        journey={legacyBundle ? undefined : journey}
        sourcePage={sourcePage}
        sourceType="result_page"
        forceDark={forceDark}
        onBeforeNavigate={onBeforeNavigate}
        onLaunchTest={onLaunchTest}
      />

      {/* Contextual Internal Links Inside Test Result Pages (2–5 scientific guides & explanatory articles) */}
      <ContextualLinksStrip
        testId={testId}
        sourcePage={sourcePage}
        sourceType="result_page"
        count={4}
        forceDark={forceDark}
        onBeforeNavigate={onBeforeNavigate}
        titleAr="مراجع علمية ومقالات مفسّرة لأبعاد نتيجتك"
        titleEn="Scientific Explanations & Guides Behind Your Result"
      />

      {/* Requirement 4: "جرّب اختباراً آخر" (3–6 Related Tests Below Every Result Page) */}
      {tryAnotherTests.length > 0 && (
        <section
          aria-label={isAr ? 'جرّب اختباراً آخر' : 'Try Another Test'}
          className={`rounded-3xl border p-5 sm:p-6 space-y-4 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-slate-900/75 border-white/10 text-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-500 shrink-0" />
                <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                  {isAr ? 'جرّب اختباراً آخر' : 'Try Another Test'}
                </h3>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {isAr
                  ? 'مقاييس نفسية وعلائقية مختارة من نفس المجال السيكومتري لاستكمال صورتك الذاتية.'
                  : 'Psychometric assessments selected from matching personality dimensions and target audiences.'}
              </p>
            </div>

            <span className={`inline-flex items-center gap-1 text-xs font-bold ${isLight ? 'text-indigo-700' : 'text-indigo-300'}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? `${tryAnotherTests.length} اختبارات مرشّحة`
                  : `${tryAnotherTests.length} Recommended Scales`}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tryAnotherTests.map((tst, idx) => (
              <TryAnotherTestCard
                key={tst.id}
                test={tst}
                index={idx}
                sourcePage={sourcePage}
                isAr={isAr}
                isRTL={isRTL}
                isLight={isLight}
                onBeforeNavigate={onBeforeNavigate}
                onLaunchTest={onLaunchTest}
              />
            ))}
          </div>
        </section>
      )}

      {/* Requirement 5: "محتوى مقترح لك" Mixed Content Discovery */}
      <SuggestedContentMixSection
        sourcePage={sourcePage}
        sourceType="result_page"
        excludeIds={[testId]}
        keywordsText={resultHintText}
        count={6}
        variant="you_may_also_like"
        forceDark={forceDark}
        onBeforeNavigate={onBeforeNavigate}
      />
    </div>
  );
};

export default TestResultRecommendationsSuite;
