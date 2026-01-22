import type { ImageLibraryState } from "./types";

export const selectActiveAsset = (state: ImageLibraryState) => {
  return state.assets.find((asset) => asset.id === state.activeAssetId);
};

export const selectStats = (state: ImageLibraryState) => {
  const total = state.assets.length;
  return {
    total,
    visible: total,
  };
};
