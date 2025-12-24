import { type RefObject } from "react";

import { drawBrush } from "../methods";
import type { BrushShape, BrushSize } from "../types";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseDrawingProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  onChange?: () => void;
};

export const useDrawing = ({
  canvasRef,
  enabled,
  color,
  brushSize,
  brushShape,
  onChange,
}: UseDrawingProps) => {
  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      onChange?.();

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawBrush({ ctx, brushSize, brushShape, color, point, prevPoint: null });
    },
    onDrag: ({ point, prevPoint }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      drawBrush({ ctx, brushSize, brushShape, color, point, prevPoint });
    },
  });
};
