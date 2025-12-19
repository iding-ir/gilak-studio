import type { Action, State } from "./types";

export const initialState: State = {
  zoomLevel: 100,
};

export const resizableScreenReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ZOOM":
      return { ...state, zoomLevel: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
