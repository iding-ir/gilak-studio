import type { State } from "./state";

export const selectFloatingWindows = (state: State) => {
  return Array.from(state.windows.values());
};

export const selectFloatingWindowById = (state: State, id: string) => {
  return state.windows.get(id);
};

export const selectOpenWindows = (state: State) => {
  return selectFloatingWindows(state).filter((w) => w.status === "open");
};

export const selectMaximizedWindows = (state: State) => {
  return selectFloatingWindows(state).filter((w) => w.status === "maximized");
};

export const selectMinimizedWindows = (state: State) => {
  return selectFloatingWindows(state).filter((w) => w.status === "minimized");
};

export const hasMinimizedWindows = (state: State) => {
  return selectFloatingWindows(state).some((w) => w.status === "minimized");
};

export const selectFocusedWindow = (state: State) => {
  if (state.focus.length === 0) return undefined;
  return state.focus[0];
};
