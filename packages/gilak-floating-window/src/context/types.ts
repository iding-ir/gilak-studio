import type { Position, Size } from "../types";

export type Status = "open" | "minimized" | "maximized";

export type FloatingWindowType = {
  id: string;
  title: string;
  status: Status;
  minimizable: boolean;
  maximizable: boolean;
  draggable: boolean;
  resizable: boolean;
  dragging: boolean;
  resizing: boolean;
  position: Position;
  size: Size;
  zIndex: number;
  focused?: boolean;
};
