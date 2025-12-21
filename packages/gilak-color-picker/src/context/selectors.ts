import type { State } from "./state";

export const selectRadiusCount = ({ radiusCount }: State) => {
  return radiusCount;
};

export const selectGridSize = ({ gridSize }: State) => {
  return gridSize;
};

export const selectBorderWidth = ({ borderWidth }: State) => {
  return borderWidth;
};
export const selectHoverColor = ({ hoverColor }: State) => {
  return hoverColor;
};

export const selectSelectedColor = ({ selectedColor }: State) => {
  return selectedColor;
};
