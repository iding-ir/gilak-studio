import type { CanvasElement, Position } from "../types/canvas";
import { drawImage } from "./draw-image";
import { drawStrokes } from "./draw-strokes";

export type RenderCanvasElementArgs = {
  ctx: CanvasRenderingContext2D;
  elements: CanvasElement[];
  followPoint?: {
    id: CanvasElement["id"];
    position: Position;
    offset: Position;
  };
};

export const renderCanvasElement = ({
  ctx,
  elements,
  followPoint,
}: RenderCanvasElementArgs) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  elements.forEach(({ id, type, content, position, size, visible }) => {
    const pos = id === followPoint?.id ? followPoint.position : position;
    const off = id === followPoint?.id ? followPoint.offset : { x: 0, y: 0 };

    if (!visible) {
      return;
    }

    switch (type) {
      case "drawing":
        drawStrokes({
          ctx,
          strokes: content.strokes,
          position: pos,
          size,
          offset: off,
        });
        break;
      case "image":
        drawImage({
          ctx,
          image: content.image,
          position: pos,
          size,
          offset: off,
        });
        break;
      default:
        break;
    }
  });
};
