import { type RefObject, useEffect } from "react";

import { drawBrush } from "../methods/draw-brush";
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

    contents.forEach(({ type, item, position, size }) => {
      switch (type) {
        case "drawing":
          item.strokes.forEach(({ points, color, brushSize, brushShape }) => {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = brushSize;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            for (let i = 0; i < points.length; i++) {
              drawBrush({
                ctx,
                color,
                brushSize,
                brushShape,
                point: {
                  x: points[i].x + position.x - size.w / 2,
                  y: points[i].y + position.y - size.h / 2,
                },
                prevPoint: {
                  x: points[i - 1]?.x + position.x - size.w / 2,
                  y: points[i - 1]?.y + position.y - size.h / 2,
                },
              });
            }

            ctx.restore();
          });
          break;
        case "image":
          ctx.save();
          ctx.drawImage(
            item,
            position.x - size.w / 2,
            position.y - size.h / 2,
            size.w,
            size.h,
          );
          ctx.restore();
          break;
        default:
          break;
      }
    });
  }, [contents, canvasRef]);
};
