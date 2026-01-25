import { serializeAccepts } from "@gilak/drag-n-drop/methods/serialize-accepts";
import clsx from "clsx";
import type { HTMLAttributes, ReactElement } from "react";
import { Children, cloneElement, useEffect, useRef } from "react";

import {
  DROP_ZONE_ACCEPTS_ATTRIBUTE,
  DROP_ZONE_ACTIVE_ATTRIBUTE,
  DROP_ZONE_ATTRIBUTE,
} from "../../constants";
import { useDrop } from "../../hooks";
import type { DropCallback } from "../../types";

export type DropZoneDataAttributes = {
  [DROP_ZONE_ATTRIBUTE]?: string;
  [DROP_ZONE_ACCEPTS_ATTRIBUTE]?: string;
  [DROP_ZONE_ACTIVE_ATTRIBUTE]?: "true";
};

type DropZoneElementProps = HTMLAttributes<HTMLElement> &
  DropZoneDataAttributes;

export type DropZoneProps<TData> = {
  zoneId: string;
  children: ReactElement<DropZoneElementProps>;
  accepts?: string[];
  disabled?: boolean;
  activeClassName?: string;
  onDragEnter?: DropCallback<TData>;
  onDragLeave?: DropCallback<TData>;
  onDrop: DropCallback<TData>;
};

export const DropZone = <TData,>({
  zoneId,
  children,
  accepts,
  disabled,
  activeClassName,
  onDragEnter,
  onDragLeave,
  onDrop,
}: DropZoneProps<TData>) => {
  const wasActiveRef = useRef(false);
  const { data, dragId, dragType, dropZoneId, pointer, isDragging, isActive } =
    useDrop<TData>({ zoneId, accepts, disabled });

  useEffect(() => {
    if (disabled) return;

    if (isActive && !wasActiveRef.current) {
      onDragEnter?.({ data, dragType });
    } else if (!isActive && wasActiveRef.current) {
      onDragLeave?.({ data, dragType });
    }

    wasActiveRef.current = isActive;
  }, [data, disabled, dragType, isActive, onDragEnter, onDragLeave]);

  useEffect(() => {
    if (disabled) return;
    if (isDragging) return;
    if (!dragId) return;
    if (dropZoneId !== zoneId) return;

    onDrop({ data, dragType, pointer });
  }, [
    data,
    disabled,
    dragId,
    dragType,
    dropZoneId,
    isDragging,
    onDrop,
    pointer,
    zoneId,
  ]);

  const child = Children.only(children);
  const acceptsAttr = serializeAccepts(accepts);

  return cloneElement(child, {
    className: clsx(child.props.className, {
      [activeClassName!]: isActive,
    }),
    [DROP_ZONE_ATTRIBUTE]: zoneId,
    [DROP_ZONE_ACCEPTS_ATTRIBUTE]: acceptsAttr || undefined,
    [DROP_ZONE_ACTIVE_ATTRIBUTE]: isActive ? "true" : undefined,
    "aria-disabled": disabled || undefined,
  });
};
