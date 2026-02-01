import { type RefObject } from "react";

import { useCanvasPointer } from "./useCanvasPointer";

export type UseTextArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  onClick: () => void;
};

export const useText = ({ canvasRef, enabled, onClick }: UseTextArgs) => {
  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: () => {
      onClick();
    },
  });
};
