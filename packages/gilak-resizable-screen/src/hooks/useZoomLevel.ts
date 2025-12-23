import { throttle } from "@gilak/utils";
import type { RefObject } from "react";
import { useEffect } from "react";

import type { ZoomLevel } from "../context/types";

export const useZoomLevel = ({
  zoomLevel,
  parentRef,
  childRef,
}: {
  zoomLevel: ZoomLevel;
  parentRef: RefObject<HTMLDivElement | null>;
  childRef: RefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    const parent = parentRef.current;
    const child = childRef.current;

    if (!parent || !child) return;

    const updateLayout = throttle(() => {
      const parentW = parent.clientWidth || 0;
      const parentH = parent.clientHeight || 0;
      const childW = child.scrollWidth || 0;
      const childH = child.scrollHeight || 0;
      const fitsHorizontally = parentW >= (childW * zoomLevel) / 100;
      const fitsVertically = parentH >= (childH * zoomLevel) / 100;

      if (fitsHorizontally && fitsVertically) {
        parent.style.setProperty("justify-content", "center");
        parent.style.setProperty("align-items", "center");
        child.style.setProperty("transform-origin", "center center");
      } else if (fitsHorizontally && !fitsVertically) {
        parent.style.setProperty("justify-content", "center");
        parent.style.setProperty("align-items", "flex-start");
        child.style.setProperty("transform-origin", "top center");
      } else if (!fitsHorizontally && fitsVertically) {
        parent.style.setProperty("justify-content", "flex-start");
        parent.style.setProperty("align-items", "center");
        child.style.setProperty("transform-origin", "center left");
      } else {
        parent.style.setProperty("justify-content", "flex-start");
        parent.style.setProperty("align-items", "flex-start");
        child.style.setProperty("transform-origin", "top left");
      }
    }, 16);

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(parent);
    resizeObserver.observe(child);

    return () => {
      resizeObserver.disconnect();
    };
  }, [zoomLevel, childRef, parentRef]);
};
