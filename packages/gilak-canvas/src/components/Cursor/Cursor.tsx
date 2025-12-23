import type { CanvasHTMLAttributes, ReactNode, RefObject } from "react";

import { useCursor } from "../../hooks/useCursor";
import type { BrushShape, BrushSize } from "../../types";
import styles from "./Cursor.module.scss";

export type CursorProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  children: ReactNode;
  enabled: boolean;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  width?: number;
  height?: number;
};

export const Cursor = ({
  canvasRef,
  children,
  enabled,
  color,
  brushSize,
  brushShape,
  width = 50,
  height = 50,
  ...props
}: CursorProps) => {
  const { cursorRef } = useCursor({
    canvasRef,
    enabled,
    color,
    brushSize,
    brushShape,
    width,
    height,
  });

  return (
    <>
      {children}
      <canvas
        ref={cursorRef}
        className={styles.cursor}
        width={width}
        height={height}
        {...props}
      />
    </>
  );
};
