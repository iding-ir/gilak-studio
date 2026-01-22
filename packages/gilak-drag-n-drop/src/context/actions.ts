import type { DragImageDescriptor, Point } from "../types";

export type StartDragPayload = {
  dragId: string;
  dragType?: string;
  pointer: Point;
  pointerOffset: Point;
  data: unknown;
  dragImage?: DragImageDescriptor;
};

export type UpdatePointerPayload = {
  pointer: Point;
  dropZoneId?: string;
};

export type Action =
  | { type: "START_DRAG"; payload: StartDragPayload }
  | { type: "UPDATE_POINTER"; payload: UpdatePointerPayload }
  | { type: "END_DRAG" };

const startDrag = (payload: StartDragPayload): Action => ({
  type: "START_DRAG",
  payload,
});

const updatePointer = (payload: UpdatePointerPayload): Action => ({
  type: "UPDATE_POINTER",
  payload,
});

const endDrag = (): Action => ({
  type: "END_DRAG",
});

export const actions = {
  startDrag,
  updatePointer,
  endDrag,
};
