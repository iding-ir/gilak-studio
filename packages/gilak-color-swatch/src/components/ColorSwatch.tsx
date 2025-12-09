import React from 'react'
import { getContrastColor } from '@gilak/utils'
import { Dropdown, Icon, List, type TshirtSize } from '@gilak/components'
import styles from './ColorSwatch.module.scss'
import IconEmpty from '../assets/icon-empty.svg'

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
          <Icon
            icon={icon}
            size={size}
            color={color}
            interactive
            backgroundColor={getContrastColor(color)}
          />
        }
      >
        <List
          direction="column"
          count={3}
          theme="light"
          frameless
          items={colors.map((c) => (
            <Icon
              icon={IconEmpty}
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
