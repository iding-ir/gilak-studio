export type Action =
  | { type: "SET_RADIUS_COUNT"; payload: number }
  | { type: "SET_GRID_SIZE"; payload: number }
  | { type: "SET_BORDER_WIDTH"; payload: number }
  | { type: "SET_HOVER_COLOR"; payload: string }
  | { type: "SET_SELECTED_COLOR"; payload: string };

const setRadiusCount = (radius: number): Action => ({
  type: "SET_RADIUS_COUNT",
  payload: radius,
});

const setGridSize = (size: number): Action => ({
  type: "SET_GRID_SIZE",
  payload: size,
});

const setBorderWidth = (width: number): Action => ({
  type: "SET_BORDER_WIDTH",
  payload: width,
});

const setHoverColor = (color: string): Action => ({
  type: "SET_HOVER_COLOR",
  payload: color,
});

const setSelectedColor = (color: string): Action => ({
  type: "SET_SELECTED_COLOR",
  payload: color,
});

const actions = {
  setRadiusCount,
  setGridSize,
  setBorderWidth,
  setHoverColor,
  setSelectedColor,
};

export { actions };
