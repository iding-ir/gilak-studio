import type { CanvasLayer } from "../types";
import type { CanvasState } from "./types";

export const selectLayers = (state: CanvasState): CanvasLayer[] => state.layers;

export const selectLayerById = (state: CanvasState, id: string) =>
  state.layers.find((layer) => layer.id === id);
