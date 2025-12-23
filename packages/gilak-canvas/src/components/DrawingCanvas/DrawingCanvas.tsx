import { type RefObject } from "react";

import { type BrushShape, type BrushSize } from "../../types";
import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";
import { DrawingTool } from "../DrawingTool";
import { FillTool } from "../FillTool";

export type DrawingCanvasProps = CanvasProps & {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabledDrawing: boolean;
  enabledFill: boolean;
  color: string;
  backgroundColor: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  width?: string | number;
  height?: string | number;
  tolerance: number;
};

export const DrawingCanvas = ({
  canvasRef,
  enabledDrawing,
  enabledFill,
  color,
  backgroundColor,
  brushSize,
  brushShape,
  width,
  height,
  tolerance,
  ...props
}: DrawingCanvasProps) => {
  return (
    <DrawingTool
      canvasRef={canvasRef}
      enabled={enabledDrawing}
      color={color}
      brushSize={brushSize}
      brushShape={brushShape}
    >
      <FillTool
        canvasRef={canvasRef}
        enabled={enabledFill}
        color={backgroundColor}
        tolerance={tolerance}
      >
        <Canvas
          canvasRef={canvasRef}
          {...props}
          width={width}
          height={height}
        />
      </FillTool>
    </DrawingTool>
  );
};
