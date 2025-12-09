import React from 'react'
import { getContrastColor } from '@gilak/utils'
import { Dropdown, Icon, Input, List, type TshirtSize } from '@gilak/components'
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
    <div className={styles.root} style={{ backgroundColor: color }}>
      <Dropdown
        position="bottom-right"
        trigger={
          <Icon
            icon={icon}
            size={size}
            color={getContrastColor(color)}
            backgroundColor="transparent"
            frameless
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
      <Input
        value={color}
        readOnly
        type="text"
        style={{ backgroundColor: color, color: getContrastColor(color), width: '6rem' }}
      />
    </div>
  )
}
