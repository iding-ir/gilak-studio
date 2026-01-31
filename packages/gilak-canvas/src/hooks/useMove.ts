import { type RefObject, useRef } from "react";

import { findElementAtPoint } from "../methods/find-element-at-point";
import { getOffsetPoint } from "../methods/get-offset-point";
import { renderCanvasElement } from "../methods/render-canvas-element";
import type { CanvasElement } from "../types/canvas";
import { useCanvas } from "./useCanvas";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseMoveArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  elements?: CanvasElement[];
};

export const useMove = ({ canvasRef, enabled, elements = [] }: UseMoveArgs) => {
  const hasMoved = useRef<boolean>(false);
  const foundRef = useRef<ReturnType<typeof findElementAtPoint>>(null);
  const { updateElement } = useCanvas();

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      foundRef.current = findElementAtPoint({ elements, point });
    },
    onDrag: ({ point }) => {
      if (!foundRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      hasMoved.current = true;

      renderCanvasElement({
        ctx,
        elements,
        followPoint: {
          id: foundRef.current.element.id,
          position: point,
          offset: foundRef.current.offset,
        },
      });
    },
    onUp: ({ point }) => {
      if (!foundRef.current) return;
      if (!hasMoved.current) return;

      hasMoved.current = false;

      updateElement({
        ...foundRef.current.element,
        position: getOffsetPoint(point, foundRef.current.offset),
      });
    },
  });
};
