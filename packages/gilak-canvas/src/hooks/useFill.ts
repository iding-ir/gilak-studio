import { blobToDataUrl } from "@gilak/utils";
import { type RefObject } from "react";

import { selectFocusedElement } from "../context";
import { fillArea } from "../methods/fill-area";
import { getEdgeFromCenter } from "../methods/get-edge-from-center";
import { useCanvas } from "./useCanvas";
import { useCanvasPointer } from "./useCanvasPointer";

const IMAGE_RENDER_RATIO = 0.5;

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
  const { state, changeDrawingColor, changeImageSource, updateTextSettings } =
    useCanvas();
  const element = selectFocusedElement(state);

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: async ({ point }) => {
      if (!element) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (element.type === "image") {
        const { x, y } = point;
        const sourceBlob = await fetch(element.content.src).then((r) =>
          r.blob(),
        );
        const sourceImage = await createImageBitmap(sourceBlob);
        const { width, height } = sourceImage;
        const offscreenCanvas = new OffscreenCanvas(width, height);
        const offscreenCtx = offscreenCanvas.getContext("2d");

        if (!offscreenCtx) {
          sourceImage.close();
          return;
        }

        const renderedWidth =
          element.size.w * element.content.ratio * IMAGE_RENDER_RATIO;
        const renderedHeight =
          element.size.h * element.content.ratio * IMAGE_RENDER_RATIO;

        if (renderedWidth <= 0 || renderedHeight <= 0) {
          sourceImage.close();
          return;
        }

        const left = getEdgeFromCenter(element.position.x, renderedWidth);
        const top = getEdgeFromCenter(element.position.y, renderedHeight);

        const imageX = Math.floor(((x - left) / renderedWidth) * width);
        const imageY = Math.floor(((y - top) / renderedHeight) * height);

        if (imageX < 0 || imageX >= width || imageY < 0 || imageY >= height) {
          sourceImage.close();
          return;
        }

        offscreenCtx.drawImage(sourceImage, 0, 0);
        sourceImage.close();
        fillArea({
          ctx: offscreenCtx,
          x: imageX,
          y: imageY,
          color,
          tolerance,
        });

        const blob = await offscreenCanvas.convertToBlob();
        const src = await blobToDataUrl(blob);

        changeImageSource(element.id, src);
      }

      if (element.type === "drawing") {
        changeDrawingColor(element.id, color);
      }

      if (element.type === "text") {
        updateTextSettings(element.id, { ...element.content, color });
      }
    },
  });
};
