import type { DrawingStroke } from "../types/canvas";
import { drawBrush } from "./draw-brush";

export const drawStroke = (
  ctx: CanvasRenderingContext2D,
  stroke: DrawingStroke,
) => {
  const { points, color, brushSize, brushShape } = stroke;

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
      point: points[i],
      prevPoint: points[i - 1],
    });
  }

  ctx.restore();
};
