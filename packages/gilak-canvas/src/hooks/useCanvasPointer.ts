import { type RefObject, useEffect } from "react";

import type { Point } from "../types/point";

export type Response = {
  event: PointerEvent;
  point: Point;
  canvas: HTMLCanvasElement;
};

export type CanvasHandlers = {
  onEnter?: (response: Response) => void;
  onLeave?: (response: Response) => void;
  onDown?: (response: Response) => void;
  onMove?: (response: Response & { prevPoint: Point | null }) => void;
  onUp?: (response: Response) => void;
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
  onMove,
  onUp,
}: UseCanvasPointerArgs) => {
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let map = startedPointers.get(canvas);
    if (!map) {
      map = new Map<number, Point | null>();
      startedPointers.set(canvas, map);
    }

    const rectRef = { current: canvas.getBoundingClientRect() };

    const toCanvas = (ev: PointerEvent): Point => {
      const rect = rectRef.current;
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
      // dedupe by pointer id
      if (map!.has(event.pointerId)) return;

      // cache rect at start
      rectRef.current = canvas.getBoundingClientRect();

      const point = toCanvas(event);
      map!.set(event.pointerId, point);
      onDown?.({ event, canvas, point });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!map!.has(event.pointerId)) return;
      const prevPoint = map!.get(event.pointerId) ?? null;
      const point = toCanvas(event);
      map!.set(event.pointerId, point);
      onMove?.({ event, canvas, point, prevPoint });
    };

    const onPointerUp = (event: PointerEvent) => {
      if (map!.has(event.pointerId)) map!.delete(event.pointerId);
      onUp?.({ event, canvas, point: toCanvas(event) });
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [canvasRef, enabled, onEnter, onLeave, onDown, onMove, onUp]);
};
