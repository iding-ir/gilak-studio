import { history } from "@gilak/utils";
import { useCallback } from "react";

import { actions, useCanvasContext } from "../context";
import type { CanvasContent } from "../types/canvas";

export const useCanvas = () => {
  const { state, dispatch } = useCanvasContext();

  const addContent = useCallback(
    (content: CanvasContent) => {
      dispatch(actions.addContent(content));
    },
    [dispatch],
  );

  const removeContent = useCallback(
    (id: CanvasContent["id"]) => {
      dispatch(actions.removeContent(id));
    },
    [dispatch],
  );

  const updateContent = useCallback(
    (content: CanvasContent) => {
      dispatch(actions.updateContent(content));
    },
    [dispatch],
  );

  const clearContents = useCallback(() => {
    dispatch(actions.clearContents());
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch(actions.redo());
  }, [dispatch]);

  const undo = useCallback(() => {
    dispatch(actions.undo());
  }, [dispatch]);

  return {
    state,
    canUndo: history.canUndo(state.contentsHistory),
    canRedo: history.canRedo(state.contentsHistory),
    addContent,
    removeContent,
    updateContent,
    clearContents,
    redo,
    undo,
  };
};
