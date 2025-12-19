import type { BrushShape, BrushSize } from "../types/brush";

export type DrawBrushProps = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  brushSize: BrushSize;
  brushShape: BrushShape;
  prevPoint?: { x: number; y: number };
};

export const drawBrush = ({
  ctx,
  x,
  y,
  brushSize,
  brushShape,
  prevPoint,
}: DrawBrushProps) => {
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth = brushSize;

  if (prevPoint) {
    const dx = x - prevPoint.x;
    const dy = y - prevPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = brushSize / 2;
    const steps = Math.max(1, Math.floor(distance / step));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const interpolatedX = prevPoint.x + t * dx;
      const interpolatedY = prevPoint.y + t * dy;
      drawSingleBrush(ctx, interpolatedX, interpolatedY, brushSize, brushShape);
    }
  } else {
    drawSingleBrush(ctx, x, y, brushSize, brushShape);
  }

  ctx.restore();
};

const drawSingleBrush = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: BrushSize,
  brushShape: BrushShape,
) => {
  ctx.beginPath();
  const r = size * 2;
  switch (brushShape) {
    case "CIRCLE":
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      break;
    case "SQUARE":
      ctx.rect(x - r, y - r, r * 2, r * 2);
      break;
    case "DIAMOND":
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r, y);
      ctx.lineTo(x, y + r);
      ctx.lineTo(x - r, y);
      ctx.closePath();
      break;
    case "TRIANGLE":
      ctx.moveTo(x, y - r);
      ctx.lineTo(x + r, y + r);
      ctx.lineTo(x - r, y + r);
      ctx.closePath();
      break;
    case "STAR": {
      const spikes = 5;
      const step = Math.PI / spikes;
      for (let i = 0; i < 2 * spikes; i++) {
        const rad = i % 2 === 0 ? r : r / 2;
        const angle = i * step - Math.PI / 2;
        const sx = x + Math.cos(angle) * rad;
        const sy = y + Math.sin(angle) * rad;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      break;
    }
    case "HORIZONTAL":
      ctx.moveTo(x - r, y);
      ctx.lineTo(x + r, y);
      break;
    case "VERTICAL":
      ctx.moveTo(x, y - r);
      ctx.lineTo(x, y + r);
      break;
    case "BACKSLASH":
      ctx.moveTo(x - r, y - r);
      ctx.lineTo(x + r, y + r);
      break;
    case "SLASH":
      ctx.moveTo(x + r, y - r);
      ctx.lineTo(x - r, y + r);
      break;
    default:
      ctx.arc(x, y, r, 0, 2 * Math.PI);
  }
  ctx.stroke();
};
