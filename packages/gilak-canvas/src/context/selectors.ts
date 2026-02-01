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
  return selectElements(state).filter((element) =>
    state.selected.has(element.id),
  );
};

export const selectFocusedElement = (state: State) => {
  const focusedId = state.focus[0];
  const focusedElement = state.elementsHistory.current.get(focusedId);
  return focusedElement;
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

export const selectTextSettings = (state: State) => {
  return state.text.settings;
};

export const selectTextInputOpen = (state: State) => {
  return state.text.open;
};
