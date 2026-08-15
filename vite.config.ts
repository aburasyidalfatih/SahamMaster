import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          injectRegister: 'auto',
          workbox: {
            navigateFallbackDenylist: [/^\/login/, /^\/admin/]
          },
          manifest: {
            name: 'SahamMaster Indonesia - 30 Hari Jadi Trader',
            short_name: 'SahamMaster',
            theme_color: '#1e40af',
            background_color: '#ffffff',
            display: 'standalone',
            start_url: './',
            icons: [
              {
                src: '/logo.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.API_KEY || env.GEMINI_API_KEY || process.env.API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY || process.env.GEMINI_API_KEY || '')
      },
      build: {
        cssCodeSplit: true,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom'],
              'vendor-icons': ['lucide-react']
            }
          }
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
