import { createLibraryConfig } from '../build-config/vite.config.base'
import { defineConfig, mergeConfig } from 'vite'

const baseConfig = createLibraryConfig({
  entry: 'src/index.ts',
  name: 'GilakComponents',
  fileName: 'gilak-components',
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
