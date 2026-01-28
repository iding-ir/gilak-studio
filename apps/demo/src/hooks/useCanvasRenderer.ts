import { type RefObject, useEffect } from "react";

import type { ImageContent } from "../types";

type UseCanvasRendererArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  content?: ImageContent;
};

export const useCanvasRenderer = ({
  canvasRef,
  content,
}: UseCanvasRendererArgs) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!content) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { item, position, size } = content;

    ctx.drawImage(
      item,
      position.x - size.w / 2,
      position.y - size.h / 2,
      size.w,
      size.h,
    );
  }, [content, canvasRef]);
};
