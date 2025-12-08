import { createLibraryConfig } from '../build-config/vite.config.base'
import { defineConfig, mergeConfig } from 'vite'

const baseConfig = createLibraryConfig({
  entry: 'src/index.ts',
  name: 'GilakColorSwatch',
  fileName: 'gilak-color-swatch',
})

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      rollupOptions: {
        external: ['react', 'react-dom', '@gilak/utils'],
      },
    },
  })
)
