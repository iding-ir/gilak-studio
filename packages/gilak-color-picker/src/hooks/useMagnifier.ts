import { getCanvasColor } from "@gilak/utils";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { renderMagnifierCanvas } from "../methods";
import { useColorPicker } from "./useColorPicker";

export const useMagnifier = ({
  onSelect,
  canvasRef,
}: {
  onSelect?: (color: string) => void;
  canvasRef?: RefObject<HTMLCanvasElement | null>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const magnifierRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const {
    magnifierRadius,
    gridSize,
    enabled,
    isHovered,
    setHoverColor,
    setEnabled,
  } = useColorPicker();

  useEffect(() => {
    const canvas = canvasRef?.current;

    if (!canvas || !enabled || !isHovered) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const { offsetX, offsetY } = event;
      const color = getCanvasColor({ canvas, x: offsetX, y: offsetY });

      if (color) {
        onSelect?.(color);
      }

      setEnabled(false);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const x = event.offsetX;
        const y = event.offsetY;

        const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
        const display = x && y ? "block" : "none";

        containerRef.current?.style.setProperty("transform", transform);
        containerRef.current?.style.setProperty("display", display);

        const color = getCanvasColor({ canvas, x, y });

        if (color) {
          setHoverColor(color);
        }

        renderMagnifierCanvas({
          canvas,
          magnifierCanvas: magnifierRef.current,
          x,
          y,
          magnifierRadius,
          gridSize,
        });
      });
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [
    canvasRef,
    enabled,
    isHovered,
    onSelect,
    magnifierRadius,
    setHoverColor,
    setEnabled,
    gridSize,
  ]);

  return { containerRef, magnifierRef };
};
