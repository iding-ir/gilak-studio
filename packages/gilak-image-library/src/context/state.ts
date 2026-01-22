import type { ImageLibraryState } from "./types";

export const initialState: ImageLibraryState = {
  assets: [],
  view: "grid",
  activeAssetId: undefined,
};
