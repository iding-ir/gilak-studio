import type { ReactNode } from "react";

export type Point = { x: number; y: number };

export type DragImageInput<TData> = (payload: { data: TData }) => ReactNode;

export type DragPayload<TData> = {
  data: TData;
  dragId: string;
  dragType?: string;
  dropZoneId?: string;
  pointer: Point;
};

export type DragCallback<TData> = (payload: DragPayload<TData>) => void;

export type DropPayload<TData> = {
  data?: TData;
  dragType?: string;
  pointer?: Point;
};

export type DropCallback<TData> = (payload: DropPayload<TData>) => void;

export type DragImageDescriptor = {
  node: ReactNode;
  offset?: Point;
};

export type DropZoneDescriptor = {
  id: string;
  element: HTMLElement;
  accepts?: string[];
};
