import React, { useState, useRef, useEffect, type ReactNode } from 'react'
import styles from './Dropdown.module.scss'
import clsx from 'clsx'

export interface DropdownProps {
  trigger: ReactNode
  openDefault?: boolean
  children: ReactNode
  openOnHover?: boolean
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  openDefault = false,
  children,
  openOnHover = false,
  className,
}) => {
  const [open, setOpen] = useState(openDefault)
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  const triggerProps = openOnHover
    ? {
        onPointerEnter: () => setOpen(true),
        onPointerLeave: () => setOpen(false),
      }
    : {
        onPointerDown: () => setOpen((state) => !state),
      }

  return (
    <div className={clsx(styles.root, className)}>
      <div ref={triggerRef} {...triggerProps} className={styles.trigger}>
        {trigger}
      </div>
      {open && (
        <div ref={menuRef} className={styles.dropdownMenu}>
          {children}
        </div>
      )}
    </div>
  )
}
