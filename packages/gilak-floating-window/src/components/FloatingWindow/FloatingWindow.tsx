import clsx from "clsx";
import React, { memo, useRef } from "react";

import {
  IMITIAL_STATUS,
  INITIAL_DRAGGABLE,
  INITIAL_MAXIMIZABLE,
  INITIAL_MINIMIZABLE,
  INITIAL_POSITION,
  INITIAL_RESIZABLE,
  INITIAL_RESTRICT_TO_PARENT,
  INITIAL_SIZE,
  INITIAL_Z_INDEX,
  MAX_SIZE,
  MIN_SIZE,
} from "../../constants";
import type { Status } from "../../context";
import { useDrag, useRegister, useResize, useWindow } from "../../hooks";
import type { Position, Size } from "../../types";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header";
import styles from "./FloatingWindow.module.scss";

export type FloatingWindowProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  initialStatus?: Status;
  footer?: React.ReactNode;
  initialPosition?: Position;
  initialSize?: Size;
  minSize?: Size;
  maxSize?: Size;
  initialZIndex?: number;
  draggable?: boolean;
  resizable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  restrictToParent?: boolean;
  onDragStart?: (position?: Position) => void;
  onDrag?: (position?: Position) => void;
  onDragEnd?: (position?: Position) => void;
  onResizeStart?: (size?: Size) => void;
  onResize?: (size?: Size) => void;
  onResizeEnd?: (size?: Size) => void;
};

export const FloatingWindow = memo(
  ({
    id,
    children,
    className,
    title = "",
    initialStatus = IMITIAL_STATUS,
    footer,
    initialPosition = INITIAL_POSITION,
    initialSize = INITIAL_SIZE,
    minSize = MIN_SIZE,
    maxSize = MAX_SIZE,
    initialZIndex = INITIAL_Z_INDEX,
    draggable = INITIAL_DRAGGABLE,
    resizable = INITIAL_RESIZABLE,
    maximizable = INITIAL_MAXIMIZABLE,
    minimizable = INITIAL_MINIMIZABLE,
    restrictToParent = INITIAL_RESTRICT_TO_PARENT,
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
  }: FloatingWindowProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useRegister({
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

    const { size, position, status, zIndex, resizing, dragging } =
      useWindow(id);

    const { onPointerDown: onDragPointerDown } = useDrag({
      id,
      position: initialPosition,
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
      size: initialSize,
      resizable,
      status,
      minSize,
      maxSize,
      ref,
      onResizeStart,
      onResize,
      onResizeEnd,
    });

    if (status === "minimized") {
      return null;
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.window, className, {
          [styles.maximized]: status === "maximized",
          [styles.draggable]: draggable && status !== "maximized",
          [styles.dragging]: dragging,
          [styles.resizing]: resizing,
        })}
        style={{
          transform: `translate3d(${(position || initialPosition).x}px, ${(position || initialPosition).y}px, 0)`,
          zIndex,
          width: (size || initialSize).w,
          height: (size || initialSize).h,
        }}
      >
        <Header
          id={id}
          title={title}
          draggable={draggable && status !== "maximized"}
          maximizable={maximizable}
          minimizable={minimizable}
          onDragPointerDown={draggable ? onDragPointerDown : undefined}
        />
        <div className={styles.body}>{children}</div>
        <Footer
          id={id}
          resizable={resizable && status !== "maximized"}
          footer={footer}
          onResizePointerDown={onResizePointerDown}
        />
      </div>
    );
  },
);
