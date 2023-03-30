import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig , splitVendorChunkPlugin } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'

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
    splitVendorChunkPlugin(),
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
    includeSource: ['src/**/*.{js,ts}']
  },
})
