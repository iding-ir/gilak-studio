import { type History, history } from "@gilak/utils";

import type { CanvasElement } from "../types/canvas";
import { initialState, type State } from "./state";

export const STATE_KEY = "gilak-canvas:state";

export const getStateKey = (id: string) => `${STATE_KEY}:${id}`;

type SerializedHistory = {
  prev: Record<string, CanvasElement>[];
  current: Record<string, CanvasElement>;
  next: Record<string, CanvasElement>[];
};

type SerializedState = {
  elementsHistory: SerializedHistory;
  focus: State["focus"];
  selected: string[];
  text: State["text"];
};

const serializeElementsMap = (
  map: Map<string, CanvasElement>,
): Record<string, CanvasElement> => Object.fromEntries(map);

const serializeHistory = (
  hist: History<Map<string, CanvasElement>>,
): SerializedHistory => ({
  prev: hist.prev.map(serializeElementsMap),
  current: serializeElementsMap(hist.current),
  next: hist.next.map(serializeElementsMap),
});

export const serializeState = (state: State): SerializedState => ({
  elementsHistory: serializeHistory(state.elementsHistory),
  focus: state.focus,
  selected: Array.from(state.selected),
  text: state.text,
});

const deserializeElementsMap = (
  obj?: Record<string, CanvasElement>,
): Map<string, CanvasElement> => new Map(Object.entries(obj ?? {}));

const deserializeHistoryValue = (
  value?: SerializedHistory,
): History<Map<string, CanvasElement>> => {
  if (!value) {
    return history.createHistory(new Map());
  }

  return {
    prev: Array.isArray(value.prev)
      ? value.prev.map(deserializeElementsMap)
      : [],
    current: deserializeElementsMap(value.current),
    next: Array.isArray(value.next)
      ? value.next.map(deserializeElementsMap)
      : [],
  };
};

export const deserializeState = (value: unknown): State | null => {
  try {
    const parsed =
      typeof value === "string"
        ? (JSON.parse(value) as Partial<SerializedState>)
        : (value as Partial<SerializedState> | null | undefined);

    if (!parsed?.elementsHistory) {
      return null;
    }

    return {
      ...initialState,
      elementsHistory: deserializeHistoryValue(parsed.elementsHistory),
      focus: Array.isArray(parsed.focus) ? parsed.focus : initialState.focus,
      selected: new Set(Array.isArray(parsed.selected) ? parsed.selected : []),
      text: {
        open: parsed.text?.open ?? initialState.text.open,
        settings: {
          ...initialState.text.settings,
          ...(parsed.text?.settings ?? {}),
        },
      },
    };
  } catch {
    return null;
  }
};
