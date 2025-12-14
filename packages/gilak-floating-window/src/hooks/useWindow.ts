import { useCallback } from "react";

import { type FloatingWindowMeta, useFloatingWindowContext } from "../context";
import type { Position, Size } from "../types";

export type useWindowsReturn = FloatingWindowMeta & {
  register: (win: FloatingWindowMeta) => void;
  unregister: () => void;
  maximize: () => void;
  minimize: () => void;
  open: () => void;
  bringToFront: () => void;
  resize: (size: Size) => void;
  setResizing: (resizing: boolean) => void;
  drag: (position: Position) => void;
  setDragging: (dragging: boolean) => void;
};

export const useWindow = (id: string): useWindowsReturn => {
  const ctx = useFloatingWindowContext();
  const win = ctx.state.windows[id];

  const register = useCallback(
    (win: FloatingWindowMeta) => {
      ctx.dispatch({ type: "REGISTER", payload: win });
    },
    [ctx],
  );

  const unregister = useCallback(() => {
    ctx.dispatch({ type: "UNREGISTER", payload: { id } });
  }, [ctx, id]);

  const open = useCallback(() => {
    ctx.dispatch({ type: "SET_STATUS", payload: { id, status: "open" } });
  }, [ctx, id]);

  const minimize = useCallback(() => {
    ctx.dispatch({ type: "SET_STATUS", payload: { id, status: "minimized" } });
  }, [ctx, id]);

  const maximize = useCallback(() => {
    ctx.dispatch({ type: "SET_STATUS", payload: { id, status: "maximized" } });
    ctx.dispatch({ type: "BRING_TO_FRONT", payload: { id } });
  }, [ctx, id]);

  const bringToFront = useCallback(() => {
    ctx.dispatch({ type: "BRING_TO_FRONT", payload: { id } });
  }, [ctx, id]);

  const resize = useCallback(
    (size: Size) => {
      ctx.dispatch({ type: "SET_SIZE", payload: { id, size } });
    },
    [ctx, id],
  );

  const setResizing = useCallback(
    (resizing: boolean) => {
      ctx.dispatch({ type: "SET_RESIZING", payload: { id, resizing } });
    },
    [ctx, id],
  );

  const drag = useCallback(
    (position: Position) => {
      ctx.dispatch({ type: "SET_POSITION", payload: { id, position } });
    },
    [ctx, id],
  );

  const setDragging = useCallback(
    (dragging: boolean) => {
      ctx.dispatch({ type: "SET_DRAGGING", payload: { id, dragging } });
    },
    [ctx, id],
  );

  return {
    ...win,
    register,
    unregister,
    maximize,
    minimize,
    open,
    bringToFront,
    resize,
    setResizing,
    drag,
    setDragging,
  };
};
