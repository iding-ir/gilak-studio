import { useMemo } from 'react'
import type { ReactNode } from 'react'
import {
  DEFAULT_CURRENT_COLOR,
  DEFAULT_SELECTED_COLOR,
  DEFAULT_RADIUS,
  DEFAULT_SIZE,
  DEFAULT_WIDTH,
} from '../constants'
import { ColorPickerContext } from './ColorPickerContext'
import { useColorPickerState } from './useColorPickerState'

/**
 * Provides the color picker context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 * @param {boolean} [props.isActive=false] - Indicates whether the color picker is active by default.
 * @param {number} [props.radius=DEFAULT_RADIUS] - The magnifier radius of the color picker in each direction.
 * @param {number} [props.size=DEFAULT_SIZE] - The grid size of the color picker magnifier in pixels.
 * @param {number} [props.width=DEFAULT_WIDTH] - The border width of the magnifier border to preview current color.
 * @param {string} [props.currentColor=DEFAULT_CURRENT_COLOR] - The current color being hovered in the magnifier.
 * @param {string} [props.selectedColor=DEFAULT_SELECTED_COLOR] - The selected color after clicking.
 * @param {HTMLCanvasElement | null} [props.canvas=null] - The canvas element to be used.
 *
 * @returns {JSX.Element} The provider component that wraps its children with the color picker context.
 */
export const ColorPickerProvider = ({
  children,
  isActive = false,
  radius = DEFAULT_RADIUS,
  size = DEFAULT_SIZE,
  width = DEFAULT_WIDTH,
  currentColor = DEFAULT_CURRENT_COLOR,
  selectedColor = DEFAULT_SELECTED_COLOR,
  canvas = null,
  isHovered = false,
}: {
  children: ReactNode
  isActive?: boolean
  radius?: number
  size?: number
  width?: number
  currentColor?: string
  selectedColor?: string
  canvas?: HTMLCanvasElement | null
  isHovered?: boolean
}) => {
  const config = useMemo(
    () => ({
      isActive,
      radius,
      size,
      width,
      currentColor,
      selectedColor,
      canvas,
      isHovered,
    }),
    [isActive, radius, size, width, currentColor, selectedColor, canvas, isHovered]
  )

  const value = useColorPickerState(config)

  return <ColorPickerContext value={value}>{children}</ColorPickerContext>
}
