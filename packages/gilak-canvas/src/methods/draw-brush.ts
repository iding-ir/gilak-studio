import type { BrushShape, BrushSize, Point } from "../types";
import { drawShape } from "./draw-shape";

export type DrawBrushProps = {
  ctx: CanvasRenderingContext2D;
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
  point: Point;
  prevPoint?: Point | null;
};

export const drawBrush = ({
  ctx,
  color,
  brushSize,
  brushShape,
  point: { x, y },
  prevPoint,
}: DrawBrushProps) => {
  ctx.save();
  ctx.strokeStyle = color;
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
