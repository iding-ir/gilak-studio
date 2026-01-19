import type { Position, Size } from "../types";

export const INITIAL_POSITION: Position = { x: 0, y: 0 };
export const INITIAL_SIZE: Size = { w: 400, h: 300 };
export const INITIAL_MIN_SIZE: Size = { w: 300, h: 200 };
export const MIN_SIZE: Size = { w: 300, h: 200 };
export const MAX_SIZE: Size = { w: 800, h: 600 };
export const INITIAL_RESIZABLE = true;
export const INITIAL_DRAGGABLE = true;
export const INITIAL_MAXIMIZABLE = true;
export const INITIAL_MINIMIZABLE = true;
export const INITIAL_CLOSABLE = true;
export const INITIAL_STATUS = "open";
export const INITIAL_Z_INDEX = 1000;
export const INITIAL_RESTRICT_TO_PARENT = true;
export const FLOATING_WINDOWS_PADDING = 10;
