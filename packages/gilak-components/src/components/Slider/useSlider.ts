import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  const rafRef = useRef<number | null>(null);
  const valueRef = useRef(initial);
  const [value, setValue] = useState(initial);

  const fillStyle = useMemo(
    () => ({
      width: `${((value - min) / (max - min || 1)) * 100}%`,
    }),
    [value, min, max],
  );

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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        renderThumb(nextValue);
      });
    },
    [renderThumb],
  );

  const commitValue = useCallback(
    (nextValue: number) => {
      if (nextValue === valueRef.current) return;

      valueRef.current = nextValue;
      scheduleRender(nextValue);
      setValue(nextValue);
      onChange(nextValue);
    },
    [onChange, scheduleRender],
  );

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      let percentage = ((clientX - rect.left) / rect.width) * 100;
      percentage = clamp(percentage, 0, 100);

      const nextValue = percentToValue(percentage);
      commitValue(nextValue);
    },
    [percentToValue, commitValue],
  );

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    updateFromPointer(e.clientX);
  };

  const handleThumbPointerDown = (event: React.PointerEvent) => {
    const element = event.currentTarget;
    element.setPointerCapture?.(event.pointerId);

    updateFromPointer(event.clientX);

    const onMove = (e: PointerEvent) => {
      updateFromPointer(e.clientX);
    };

    const onUp = (e: PointerEvent) => {
      element.releasePointerCapture?.(e.pointerId);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let nextValue = valueRef.current;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        nextValue = clamp(nextValue + step, min, max);
        break;

      case "ArrowLeft":
      case "ArrowDown":
        nextValue = clamp(nextValue - step, min, max);
        break;

      case "Home":
        nextValue = min;
        break;

      case "End":
        nextValue = max;
        break;

      default:
        return;
    }

    event.preventDefault();
    commitValue(nextValue);
  };

  useEffect(() => {
    renderThumb(valueRef.current);
  }, [renderThumb]);

  return {
    trackRef,
    thumbRef,
    fillRef,
    value,
    fillStyle,
    handleTrackPointerDown,
    handleThumbPointerDown,
    handleKeyDown,
  } as const;
};
