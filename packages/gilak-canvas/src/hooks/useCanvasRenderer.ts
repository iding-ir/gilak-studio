import { type RefObject, useEffect } from "react";

import { renderCanvasContent } from "../methods/render-canvas-content";
import type { CanvasContent } from "../types/canvas";

type UseCanvasRendererArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  contents: CanvasContent[];
};

export const useCanvasRenderer = ({
  canvasRef,
  contents,
}: UseCanvasRendererArgs) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderCanvasContent({ ctx, contents });
  }, [contents, canvasRef]);
};
