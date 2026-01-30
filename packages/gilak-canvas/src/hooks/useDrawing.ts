import { useRef } from "react";

import { createElementFromDrawing } from "../methods/create-element-from-drawing";
import { drawBrush } from "../methods/draw-brush";
import type { BrushShape, BrushSize } from "../types";
import type { DrawingStroke } from "../types/canvas";
import { useCanvas } from "./useCanvas";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseDrawingProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
};

export const useDrawing = ({
  canvasRef,
  enabled,
  color,
  brushSize,
  brushShape,
}: UseDrawingProps) => {
  const currentStrokeRef = useRef<DrawingStroke | null>(null);
  const { addElement } = useCanvas();

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
      const stroke = currentStrokeRef.current;
      if (!stroke) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      currentStrokeRef.current?.points.push(point);

      drawBrush({
        ctx,
        color,
        brushSize,
        brushShape,
        point,
        prevPoint: stroke.points[stroke.points.length - 2] || null,
      });
    },
    onUp: () => {
      const stroke = currentStrokeRef.current;
      if (!stroke) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const documentSize = { w: canvas.width, h: canvas.height };
      const element = createElementFromDrawing({
        stroke,
        documentSize,
      });

      addElement(element);
      currentStrokeRef.current = null;
    },
  });
};
