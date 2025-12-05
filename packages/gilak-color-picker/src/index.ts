// Components
export { Magnifier, Text } from './components'

// Context & Hooks
export { ColorPickerProvider, useColorPicker } from './context'
export { useMagnifier } from './hooks'

// Types
export type { ColorPickerConfig, ColorPickerState, ColorPickerAction } from './types'

// Constants
export { DEFAULT_SIZE, DEFAULT_RADIUS, DEFAULT_WIDTH, DEFAULT_COLOR } from './constants'

// Utilities
export { arrayToHex, getBlackAndWhiteColor } from './methods'
export { debounce, throttle } from './utils'
