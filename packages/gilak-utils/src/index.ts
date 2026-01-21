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

// DOM utilities
export { setAttribute, toggleFullscreen, useHead, watchElement } from "./dom";

// Storage
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
