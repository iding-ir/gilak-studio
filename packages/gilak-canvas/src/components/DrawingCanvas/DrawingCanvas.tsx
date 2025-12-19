import type { RefObject } from "react";
import { useRef } from "react";

import { useDraw } from "../../hooks/useDraw";
import type { BrushShape, BrushSize } from "../../types";
import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";

export type DrawingCanvasProps = CanvasProps & {
  enabled: boolean;
  color?: string;
  backgroundColor?: string;
  brushSize?: BrushSize;
  brushShape?: BrushShape;
};

export const DrawingCanvas = ({
  enabled,
  color = "#000000",
  backgroundColor = "#ffffff",
  brushSize = 2,
  brushShape = "CIRCLE",
  ...props
}: DrawingCanvasProps) => {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const ref = (props.ref ?? internalRef) as RefObject<HTMLCanvasElement>;

  useDraw({
    ref,
    enabled,
    color,
    brushSize,
    brushShape,
    backgroundColor,
  });

  return (
    <Canvas
      {...props}
      style={{
        cursor: enabled ? "none" : "default",
        ...(props.style || {}),
      }}
      ref={ref}
    />
  );
};
