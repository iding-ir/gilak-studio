import { useCanvasPointer } from "@gilak/canvas/hooks";
import { getCanvasColor } from "@gilak/utils";
import type { RefObject } from "react";
import { useRef } from "react";

import { renderMagnifierCanvas } from "../methods";
import { useColorPicker } from "./useColorPicker";

export const useMagnifier = ({
  canvasRef,
  enabled,
  onSelect,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  onSelect: (color: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const magnifierRef = useRef<HTMLCanvasElement>(null);
  const { radiusCount, gridSize, setHoverColor } = useColorPicker();

  useCanvasPointer({
    canvasRef,
    enabled,
    onLeave: () => {
      const container = containerRef.current;
      if (!container) return;

      container.style.setProperty("display", "none");
    },
    onDown: ({ point: { x, y }, canvas }) => {
      const color = getCanvasColor({ canvas, x, y });
      if (color) onSelect(color);
    },
    onMove: ({ point: { x, y }, canvas }) => {
      const container = containerRef.current;
      if (!container || !canvas) return;

      container.style.setProperty("display", "block");
      container.style.setProperty(
        "transform",
        `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`,
      );

      const color = getCanvasColor({ canvas, x, y });
      if (color) setHoverColor(color);

      renderMagnifierCanvas({
        canvas,
        magnifierCanvas: magnifierRef.current,
        x,
        y,
        radiusCount,
        gridSize,
      });
    },
  });

  return { containerRef, magnifierRef };
};
