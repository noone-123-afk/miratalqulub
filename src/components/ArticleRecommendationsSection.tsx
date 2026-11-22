import React, { useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Clock,
  Link2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import {
  ArticleOrPaperInput,
  ContextualLinkItem,
  getArticleLearningJourney,
  getContextualBridgeLinksForArticle,
  getRelatedArticlesForContent,
  getRelatedTestsForArticle,
  IndexedArticleCandidate,
  IndexedTestCandidate,
} from '../utils/recommendationEngine';
import {
  triggerTrackedArticleNavigation,
  triggerTrackedRouteNavigation,
  triggerTrackedTestNavigation,
  useRecommendationImpression,
} from './TrackedRecommendationCard';
import { NextStepRecommendations } from './NextStepRecommendations';
import { SuggestedContentMixSection } from './SuggestedContentMixSection';

interface ArticleRecommendationsSectionProps {
  source: ArticleOrPaperInput;
  sourcePage: string;
  forceDark?: boolean;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
}

const RelatedArticleCard: React.FC<{
  article: IndexedArticleCandidate;
  index: number;
  sourcePage: string;
  isAr: boolean;
  isRTL: boolean;
  isLight: boolean;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
}> = ({
  article,
  index,
  sourcePage,
  isAr,
  isRTL,
  isLight,
  onBeforeNavigate,
  onOpenArticleDirect,
}) => {
  const ref = useRecommendationImpression({
    sourcePage,
    sourceContentType: 'article',
    recommendedId: article.id,
    recommendedTitle: isAr ? article.titleAr : article.titleEn,
    recommendedContentType: 'article',
    blockCategory: 'related_articles',
    position: index + 1,
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div ref={ref} className="h-full">
      <a
        href={article.route}
        onClick={(e) => {
          e.preventDefault();
          triggerTrackedArticleNavigation({
            articleId: article.id,
            route: article.route,
            title: isAr ? article.titleAr : article.titleEn,
            sourcePage,
            sourceType: 'article',
            blockCategory: 'related_articles',
            position: index + 1,
            onBeforeNavigate,
            onOpenArticleDirect,
          });
        }}
        className={`group h-full p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 ${
          isLight
            ? 'bg-white hover:bg-sky-50/40 border-slate-200 hover:border-sky-300 shadow-xs text-slate-900'
            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-sky-400/50 text-white'
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
            <span className={isLight ? 'text-sky-700' : 'text-sky-300'}>
              {isAr ? article.categoryLabelAr : article.categoryLabelEn}
              {' · '}
              {isAr ? article.readTimeAr : article.readTimeEn}
            </span>
            <span className="text-base shrink-0" aria-hidden="true">
              {article.icon}
            </span>
          </div>

          <h4 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-sky-500 dark:group-hover:text-cyan-300 transition-colors font-['Alexandria']">
            {isAr ? article.titleAr : article.titleEn}
          </h4>

          <p className={`text-xs leading-relaxed line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr ? article.summaryAr : article.summaryEn}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs font-extrabold text-sky-600 dark:text-sky-300">
          <span>{isAr ? 'اقرأ المقال الآن' : 'Read Article'}</span>
          <ArrowIcon className="w-4 h-4 shrink-0" />
        </div>
      </a>
    </div>
  );
};

const RelatedTestCard: React.FC<{
  test: IndexedTestCandidate;
  index: number;
  sourcePage: string;
  isAr: boolean;
  isRTL: boolean;
  isLight: boolean;
  onBeforeNavigate?: () => void;
}> = ({ test, index, sourcePage, isAr, isRTL, isLight, onBeforeNavigate }) => {
  const ref = useRecommendationImpression({
    sourcePage,
    sourceContentType: 'article',
    recommendedId: test.id,
    recommendedTitle: isAr ? test.titleAr : test.titleEn,
    recommendedContentType: 'test',
    blockCategory: 'recommended_tests',
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
            sourceType: 'article',
            blockCategory: 'recommended_tests',
            position: index + 1,
            onBeforeNavigate,
          });
        }}
        className={`group h-full p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 ${
          isLight
            ? 'bg-white hover:bg-purple-50/40 border-slate-200 hover:border-purple-300 shadow-xs text-slate-900'
            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-purple-400/50 text-white'
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
            <span className={isLight ? 'text-purple-700' : 'text-purple-300'}>
              {isAr ? test.domainLabelAr : test.domainLabelEn}
            </span>
            <span className="text-lg shrink-0" aria-hidden="true">
              {test.icon}
            </span>
          </div>

          <h4 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors font-['Alexandria']">
            {isAr ? test.titleAr : test.titleEn}
          </h4>

          <p className={`text-xs leading-relaxed line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr ? test.descriptionAr : test.descriptionEn}
          </p>
        </div>

        <div
          className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-extrabold flex items-center justify-between transition ${
            isLight
              ? 'bg-purple-50 group-hover:bg-purple-600 border-purple-200 text-purple-800 group-hover:text-white'
              : 'bg-purple-500/15 group-hover:bg-purple-600 border-purple-500/30 text-purple-200 group-hover:text-white'
          }`}
        >
          <span>{isAr ? 'ابدأ الاختبار' : 'Start Assessment'}</span>
          <ArrowIcon className="w-4 h-4 shrink-0" />
        </div>
      </a>
    </div>
  );
};

const BridgeLinkRow: React.FC<{
  link: ContextualLinkItem;
  index: number;
  sourcePage: string;
  isAr: boolean;
  isLight: boolean;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
}> = ({ link, index, sourcePage, isAr, isLight, onBeforeNavigate, onOpenArticleDirect }) => {
  const ref = useRecommendationImpression({
    sourcePage,
    sourceContentType: 'article',
    recommendedId: link.articleId || link.testCard?.id || link.route,
    recommendedTitle: isAr ? link.anchorAr : link.anchorEn,
    recommendedContentType:
      link.kind === 'test' ? 'test' : link.kind === 'educational' ? 'educational' : 'article',
    blockCategory: 'contextual_link',
    position: index + 1,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (link.kind === 'test' && link.testCard) {
      triggerTrackedTestNavigation({
        testCard: link.testCard,
        sourcePage,
        sourceType: 'article',
        blockCategory: 'contextual_link',
        position: index + 1,
        onBeforeNavigate,
      });
    } else if (link.kind === 'article' && link.articleId) {
      triggerTrackedArticleNavigation({
        articleId: link.articleId,
        route: link.route,
        title: isAr ? link.anchorAr : link.anchorEn,
        sourcePage,
        sourceType: 'article',
        blockCategory: 'contextual_link',
        position: index + 1,
        onBeforeNavigate,
        onOpenArticleDirect,
      });
    } else {
      triggerTrackedRouteNavigation({
        id: link.route,
        route: link.route,
        title: isAr ? link.anchorAr : link.anchorEn,
        targetType: 'educational',
        sourcePage,
        sourceType: 'article',
        blockCategory: 'contextual_link',
        position: index + 1,
        onBeforeNavigate,
      });
    }
  };

  return (
    <div ref={ref}>
      <a
        href={link.route}
        onClick={handleClick}
        className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition min-h-[44px] ${
          isLight
            ? 'bg-white hover:bg-indigo-50 border-slate-200 hover:border-indigo-300 text-indigo-700'
            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-cyan-400/50 text-cyan-300'
        }`}
      >
        <span className="line-clamp-1">{isAr ? link.anchorAr : link.anchorEn}</span>
        <Link2 className="w-3.5 h-3.5 shrink-0 opacity-75" />
      </a>
    </div>
  );
};

