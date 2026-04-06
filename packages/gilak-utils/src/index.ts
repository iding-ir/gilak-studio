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

// Time utilities
export { getRelativeTimeBucket, type RelativeTimeBucket } from "./time";

// DOM utilities
export { setAttribute, toggleFullscreen, useHead, watchElement } from "./dom";

// File utilities
export {
  blobToDataUrl,
  dataUrlToImage,
  loadImageFromSrc,
  subscribeToImageLoad,
} from "./file";

// Storage
export {
  getIndexedDbFactory,
  getItem,
  getItemSync,
  getValue,
  keysWithPrefix,
  keysWithPrefixSync,
  listKeysWithPrefix,
  openDatabase,
  removeItem,
  removeItemSync,
  removeValue,
  setItem,
  setItemSync,
  setValue,
  type StoredValue,
} from "./storage";

// String
export { randomId } from "./string/random-id";

// History
export { type History, history } from "./history/history";
