import {
  createIndexedDbSchemaStorageAdapter,
  defineIndexedDbCollection,
  defineIndexedDbField,
} from "@gilak/persist";

import { initialState, type State } from "./state";
import type { FloatingWindowType } from "./types";

export const STATE_KEY = "gilak-floating-window:state";
export const DB_NAME = "gilak-floating-window";
export const WINDOWS_STORE = "windows";
export const STATE_STORE = "state";

const WINDOWS_ORDER_KEY = "order";
const WINDOW_KEY_PREFIX = "window:";
const FOCUS_KEY = "focus";

const normalizeWindow = (window: FloatingWindowType): FloatingWindowType => ({
  ...window,
  dragging: false,
  resizing: false,
});

const normalizeFloatingWindow = (value: unknown): FloatingWindowType | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  return normalizeWindow(value as FloatingWindowType);
};

const normalizeFocus = (value: unknown): State["focus"] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [...initialState.focus];

export const createFloatingWindowPersistenceStorage = () =>
  createIndexedDbSchemaStorageAdapter<State>({
    dbName: DB_NAME,
    initialState,
    fields: [
      defineIndexedDbField<State, State["focus"]>({
        storeName: STATE_STORE,
        key: () => FOCUS_KEY,
        select: (state) => state.focus,
        deserialize: normalizeFocus,
        merge: (state, focus) => ({
          ...state,
          focus: focus ?? [...initialState.focus],
        }),
      }),
    ],
    collections: [
      defineIndexedDbCollection<State, FloatingWindowType>({
        storeName: WINDOWS_STORE,
        orderKey: () => WINDOWS_ORDER_KEY,
        itemKeyPrefix: () => WINDOW_KEY_PREFIX,
        select: (state) => Array.from(state.windows.values()),
        getItemKey: (window) => window.id,
        serialize: (window) => normalizeWindow(window),
        deserialize: (value) => normalizeFloatingWindow(value),
        merge: (state, windows) => ({
          ...state,
          windows: new Map(windows.map((window) => [window.id, window])),
          focus: state.focus.filter((id) =>
            windows.some((window) => window.id === id),
          ),
        }),
      }),
    ],
  });
