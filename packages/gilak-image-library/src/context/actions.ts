import type { ImageAsset, ImageLibraryView } from "../types";

type Action =
  | { type: "SET_VIEW"; payload: ImageLibraryView }
  | { type: "SELECT_ASSET"; payload: string }
  | { type: "ADD_ASSET"; payload: ImageAsset };

const setView = (payload: ImageLibraryView): Action => ({
  type: "SET_VIEW",
  payload,
});

const selectAsset = (payload: string): Action => ({
  type: "SELECT_ASSET",
  payload,
});

const addAsset = (payload: ImageAsset): Action => ({
  type: "ADD_ASSET",
  payload,
});

const actions = {
  setView,
  selectAsset,
  addAsset,
};

export type { Action };
export { actions };
