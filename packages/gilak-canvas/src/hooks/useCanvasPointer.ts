import { type RefObject, useEffect, useRef } from "react";

import type { Point } from "../types";

export type Response = {
  event: PointerEvent;
  point: Point;
  canvas: HTMLCanvasElement;
};

export type CanvasHandlers = {
  onEnter?: (response: Response) => void;
  onLeave?: (response: Response) => void;
  onDown?: (response: Response) => void;
  onDrag?: (response: Response & { prevPoint: Point | null }) => void;
  onUp?: (response: Response) => void;
  onMove?: (response: Response) => void;
};

export type UseCanvasPointerArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
} & CanvasHandlers;

const startedPointers = new WeakMap<
  HTMLCanvasElement,
  Map<number, Point | null>
>();

export const useCanvasPointer = ({
  canvasRef,
  enabled,
  onEnter,
  onLeave,
  onDown,
  onDrag,
  onUp,
  onMove,
}: UseCanvasPointerArgs) => {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let map = startedPointers.get(canvas);
    if (!map) {
      map = new Map<number, Point | null>();
      startedPointers.set(canvas, map);
    }

    const toCanvas = (ev: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      const sx = canvas.width / rect.width;
      const sy = canvas.height / rect.height;
      const x = Math.floor((ev.clientX - rect.left) * sx);
      const y = Math.floor((ev.clientY - rect.top) * sy);
      return { x, y };
    };

    const onPointerEnter = (event: PointerEvent) => {
      onEnter?.({ event, canvas, point: toCanvas(event) });
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (map!.has(event.pointerId)) map!.delete(event.pointerId);
      onLeave?.({ event, canvas, point: toCanvas(event) });
    };

    const onPointerDown = (event: PointerEvent) => {
      if (map!.has(event.pointerId)) return;

      canvas.setPointerCapture(event.pointerId);
      const point = toCanvas(event);
      map!.set(event.pointerId, point);
      onDown?.({ event, canvas, point });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const point = toCanvas(event);
        onMove?.({ event, canvas, point });

        if (!map!.has(event.pointerId)) return;

        const prevPoint = map!.get(event.pointerId) ?? null;
        map!.set(event.pointerId, point);
        onDrag?.({ event, canvas, point, prevPoint });
      });
    };

    const endPointer = (event: PointerEvent) => {
      if (map!.has(event.pointerId)) {
        map!.delete(event.pointerId);
      }

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      onUp?.({ event, canvas, point: toCanvas(event) });
    };

    const onPointerUp = (event: PointerEvent) => {
      endPointer(event);
    };

    const onPointerCancel = (event: PointerEvent) => {
      endPointer(event);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [canvasRef, enabled, onEnter, onLeave, onDown, onDrag, onUp, onMove]);
};
