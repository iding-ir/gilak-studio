import { type RefObject, useState } from "react";

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
  const [content, setContent] = useState<CanvasContent | null>(null);
  const { updateContent } = useCanvas();

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const content = findContentAtPoint({ contents, point });
      setContent(content);
    },
    onUp: ({ point }) => {
      if (!content) return;

      updateContent({ ...content, position: point });
      onChange?.();
    },
  });
};
