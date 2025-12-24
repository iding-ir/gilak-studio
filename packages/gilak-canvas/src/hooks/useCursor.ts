import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { drawBrush } from "../methods";
import type { BrushShape, BrushSize } from "../types";

export type UseCursorArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  width?: number;
  height?: number;
};

export const useCursor = ({
  canvasRef,
  enabled,
  color,
  brushSize,
  brushShape,
  width = 50,
  height = 50,
}: UseCursorArgs) => {
  const cursorRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor || !enabled) return;

    const ctx = cursor.getContext("2d");
    if (!ctx) return;

    const renderCursor = () => {
      ctx.clearRect(0, 0, width, height);
      const point = { x: width / 2, y: height / 2 };
      drawBrush({ ctx, color, brushSize, brushShape, point });
    };

    renderCursor();

    const onPointerEnter = () => {
      cursor.style.display = "block";
    };

    const onPointerLeave = () => {
      cursor.style.display = "none";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const x = event.offsetX;
        const y = event.offsetY;
        const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
        cursor.style.setProperty("transform", transform);
      });
    };

    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, color, brushSize, brushShape, width, height, canvasRef]);

  return { cursorRef };
};
