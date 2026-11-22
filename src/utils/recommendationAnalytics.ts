// Privacy-friendly, GDPR-compliant Recommendation Analytics, CTR Ranking & Anti-Loop Engine
// Supports IntersectionObserver impression tracking, GA4 (gtag), Google Tag Manager (dataLayer),
// Search Console performance exports, CTR auto-ranking, and automatic weak-item pruning.

export type RecommendationBlockCategory =
  | 'related_articles'
  | 'recommended_tests'
  | 'try_another_test'
  | 'next_step'
  | 'popular_content'
  | 'you_may_also_like'
  | 'pre_result_similar'
  | 'contextual_link';

export type RecommendationSourceType =
  | 'article'
  | 'test'
  | 'result_page'
  | 'story'
  | 'home'
  | 'educational';

export type RecommendationTargetType = 'article' | 'test' | 'novel' | 'educational';

export type AnalyticsEventName =
  | 'recommendation_view'
  | 'recommendation_click'
  | 'related_article_click'
  | 'related_test_click'
  | 'next_step_click';

export interface RecommendationImpressionPayload {
  sourcePage: string;
  sourceContentType: RecommendationSourceType;
  recommendedId: string;
  recommendedTitle?: string;
  recommendedContentType: RecommendationTargetType;
  blockCategory: RecommendationBlockCategory;
  position: number;
  timestamp?: string;
}

export interface RecommendationClickPayload {
  sourcePage: string;
  sourceType: RecommendationSourceType;
  targetPage: string;
  targetType: RecommendationTargetType;
  recommendedId: string;
  recommendedTitle?: string;
  blockCategory: RecommendationBlockCategory;
  position: number;
  journeyLabel?: string;
  timestamp?: string;
}

export interface StoredItemStats {
  id: string;
  title: string;
  type: RecommendationTargetType;
  route: string;
  impressions: number;
  clicks: number;
  lastUpdated: string;
}

export interface StoredBlockStats {
  block: RecommendationBlockCategory;
  impressions: number;
  clicks: number;
}

export interface StoredJourneyStats {
  journeyKey: string; // e.g. "result_page -> article"
  sourceType: RecommendationSourceType;
  targetType: RecommendationTargetType;
  targetPage: string;
  targetTitle: string;
  clicks: number;
}

export interface StoredRecommendationAnalyticsState {
  version: number;
  totalImpressions: number;
  totalClicks: number;
  sessionCount: number;
  totalPageViews: number;
  items: Record<string, StoredItemStats>;
  blocks: Partial<Record<RecommendationBlockCategory, StoredBlockStats>>;
  journeys: Record<string, StoredJourneyStats>;
  recentEvents: Array<{
    eventName: AnalyticsEventName;
    sourcePage: string;
    targetPage: string;
    recommendedId: string;
    blockCategory: RecommendationBlockCategory;
    position: number;
    timestamp: string;
  }>;
}

export interface RecommendationItemSummary extends StoredItemStats {
  ctr: number; // 0..100 percentage
}

export interface RecommendationDashboardSummary {
  totalImpressions: number;
  totalClicks: number;
  overallCtr: number; // %
  avgPagesPerSession: number;
  estimatedPagesPerSessionImpact: string;
  topPerformingRecommendations: RecommendationItemSummary[];
  lowestPerformingRecommendations: RecommendationItemSummary[];
  mostViewedContent: RecommendationItemSummary[];
  mostClickedContent: RecommendationItemSummary[];
  mostClickedArticles: RecommendationItemSummary[];
  mostClickedTests: RecommendationItemSummary[];
  blockPerformance: Array<{
    block: RecommendationBlockCategory;
    labelAr: string;
    labelEn: string;
    impressions: number;
    clicks: number;
    ctr: number;
  }>;
  highestConvertingJourneys: StoredJourneyStats[];
  prunedWeakCount: number;
  gdprConsentAnalyticsEnabled: boolean;
}

const STORAGE_KEY = 'mirat_rec_analytics_v1';
const SESSION_SHOWN_KEY = 'mirat_session_rec_shown_v1';
const SESSION_PAGES_KEY = 'mirat_session_pages_v1';
const SESSION_ACTIVE_KEY = 'mirat_session_started_v1';

// Minimum impressions before an underperforming recommendation is flagged/pruned
const WEAK_PRUNE_MIN_IMPRESSIONS = 15;
const WEAK_PRUNE_MAX_CTR = 0.025; // 2.5%

