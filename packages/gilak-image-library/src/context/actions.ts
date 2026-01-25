import type { ImageItem, ImageLibraryView } from "../types";

type Action =
  | { type: "SET_VIEW"; payload: ImageLibraryView }
  | { type: "SELECT_IMAGE"; payload: string }
  | { type: "ADD_IMAGE"; payload: ImageItem };

const setView = (payload: ImageLibraryView): Action => ({
  type: "SET_VIEW",
  payload,
});

const selectImage = (payload: string): Action => ({
  type: "SELECT_IMAGE",
  payload,
});

const addImage = (payload: ImageItem): Action => ({
  type: "ADD_IMAGE",
  payload,
});

const actions = {
  setView,
  selectImage,
  addImage,
};

export type { Action };
export { actions };
