import React, { useRef } from 'react'
import clsx from 'clsx'
import { useRegister, useDrag, useResize, useWindow } from '../../hooks'
import { Header } from '../Header'
import { Icon } from '@gilak/components'
import IconResize from '../../assets/icon-resize.svg?url'
import styles from './FloatingWindow.module.scss'
import { Status } from '../../context'

export interface FloatingWindowProps {
  id: string
  children?: React.ReactNode
  className?: string
  title?: string
  status?: Status
  footer?: React.ReactNode
  initialX?: number
  initialY?: number
  initialWidth?: number
  initialHeight?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  zIndex?: number
  draggable?: boolean
  resizable?: boolean
  maximizable?: boolean
  minimizable?: boolean
  restrictToParent?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
  onResizeStart?: () => void
  onResize?: (w?: number, h?: number) => void
  onResizeEnd?: () => void
}

export const FloatingWindow: React.FC<FloatingWindowProps> = React.memo(
  ({
    id,
    children,
    className,
    title = '',
    status = 'open',
    footer,
    initialX = 0,
    initialY = 0,
    initialWidth = 400,
    initialHeight = 300,
    minWidth = 300,
    minHeight = 200,
    maxWidth,
    maxHeight,
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
    useRegister({
      id,
      title,
      status,
      draggable,
      resizable,
      maximizable,
      minimizable,
      x: initialX,
      y: initialY,
      width: initialWidth,
      height: initialHeight,
      zIndex,
      dragging: false,
      resizing: false,
    })

    const {
      maximized,
      minimized,
      x: posX,
      y: posY,
      width: ctxWidth,
      height: ctxHeight,
    } = useWindow(id)

    const targetRef = useRef<HTMLDivElement | null>(null)

    const { onPointerDown: onDragPointerDown, isDragging } = useDrag({
      id,
      targetRef,
      draggable,
      restrictToParent,
      initialX,
      initialY,
      onDragStart,
      onDragEnd,
    })

    const { onPointerDown: onResizePointerDown, isResizing } = useResize({
      id,
      targetRef,
      resizable,
      initialWidth,
      initialHeight,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      onResizeStart,
      onResize,
      onResizeEnd,
    })

    if (minimized) return null

    return (
      <div
        ref={targetRef as React.RefObject<HTMLDivElement>}
        className={clsx(styles.window, className, {
          [styles.maximized]: maximized,
          [styles.minimized]: minimized,
          [styles.draggable]: draggable && !maximized,
          [styles.dragging]: isDragging,
          [styles.resizing]: isResizing,
        })}
        style={{
          transform: `translate3d(${posX}px, ${posY}px, 0)`,
          zIndex,
          width: resizable ? (ctxWidth ?? initialWidth) : initialWidth,
          height: resizable ? (ctxHeight ?? initialHeight) : initialHeight,
        }}
      >
        <Header
          id={id}
          title={title}
          draggable={draggable && !maximized}
          maximizable={maximizable}
          minimizable={true}
          onDragPointerDown={draggable ? onDragPointerDown : undefined}
        />
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <div className={styles.content}>{footer}</div>
          {resizable && !maximized && (
            <div className={styles.resizeHandle} onPointerDown={onResizePointerDown}>
              <Icon
                icon={IconResize}
                size="md"
                color="var(--color-dark-md)"
                backgroundColor="transparent"
              />
            </div>
          )}
        </footer>
      </div>
    )
  }
)
