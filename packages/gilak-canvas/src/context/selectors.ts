import type { State } from "./state";

export const selectAllContents = (state: State) => {
  return Array.from(state.contents.values());
};

export const selectContentById = (state: State, id: string) => {
  return state.contents.get(id);
};
