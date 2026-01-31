import { type RefObject, useRef } from "react";

import { selectElements, selectFocusedElement } from "../context";
import { getElementDataAtPoint } from "../methods/get-element-data-at-point";
import { getOffsetPoint } from "../methods/get-offset-point";
import { renderCanvasElement } from "../methods/render-canvas-element";
import { useCanvas } from "./useCanvas";
import { useCanvasPointer } from "./useCanvasPointer";

export type UseMoveArgs = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
};

export const useMove = ({ canvasRef, enabled }: UseMoveArgs) => {
  const hasMoved = useRef<boolean>(false);
  const elementDataRef = useRef<ReturnType<typeof getElementDataAtPoint>>(null);
  const { state, updateElement } = useCanvas();
  const elements = selectElements(state);
  const element = selectFocusedElement(state);

  useCanvasPointer({
    canvasRef,
    enabled,
    onDown: ({ point }) => {
      if (!element) return;

      elementDataRef.current = getElementDataAtPoint({ element, point });
    },
    onDrag: ({ point }) => {
      if (!element) return;
      const elementData = elementDataRef.current;
      if (!elementData) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      hasMoved.current = true;

      renderCanvasElement({
        ctx,
        elements,
        followPoint: {
          id: element.id,
          position: point,
          offset: elementData.offset,
        },
      });
    },
    onUp: ({ point }) => {
      if (!element) return;
      if (!elementDataRef.current) return;
      if (!hasMoved.current) return;

      hasMoved.current = false;

      updateElement({
        ...element,
        position: getOffsetPoint(point, elementDataRef.current.offset),
      });
    },
  });
};
