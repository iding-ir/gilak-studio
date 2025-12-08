import { createLibraryConfig } from '../build-config/vite.config.base'
import { defineConfig, mergeConfig } from 'vite'

const baseConfig = createLibraryConfig({
  entry: 'src/index.ts',
  name: 'GilakUtils',
  fileName: 'gilak-utils',
})

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      rollupOptions: {
        external: ['react', 'react-dom'],
      },
    },
  })
)
