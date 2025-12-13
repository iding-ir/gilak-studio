import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { drawBrush } from "../methods/draw-brush";
import type { BrushSize, BrushType } from "../types";

export type UseDrawProps = {
  ref?: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  backgroundColor: string;
  brushSize: BrushSize;
  brushType: BrushType;
};

export function useDraw({
  ref,
  enabled,
  color,
  backgroundColor,
  brushSize,
  brushType,
}: UseDrawProps) {
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const savedImage = useRef<ImageData | null>(null);

  useEffect(() => {
    if (!ref?.current || !enabled) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    function getPos(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handlePointerMove(e: MouseEvent) {
      const pos = getPos(e);
      if (!ctx) return;
      if (drawing.current && lastPos.current) {
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.stroke();
        lastPos.current = pos;
        savedImage.current = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
      } else {
        if (savedImage.current) {
          ctx.putImageData(savedImage.current, 0, 0);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        drawBrush({ ctx, x: pos.x, y: pos.y, size: brushSize, brushType });
      }
    }

    function handlePointerDown(e: MouseEvent) {
      drawing.current = true;
      lastPos.current = getPos(e);
      if (ctx) {
        if (savedImage.current) {
          ctx.putImageData(savedImage.current, 0, 0);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }

    function handlePointerUp() {
      drawing.current = false;
      lastPos.current = null;
    }

    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [ref, enabled, brushType, color, brushSize, backgroundColor]);
}
