import type { Position, Size } from "../types";
import { getEdgeFromCenter } from "./get-edge-from-center";

export type drawImageArgs = {
  ctx: CanvasRenderingContext2D;
  size: Size;
  position: Position;
  offset?: Position;
  image: CanvasImageSource;
  ratio: number;
};

export const drawImage = ({
  ctx,
  size,
  position,
  offset = { x: 0, y: 0 },
  image,
  ratio,
}: drawImageArgs) => {
  const width = size.w * ratio;
  const height = size.h * ratio;
  const x = getEdgeFromCenter(position.x, width, offset.x);
  const y = getEdgeFromCenter(position.y, height, offset.y);

  ctx.save();
  ctx.drawImage(image, x, y, width, height);
  ctx.restore();
};
