import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import {
  getPopularContentRecommendations,
  getSuggestedContentMix,
  SuggestedMixItem,
  TopicClusterId,
} from '../utils/recommendationEngine';
import {
  RecommendationBlockCategory,
  RecommendationSourceType,
} from '../utils/recommendationAnalytics';
import {
  triggerTrackedArticleNavigation,
  triggerTrackedNovelNavigation,
  triggerTrackedTestNavigation,
  useRecommendationImpression,
} from './TrackedRecommendationCard';

interface SuggestedContentMixSectionProps {
  sourcePage: string;
  sourceType: RecommendationSourceType;
  clusters?: TopicClusterId[];
  excludeIds?: string[];
  excludeRoutes?: string[];
  keywordsText?: string;
  count?: number;
  variant?: 'you_may_also_like' | 'popular_content';
  headingAr?: string;
  headingEn?: string;
  subheadingAr?: string;
  subheadingEn?: string;
  forceDark?: boolean;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
}

const MixItemCard: React.FC<{
  item: SuggestedMixItem;
  index: number;
  sourcePage: string;
  sourceType: RecommendationSourceType;
  blockCategory: RecommendationBlockCategory;
  isAr: boolean;
  isRTL: boolean;
  isLight: boolean;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
}> = ({
  item,
  index,
  sourcePage,
  sourceType,
  blockCategory,
  isAr,
  isRTL,
  isLight,
  onBeforeNavigate,
  onOpenArticleDirect,
}) => {
  const ref = useRecommendationImpression({
    sourcePage,
    sourceContentType: sourceType,
    recommendedId: item.id,
    recommendedTitle: isAr ? item.titleAr : item.titleEn,
    recommendedContentType: item.kind,
    blockCategory,
    position: index + 1,
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.kind === 'test' && item.testCard) {
      triggerTrackedTestNavigation({
        testCard: item.testCard,
        sourcePage,
        sourceType,
        blockCategory,
        position: index + 1,
        onBeforeNavigate,
      });
      return;
    }
    if (item.kind === 'novel') {
      triggerTrackedNovelNavigation({
        novelId: item.id,
        route: item.route,
        genre: item.novelGenre,
        title: isAr ? item.titleAr : item.titleEn,
        sourcePage,
        sourceType,
        blockCategory,
        position: index + 1,
        onBeforeNavigate,
      });
      return;
    }
    triggerTrackedArticleNavigation({
      articleId: item.articleId || item.id,
      route: item.route,
      title: isAr ? item.titleAr : item.titleEn,
      sourcePage,
      sourceType,
      blockCategory,
      position: index + 1,
      onBeforeNavigate,
      onOpenArticleDirect,
    });
  };

  return (
    <div ref={ref} className="h-full">
      <a
        href={item.route}
        onClick={handleOpen}
        className={`group h-full p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5 ${
          isLight
            ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md text-slate-900'
            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-indigo-400/50 text-white'
        }`}
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className={isLight ? 'text-slate-600 font-bold' : 'text-slate-300 font-bold'}>
              {isAr ? item.metaAr : item.metaEn}
            </span>
            <span className="text-lg shrink-0" aria-hidden="true">
              {item.icon}
            </span>
          </div>

          <h4 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-indigo-500 dark:group-hover:text-cyan-300 transition-colors font-['Alexandria']">
            {isAr ? item.titleAr : item.titleEn}
          </h4>

          <p
            className={`text-xs leading-relaxed line-clamp-3 ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {isAr ? item.descriptionAr : item.descriptionEn}
          </p>
        </div>

        <div
          className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between transition ${
            isLight
              ? 'bg-indigo-50 group-hover:bg-indigo-600 text-indigo-800 group-hover:text-white border border-indigo-200 group-hover:border-indigo-600'
              : 'bg-indigo-500/15 group-hover:bg-indigo-600 text-indigo-200 group-hover:text-white border border-indigo-500/30 group-hover:border-indigo-500'
          }`}
        >
          <span>{isAr ? item.ctaAr : item.ctaEn}</span>
          <ArrowIcon className="w-4 h-4 shrink-0" />
        </div>
      </a>
    </div>
  );
};

export const SuggestedContentMixSection: React.FC<SuggestedContentMixSectionProps> = ({
  sourcePage,
  sourceType,
  clusters,
  excludeIds,
  excludeRoutes,
  keywordsText,
  count = 6,
  variant = 'you_may_also_like',
  headingAr,
  headingEn,
  subheadingAr,
  subheadingEn,
  forceDark = false,
  onBeforeNavigate,
  onOpenArticleDirect,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = !forceDark && theme === 'light';

  const blockCategory: RecommendationBlockCategory =
    variant === 'popular_content' ? 'popular_content' : 'you_may_also_like';

  const items = useMemo(() => {
    if (variant === 'popular_content') {
      return getPopularContentRecommendations({
        excludeIds,
        excludeRoutes,
        count,
      });
    }
    return getSuggestedContentMix({
      clusters,
      excludeIds,
      excludeRoutes,
      keywordsText,
      count,
    });
  }, [variant, clusters, excludeIds, excludeRoutes, keywordsText, count]);

  if (items.length === 0) return null;

  const defaultHeadingAr =
    variant === 'popular_content' ? 'الأكثر تفاعلاً وشعبية' : 'محتوى مقترح لك';
  const defaultHeadingEn =
    variant === 'popular_content' ? 'Popular & Most Clicked' : 'Recommended For You';
  const defaultSubAr =
    variant === 'popular_content'
      ? 'المقالات والاختبارات والقصص الأعلى تفاعلاً وتصفحاً بين قراء «مرآة القلوب».'
      : 'تشكيلة متوازنة من المقالات العلمية والاختبارات التفاعلية والروايات النفسية المناسبة لاهتمامك.';
  const defaultSubEn =
    variant === 'popular_content'
      ? 'Top-performing articles, psychometric scales, and stories across Mirror of Hearts.'
      : 'A curated mix of articles, assessments, and psychological stories matched to your focus.';

  return (
    <section
      aria-label={isAr ? headingAr || defaultHeadingAr : headingEn || defaultHeadingEn}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`rounded-3xl border p-5 sm:p-7 space-y-5 ${
        isLight
          ? 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 border-slate-200 text-slate-900'
          : 'bg-slate-900/75 border-white/10 text-white'
      }`}
    >
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          {variant === 'popular_content' ? (
            <Flame className="w-5 h-5 text-amber-500 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          )}
          <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
            {isAr ? headingAr || defaultHeadingAr : headingEn || defaultHeadingEn}
          </h3>
        </div>
        <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          {isAr ? subheadingAr || defaultSubAr : subheadingEn || defaultSubEn}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <MixItemCard
            key={`${item.kind}-${item.id}`}
            item={item}
            index={idx}
            sourcePage={sourcePage}
            sourceType={sourceType}
            blockCategory={blockCategory}
            isAr={isAr}
            isRTL={isRTL}
            isLight={isLight}
            onBeforeNavigate={onBeforeNavigate}
            onOpenArticleDirect={onOpenArticleDirect}
          />
        ))}
      </div>
    </section>
  );
};

export default SuggestedContentMixSection;
