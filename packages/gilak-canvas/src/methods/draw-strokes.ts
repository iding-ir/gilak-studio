import type { DrawingStroke, Position, Size } from "../types/canvas";
import { drawBrush } from "./draw-brush";

export type DrawStrokesArgs = {
  ctx: CanvasRenderingContext2D;
  strokes: DrawingStroke[];
  position: Position;
  size: Size;
};

export const drawStrokes = ({
  ctx,
  strokes,
  position,
  size,
}: DrawStrokesArgs) => {
  strokes.forEach(({ points, color, brushSize, brushShape }) => {
    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 0; i < points.length; i++) {
      drawBrush({
        ctx,
        color,
        brushSize,
        brushShape,
        point: {
          x: points[i].x + position.x - size.w / 2,
          y: points[i].y + position.y - size.h / 2,
        },
        prevPoint: {
          x: points[i - 1]?.x + position.x - size.w / 2,
          y: points[i - 1]?.y + position.y - size.h / 2,
        },
      });
    }
  });

  ctx.restore();
};
