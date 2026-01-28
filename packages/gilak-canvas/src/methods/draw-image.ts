import type { Position, Size } from "../types";

export type drawImageArgs = {
  ctx: CanvasRenderingContext2D;
  image: CanvasImageSource;
  position: Position;
  size: Size;
};

export const drawImage = ({ ctx, image, position, size }: drawImageArgs) => {
  ctx.save();
  ctx.drawImage(
    image,
    position.x - size.w / 2,
    position.y - size.h / 2,
    size.w,
    size.h,
  );
  ctx.restore();
};
