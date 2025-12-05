import { ReactNode } from 'react'
import { DEFAULT_COLOR, DEFAULT_RADIUS, DEFAULT_SIZE, DEFAULT_WIDTH } from '../constants'
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
 * @param {string} [props.color=DEFAULT_COLOR] - The default color of the magnifier.
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
  color = DEFAULT_COLOR,
  canvas = null,
  isHovered = false,
}: {
  children: ReactNode
  isActive?: boolean
  radius?: number
  size?: number
  width?: number
  color?: string
  canvas?: HTMLCanvasElement | null
  isHovered?: boolean
}) => {
  const value = useColorPickerState({
    isActive,
    radius,
    size,
    width,
    color,
    canvas,
    isHovered,
  })

  return <ColorPickerContext value={value}>{children}</ColorPickerContext>
}
