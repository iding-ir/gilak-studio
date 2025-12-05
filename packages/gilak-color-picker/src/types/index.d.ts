export type ColorPickerConfig = {
  isActive: boolean
  radius: number
  size: number
  width: number
  color: string
  canvas: HTMLCanvasElement | null
  isHovered: boolean
}

export type ColorPickerState = {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  radius: number
  setRadius: React.Dispatch<React.SetStateAction<number>>
  size: number
  setSize: React.Dispatch<React.SetStateAction<number>>
  width: number
  setWidth: React.Dispatch<React.SetStateAction<number>>
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}
