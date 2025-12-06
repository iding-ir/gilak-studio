import { useCallback, useRef, useState } from 'react'

export interface Position {
  x: number
  y: number
}

export interface UseDraggableOptions {
  initialPosition?: Position
  disabled?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
}

export interface UseDraggableReturn {
  position: Position
  isDragging: boolean
  handleRef: React.RefObject<HTMLElement | null>
  targetRef: React.RefObject<HTMLElement | null>
  handlePointerDown: (event: React.PointerEvent<HTMLElement>) => void
}

/**
 * Custom hook for adding draggable functionality to an element
 * @param options - Configuration options for draggable behavior
 * @returns Refs and handlers needed to make an element draggable
 */
export const useDraggable = ({
  initialPosition = { x: 0, y: 0 },
  disabled = false,
  onDragStart,
  onDragEnd,
}: UseDraggableOptions = {}): UseDraggableReturn => {
  const [position, setPosition] = useState<Position>(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const handleRef = useRef<HTMLElement>(null)
  const targetRef = useRef<HTMLElement>(null)
  const dragStartPos = useRef<Position>({ x: 0, y: 0 })
  const elementStartPos = useRef<Position>({ x: 0, y: 0 })
  const nextPosition = useRef<Position>(initialPosition)
  const frameRequested = useRef(false)

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (disabled) return

      const deltaX = event.clientX - dragStartPos.current.x
      const deltaY = event.clientY - dragStartPos.current.y

      nextPosition.current = {
        x: elementStartPos.current.x + deltaX,
        y: elementStartPos.current.y + deltaY,
      }

      if (!frameRequested.current) {
        frameRequested.current = true
        requestAnimationFrame(() => {
          setPosition(nextPosition.current)
          frameRequested.current = false
        })
      }
    },
    [disabled]
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || event.button !== 0) return

      event.preventDefault()

      setIsDragging(true)
      onDragStart?.()

      dragStartPos.current = {
        x: event.clientX,
        y: event.clientY,
      }

      elementStartPos.current = { ...position }

      const handlePointerUp = () => {
        setIsDragging(false)
        onDragEnd?.()

        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    },
    [disabled, position, handlePointerMove, onDragStart, onDragEnd]
  )

  return {
    position,
    isDragging,
    handleRef,
    targetRef,
    handlePointerDown,
  }
}
