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
    case "SELECT_ASSET": {
      return { ...state, activeAssetId: action.payload };
    }
    case "ADD_ASSET": {
      const nextAssets = [action.payload, ...state.assets];
      return {
        ...state,
        assets: nextAssets,
        activeAssetId: action.payload.id,
      };
    }
    default:
      return state;
  }
};
