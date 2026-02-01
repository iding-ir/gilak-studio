import type { CanvasElement, Position } from "../types/canvas";
import { drawImage } from "./draw-image";
import { drawStroke } from "./draw-stroke";
import { drawText } from "./draw-text";

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
      case "drawing": {
        const { points, color, brushSize, brushShape } = content;

        drawStroke({
          ctx,
          size,
          position: pos,
          offset: off,
          points,
          color,
          brushSize,
          brushShape,
        });
        break;
      }
      case "image": {
        const { image, ratio } = content;
        const RATIO = 0.5;

        drawImage({
          ctx,
          size,
          position: pos,
          offset: off,
          image,
          ratio: ratio * RATIO,
        });
        break;
      }
      case "text": {
        const { text, color, fontSize, fontFamily } = content;

        drawText({
          ctx,
          size,
          position: pos,
          offset: off,
          color,
          text,
          fontSize,
          fontFamily,
        });
        break;
      }
      default: {
        break;
      }
    }
  });
};
