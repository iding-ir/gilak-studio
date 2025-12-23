import { type RefObject } from "react";

import { type BrushShape, type BrushSize } from "../../types";
import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";
import { DrawingTool } from "../DrawingTool";
import { EraserTool } from "../EraserTool";
import { FillTool } from "../FillTool";
import styles from "./DrawingCanvas.module.scss";

export type DrawingCanvasProps = CanvasProps & {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabledDrawing: boolean;
  enabledFill: boolean;
  enabledEraser: boolean;
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
  enabledEraser,
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
    <div className={styles.canvas}>
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
          <EraserTool
            canvasRef={canvasRef}
            enabled={enabledEraser}
            brushSize={brushSize}
            brushShape={brushShape}
          >
            <Canvas
              canvasRef={canvasRef}
              {...props}
              width={width}
              height={height}
            />
          </EraserTool>
        </FillTool>
      </DrawingTool>
    </div>
  );
};
