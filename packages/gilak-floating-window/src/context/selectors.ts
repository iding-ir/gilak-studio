import type { State } from "./state";

export const selectFloatingWindow = (state: State) => {
  return Object.values(state.windows);
};

export const selectFloatingWindowById = (state: State, id: string) => {
  return state.windows[id];
};

export const selectOpenWindows = (state: State) => {
  return Object.values(state.windows).filter((w) => w.status === "open");
};

export const selectMaximizedWindows = (state: State) => {
  return Object.values(state.windows).filter((w) => w.status === "maximized");
};

export const selectMinimizedWindows = (state: State) => {
  return Object.values(state.windows).filter((w) => w.status === "minimized");
};

export const hasMinimizedWindows = (state: State) => {
  return Object.values(state.windows).some((w) => w.status === "minimized");
};
