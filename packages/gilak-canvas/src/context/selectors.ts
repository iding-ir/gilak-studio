import type { State } from "./state";

export const selectElements = (state: State) => {
  return Array.from(state.elementsHistory.current.values());
};

export const selectElementById = (state: State, id: string) => {
  return state.elementsHistory.current.get(id);
};

export const selectVisibleElements = (state: State) => {
  return selectElements(state).filter((element) => element.visible);
};

export const selectHiddenElements = (state: State) => {
  return selectElements(state).filter((element) => !element.visible);
};

export const selectSelectedElements = (state: State) => {
  return selectElements(state).filter((element) => element.selected);
};

export const selectFocusedElement = (state: State) => {
  return selectElements(state).find((element) => element.focused);
};

export const selectDrawingElements = (state: State) => {
  return selectElements(state).filter((element) => element.type === "drawing");
};

export const selectImageElements = (state: State) => {
  return selectElements(state).filter((element) => element.type === "image");
};

export const selectTextElements = (state: State) => {
  return selectElements(state).filter((element) => element.type === "text");
};
