import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function collectCriticalTokens(): Set<string> {
  const files = [
    'index.html',
    'src/App.tsx',
    'src/components/Navbar.tsx',
    'src/pages/HomePage.tsx',
    'src/context/LanguageContext.tsx',
    'scripts/prerender-routes.ts',
  ];
  const tokens = new Set<string>([
    'dark',
    'light',
    'lang-ar',
    'lang-en',
    'dir-rtl',
    'dir-ltr',
    'text-right',
    'text-left',
    'min-h-[2400px]',
    'min-h-[420px]',
  ]);

  for (const rel of files) {
    const abs = path.resolve(rel);
    if (!fs.existsSync(abs)) continue;
    const content = fs.readFileSync(abs, 'utf-8');
    const parts = content.split(/[\s"'`<>(){}]+/);
    for (const part of parts) {
      if (part && part.length <= 120) {
        tokens.add(part);
      }
    }
  }
  return tokens;
}

function splitCssBlocks(css: string): { prefix: string; block: string; suffix: string }[] {
  const results: { prefix: string; block: string; suffix: string }[] = [];
  let i = 0;
  let blockStart = 0;
  let depth = 0;

  while (i < css.length) {
    const ch = css[i];
    if (ch === '\\') {
      i += 2;
      continue;
    }
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? css.length : end + 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      i += 1;
      while (i < css.length && css[i] !== quote) {
        if (css[i] === '\\') i += 1;
        i += 1;
      }
      i += 1;
      continue;
    }
    if (ch === '{') {
      depth += 1;
    } else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        results.push({
          prefix: '',
          block: css.slice(blockStart, i + 1),
          suffix: '',
        });
        blockStart = i + 1;
      }
    } else if (depth === 0 && ch === ';') {
      results.push({
        prefix: '',
        block: css.slice(blockStart, i + 1),
        suffix: '',
      });
      blockStart = i + 1;
    }
    i += 1;
  }

  return results;
}

function unescapeCssClass(raw: string): string {
  return raw
    .replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_m, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/\\(.)/g, '$1');
}

function selectorMatchesTokens(selector: string, tokens: Set<string>): boolean {
  let hasClass = false;
  let i = 0;
  while (i < selector.length) {
    if (selector[i] === '\\') {
      i += 2;
      continue;
    }
    if (selector[i] === '.') {
      hasClass = true;
      i += 1;
      let rawClass = '';
      while (i < selector.length) {
        const ch = selector[i];
        if (ch === '\\' && i + 1 < selector.length) {
          rawClass += ch + selector[i + 1];
          i += 2;
          continue;
        }
        if (/[\s,:>+~[\].()]/.test(ch)) break;
        rawClass += ch;
        i += 1;
      }
      const decoded = unescapeCssClass(rawClass);
      if (tokens.has(decoded)) {
        return true;
      }
      continue;
    }
    i += 1;
  }
  return !hasClass;
}

function filterCssRules(innerCss: string, tokens: Set<string>): string {
  const blocks = splitCssBlocks(innerCss);
  const kept: string[] = [];

  for (const { block } of blocks) {
    const trimmed = block.trim();
    const openIdx = trimmed.indexOf('{');
    if (openIdx === -1) continue;
    const header = trimmed.slice(0, openIdx).trim();

    if (header.startsWith('@media') || header.startsWith('@supports') || header.startsWith('@container')) {
      const inner = trimmed.slice(openIdx + 1, -1);
      const filteredInner = filterCssRules(inner, tokens);
      if (filteredInner) {
        kept.push(`${header}{${filteredInner}}`);
      }
    } else if (selectorMatchesTokens(header, tokens)) {
      kept.push(trimmed);
    }
  }

  return kept.join('');
}

function buildCriticalCss(fullCss: string): string {
  const tokens = collectCriticalTokens();
  const blocks = splitCssBlocks(fullCss);
  const output: string[] = [];

  for (const { block } of blocks) {
    const trimmed = block.trim();
    const openIdx = trimmed.indexOf('{');
    if (openIdx === -1) continue;
    const header = trimmed.slice(0, openIdx).trim();

    if (header === '@layer utilities') {
      const inner = trimmed.slice(openIdx + 1, -1);
      const filtered = filterCssRules(inner, tokens);
      if (filtered) {
        output.push(`@layer utilities{${filtered}}`);
      }
    } else {
      output.push(trimmed);
    }
  }

  return output.join('');
}

