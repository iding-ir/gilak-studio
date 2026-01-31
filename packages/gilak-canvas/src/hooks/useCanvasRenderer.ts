import { type RefObject, useEffect } from "react";

import { selectElements } from "../context";
import { renderCanvasElement } from "../methods/render-canvas-element";
import { useCanvas } from "./useCanvas";

export type UseCanvasRendererArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export const useCanvasRenderer = ({ canvasRef }: UseCanvasRendererArgs) => {
  const { state } = useCanvas();
  const elements = selectElements(state);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderCanvasElement({ ctx, elements });
  }, [elements, canvasRef]);
};
