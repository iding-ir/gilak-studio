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
    onEnter: () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      cursor.style.display = "block";
      cursor.width = width;
      cursor.height = height;
      cursor.style.width = `${width}px`;
      cursor.style.height = `${height}px`;

      const ctx = cursor.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const point = { x: width / 2, y: height / 2 };
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      drawShape(ctx, point.x, point.y, size, shape);
    },
    onLeave: () => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.display = "none";
    },
    onDown: () => {
      const cursor = cursorRef.current;
      if (!cursor) return;
    },
    onMove: ({ point: { x, y } }) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.setProperty(
        "transform",
        `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`,
      );
    },
  });

  return { cursorRef };
};