function criticalCssAsyncPlugin(): Plugin {
  return {
    name: 'mirat-critical-css-async',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;

      let cssFileName: string | null = null;
      let fullCss = '';
      for (const [fileName, asset] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && asset.type === 'asset') {
          cssFileName = `/${fileName}`;
          fullCss = typeof asset.source === 'string' ? asset.source : Buffer.from(asset.source).toString('utf-8');
          break;
        }
      }

      if (!cssFileName || !fullCss) return html;

      const criticalCss = buildCriticalCss(fullCss);
      const escapedHref = cssFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const linkRegex = new RegExp(`<link\\s+rel="stylesheet"[^>]*href="${escapedHref}"[^>]*>`, 'i');

      if (!linkRegex.test(html)) return html;

      const replacement = [
        `<style id="mirat-critical-css">${criticalCss}</style>`,
        `<link rel="stylesheet" crossorigin href="${cssFileName}" media="print" onload="this.media='all'">`,
        `<noscript><link rel="stylesheet" crossorigin href="${cssFileName}"></noscript>`,
      ].join('\n    ');

      console.log(
        `[critical-css] Inlined ${(Buffer.byteLength(criticalCss) / 1024).toFixed(1)} KB critical CSS (from ${(Buffer.byteLength(fullCss) / 1024).toFixed(1)} KB full CSS) and deferred main stylesheet.`
      );

      return html.replace(linkRegex, replacement);
    },
  };
}

function manualChunkMatcher(id: string): string | undefined {
  // Always keep Vite's dynamic import preload helper in vendor-react so index.js never imports from lazy chunks
  if (id.includes('preload-helper')) {
    return 'vendor-react';
  }

  if (id.includes('node_modules')) {
    // 1. Core React runtime FIRST
    if (
      id.includes('/react-dom/') ||
      id.includes('/react/') ||
      id.includes('/scheduler/') ||
      id.includes('/react-is/') ||
      id.includes('/prop-types/')
    ) {
      return 'vendor-react';
    }
    // 2. Icons
    if (id.includes('lucide-react')) {
      return 'vendor-icons';
    }
    // 3. Animation engine (lazy loaded with interactive steps & modals)
    if (
      id.includes('framer-motion') ||
      id.includes('motion-dom') ||
      id.includes('motion-utils')
    ) {
      return 'vendor-motion';
    }
    // 4. Firebase Firestore (lazy loaded only when cloud DB is accessed)
    if (id.includes('@firebase/firestore') || id.includes('firebase/firestore')) {
      return 'vendor-firebase-firestore';
    }
    // 5. Firebase Auth & App core (lazy loaded after initial render)
    if (id.includes('firebase') || id.includes('@firebase')) {
      return 'vendor-firebase-auth';
    }
    // 6. Charting libraries (lazy loaded only in Result / Analytics / Psychometrics)
    if (
      id.includes('recharts') ||
      id.includes('d3-') ||
      id.includes('victory-vendor') ||
      id.includes('internmap') ||
      id.includes('es-toolkit') ||
      id.includes('clsx') ||
      id.includes('tiny-invariant') ||
      id.includes('eventemitter3') ||
      id.includes('decimal.js-light')
    ) {
      return 'vendor-charts';
    }
    // 7. PDF & Canvas export engines (lazy loaded only when user clicks Export PDF/Image)
    if (
      id.includes('jspdf') ||
      id.includes('html2canvas') ||
      id.includes('dompurify') ||
      id.includes('canvg') ||
      id.includes('fflate')
    ) {
      return 'vendor-pdf';
    }
  }

  // Fine-grained splitting for heavy application data & engines
  if (id.includes('src/data/tieredPsychologyBank')) {
    return 'data-tiered-assessment';
  }
  if (
    id.includes('src/utils/tieredScoringEngine') ||
    id.includes('src/utils/personalityComparisonEngine')
  ) {
    return 'engine-comparison';
  }
  if (
    id.includes('src/data/psychologyTestData') ||
    id.includes('src/data/intelligenceTestData')
  ) {
    return 'data-psychometrics';
  }
  if (id.includes('src/data/catalogMetadataIndex')) {
    return 'data-catalog-index';
  }
  if (
    id.includes('src/data/cbtSeriesArticles') ||
    id.includes('src/data/psychologicalCounselingArticles') ||
    id.includes('src/data/mentalHealthSeriesArticles')
  ) {
    return 'data-articles-clinical';
  }
  if (
    id.includes('src/data/workplaceEiArticles') ||
    id.includes('src/data/careerGrowthArticles') ||
    id.includes('src/data/leadershipArticles') ||
    id.includes('src/data/universityMajorsArticles') ||
    id.includes('src/data/careerGuidanceArticles')
  ) {
    return 'data-articles-career';
  }
  if (
    id.includes('src/data/gulfSocietyArticles') ||
    id.includes('src/data/consciousMarriageArticles') ||
    id.includes('src/data/selfUnderstandingArticles') ||
    id.includes('src/data/emotionalIntelligencePart2Articles')
  ) {
    return 'data-articles-society';
  }
  if (
    id.includes('src/data/articlesData') ||
    id.includes('src/data/homeArticlesRankData') ||
    id.includes('src/data/novelsData') ||
    id.includes('src/data/userNovelsData') ||
    id.includes('src/data/pdfFourBigFiveArticles') ||
    id.includes('src/data/relationshipFourArticles') ||
    id.includes('src/data/emotionalIntelligenceSeriesArticles') ||
    id.includes('src/data/platformIntroductoryArticles') ||
    id.includes('src/data/clinical') ||
    id.includes('src/data/academicPapersData')
  ) {
    return 'data-content';
  }
  if (id.includes('src/data/translations') || id.includes('src/i18n')) {
    return 'data-translations';
  }
  if (
    id.includes('src/data/questions') ||
    id.includes('src/data/communityProfiles')
  ) {
    return 'data-compatibility';
  }
  return undefined;
}

