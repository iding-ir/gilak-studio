export type ColorPickerConfig = {
  isActive: boolean
  radius: number
  size: number
  width: number
  currentColor: string
  selectedColor: string
  canvas: HTMLCanvasElement | null
  isHovered: boolean
}

export type ColorPickerAction =
  | { type: 'SET_ACTIVE'; payload: boolean }
  | { type: 'TOGGLE_ACTIVE' }
  | { type: 'SET_RADIUS'; payload: number }
  | { type: 'SET_SIZE'; payload: number }
  | { type: 'SET_WIDTH'; payload: number }
  | { type: 'SET_CURRENT_COLOR'; payload: string }
  | { type: 'SET_SELECTED_COLOR'; payload: string }
  | { type: 'SET_HOVERED'; payload: boolean }
  | { type: 'RESET'; payload: ColorPickerConfig }

export const colorPickerReducer = (
  state: ColorPickerConfig,
  action: ColorPickerAction
): ColorPickerConfig => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, isActive: action.payload }
    case 'TOGGLE_ACTIVE':
      return { ...state, isActive: !state.isActive }
    case 'SET_RADIUS':
      return { ...state, radius: action.payload }
    case 'SET_SIZE':
      return { ...state, size: action.payload }
    case 'SET_WIDTH':
      return { ...state, width: action.payload }
    case 'SET_CURRENT_COLOR':
      return { ...state, currentColor: action.payload }
    case 'SET_SELECTED_COLOR':
      return { ...state, selectedColor: action.payload }
    case 'SET_HOVERED':
      return { ...state, isHovered: action.payload }
    case 'RESET':
      return action.payload
    default:
      return state
  }
}
