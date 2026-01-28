export const toolTypes = [
  "BRUSH",
  "ERASER",
  "FILL",
  "COLOR_PICKER",
  "MOVE",
] as const;

export type ToolType = (typeof toolTypes)[number];
