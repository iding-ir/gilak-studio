import type { BrushShape, BrushSize } from "../types";
import type { Point, Position, Size } from "../types/canvas";
import { drawBrush } from "./draw-brush";
import { getCornerFromCenter } from "./get-corner-from-center";

export type DrawStrokesArgs = {
  ctx: CanvasRenderingContext2D;
  size: Size;
  position: Position;
  offset?: Position;
  points: Point[];
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
};

export const drawStroke = ({
  ctx,
  size,
  position,
  offset = { x: 0, y: 0 },
  points,
  color,
  brushSize,
  brushShape,
}: DrawStrokesArgs) => {
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

  ctx.restore();
};
