import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.vitest': undefined
  },
  base: './',
  server: {
    port: 8080
  },
  resolve:{
    alias:{
      'services' : resolve(__dirname, './src/services'),
      'hooks' : resolve(__dirname, './src/hooks'),
      'utils' : resolve(__dirname, './src/utils')
    },
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
    includeSource: ['src/**/*.{js,ts}'],
    server: {
      deps: {
        // MUI's ESM entry points perform directory imports of
        // react-transition-group that Node's native ESM loader cannot resolve
        // once externalized. Inlining lets Vite resolve them under test.
        inline: [/@mui/, /react-transition-group/]
      }
    }
  },
})
