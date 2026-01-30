import { type RefObject } from "react";

import { fillArea } from "../methods/fill-area";
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
  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point: { x, y } }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      fillArea({ ctx, x, y, color, tolerance });
    },
  });
};
