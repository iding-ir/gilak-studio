import React from 'react'
import styles from './ColorSwatch.module.scss'

export interface ColorSwatchProps {
  id?: string
  name?: string
  value: string
  onChange?: (color: string) => void
  readOnly?: boolean
  placeholder?: string
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  id = 'gilak-color-swatch',
  name = 'gilak-color-swatch',
  value,
  onChange,
  readOnly = true,
  placeholder = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={styles.root}>
      <label htmlFor={id} style={{ backgroundColor: value || 'transparent' }} />
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
  )
}
