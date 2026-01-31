import { type RefObject } from "react";

import { selectFocusedElement } from "../context";
import { fillArea } from "../methods/fill-area";
import { useCanvas } from "./useCanvas";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseFillArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  tolerance: number;
};

export const useFill = ({
  canvasRef,
  enabled,
  color,
  tolerance,
}: UseFillArgs) => {
  const { state, changeDrawingColor, changeImageSource } = useCanvas();
  const element = selectFocusedElement(state);

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      if (!element) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (element.type === "image") {
        const { x, y } = point;
        const { width, height } = element.content.image;
        const canvas = new OffscreenCanvas(width, height);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(element.content.image, 0, 0);
        fillArea({ ctx, x, y, color, tolerance });
        const image = canvas.transferToImageBitmap();

        changeImageSource(element.id, image);
      }

      if (element.type === "drawing") {
        changeDrawingColor(element.id, color);
      }
    },
  });
};
