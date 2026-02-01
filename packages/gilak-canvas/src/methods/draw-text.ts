import type { Position, Size } from "../types";
import { getEdgeFromCenter } from "./get-edge-from-center";

export type drawTextArgs = {
  ctx: CanvasRenderingContext2D;
  size: Size;
  position: Position;
  offset?: Position;
  color: string;
  text: string;
  fontSize: number;
  fontFamily: string;
};

export const drawText = ({
  ctx,
  size,
  position,
  offset = { x: 0, y: 0 },
  color,
  text,
  fontSize,
  fontFamily,
}: drawTextArgs) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    text,
    getEdgeFromCenter(position.x, size.w, offset.x),
    getEdgeFromCenter(position.y, size.h, offset.y),
  );
  ctx.restore();
};
