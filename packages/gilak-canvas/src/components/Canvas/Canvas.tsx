import type { ComponentProps } from "react";
import { type ReactNode, type RefObject, useEffect } from "react";

import styles from "./Canvas.module.scss";

export type CanvasProps = {
  children?: ReactNode;
  canvasRef?: RefObject<HTMLCanvasElement | null>;
  width?: string | number;
  height?: string | number;
} & ComponentProps<"canvas">;

export const Canvas = ({
  children,
  canvasRef,
  width = "400px",
  height = "300px",
  ...props
}: CanvasProps) => {
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    // Create/obtain 2D context with willReadFrequently to optimize repeated
    // getImageData calls (useful for undo/redo snapshots).
    canvas.getContext("2d", { willReadFrequently: true });
  }, [canvasRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.root}
        width={width}
        height={height}
        {...props}
      />
      {children}
    </>
  );
};
