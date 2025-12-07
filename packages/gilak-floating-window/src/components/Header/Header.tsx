import React from 'react'
import useWindow from '../../hooks/useWindow'
import { Icon } from '@gilak/components'
import IconMaximize from '../../assets/icon-maximize.svg?url'
import IconMaximized from '../../assets/icon-maximized.svg?url'
import IconMinimize from '../../assets/icon-minimize.svg?url'
import IconMinimized from '../../assets/icon-minimized.svg?url'
import styles from './Header.module.scss'
import clsx from 'clsx'

export interface HeaderProps {
  id: string
  title?: React.ReactNode
  draggable?: boolean
  maximizable?: boolean
  minimizable?: boolean
  onDragPointerDown?: (event: React.PointerEvent<HTMLElement>) => void
}

export const Header: React.FC<HeaderProps> = ({
  id,
  title,
  draggable,
  maximizable,
  minimizable,
  onDragPointerDown,
}) => {
  const { minimized, maximized, isDragging, maximize, minimize, open, bringToFront } = useWindow(id)

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    bringToFront()
    if (draggable && onDragPointerDown) onDragPointerDown(event)
  }

  return (
    <header
      className={clsx(styles.header, {
        [styles.draggable]: draggable,
        [styles.maximized]: maximized,
        [styles.minimized]: minimized,
        [styles.dragging]: isDragging,
      })}
      onPointerDown={handlePointerDown}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.toolbar}>
        {maximizable && !maximized && (
          <Icon
            icon={IconMaximize}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={maximize}
          />
        )}
        {maximizable && maximized && (
          <Icon
            icon={IconMaximized}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={open}
          />
        )}
        {minimizable && !minimized && (
          <Icon
            icon={IconMinimize}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={() => minimize()}
          />
        )}
        {minimizable && minimized && (
          <Icon
            icon={IconMinimized}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={() => open()}
          />
        )}
      </div>
    </header>
  )
}
