// Components
export { Magnifier, Text } from './components'

// Context & Hooks
export { ColorPickerProvider, useColorPicker } from './context'
export { useMagnifier } from './hooks'

// Types
export type { ColorPickerConfig, ColorPickerState, ColorPickerAction } from './types'

// Constants
export {
  DEFAULT_SIZE,
  DEFAULT_RADIUS,
  DEFAULT_WIDTH,
  DEFAULT_CURRENT_COLOR,
  DEFAULT_SELECTED_COLOR,
} from './constants'

// Re-export utilities from @gilak/utils for backward compatibility
export {
  convertArrayToHex,
  getContrastColor,
  getCanvasColor,
  getBackgroundColor,
  debounce,
  throttle,
  // Deprecated aliases
  arrayToHex,
  getBlackAndWhiteColor,
  pickColorFromCanvas,
} from '@gilak/utils'
