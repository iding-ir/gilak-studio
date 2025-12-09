import React, { type ReactNode } from 'react'
import styles from './Menu.module.scss'
import clsx from 'clsx'
import { Dropdown } from '../DropDown'

export type MenuDirection = 'row' | 'column'

export interface MenuProps {
  root?: boolean
  label: string
  direction?: MenuDirection
  open?: boolean
  children?: ReactNode
  onClick?: () => void
}

export const Menu: React.FC<MenuProps> = ({
  root = false,
  direction = 'row',
  label,
  open = false,
  children,
  onClick,
}) => {
  const className = clsx(styles.root, {
    [styles.firstLevel]: root,
  })

  if (root) {
    return (
      <div className={className}>
        <Child direction={direction}>{children}</Child>
      </div>
    )
  }

  if (!children) {
    return (
      <div className={className}>
        <Label label={label} onClick={onClick} />
      </div>
    )
  }

  return (
    <div className={className}>
      <Dropdown openDefault={open} trigger={<Label label={label} onClick={onClick} />}>
        <Child direction={direction}>{children}</Child>
      </Dropdown>
    </div>
  )
}

const Child = ({ direction, children }: { direction: MenuDirection; children?: ReactNode }) => {
  return <div className={clsx(styles.children, styles[direction])}>{children}</div>
}

const Label = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <span className={styles.label} onClick={onClick}>
      {label}
    </span>
  )
}
