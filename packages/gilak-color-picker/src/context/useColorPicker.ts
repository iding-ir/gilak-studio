import { use } from 'react'
import type { ColorPickerState } from '../types'
import { ColorPickerContext } from './ColorPickerContext'

/**
 * Hook to access color picker context state and methods.
 * Must be used within a ColorPickerProvider.
 *
 * @throws {Error} When used outside ColorPickerProvider
 * @returns {ColorPickerState} The color picker state and setters
 *
 * @example
 * ```tsx
 * const { color, setColor, isActive } = useColorPicker()
 * ```
 */
export const useColorPicker = (): ColorPickerState => {
  const context = use(ColorPickerContext)

  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider')
  }

  return context
}
