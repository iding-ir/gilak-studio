import type { ColorPickerAction, ColorPickerState } from "../types";

export const colorPickerReducer = (
  state: ColorPickerState,
  action: ColorPickerAction,
): ColorPickerState => {
  switch (action.type) {
    case "ENABLE_COLOR_PICKER":
      return { ...state, enabled: action.payload };
    case "TOGGLE_IS_ENABLED":
      return { ...state, enabled: !state.enabled };
    case "SET_MAGNIFIER_RADIUS":
      return { ...state, magnifierRadius: action.payload };
    case "SET_GRID_SIZE":
      return { ...state, gridSize: action.payload };
    case "SET_BORDER_WIDTH":
      return { ...state, borderWidth: action.payload };
    case "SET_HOVER_COLOR":
      return { ...state, hoverColor: action.payload };
    case "SET_SELECTED_COLOR":
      return { ...state, selectedColor: action.payload };
    case "SET_IS_HOVERED":
      return { ...state, isHovered: action.payload };
    default:
      return state;
  }
};
