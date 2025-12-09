import { useCallback, useMemo, useReducer } from 'react'
import { colorPickerReducer, type ColorPickerConfig } from './reducer'

export type ColorPickerState = {
  isActive: boolean
  setIsActive: (value: boolean) => void
  toggleActive: () => void
  radius: number
  setRadius: (value: number) => void
  size: number
  setSize: (value: number) => void
  width: number
  setWidth: (value: number) => void
  currentColor: string
  setCurrentColor: (value: string) => void
  selectedColor: string
  setSelectedColor: (value: string) => void
  isHovered: boolean
  setIsHovered: (value: boolean) => void
}

export const useColorPickerState = (config: ColorPickerConfig): ColorPickerState => {
  const [state, dispatch] = useReducer(colorPickerReducer, config)

  const setIsActive = useCallback(
    (value: boolean) => dispatch({ type: 'SET_ACTIVE', payload: value }),
    []
  )
  const toggleActive = useCallback(() => dispatch({ type: 'TOGGLE_ACTIVE' }), [])
  const setRadius = useCallback(
    (value: number) => dispatch({ type: 'SET_RADIUS', payload: value }),
    []
  )
  const setSize = useCallback((value: number) => dispatch({ type: 'SET_SIZE', payload: value }), [])
  const setWidth = useCallback(
    (value: number) => dispatch({ type: 'SET_WIDTH', payload: value }),
    []
  )
  const setCurrentColor = useCallback(
    (value: string) => dispatch({ type: 'SET_CURRENT_COLOR', payload: value }),
    []
  )
  const setSelectedColor = useCallback(
    (value: string) => dispatch({ type: 'SET_SELECTED_COLOR', payload: value }),
    []
  )
  const setIsHovered = useCallback(
    (value: boolean) => dispatch({ type: 'SET_HOVERED', payload: value }),
    []
  )

  return useMemo(
    () => ({
      isActive: state.isActive,
      setIsActive,
      toggleActive,
      radius: state.radius,
      setRadius,
      size: state.size,
      setSize,
      width: state.width,
      setWidth,
      currentColor: state.currentColor,
      setCurrentColor,
      selectedColor: state.selectedColor,
      setSelectedColor,
      isHovered: state.isHovered,
      setIsHovered,
    }),
    [
      state.isActive,
      state.radius,
      state.size,
      state.width,
      state.currentColor,
      state.selectedColor,
      state.isHovered,
      setIsActive,
      toggleActive,
      setRadius,
      setSize,
      setWidth,
      setCurrentColor,
      setSelectedColor,
      setIsHovered,
    ]
  )
}
