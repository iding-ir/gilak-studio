import { createLibraryConfig } from '../build-config/vite.config.base'

export default createLibraryConfig({
  entry: 'src/index.ts',
  name: 'GilakColorSwatch',
  fileName: 'gilak-color-swatch',
})
