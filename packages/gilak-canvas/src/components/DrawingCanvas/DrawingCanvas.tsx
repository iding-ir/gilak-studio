import { type RefObject, useState } from "react";

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
  width?: string | number;
  height?: string | number;
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
  const [width] = useState(props.width);
  const [height] = useState(props.height);

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
        <Canvas ref={ref} {...props} width={width} height={height} />
      </FillTool>
    </DrawingTool>
  );
};
