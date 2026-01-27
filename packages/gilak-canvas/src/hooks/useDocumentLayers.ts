import { useCallback, useMemo } from "react";

import { actions, useCanvasContext } from "../context";
import {
  selectDocumentFocusedLayer,
  selectDocumentLayers,
  selectDocumentSelectedLayers,
} from "../context/selectors";
import type { CanvasLayer } from "../types";

export const useDocumentLayers = ({
  documentId,
}: Pick<CanvasLayer, "documentId">) => {
  const { state, dispatch } = useCanvasContext();

  const documentLayers = useMemo(
    () => selectDocumentLayers(state, documentId),
    [state, documentId],
  );

  const selectedLayers = useMemo(
    () => selectDocumentSelectedLayers(state, documentId),
    [state, documentId],
  );

  const focusedLayer = useMemo(
    () => selectDocumentFocusedLayer(state, documentId),
    [state, documentId],
  );

  const removeDocumentLayers = useCallback(() => {
    dispatch(actions.removeLayers(documentLayers.map((layer) => layer.id)));
  }, [dispatch, documentLayers]);

  return {
    documentLayers,
    selectedLayers,
    focusedLayer,
    removeDocumentLayers,
  };
};
