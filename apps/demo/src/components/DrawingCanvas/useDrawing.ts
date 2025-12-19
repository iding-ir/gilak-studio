import { type BrushShape, type BrushSize, drawBrush } from "@gilak/canvas";
import type { ColorSource, FederatedPointerEvent } from "pixi.js";
import type { Graphics as PixiGraphicsType } from "pixi.js";
import { useCallback, useRef, useState } from "react";

export type Point = { x: number; y: number };
export type Path = {
  points: Point[];
  brushSize: BrushSize;
  color: ColorSource;
  brushShape: BrushShape;
};

export function useDrawing({
  brushSize,
  brushShape,
  color,
  enabled,
}: {
  brushSize: BrushSize;
  brushShape: BrushShape;
  color: ColorSource;
  enabled: boolean;
}) {
  const [paths, setPaths] = useState<Path[]>([]);
  const [cursorPosition, setCursorPosition] = useState<Point | null>(null);
  const currentPathRef = useRef<Path | null>(null);

  const handlePointerDown = useCallback(
    (event: FederatedPointerEvent) => {
      if (!enabled) return;

      const { x, y } = event.global;
      const newPath: Path = {
        points: [{ x, y }],
        brushSize,
        color,
        brushShape,
      };
      currentPathRef.current = newPath;
      setPaths((prev) => [...prev, newPath]);
    },
    [enabled, brushSize, color, brushShape],
  );

  const handlePointerMove = useCallback(
    (event: FederatedPointerEvent) => {
      if (!enabled) return;

      const { x, y } = event.global;
      setCursorPosition({ x, y });

      if (currentPathRef.current) {
        currentPathRef.current.points.push({ x, y });

        // trigger re-render
        setPaths((prev) => [...prev]);
      }
    },
    [enabled],
  );

  const handlePointerUp = useCallback(() => {
    if (!enabled) return;
    currentPathRef.current = null;
  }, [enabled]);

  const drawShapes = useCallback(
    (g: PixiGraphicsType) => {
      g.clear();

      const ctx = g.context as unknown as CanvasRenderingContext2D;

      // Draw paths
      for (const path of paths) {
        const { points, brushSize, color, brushShape } = path;
        if (points.length < 2) continue;

        ctx.strokeStyle = color as string;
        ctx.lineWidth = brushSize;

        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];

          drawBrush({
            ctx,
            x: curr.x,
            y: curr.y,
            brushSize,
            brushShape,
            prevPoint: prev,
          });
        }
      }

      // Draw cursor shape
      if (cursorPosition) {
        const { x, y } = cursorPosition;
        drawBrush({
          ctx,
          x,
          y,
          brushSize,
          brushShape,
        });
      }
    },
    [paths, cursorPosition, brushSize, brushShape],
  );

  return {
    paths,
    drawShapes,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
