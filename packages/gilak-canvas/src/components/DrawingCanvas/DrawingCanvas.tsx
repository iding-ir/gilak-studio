import type { RefObject } from "react";

import { useDrawing } from "../../hooks";
import type { BrushShape, BrushSize } from "../../types";
import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";
import { Cursor } from "../Cursor";

export type DrawingCanvasProps = CanvasProps & {
  ref: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
};

export const DrawingCanvas = ({
  ref,
  enabled,
  color,
  brushSize,
  brushShape,
  ...props
}: DrawingCanvasProps) => {
  const { onPointerDown, onPointerMove, onPointerUp } = useDrawing({
    ref,
    enabled,
    color,
    brushSize,
    brushShape,
  });

  return (
    <Cursor
      enabled={enabled}
      color={color}
      brushSize={brushSize}
      brushShape={brushShape}
    >
      <Canvas
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerEnter={onPointerUp}
        {...props}
      />
    </Cursor>
  );
};
