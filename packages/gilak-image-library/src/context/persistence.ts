import { initialState } from "./state";
import type { ImageLibraryState } from "./types";

export const STATE_KEY = "gilak-image-library:state";

export const serializeState = (state: ImageLibraryState) => state;

export const deserializeState = (value: unknown): ImageLibraryState | null => {
  try {
    const parsed =
      typeof value === "string"
        ? (JSON.parse(value) as Partial<ImageLibraryState>)
        : (value as Partial<ImageLibraryState> | null | undefined);

    return {
      images: Array.isArray(parsed?.images)
        ? parsed.images
        : initialState.images,
      view: parsed?.view === "list" ? "list" : "grid",
      activeImageId:
        typeof parsed?.activeImageId === "string"
          ? parsed.activeImageId
          : undefined,
    };
  } catch {
    return null;
  }
};
