import { type RefObject, useRef } from "react";

import { findContentAtPoint } from "../methods/find-content-at-point";
import type { CanvasContent } from "../types/canvas";
import { useCanvas } from "./useCanvas";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseMoveArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  contents?: CanvasContent[];
  onChange?: () => void;
};

export const useMove = ({
  canvasRef,
  enabled,
  contents = [],
  onChange,
}: UseMoveArgs) => {
  const hasMoved = useRef<boolean>(false);
  const content = useRef<CanvasContent | null>(null);
  const { updateContent } = useCanvas();

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      content.current = findContentAtPoint({ contents, point });
    },
    onDrag: () => {
      if (!content.current) return;
      hasMoved.current = true;
    },
    onUp: ({ point }) => {
      if (!content.current) return;
      if (!hasMoved.current) return;

      hasMoved.current = false;

      updateContent({ ...content.current, position: point });
      onChange?.();
    },
  });
};
