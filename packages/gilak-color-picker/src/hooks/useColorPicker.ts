import { useCallback } from "react";

import { actions, useColorPickerContext } from "../context";

export const useColorPicker = () => {
  const {
    state: { radiusCount, gridSize, borderWidth, hoverColor, selectedColor },
    dispatch,
  } = useColorPickerContext();

  const setRadiusCount = useCallback(
    (radiusCount: number) => dispatch(actions.setRadiusCount(radiusCount)),
    [dispatch],
  );

  const setGridSize = useCallback(
    (gridSize: number) => dispatch(actions.setGridSize(gridSize)),
    [dispatch],
  );

  const setBorderWidth = useCallback(
    (borderWidth: number) => dispatch(actions.setBorderWidth(borderWidth)),
    [dispatch],
  );

  const setHoverColor = useCallback(
    (hoverColor: string) => dispatch(actions.setHoverColor(hoverColor)),
    [dispatch],
  );

  const setSelectedColor = useCallback(
    (selectedColor: string) =>
      dispatch(actions.setSelectedColor(selectedColor)),
    [dispatch],
  );

  return {
    radiusCount,
    gridSize,
    borderWidth,
    hoverColor,
    selectedColor,
    setRadiusCount,
    setGridSize,
    setBorderWidth,
    setHoverColor,
    setSelectedColor,
  };
};
