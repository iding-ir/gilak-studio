// Components
export { ColorPickerProvider } from "./components/ColorPickerProvider";
export { Magnifier } from "./components/Magnifier";
export { MagnifierProvider } from "./components/MagnifierProvider";

// Hooks
export { useColorPicker } from "./hooks/useColorPicker";
export { useMagnifier } from "./hooks/useMagnifier";

// Methods
export { renderMagnifierCanvas } from "./methods/render-magnifier-canvas";

// Types
export type { ColorPickerAction } from "./types";
export type { ColorPickerContextType } from "./types";
export type { ColorType } from "./types";
export type { ColorPickerState } from "./types";

// Context
export { ColorPickerContext } from "./context/ColorPickerContext";
export { colorPickerReducer } from "./context/reducer";

// Constants
export {
  DEFAULT_BORDER_WIDTH,
  DEFAULT_GRID_SIZE,
  DEFAULT_HOVER_COLOR,
  DEFAULT_MAGNIFIER_RADIUS,
  DEFAULT_SELECTED_COLOR,
} from "./constants";
