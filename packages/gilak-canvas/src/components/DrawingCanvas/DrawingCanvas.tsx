import type { RefObject } from "react";
import { useRef } from "react";

import { useDraw } from "../../hooks/useDraw";
import type { BrushSize, BrushType } from "../../types/brush";
import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";

export type DrawingCanvasProps = CanvasProps & {
  enabled: boolean;
  color?: string;
  backgroundColor?: string;
  brushSize?: BrushSize;
  brushType?: BrushType;
};

export const DrawingCanvas = ({
  enabled,
  color = "#000000",
  backgroundColor = "#ffffff",
  brushSize = 2,
  brushType = "CIRCLE",
  ...props
}: DrawingCanvasProps) => {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const ref = (props.ref ?? internalRef) as RefObject<HTMLCanvasElement>;

  useDraw({
    ref,
    enabled,
    color,
    brushSize,
    brushType,
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
