import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";

import type { UpdatePointerPayload } from "../context";
import { actions, useDragNDropContext } from "../context";
import { getDropZoneFromPoint } from "../methods/get-dropzone-from-point";
import type { DragCallback, DragImageInput, Point } from "../types";

export type UseDragParams<TData> = {
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

export const useDrag = <TData>({
  dragId,
  data,
  dragType,
  disabled,
  dragImageOffset,
  dragImageRenderer,
  onDragStart,
  onDragMove,
  onDragEnd,
}: UseDragParams<TData>) => {
  const { dispatch } = useDragNDropContext();
  const cleanupRef = useRef<(() => void) | null>(null);
  const frameRef = useRef<number | null>(null);
  const movePayloadRef = useRef<UpdatePointerPayload | null>(null);

  const flushPointerUpdate = useCallback(() => {
    frameRef.current = null;
    if (!movePayloadRef.current) return;

    const payload = movePayloadRef.current;
    const { dropZoneId, pointer } = payload;
    movePayloadRef.current = null;
    dispatch(actions.updatePointer(payload));
    onDragMove?.({ data, dragId, dragType, dropZoneId, pointer });
  }, [data, dragId, dragType, dispatch, onDragMove]);

  const schedulePointerUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(flushPointerUpdate);
  }, [flushPointerUpdate]);

  const stopTracking = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (disabled) return;
      if (event.button !== 0 && event.pointerType !== "touch") return;

      const element = event.currentTarget;
      if (!element) return;

      event.preventDefault();

      const pointer: Point = { x: event.clientX, y: event.clientY };
      const rect = element.getBoundingClientRect();
      const pointerOffset: Point = {
        x: pointer.x - rect.left,
        y: pointer.y - rect.top,
      };
      const dragImage = {
        node: dragImageRenderer({ data }),
        offset: dragImageOffset ?? { x: 0, y: 0 },
      };

      dispatch(
        actions.startDrag({
          dragId,
          dragType,
          pointer,
          pointerOffset,
          data,
          dragImage,
        }),
      );

      onDragStart?.({ data, dragId, dragType, pointer });

      element.setPointerCapture(event.pointerId);

      const handlePointerMove = (event: PointerEvent) => {
        event.preventDefault();

        const pointer: Point = { x: event.clientX, y: event.clientY };
        const dropZone = getDropZoneFromPoint({ pointer, dragType });
        const dropZoneId = dropZone?.id;

        movePayloadRef.current = { pointer, dropZoneId };
        schedulePointerUpdate();
      };

      const handleEndDrag = (event: PointerEvent) => {
        event.preventDefault();

        if (element.hasPointerCapture(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }

        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointerup", handleEndDrag);
        element.removeEventListener("pointercancel", handleEndDrag);

        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
          movePayloadRef.current = null;
        }

        const pointer: Point = { x: event.clientX, y: event.clientY };
        const dropZone = getDropZoneFromPoint({ pointer, dragType });
        const dropZoneId = dropZone?.id;

        dispatch(actions.updatePointer({ pointer, dropZoneId }));
        dispatch(actions.endDrag());

        onDragEnd?.({ data, dragId, dragType, dropZoneId, pointer });

        cleanupRef.current = null;
      };

      element.addEventListener("pointermove", handlePointerMove);
      element.addEventListener("pointerup", handleEndDrag);
      element.addEventListener("pointercancel", handleEndDrag);

      cleanupRef.current = () => {
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointerup", handleEndDrag);
        element.removeEventListener("pointercancel", handleEndDrag);
        if (element.hasPointerCapture(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
          movePayloadRef.current = null;
        }
      };
    },
    [
      data,
      disabled,
      dispatch,
      dragId,
      dragImageRenderer,
      dragImageOffset,
      dragType,
      onDragEnd,
      onDragStart,
      schedulePointerUpdate,
    ],
  );

  return useMemo(
    () => ({
      dragId,
      onPointerDown,
    }),
    [dragId, onPointerDown],
  );
};
