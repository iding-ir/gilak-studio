import { useCallback } from "react";

import { actions } from "../context/actions";
import { useFloatingWindowContext } from "../context/hook";
import type { FloatingWindowType, Status } from "../context/types";
import type { Position, Size } from "../types";

export const useFloatingWindow = (id: string) => {
  const { state, dispatch } = useFloatingWindowContext();
  const window = state.windows[id];

  const registerFloatingWindow = useCallback(
    (window: FloatingWindowType) =>
      dispatch(actions.registerFloatingWindow(window)),
    [dispatch],
  );

  const unregisterFloatingWindow = useCallback(
    () => dispatch(actions.unregisterFloatingWindow(id)),
    [dispatch, id],
  );

  const setFloatingWindowStatus = useCallback(
    (status: Status) => dispatch(actions.setFloatingWindowStatus(id, status)),
    [dispatch, id],
  );

  const openFloatingWindow = useCallback(
    () => dispatch(actions.setFloatingWindowStatus(id, "open")),
    [dispatch, id],
  );

  const minimizeFloatingWindow = useCallback(() => {
    dispatch(actions.setFloatingWindowStatus(id, "minimized"));
  }, [dispatch, id]);

  const maximizeFloatingWindow = useCallback(() => {
    dispatch(actions.setFloatingWindowStatus(id, "maximized"));
    dispatch(actions.bringFloatingWindowToFront(id));
  }, [dispatch, id]);

  const bringFloatingWindowToFront = useCallback(() => {
    dispatch(actions.bringFloatingWindowToFront(id));
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

  const setFloatingWindowDragging = useCallback(
    (dragging: boolean) => {
      dispatch(actions.setFloatingWindowDragging(id, dragging));
    },
    [dispatch, id],
  );

  return {
    ...window,
    registerFloatingWindow,
    unregisterFloatingWindow,
    setFloatingWindowStatus,
    openFloatingWindow,
    minimizeFloatingWindow,
    maximizeFloatingWindow,
    bringFloatingWindowToFront,
    setFloatingWindowSize,
    setFloatingWindowResizing,
    setFloatingWindowPosition,
    setFloatingWindowDragging,
  };
};
