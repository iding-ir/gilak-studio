import { createContext } from 'react'
import type { ColorPickerState } from '../types'

export const ColorPickerContext = createContext<ColorPickerState | null>(null)
