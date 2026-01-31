import { useRef } from "react";

import { createElementFromDrawing } from "../methods/create-element-from-drawing";
import { drawBrush } from "../methods/draw-brush";
import type { BrushShape, BrushSize } from "../types";
import type { DrawingContent } from "../types/canvas";
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
  const currentContentRef = useRef<DrawingContent | null>(null);
  const { addElement } = useCanvas();

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      currentContentRef.current = {
        color,
        brushSize,
        brushShape,
        points: [point],
      };
    },
    onDrag: ({ point }) => {
      const content = currentContentRef.current;
      if (!content) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      currentContentRef.current?.points.push(point);

      drawBrush({
        ctx,
        color,
        brushSize,
        brushShape,
        point,
        prevPoint: content.points[content.points.length - 2] || null,
      });
    },
    onUp: () => {
      const content = currentContentRef.current;
      if (!content) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const documentSize = { w: canvas.width, h: canvas.height };
      const element = createElementFromDrawing({ content, documentSize });

      addElement(element);
      currentContentRef.current = null;
    },
  });
};
