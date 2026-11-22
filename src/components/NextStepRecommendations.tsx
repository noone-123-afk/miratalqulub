import React from 'react';
import {
  BookOpen,
  Brain,
  Compass,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Calculator,
} from 'lucide-react';
import {
  NextStepRecommendationBundle,
  ResolvedTestCard,
} from '../data/recommendationsMapping';
import {
  JourneyStepItem,
  LearningJourneyPath,
} from '../utils/recommendationEngine';
import { RecommendationSourceType } from '../utils/recommendationAnalytics';
import {
  triggerTrackedArticleNavigation,
  triggerTrackedNovelNavigation,
  triggerTrackedRouteNavigation,
  triggerTrackedTestNavigation,
  useRecommendationImpression,
} from './TrackedRecommendationCard';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';

interface NextStepRecommendationsProps {
  /** Legacy compatibility bundle (from Compatibility ResultStep) */
  bundle?: NextStepRecommendationBundle;
  /** Dynamic 3-step LearningJourneyPath (from recommendationEngine) */
  journey?: LearningJourneyPath;
  sourcePage?: string;
  sourceType?: RecommendationSourceType;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
  onLaunchTest?: (testCard: ResolvedTestCard) => boolean | void;
  forceDark?: boolean;
}

function bundleToJourney(bundle: NextStepRecommendationBundle): LearningJourneyPath {
  return {
    headingAr: 'خطوتك التالية',
    headingEn: 'Your Next Step',
    subheadingAr:
      'مسار معرفي وتطبيقي منتقى بدقة من مكتبة «مرآة القلوب» استناداً إلى أبرز مؤشرات تقريرك.',
    subheadingEn:
      'Curated directly from the Mirror of Hearts library based on your strongest result dimensions.',
    contextTagAr: 'مسار مخصص من 3 خطوات',
    contextTagEn: '3-Step Tailored Path',
    steps: [
      {
        stepNumber: 1,
        stepRoleAr: 'تفسير علمي مرتبط بنتيجتك',
        stepRoleEn: 'Scientific Context',
        kind: 'article',
        id: bundle.article.id,
        titleAr: bundle.article.titleAr,
        titleEn: bundle.article.titleEn,
        descriptionAr: bundle.article.reasonAr,
        descriptionEn: bundle.article.reasonEn,
        metaLineAr: `مقال مقترح · ${bundle.article.readTimeAr}`,
        metaLineEn: `Suggested Article · ${bundle.article.readTimeEn}`,
        ctaAr: 'اقرأ المقال الآن',
        ctaEn: 'Read Article',
        route: bundle.article.route,
        icon: bundle.article.icon,
        articleId: bundle.article.id,
      },
      {
        stepNumber: 2,
        stepRoleAr: 'مقياس نفسي مكمل',
        stepRoleEn: 'Complementary Assessment',
        kind: 'test',
        id: bundle.test.id,
        titleAr: bundle.test.titleAr,
        titleEn: bundle.test.titleEn,
        descriptionAr: bundle.test.reasonAr,
        descriptionEn: bundle.test.reasonEn,
        metaLineAr: 'اختبار مقترح · تقييم مكمل',
        metaLineEn: 'Suggested Test · Next Scale',
        ctaAr: 'ابدأ الاختبار المكمل',
        ctaEn: 'Start Next Assessment',
        route: bundle.test.route,
        icon: bundle.test.icon,
        testCard: bundle.test,
      },
      {
        stepNumber: 3,
        stepRoleAr: 'تجربة قصصية وتأمل إنساني',
        stepRoleEn: 'Narrative Reflection',
        kind: 'novel',
        id: bundle.novel.kind === 'novel' ? bundle.novel.id : `genre_${bundle.novel.genre}`,
        titleAr: bundle.novel.titleAr,
        titleEn: bundle.novel.titleEn,
        descriptionAr: bundle.novel.reasonAr,
        descriptionEn: bundle.novel.reasonEn,
        metaLineAr:
          bundle.novel.kind === 'novel' ? 'رواية مقترحة · أدب نفسي' : 'تصنيف روايات مقترح',
        metaLineEn:
          bundle.novel.kind === 'novel' ? 'Suggested Novel · Fiction' : 'Suggested Genre',
        ctaAr: bundle.novel.kind === 'novel' ? 'افتح الرواية' : 'تصفح هذا التصنيف',
        ctaEn: bundle.novel.kind === 'novel' ? 'Open Novel' : 'Browse This Genre',
        route: bundle.novel.route,
        icon: bundle.novel.icon,
        novelGenre: bundle.novel.genre,
      },
    ],
  };
}

