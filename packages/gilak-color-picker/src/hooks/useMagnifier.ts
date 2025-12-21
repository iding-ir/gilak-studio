import { getCanvasColor } from "@gilak/utils";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";

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
  const rafRef = useRef<number | null>(null);
  const { radiusCount, gridSize, setHoverColor } = useColorPicker();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas || !enabled) return;

    const onPointerEnter = () => {
      container.style.display = "block";
    };

    const onPointerLeave = () => {
      container.style.display = "none";
    };

    const onPointerDown = (event: PointerEvent) => {
      const { offsetX, offsetY } = event;
      const color = getCanvasColor({ canvas, x: offsetX, y: offsetY });

      if (color) {
        onSelect(color);
      }

      container.style.display = "none";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const x = event.offsetX;
        const y = event.offsetY;
        const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
        container.style.setProperty("transform", transform);

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
      });
    };

    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, radiusCount, gridSize, onSelect, setHoverColor, canvasRef]);

  return { containerRef, magnifierRef };
};
