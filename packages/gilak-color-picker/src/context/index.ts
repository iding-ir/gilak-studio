import { createContext } from 'react'
import { ColorPickerState } from '../types'

export const ColorPickerContext = createContext<ColorPickerState | undefined>(undefined)
