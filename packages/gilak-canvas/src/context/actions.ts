import type { CanvasLayer } from "../types";

type Action =
  | { type: "ADD_LAYER"; payload: CanvasLayer }
  | { type: "REMOVE_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "HIDE_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "SHOWS_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "MOVE_LAYER_UP"; payload: Pick<CanvasLayer, "id"> }
  | { type: "MOVE_LAYER_DOWN"; payload: Pick<CanvasLayer, "id"> };

const addLayer = (payload: CanvasLayer): Action => ({
  type: "ADD_LAYER",
  payload,
});

const removeLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "REMOVE_LAYER",
  payload,
});

const hideLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "HIDE_LAYER",
  payload,
});

const showLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "SHOWS_LAYER",
  payload,
});

const moveLayerUp = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "MOVE_LAYER_UP",
  payload,
});

const moveLayerDown = (payload: Pick<CanvasLayer, "id">): Action => ({
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
