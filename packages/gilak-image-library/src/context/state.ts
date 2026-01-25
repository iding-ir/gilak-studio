import type { ImageLibraryState } from "./types";

export const initialState: ImageLibraryState = {
  images: [],
  view: "grid",
  activeImageId: undefined,
};
