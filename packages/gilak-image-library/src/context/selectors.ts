import type { ImageLibraryState } from "./types";

export const selectActiveImage = (state: ImageLibraryState) => {
  return state.images.find((image) => image.id === state.activeImageId);
};

export const selectStats = (state: ImageLibraryState) => {
  return state.images.length;
};
