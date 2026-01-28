import { useRef } from "react";

import type { BrushShape, BrushSize } from "../types";
import type { DrawingStroke } from "../types/canvas";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseDrawingProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  onStrokeComplete?: (stroke: DrawingStroke) => void;
};

export const useDrawing = ({
  canvasRef,
  enabled,
  color,
  brushSize,
  brushShape,
  onStrokeComplete,
}: UseDrawingProps) => {
  const currentStrokeRef = useRef<DrawingStroke | null>(null);

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      currentStrokeRef.current = {
        color,
        brushSize,
        brushShape,
        points: [point],
      };
    },
    onDrag: ({ point }) => {
      currentStrokeRef.current?.points.push(point);
    },
    onUp: () => {
      if (currentStrokeRef.current) {
        onStrokeComplete?.(currentStrokeRef.current);
        currentStrokeRef.current = null;
      }
    },
  });
};
