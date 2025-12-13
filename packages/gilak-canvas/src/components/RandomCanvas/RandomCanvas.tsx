import { drawRandomEffect } from "@gilak/canvas/methods";
import type { RefObject } from "react";
import { useEffect } from "react";

import type { CanvasProps } from "../Canvas";
import { Canvas } from "../Canvas";

export type RandomCanvasProps = CanvasProps & {
  ref?: RefObject<HTMLCanvasElement | null>;
  refresh?: number;
};

export const RandomCanvas: React.FC<RandomCanvasProps> = ({
  refresh,
  ref,
  ...props
}) => {
  useEffect(() => {
    if (ref?.current) {
      drawRandomEffect(ref.current);
    }
  }, [refresh, ref]);

  return <Canvas ref={ref} {...props} />;
};
