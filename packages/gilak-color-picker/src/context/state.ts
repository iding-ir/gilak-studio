import { useState } from 'react'
import { ColorPickerConfig } from '../types'

export const useColorPickerState = (config: ColorPickerConfig) => {
  const [isActive, setIsActive] = useState(config.isActive)
  const [radius, setRadius] = useState(config.radius)
  const [size, setSize] = useState(config.size)
  const [width, setWidth] = useState(config.width)
  const [color, setColor] = useState(config.color)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return {
    isActive,
    setIsActive,
    radius,
    setRadius,
    size,
    setSize,
    width,
    setWidth,
    color,
    setColor,
    isHovered,
    setIsHovered,
  }
}
