import { type RefObject, useEffect } from "react";

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

    contents.forEach(({ item, position, size }) => {
      ctx.drawImage(
        item,
        position.x - size.w / 2,
        position.y - size.h / 2,
        size.w,
        size.h,
      );
    });
  }, [contents, canvasRef]);
};