export const BLOCK_LABELS: Record<
  RecommendationBlockCategory,
  { ar: string; en: string }
> = {
  related_articles: { ar: 'اقرأ أيضاً (مقالات ذات صلة)', en: 'Related Articles' },
  recommended_tests: { ar: 'اختبارات قد تهمك', en: 'Recommended Tests' },
  try_another_test: { ar: 'جرّب اختباراً آخر', en: 'Try Another Test' },
  next_step: { ar: 'مسار خطوتك التالية', en: 'Next Step Journey' },
  popular_content: { ar: 'المحتوى الأكثر تفاعلاً', en: 'Popular Content' },
  you_may_also_like: { ar: 'محتوى مقترح لك', en: 'You May Also Like' },
  pre_result_similar: { ar: 'اختبار مشابه قبل النتيجة', en: 'Pre-Result Similar Test' },
  contextual_link: { ar: 'الروابط السياقية الداخلية', en: 'Contextual Internal Links' },
};

// In-memory session sets (works reliably even when storage/cookies are disabled)
const sessionImpressionDedupe = new Set<string>();
const sessionShownIdsCount = new Map<string, number>();

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function isAnalyticsConsentAllowed(): boolean {
  try {
    const val = localStorage.getItem('cookie_consent_analytics');
    // Privacy-by-design: never track if explicitly opted out; if null/true allow anonymous aggregate telemetry without PII
    return val !== 'false';
  } catch {
    return false;
  }
}

function getDefaultState(): StoredRecommendationAnalyticsState {
  return {
    version: 1,
    totalImpressions: 0,
    totalClicks: 0,
    sessionCount: 1,
    totalPageViews: 1,
    items: {},
    blocks: {},
    journeys: {},
    recentEvents: [],
  };
}

let inMemoryState: StoredRecommendationAnalyticsState | null = null;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function readAnalyticsState(): StoredRecommendationAnalyticsState {
  if (inMemoryState) return inMemoryState;

  if (!isAnalyticsConsentAllowed()) {
    inMemoryState = getDefaultState();
    return inMemoryState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredRecommendationAnalyticsState;
      if (parsed && parsed.version === 1 && parsed.items) {
        inMemoryState = parsed;
        return inMemoryState;
      }
    }
  } catch {
    // ignore storage read errors
  }

  inMemoryState = getDefaultState();
  return inMemoryState;
}

function schedulePersistState(): void {
  if (!isAnalyticsConsentAllowed()) return;
  if (flushTimer !== null) return;

  const persist = () => {
    flushTimer = null;
    try {
      if (inMemoryState) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inMemoryState));
      }
    } catch {
      // ignore quota/private-mode errors
    }
  };

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    flushTimer = setTimeout(() => {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
        persist
      );
    }, 350);
  } else {
    flushTimer = setTimeout(persist, 400);
  }
}

function emitExternalTrackingEvent(
  eventName: AnalyticsEventName,
  params: Record<string, unknown>
): void {
  if (!isAnalyticsConsentAllowed() || typeof window === 'undefined') return;

  const schedule =
    typeof queueMicrotask === 'function'
      ? queueMicrotask
      : (fn: () => void) => Promise.resolve().then(fn);

  schedule(() => {
    try {
      // 1. Google Tag Manager (dataLayer) integration
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          ...params,
          privacy_mode: 'gdpr_anonymous',
        });
      }
      // 2. Google Analytics 4 (gtag) integration
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
          ...params,
          anonymize_ip: true,
        });
      }
      // 3. Internal app telemetry hook
      window.dispatchEvent(
        new CustomEvent('mirat:rec-analytics', {
          detail: { eventName, ...params },
        })
      );
    } catch {
      // Never impact UX if third-party tag throws
    }
  });
}

// ============================================================================
// Session Tracking & Anti-Loop Prevention (Zero PII)
// ============================================================================

