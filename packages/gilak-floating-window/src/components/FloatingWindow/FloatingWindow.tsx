import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useDraggable, useResizable } from '../../hooks'
import { Icon } from '@gilak/components'
import IconResize from '../../assets/icon-resize.svg?url'
import styles from './FloatingWindow.module.scss'

export interface FloatingWindowProps {
  title?: string
  children?: React.ReactNode
  toolbar?: React.ReactNode
  footer?: React.ReactNode
  draggable?: boolean
  initialX?: number
  initialY?: number
  initialWidth?: number
  initialHeight?: number
  zIndex?: number
  className?: string
  onDragStart?: () => void
  onDragEnd?: () => void
  restrictToParent?: boolean
  id?: string
  savePosition?: boolean
  resizable?: boolean
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  persistSize?: boolean
  onResizeStart?: () => void
  onResize?: (w?: number, h?: number) => void
  onResizeEnd?: () => void
}

export const FloatingWindow: React.FC<FloatingWindowProps> = React.memo(
  ({
    id,
    title,
    children,
    toolbar,
    footer,
    draggable = false,
    initialX = 0,
    initialY = 0,
    initialWidth,
    initialHeight,
    zIndex,
    className,
    onDragStart,
    onDragEnd,
    restrictToParent = false,
    savePosition = false,
    resizable,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    persistSize = false,
    onResizeStart,
    onResize,
    onResizeEnd,
  }) => {
    const { position, isDragging, handleRef, targetRef, handlePointerDown } = useDraggable({
      id,
      initialPosition: { x: initialX, y: initialY },
      disabled: !draggable,
      onDragStart,
      onDragEnd,
      restrictToParent,
      initialWidth,
      initialHeight,
      savePosition,
    })

    const {
      size: resizeSize,
      isResizing,
      handlePointerDown: handleResizePointerDown,
    } = useResizable({
      id,
      targetRef,
      initialWidth,
      initialHeight,
      disabled: !resizable,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      persistSize,
      onResizeStart,
      onResize,
      onResizeEnd,
    })

    const windowStyle = useMemo(
      () => ({
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex,
        width: resizable ? (resizeSize.width ?? initialWidth) : initialWidth,
        height: resizable ? (resizeSize.height ?? initialHeight) : initialHeight,
      }),
      [
        position.x,
        position.y,
        zIndex,
        initialWidth,
        initialHeight,
        resizable,
        resizeSize?.width,
        resizeSize?.height,
      ]
    )

    const windowClassName = useMemo(
      () =>
        clsx(
          styles.window,
          {
            [styles.draggable]: draggable,
            [styles.dragging]: isDragging,
            [styles.resizing]: isResizing,
          },
          className
        ),
      [draggable, isDragging, isResizing, className]
    )

    return (
      <div
        ref={targetRef as React.RefObject<HTMLDivElement>}
        className={windowClassName}
        style={windowStyle}
      >
        <header
          ref={handleRef as React.RefObject<HTMLElement>}
          className={styles.header}
          onPointerDown={draggable ? handlePointerDown : undefined}
        >
          <h3 className={styles.title}>{title}</h3>
        </header>
        {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <div className={styles.content}>{footer}</div>
          {resizable && (
            <div className={styles.resizeHandle} onPointerDown={handleResizePointerDown}>
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
