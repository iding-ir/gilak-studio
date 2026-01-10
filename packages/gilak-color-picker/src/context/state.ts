import {
  DEFAULT_BORDER_WIDTH,
  DEFAULT_GRID_SIZE,
  DEFAULT_HOVER_COLOR,
  DEFAULT_RADIUS_COUNT,
  DEFAULT_SELECTED_COLOR,
} from "../constants";

export type State = {
  radiusCount: number;
  gridSize: number;
  borderWidth: number;
  hoverColor: string;
  selectedColor: string;
};

export const initialState: State = {
  radiusCount: DEFAULT_RADIUS_COUNT,
  gridSize: DEFAULT_GRID_SIZE,
  borderWidth: DEFAULT_BORDER_WIDTH,
  hoverColor: DEFAULT_HOVER_COLOR,
  selectedColor: DEFAULT_SELECTED_COLOR,
};
