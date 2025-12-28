import type { ComponentProps } from "react";
import { type ReactNode, type RefObject } from "react";

import styles from "./Canvas.module.scss";

export type CanvasProps = {
  children?: ReactNode;
  canvasRef?: RefObject<HTMLCanvasElement | null>;
} & ComponentProps<"canvas">;

export const Canvas = ({ children, canvasRef, ...props }: CanvasProps) => {
  return (
    <>
      <canvas ref={canvasRef} className={styles.root} {...props} />
      {children}
    </>
  );
};
