import { createContext } from 'react'
import type { ColorPickerState } from './useColorPickerState'

export const ColorPickerContext = createContext<ColorPickerState | null>(null)
