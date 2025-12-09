import { Icon } from '@gilak/components'
import IconResize from '../../assets/icon-resize.svg?url'
import styles from './Footer.module.scss'
import { Status } from '../../context'
import type { PointerEvent, ReactNode } from 'react'

interface FooterProps {
  footer: ReactNode
  resizable: boolean
  status: Status
  onResizePointerDown?: (event: PointerEvent<HTMLDivElement>) => void
}

export const Footer: React.FC<FooterProps> = ({
  footer,
  resizable,
  status,
  onResizePointerDown,
}: FooterProps) => {
  return (
    <footer className={styles.root}>
      <div className={styles.content}>{footer}</div>
      {resizable && status !== 'maximized' && (
        <div className={styles.resizeHandle} onPointerDown={onResizePointerDown}>
          <Icon icon={IconResize} size="md" className={styles.icon} frameless />
        </div>
      )}
    </footer>
  )
}
