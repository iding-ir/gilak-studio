import type { RefObject } from "react";
import { useEffect } from "react";

import { parseSize } from "../methods/parse-size";
import { storeCtx } from "../methods/store-ctx";
import type { Size } from "../types";

export type UseCanvasSizeArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  size: Size;
};

export const useCanvasSize = ({
  canvasRef,
  size: { w: width, h: height },
}: UseCanvasSizeArgs) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetW = parseSize(width) ?? canvas.width;
    const targetH = parseSize(height) ?? canvas.height;

    if (canvas.width === targetW && canvas.height === targetH) return;

    const newCanvas = storeCtx({ canvas });
    setCanvasSize(canvas, targetW, targetH);

    const restoreCtx = canvas.getContext("2d", { willReadFrequently: true });
    if (restoreCtx) restoreCtx.drawImage(newCanvas, 0, 0);
  }, [canvasRef, width, height]);
};

function setCanvasSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  canvas.width = width;
  canvas.height = height;
}
