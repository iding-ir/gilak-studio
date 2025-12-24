import type { CanvasHTMLAttributes, RefObject } from "react";

import styles from "./Cursor.module.scss";

export type CursorProps = CanvasHTMLAttributes<HTMLCanvasElement> & {
  cursorRef: RefObject<HTMLCanvasElement | null>;
  width?: number;
  height?: number;
};

export const Cursor = ({ cursorRef, width = 50, height = 50 }: CursorProps) => {
  return (
    <canvas
      ref={cursorRef}
      className={styles.cursor}
      width={width}
      height={height}
    />
  );
};
