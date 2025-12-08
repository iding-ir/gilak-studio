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
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 'md',
  color = '#000000',
  backgroundColor = 'transparent',
  className,
  rounded = true,
  selected = false,
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
      })}
      style={rootStyles}
      {...props}
    >
      <span className={clsx(styles.image)} />
    </i>
  )
}
