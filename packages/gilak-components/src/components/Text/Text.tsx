import React from 'react'
import clsx from 'clsx'
import styles from './Text.module.scss'
import type { TshirtSize } from '../../types'

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  size?: TshirtSize
  color?: string
  backgroundColor?: string
  className?: string
  rounded?: boolean
  selected?: boolean
  frameless?: boolean
}

export const Text: React.FC<TextProps> = ({
  text,
  size = 'md',
  color = 'inherit',
  backgroundColor = 'inherit',
  className,
  rounded = true,
  selected = false,
  frameless = false,
  ...props
}) => {
  const rootStyles = {
    '--fg-color': color,
    '--bg-color': backgroundColor,
  } as React.CSSProperties

  return (
    <i
      className={clsx(styles.root, styles[size], className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
      })}
      style={rootStyles}
      {...props}
    >
      {text}
    </i>
  )
}
