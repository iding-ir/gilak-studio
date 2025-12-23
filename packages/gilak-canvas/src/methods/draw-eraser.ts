import type { BrushShape, BrushSize } from "../types";
import type { Point } from "../types";
import { drawShape } from "./draw-shape";

export type DrawEraserProps = {
  ctx: CanvasRenderingContext2D;
  brushSize: BrushSize;
  brushShape: BrushShape;
  point: Point;
  prevPoint?: Point | null;
};

export const drawEraser = ({
  ctx,
  brushSize,
  brushShape,
  point: { x, y },
  prevPoint,
}: DrawEraserProps) => {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (prevPoint) {
    const dx = x - prevPoint.x;
    const dy = y - prevPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = Math.max(1, Math.floor(brushSize / 2));
    const steps = Math.max(1, Math.floor(distance / step));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const interpolatedX = prevPoint.x + t * dx;
      const interpolatedY = prevPoint.y + t * dy;
      drawShape(ctx, interpolatedX, interpolatedY, brushSize, brushShape);
    }
  } else {
    drawShape(ctx, x, y, brushSize, brushShape);
  }

  ctx.restore();
};
