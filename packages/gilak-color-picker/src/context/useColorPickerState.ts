import { useReducer } from 'react'
import { ColorPickerConfig, ColorPickerState } from '../types'
import { colorPickerReducer } from './reducer'

export const useColorPickerState = (config: ColorPickerConfig): ColorPickerState => {
  const [state, dispatch] = useReducer(colorPickerReducer, config)

  const setIsActive = (value: boolean) => dispatch({ type: 'SET_ACTIVE', payload: value })
  const setRadius = (value: number) => dispatch({ type: 'SET_RADIUS', payload: value })
  const setSize = (value: number) => dispatch({ type: 'SET_SIZE', payload: value })
  const setWidth = (value: number) => dispatch({ type: 'SET_WIDTH', payload: value })
  const setColor = (value: string) => dispatch({ type: 'SET_COLOR', payload: value })
  const setIsHovered = (value: boolean) => dispatch({ type: 'SET_HOVERED', payload: value })

  return {
    isActive: state.isActive,
    setIsActive,
    radius: state.radius,
    setRadius,
    size: state.size,
    setSize,
    width: state.width,
    setWidth,
    color: state.color,
    setColor,
    isHovered: state.isHovered,
    setIsHovered,
  }
}
