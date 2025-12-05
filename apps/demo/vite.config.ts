import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'gilak-canvas': resolve(__dirname, '../../packages/gilak-canvas/src'),
      'gilak-eyedropper': resolve(__dirname, '../../packages/gilak-eyedropper/src'),
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
