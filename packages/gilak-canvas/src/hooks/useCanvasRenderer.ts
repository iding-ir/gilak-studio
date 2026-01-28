import { type RefObject, useEffect } from "react";

import { drawStroke } from "../methods/draw-stroke";
import type { CanvasContent } from "../types/canvas";

type UseCanvasRendererArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  contents?: CanvasContent[];
};

export const useCanvasRenderer = ({
  canvasRef,
  contents,
}: UseCanvasRendererArgs) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!contents) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    contents.forEach((content) => {
      switch (content.type) {
        case "drawing":
          content.item.strokes.forEach((stroke) => {
            drawStroke(ctx, stroke);
          });
          break;
        case "image":
          ctx.drawImage(
            content.item,
            content.position.x - content.size.w / 2,
            content.position.y - content.size.h / 2,
            content.size.w,
            content.size.h,
          );
          break;
        default:
          break;
      }
    });
  }, [contents, canvasRef]);
};
