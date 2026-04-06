import { subscribeToImageLoad } from "@gilak/utils";
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

    const render = () => {
      renderCanvasElement({ ctx, elements });
    };

    render();

    const cleanupFns = elements.flatMap((element) => {
      if (element.type !== "image") {
        return [];
      }

      return [subscribeToImageLoad(element.content.src, render)];
    });

    return () => {
      cleanupFns.forEach((cleanup) => {
        cleanup();
      });
    };
  }, [elements, canvasRef]);
};
