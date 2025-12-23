import { type RefObject, useEffect, useRef } from "react";

import { drawEraser } from "../methods/draw-eraser";
import type { BrushShape, BrushSize, Scale } from "../types";
import type { Point } from "../types";

export type UseEraserProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  brushSize: BrushSize;
  brushShape: BrushShape;
};

export const useEraser = ({
  canvasRef,
  enabled,
  brushSize,
  brushShape,
}: UseEraserProps) => {
  const erasing = useRef<boolean>(false);
  const currentPointRef = useRef<Point | null>(null);
  const previousPointRef = useRef<Point | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const scaleRef = useRef<Scale | null>(null);

  useEffect(() => {
    const toCanvasCoords = (event: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = rectRef.current ?? canvas.getBoundingClientRect();
      const scale = scaleRef.current ?? {
        sx: canvas.width / rect.width,
        sy: canvas.height / rect.height,
      };

      const x = Math.floor((event.clientX - rect.left) * scale.sx);
      const y = Math.floor((event.clientY - rect.top) * scale.sy);
      return { x, y } as Point;
    };

    const draw = (event: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!enabled || !canvas || !erasing.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const coords = toCanvasCoords(event);
      if (!coords) return;

      previousPointRef.current = currentPointRef.current;
      currentPointRef.current = coords;

      drawEraser({
        ctx,
        brushSize,
        brushShape,
        point: currentPointRef.current!,
        prevPoint: previousPointRef.current,
      });
    };

    const onPointerDown = (event: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      rectRef.current = canvas.getBoundingClientRect();
      scaleRef.current = {
        sx: canvas.width / rectRef.current.width,
        sy: canvas.height / rectRef.current.height,
      };

      erasing.current = true;
      draw(event);
    };

    const onPointerMove = (event: PointerEvent) => {
      draw(event);
    };

    const onPointerUp = () => {
      erasing.current = false;
      previousPointRef.current = null;
      currentPointRef.current = null;
      rectRef.current = null;
      scaleRef.current = null;
    };

    const canvas = canvasRef.current;
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
  }, [enabled, brushSize, brushShape, canvasRef]);
};
