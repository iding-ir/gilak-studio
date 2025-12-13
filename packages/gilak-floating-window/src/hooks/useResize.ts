import { type RefObject, useCallback, useEffect, useRef } from "react";

import { useFloatingWindowContext } from "../context";
import type { Size } from "../types";

type Params = {
  id: string;
  targetRef: RefObject<HTMLElement | null>;
  resizable?: boolean;
  initialSize?: Size;
  minSize?: Size;
  maxSize?: Size;
  onResizeStart?: (size?: Size) => void;
  onResize?: (size?: Size) => void;
  onResizeEnd?: (size?: Size) => void;
};

export function useResize({
  id,
  targetRef,
  resizable = true,
  initialSize = { w: 400, h: 300 },
  minSize = { w: 300, h: 200 },
  maxSize,
  onResizeStart,
  onResize,
  onResizeEnd,
}: Params) {
  const ctx = useFloatingWindowContext();

  const dragStartPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elementStartSize = useRef<Size>(initialSize);
  const nextSize = useRef<Size>(initialSize);
  const frameRequestedSize = useRef(false);
  const lastDispatchedSize = useRef<Size>(initialSize);

  const clamp = useCallback(
    (size: Size) => {
      let w = size.w;
      let h = size.h;
      if (minSize) {
        w = Math.max(minSize.w, w);
        h = Math.max(minSize.h, h);
      }
      if (maxSize) {
        w = Math.min(maxSize.w, w);
        h = Math.min(maxSize.h, h);
      }
      return { w, h };
    },
    [minSize, maxSize],
  );

  const applySizeToDom = useCallback(
    (size: Size) => {
      const el = targetRef.current;
      if (!el) return;
      if (typeof size.w === "number")
        el.style.width = `${Math.round(size.w)}px`;
      if (typeof size.h === "number")
        el.style.height = `${Math.round(size.h)}px`;
    },
    [targetRef],
  );

  const scheduleApply = useCallback(() => {
    if (frameRequestedSize.current) return;
    frameRequestedSize.current = true;
    window.requestAnimationFrame(() => {
      const ns = nextSize.current;
      applySizeToDom(ns);
      const last = lastDispatchedSize.current;
      const changed = ns.w !== last.w || ns.h !== last.h;
      if (changed) {
        ctx.dispatch({
          type: "SET_GRID_SIZE",
          payload: { id, size: ns },
        });
        lastDispatchedSize.current = ns;
      }
      onResize?.(ns);
      frameRequestedSize.current = false;
    });
  }, [applySizeToDom, onResize, ctx, id]);

  // apply size when context changes (keep DOM inline style in sync)
  useEffect(() => {
    const ctxW = ctx.state.windows[id]?.size.w ?? initialSize.w;
    const ctxH = ctx.state.windows[id]?.size.h ?? initialSize.h;
    if (targetRef.current) {
      const el = targetRef.current;
      if (typeof ctxW === "number") el.style.width = `${Math.round(ctxW)}px`;
      if (typeof ctxH === "number") el.style.height = `${Math.round(ctxH)}px`;
    }
    lastDispatchedSize.current = { w: ctxW, h: ctxH };
  }, [ctx.state.windows, id, initialSize, targetRef]);

  const handleResizePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!resizable || event.button !== 0) return;
      event.preventDefault();

      ctx.dispatch({ type: "SET_RESIZING", payload: { id, resizing: true } });
      onResizeStart?.(elementStartSize.current);

      dragStartPointer.current = { x: event.clientX, y: event.clientY };
      const el = targetRef.current;
      elementStartSize.current = {
        w: el ? el.offsetWidth : initialSize.w,
        h: el ? el.offsetHeight : initialSize.h,
      };

      const handlePointerMoveResize = (ev: PointerEvent) => {
        if (!resizable) return;
        const deltaX = ev.clientX - dragStartPointer.current.x;
        const deltaY = ev.clientY - dragStartPointer.current.y;

        const startW = elementStartSize.current.w;
        const startH = elementStartSize.current.h;

        const newSize = clamp({ w: startW + deltaX, h: startH + deltaY });
        nextSize.current = newSize;
        scheduleApply();
      };

      const handlePointerUpResize = () => {
        ctx.dispatch({
          type: "SET_RESIZING",
          payload: { id, resizing: false },
        });
        onResizeEnd?.(lastDispatchedSize.current);
        document.removeEventListener("pointermove", handlePointerMoveResize);
        document.removeEventListener("pointerup", handlePointerUpResize);
      };

      document.addEventListener("pointermove", handlePointerMoveResize);
      document.addEventListener("pointerup", handlePointerUpResize);
    },
    [
      resizable,
      onResizeStart,
      onResizeEnd,
      clamp,
      scheduleApply,
      ctx,
      id,
      initialSize,
      targetRef,
    ],
  );

  return { onPointerDown: handleResizePointerDown };
}

export default useResize;
