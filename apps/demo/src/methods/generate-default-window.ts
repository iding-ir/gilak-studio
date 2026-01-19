import type { FloatingWindowType, Size } from "@gilak/floating-window";

export const generateDefaultWindow = (
  id: string,
  size: Size,
): FloatingWindowType => {
  return {
    id,
    title: "Untitled",
    status: "open",
    minimizable: true,
    maximizable: true,
    draggable: true,
    resizable: true,
    dragging: false,
    resizing: false,
    size,
    position: { x: 0, y: 0 },
    zIndex: 1,
  };
};
