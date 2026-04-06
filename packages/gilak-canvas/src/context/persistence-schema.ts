import {
  createIndexedDbSchemaStorageAdapter,
  defineIndexedDbField,
} from "@gilak/persist";
import { type History, history } from "@gilak/utils";

import type { CanvasElement } from "../types/canvas";
import { initialState, type State } from "./state";

export const STATE_KEY = "gilak-canvas:state";
export const DB_NAME = "gilak-canvas";
export const STORE_NAME_PREFIX = "canvas:";

const ELEMENTS_HISTORY_KEY = "elementsHistory";
const FOCUS_KEY = "focus";
const SELECTED_KEY = "selected";
const TEXT_KEY = "text";

export const getStateKey = (id: string) => `${STATE_KEY}:${id}`;

const getCanvasStoreName = (scopeKey: string) => {
  const prefix = `${STATE_KEY}:`;
  const canvasId = scopeKey.startsWith(prefix)
    ? scopeKey.slice(prefix.length)
    : scopeKey;

  return `${STORE_NAME_PREFIX}${canvasId}`;
};

type SerializedHistory = {
  prev: Record<string, CanvasElement>[];
  current: Record<string, CanvasElement>;
  next: Record<string, CanvasElement>[];
};

const serializeElementsMap = (
  map: Map<string, CanvasElement>,
): Record<string, CanvasElement> => Object.fromEntries(map);

const serializeHistory = (
  value: History<Map<string, CanvasElement>>,
): SerializedHistory => ({
  prev: value.prev.map(serializeElementsMap),
  current: serializeElementsMap(value.current),
  next: value.next.map(serializeElementsMap),
});

const deserializeElementsMap = (
  value: Record<string, CanvasElement> | null | undefined,
): Map<string, CanvasElement> => new Map(Object.entries(value ?? {}));

const normalizeElementsHistory = (value: unknown): State["elementsHistory"] => {
  if (!value || typeof value !== "object") {
    return history.createHistory(new Map());
  }

  const parsed = value as Partial<SerializedHistory>;

  return {
    prev: Array.isArray(parsed.prev)
      ? parsed.prev.map((entry) => deserializeElementsMap(entry))
      : [],
    current: deserializeElementsMap(parsed.current),
    next: Array.isArray(parsed.next)
      ? parsed.next.map((entry) => deserializeElementsMap(entry))
      : [],
  };
};

const normalizeFocus = (value: unknown): State["focus"] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [...initialState.focus];

const normalizeSelected = (value: unknown): State["selected"] =>
  new Set(
    Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [],
  );

const normalizeText = (value: unknown): State["text"] => {
  if (!value || typeof value !== "object") {
    return {
      open: initialState.text.open,
      settings: { ...initialState.text.settings },
    };
  }

  const parsed = value as Partial<State["text"]>;

  return {
    open: parsed.open ?? initialState.text.open,
    settings: {
      ...initialState.text.settings,
      ...(parsed.settings ?? {}),
    },
  };
};

export const createCanvasPersistenceStorage = () =>
  createIndexedDbSchemaStorageAdapter<State>({
    dbName: DB_NAME,
    initialState,
    fields: [
      defineIndexedDbField<State, State["elementsHistory"]>({
        storeName: getCanvasStoreName,
        key: () => ELEMENTS_HISTORY_KEY,
        select: (state) => state.elementsHistory,
        serialize: serializeHistory,
        deserialize: normalizeElementsHistory,
        merge: (state, elementsHistory) => ({
          ...state,
          elementsHistory: elementsHistory ?? history.createHistory(new Map()),
        }),
      }),
      defineIndexedDbField<State, State["focus"]>({
        storeName: getCanvasStoreName,
        key: () => FOCUS_KEY,
        select: (state) => state.focus,
        deserialize: normalizeFocus,
        merge: (state, focus) => ({
          ...state,
          focus: focus ?? [...initialState.focus],
        }),
      }),
      defineIndexedDbField<State, State["selected"]>({
        storeName: getCanvasStoreName,
        key: () => SELECTED_KEY,
        select: (state) => state.selected,
        serialize: (selected) => Array.from(selected),
        deserialize: normalizeSelected,
        merge: (state, selected) => ({
          ...state,
          selected: selected ?? new Set(initialState.selected),
        }),
      }),
      defineIndexedDbField<State, State["text"]>({
        storeName: getCanvasStoreName,
        key: () => TEXT_KEY,
        select: (state) => state.text,
        deserialize: normalizeText,
        merge: (state, text) => ({
          ...state,
          text: text ?? {
            open: initialState.text.open,
            settings: { ...initialState.text.settings },
          },
        }),
      }),
    ],
  });
