import { useEffect, useRef } from 'react';
import {
  RecommendationBlockCategory,
  RecommendationSourceType,
  RecommendationTargetType,
  trackRecommendationClick,
  trackRecommendationImpression,
} from '../utils/recommendationAnalytics';
import { ResolvedTestCard } from '../data/recommendationsMapping';
import { navigateCleanUrl } from '../utils/navigation';
import { soundManager } from '../utils/sound';

export function useRecommendationImpression(params: {
  sourcePage: string;
  sourceContentType: RecommendationSourceType;
  recommendedId: string;
  recommendedTitle?: string;
  recommendedContentType: RecommendationTargetType;
  blockCategory: RecommendationBlockCategory;
  position: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    trackedRef.current = false;
  }, [params.sourcePage, params.recommendedId, params.blockCategory]);

  useEffect(() => {
    if (params.disabled || !params.recommendedId || trackedRef.current) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      trackedRef.current = true;
      trackRecommendationImpression(params);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !trackedRef.current) {
            trackedRef.current = true;
            trackRecommendationImpression(params);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [
    params.disabled,
    params.sourcePage,
    params.sourceContentType,
    params.recommendedId,
    params.recommendedTitle,
    params.recommendedContentType,
    params.blockCategory,
    params.position,
  ]);

  return ref;
}

export function triggerTrackedArticleNavigation(options: {
  articleId: string;
  route: string;
  title?: string;
  sourcePage: string;
  sourceType: RecommendationSourceType;
  blockCategory: RecommendationBlockCategory;
  position: number;
  journeyLabel?: string;
  onBeforeNavigate?: () => void;
  onOpenArticleDirect?: (articleId: string) => void;
}): void {
  soundManager.playTap();
  trackRecommendationClick({
    sourcePage: options.sourcePage,
    sourceType: options.sourceType,
    targetPage: options.route,
    targetType: 'article',
    recommendedId: options.articleId,
    recommendedTitle: options.title,
    blockCategory: options.blockCategory,
    position: options.position,
    journeyLabel: options.journeyLabel,
  });

  if (options.onOpenArticleDirect) {
    options.onOpenArticleDirect(options.articleId);
    return;
  }

  try {
    sessionStorage.setItem('mirat_open_article_id', options.articleId);
  } catch {
    // ignore storage errors
  }
  options.onBeforeNavigate?.();
  navigateCleanUrl(options.route);
}

export function triggerTrackedTestNavigation(options: {
  testCard: ResolvedTestCard;
  sourcePage: string;
  sourceType: RecommendationSourceType;
  blockCategory: RecommendationBlockCategory;
  position: number;
  journeyLabel?: string;
  onBeforeNavigate?: () => void;
  onLaunchTest?: (testCard: ResolvedTestCard) => boolean | void;
}): void {
  soundManager.playTap();
  trackRecommendationClick({
    sourcePage: options.sourcePage,
    sourceType: options.sourceType,
    targetPage: options.testCard.route,
    targetType: 'test',
    recommendedId: options.testCard.id,
    recommendedTitle: options.testCard.titleAr,
    blockCategory: options.blockCategory,
    position: options.position,
    journeyLabel: options.journeyLabel,
  });

  if (options.onLaunchTest) {
    const handled = options.onLaunchTest(options.testCard);
    if (handled === true) return;
  }

  options.onBeforeNavigate?.();

  if (options.testCard.launchKind === 'compatibility') {
    navigateCleanUrl('/compatibility');
    return;
  }

  try {
    sessionStorage.setItem('mirat_pending_test_launch', JSON.stringify(options.testCard));
  } catch {
    // ignore storage errors
  }

  window.dispatchEvent(new CustomEvent('mirat:launch-test', { detail: options.testCard }));
}

export function triggerTrackedNovelNavigation(options: {
  novelId: string;
  route: string;
  genre?: string;
  title?: string;
  sourcePage: string;
  sourceType: RecommendationSourceType;
  blockCategory: RecommendationBlockCategory;
  position: number;
  journeyLabel?: string;
  onBeforeNavigate?: () => void;
}): void {
  soundManager.playTap();
  trackRecommendationClick({
    sourcePage: options.sourcePage,
    sourceType: options.sourceType,
    targetPage: options.route,
    targetType: 'novel',
    recommendedId: options.novelId,
    recommendedTitle: options.title,
    blockCategory: options.blockCategory,
    position: options.position,
    journeyLabel: options.journeyLabel,
  });

  try {
    if (options.genre && options.route === '/novels') {
      sessionStorage.setItem('mirat_open_novel_genre', options.genre);
      window.dispatchEvent(
        new CustomEvent('mirat:open-novel-genre', { detail: options.genre })
      );
    }
  } catch {
    // ignore
  }
  options.onBeforeNavigate?.();
  navigateCleanUrl(options.route);
}

export function triggerTrackedRouteNavigation(options: {
  id: string;
  route: string;
  title?: string;
  targetType: RecommendationTargetType;
  sourcePage: string;
  sourceType: RecommendationSourceType;
  blockCategory: RecommendationBlockCategory;
  position: number;
  journeyLabel?: string;
  onBeforeNavigate?: () => void;
}): void {
  soundManager.playTap();
  trackRecommendationClick({
    sourcePage: options.sourcePage,
    sourceType: options.sourceType,
    targetPage: options.route,
    targetType: options.targetType,
    recommendedId: options.id,
    recommendedTitle: options.title,
    blockCategory: options.blockCategory,
    position: options.position,
    journeyLabel: options.journeyLabel,
  });
  options.onBeforeNavigate?.();
  navigateCleanUrl(options.route);
}
