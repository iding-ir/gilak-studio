import type { BrushShape, BrushSize } from "@gilak/canvas";
import { Application, extend } from "@pixi/react";
import clsx from "clsx";
import { type ColorSource, Graphics, Rectangle } from "pixi.js";

import styles from "./DrawingCanvas.module.scss";
import { useDrawing } from "./useDrawing";

extend({ Graphics });

export type DrawingCanvasProps = {
  brushSize?: BrushSize;
  brushShape?: BrushShape;
  enabled?: boolean;
  width?: number;
  height?: number;
  color?: ColorSource;
  backgroundColor?: ColorSource;
};

export const DrawingCanvas = ({
  brushSize = 4,
  brushShape = "CIRCLE",
  enabled = true,
  width = 600,
  height = 400,
  color = "#000000",
  backgroundColor = "#ffffff",
}: DrawingCanvasProps) => {
  const { drawShapes, handlePointerDown, handlePointerMove, handlePointerUp } =
    useDrawing({ brushSize, brushShape, color, enabled });

  return (
    <Application
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      className={clsx(styles.root, { [styles.enabled]: enabled })}
    >
      <pixiGraphics
        draw={drawShapes}
        eventMode="static"
        hitArea={new Rectangle(0, 0, width, height)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerUpOutside={handlePointerUp}
      />
    </Application>
  );
};
