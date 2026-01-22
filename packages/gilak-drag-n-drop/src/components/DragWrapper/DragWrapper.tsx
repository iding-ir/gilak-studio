import type {
  DragCallback,
  DragImageInput,
  Point,
} from "@gilak/drag-n-drop/types";
import type { ReactElement } from "react";
import { Children, cloneElement } from "react";

import { useDrag } from "../../hooks";

export type DragWrapperProps<TData> = {
  children: ReactElement;
  dragId: string;
  data: TData;
  dragType?: string;
  disabled?: boolean;
  dragImageOffset?: Point;
  dragImageRenderer: DragImageInput<TData>;
  onDragStart?: DragCallback<TData>;
  onDragMove?: DragCallback<TData>;
  onDragEnd?: DragCallback<TData>;
};

export const DragWrapper = <TData,>({
  children,
  dragId,
  data,
  dragType,
  disabled,
  dragImageOffset,
  dragImageRenderer,
  onDragStart,
  onDragMove,
  onDragEnd,
}: DragWrapperProps<TData>) => {
  const { onPointerDown } = useDrag({
    dragId,
    data,
    dragType,
    disabled,
    dragImageOffset,
    dragImageRenderer,
    onDragStart,
    onDragMove,
    onDragEnd,
  });

  return cloneElement(Children.only(children), {
    draggable: false,
    onPointerDown,
    "data-gilak-drag-wrapper": dragId,
    "aria-disabled": disabled || undefined,
  } as Record<string, unknown>);
};
