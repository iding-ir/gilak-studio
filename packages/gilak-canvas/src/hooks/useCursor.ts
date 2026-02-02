import type { RefObject } from "react";
import { useRef } from "react";

import { drawShape } from "../methods/draw-shape";
import type { BrushShape, BrushSize, CursorShape } from "../types";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseCursorArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  size: BrushSize;
  shape: BrushShape | CursorShape;
  width?: number;
  height?: number;
};

export const useCursor = ({
  canvasRef,
  enabled,
  color,
  size,
  shape,
  width = 50,
  height = 50,
}: UseCursorArgs) => {
  const cursorRef = useRef<HTMLCanvasElement | null>(null);

  useCanvasPointer({
    canvasRef,
    enabled,
    onLeave: () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      cursor.style.setProperty("display", "none");
    },
    onMove: ({ point: { x, y } }) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      const ctx = cursor.getContext("2d");
      if (!ctx) return;

      cursor.width = width;
      cursor.height = height;
      cursor.style.setProperty("width", `${width}px`);
      cursor.style.setProperty("height", `${height}px`);
      cursor.style.setProperty("display", "block");
      cursor.style.setProperty(
        "transform",
        `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`,
      );

      const point = { x: width / 2, y: height / 2 };

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      drawShape(ctx, point.x, point.y, size, shape);
    },
  });

  return { cursorRef };
};
