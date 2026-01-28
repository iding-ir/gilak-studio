import { useCallback } from "react";

import { actions, selectAllContents, useCanvasContext } from "../context";
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

  return {
    contents: selectAllContents(state),
    addContent,
    removeContent,
    updateContent,
    clearContents,
  };
};
