import { type ReactNode, type RefObject } from "react";

import { useDrawing } from "../../hooks/useDrawing";
import type { BrushShape, BrushSize } from "../../types";
import { Cursor } from "../Cursor";

export type DrawingToolProps = {
  ref: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  children: ReactNode;
};

export const DrawingTool = ({
  ref,
  enabled,
  color,
  brushSize,
  brushShape,
  children,
}: DrawingToolProps) => {
  useDrawing({ ref, enabled, color, brushSize, brushShape });

  return (
    <Cursor
      enabled={enabled}
      color={color}
      brushSize={brushSize}
      brushShape={brushShape}
    >
      {children}
    </Cursor>
  );
};
