import { type RefObject, useCallback, useEffect, useRef } from "react";

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

  useEffect(() => {
    const draw = (event: PointerEvent) => {
      const canvas = ref.current;
      if (!enabled || !canvas || !drawing.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const x = event.offsetX;
      const y = event.offsetY;

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
    };

    const onPointerDown = (event: PointerEvent) => {
      drawing.current = true;
      draw(event);
    };

    const onPointerMove = (event: PointerEvent) => {
      draw(event);
    };

    const onPointerUp = () => {
      drawing.current = false;
      previousPointRef.current = null;
      currentPointRef.current = null;
    };
    const canvas = ref.current;
    if (!canvas) return;

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
    };
  }, [enabled, color, brushSize, brushShape, ref]);

  return {
    initializeCanvas,
  };
};
