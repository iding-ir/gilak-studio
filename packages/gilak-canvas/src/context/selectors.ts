import type { CanvasLayer } from "../types";
import type { State } from "./state";

export const selectLayers = (
  state: State,
  documentId: string,
): CanvasLayer[] => {
  return state.layers.filter((layer) => layer.documentId === documentId);
};

export const selectLayerById = (state: State, id: string) => {
  return state.layers.find((layer) => layer.id === id);
};