const JourneyStepCard: React.FC<{
  step: JourneyStepItem;
  sourcePage: string;
  sourceType: RecommendationSourceType;
  journeyTag: string;
  isAr: boolean;
  isRTL: boolean;
  isLight: boolean;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
  onLaunchTest?: (testCard: ResolvedTestCard) => boolean | void;
}> = ({
  step,
  sourcePage,
  sourceType,
  journeyTag,
  isAr,
  isRTL,
  isLight,
  onBeforeNavigate,
  onOpenArticleDirect,
  onLaunchTest,
}) => {
  const ref = useRecommendationImpression({
    sourcePage,
    sourceContentType: sourceType,
    recommendedId: step.id,
    recommendedTitle: isAr ? step.titleAr : step.titleEn,
    recommendedContentType: step.kind,
    blockCategory: 'next_step',
    position: step.stepNumber,
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step.kind === 'test' && step.testCard) {
      triggerTrackedTestNavigation({
        testCard: step.testCard,
        sourcePage,
        sourceType,
        blockCategory: 'next_step',
        position: step.stepNumber,
        journeyLabel: `${journeyTag}_step_${step.stepNumber}`,
        onBeforeNavigate,
        onLaunchTest,
      });
      return;
    }

    if (step.kind === 'novel') {
      triggerTrackedNovelNavigation({
        novelId: step.id,
        route: step.route,
        genre: step.novelGenre,
        title: isAr ? step.titleAr : step.titleEn,
        sourcePage,
        sourceType,
        blockCategory: 'next_step',
        position: step.stepNumber,
        journeyLabel: `${journeyTag}_step_${step.stepNumber}`,
        onBeforeNavigate,
      });
      return;
    }

    if (step.kind === 'article') {
      triggerTrackedArticleNavigation({
        articleId: step.articleId || step.id,
        route: step.route,
        title: isAr ? step.titleAr : step.titleEn,
        sourcePage,
        sourceType,
        blockCategory: 'next_step',
        position: step.stepNumber,
        journeyLabel: `${journeyTag}_step_${step.stepNumber}`,
        onBeforeNavigate,
        onOpenArticleDirect,
      });
      return;
    }

    triggerTrackedRouteNavigation({
      id: step.id,
      route: step.route,
      title: isAr ? step.titleAr : step.titleEn,
      targetType: 'educational',
      sourcePage,
      sourceType,
      blockCategory: 'next_step',
      position: step.stepNumber,
      journeyLabel: `${journeyTag}_step_${step.stepNumber}`,
      onBeforeNavigate,
    });
  };

  const StepKindIcon =
    step.kind === 'article'
      ? BookOpen
      : step.kind === 'test'
      ? Brain
      : step.kind === 'novel'
      ? Layers
      : Calculator;

  const accentClasses =
    step.kind === 'article'
      ? isLight
        ? 'border-sky-200 hover:border-sky-400 bg-white'
        : 'border-sky-500/25 hover:border-sky-400/60 bg-white/[0.04]'
      : step.kind === 'test'
      ? isLight
        ? 'border-purple-200 hover:border-purple-400 bg-white'
        : 'border-purple-500/25 hover:border-purple-400/60 bg-white/[0.04]'
      : isLight
      ? 'border-rose-200 hover:border-rose-400 bg-white'
      : 'border-rose-500/25 hover:border-rose-400/60 bg-white/[0.04]';

  const buttonClasses =
    step.kind === 'article'
      ? isLight
        ? 'bg-sky-600 hover:bg-sky-700 text-white border-sky-600'
        : 'bg-sky-600/25 hover:bg-sky-600/45 text-sky-100 border-sky-400/40'
      : step.kind === 'test'
      ? isLight
        ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600'
        : 'bg-purple-600/25 hover:bg-purple-600/45 text-purple-100 border-purple-400/40'
      : isLight
      ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600'
      : 'bg-rose-600/25 hover:bg-rose-600/45 text-rose-100 border-rose-400/40';

  return (
    <div ref={ref} className="h-full">
      <div
        className={`h-full p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-3.5 transition-all duration-200 shadow-xs ${accentClasses}`}
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
            <span
              className={`inline-flex items-center gap-1.5 ${
                isLight ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-black ${
                  isLight ? 'bg-slate-900 text-white' : 'bg-amber-400 text-slate-950'
                }`}
              >
                {step.stepNumber}
              </span>
              <StepKindIcon className="w-3.5 h-3.5 opacity-80 shrink-0" />
              <span>{isAr ? step.stepRoleAr : step.stepRoleEn}</span>
            </span>
            <span className="text-base shrink-0" aria-hidden="true">
              {step.icon}
            </span>
          </div>

          <h4 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 font-['Alexandria']">
            {isAr ? step.titleAr : step.titleEn}
          </h4>

          <p className={`text-xs leading-relaxed line-clamp-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr ? step.descriptionAr : step.descriptionEn}
          </p>

          <div className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            {isAr ? step.metaLineAr : step.metaLineEn}
          </div>
        </div>

        <a
          href={step.route}
          onClick={handleClick}
          className={`w-full min-h-[44px] py-2.5 px-3.5 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${buttonClasses}`}
        >
          <span>{isAr ? step.ctaAr : step.ctaEn}</span>
          <ArrowIcon className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>
    </div>
  );
};

export const NextStepRecommendations: React.FC<NextStepRecommendationsProps> = ({
  bundle,
  journey,
  sourcePage,
  sourceType = 'result_page',
  onBeforeNavigate,
  onOpenArticleDirect,
  onLaunchTest,
  forceDark = false,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = !forceDark && theme === 'light';

  const resolvedJourney: LearningJourneyPath | null = journey
    ? journey
    : bundle
    ? bundleToJourney(bundle)
    : null;

  if (!resolvedJourney || resolvedJourney.steps.length === 0) return null;

  const activeSourcePage =
    sourcePage || (typeof window !== 'undefined' ? window.location.pathname : '/');

  return (
    <section
      aria-label={isAr ? resolvedJourney.headingAr : resolvedJourney.headingEn}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`rounded-3xl border p-5 sm:p-6 space-y-5 shadow-xl ${
        isLight
          ? 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/50 border-slate-200 text-slate-900'
          : 'bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-indigo-950/50 border-white/15 text-white'
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b pb-3.5 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="font-black text-base sm:text-lg font-['Alexandria']">
              {isAr ? resolvedJourney.headingAr : resolvedJourney.headingEn}
            </h3>
          </div>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr ? resolvedJourney.subheadingAr : resolvedJourney.subheadingEn}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-extrabold self-start sm:self-auto shrink-0 ${
            isLight ? 'text-amber-700' : 'text-amber-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? resolvedJourney.contextTagAr : resolvedJourney.contextTagEn}</span>
        </span>
      </div>

      {/* 3 Connected Learning Journey Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resolvedJourney.steps.map((step) => (
          <JourneyStepCard
            key={`${step.stepNumber}-${step.id}`}
            step={step}
            sourcePage={activeSourcePage}
            sourceType={sourceType}
            journeyTag={resolvedJourney.contextTagEn}
            isAr={isAr}
            isRTL={isRTL}
            isLight={isLight}
            onBeforeNavigate={onBeforeNavigate}
            onOpenArticleDirect={onOpenArticleDirect}
            onLaunchTest={onLaunchTest}
          />
        ))}
      </div>
    </section>
  );
};

export default NextStepRecommendations;
