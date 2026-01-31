export const CURSOR_SHAPES = ["CROSS", "PLUS", "DOT", "TEXT"] as const;

export type CursorShape = (typeof CURSOR_SHAPES)[number];
