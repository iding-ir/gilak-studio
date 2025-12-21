import type { Action } from "./actions";
import type { State } from "./state";

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "SET_RADIUS_COUNT": {
      return { ...state, radiusCount: payload };
    }
    case "SET_GRID_SIZE": {
      return { ...state, gridSize: payload };
    }
    case "SET_BORDER_WIDTH": {
      return { ...state, borderWidth: payload };
    }
    case "SET_HOVER_COLOR": {
      return { ...state, hoverColor: payload };
    }
    case "SET_SELECTED_COLOR": {
      return { ...state, selectedColor: payload };
    }
    default: {
      return state;
    }
  }
};
