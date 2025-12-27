import type { RefObject } from "react";
import { useEffect } from "react";

import { parseSize } from "../methods";
import { storeCtx } from "../methods/store-ctx";

export type UseCanvasSizeArgs = {
  canvasRef?: RefObject<HTMLCanvasElement | null>;
  width?: string | number;
  height?: string | number;
  onChange?: () => void;
};

export const useCanvasSize = ({
  canvasRef,
  width,
  height,
  onChange,
}: UseCanvasSizeArgs) => {
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const targetW = parseSize(width) ?? canvas.width;
    const targetH = parseSize(height) ?? canvas.height;

    if (canvas.width === targetW && canvas.height === targetH) return;

    const newCanvas = storeCtx({ canvas });
    setCanvasSize(canvas, targetW, targetH);

    const restoreCtx = canvas.getContext("2d", { willReadFrequently: true });
    if (restoreCtx) {
      restoreCtx.drawImage(newCanvas, 0, 0);
      onChange?.();
    }
  }, [canvasRef, width, height, onChange]);
};

function setCanvasSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  canvas.width = width;
  canvas.height = height;
}
