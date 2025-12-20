import type { CanvasHTMLAttributes, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

import { drawBrush } from "../../methods";
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
  const ref = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const onPointerEnter = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.style.display = "block";
  }, []);

  const onPointerLeave = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.style.display = "none";
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    const parent = parentRef.current;
    if (!enabled || !parent || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    const point = { x: width / 2, y: height / 2 };
    drawBrush({ ctx, color, brushSize, brushShape, point });
  }, [enabled, color, brushSize, brushShape, width, height]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const canvas = ref.current;
      const parent = parentRef.current;
      if (!enabled || !parent || !canvas) return;

      const rect = parent.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      canvas.style.setProperty("transform", transform);
    },
    [enabled],
  );

  return (
    <div
      ref={parentRef}
      className={styles.container}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
    >
      {children}
      <canvas
        ref={ref}
        className={styles.cursor}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};
