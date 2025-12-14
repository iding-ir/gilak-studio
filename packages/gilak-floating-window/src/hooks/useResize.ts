import { type RefObject, useCallback, useRef } from "react";

import type { Status } from "../context";
import type { Size } from "../types";
import { useWindow } from "./useWindow";

const clampSize = ({
  size,
  minSize,
  maxSize,
  restrictToParent,
  rect,
  parentRect,
}: {
  size: Size;
  minSize: Size;
  maxSize: Size;
  restrictToParent?: boolean;
  rect?: DOMRect | null;
  parentRect?: DOMRect | null;
}): Size => {
  let w = Math.max(minSize.w, size.w);
  let h = Math.max(minSize.h, size.h);

  if (maxSize) {
    w = Math.min(maxSize.w, w);
    h = Math.min(maxSize.h, h);
  }

  if (restrictToParent && parentRect && rect) {
    const currentLeft = rect.left - parentRect.left;
    const currentTop = rect.top - parentRect.top;

    if (currentLeft + w > parentRect.width) w = parentRect.width - currentLeft;
    if (currentTop + h > parentRect.height) h = parentRect.height - currentTop;
    if (currentLeft < 0) w = Math.min(w, parentRect.width);
    if (currentTop < 0) h = Math.min(h, parentRect.height);
  }

  return { w, h };
};

export type useResizeParams = {
  ref: RefObject<HTMLElement | null>;
  id: string;
  size: Size;
  status: Status;
  resizable: boolean;
  minSize: Size;
  maxSize: Size;
  restrictToParent: boolean;
  onResizeStart?: (size?: Size) => void;
  onResize?: (size?: Size) => void;
  onResizeEnd?: (size?: Size) => void;
};

export const useResize = ({
  ref,
  id,
  size,
  status,
  resizable,
  minSize,
  maxSize,
  restrictToParent,
  onResizeStart,
  onResize,
  onResizeEnd,
}: useResizeParams) => {
  const { resize, setResizing, bringToFront } = useWindow(id);

  const state = useRef({
    startSize: size,
    nextSize: size,
    lastDispatched: size,
    frameRequested: false,
    rect: null as DOMRect | null,
    parentRect: null as DOMRect | null,
  });

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      event.preventDefault();

      if (!resizable || status !== "open") return;

      bringToFront();
      setResizing(true);
      onResizeStart?.(state.current.startSize);

      const element = ref.current;
      if (!element) return;

      state.current.rect = element.getBoundingClientRect();
      state.current.startSize = state.current.lastDispatched;
      state.current.parentRect =
        element.parentElement?.getBoundingClientRect() || null;

      const onPointerMove = (ev: PointerEvent) => {
        state.current.nextSize = clampSize({
          size: {
            w: state.current.startSize.w + ev.clientX - event.clientX,
            h: state.current.startSize.h + ev.clientY - event.clientY,
          },
          minSize,
          maxSize,
          rect: state.current.rect,
          parentRect: state.current.parentRect,
          restrictToParent,
        });

        if (!state.current.frameRequested) {
          state.current.frameRequested = true;
          requestAnimationFrame(() => {
            const { nextSize, lastDispatched } = state.current;

            if (
              nextSize.w !== lastDispatched.w ||
              nextSize.h !== lastDispatched.h
            ) {
              element.style.width = `${Math.round(nextSize.w)}px`;
              element.style.height = `${Math.round(nextSize.h)}px`;

              state.current.lastDispatched = nextSize;
              onResize?.(nextSize);
            }
            state.current.frameRequested = false;
          });
        }
      };

      const onPointerUp = () => {
        resize(state.current.lastDispatched);
        setResizing(false);
        onResizeEnd?.(state.current.lastDispatched);

        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    },
    [
      ref,
      status,
      resizable,
      minSize,
      maxSize,
      restrictToParent,
      onResizeStart,
      onResizeEnd,
      onResize,
      setResizing,
      bringToFront,
      resize,
    ],
  );

  return { onPointerDown };
};
