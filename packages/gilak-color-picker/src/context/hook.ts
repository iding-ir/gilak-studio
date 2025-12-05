import { useContext } from 'react'
import { ColorPickerContext } from '.'

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext)

  if (!context) {
    throw new Error('useMagnifier must be used within a ColorPickerProvider')
  }

  return context
}
