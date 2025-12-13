import type { ColorPickerContextType } from "./context";

export type ColorPickerState = Pick<
  ColorPickerContextType,
  | "enabled"
  | "magnifierRadius"
  | "gridSize"
  | "borderWidth"
  | "hoverColor"
  | "selectedColor"
  | "isHovered"
>;
