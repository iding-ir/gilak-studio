import { type RefObject, useEffect } from "react";

import { drawRandomEffect } from "../methods";

export const useCanvasEffect = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawRandomEffect(canvas);
  }, [canvasRef]);
};
