import type { CanvasContent, Position } from "../types/canvas";
import { drawImage } from "./draw-image";
import { drawStrokes } from "./draw-strokes";

export type RenderCanvasContentArgs = {
  ctx: CanvasRenderingContext2D;
  contents: CanvasContent[];
  followPoint?: {
    id: CanvasContent["id"];
    position: Position;
    offset: Position;
  };
};

export const renderCanvasContent = ({
  ctx,
  contents,
  followPoint,
}: RenderCanvasContentArgs) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  contents.forEach(({ id, type, item, position, size }) => {
    const pos = id === followPoint?.id ? followPoint.position : position;
    const off = id === followPoint?.id ? followPoint.offset : { x: 0, y: 0 };

    switch (type) {
      case "drawing":
        drawStrokes({
          ctx,
          strokes: item.strokes,
          position: pos,
          size,
          offset: off,
        });
        break;
      case "image":
        drawImage({ ctx, image: item.image, position: pos, size, offset: off });
        break;
      default:
        break;
    }
  });
};
