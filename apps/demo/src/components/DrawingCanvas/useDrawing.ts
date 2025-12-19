import type { BrushSize, BrushType } from "@gilak/canvas";
import type { ColorSource, FederatedPointerEvent } from "pixi.js";
import type { Graphics as PixiGraphicsType } from "pixi.js";
import { useCallback, useRef, useState } from "react";

export type Point = { x: number; y: number };
export type Path = {
  points: Point[];
  brushSize: BrushSize;
  color: ColorSource;
  brushType: BrushType;
};

export function useDrawing({
  brushSize,
  brushType,
  color,
  enabled,
}: {
  brushSize: BrushSize;
  brushType: BrushType;
  color: ColorSource;
  enabled: boolean;
}) {
  const [paths, setPaths] = useState<Path[]>([]);
  const currentPathRef = useRef<Path | null>(null);

  const handlePointerDown = useCallback(
    (event: FederatedPointerEvent) => {
      if (!enabled) return;

      const { x, y } = event.global;
      const newPath: Path = {
        points: [{ x, y }],
        brushSize,
        color,
        brushType,
      };
      currentPathRef.current = newPath;
      setPaths((prev) => [...prev, newPath]);
    },
    [enabled, brushSize, color, brushType],
  );

  const handlePointerMove = useCallback(
    (event: FederatedPointerEvent) => {
      if (!enabled || !currentPathRef.current) return;

      const { x, y } = event.global;
      currentPathRef.current.points.push({ x, y });

      // trigger re-render
      setPaths((prev) => [...prev]);
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

      for (const path of paths) {
        const { points, brushSize, color, brushType } = path;
        if (points.length < 2) continue;

        g.setStrokeStyle({
          width: brushSize,
          color,
          cap: brushType === "CIRCLE" ? "round" : "butt",
          join: "round",
        });

        g.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          g.lineTo(points[i].x, points[i].y);
        }
        g.stroke();
      }
    },
    [paths],
  );

  return {
    paths,
    drawShapes,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
