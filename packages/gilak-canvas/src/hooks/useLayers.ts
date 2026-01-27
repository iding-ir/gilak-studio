import { useCallback } from "react";

import { actions, useCanvasContext } from "../context";
import type { CanvasLayer } from "../types";

export const useLayers = () => {
  const { state, dispatch } = useCanvasContext();
  const { layers } = state;

  const addLayer = useCallback(
    (layer: CanvasLayer) => {
      dispatch(actions.addLayer(layer));
    },
    [dispatch],
  );

  const removeLayer = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.removeLayer(payload));
    },
    [dispatch],
  );

  const removeLayers = useCallback(
    (payload: CanvasLayer["id"][]) => {
      dispatch(actions.removeLayers(payload));
    },
    [dispatch],
  );

  const showLayer = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.showLayer(payload));
    },
    [dispatch],
  );

  const hideLayer = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.hideLayer(payload));
    },
    [dispatch],
  );

  const moveLayerUp = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.moveLayerUp(payload));
    },
    [dispatch],
  );

  const moveLayerDown = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.moveLayerDown(payload));
    },
    [dispatch],
  );

  const selectLayer = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.selectLayer(payload));
    },
    [dispatch],
  );

  const deselectLayer = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.deselectLayer(payload));
    },
    [dispatch],
  );

  const focusLayer = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.focusLayer(payload));
    },
    [dispatch],
  );

  const addToLayerContent = useCallback(
    (payload: Pick<CanvasLayer, "id" | "content">) => {
      dispatch(actions.addToLayerContent(payload));
    },
    [dispatch],
  );

  const clearLayerContent = useCallback(
    (payload: Pick<CanvasLayer, "id">) => {
      dispatch(actions.clearLayerContent(payload));
    },
    [dispatch],
  );

  return {
    layers,
    addLayer,
    removeLayer,
    removeLayers,
    showLayer,
    hideLayer,
    moveLayerUp,
    moveLayerDown,
    selectLayer,
    deselectLayer,
    focusLayer,
    addToLayerContent,
    clearLayerContent,
  };
};
