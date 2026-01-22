import type { Action } from "./actions";
import type { State } from "./state";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START_DRAG": {
      return {
        ...state,
        ...action.payload,
        isDragging: true,
        dropZoneId: undefined,
      };
    }
    case "UPDATE_POINTER": {
      if (!state.isDragging) {
        return state;
      }

      return {
        ...state,
        pointer: action.payload.pointer,
        dropZoneId: action.payload.dropZoneId,
      };
    }
    case "END_DRAG": {
      return {
        ...state,
        isDragging: false,
        dragImage: state.dragImage,
      };
    }
    default: {
      return state;
    }
  }
};
