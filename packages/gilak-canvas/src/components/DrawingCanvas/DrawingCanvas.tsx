import { type RefObject } from "react";

import type { CanvasHistory } from "../../hooks";
import {
  useCanvasHistory,
  useCursor,
  useDrawing,
  useEraser,
  useFill,
} from "../../hooks";
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
  onHistoryChange?: (api: CanvasHistory) => void;
};

export function DrawingCanvas({
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
  onHistoryChange,
  ...props
}: DrawingCanvasProps) {
  const history = useCanvasHistory({ canvasRef });
  useDrawing({
    canvasRef,
    enabled: enabledDrawing,
    color,
    brushSize,
    brushShape,
    onChange: history.pushSnapshot,
  });
  useFill({
    canvasRef,
    enabled: enabledFill,
    color: backgroundColor,
    tolerance,
    onChange: history.pushSnapshot,
  });
  useEraser({
    canvasRef,
    enabled: enabledEraser,
    brushSize,
    brushShape,
    onChange: history.pushSnapshot,
  });
  const { cursorRef } = useCursor({
    canvasRef,
    enabled: enabledDrawing || enabledEraser,
    color,
    brushSize,
    brushShape,
  });

  if (onHistoryChange) {
    onHistoryChange(history);
  }

  return (
    <div className={styles.canvas}>
      <Canvas canvasRef={canvasRef} {...props} width={width} height={height} />
      <Cursor cursorRef={cursorRef} />
    </div>
  );
}

export default DrawingCanvas;
