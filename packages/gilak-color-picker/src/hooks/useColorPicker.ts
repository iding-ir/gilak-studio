import { useCallback } from "react";

import { actions, useColorPickerContext } from "../context";

export const useColorPicker = () => {
  const { state, dispatch } = useColorPickerContext();
  const { radiusCount, gridSize, borderWidth, hoverColor, selectedColor } =
    state;

  const setMagmifierRadius = useCallback(
    (radiusCount: number) => dispatch(actions.setRadiusCount(radiusCount)),
    [dispatch],
  );

  const setGridSize = useCallback(
    (size: number) => dispatch(actions.setGridSize(size)),
    [dispatch],
  );

  const setBorderWidth = useCallback(
    (width: number) => dispatch(actions.setBorderWidth(width)),
    [dispatch],
  );

  const setHoverColor = useCallback(
    (color: string) => dispatch(actions.setHoverColor(color)),
    [dispatch],
  );

  const setSelectedColor = useCallback(
    (color: string) => dispatch(actions.setSelectedColor(color)),
    [dispatch],
  );

  return {
    radiusCount,
    gridSize,
    borderWidth,
    hoverColor,
    selectedColor,
    setMagmifierRadius,
    setGridSize,
    setBorderWidth,
    setHoverColor,
    setSelectedColor,
  };
};
