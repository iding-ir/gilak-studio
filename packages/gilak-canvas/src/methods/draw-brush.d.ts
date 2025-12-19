import type { BrushShape, BrushSize } from "../types/brush";

export type DrawBrushProps = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: BrushSize;
  brushShape: BrushShape;
};

export declare const drawBrush: ({
  ctx,
  x,
  y,
  size,
  brushShape,
}: DrawBrushProps) => void;
