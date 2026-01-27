import type { CanvasLayer } from "../types";

type Action =
  | { type: "ADD_LAYER"; payload: CanvasLayer }
  | { type: "REMOVE_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "REMOVE_LAYERS"; payload: CanvasLayer["id"][] }
  | { type: "HIDE_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "SHOW_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "MOVE_LAYER_UP"; payload: Pick<CanvasLayer, "id"> }
  | { type: "MOVE_LAYER_DOWN"; payload: Pick<CanvasLayer, "id"> }
  | { type: "SELECT_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "DESELECT_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | { type: "FOCUS_LAYER"; payload: Pick<CanvasLayer, "id"> }
  | {
      type: "ADD_TO_LAYER_CONTENT";
      payload: Pick<CanvasLayer, "id" | "content">;
    }
  | { type: "CLEAR_LAYER_CONTENT"; payload: Pick<CanvasLayer, "id"> };

const addLayer = (payload: CanvasLayer): Action => ({
  type: "ADD_LAYER",
  payload,
});

const removeLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "REMOVE_LAYER",
  payload,
});

const removeLayers = (payload: CanvasLayer["id"][]): Action => ({
  type: "REMOVE_LAYERS",
  payload,
});

const hideLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "HIDE_LAYER",
  payload,
});

const showLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "SHOW_LAYER",
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

const selectLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "SELECT_LAYER",
  payload,
});

const deselectLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "DESELECT_LAYER",
  payload,
});

const focusLayer = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "FOCUS_LAYER",
  payload,
});

const addToLayerContent = (
  payload: Pick<CanvasLayer, "id" | "content">,
): Action => ({
  type: "ADD_TO_LAYER_CONTENT",
  payload,
});

const clearLayerContent = (payload: Pick<CanvasLayer, "id">): Action => ({
  type: "CLEAR_LAYER_CONTENT",
  payload,
});

export const actions = {
  addLayer,
  removeLayer,
  removeLayers,
  hideLayer,
  showLayer,
  moveLayerUp,
  moveLayerDown,
  selectLayer,
  deselectLayer,
  focusLayer,
  addToLayerContent,
  clearLayerContent,
};

export type { Action };
