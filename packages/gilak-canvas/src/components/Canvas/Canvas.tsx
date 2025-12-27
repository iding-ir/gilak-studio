import type { ComponentProps } from "react";
import { type ReactNode, type RefObject } from "react";

import { useCanvasSize } from "../../hooks";
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
  useCanvasSize({ canvasRef, width, height });

  return (
    <>
      <canvas ref={canvasRef} className={styles.root} {...props} />
      {children}
    </>
  );
};
