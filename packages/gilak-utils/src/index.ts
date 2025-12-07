// Color utilities
export { convertArrayToHex, getBackgroundColor, getContrastColor, randomColor } from './color'

// Canvas utilities
export {
  getCanvasColor,
  drawQuadrants,
  drawGradient,
  drawCircles,
  drawWaves,
  drawCheckerboard,
} from './canvas'

// Performance utilities
export { debounce, throttle } from './performance'

// Deprecated aliases for backward compatibility
export { convertArrayToHex as arrayToHex } from './color/convert-array-to-hex'
export { getContrastColor as getBlackAndWhiteColor } from './color/get-contrast-color'
export { getCanvasColor as pickColorFromCanvas } from './canvas/get-canvas-color'

// Storage utilities
export {
  getItem,
  setItem,
  removeItem,
  keysWithPrefix,
  getItemSync,
  setItemSync,
  removeItemSync,
  keysWithPrefixSync,
} from './storage'
