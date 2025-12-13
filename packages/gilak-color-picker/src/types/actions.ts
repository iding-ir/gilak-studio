export type ColorPickerAction =
  | { type: "ENABLE_COLOR_PICKER"; payload: boolean }
  | { type: "TOGGLE_IS_ENABLED" }
  | { type: "SET_MAGNIFIER_RADIUS"; payload: number }
  | { type: "SET_GRID_SIZE"; payload: number }
  | { type: "SET_BORDER_WIDTH"; payload: number }
  | { type: "SET_HOVER_COLOR"; payload: string }
  | { type: "SET_SELECTED_COLOR"; payload: string }
  | { type: "SET_IS_HOVERED"; payload: boolean };
