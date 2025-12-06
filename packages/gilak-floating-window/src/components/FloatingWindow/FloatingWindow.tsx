import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useDraggable } from '../../hooks'
import styles from './FloatingWindow.module.scss'

export interface FloatingWindowProps {
  title?: string
  children?: React.ReactNode
  toolbar?: React.ReactNode
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
}

export const FloatingWindow: React.FC<FloatingWindowProps> = React.memo(
  ({
    title,
    children,
    toolbar,
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
  }) => {
    const { position, isDragging, handleRef, targetRef, handlePointerDown } = useDraggable({
      initialPosition: { x: initialX, y: initialY },
      disabled: !draggable,
      onDragStart,
      onDragEnd,
      restrictToParent,
      initialWidth,
      initialHeight,
    })

    // Memoize window style
    const windowStyle = useMemo(
      () => ({
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex,
        width: initialWidth,
        height: initialHeight,
      }),
      [position.x, position.y, zIndex, initialWidth, initialHeight]
    )

    // Memoize className
    const windowClassName = useMemo(
      () =>
        clsx(
          styles.window,
          {
            [styles.draggable]: draggable,
            [styles.dragging]: isDragging,
          },
          className
        ),
      [draggable, isDragging, className]
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
      </div>
    )
  }
)
