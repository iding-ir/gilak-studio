import { type RefObject } from "react";

import { fillArea } from "../methods/fill-area";
import { findElementAtPoint } from "../methods/find-element-at-point";
import type { CanvasElement } from "../types/canvas";
import { useCanvas } from "./useCanvas";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseFillArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  tolerance: number;
  elements?: CanvasElement[];
};

export const useFill = ({
  canvasRef,
  enabled,
  color,
  tolerance,
  elements = [],
}: UseFillArgs) => {
  const { changeDrawingColor, changeImageSource } = useCanvas();

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: async ({ point }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const found = findElementAtPoint({ elements, point });
      if (!found) return;

      if (found.element.type === "image") {
        const { x, y } = point;
        const { width, height } = found.element.content.image;
        const canvas = new OffscreenCanvas(width, height);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(found.element.content.image, 0, 0);
        fillArea({ ctx, x, y, color, tolerance });
        const image = canvas.transferToImageBitmap();

        changeImageSource(found.element.id, image);
      }

      if (found.element.type === "drawing") {
        changeDrawingColor(found.element.id, color);
      }
    },
  });
};
