import type { State } from "./state";

export const selectLayers = (state: State, documentId: string) => {
  return state.layers.filter((layer) => layer.documentId === documentId);
};

export const selectLayerById = (state: State, id: string) => {
  return state.layers.find((layer) => layer.id === id);
};

export const selectDocumentLayers = (state: State, documentId: string) => {
  return state.layers.filter((layer) => layer.documentId === documentId);
};

export const selectSelectedLayers = (state: State, documentId: string) => {
  return state.layers.filter(
    (layer) => layer.documentId === documentId && layer.selected,
  );
};

export const selectFocusedLayer = (state: State, documentId: string) => {
  return state.layers.find(
    (layer) => layer.documentId === documentId && layer.focused,
  );
};
