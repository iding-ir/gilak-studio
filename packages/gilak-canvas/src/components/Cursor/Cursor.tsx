import type { CanvasHTMLAttributes, ReactNode } from "react";

import { useCursor } from "../../hooks/useCursor";
import type { BrushShape, BrushSize } from "../../types";
import styles from "./Cursor.module.scss";

export type CursorProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
  children: ReactNode;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  width?: number;
  height?: number;
};

export const Cursor = ({
  children,
  enabled,
  color,
  brushSize,
  brushShape,
  width = 50,
  height = 50,
  ...props
}: CursorProps) => {
  const { containerRef, canvasRef } = useCursor({
    enabled,
    color,
    brushSize,
    brushShape,
    width,
    height,
  });

  return (
    <div ref={containerRef} className={styles.container}>
      {children}
      <canvas
        ref={canvasRef}
        className={styles.cursor}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};
