import { Body } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window/hooks/useFloatingWindows";
import clsx from "clsx";
import type { ReactNode } from "react";
import { memo, useEffect, useRef } from "react";

import {
  INITIAL_CLOSABLE,
  INITIAL_DRAGGABLE,
  INITIAL_MAXIMIZABLE,
  INITIAL_MINIMIZABLE,
  INITIAL_POSITION,
  INITIAL_RESIZABLE,
  INITIAL_RESTRICT_TO_PARENT,
  INITIAL_SIZE,
  INITIAL_STATUS,
  INITIAL_Z_INDEX,
  MAX_SIZE,
  MIN_SIZE,
} from "../../constants";
import type { Status } from "../../context";
import { useDrag, useResize } from "../../hooks";
import { useFloatingWindow } from "../../hooks/useFloatingWindow";
import type { Position, Size } from "../../types";
import { FloatingWindowFooter } from "../FloatingWindowFooter";
import { FloatingWindowHeader } from "../FloatingWindowHeader";
import styles from "./FloatingWindow.module.scss";

export type FloatingWindowProps = {
  id: string;
  children?: ReactNode;
  className?: string;
  title?: string;
  editableTitle?: boolean;
  initialStatus?: Status;
  footer?: ReactNode;
  actions?: ReactNode;
  initialPosition?: Position;
  initialSize?: Size;
  minSize?: Size;
  maxSize?: Size;
  initialZIndex?: number;
  draggable?: boolean;
  resizable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  closable?: boolean;
  restrictToParent?: boolean;
  onDragStart?: (position?: Position) => void;
  onDrag?: (position?: Position) => void;
  onDragEnd?: (position?: Position) => void;
  onResizeStart?: (size?: Size) => void;
  onResize?: (size?: Size) => void;
  onResizeEnd?: (size?: Size) => void;
  onClose?: () => void;
};

export const FloatingWindow = memo(
  ({
    id,
    children,
    className,
    title = "Untitled",
    editableTitle = false,
    initialStatus = INITIAL_STATUS,
    footer,
    actions,
    initialPosition = INITIAL_POSITION,
    initialSize = INITIAL_SIZE,
    minSize = MIN_SIZE,
    maxSize = MAX_SIZE,
    initialZIndex = INITIAL_Z_INDEX,
    draggable = INITIAL_DRAGGABLE,
    resizable = INITIAL_RESIZABLE,
    maximizable = INITIAL_MAXIMIZABLE,
    minimizable = INITIAL_MINIMIZABLE,
    closable = INITIAL_CLOSABLE,
    restrictToParent = INITIAL_RESTRICT_TO_PARENT,
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
    onClose,
  }: FloatingWindowProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { windows } = useFloatingWindows();
    const { registerFloatingWindow } = useFloatingWindows();
    const { size, position, status, zIndex, resizing, dragging } =
      useFloatingWindow(id);

    useEffect(() => {
      if (windows.has(id)) return;

      registerFloatingWindow({
        id,
        title,
        status: initialStatus,
        minimizable,
        maximizable,
        draggable,
        resizable,
        dragging: false,
        resizing: false,
        position: initialPosition,
        size: initialSize,
        zIndex: initialZIndex,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { onPointerDown: onDragPointerDown } = useDrag({
      id,
      position,
      status,
      draggable,
      restrictToParent,
      ref,
      onDragStart,
      onDrag,
      onDragEnd,
    });

    const { onPointerDown: onResizePointerDown } = useResize({
      id,
      size,
      resizable,
      status,
      minSize,
      maxSize,
      restrictToParent,
      ref,
      onResizeStart,
      onResize,
      onResizeEnd,
    });

    return (
      <div
        ref={ref}
        className={clsx(styles.window, className, {
          [styles.maximized]: status === "maximized",
          [styles.minimized]: status === "minimized",
          [styles.draggable]: draggable && status !== "maximized",
          [styles.dragging]: dragging,
          [styles.resizing]: resizing,
        })}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          zIndex,
          width: size.w,
          height: size.h,
        }}
      >
        <FloatingWindowHeader
          id={id}
          title={title}
          editableTitle={editableTitle}
          draggable={draggable && status !== "maximized"}
          maximizable={maximizable}
          minimizable={minimizable}
          closable={closable}
          actions={actions}
          onDragPointerDown={onDragPointerDown}
          onClose={onClose}
        />
        <Body>{children}</Body>
        <FloatingWindowFooter
          id={id}
          resizable={resizable && status !== "maximized"}
          footer={footer}
          onResizePointerDown={onResizePointerDown}
        />
      </div>
    );
  },
);
