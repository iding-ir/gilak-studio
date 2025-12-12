import React, { forwardRef, useRef } from "react";

import styles from "../components/Canvas.module.scss";
import { usePaint } from "../hooks/usePaint";
import type { BrushSize, BrushType } from "../types/brush";

export interface PaintCanvasProps {
  enabled: boolean;
  width?: number;
  height?: number;
  color?: string;
  brushSize?: BrushSize;
  brushType?: BrushType;
}

const PaintCanvas = forwardRef<HTMLCanvasElement, PaintCanvasProps>(
  (
    {
      enabled,
      width = 800,
      height = 600,
      color = "#222",
      brushSize = 2,
      brushType = "CIRCLE",
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = (ref ??
      internalRef) as React.RefObject<HTMLCanvasElement>;
    usePaint({ canvasRef, enabled, color, brushSize, brushType });

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
        style={{ cursor: enabled ? "none" : "default" }}
      />
    );
  },
);

export default PaintCanvas;
