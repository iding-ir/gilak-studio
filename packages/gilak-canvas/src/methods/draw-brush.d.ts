import type { BrushSize, BrushType } from "../types/brush";

export type DrawBrushProps = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: BrushSize;
  brushType: BrushType;
};

export declare const drawBrush: ({
  ctx,
  x,
  y,
  size,
  brushType,
}: DrawBrushProps) => void;
