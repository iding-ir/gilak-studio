import type {
  DragCallback,
  DragImageInput,
  Point,
} from "@gilak/drag-n-drop/types";
import type { HTMLAttributes, ReactElement } from "react";
import { Children, cloneElement } from "react";

import { useDrag } from "../../hooks";

export type DataAttributes = {
  "data-gilak-drag-wrapper"?: string;
};

type DraggableElementProps = HTMLAttributes<HTMLElement> & DataAttributes;

export type DragWrapperProps<TData> = {
  children: ReactElement<DraggableElementProps>;
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

  const child = Children.only(children);

  return cloneElement(child, {
    draggable: false,
    onPointerDown: (event) => {
      child.props.onPointerDown?.(event);
      onPointerDown(event);
    },
    "data-gilak-drag-wrapper": dragId,
    "aria-disabled": disabled || undefined,
  });
};
