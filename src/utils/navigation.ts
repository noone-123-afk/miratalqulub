export type SitePage =
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'faq'
  | 'methodology'
  | 'disclaimer'
  | 'novels'
  | 'novel-detail'
  | 'chapter-reader'
  | 'admin-cms'
  | 'personality-tests'
  | 'articles'
  | 'compatibility'
  | 'how-results-are-calculated'
  | 'iq-tests'
  | 'tools'
  | 'profile';

export const CANONICAL_SITE_PAGES: ReadonlySet<SitePage> = new Set<SitePage>([
  'home',
  'about',
  'how-it-works',
  'privacy',
  'terms',
  'contact',
  'faq',
  'methodology',
  'disclaimer',
  'novels',
  'novel-detail',
  'chapter-reader',
  'admin-cms',
  'personality-tests',
  'articles',
  'compatibility',
  'how-results-are-calculated',
  'iq-tests',
  'tools',
  'profile',
]);

const LEGACY_HASH_FRAGMENTS = new Set<string>([
  'intelligence-tests',
  'psychology-tests',
  'blind-date',
  'about',
  'about-us',
  'contact',
  'contact-us',
  'privacy',
  'privacy-policy',
  'terms',
  'terms-of-service',
  'disclaimer',
  'methodology',
  'sources',
  'faq',
  'how-it-works',
  'how-results-are-calculated',
  'scoring-guide',
  'compatibility-algorithm',
  'compatibility',
  'personality-tests',
  'iq-tests',
  'tools',
  'articles',
  'novels',
  'profile',
  'admin-cms',
]);

/**
 * Normalizes any route input (e.g. "/privacy/", "#/privacy", "privacy") into a canonical Clean URL path ("/privacy").
 */
