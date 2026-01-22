import { serializeAccepts } from "@gilak/drag-n-drop/methods/serialize-accepts";
import clsx from "clsx";
import type { ReactElement } from "react";
import { Children, cloneElement, useEffect, useRef } from "react";

import {
  DROP_ZONE_ACCEPTS_ATTRIBUTE,
  DROP_ZONE_ACTIVE_ATTRIBUTE,
  DROP_ZONE_ATTRIBUTE,
} from "../../constants";
import { useDrop } from "../../hooks";
import type { DropCallback } from "../../types";

export type DropZoneProps<TData> = {
  zoneId: string;
  children: ReactElement;
  accepts?: string[];
  disabled?: boolean;
  activeClassName?: string;
  onDragEnter?: DropCallback<TData>;
  onDragLeave?: DropCallback<TData>;
  onDrop?: DropCallback<TData>;
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
  const handledDragRef = useRef<string | null>(null);
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
    if (disabled || !onDrop) return;
    if (isDragging) return;
    if (!dragId || handledDragRef.current === dragId) return;
    if (dropZoneId !== zoneId) return;

    handledDragRef.current = dragId;
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

  const child = Children.only(children) as ReactElement;
  const acceptsAttr = serializeAccepts(accepts);

  return cloneElement(child, {
    className: clsx(isActive && activeClassName),
    [DROP_ZONE_ATTRIBUTE]: zoneId,
    [DROP_ZONE_ACCEPTS_ATTRIBUTE]: acceptsAttr || undefined,
    [DROP_ZONE_ACTIVE_ATTRIBUTE]: isActive ? "true" : undefined,
    "aria-disabled": disabled || undefined,
  } as Record<string, unknown>);
};
