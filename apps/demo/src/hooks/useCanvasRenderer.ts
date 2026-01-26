import type { CanvasLayer } from "@gilak/canvas";
import { type RefObject, useEffect } from "react";

type UseCanvasRendererArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  layers: CanvasLayer[];
};

export const useCanvasRenderer = ({
  canvasRef,
  layers,
}: UseCanvasRendererArgs) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const layer of [...layers].reverse()) {
      if (!layer.visible) continue;

      for (const { item, position, size } of layer.content) {
        if (!item) continue;

        ctx.drawImage(
          item,
          position.x - size.w / 2,
          position.y - size.h / 2,
          size.w,
          size.h,
        );
      }
    }
  }, [canvasRef, layers]);
};
