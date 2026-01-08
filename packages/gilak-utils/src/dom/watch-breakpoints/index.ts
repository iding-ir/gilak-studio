type Data = {
  breakpoint: string;
  width: string;
  height: string;
};

export const watchBreakpoint = (onChange: (data: Data) => void) => {
  const bodyElement = document.body;
  bodyElement.classList.add("gilak-utils--get-breakpoints");

  const getData = () => {
    const breakpoint = window
      .getComputedStyle(bodyElement)
      .getPropertyValue("--gilak-utils-breakpoint")
      .trim();
    const width = window
      .getComputedStyle(bodyElement)
      .getPropertyValue("width")
      .trim();
    const height = window
      .getComputedStyle(bodyElement)
      .getPropertyValue("height")
      .trim();

    return { breakpoint, width, height };
  };

  onChange(getData());

  const handler = () => onChange(getData());
  const observer = new ResizeObserver(handler);
  observer.observe(bodyElement);

  const disconnect = () => {
    observer.disconnect();
    bodyElement.classList.remove("gilak-utils--get-breakpoints");
  };

  return {
    disconnect,
  };
};
