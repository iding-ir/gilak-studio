export const toolTypes = ["BRUSH", "ERASER", "FILL", "COLOR_PICKER"] as const;

export type ToolType = (typeof toolTypes)[number];
