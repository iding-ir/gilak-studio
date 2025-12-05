import { useEffect, useRef } from 'react'
import { useColorPicker } from '../context'
import { pickColorFromCanvas } from '../methods/pick-color-from-canvas'
import { renderMagnifierCanvas } from '../methods/render-magnifier-canvas'

export const useMagnifier = ({
  onSelect,
  canvasRef,
}: {
  onSelect?: (color: string) => void
  canvasRef?: React.RefObject<HTMLCanvasElement | null>
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const magnifierRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const { radius, size, isActive, isHovered, setColor, setIsActive } = useColorPicker()

  useEffect(() => {
    const canvas = canvasRef?.current
    if (!canvas || !isActive || !isHovered) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      const { offsetX, offsetY } = event
      const color = pickColorFromCanvas({ canvas, x: offsetX, y: offsetY })

      if (color) {
        onSelect?.(color)
      }

      setIsActive(false)
    }

    const onPointerMove = (event: PointerEvent) => {
      // Skip if already processing
      if (rafRef.current !== null) return

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null

        const x = event.offsetX
        const y = event.offsetY

        const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
        const display = x && y ? 'block' : 'none'

        containerRef.current?.style.setProperty('transform', transform)
        containerRef.current?.style.setProperty('display', display)

        const color = pickColorFromCanvas({ canvas, x, y })

        if (color) {
          setColor(color)
        }

        renderMagnifierCanvas({
          canvas,
          magnifier: magnifierRef.current,
          x,
          y,
          radius,
          size,
        })
      })
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)

      // Cancel pending animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [canvasRef, isActive, isHovered, onSelect, radius, setColor, setIsActive, size])

  return { containerRef, magnifierRef }
}
