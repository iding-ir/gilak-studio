// Components
export { Magnifier, Text } from "./components";

// Context & Hooks
export { ColorPickerProvider, useColorPicker } from "./context";
export { useMagnifier } from "./hooks";

// Types
export type {
  ColorPickerAction,
  ColorPickerConfig,
  ColorPickerState,
} from "./context";
export type { ColorType } from "./types";

// Constants
export {
  DEFAULT_CURRENT_COLOR,
  DEFAULT_RADIUS,
  DEFAULT_SELECTED_COLOR,
  DEFAULT_SIZE,
  DEFAULT_WIDTH,
} from "./constants";
