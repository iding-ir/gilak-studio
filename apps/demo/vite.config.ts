import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@gilak/canvas': resolve(__dirname, '../../packages/gilak-canvas/src'),
      '@gilak/color-picker': resolve(__dirname, '../../packages/gilak-color-picker/src'),
      '@gilak/color-swatch': resolve(__dirname, '../../packages/gilak-color-swatch/src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {},
    },
  },
})
