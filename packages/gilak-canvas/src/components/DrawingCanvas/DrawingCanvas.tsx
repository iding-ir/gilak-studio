import type { RefObject } from "react";

import { type BrushShape, type BrushSize } from "../../types";
import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";
import { DrawingTool } from "../DrawingTool";
import { FillTool } from "../FillTool";

export type DrawingCanvasProps = CanvasProps & {
  ref: RefObject<HTMLCanvasElement | null>;
  enabledDrawing: boolean;
  enabledFill: boolean;
  color: string;
  backgroundColor: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  tolerance: number;
};

export const DrawingCanvas = ({
  ref,
  enabledDrawing,
  enabledFill,
  color,
  backgroundColor,
  brushSize,
  brushShape,
  tolerance,
  ...props
}: DrawingCanvasProps) => {
  return (
    <DrawingTool
      ref={ref}
      enabled={enabledDrawing}
      color={color}
      brushSize={brushSize}
      brushShape={brushShape}
    >
      <FillTool
        ref={ref}
        enabled={enabledFill}
        color={backgroundColor}
        tolerance={tolerance}
      >
        <Canvas ref={ref} {...props} />
      </FillTool>
    </DrawingTool>
  );
};
