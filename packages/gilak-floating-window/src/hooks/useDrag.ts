import { type RefObject, useCallback, useRef } from "react";

import type { Status } from "../context";
import type { Position } from "../types";
import { useFloatingWindow } from "./useFloatingWindows";

const clampPosition = ({
  pos,
  rect,
  parentRect,
  restrictToParent,
}: {
  pos: Position;
  rect: DOMRect | null;
  parentRect: DOMRect | null;
  restrictToParent: boolean;
}): Position => {
  if (!parentRect || !restrictToParent || !rect) return pos;

  const x = Math.max(0, Math.min(pos.x, parentRect.width - rect.width));
  const y = Math.max(0, Math.min(pos.y, parentRect.height - rect.height));

  return { x, y };
};

export type useDragParams = {
  ref: RefObject<HTMLElement | null>;
  id: string;
  position: Position;
  status: Status;
  draggable: boolean;
  restrictToParent: boolean;
  onDragStart?: (pos?: Position) => void;
  onDrag?: (pos?: Position) => void;
  onDragEnd?: (pos?: Position) => void;
};

export const useDrag = ({
  ref,
  id,
  position,
  status,
  draggable,
  restrictToParent,
  onDragStart,
  onDrag,
  onDragEnd,
}: useDragParams) => {
  const {
    setFloatingWindowPosition,
    setFloatingWindowDragging,
    bringFloatingWindowToFront,
  } = useFloatingWindow(id);

  const state = useRef({
    startPosition: position,
    nextPosition: position,
    lastDispatched: position,
    frameRequested: false,
    rect: null as DOMRect | null,
    parentRect: null as DOMRect | null,
  });

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      event.preventDefault();

      if (!draggable || status !== "open") return;

      bringFloatingWindowToFront();
      setFloatingWindowDragging(true);
      onDragStart?.(state.current.startPosition);

      const element = ref.current;
      if (!element) return;

      state.current.rect = element.getBoundingClientRect();
      state.current.startPosition = state.current.lastDispatched;
      state.current.parentRect =
        element.parentElement?.getBoundingClientRect() || null;

      const onPointerMove = (ev: PointerEvent) => {
        state.current.nextPosition = clampPosition({
          pos: {
            x: state.current.startPosition.x + (ev.clientX - event.clientX),
            y: state.current.startPosition.y + (ev.clientY - event.clientY),
          },
          rect: state.current.rect,
          parentRect: state.current.parentRect,
          restrictToParent,
        });

        if (!state.current.frameRequested) {
          state.current.frameRequested = true;
          requestAnimationFrame(() => {
            const { nextPosition, lastDispatched } = state.current;

            if (
              nextPosition.x !== lastDispatched.x ||
              nextPosition.y !== lastDispatched.y
            ) {
              element.style.transform = `translate3d(${Math.round(nextPosition.x)}px, ${Math.round(
                nextPosition.y,
              )}px, 0)`;

              state.current.lastDispatched = nextPosition;
              onDrag?.(nextPosition);
            }
            state.current.frameRequested = false;
          });
        }
      };

      const onPointerUp = () => {
        setFloatingWindowPosition(state.current.lastDispatched);
        setFloatingWindowDragging(false);
        onDragEnd?.(state.current.lastDispatched);

        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    },
    [
      ref,
      draggable,
      status,
      restrictToParent,
      onDragStart,
      onDrag,
      onDragEnd,
      bringFloatingWindowToFront,
      setFloatingWindowDragging,
      setFloatingWindowPosition,
    ],
  );

  return { onPointerDown };
};
