import clsx from "clsx";
import React, { type RefObject, useRef } from "react";

import type { Status } from "../../context";
import { useDrag, useRegister, useResize, useWindow } from "../../hooks";
import type { Position, Size } from "../../types";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header";
import styles from "./FloatingWindow.module.scss";
export interface FloatingWindowProps {
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
  zIndex?: number;
  draggable?: boolean;
  resizable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  restrictToParent?: boolean;
  onDragStart?: (position?: Position) => void;
  onDragEnd?: (position?: Position) => void;
  onResizeStart?: (size?: Size) => void;
  onResize?: (size?: Size) => void;
  onResizeEnd?: (size?: Size) => void;
}

export const FloatingWindow: React.FC<FloatingWindowProps> = React.memo(
  ({
    id,
    children,
    className,
    title = "",
    initialStatus = "open",
    footer,
    initialPosition = { x: 0, y: 0 },
    initialSize = { w: 400, h: 300 },
    minSize = { w: 300, h: 200 },
    maxSize,
    zIndex = 1000,
    draggable = true,
    resizable = true,
    maximizable = true,
    minimizable = true,
    restrictToParent = true,
    onDragStart,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
  }) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    useRegister({
      id,
      title,
      status: initialStatus,
      draggable,
      resizable,
      maximizable,
      minimizable,
      position: initialPosition,
      size: initialSize,
      z: zIndex,
      dragging: false,
      resizing: false,
    });

    const { status, position, size, z: ctxZ, resizing } = useWindow(id);

    const { dragging, onPointerDown: onDragPointerDown } = useDrag({
      id,
      targetRef,
      draggable,
      restrictToParent,
      initialPosition,
      onDragStart,
      onDragEnd,
    });

    const { onPointerDown: onResizePointerDown } = useResize({
      id,
      targetRef,
      resizable,
      initialSize,
      minSize,
      maxSize,
      onResizeStart,
      onResize,
      onResizeEnd,
    });

    if (status === "minimized") return null;

    return (
      <div
        ref={targetRef as RefObject<HTMLDivElement>}
        className={clsx(styles.window, className, {
          [styles.maximized]: status === "maximized",
          [styles.draggable]: draggable && status !== "maximized",
          [styles.dragging]: dragging,
          [styles.resizing]: resizing,
        })}
        style={{
          transform: `translate3d(${position?.x}px, ${position?.y}px, 0)`,
          zIndex: ctxZ ?? zIndex,
          width: resizable ? (size?.w ?? initialSize.w) : initialSize.w,
          height: resizable ? (size?.h ?? initialSize.h) : initialSize.h,
        }}
      >
        <Header
          id={id}
          title={title}
          draggable={draggable && status !== "maximized"}
          maximizable={maximizable}
          minimizable={true}
          onDragPointerDown={draggable ? onDragPointerDown : undefined}
        />
        <div className={styles.body}>{children}</div>
        <Footer
          footer={footer}
          resizable={resizable}
          status={status}
          onResizePointerDown={onResizePointerDown}
        />
      </div>
    );
  },
);
