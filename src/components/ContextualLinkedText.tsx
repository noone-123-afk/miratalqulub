import React from 'react';
import { findContextualLinksInParagraph, TextLinkSegment } from '../utils/recommendationEngine';
import {
  triggerTrackedArticleNavigation,
  triggerTrackedRouteNavigation,
  triggerTrackedTestNavigation,
} from './TrackedRecommendationCard';

interface ContextualLinkedTextProps {
  text: string;
  excludeArticleId?: string;
  excludeRoute?: string;
  usedTargets?: Set<string>;
  maxLinksInParagraph?: number;
  maxTotalLinks?: number;
  isLight?: boolean;
  onOpenArticleDirect?: (articleId: string) => void;
  onBeforeNavigate?: () => void;
}

export const ContextualLinkedText: React.FC<ContextualLinkedTextProps> = ({
  text,
  excludeArticleId,
  excludeRoute,
  usedTargets,
  maxLinksInParagraph = 1,
  maxTotalLinks = 7,
  isLight = false,
  onOpenArticleDirect,
  onBeforeNavigate,
}) => {
  const segments: TextLinkSegment[] = findContextualLinksInParagraph(text, {
    excludeArticleId,
    excludeRoute,
    usedTargets,
    maxLinksInParagraph,
    maxTotalLinks,
  });

  if (segments.length === 1 && !segments[0].route) {
    return <>{text}</>;
  }

  const sourcePage = excludeRoute || (excludeArticleId ? `/articles/${encodeURIComponent(excludeArticleId)}` : '/articles');

  const handleLinkClick = (e: React.MouseEvent, seg: TextLinkSegment, pos: number) => {
    e.preventDefault();
    if (!seg.route) return;

    if (seg.testCard) {
      triggerTrackedTestNavigation({
        testCard: seg.testCard,
        sourcePage,
        sourceType: 'article',
        blockCategory: 'contextual_link',
        position: pos,
        onBeforeNavigate,
      });
      return;
    }

    if (seg.articleId) {
      triggerTrackedArticleNavigation({
        articleId: seg.articleId,
        route: seg.route,
        title: seg.title || seg.text,
        sourcePage,
        sourceType: 'article',
        blockCategory: 'contextual_link',
        position: pos,
        onBeforeNavigate,
        onOpenArticleDirect,
      });
      return;
    }

    triggerTrackedRouteNavigation({
      id: seg.route,
      route: seg.route,
      title: seg.title || seg.text,
      targetType: 'educational',
      sourcePage,
      sourceType: 'article',
      blockCategory: 'contextual_link',
      position: pos,
      onBeforeNavigate,
    });
  };

  return (
    <>
      {segments.map((seg, idx) => {
        if (!seg.route) {
          return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
        }
        return (
          <a
            key={`${idx}-${seg.route}`}
            href={seg.route}
            title={seg.title}
            onClick={(e) => handleLinkClick(e, seg, idx + 1)}
            className={`font-bold underline decoration-2 underline-offset-4 transition-colors ${
              isLight
                ? 'text-indigo-700 decoration-indigo-300 hover:text-indigo-900 hover:decoration-indigo-600'
                : 'text-cyan-300 decoration-cyan-500/40 hover:text-cyan-200 hover:decoration-cyan-300'
            }`}
          >
            {seg.text}
          </a>
        );
      })}
    </>
  );
};
