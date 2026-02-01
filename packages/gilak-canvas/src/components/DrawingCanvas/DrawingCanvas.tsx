import clsx from "clsx";
import { type RefObject } from "react";

import {
  useCanvasSize,
  useCursor,
  useDrawing,
  useEraser,
  useFill,
  useText,
} from "../../hooks";
import { useCanvas } from "../../hooks/useCanvas";
import { useCanvasRenderer } from "../../hooks/useCanvasRenderer";
import { useMove } from "../../hooks/useMove";
import { getCursor } from "../../methods/get-cursor";
import type { BrushShape, BrushSize, Size } from "../../types";
import { Canvas } from "../Canvas";
import { Cursor } from "../Cursor";
import { TextDialog } from "../TextDialog";
import styles from "./DrawingCanvas.module.scss";

export type DrawingCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabledDrawing: boolean;
  enabledFill: boolean;
  enabledEraser: boolean;
  enabledMove: boolean;
  enabledText: boolean;
  enabledColorPicker: boolean;
  color: string;
  backgroundColor: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  size: Size;
  tolerance: number;
  className?: string;
};

export const DrawingCanvas = ({
  canvasRef,
  enabledDrawing,
  enabledFill,
  enabledEraser,
  enabledMove,
  enabledText,
  enabledColorPicker,
  color,
  backgroundColor,
  brushSize,
  brushShape,
  size,
  tolerance,
  className,
  ...props
}: DrawingCanvasProps) => {
  const { switchTextDialog } = useCanvas();

  useCanvasSize({
    canvasRef,
    size,
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

  useText({
    canvasRef,
    enabled: enabledText,
    onClick: () => {
      switchTextDialog(true);
    },
  });

  useCanvasRenderer({ canvasRef });

  const cursor = getCursor({
    color,
    brushShape,
    brushSize,
    enabledEraser,
    enabledDrawing,
    enabledFill,
    enabledMove,
    enabledText,
  });

  const { cursorRef } = useCursor({
    canvasRef,
    enabled: !enabledColorPicker,
    color: cursor.color,
    size: cursor.size,
    shape: cursor.shape,
  });

  return (
    <div {...props} className={clsx(styles.canvas, className)}>
      <Canvas canvasRef={canvasRef} />
      <Cursor cursorRef={cursorRef} />
      <TextDialog size={size} color={color} />
    </div>
  );
};
