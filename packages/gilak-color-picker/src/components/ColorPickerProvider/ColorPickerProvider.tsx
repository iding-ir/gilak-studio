import type { ReactNode } from "react";
import { useReducer } from "react";

import {
  DEFAULT_BORDER_WIDTH,
  DEFAULT_ENABLED,
  DEFAULT_GRID_SIZE,
  DEFAULT_HOVER_COLOR,
  DEFAULT_MAGNIFIER_RADIUS,
  DEFAULT_SELECTED_COLOR,
} from "../../constants";
import { ColorPickerContext } from "../../context/ColorPickerContext";
import { colorPickerReducer } from "../../context/reducer";
import type { ColorPickerContextType, ColorPickerState } from "../../types";

export type ColorPickerProviderProps = { children: ReactNode } & Pick<
  ColorPickerContextType,
  "enabled" | "magnifierRadius" | "gridSize" | "borderWidth"
>;

export const ColorPickerProvider = ({
  children,
  enabled = DEFAULT_ENABLED,
  magnifierRadius = DEFAULT_MAGNIFIER_RADIUS,
  gridSize = DEFAULT_GRID_SIZE,
  borderWidth = DEFAULT_BORDER_WIDTH,
}: ColorPickerProviderProps) => {
  const INITIAL_STATE: ColorPickerState = {
    enabled,
    magnifierRadius,
    gridSize,
    borderWidth,
    hoverColor: DEFAULT_HOVER_COLOR,
    selectedColor: DEFAULT_SELECTED_COLOR,
    isHovered: false,
  };
  const [state, dispatch] = useReducer(colorPickerReducer, INITIAL_STATE);

  const setEnabled = (value: boolean) =>
    dispatch({ type: "ENABLE_COLOR_PICKER", payload: value });

  const toggleEnabled = () => dispatch({ type: "TOGGLE_IS_ENABLED" });

  const setMagnifierRadius = (value: number) =>
    dispatch({ type: "SET_MAGNIFIER_RADIUS", payload: value });

  const setGridSize = (value: number) =>
    dispatch({ type: "SET_GRID_SIZE", payload: value });

  const setBorderWidth = (value: number) =>
    dispatch({ type: "SET_BORDER_WIDTH", payload: value });

  const setHoverColor = (value: string) =>
    dispatch({ type: "SET_HOVER_COLOR", payload: value });

  const setSelectedColor = (value: string) =>
    dispatch({ type: "SET_SELECTED_COLOR", payload: value });

  const setIsHovered = (value: boolean) =>
    dispatch({ type: "SET_IS_HOVERED", payload: value });

  return (
    <ColorPickerContext
      value={{
        ...state,
        setEnabled,
        toggleEnabled,
        setMagnifierRadius,
        setGridSize,
        setBorderWidth,
        setHoverColor,
        setSelectedColor,
        setIsHovered,
      }}
    >
      {children}
    </ColorPickerContext>
  );
};