export function normalizeCleanPath(rawRoute: string): string {
  if (!rawRoute) return '/';
  let cleaned = rawRoute
    .trim()
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^#\/?/, '')
    .replace(/^\/+/, '');

  const [pathOnly] = cleaned.split('?');
  cleaned = pathOnly.replace(/\/+$/, '');

  if (!cleaned || cleaned.toLowerCase() === 'home' || cleaned.toLowerCase() === 'index.html') {
    return '/';
  }
  return `/${cleaned}`;
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Navigates using History API Clean URLs without hash fragments (#/) and notifies subscribers.
 */
export function navigateCleanUrl(
  targetPath: string,
  options?: { replace?: boolean; scrollToTop?: boolean; silent?: boolean }
): string {
  const cleanPath = normalizeCleanPath(targetPath);
  if (typeof window !== 'undefined') {
    const currentFull = window.location.pathname + window.location.search + window.location.hash;
    if (currentFull !== cleanPath) {
      if (options?.replace) {
        window.history.replaceState(null, '', cleanPath);
      } else {
        window.history.pushState(null, '', cleanPath);
      }
      if (!options?.silent) {
        window.dispatchEvent(new CustomEvent('mirat:navigate', { detail: cleanPath }));
      }
    }
    if (options?.scrollToTop !== false && !options?.silent) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  return cleanPath;
}

export interface ParsedAppRoute {
  page: SitePage;
  cleanPath: string;
  articleId?: string;
  articleCategory?: string;
  novelId?: string;
  chapterIndex?: number;
  openBookClub?: boolean;
  redirectCleanPath?: string;
}

/**
 * Parses clean pathname (without /#/) and cleanly migrates any legacy #/ or ?page= URLs.
 */
export function parseAppRoute(
  pathname: string,
  search: string,
  hash: string
): ParsedAppRoute {
  const trimmedHash = (hash || '').trim();
  const bareHash = trimmedHash.replace(/^#/, '').toLowerCase();
  const isHashRoute =
    trimmedHash.startsWith('#/') ||
    trimmedHash.startsWith('#articles/') ||
    trimmedHash.startsWith('#novels/') ||
    LEGACY_HASH_FRAGMENTS.has(bareHash);

  const hashWithoutPrefix = isHashRoute ? trimmedHash.replace(/^#\/?/, '') : '';
  const [hashPathPart, hashQueryPart] = hashWithoutPrefix.split('?');

  const rawPathname = pathname || '/';
  const pathPart = rawPathname.replace(/^\/+|\/+$/g, '');
  const searchParams = new URLSearchParams(search || (hashQueryPart ? `?${hashQueryPart}` : ''));
  const queryPage = (searchParams.get('page') || '').trim();

  const rawRoute = (hashPathPart || queryPage || pathPart).trim();
  const parts = rawRoute.split('/').filter(Boolean);
  const section = (parts[0] || '').toLowerCase();

  let page: SitePage = 'home';
  let cleanPath = '/';
  let articleId: string | undefined;
  let articleCategory: string | undefined;
  let novelId: string | undefined;
  let chapterIndex: number | undefined;
  let openBookClub = false;

  if (section === 'about' || section === 'about-us') {
    page = 'about';
    cleanPath = '/about';
  } else if (
    section === 'how-it-works' ||
    section === 'howitworks' ||
    section === 'compatibility-algorithm'
  ) {
    page = 'how-it-works';
    cleanPath = section === 'compatibility-algorithm' ? '/compatibility-algorithm' : '/how-it-works';
  } else if (section === 'privacy' || section === 'privacy-policy' || section === 'privacypolicy') {
    page = 'privacy';
    cleanPath = '/privacy';
  } else if (section === 'terms' || section === 'terms-of-service' || section === 'tos') {
    page = 'terms';
    cleanPath = '/terms';
  } else if (section === 'contact' || section === 'contact-us') {
    page = 'contact';
    cleanPath = '/contact';
  } else if (section === 'faq') {
    page = 'faq';
    cleanPath = '/faq';
  } else if (section === 'methodology' || section === 'sources') {
    page = 'methodology';
    cleanPath = '/methodology';
  } else if (section === 'disclaimer') {
    page = 'disclaimer';
    cleanPath = '/disclaimer';
  } else if (section === 'admin' || section === 'admin-cms') {
    page = 'admin-cms';
    cleanPath = '/admin-cms';
  } else if (section === 'articles' || section === 'research') {
    page = 'articles';
    const catParam = searchParams.get('category');
    if (catParam) articleCategory = catParam;
    if (parts[1]) {
      articleId = safeDecode(parts[1]);
      cleanPath = `/articles/${encodeURIComponent(articleId)}`;
    } else {
      cleanPath = '/articles';
    }
  } else if (section === 'community' || section === 'book-club' || section === 'salon') {
    page = 'home';
    cleanPath = '/';
    openBookClub = true;
  } else if (
    section === 'how-results-are-calculated' ||
    section === 'scoring-guide' ||
    section === 'how-tests-work' ||
    section === 'scoring'
  ) {
    page = 'how-results-are-calculated';
    cleanPath = '/how-results-are-calculated';
  } else if (
    section === 'personality-tests' ||
    section === 'personality' ||
    section === 'psychology-tests' ||
    section === 'mbti' ||
    section === 'big-five'
  ) {
    page = 'personality-tests';
    cleanPath = '/personality-tests';
  } else if (
    section === 'iq-tests' ||
    section === 'intelligence-tests' ||
    section === 'intelligence'
  ) {
    page = 'iq-tests';
    cleanPath = '/iq-tests';
  } else if (
    section === 'tools' ||
    section === 'interactive-tools' ||
    section === 'blind-date'
  ) {
    page = 'tools';
    cleanPath = '/tools';
  } else if (section === 'profile' || section === 'my-profile') {
    page = 'profile';
    cleanPath = '/profile';
  } else if (
    section === 'compatibility' ||
    section === 'partner-detector' ||
    section === 'partner'
  ) {
    page = 'compatibility';
    cleanPath = '/compatibility';
  } else if (section === 'novels') {
    if (parts[1]) {
      novelId = safeDecode(parts[1]);
      if (parts[2]?.toLowerCase() === 'chapter' && parts[3]) {
        const chNum = parseInt(parts[3], 10);
        const safeCh = Math.max(1, isNaN(chNum) ? 1 : chNum);
        chapterIndex = safeCh - 1;
        page = 'chapter-reader';
        cleanPath = `/novels/${encodeURIComponent(novelId)}/chapter/${safeCh}`;
      } else {
        page = 'novel-detail';
        cleanPath = `/novels/${encodeURIComponent(novelId)}`;
      }
    } else {
      page = 'novels';
      cleanPath = '/novels';
    }
  } else {
    page = 'home';
    cleanPath = '/';
  }

  const lowerPath = rawPathname.toLowerCase();
  const hasTrailingSlash = rawPathname.length > 1 && rawPathname.endsWith('/');
  const needsRedirect =
    isHashRoute ||
    Boolean(queryPage) ||
    hasTrailingSlash ||
    lowerPath === '/home' ||
    lowerPath === '/index.html';

  return {
    page,
    cleanPath,
    articleId,
    articleCategory,
    novelId,
    chapterIndex,
    openBookClub,
    redirectCleanPath: needsRedirect ? cleanPath : undefined,
  };
}
