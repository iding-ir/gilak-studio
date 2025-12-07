import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useDraggable, useResizable, useMaximizable } from '../../hooks'
import { Icon } from '@gilak/components'
import IconResize from '../../assets/icon-resize.svg?url'
import IconMaximize from '../../assets/icon-maximize.svg?url'
import IconMaximized from '../../assets/icon-maximized.svg?url'
import styles from './FloatingWindow.module.scss'

export interface FloatingWindowProps {
  id?: string
  children?: React.ReactNode
  className?: string
  title?: string
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
  savePosition?: boolean
  draggable?: boolean
  resizable?: boolean
  maximizable?: boolean
  persistSize?: boolean
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
    title,
    footer,
    initialX = 0,
    initialY = 0,
    initialWidth,
    initialHeight,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    zIndex,
    savePosition = true,
    draggable = true,
    resizable = true,
    maximizable = true,
    persistSize = true,
    restrictToParent = true,
    onDragStart,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
  }) => {
    const { maximized, toggleMaximized } = useMaximizable()

    const { position, isDragging, handleRef, targetRef, handlePointerDown } = useDraggable({
      id,
      initialPosition: { x: initialX, y: initialY },
      disabled: !draggable || maximized,
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
            [styles.maximized]: maximized,
          },
          {
            [styles.draggable]: draggable && !maximized,
            [styles.dragging]: isDragging,
            [styles.resizing]: isResizing,
          },
          className
        ),
      [draggable, isDragging, isResizing, className, maximized]
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
        <div className={styles.toolbar}>
          {maximizable && !maximized && (
            <Icon
              icon={IconMaximize}
              size="md"
              color="var(--color-dark-md)"
              backgroundColor="transparent"
              className={styles.button}
              onClick={toggleMaximized}
            />
          )}
          {maximizable && maximized && (
            <Icon
              icon={IconMaximized}
              size="md"
              color="var(--color-dark-md)"
              backgroundColor="transparent"
              className={styles.button}
              onClick={toggleMaximized}
            />
          )}
        </div>
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <div className={styles.content}>{footer}</div>
          {resizable && !maximized && (
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
