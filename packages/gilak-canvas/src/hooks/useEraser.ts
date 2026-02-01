import { type RefObject } from "react";

import { drawEraser } from "../methods/draw-eraser";
import type { BrushShape, BrushSize } from "../types";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseEraserArgs = {
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
}: UseEraserArgs) => {
  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawEraser({ ctx, brushSize, brushShape, point, prevPoint: null });
    },
    onDrag: ({ point, prevPoint }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawEraser({ ctx, brushSize, brushShape, point, prevPoint });
    },
  });
};
