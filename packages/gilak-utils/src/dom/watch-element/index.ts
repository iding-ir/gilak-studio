type Size = {
  width: number;
  height: number;
};

export const watchElement = (
  element: HTMLElement,
  onChange?: (size: Size) => void,
) => {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      onChange?.({ width, height });
    }
  });

  observer.observe(element);

  const { width, height } = element.getBoundingClientRect();
  onChange?.({ width, height });

  return {
    width,
    height,
    disconnect() {
      observer.disconnect();
    },
  };
};
