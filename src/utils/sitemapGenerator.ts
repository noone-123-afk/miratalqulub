import {
  INDEX_ACADEMIC_META,
  INDEX_ARTICLES_META,
  INDEX_NOVELS_META,
} from '../data/catalogMetadataIndex';
import { SitePage } from './navigation';

export const SITEMAP_BASE_URL = 'https://miratalqulub.com';

export type SitemapChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface SitemapStaticRouteConfig {
  path: string;
  page: SitePage;
  changefreq: SitemapChangeFreq;
  priority: string;
}

export interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
  changefreq: SitemapChangeFreq;
  priority: string;
  section: 'core' | 'article' | 'academic' | 'novel' | 'chapter';
}

export interface SitemapStats {
  totalUrls: number;
  corePages: number;
  articles: number;
  academicPapers: number;
  novels: number;
  chapters: number;
}

export interface GeneratedSitemapResult {
  xml: string;
  entries: SitemapUrlEntry[];
  stats: SitemapStats;
}

/**
 * Canonical public routes matching src/utils/navigation.ts (parseAppRoute).
 * Excludes owner-only routes (/admin-cms) and non-canonical alias paths.
 */
export const ACTIVE_STATIC_ROUTES: ReadonlyArray<SitemapStaticRouteConfig> = [
  { path: '/', page: 'home', changefreq: 'daily', priority: '1.0' },
  { path: '/compatibility', page: 'compatibility', changefreq: 'weekly', priority: '0.95' },
  { path: '/personality-tests', page: 'personality-tests', changefreq: 'weekly', priority: '0.95' },
  { path: '/iq-tests', page: 'iq-tests', changefreq: 'weekly', priority: '0.95' },
  { path: '/articles', page: 'articles', changefreq: 'daily', priority: '0.95' },
  { path: '/novels', page: 'novels', changefreq: 'daily', priority: '0.95' },
  { path: '/tools', page: 'tools', changefreq: 'weekly', priority: '0.9' },
  { path: '/methodology', page: 'methodology', changefreq: 'weekly', priority: '0.95' },
  { path: '/about', page: 'about', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact', page: 'contact', changefreq: 'weekly', priority: '0.9' },
  { path: '/privacy', page: 'privacy', changefreq: 'weekly', priority: '0.95' },
  { path: '/terms', page: 'terms', changefreq: 'weekly', priority: '0.9' },
  { path: '/faq', page: 'faq', changefreq: 'weekly', priority: '0.9' },
  { path: '/how-it-works', page: 'how-it-works', changefreq: 'weekly', priority: '0.9' },
  {
    path: '/how-results-are-calculated',
    page: 'how-results-are-calculated',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/compatibility-algorithm',
    page: 'how-it-works',
    changefreq: 'weekly',
    priority: '0.85',
  },
  { path: '/disclaimer', page: 'disclaimer', changefreq: 'weekly', priority: '0.85' },
  { path: '/profile', page: 'profile', changefreq: 'weekly', priority: '0.8' },
];

export function escapeXml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeLastMod(rawDate: string | undefined, fallbackDate: string): string {
  if (!rawDate) return fallbackDate;
  const trimmed = rawDate.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return fallbackDate;
}

export function buildSitemapEntries(options?: {
  baseUrl?: string;
  lastmod?: string;
  includeChapters?: boolean;
}): SitemapUrlEntry[] {
  const baseUrl = (options?.baseUrl || SITEMAP_BASE_URL).replace(/\/+$/, '');
  const today = options?.lastmod || new Date().toISOString().slice(0, 10);
  const includeChapters = options?.includeChapters !== false;

  const entries: SitemapUrlEntry[] = [];
  const seenLocs = new Set<string>();

  const pushUnique = (entry: SitemapUrlEntry) => {
    if (seenLocs.has(entry.loc)) return;
    seenLocs.add(entry.loc);
    entries.push(entry);
  };

  for (const route of ACTIVE_STATIC_ROUTES) {
    const cleanPath = route.path === '/' ? '/' : `/${route.path.replace(/^\/+|\/+$/g, '')}`;
    pushUnique({
      loc: `${baseUrl}${cleanPath}`,
      lastmod: today,
      changefreq: route.changefreq,
      priority: route.priority,
      section: 'core',
    });
  }

  for (const article of INDEX_ARTICLES_META) {
    if (!article.id) continue;
    pushUnique({
      loc: `${baseUrl}/articles/${encodeURIComponent(article.id)}`,
      lastmod: normalizeLastMod(article.publishDate, today),
      changefreq: 'monthly',
      priority: '0.85',
      section: 'article',
    });
  }

  for (const paper of INDEX_ACADEMIC_META) {
    if (!paper.id) continue;
    pushUnique({
      loc: `${baseUrl}/articles/${encodeURIComponent(paper.id)}`,
      lastmod: normalizeLastMod(paper.publishDate, today),
      changefreq: 'monthly',
      priority: '0.85',
      section: 'academic',
    });
  }

  for (const novel of INDEX_NOVELS_META) {
    if (!novel.id) continue;
    const encodedNovelId = encodeURIComponent(novel.id);
    pushUnique({
      loc: `${baseUrl}/novels/${encodedNovelId}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.85',
      section: 'novel',
    });

    if (includeChapters && novel.totalChapters > 0) {
      for (let ch = 1; ch <= novel.totalChapters; ch += 1) {
        pushUnique({
          loc: `${baseUrl}/novels/${encodedNovelId}/chapter/${ch}`,
          lastmod: today,
          changefreq: 'monthly',
          priority: '0.75',
          section: 'chapter',
        });
      }
    }
  }

  return entries;
}

export function renderSitemapXml(entries: ReadonlyArray<SitemapUrlEntry>): string {
  const urlBlocks = entries.map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks.join('\n')}
</urlset>
`;
}

export function generateSitemapXml(options?: {
  baseUrl?: string;
  lastmod?: string;
  includeChapters?: boolean;
}): GeneratedSitemapResult {
  const entries = buildSitemapEntries(options);
  const xml = renderSitemapXml(entries);

  const stats: SitemapStats = {
    totalUrls: entries.length,
    corePages: entries.filter((e) => e.section === 'core').length,
    articles: entries.filter((e) => e.section === 'article').length,
    academicPapers: entries.filter((e) => e.section === 'academic').length,
    novels: entries.filter((e) => e.section === 'novel').length,
    chapters: entries.filter((e) => e.section === 'chapter').length,
  };

  return { xml, entries, stats };
}
