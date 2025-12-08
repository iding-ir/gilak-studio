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
  const { status, dragging, maximize, minimize, open, bringToFront } = useWindow(id)

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    bringToFront()
    if (draggable && onDragPointerDown) onDragPointerDown(event)
  }

  return (
    <header
      className={clsx(styles.header, {
        [styles.draggable]: draggable,
        [styles.maximized]: status === 'maximized',
        [styles.minimized]: status === 'minimized',
        [styles.dragging]: dragging,
      })}
      onPointerDown={handlePointerDown}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.toolbar}>
        {maximizable && status !== 'maximized' && (
          <Icon
            icon={IconMaximize}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={maximize}
          />
        )}
        {maximizable && status === 'maximized' && (
          <Icon
            icon={IconMaximized}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={open}
          />
        )}
        {minimizable && status !== 'minimized' && (
          <Icon
            icon={IconMinimize}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={minimize}
          />
        )}
        {minimizable && status === 'minimized' && (
          <Icon
            icon={IconMinimized}
            size="md"
            color="var(--color-dark-md)"
            backgroundColor="transparent"
            className={styles.button}
            onClick={open}
          />
        )}
      </div>
    </header>
  )
}
