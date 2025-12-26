import { type RefObject } from "react";

import { useCursor, useDrawing, useEraser, useFill } from "../../hooks";
import { type BrushShape, type BrushSize } from "../../types";
import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";
import { Cursor } from "../Cursor";
import styles from "./DrawingCanvas.module.scss";

export type DrawingCanvasProps = CanvasProps & {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabledDrawing: boolean;
  enabledFill: boolean;
  enabledEraser?: boolean;
  color: string;
  backgroundColor: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  width?: string | number;
  height?: string | number;
  tolerance: number;
  onChange?: () => void;
};

export const DrawingCanvas = ({
  canvasRef,
  enabledDrawing,
  enabledFill,
  enabledEraser = false,
  color,
  backgroundColor,
  brushSize,
  brushShape,
  width,
  height,
  tolerance,
  onChange,
  ...props
}: DrawingCanvasProps) => {
  useDrawing({
    canvasRef,
    enabled: enabledDrawing,
    color,
    brushSize,
    brushShape,
    onChange,
  });
  useFill({
    canvasRef,
    enabled: enabledFill,
    color: backgroundColor,
    tolerance,
    onChange,
  });
  useEraser({
    canvasRef,
    enabled: enabledEraser,
    brushSize,
    brushShape,
    onChange,
  });
  const { cursorRef } = useCursor({
    canvasRef,
    enabled: enabledDrawing || enabledEraser,
    color,
    brushSize,
    brushShape,
  });

  return (
    <div className={styles.canvas}>
      <Canvas canvasRef={canvasRef} {...props} width={width} height={height} />
      <Cursor cursorRef={cursorRef} />
    </div>
  );
};
