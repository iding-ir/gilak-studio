import { useCallback } from "react";

import { actions } from "../context/actions";
import { useFloatingWindowContext } from "../context/hook";
import type { Position, Size } from "../types";

export const useFloatingWindow = (id: string) => {
  const { state, dispatch } = useFloatingWindowContext();
  const window = state.windows.get(id);

  if (!window) {
    throw new Error(
      `Floating window with id "${id}" is not registered. Make sure to register the floating window before using this hook.`,
    );
  }

  const unregisterFloatingWindow = useCallback(() => {
    dispatch(actions.blurFloatingWindow(id));
    dispatch(actions.unregisterFloatingWindow(id));
  }, [dispatch, id]);

  const openFloatingWindow = useCallback(() => {
    dispatch(actions.focusFloatingWindow(id));
    dispatch(actions.setFloatingWindowStatus(id, "open"));
  }, [dispatch, id]);

  const minimizeFloatingWindow = useCallback(() => {
    dispatch(actions.blurFloatingWindow(id));
    dispatch(actions.setFloatingWindowStatus(id, "minimized"));
  }, [dispatch, id]);

  const maximizeFloatingWindow = useCallback(() => {
    dispatch(actions.focusFloatingWindow(id));
    dispatch(actions.setFloatingWindowStatus(id, "maximized"));
  }, [dispatch, id]);

  const focusFloatingWindow = useCallback(() => {
    dispatch(actions.focusFloatingWindow(id));
  }, [dispatch, id]);

  const setFloatingWindowSize = useCallback(
    (size: Size) => dispatch(actions.setFloatingWindowSize(id, size)),
    [dispatch, id],
  );

  const setFloatingWindowResizing = useCallback(
    (resizing: boolean) => {
      dispatch(actions.setFloatingWindowResizing(id, resizing));
    },
    [dispatch, id],
  );

  const setFloatingWindowPosition = useCallback(
    (position: Position) => {
      dispatch(actions.setFloatingWindowPosition(id, position));
    },
    [dispatch, id],
  );

  const setFloatingWindowTitle = useCallback(
    (title: string) => {
      dispatch(actions.setFloatingWindowTitle(id, title));
    },
    [dispatch, id],
  );

  const setFloatingWindowDragging = useCallback(
    (dragging: boolean) => {
      dispatch(actions.setFloatingWindowDragging(id, dragging));
    },
    [dispatch, id],
  );

  return {
    ...window,
    unregisterFloatingWindow,
    openFloatingWindow,
    minimizeFloatingWindow,
    maximizeFloatingWindow,
    focusFloatingWindow,
    setFloatingWindowSize,
    setFloatingWindowResizing,
    setFloatingWindowPosition,
    setFloatingWindowTitle,
    setFloatingWindowDragging,
  };
};
