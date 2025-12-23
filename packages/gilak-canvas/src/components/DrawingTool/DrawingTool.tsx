import { type ReactNode, type RefObject } from "react";

import { useDrawing } from "../../hooks/useDrawing";
import type { BrushShape, BrushSize } from "../../types";
import { Cursor } from "../Cursor";

export type DrawingToolProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  children: ReactNode;
};

export const DrawingTool = ({
  canvasRef,
  enabled,
  color,
  brushSize,
  brushShape,
  children,
}: DrawingToolProps) => {
  useDrawing({ canvasRef, enabled, color, brushSize, brushShape });

  return (
    <Cursor
      canvasRef={canvasRef}
      enabled={enabled}
      color={color}
      brushSize={brushSize}
      brushShape={brushShape}
    >
      {children}
    </Cursor>
  );
};
