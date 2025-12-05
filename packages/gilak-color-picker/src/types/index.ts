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
  | { type: 'SET_RADIUS'; payload: number }
  | { type: 'SET_SIZE'; payload: number }
  | { type: 'SET_WIDTH'; payload: number }
  | { type: 'SET_CURRENT_COLOR'; payload: string }
  | { type: 'SET_SELECTED_COLOR'; payload: string }
  | { type: 'SET_HOVERED'; payload: boolean }
  | { type: 'RESET'; payload: ColorPickerConfig }

export type ColorPickerState = {
  isActive: boolean
  setIsActive: (value: boolean) => void
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
