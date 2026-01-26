import type { CanvasLayer } from "../types";

type Action =
  | { type: "ADD_LAYER"; payload: CanvasLayer }
  | { type: "REMOVE_LAYER"; payload: string }
  | { type: "HIDE_LAYER"; payload: string }
  | { type: "SHOWS_LAYER"; payload: string }
  | { type: "MOVE_LAYER_UP"; payload: string }
  | { type: "MOVE_LAYER_DOWN"; payload: string };

const addLayer = (payload: CanvasLayer): Action => ({
  type: "ADD_LAYER",
  payload,
});

const removeLayer = (payload: string): Action => ({
  type: "REMOVE_LAYER",
  payload,
});

const hideLayer = (payload: string): Action => ({
  type: "HIDE_LAYER",
  payload,
});

const showLayer = (payload: string): Action => ({
  type: "SHOWS_LAYER",
  payload,
});

const moveLayerUp = (payload: string): Action => ({
  type: "MOVE_LAYER_UP",
  payload,
});

const moveLayerDown = (payload: string): Action => ({
  type: "MOVE_LAYER_DOWN",
  payload,
});

export const actions = {
  addLayer,
  removeLayer,
  hideLayer,
  showLayer,
  moveLayerUp,
  moveLayerDown,
};

export type { Action };
