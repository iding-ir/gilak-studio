import type { ColorSource, FederatedPointerEvent } from "pixi.js";
import type { Graphics as PixiGraphicsType } from "pixi.js";
import { useCallback, useRef, useState } from "react";

export type Point = { x: number; y: number };
export type Path = Point[];

export function useDrawing({
  brushSize,
  brushType,
  color,
  enabled,
}: {
  brushSize: number;
  brushType: string;
  color: ColorSource;
  enabled: boolean;
}) {
  const [paths, setPaths] = useState<Path[]>([]);
  const currentPathRef = useRef<Path | null>(null);

  const handlePointerDown = useCallback(
    (event: FederatedPointerEvent) => {
      if (!enabled) return;

      const { x, y } = event.global;
      const newPath: Path = [{ x, y }];
      currentPathRef.current = newPath;
      setPaths((prev) => [...prev, newPath]);
    },
    [enabled],
  );

  const handlePointerMove = useCallback(
    (event: FederatedPointerEvent) => {
      if (!enabled || !currentPathRef.current) return;

      const { x, y } = event.global;
      currentPathRef.current.push({ x, y });

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

      g.setStrokeStyle({
        width: brushSize,
        color,
        cap: brushType === "CIRCLE" ? "round" : "butt",
        join: "round",
      });

      for (const path of paths) {
        if (path.length < 2) continue;
        g.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          g.lineTo(path[i].x, path[i].y);
        }
        g.stroke();
      }
    },
    [paths, brushSize, color, brushType],
  );

  return {
    paths,
    drawShapes,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
