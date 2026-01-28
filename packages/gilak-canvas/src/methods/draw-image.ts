import type { Position, Size } from "../types";
import { getEdgeFromCenter } from "./get-edge-from-center";

export type drawImageArgs = {
  ctx: CanvasRenderingContext2D;
  image: CanvasImageSource;
  position: Position;
  size: Size;
  offset?: Position;
};

export const drawImage = ({
  ctx,
  image,
  position,
  size,
  offset = { x: 0, y: 0 },
}: drawImageArgs) => {
  ctx.save();
  ctx.drawImage(
    image,
    getEdgeFromCenter(position.x, size.w, offset.x),
    getEdgeFromCenter(position.y, size.h, offset.y),
    size.w,
    size.h,
  );
  ctx.restore();
};