export const ArticleRecommendationsSection: React.FC<ArticleRecommendationsSectionProps> = ({
  source,
  sourcePage,
  forceDark = false,
  onBeforeNavigate,
  onOpenArticleDirect,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = !forceDark && theme === 'light';

  const articleId = source.id;

  const relatedArticles = useMemo(
    () => getRelatedArticlesForContent(source, 4),
    [source]
  );
  const relatedTests = useMemo(
    () => getRelatedTestsForArticle(source, 3),
    [source]
  );
  const learningJourney = useMemo(
    () => getArticleLearningJourney(source),
    [source]
  );
  const contextualBridge = useMemo(
    () => getContextualBridgeLinksForArticle(source, 4),
    [source]
  );

  return (
    <div className="space-y-8 pt-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Contextual Internal Reading Bridge (guarantees 3-8 descriptive internal links cleanly per article) */}
      {contextualBridge.length > 0 && (
        <section
          aria-label={isAr ? 'روابط سياقية ومقاييس مكملة للمقال' : 'Contextual Internal Links'}
          className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-900'
              : 'bg-slate-900/60 border-white/10 text-white'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-extrabold">
            <Link2 className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              {isAr
                ? 'محاور ومقاييس تطبيقية مرتبطة بموضوع هذا المقال'
                : 'Connected Psychometric Tests & Deep-Dive References'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {contextualBridge.map((lnk, idx) => (
              <BridgeLinkRow
                key={`${lnk.route}-${idx}`}
                link={lnk}
                index={idx}
                sourcePage={sourcePage}
                isAr={isAr}
                isLight={isLight}
                onBeforeNavigate={onBeforeNavigate}
                onOpenArticleDirect={onOpenArticleDirect}
              />
            ))}
          </div>
        </section>
      )}

      {/* Requirement 3 of Suite: Personalized Learning Path ("خطوتك التالية") */}
      <NextStepRecommendations
        journey={learningJourney}
        sourcePage={sourcePage}
        sourceType="article"
        forceDark={forceDark}
        onBeforeNavigate={onBeforeNavigate}
        onOpenArticleDirect={onOpenArticleDirect}
      />

      {/* Requirement 1: "اقرأ أيضاً" (3–6 Relevant Articles) */}
      {relatedArticles.length > 0 && (
        <section
          aria-label={isAr ? 'اقرأ أيضاً' : 'Read Also'}
          className={`rounded-3xl border p-5 sm:p-6 space-y-4 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-slate-900/75 border-white/10 text-white'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-500 shrink-0" />
              <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                {isAr ? 'اقرأ أيضاً' : 'Read Also'}
              </h3>
            </div>
            <span className={`text-xs font-bold flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{isAr ? `${relatedArticles.length} دراسات ذات صلة` : `${relatedArticles.length} Related Articles`}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((art, idx) => (
              <RelatedArticleCard
                key={art.id}
                article={art}
                index={idx}
                sourcePage={sourcePage}
                isAr={isAr}
                isRTL={isRTL}
                isLight={isLight}
                onBeforeNavigate={onBeforeNavigate}
                onOpenArticleDirect={onOpenArticleDirect}
              />
            ))}
          </div>
        </section>
      )}

      {/* Requirement 2: "اختبارات قد تهمك" (2–4 Relevant Tests) */}
      {relatedTests.length > 0 && (
        <section
          aria-label={isAr ? 'اختبارات قد تهمك' : 'Tests You May Be Interested In'}
          className={`rounded-3xl border p-5 sm:p-6 space-y-4 ${
            isLight
              ? 'bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/40 border-purple-200 text-slate-900'
              : 'bg-gradient-to-br from-purple-950/35 via-slate-900/80 to-indigo-950/30 border-purple-500/20 text-white'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400 shrink-0" />
              <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                {isAr ? 'اختبارات قد تهمك' : 'Assessments You May Like'}
              </h3>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr
                ? 'اختبارات سيكومترية وتفاعلية مرشّحة تلقائياً بناءً على المحاور النفسية لهذا المقال.'
                : 'Psychometric scales automatically matched to the psychological themes of this article.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTests.map((tst, idx) => (
              <RelatedTestCard
                key={tst.id}
                test={tst}
                index={idx}
                sourcePage={sourcePage}
                isAr={isAr}
                isRTL={isRTL}
                isLight={isLight}
                onBeforeNavigate={onBeforeNavigate}
              />
            ))}
          </div>
        </section>
      )}

      {/* Requirement 5: "محتوى مقترح لك" (Mix of Articles + Tests + Stories) */}
      <SuggestedContentMixSection
        sourcePage={sourcePage}
        sourceType="article"
        excludeIds={[articleId, ...relatedArticles.map((a) => a.id)]}
        excludeRoutes={[sourcePage]}
        keywordsText={'title' in source ? source.title : source.titleAr}
        count={6}
        variant="you_may_also_like"
        forceDark={forceDark}
        onBeforeNavigate={onBeforeNavigate}
        onOpenArticleDirect={onOpenArticleDirect}
      />
    </div>
  );
};

export default ArticleRecommendationsSection;
