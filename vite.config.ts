import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'icon.svg',
          'logo.webp',
          'logo.jpg',
          'llms.txt',
          'ard.json',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
        ],
        manifest: {
          id: '/',
          name: 'مرآة القلوب | كاشف شريك الحياة والتحليل السيكومتري',
          short_name: 'مرآة القلوب',
          description: 'منصة تفاعلية لتحليل الشخصية وكشف ملامح ومواصفات شريك الحياة الواقعية وفق أسس علمية معتمدة',
          theme_color: '#0f0c20',
          background_color: '#0f0c20',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
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
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
          navigateFallbackDenylist: [
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
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('firebase') || id.includes('@firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('framer-motion') || id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('recharts') || id.includes('d3-')) {
                return 'vendor-charts';
              }
              if (id.includes('react-dom') || id.includes('react/')) {
                return 'vendor-react';
              }
            }
          },
        },
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
