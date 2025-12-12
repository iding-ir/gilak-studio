import { type RefObject, useCallback, useRef } from "react";

import { useFloatingWindowContext } from "../context";
import type { Position } from "../types";
import useWindow from "./useWindow";

type Params = {
  id: string;
  targetRef: RefObject<HTMLElement | null>;
  draggable?: boolean;
  restrictToParent?: boolean;
  initialPosition?: Position;
  onDragStart?: (pos?: Position) => void;
  onDragEnd?: (pos?: Position) => void;
};

export function useDrag({
  id,
  targetRef,
  draggable = true,
  restrictToParent = true,
  initialPosition = { x: 0, y: 0 },
  onDragStart,
  onDragEnd,
}: Params) {
  const ctx = useFloatingWindowContext();
  const { status, dragging, bringToFront } = useWindow(id);

  const dragStartPos = useRef<Position>({ x: 0, y: 0 });
  const elementStartPos = useRef<Position>(initialPosition);
  const nextPosition = useRef<Position>(initialPosition);
  const lastDispatchedPosition = useRef<Position>(initialPosition);
  const frameRequested = useRef(false);
  const parentRectRef = useRef<DOMRect | null>(null);

  const clampPosition = useCallback(
    (pos: Position) => {
      if (!restrictToParent || !targetRef.current || !parentRectRef.current)
        return pos;
      const parentRect = parentRectRef.current;
      const el = targetRef.current;
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      let x = pos.x;
      let y = pos.y;
      x = Math.max(0, Math.min(x, parentRect.width - width));
      y = Math.max(0, Math.min(y, parentRect.height - height));
      return { x, y };
    },
    [restrictToParent, targetRef],
  );

  const dragDisabled = !draggable || status === "maximized";

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (dragDisabled) return;

      const deltaX = event.clientX - dragStartPos.current.x;
      const deltaY = event.clientY - dragStartPos.current.y;

      let newPos = {
        x: elementStartPos.current.x + deltaX,
        y: elementStartPos.current.y + deltaY,
      };
      newPos = clampPosition(newPos);
      nextPosition.current = newPos;

      if (!frameRequested.current) {
        frameRequested.current = true;
        window.requestAnimationFrame(() => {
          const np = nextPosition.current;
          const last = lastDispatchedPosition.current;
          if (np.x !== last.x || np.y !== last.y) {
            ctx.dispatch({
              type: "SET_POSITION",
              payload: { id, position: np },
            });
            lastDispatchedPosition.current = np;
          }
          frameRequested.current = false;
        });
      }
    },
    [dragDisabled, clampPosition, ctx, id],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!draggable || event.button !== 0) return;
      if (status === "maximized") return;

      event.preventDefault();

      bringToFront?.();
      ctx.dispatch({ type: "SET_DRAGGING", payload: { id, dragging: true } });
      onDragStart?.(elementStartPos.current);

      dragStartPos.current = { x: event.clientX, y: event.clientY };

      const currentX = ctx.state.windows[id]?.position.x ?? initialPosition.x;
      const currentY = ctx.state.windows[id]?.position.y ?? initialPosition.y;
      elementStartPos.current = { x: currentX, y: currentY };
      lastDispatchedPosition.current = { x: currentX, y: currentY };

      if (
        restrictToParent &&
        targetRef.current &&
        targetRef.current.parentElement
      ) {
        parentRectRef.current =
          targetRef.current.parentElement.getBoundingClientRect();
      }

      const handlePointerUp = () => {
        ctx.dispatch({
          type: "SET_DRAGGING",
          payload: { id, dragging: false },
        });
        onDragEnd?.(lastDispatchedPosition.current);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [
      draggable,
      handlePointerMove,
      onDragStart,
      onDragEnd,
      restrictToParent,
      status,
      ctx,
      id,
      initialPosition.x,
      initialPosition.y,
      targetRef,
      bringToFront,
    ],
  );

  return { onPointerDown: handlePointerDown, dragging };
}

export default useDrag;
