import type { CanvasLayer } from "../types";
import type { State } from "./state";

export const selectLayers = (state: State): CanvasLayer[] => state.layers;

export const selectLayerById = (state: State, id: string) =>
  state.layers.find((layer) => layer.id === id);