export default defineConfig(({ command }) => {
  if (command === 'build') {
    process.env.NODE_ENV = 'production';
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      criticalCssAsyncPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'script-defer',
        includeAssets: [
          'icon.svg',
          'logo.webp',
          'logo-48.webp',
          'logo-64.webp',
          'logo-96.webp',
          'logo-112.webp',
          'og-image.webp',
          'og-image-480.webp',
          'og-image-800.webp',
          'og-image.jpg',
          'og-image.png',
          'apple-touch-icon.webp',
          'apple-touch-icon.png',
          'pwa-96x96.webp',
          'pwa-192x192.webp',
          'pwa-256x256.webp',
          'pwa-512x512.webp',
          'pwa-maskable-512x512.webp',
        ],
        manifest: {
          id: '/',
          name: 'مرآة القلوب | كاشف شريك الحياة والتحليل السيكومتري',
          short_name: 'مرآة القلوب',
          description:
            'منصة تفاعلية لتحليل الشخصية وكشف ملامح ومواصفات شريك الحياة الواقعية وفق أسس علمية معتمدة',
          theme_color: '#0f0c20',
          background_color: '#0f0c20',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-96x96.webp',
              sizes: '96x96',
              type: 'image/webp',
              purpose: 'any',
            },
            {
              src: '/pwa-192x192.webp',
              sizes: '192x192',
              type: 'image/webp',
              purpose: 'any',
            },
            {
              src: '/pwa-256x256.webp',
              sizes: '256x256',
              type: 'image/webp',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.webp',
              sizes: '512x512',
              type: 'image/webp',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.webp',
              sizes: '512x512',
              type: 'image/webp',
              purpose: 'maskable',
            },
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
          globPatterns: [
            'index.html',
            'manifest.webmanifest',
            'assets/index-*.{js,css}',
            'assets/vendor-react-*.js',
            'assets/vendor-icons-*.js',
            'assets/rolldown-runtime-*.js',
          ],
          globIgnores: [
            '**/ai-catalog.json',
            '**/.well-known/**',
            '**/ard.json',
            '**/llms*.txt',
            '**/data-*.js',
            '**/vendor-pdf-*.js',
            '**/vendor-charts-*.js',
            '**/vendor-firebase-*.js',
            '**/psychologySuiteData-*.js',
          ],
          runtimeCaching: [
            {
              urlPattern: /\/assets\/.*\.(?:js|css|avif|webp|png|svg)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'mirat-lazy-assets-cache',
                expiration: {
                  maxEntries: 90,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 15,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
          navigateFallbackDenylist: [
            /^\/ai-catalog\.json$/,
            /^\/\.well-known\/ai-catalog\.json$/,
            /^\/llms\.txt$/,
            /^\/llms-full\.txt$/,
            /^\/ard\.json$/,
            /^\/\.well-known\/ard\.json$/,
            /^\/api\//,
            /^\/ads\.txt$/,
            /^\/robots\.txt$/,
            /^\/sitemap\.xml$/,
          ],
        },
        devOptions: {
          enabled: false,
          type: 'module',
        },
      }),
    ],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: true,
      chunkSizeWarningLimit: 600,
      modulePreload: {
        resolveDependencies(_filename, deps) {
          return deps.filter(
            (dep) =>
              !dep.includes('vendor-firebase') &&
              !dep.includes('vendor-charts') &&
              !dep.includes('vendor-pdf') &&
              !dep.includes('vendor-motion') &&
              !dep.includes('data-') &&
              !dep.includes('engine-')
          );
        },
      },
      rollupOptions: {
        output: {
          codeSplitting: {
            includeDependenciesRecursively: false,
            groups: [
              {
                name(id: string) {
                  return manualChunkMatcher(id);
                },
              },
            ],
          },
        } as any,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio environment to prevent WebSocket connection errors in iFrame proxy
      hmr: false as const,
      ws: false as const,
      watch: null,
    },
  };
});
