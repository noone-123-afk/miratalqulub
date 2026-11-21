import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
  if (
    id.includes('src/data/articlesData') ||
    id.includes('src/data/homeArticlesRankData') ||
    id.includes('src/data/novelsData') ||
    id.includes('src/data/userNovelsData') ||
    id.includes('src/data/pdfFourBigFiveArticles') ||
    id.includes('src/data/relationshipFourArticles') ||
    id.includes('src/data/emotionalIntelligenceSeriesArticles') ||
    id.includes('src/data/emotionalIntelligencePart2Articles') ||
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
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'script-defer',
        includeAssets: [
          'icon.svg',
          'logo.avif',
          'apple-touch-icon.png',
          'pwa-192x192.avif',
          'pwa-512x512.avif',
          'pwa-maskable-512x512.avif',
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
              src: '/pwa-192x192.avif',
              sizes: '192x192',
              type: 'image/avif',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.avif',
              sizes: '512x512',
              type: 'image/avif',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.avif',
              sizes: '512x512',
              type: 'image/avif',
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