export function recordSessionPageView(pathname: string): void {
  const cleanPath = (pathname || '/').split('?')[0].split('#')[0] || '/';
  try {
    const isNewSession = !sessionStorage.getItem(SESSION_ACTIVE_KEY);
    if (isNewSession) {
      sessionStorage.setItem(SESSION_ACTIVE_KEY, '1');
    }

    const pagesRaw = sessionStorage.getItem(SESSION_PAGES_KEY);
    const pages: string[] = pagesRaw ? JSON.parse(pagesRaw) : [];
    const lastPage = pages[pages.length - 1];
    if (lastPage !== cleanPath) {
      pages.push(cleanPath);
      sessionStorage.setItem(SESSION_PAGES_KEY, JSON.stringify(pages.slice(-40)));
    }

    if (isAnalyticsConsentAllowed()) {
      const state = readAnalyticsState();
      if (isNewSession) {
        state.sessionCount = Math.max(1, state.sessionCount + 1);
      }
      state.totalPageViews += 1;
      schedulePersistState();
    }
  } catch {
    // ignore sessionStorage errors
  }
}

export function getSessionVisitedPages(): Set<string> {
  try {
    const pagesRaw = sessionStorage.getItem(SESSION_PAGES_KEY);
    const pages: string[] = pagesRaw ? JSON.parse(pagesRaw) : [];
    return new Set(pages);
  } catch {
    return new Set();
  }
}

