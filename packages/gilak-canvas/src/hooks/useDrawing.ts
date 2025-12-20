import { type PointerEvent, type RefObject, useCallback, useRef } from "react";

import { drawBrush } from "../methods";
import type { BrushShape, BrushSize } from "../types";
import type { Point } from "../types/point";

export type UseDrawingProps = {
  ref: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
};

export const useDrawing = ({
  ref,
  enabled,
  color,
  brushSize,
  brushShape,
}: UseDrawingProps) => {
  const drawing = useRef<boolean>(false);
  const currentPointRef = useRef<Point | null>(null);
  const previousPointRef = useRef<Point | null>(null);

  const initializeCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      ref.current = canvas;
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    },
    [ref],
  );

  const draw = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (!enabled || !ref.current || !drawing.current) return;
      const ctx = ref.current.getContext("2d");
      if (!ctx) return;

      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      previousPointRef.current = currentPointRef.current;
      currentPointRef.current = { x, y };

      drawBrush({
        ctx,
        brushSize,
        brushShape,
        color,
        point: currentPointRef.current,
        prevPoint: previousPointRef.current,
      });
    },
    [enabled, ref, brushSize, brushShape, color],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      drawing.current = true;
      draw(event);
    },
    [draw],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      draw(event);
    },
    [draw],
  );

  const onPointerUp = useCallback(() => {
    drawing.current = false;
    previousPointRef.current = null;
    currentPointRef.current = null;
  }, []);

  return {
    initializeCanvas,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
};
