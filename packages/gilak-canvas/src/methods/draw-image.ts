import { dataUrlToImage } from "@gilak/utils";

import type { Position, Size } from "../types";
import { getEdgeFromCenter } from "./get-edge-from-center";

export type drawImageArgs = {
  ctx: CanvasRenderingContext2D;
  size: Size;
  position: Position;
  offset?: Position;
  src: string;
  ratio: number;
};

export const drawImage = ({
  ctx,
  size,
  position,
  offset = { x: 0, y: 0 },
  src,
  ratio,
}: drawImageArgs) => {
  const { image, isReady } = dataUrlToImage(src);

  if (!image || !isReady) {
    return;
  }

  const width = size.w * ratio;
  const height = size.h * ratio;
  const x = getEdgeFromCenter(position.x, width, offset.x);
  const y = getEdgeFromCenter(position.y, height, offset.y);

  ctx.save();
  ctx.drawImage(image, x, y, width, height);
  ctx.restore();
};
