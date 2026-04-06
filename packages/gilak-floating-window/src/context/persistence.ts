import { initialState, type State } from "./state";
import type { FloatingWindowType } from "./types";

export const STATE_KEY = "gilak-floating-window:state";

type SerializedState = {
  windows: Record<string, FloatingWindowType>;
  focus: State["focus"];
};

const normalizeWindow = (window: FloatingWindowType): FloatingWindowType => ({
  ...window,
  dragging: false,
  resizing: false,
});

const serializeWindowsMap = (
  windows: Map<string, FloatingWindowType>,
): Record<string, FloatingWindowType> =>
  Object.fromEntries(
    Array.from(windows.entries()).map(([id, window]) => [
      id,
      normalizeWindow(window),
    ]),
  );

export const serializeState = (state: State): SerializedState => ({
  windows: serializeWindowsMap(state.windows),
  focus: state.focus,
});

const deserializeWindowsMap = (
  record?: Record<string, FloatingWindowType>,
): Map<string, FloatingWindowType> =>
  new Map(
    Object.entries(record ?? {}).map(([id, window]) => [
      id,
      normalizeWindow(window),
    ]),
  );

export const deserializeState = (value: unknown): State | null => {
  try {
    const parsed =
      typeof value === "string"
        ? (JSON.parse(value) as Partial<SerializedState>)
        : (value as Partial<SerializedState> | null | undefined);

    return {
      windows: deserializeWindowsMap(parsed?.windows),
      focus: Array.isArray(parsed?.focus) ? parsed.focus : initialState.focus,
    };
  } catch {
    return null;
  }
};
