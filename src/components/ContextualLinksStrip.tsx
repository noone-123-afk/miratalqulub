import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calculator, Link2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { ContextualLinkItem, getContextualLinksForTest } from '../utils/recommendationEngine';
import { RecommendationSourceType } from '../utils/recommendationAnalytics';
import {
  triggerTrackedArticleNavigation,
  triggerTrackedRouteNavigation,
  useRecommendationImpression,
} from './TrackedRecommendationCard';

interface ContextualLinksStripProps {
  testId: string;
  sourcePage: string;
  sourceType?: RecommendationSourceType;
  count?: number;
  forceDark?: boolean;
  onBeforeNavigate?: () => void;
  titleAr?: string;
  titleEn?: string;
}

const ContextualLinkCardItem: React.FC<{
  link: ContextualLinkItem;
  index: number;
  sourcePage: string;
  sourceType: RecommendationSourceType;
  isAr: boolean;
  isRTL: boolean;
  isLight: boolean;
  onBeforeNavigate?: () => void;
}> = ({ link, index, sourcePage, sourceType, isAr, isRTL, isLight, onBeforeNavigate }) => {
  const ref = useRecommendationImpression({
    sourcePage,
    sourceContentType: sourceType,
    recommendedId: link.articleId || link.route,
    recommendedTitle: isAr ? link.titleAr : link.titleEn,
    recommendedContentType: link.kind === 'educational' ? 'educational' : 'article',
    blockCategory: 'contextual_link',
    position: index + 1,
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (link.kind === 'article' && link.articleId) {
      triggerTrackedArticleNavigation({
        articleId: link.articleId,
        route: link.route,
        title: isAr ? link.titleAr : link.titleEn,
        sourcePage,
        sourceType,
        blockCategory: 'contextual_link',
        position: index + 1,
        onBeforeNavigate,
      });
    } else {
      triggerTrackedRouteNavigation({
        id: link.route,
        route: link.route,
        title: isAr ? link.titleAr : link.titleEn,
        targetType: 'educational',
        sourcePage,
        sourceType,
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
        className={`group flex flex-col justify-between gap-2 p-4 rounded-2xl border min-h-[108px] transition-all duration-200 ${
          isLight
            ? 'bg-white hover:bg-indigo-50/50 border-slate-200 hover:border-indigo-300 text-slate-900'
            : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-indigo-400/40 text-white'
        }`}
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold opacity-75">
            {link.kind === 'educational' ? (
              <Calculator className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            ) : (
              <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            )}
            <span>
              {link.kind === 'educational'
                ? isAr
                  ? 'دليل المنهجية والحساب'
                  : 'Methodology & Scoring'
                : isAr
                ? 'مقال علمي مفسّر'
                : 'Explanatory Study'}
            </span>
          </div>
          <h4 className="font-extrabold text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-indigo-500 dark:group-hover:text-cyan-300 transition-colors">
            {isAr ? link.anchorAr : link.anchorEn}
          </h4>
        </div>

        <div className="flex items-center justify-between text-[11px] font-bold pt-1 text-indigo-600 dark:text-cyan-300">
          <span>{isAr ? 'استعراض المرجع' : 'Read Reference'}</span>
          <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </a>
    </div>
  );
};

export const ContextualLinksStrip: React.FC<ContextualLinksStripProps> = ({
  testId,
  sourcePage,
  sourceType = 'test',
  count = 4,
  forceDark = false,
  onBeforeNavigate,
  titleAr,
  titleEn,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = !forceDark && theme === 'light';

  const links = useMemo(() => getContextualLinksForTest(testId, count), [testId, count]);

  if (links.length === 0) return null;

  return (
    <section
      aria-label={isAr ? 'مصادر علمية ومقالات مرتبطة بالاختبار' : 'Related Psychological Articles & Guides'}
      className={`rounded-3xl border p-5 sm:p-6 space-y-4 ${
        isLight
          ? 'bg-slate-50/90 border-slate-200 text-slate-900'
          : 'bg-slate-900/70 border-white/10 text-white'
      }`}
    >
      <div className="flex items-center gap-2">
        <Link2 className="w-4 h-4 text-indigo-500 shrink-0" />
        <h3 className="font-extrabold text-sm sm:text-base font-['Alexandria']">
          {isAr
            ? titleAr || 'مراجع علمية ومقالات لفهم نتائجك بعمق'
            : titleEn || 'Scientific Guides & Articles Behind This Assessment'}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {links.map((lnk, idx) => (
          <ContextualLinkCardItem
            key={lnk.route + idx}
            link={lnk}
            index={idx}
            sourcePage={sourcePage}
            sourceType={sourceType}
            isAr={isAr}
            isRTL={isRTL}
            isLight={isLight}
            onBeforeNavigate={onBeforeNavigate}
          />
        ))}
      </div>
    </section>
  );
};
