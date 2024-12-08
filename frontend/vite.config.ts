import {VitePWA} from 'vite-plugin-pwa'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {comlink} from 'vite-plugin-comlink'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    comlink(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'cipher-notes',
        short_name: 'cipher-notes',
        description: 'cipher-notes',
        theme_color: '#1864ab',
        background_color: '#000000',
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  worker: {
    plugins: () => [comlink()],
  },
})
