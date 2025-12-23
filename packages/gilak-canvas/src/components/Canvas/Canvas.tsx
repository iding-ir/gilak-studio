import type { ReactNode, RefObject } from "react";

import styles from "./Canvas.module.scss";

export type CanvasProps = {
  children?: ReactNode;
  canvasRef?: RefObject<HTMLCanvasElement | null>;
  width?: string | number;
  height?: string | number;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

export const Canvas = ({
  children,
  canvasRef,
  width = "400px",
  height = "300px",
  ...props
}: CanvasProps) => {
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
