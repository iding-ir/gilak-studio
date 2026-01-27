import type { State } from "./state";

export const selectLayerById = (state: State, id: string) => {
  return state.layers.get(id);
};

export const selectLayers = (state: State) => {
  return Array.from(state.layers.values());
};

export const selectVisibleLayers = (state: State) => {
  return selectLayers(state).filter((layer) => layer.visible);
};

export const selectHiddenLayers = (state: State) => {
  return selectLayers(state).filter((layer) => !layer.visible);
};

export const selectSelectedLayers = (state: State) => {
  return selectLayers(state).filter((layer) => layer.selected);
};

export const selectFocusedLayers = (state: State) => {
  return selectLayers(state).filter((layer) => layer.focused);
};

export const selectDocumentLayers = (state: State, documentId: string) => {
  return selectLayers(state).filter((layer) => layer.documentId === documentId);
};

export const selectDocumentVisibleLayers = (
  state: State,
  documentId: string,
) => {
  return selectDocumentLayers(state, documentId).filter(
    (layer) => layer.visible,
  );
};

export const selectDocumentHiddenLayers = (
  state: State,
  documentId: string,
) => {
  return selectDocumentLayers(state, documentId).filter(
    (layer) => !layer.visible,
  );
};

export const selectDocumentSelectedLayers = (
  state: State,
  documentId: string,
) => {
  return selectDocumentLayers(state, documentId).filter(
    (layer) => layer.selected,
  );
};

export const selectDocumentFocusedLayer = (
  state: State,
  documentId: string,
) => {
  return selectDocumentLayers(state, documentId).find((layer) => layer.focused);
};
