import { useCallback } from "react";

import { actions, useCanvasContext } from "../context";
import type { CanvasLayer } from "../types";

export const useLayers = () => {
  const { state, dispatch } = useCanvasContext();
  const layers = state.layers;

  const addLayer = useCallback(
    (layer: CanvasLayer) => {
      dispatch(actions.addLayer(layer));
    },
    [dispatch],
  );

  const removeLayer = useCallback(
    (id: string) => {
      dispatch(actions.removeLayer({ id }));
    },
    [dispatch],
  );

  const removeDocumentLayers = useCallback(
    (documentId: string) => {
      dispatch(actions.removeDocumentLayers({ documentId }));
    },
    [dispatch],
  );

  const moveLayerUp = useCallback(
    (id: string) => {
      dispatch(actions.moveLayerUp({ id }));
    },
    [dispatch],
  );

  const moveLayerDown = useCallback(
    (id: string) => {
      dispatch(actions.moveLayerDown({ id }));
    },
    [dispatch],
  );

  const hideLayer = useCallback(
    (id: string) => {
      dispatch(actions.hideLayer({ id }));
    },
    [dispatch],
  );

  const showLayer = useCallback(
    (id: string) => {
      dispatch(actions.showLayer({ id }));
    },
    [dispatch],
  );

  return {
    addLayer,
    moveLayerUp,
    moveLayerDown,
    hideLayer,
    showLayer,
    removeLayer,
    removeDocumentLayers,
    layers,
  };
};
