import type { State } from "./state";

export const selectCurrentContents = (state: State) => {
  return Array.from(state.contentsHistory.current.values());
};

export const selectPreviousContents = (state: State) => {
  return Array.from(state.contentsHistory.prev.values());
};

export const selectNextContents = (state: State) => {
  return Array.from(state.contentsHistory.next.values());
};

export const selectContentById = (state: State, id: string) => {
  return state.contentsHistory.current.get(id);
};
