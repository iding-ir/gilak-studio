import type { ColorPickerConfig, ColorPickerAction } from '../types'

export const colorPickerReducer = (
  state: ColorPickerConfig,
  action: ColorPickerAction
): ColorPickerConfig => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, isActive: action.payload }
    case 'SET_RADIUS':
      return { ...state, radius: action.payload }
    case 'SET_SIZE':
      return { ...state, size: action.payload }
    case 'SET_WIDTH':
      return { ...state, width: action.payload }
    case 'SET_COLOR':
      return { ...state, color: action.payload }
    case 'SET_HOVERED':
      return { ...state, isHovered: action.payload }
    case 'RESET':
      return action.payload
    default:
      return state
  }
}
