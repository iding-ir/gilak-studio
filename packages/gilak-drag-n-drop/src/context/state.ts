import type { DragImageDescriptor, Point } from "../types";

export type State = {
  isDragging: boolean;
  dragId?: string;
  dragType?: string;
  dropZoneId?: string;
  pointer?: Point;
  pointerOffset?: Point;
  dragImage?: DragImageDescriptor;
  data: unknown;
};

export const initialState: State = {
  isDragging: false,
  dragId: undefined,
  dragType: undefined,
  dropZoneId: undefined,
  pointer: undefined,
  pointerOffset: undefined,
  dragImage: undefined,
  data: null,
};
