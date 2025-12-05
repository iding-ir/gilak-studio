import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

interface LibraryConfig {
  entry: string
  name: string
  fileName: string
}

export function createLibraryConfig(config: LibraryConfig): UserConfig {
  return defineConfig({
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
      dts({
        include: ['src'],
        exclude: ['**/*.stories.tsx', '**/*.stories.ts'],
        rollupTypes: true,
      }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {},
      },
    },
    build: {
      lib: {
        entry: resolve(process.cwd(), config.entry),
        name: config.name,
        formats: ['es', 'umd'],
        fileName: (format) => `${config.fileName}.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: `${config.fileName}.[ext]`,
        },
      },
    },
  })
}
