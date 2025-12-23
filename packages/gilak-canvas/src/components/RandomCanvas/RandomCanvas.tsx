import { drawRandomEffect } from "@gilak/canvas/methods";
import type { RefObject } from "react";
import { useEffect } from "react";

import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";

export type RandomCanvasProps = CanvasProps & {
  canvasRef?: RefObject<HTMLCanvasElement | null>;
  refresh?: number;
};

export const RandomCanvas = ({
  refresh,
  canvasRef,
  ...props
}: RandomCanvasProps) => {
  useEffect(() => {
    if (canvasRef?.current) {
      drawRandomEffect(canvasRef.current);
    }
  }, [refresh, canvasRef]);

  return <Canvas canvasRef={canvasRef} {...props} />;
};
