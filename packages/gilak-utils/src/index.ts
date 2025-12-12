// Color utilities
export {
  convertArrayToHex,
  getBackgroundColor,
  getContrastColor,
  randomColor,
} from "./color";

// Canvas utilities
export {
  drawCheckerboard,
  drawCircles,
  drawGradient,
  drawQuadrants,
  drawWaves,
  getCanvasColor,
} from "./canvas";

// Performance utilities
export { debounce, throttle } from "./performance";

// Deprecated aliases for backward compatibility
export { getCanvasColor as pickColorFromCanvas } from "./canvas/get-canvas-color";
export { convertArrayToHex as arrayToHex } from "./color/convert-array-to-hex";
export { getContrastColor as getBlackAndWhiteColor } from "./color/get-contrast-color";

// Storage utilities
export {
  getItem,
  getItemSync,
  keysWithPrefix,
  keysWithPrefixSync,
  removeItem,
  removeItemSync,
  setItem,
  setItemSync,
} from "./storage";
