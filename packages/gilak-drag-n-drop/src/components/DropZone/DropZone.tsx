import type { ReactNode, RefObject } from "react";
import { useEffect } from "react";

import type {
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

export type DropZoneProps<TData> = {
  ref: RefObject<HTMLElement | null>;
  children?: ReactNode;
  zoneId: string;
  accepts?: string[];
  disabled?: boolean;
  activeClassName?: string;
  onDragEnter?: DropCallback<TData>;
  onDragLeave?: DropCallback<TData>;
  onDrop: DropCallback<TData>;
};

export const DropZone = <TData,>({
  ref,
  children,
  zoneId,
  accepts,
  disabled,
  activeClassName = "",
  onDragEnter,
  onDragLeave,
  onDrop,
}: DropZoneProps<TData>) => {
  const { data, dragType, canDrop, isDragging } = useDrop<TData>({
    zoneId,
    accepts,
    disabled,
  });

  useEffect(() => {
    if (!canDrop) return;
    if (!isDragging) return;

    const element = ref.current;
    if (!element) return;

    const handleDragEnter = (event: PointerEvent) => {
      element.classList.add(activeClassName);
      const { top, left } = element.getBoundingClientRect();
      const pointer = { x: event.clientX - left, y: event.clientY - top };
      onDragEnter?.({ data, dragType, pointer });
    };

    const handleDragLeave = (event: PointerEvent) => {
      element.classList.remove(activeClassName);
      const { top, left } = element.getBoundingClientRect();
      const pointer = { x: event.clientX - left, y: event.clientY - top };
      onDragLeave?.({ data, dragType, pointer });
    };

    const handleDrop = (event: PointerEvent) => {
      element.classList.remove(activeClassName);
      const { top, left } = element.getBoundingClientRect();
      const pointer = { x: event.clientX - left, y: event.clientY - top };
      onDrop?.({ data, dragType, pointer });
    };

    const handleCancel = () => {
      element.classList.remove(activeClassName);
    };

    element.addEventListener("pointerenter", handleDragEnter);
    element.addEventListener("pointerleave", handleDragLeave);
    element.addEventListener("pointerup", handleDrop);
    element.addEventListener("pointercancel", handleCancel);

    return () => {
      element.removeEventListener("pointerenter", handleDragEnter);
      element.removeEventListener("pointerleave", handleDragLeave);
      element.removeEventListener("pointerup", handleDrop);
      element.removeEventListener("pointercancel", handleCancel);
    };
  }, [
    ref,
    activeClassName,
    canDrop,
    data,
    dragType,
    isDragging,
    onDragEnter,
    onDragLeave,
    onDrop,
  ]);

  return children;
};
