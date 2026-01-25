import type { Action } from "./actions";
import type { ImageLibraryState } from "./types";

export const reducer = (
  state: ImageLibraryState,
  action: Action,
): ImageLibraryState => {
  switch (action.type) {
    case "SET_VIEW": {
      return { ...state, view: action.payload };
    }
    case "SELECT_IMAGE": {
      return { ...state, activeImageId: action.payload };
    }
    case "ADD_IMAGE": {
      const nextImages = [action.payload, ...state.images];
      return {
        ...state,
        images: nextImages,
        activeImageId: action.payload.id,
      };
    }
    default:
      return state;
  }
};
