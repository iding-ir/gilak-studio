import type { State } from "./state";

export const selectCurrentElements = (state: State) => {
  return Array.from(state.elementsHistory.current.values());
};

export const selectPreviousElements = (state: State) => {
  return Array.from(state.elementsHistory.prev.values());
};

export const selectNextElements = (state: State) => {
  return Array.from(state.elementsHistory.next.values());
};

export const selectElementById = (state: State, id: string) => {
  return state.elementsHistory.current.get(id);
};

export const selectVisibleElements = (state: State) => {
  return selectCurrentElements(state).filter((element) => element.visible);
};

export const selectHiddenElements = (state: State) => {
  return selectCurrentElements(state).filter((element) => !element.visible);
};

export const selectSelectedElements = (state: State) => {
  return selectCurrentElements(state).filter((element) => element.selected);
};

export const selectFocusedElement = (state: State) => {
  return selectCurrentElements(state).find((element) => element.focused);
};
