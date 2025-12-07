import { RefObject, useCallback, useRef } from 'react'
import { useFloatingWindowContext } from '../context'
import useWindow from './useWindow'

type Params = {
  id: string
  targetRef: RefObject<HTMLElement | null>
  draggable?: boolean
  restrictToParent?: boolean
  initialX?: number
  initialY?: number
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function useDrag({
  id,
  targetRef,
  draggable = true,
  restrictToParent = true,
  initialX = 0,
  initialY = 0,
  onDragStart,
  onDragEnd,
}: Params) {
  const ctx = useFloatingWindowContext()
  const { maximized, isDragging } = useWindow(id)

  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const elementStartPos = useRef<{ x: number; y: number }>({ x: initialX, y: initialY })
  const nextPosition = useRef<{ x: number; y: number }>({ x: initialX, y: initialY })
  const frameRequested = useRef(false)
  const parentRectRef = useRef<DOMRect | null>(null)
  const lastDispatchedPosition = useRef<{ x: number; y: number }>({ x: initialX, y: initialY })

  const clampPosition = useCallback(
    (pos: { x: number; y: number }) => {
      if (!restrictToParent || !targetRef.current || !parentRectRef.current) return pos
      const parentRect = parentRectRef.current
      const el = targetRef.current
      const width = el.offsetWidth
      const height = el.offsetHeight
      let x = pos.x
      let y = pos.y
      x = Math.max(0, Math.min(x, parentRect.width - width))
      y = Math.max(0, Math.min(y, parentRect.height - height))
      return { x, y }
    },
    [restrictToParent, targetRef]
  )

  const dragDisabled = !draggable || maximized

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (dragDisabled) return

      const deltaX = event.clientX - dragStartPos.current.x
      const deltaY = event.clientY - dragStartPos.current.y

      let newPos = {
        x: elementStartPos.current.x + deltaX,
        y: elementStartPos.current.y + deltaY,
      }
      newPos = clampPosition(newPos)
      nextPosition.current = newPos

      if (!frameRequested.current) {
        frameRequested.current = true
        window.requestAnimationFrame(() => {
          const np = nextPosition.current
          const last = lastDispatchedPosition.current
          if (np.x !== last.x || np.y !== last.y) {
            ctx.dispatch({ type: 'SET_POSITION', payload: { id, x: np.x, y: np.y } })
            lastDispatchedPosition.current = { x: np.x, y: np.y }
          }
          frameRequested.current = false
        })
      }
    },
    [dragDisabled, clampPosition, ctx, id]
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!draggable || event.button !== 0) return
      if (maximized) return

      event.preventDefault()

      ctx.dispatch({ type: 'SET_DRAGGING', payload: { id, dragging: true } })
      onDragStart?.()

      dragStartPos.current = { x: event.clientX, y: event.clientY }

      const currentX = ctx.state.windows[id]?.x ?? initialX
      const currentY = ctx.state.windows[id]?.y ?? initialY
      elementStartPos.current = { x: currentX, y: currentY }
      lastDispatchedPosition.current = { x: currentX, y: currentY }

      if (restrictToParent && targetRef.current && targetRef.current.parentElement) {
        parentRectRef.current = targetRef.current.parentElement.getBoundingClientRect()
      }

      const handlePointerUp = () => {
        ctx.dispatch({ type: 'SET_DRAGGING', payload: { id, dragging: false } })
        onDragEnd?.()
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    },
    [
      draggable,
      handlePointerMove,
      onDragStart,
      onDragEnd,
      restrictToParent,
      maximized,
      ctx,
      id,
      initialX,
      initialY,
      targetRef,
    ]
  )

  return { onPointerDown: handlePointerDown, isDragging }
}

export default useDrag
