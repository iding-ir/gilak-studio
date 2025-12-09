import React from 'react'
import clsx from 'clsx'
import styles from './Icon.module.scss'
import type { TshirtSize } from '../../types'

export interface IconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  icon: string
  size?: TshirtSize
  color?: string
  backgroundColor?: string
  className?: string
  rounded?: boolean
  selected?: boolean
  interactive?: boolean
  frameless?: boolean
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 'md',
  color = 'var(--color-dark-xxl)',
  backgroundColor = 'var(--color-light-xxxs)',
  className,
  rounded = true,
  selected = false,
  interactive = false,
  frameless = false,
  ...props
}) => {
  const rootStyles = {
    '--icon-color': color,
    '--icon-bg-color': backgroundColor,
    '--icon-url': `url("${icon}")`,
  } as React.CSSProperties

  return (
    <i
      className={clsx(styles.root, styles[size], className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive || !!props.onClick,
      })}
      style={rootStyles}
      {...props}
    >
      <span className={clsx(styles.image)} />
    </i>
  )
}
