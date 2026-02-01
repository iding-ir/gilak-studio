export const toolTypes = [
  "BRUSH",
  "ERASER",
  "FILL",
  "PICKER",
  "MOVE",
  "TEXT",
] as const;

export type ToolType = (typeof toolTypes)[number];
