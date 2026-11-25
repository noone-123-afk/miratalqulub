import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INDEX_ACADEMIC_META,
  INDEX_ARTICLES_META,
  INDEX_NOVELS_META,
} from '../data/catalogMetadataIndex';

export const BASE_URL = 'https://miratalqulub.com';

export interface StaticSitemapRoute {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

/**
 * All canonical active application routes (excluding owner-only /admin-cms).
 */
export const APPLICATION_ROUTES: ReadonlyArray<StaticSitemapRoute> = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/compatibility', changefreq: 'weekly', priority: '0.95' },
  { path: '/personality-tests', changefreq: 'weekly', priority: '0.95' },
  { path: '/iq-tests', changefreq: 'weekly', priority: '0.95' },
  { path: '/articles', changefreq: 'daily', priority: '0.95' },
  { path: '/novels', changefreq: 'daily', priority: '0.95' },
  { path: '/tools', changefreq: 'weekly', priority: '0.9' },
  { path: '/methodology', changefreq: 'weekly', priority: '0.95' },
  { path: '/about', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact', changefreq: 'weekly', priority: '0.9' },
  { path: '/privacy', changefreq: 'weekly', priority: '0.95' },
  { path: '/terms', changefreq: 'weekly', priority: '0.9' },
  { path: '/faq', changefreq: 'weekly', priority: '0.9' },
  { path: '/how-it-works', changefreq: 'weekly', priority: '0.9' },
  { path: '/how-results-are-calculated', changefreq: 'weekly', priority: '0.9' },
  { path: '/compatibility-algorithm', changefreq: 'weekly', priority: '0.85' },
  { path: '/disclaimer', changefreq: 'weekly', priority: '0.85' },
  { path: '/profile', changefreq: 'weekly', priority: '0.8' },
];

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

function escapeXml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeDate(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback;
  const trimmed = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString().slice(0, 10);
}

export function buildSitemapXml(baseUrl = BASE_URL): { xml: string; totalUrls: number } {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().slice(0, 10);
  const seen = new Set<string>();
  const entries: SitemapEntry[] = [];

  const addEntry = (entry: SitemapEntry) => {
    if (seen.has(entry.loc)) return;
    seen.add(entry.loc);
    entries.push(entry);
  };

  // 1. Core static routes
  for (const route of APPLICATION_ROUTES) {
    const cleanPath = route.path === '/' ? '/' : `/${route.path.replace(/^\/+|\/+$/g, '')}`;
    addEntry({
      loc: `${cleanBase}${cleanPath}`,
      lastmod: today,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // 2. Dynamic narrative article routes (/articles/:id)
  for (const article of INDEX_ARTICLES_META) {
    if (!article.id) continue;
    addEntry({
      loc: `${cleanBase}/articles/${encodeURIComponent(article.id)}`,
      lastmod: normalizeDate(article.publishDate, today),
      changefreq: 'monthly',
      priority: '0.85',
    });
  }

  // 3. Dynamic academic research paper routes (/articles/:id)
  for (const paper of INDEX_ACADEMIC_META) {
    if (!paper.id) continue;
    addEntry({
      loc: `${cleanBase}/articles/${encodeURIComponent(paper.id)}`,
      lastmod: normalizeDate(paper.publishDate, today),
      changefreq: 'monthly',
      priority: '0.85',
    });
  }

  // 4. Dynamic novel detail & chapter reader routes (/novels/:id & /novels/:id/chapter/:n)
  for (const novel of INDEX_NOVELS_META) {
    if (!novel.id) continue;
    const encodedNovelId = encodeURIComponent(novel.id);
    addEntry({
      loc: `${cleanBase}/novels/${encodedNovelId}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.85',
    });

    for (let chapter = 1; chapter <= (novel.totalChapters || 0); chapter += 1) {
      addEntry({
        loc: `${cleanBase}/novels/${encodedNovelId}/chapter/${chapter}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.75',
      });
    }
  }

  const urlNodes = entries.map(
    (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes.join('\n')}
</urlset>
`;

  return { xml, totalUrls: entries.length };
}

export function generateSitemap(): { publicPath: string; totalUrls: number } {
  const publicPath = path.resolve('public', 'sitemap.xml');
  const { xml, totalUrls } = buildSitemapXml(BASE_URL);

  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  fs.writeFileSync(publicPath, xml, 'utf-8');

  return { publicPath, totalUrls };
}

const isDirectExecution =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  Boolean(process.argv[1]) &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectExecution) {
  const { publicPath, totalUrls } = generateSitemap();
  console.log(
    `[generateSitemap] Wrote ${totalUrls} active URLs -> ${path.relative(process.cwd(), publicPath)}`
  );
}
