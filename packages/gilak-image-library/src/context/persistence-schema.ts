import {
  createIndexedDbSchemaStorageAdapter,
  defineIndexedDbCollection,
  defineIndexedDbField,
} from "@gilak/persist";

import type { ImageItem } from "../types";
import { initialState } from "./state";
import type { ImageLibraryState } from "./types";

export const STATE_KEY = "gilak-image-library:state";
export const DB_NAME = "gilak-image-library";
export const UI_STORE = "state";
export const IMAGES_STORE = "images";

const VIEW_KEY = "view";
const ACTIVE_IMAGE_ID_KEY = "activeImageId";
const IMAGE_ORDER_KEY = "order";
const IMAGE_KEY_PREFIX = "image:";

const normalizeView = (
  value: ImageLibraryState["view"] | null | undefined,
): ImageLibraryState["view"] => (value === "list" ? "list" : initialState.view);

const normalizeActiveImageId = (
  value: string | null | undefined,
): string | undefined => (typeof value === "string" ? value : undefined);

const normalizeImage = (value: unknown): ImageItem | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const image = value as Partial<ImageItem>;

  if (
    typeof image.id !== "string" ||
    typeof image.name !== "string" ||
    typeof image.src !== "string"
  ) {
    return null;
  }

  return {
    id: image.id,
    name: image.name,
    resolution: typeof image.resolution === "string" ? image.resolution : "0x0",
    size: typeof image.size === "string" ? image.size : "0 B",
    src: image.src,
    updatedAt:
      typeof image.updatedAt === "string"
        ? image.updatedAt
        : new Date().toISOString().split("T")[0],
    fileName: typeof image.fileName === "string" ? image.fileName : undefined,
  };
};

export const createImageLibraryPersistenceStorage = () =>
  createIndexedDbSchemaStorageAdapter<ImageLibraryState>({
    dbName: DB_NAME,
    initialState,
    fields: [
      defineIndexedDbField<ImageLibraryState, ImageLibraryState["view"]>({
        storeName: UI_STORE,
        key: () => VIEW_KEY,
        select: (state) => state.view,
        deserialize: (value) =>
          normalizeView(value === "grid" || value === "list" ? value : null),
        merge: (state, view) => ({
          ...state,
          view: normalizeView(view),
        }),
      }),
      defineIndexedDbField<ImageLibraryState, string | undefined>({
        storeName: UI_STORE,
        key: () => ACTIVE_IMAGE_ID_KEY,
        select: (state) => state.activeImageId,
        deserialize: (value) =>
          normalizeActiveImageId(typeof value === "string" ? value : null),
        merge: (state, activeImageId) => ({
          ...state,
          activeImageId: normalizeActiveImageId(activeImageId),
        }),
      }),
    ],
    collections: [
      defineIndexedDbCollection<ImageLibraryState, ImageItem>({
        storeName: IMAGES_STORE,
        orderKey: () => IMAGE_ORDER_KEY,
        itemKeyPrefix: () => IMAGE_KEY_PREFIX,
        select: (state) => state.images,
        getItemKey: (image) => image.id,
        deserialize: (value) => normalizeImage(value),
        merge: (state, images) => ({
          ...state,
          images,
          activeImageId:
            typeof state.activeImageId === "string" &&
            images.some((image) => image.id === state.activeImageId)
              ? state.activeImageId
              : undefined,
        }),
      }),
    ],
  });
