import { useCallback, useEffect, useRef, useState } from "react";

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
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const valueRef = useRef(initial);
  const [value, setValue] = useState(initial);

  const valueToPercent = useCallback(
    (v: number) => (max === min ? 0 : ((v - min) / (max - min)) * 100),
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

  const renderThumb = useCallback(
    (nextValue: number) => {
      const percent = valueToPercent(nextValue);

      if (thumbRef.current) {
        thumbRef.current.style.left = `${percent}%`;
      }

      if (fillRef.current) {
        fillRef.current.style.width = `${percent}%`;
      }
    },
    [valueToPercent],
  );

  const scheduleRender = useCallback(
    (nextValue: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        renderThumb(nextValue);
      });
    },
    [renderThumb],
  );

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      let percentage = ((clientX - rect.left) / rect.width) * 100;
      percentage = clamp(percentage, 0, 100);

      const nextValue = percentToValue(percentage);
      if (nextValue === valueRef.current) return;

      valueRef.current = nextValue;
      scheduleRender(nextValue);

      setValue(nextValue);
      onChange(nextValue);
    },
    [percentToValue, scheduleRender, onChange],
  );

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    updateFromPointer(e.clientX);
  };

  const handleThumbPointerDown = (event: React.PointerEvent) => {
    const element = event.currentTarget as Element;
    element.setPointerCapture?.(event.pointerId);

    draggingRef.current = true;
    updateFromPointer(event.clientX);

    const onMove = (event: PointerEvent) => updateFromPointer(event.clientX);

    const onUp = (event: PointerEvent) => {
      draggingRef.current = false;
      element.releasePointerCapture?.(event.pointerId);

      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
  };

  useEffect(() => {
    renderThumb(valueRef.current);
  }, [renderThumb]);

  return {
    trackRef,
    thumbRef,
    fillRef,
    value,
    handleTrackPointerDown,
    handleThumbPointerDown,
  } as const;
};
