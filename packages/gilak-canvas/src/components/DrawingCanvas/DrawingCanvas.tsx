import { selectCurrentContents } from "@gilak/canvas/context";
import clsx from "clsx";
import { type RefObject } from "react";

import {
  useCanvasSize,
  useCursor,
  useDrawing,
  useEraser,
  useFill,
} from "../../hooks";
import { useCanvas } from "../../hooks/useCanvas";
import { useCanvasRenderer } from "../../hooks/useCanvasRenderer";
import { useMove } from "../../hooks/useMove";
import { createContentFromDrawing } from "../../methods/create-content-from-drawing";
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
  const { state, addContent } = useCanvas();

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
    onStrokeComplete: (stroke) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const documentSize = { w: canvas.width, h: canvas.height };
      const content = createContentFromDrawing({ stroke, documentSize });

      addContent(content);
    },
  });
  useFill({
    canvasRef,
    enabled: enabledFill,
    color: backgroundColor,
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
    contents: selectCurrentContents(state),
  });
  useCanvasRenderer({ canvasRef, contents: selectCurrentContents(state) });

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
