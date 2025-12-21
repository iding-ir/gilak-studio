import { useEffect, useRef } from "react";

import { drawBrush } from "../methods";
import type { BrushShape, BrushSize } from "../types";

export const useCursor = ({
  enabled,
  color,
  brushSize,
  brushShape,
  width = 50,
  height = 50,
}: {
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  width?: number;
  height?: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !enabled) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderCursor = () => {
      ctx.clearRect(0, 0, width, height);
      const point = { x: width / 2, y: height / 2 };
      drawBrush({ ctx, color, brushSize, brushShape, point });
    };

    renderCursor();

    const onPointerEnter = () => {
      canvas.style.display = "block";
    };

    const onPointerLeave = () => {
      canvas.style.display = "none";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const x = event.offsetX;
        const y = event.offsetY;
        const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
        canvas.style.setProperty("transform", transform);
      });
    };

    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, color, brushSize, brushShape, width, height]);

  return { containerRef, canvasRef };
};
