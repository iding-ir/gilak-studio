import { type RefObject, useEffect } from "react";

import { fillArea } from "../methods/fill-area";

export type UseFillArgs = {
  ref: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  tolerance: number;
};

export const useFill = ({ ref, enabled, color, tolerance }: UseFillArgs) => {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;

    const onPointerDown = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(ev.clientX - rect.left);
      const y = Math.floor(ev.clientY - rect.top);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      fillArea({ ctx, x, y, color, tolerance });
    };

    canvas.addEventListener("pointerdown", onPointerDown);

    return () => canvas.removeEventListener("pointerdown", onPointerDown);
  }, [ref, enabled, color, tolerance]);
};

export default useFill;
