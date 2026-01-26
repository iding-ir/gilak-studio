import type { ReactElement } from "react";
import { Children, useCallback, useEffect, useRef } from "react";

import type { UpdatePointerPayload } from "../../context/actions";
import { actions } from "../../context/actions";
import { useDragNDropContext } from "../../context/hook";
import { getDropZoneFromPoint } from "../../methods/get-dropzone-from-point";
import type { DragCallback, DragImageInput, Point } from "../../types";

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
  const elementRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const movePayloadRef = useRef<UpdatePointerPayload | null>(null);
  const { dispatch } = useDragNDropContext();

  const flushPointerUpdate = useCallback(() => {
    frameRef.current = null;

    if (!movePayloadRef.current) return;

    const payload = movePayloadRef.current;
    movePayloadRef.current = null;

    dispatch(actions.updatePointer(payload));

    onDragMove?.({
      data,
      dragId,
      dragType,
      dropZoneId: payload.dropZoneId,
      pointer: payload.pointer,
    });
  }, [data, dragId, dragType, dispatch, onDragMove]);

  const schedulePointerUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(flushPointerUpdate);
  }, [flushPointerUpdate]);

  const onPointerDown = useCallback(
    (event: PointerEvent) => {
      if (disabled) return;
      if (event.button !== 0 && event.pointerType !== "touch") return;

      const element = elementRef.current;
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

      const handlePointerMove = (event: PointerEvent) => {
        event.preventDefault();

        const pointer: Point = { x: event.clientX, y: event.clientY };
        const dropZone = getDropZoneFromPoint({ pointer, dragType });

        movePayloadRef.current = {
          pointer,
          dropZoneId: dropZone?.id,
        };

        schedulePointerUpdate();
      };

      const handleEndDrag = (event: PointerEvent) => {
        event.preventDefault();

        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handleEndDrag);
        document.removeEventListener("pointercancel", handleEndDrag);

        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
          movePayloadRef.current = null;
        }

        const pointer: Point = { x: event.clientX, y: event.clientY };
        const dropZone = getDropZoneFromPoint({ pointer, dragType });

        dispatch(
          actions.updatePointer({
            pointer,
            dropZoneId: dropZone?.id,
          }),
        );
        dispatch(actions.endDrag());

        onDragEnd?.({
          data,
          dragId,
          dragType,
          dropZoneId: dropZone?.id,
          pointer,
        });
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handleEndDrag);
      document.addEventListener("pointercancel", handleEndDrag);
    },
    [
      data,
      disabled,
      dragId,
      dragType,
      dragImageOffset,
      dragImageRenderer,
      dispatch,
      onDragStart,
      onDragEnd,
      schedulePointerUpdate,
    ],
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener("pointerdown", onPointerDown);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [onPointerDown]);

  return (
    <span ref={elementRef} style={{ display: "contents" }}>
      {Children.only(children)}
    </span>
  );
};