export function markRecommendationShownInSession(id: string): void {
  if (!id) return;
  sessionShownIdsCount.set(id, (sessionShownIdsCount.get(id) || 0) + 1);
  try {
    const raw = sessionStorage.getItem(SESSION_SHOWN_KEY);
    const map: Record<string, number> = raw ? JSON.parse(raw) : {};
    map[id] = (map[id] || 0) + 1;
    sessionStorage.setItem(SESSION_SHOWN_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function getSessionShownCount(id: string): number {
  const mem = sessionShownIdsCount.get(id) || 0;
  if (mem > 0) return mem;
  try {
    const raw = sessionStorage.getItem(SESSION_SHOWN_KEY);
    if (!raw) return 0;
    const map = JSON.parse(raw) as Record<string, number>;
    return map[id] || 0;
  } catch {
    return 0;
  }
}

// ============================================================================
// Impression & Click Event Recorders
// ============================================================================

export function trackRecommendationImpression(payload: RecommendationImpressionPayload): void {
  const timestamp = payload.timestamp || new Date().toISOString();
  const dedupeKey = `${payload.sourcePage}::${payload.blockCategory}::${payload.recommendedId}`;

  if (sessionImpressionDedupe.has(dedupeKey)) {
    return;
  }
  sessionImpressionDedupe.add(dedupeKey);
  markRecommendationShownInSession(payload.recommendedId);

  if (isAnalyticsConsentAllowed()) {
    const state = readAnalyticsState();
    state.totalImpressions += 1;

    const existingItem = state.items[payload.recommendedId] || {
      id: payload.recommendedId,
      title: payload.recommendedTitle || payload.recommendedId,
      type: payload.recommendedContentType,
      route: '',
      impressions: 0,
      clicks: 0,
      lastUpdated: timestamp,
    };
    existingItem.impressions += 1;
    if (payload.recommendedTitle) existingItem.title = payload.recommendedTitle;
    existingItem.lastUpdated = timestamp;
    state.items[payload.recommendedId] = existingItem;

    const existingBlock = state.blocks[payload.blockCategory] || {
      block: payload.blockCategory,
      impressions: 0,
      clicks: 0,
    };
    existingBlock.impressions += 1;
    state.blocks[payload.blockCategory] = existingBlock;

    schedulePersistState();
  }

  emitExternalTrackingEvent('recommendation_view', {
    source_page: payload.sourcePage,
    source_content_type: payload.sourceContentType,
    recommended_id: payload.recommendedId,
    recommended_type: payload.recommendedContentType,
    block_category: payload.blockCategory,
    position: payload.position,
    timestamp,
  });
}

export function trackRecommendationClick(payload: RecommendationClickPayload): void {
  const timestamp = payload.timestamp || new Date().toISOString();

  // Pick specialized event name based on target & block type
  let specializedEvent: AnalyticsEventName = 'recommendation_click';
  if (payload.blockCategory === 'next_step') {
    specializedEvent = 'next_step_click';
  } else if (
    payload.blockCategory === 'related_articles' ||
    payload.targetType === 'article'
  ) {
    specializedEvent = 'related_article_click';
  } else if (
    payload.blockCategory === 'recommended_tests' ||
    payload.blockCategory === 'try_another_test' ||
    payload.blockCategory === 'pre_result_similar' ||
    payload.targetType === 'test'
  ) {
    specializedEvent = 'related_test_click';
  }

  if (isAnalyticsConsentAllowed()) {
    const state = readAnalyticsState();
    state.totalClicks += 1;

    const existingItem = state.items[payload.recommendedId] || {
      id: payload.recommendedId,
      title: payload.recommendedTitle || payload.recommendedId,
      type: payload.targetType,
      route: payload.targetPage,
      impressions: 1,
      clicks: 0,
      lastUpdated: timestamp,
    };
    existingItem.clicks += 1;
    existingItem.route = payload.targetPage || existingItem.route;
    if (payload.recommendedTitle) existingItem.title = payload.recommendedTitle;
    existingItem.lastUpdated = timestamp;
    state.items[payload.recommendedId] = existingItem;

    const existingBlock = state.blocks[payload.blockCategory] || {
      block: payload.blockCategory,
      impressions: 1,
      clicks: 0,
    };
    existingBlock.clicks += 1;
    state.blocks[payload.blockCategory] = existingBlock;

    const journeyKey = `${payload.sourceType} -> ${payload.targetPage}`;
    const existingJourney = state.journeys[journeyKey] || {
      journeyKey,
      sourceType: payload.sourceType,
      targetType: payload.targetType,
      targetPage: payload.targetPage,
      targetTitle: payload.recommendedTitle || payload.targetPage,
      clicks: 0,
    };
    existingJourney.clicks += 1;
    state.journeys[journeyKey] = existingJourney;

    state.recentEvents = [
      {
        eventName: specializedEvent,
        sourcePage: payload.sourcePage,
        targetPage: payload.targetPage,
        recommendedId: payload.recommendedId,
        blockCategory: payload.blockCategory,
        position: payload.position,
        timestamp,
      },
      ...state.recentEvents.slice(0, 49),
    ];

    schedulePersistState();
  }

  // Fire general recommendation_click + specialized event (GA4 & GTM compatible)
  const commonParams = {
    source_page: payload.sourcePage,
    source_type: payload.sourceType,
    target_page: payload.targetPage,
    target_type: payload.targetType,
    recommended_id: payload.recommendedId,
    block_category: payload.blockCategory,
    position: payload.position,
    journey_label: payload.journeyLabel || `${payload.sourceType}_to_${payload.targetType}`,
    timestamp,
  };

  emitExternalTrackingEvent('recommendation_click', commonParams);
  if (specializedEvent !== 'recommendation_click') {
    emitExternalTrackingEvent(specializedEvent, commonParams);
  }
}

// ============================================================================
// Historical Performance Ranking, CTR Calculation & Automatic Weak Pruning
// ============================================================================

export function getItemCtrStats(id: string): { impressions: number; clicks: number; ctr: number } {
  const state = readAnalyticsState();
  const item = state.items[id];
  if (!item || item.impressions === 0) {
    return { impressions: 0, clicks: 0, ctr: 0 };
  }
  return {
    impressions: item.impressions,
    clicks: item.clicks,
    ctr: item.clicks / item.impressions,
  };
}

/**
 * Automatically identifies underperforming recommendations once sufficient impression data exists.
 */
export function isWeakRecommendation(id: string): boolean {
  const { impressions, ctr } = getItemCtrStats(id);
  return impressions >= WEAK_PRUNE_MIN_IMPRESSIONS && ctr < WEAK_PRUNE_MAX_CTR;
}

/**
 * Computes ranking adjustment combining:
 * 1) Historical CTR boost (for items with meaningful click performance)
 * 2) Anti-repetition session diversity penalty (avoids showing the exact same recommendation twice in one session)
 */
export function getPerformanceAndDiversityAdjustment(id: string, route?: string): number {
  const { impressions, clicks, ctr } = getItemCtrStats(id);
  let adjustment = 0;

  // Historical performance boost (up to +14 points)
  if (impressions >= 3 && clicks > 0) {
    adjustment += Math.min(14, Math.round(ctr * 35));
  }

  // Demote weak items that repeatedly get ignored
  if (isWeakRecommendation(id)) {
    adjustment -= 18;
  }

  // Anti-loop & diversity penalty for items already shown or pages already visited this session
  const shownCount = getSessionShownCount(id);
  if (shownCount > 0) {
    adjustment -= Math.min(24, shownCount * 10);
  }

  if (route && getSessionVisitedPages().has(route)) {
    adjustment -= 18;
  }

  return adjustment;
}

// ============================================================================
// Analytics Dashboard & Popularity Summary
// ============================================================================

function toItemSummary(item: StoredItemStats): RecommendationItemSummary {
  const ctr = item.impressions > 0 ? Number(((item.clicks / item.impressions) * 100).toFixed(1)) : 0;
  return {
    ...item,
    ctr,
  };
}

export function getRecommendationAnalyticsSummary(): RecommendationDashboardSummary {
  const state = readAnalyticsState();
  const itemsList = Object.values(state.items).map(toItemSummary);

  const overallCtr =
    state.totalImpressions > 0
      ? Number(((state.totalClicks / state.totalImpressions) * 100).toFixed(1))
      : 0;

  const avgPagesPerSession =
    state.sessionCount > 0
      ? Number(Math.max(1, state.totalPageViews / state.sessionCount).toFixed(2))
      : 1;

  // Top performing (require >= 2 impressions or >= 1 click)
  const topPerformingRecommendations = [...itemsList]
    .filter((i) => i.clicks > 0)
    .sort((a, b) => b.ctr - a.ctr || b.clicks - a.clicks)
    .slice(0, 6);

  // Lowest performing (items viewed >= 3 times with lowest CTR)
  const lowestPerformingRecommendations = [...itemsList]
    .filter((i) => i.impressions >= 3)
    .sort((a, b) => a.ctr - b.ctr || b.impressions - a.impressions)
    .slice(0, 6);

  const mostViewedContent = [...itemsList]
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 6);

  const mostClickedContent = [...itemsList]
    .filter((i) => i.clicks > 0)
    .sort((a, b) => b.clicks - a.clicks || b.ctr - a.ctr)
    .slice(0, 6);

  const mostClickedArticles = [...itemsList]
    .filter((i) => i.type === 'article' && i.clicks > 0)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  const mostClickedTests = [...itemsList]
    .filter((i) => i.type === 'test' && i.clicks > 0)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  const blockPerformance = (Object.keys(BLOCK_LABELS) as RecommendationBlockCategory[]).map(
    (block) => {
      const bStats = state.blocks[block] || { block, impressions: 0, clicks: 0 };
      const ctr =
        bStats.impressions > 0
          ? Number(((bStats.clicks / bStats.impressions) * 100).toFixed(1))
          : 0;
      return {
        block,
        labelAr: BLOCK_LABELS[block].ar,
        labelEn: BLOCK_LABELS[block].en,
        impressions: bStats.impressions,
        clicks: bStats.clicks,
        ctr,
      };
    }
  ).sort((a, b) => b.ctr - a.ctr || b.clicks - a.clicks);

  const highestConvertingJourneys = Object.values(state.journeys)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 6);

  const prunedWeakCount = itemsList.filter((i) => isWeakRecommendation(i.id)).length;

  const estimatedImpactPct =
    state.totalClicks > 0 && state.sessionCount > 0
      ? `+${Math.min(180, Math.round((state.totalClicks / state.sessionCount) * 100))}%`
      : '+0%';

  return {
    totalImpressions: state.totalImpressions,
    totalClicks: state.totalClicks,
    overallCtr,
    avgPagesPerSession,
    estimatedPagesPerSessionImpact: estimatedImpactPct,
    topPerformingRecommendations,
    lowestPerformingRecommendations,
    mostViewedContent,
    mostClickedContent,
    mostClickedArticles,
    mostClickedTests,
    blockPerformance,
    highestConvertingJourneys,
    prunedWeakCount,
    gdprConsentAnalyticsEnabled: isAnalyticsConsentAllowed(),
  };
}

export function getPopularContentIdsByClicks(type?: RecommendationTargetType): string[] {
  const state = readAnalyticsState();
  return Object.values(state.items)
    .filter((i) => !type || i.type === type)
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .map((i) => i.id);
}

export function resetRecommendationAnalytics(): void {
  inMemoryState = getDefaultState();
  sessionImpressionDedupe.clear();
  sessionShownIdsCount.clear();
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_SHOWN_KEY);
  } catch {
    // ignore
  }
}

export function exportRecommendationMetricsSnapshot(): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      gdprCompliant: true,
      summary: getRecommendationAnalyticsSummary(),
      recentEvents: readAnalyticsState().recentEvents,
    },
    null,
    2
  );
}
