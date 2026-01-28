import type { DrawingStroke, Position, Size } from "../types/canvas";
import { drawBrush } from "./draw-brush";
import { getCornerFromCenter } from "./get-corner-from-center";

export type DrawStrokesArgs = {
  ctx: CanvasRenderingContext2D;
  strokes: DrawingStroke[];
  position: Position;
  size: Size;
  offset?: Position;
};

export const drawStrokes = ({
  ctx,
  strokes,
  position,
  size,
  offset = { x: 0, y: 0 },
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
        point: getCornerFromCenter(position, size, offset, [points[i]]),
        prevPoint:
          points[i - 1] &&
          getCornerFromCenter(position, size, offset, [points[i - 1]]),
      });
    }
  });

  ctx.restore();
};
