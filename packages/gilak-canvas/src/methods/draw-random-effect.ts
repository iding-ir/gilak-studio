import {
  drawCheckerboard,
  drawCircles,
  drawGradient,
  drawQuadrants,
  drawWaves,
} from "@gilak/utils";

export type EffectType =
  | "quadrants"
  | "gradient"
  | "circles"
  | "waves"
  | "checkerboard";

const effects: Record<
  EffectType,
  (ctx: CanvasRenderingContext2D, w: number, h: number) => void
> = {
  quadrants: drawQuadrants,
  gradient: drawGradient,
  circles: drawCircles,
  waves: drawWaves,
  checkerboard: drawCheckerboard,
};

export const drawRandomEffect = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const effectTypes: EffectType[] = [
    "quadrants",
    "gradient",
    "circles",
    "waves",
    "checkerboard",
  ];
  const randomEffect =
    effectTypes[Math.floor(Math.random() * effectTypes.length)];

  effects[randomEffect](ctx, w, h);
};
