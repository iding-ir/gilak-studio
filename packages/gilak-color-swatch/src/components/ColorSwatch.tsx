import React from 'react'
import { Input, type TshirtSize } from '@gilak/components'
import styles from './ColorSwatch.module.scss'

export interface ColorSwatchProps {
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  label?: string
  icon?: string
  size?: TshirtSize
  color?: string
  backgroundColor?: string
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  value,
  onChange,
  placeholder = '',
  label = '',
  icon,
  size = 'md',
  color,
  backgroundColor,
}) => {
  return (
    <div className={styles.root}>
      <Input
        type="text"
        id="gilak-color-swatch"
        name="gilak-color-swatch"
        value={value}
        onChange={onChange}
        readOnly={true}
        placeholder={placeholder}
        label={label}
        icon={icon}
        size={size}
        fullWidth={true}
        color={color}
        backgroundColor={backgroundColor}
      />
    </div>
  )
}
