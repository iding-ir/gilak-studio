import { type RefObject, useEffect } from "react";

import { renderCanvasElement } from "../methods/render-canvas-element";
import type { CanvasElement } from "../types/canvas";

type UseCanvasRendererArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  elements: CanvasElement[];
};

export const useCanvasRenderer = ({
  canvasRef,
  elements,
}: UseCanvasRendererArgs) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderCanvasElement({ ctx, elements });
  }, [elements, canvasRef]);
};
