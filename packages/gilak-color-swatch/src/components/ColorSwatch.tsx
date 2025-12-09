import React from 'react'
import { getContrastColor } from '@gilak/utils'
import { Dropdown, Icon, List, type TshirtSize } from '@gilak/components'
import styles from './ColorSwatch.module.scss'

export interface ColorSwatchProps {
  icon: string
  size?: TshirtSize
  color: string
  colors: string[]
  onChange: (color: string) => void
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  icon,
  size = 'md',
  color,
  colors,
  onChange,
}) => {
  return (
    <div className={styles.root}>
      <Dropdown
        trigger={
          <Icon icon={icon} size="lg" color={color} backgroundColor={getContrastColor(color)} />
        }
      >
        <List
          direction="vertical"
          count={3}
          items={colors.map((c) => (
            <Icon
              icon={icon}
              size={size}
              color={c}
              backgroundColor={c}
              selected={color === c}
              onClick={() => onChange(c)}
            />
          ))}
        />
      </Dropdown>
    </div>
  )
}
