import { useCallback } from "react";

import { actions, useCanvasContext } from "../context";
import {
  selectDocumentLayers,
  selectFocusedLayer,
  selectSelectedLayers,
} from "../context/selectors";
import type { CanvasLayer } from "../types";

export const useDocumentLayers = ({
  documentId,
}: Pick<CanvasLayer, "documentId">) => {
  const { state, dispatch } = useCanvasContext();
  const documentLayers = selectDocumentLayers(state, documentId);
  const selectedLayers = selectSelectedLayers(state, documentId);
  const focusedLayer = selectFocusedLayer(state, documentId);

  const removeDocumentLayers = useCallback(() => {
    dispatch(actions.removeDocumentLayers({ documentId }));
  }, [dispatch, documentId]);

  return {
    documentLayers,
    selectedLayers,
    focusedLayer,
    removeDocumentLayers,
  };
};
