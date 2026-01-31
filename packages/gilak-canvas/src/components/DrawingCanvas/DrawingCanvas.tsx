import clsx from "clsx";
import { type RefObject } from "react";

import {
  useCanvasSize,
  useCursor,
  useDrawing,
  useEraser,
  useFill,
} from "../../hooks";
import { useCanvasRenderer } from "../../hooks/useCanvasRenderer";
import { useMove } from "../../hooks/useMove";
import { getCursorColor } from "../../methods/get-cursor-color";
import { type BrushShape, type BrushSize } from "../../types";
import { Canvas } from "../Canvas";
import { Cursor } from "../Cursor";
import styles from "./DrawingCanvas.module.scss";

export type DrawingCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabledDrawing: boolean;
  enabledFill: boolean;
  enabledEraser: boolean;
  enabledMove: boolean;
  color: string;
  backgroundColor: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  width?: string | number;
  height?: string | number;
  tolerance: number;
  className?: string;
};

export const DrawingCanvas = ({
  canvasRef,
  enabledDrawing,
  enabledFill,
  enabledEraser,
  enabledMove,
  color,
  backgroundColor,
  brushSize,
  brushShape,
  width,
  height,
  tolerance,
  className,
  ...props
}: DrawingCanvasProps) => {
  useCanvasSize({
    canvasRef,
    width,
    height,
  });
  useDrawing({
    canvasRef,
    enabled: enabledDrawing,
    color,
    brushSize,
    brushShape,
  });
  useFill({
    canvasRef,
    enabled: enabledFill,
    color,
    tolerance,
  });
  useEraser({
    canvasRef,
    enabled: enabledEraser,
    brushSize,
    brushShape,
  });
  useMove({
    canvasRef,
    enabled: enabledMove,
  });
  useCanvasRenderer({ canvasRef });

  const { cursorRef } = useCursor({
    canvasRef,
    enabled: enabledDrawing || enabledEraser || enabledFill,
    color: getCursorColor({
      color,
      backgroundColor,
      enabledEraser,
      enabledDrawing,
      enabledFill,
    }),
    brushSize,
    brushShape,
  });

  return (
    <div {...props} className={clsx(styles.canvas, className)}>
      <Canvas canvasRef={canvasRef} />
      <Cursor cursorRef={cursorRef} />
    </div>
  );
};
