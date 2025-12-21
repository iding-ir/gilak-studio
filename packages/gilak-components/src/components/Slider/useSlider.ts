import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export type UseSliderArgs = {
  range: [number, number];
  step: number;
  initial: number;
  onChange: (value: number) => void;
};

export const useSlider = ({
  range,
  step,
  initial,
  onChange,
}: UseSliderArgs) => {
  const [min, max] = range;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [value, setValue] = useState<number>(initial);

  const valueToPercent = useCallback(
    (v: number) => {
      if (max === min) return 0;
      return ((v - min) / (max - min)) * 100;
    },
    [min, max],
  );

  const percentToValue = useCallback(
    (p: number) => {
      const raw = min + (p / 100) * (max - min);
      const stepped = Math.round(raw / step) * step;
      return clamp(stepped, min, max);
    },
    [min, max, step],
  );

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      let p = ((clientX - rect.left) / rect.width) * 100;
      p = clamp(p, 0, 100);
      const newValue = percentToValue(p);
      setValue(newValue);
      onChange(newValue);
    },
    [percentToValue, onChange],
  );

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    updateFromPointer(e.clientX);
  };

  const handleThumbPointerDown = (event: React.PointerEvent) => {
    const element = event.currentTarget as Element;
    element.setPointerCapture?.(event.pointerId);
    draggingRef.current = true;
    updateFromPointer(event.clientX);

    const onMove = (event: PointerEvent) => {
      updateFromPointer(event.clientX);
    };

    const onUp = (event: PointerEvent) => {
      draggingRef.current = false;
      element.releasePointerCapture?.(event.pointerId);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  const percent = valueToPercent(value);
  const thumbStyle = { left: `${percent}%` } as const;

  return {
    trackRef,
    value,
    percent,
    thumbStyle,
    handleTrackPointerDown,
    handleThumbPointerDown,
  } as const;
};
