import type { BrushShape, BrushSize, CursorShape } from "../types";

export const drawShape = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: BrushSize,
  brushShape: BrushShape | CursorShape,
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
    case "CROSS":
      ctx.moveTo(x - r, y - r);
      ctx.lineTo(x + r, y + r);
      ctx.moveTo(x + r, y - r);
      ctx.lineTo(x - r, y + r);
      break;
    case "PLUS":
      ctx.moveTo(x - r, y);
      ctx.lineTo(x + r, y);
      ctx.moveTo(x, y - r);
      ctx.lineTo(x, y + r);
      break;
    case "DOT":
      ctx.arc(x, y, r / 4, 0, 2 * Math.PI);
      break;
    case "TEXT":
      ctx.moveTo(x - r, y - r);
      ctx.lineTo(x + r, y - r);
      ctx.moveTo(x, y - r);
      ctx.lineTo(x, y + r);
      ctx.closePath();
      break;
    default:
      ctx.arc(x, y, r, 0, 2 * Math.PI);
  }
  ctx.stroke();
};
