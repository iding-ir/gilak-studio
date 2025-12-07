import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface Size {
  width?: number
  height?: number
}

export interface UseResizableOptions {
  id?: string
  targetRef: React.RefObject<HTMLElement | null>
  initialWidth?: number
  initialHeight?: number
  disabled?: boolean
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  persistSize?: boolean
  onResizeStart?: () => void
  onResize?: (w: number | undefined, h: number | undefined) => void
  onResizeEnd?: () => void
}

export interface UseResizableReturn {
  size: Size
  isResizing: boolean
  handlePointerDown: (event: React.PointerEvent<HTMLElement>) => void
}

const sizeKey = (id: string) => `gilak-floating-window:${id}:size`

export const useResizable = ({
  id,
  targetRef,
  initialWidth,
  initialHeight,
  disabled = false,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  persistSize = false,
  onResizeStart,
  onResize,
  onResizeEnd,
}: UseResizableOptions): UseResizableReturn => {
  const savedSize = useMemo((): Size => {
    if (persistSize && id) {
      const raw = window.localStorage.getItem(sizeKey(id))
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') {
          const w = typeof parsed.width === 'number' ? parsed.width : undefined
          const h = typeof parsed.height === 'number' ? parsed.height : undefined
          return { width: w, height: h }
        }
      }
    }
    return { width: initialWidth, height: initialHeight }
  }, [id, persistSize, initialWidth, initialHeight])

  const [size, setSize] = useState<Size>(savedSize)
  const [isResizing, setIsResizing] = useState(false)

  const dragStartPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const elementStartSize = useRef<{ w?: number; h?: number }>({
    w: savedSize.width,
    h: savedSize.height,
  })
  const nextSize = useRef<{ w?: number; h?: number }>({ w: savedSize.width, h: savedSize.height })
  const frameRequested = useRef(false)

  const clamp = useCallback(
    (w?: number, h?: number) => {
      let nw = w
      let nh = h
      if (typeof nw === 'number') {
        if (typeof minWidth === 'number') nw = Math.max(minWidth, nw)
        if (typeof maxWidth === 'number') nw = Math.min(maxWidth, nw)
      }
      if (typeof nh === 'number') {
        if (typeof minHeight === 'number') nh = Math.max(minHeight, nh)
        if (typeof maxHeight === 'number') nh = Math.min(maxHeight, nh)
      }
      return { w: nw, h: nh }
    },
    [minWidth, minHeight, maxWidth, maxHeight]
  )

  const applySizeToDom = useCallback(
    (w?: number, h?: number) => {
      const el = targetRef.current
      if (!el) return
      if (typeof w === 'number') el.style.width = `${Math.round(w)}px`
      if (typeof h === 'number') el.style.height = `${Math.round(h)}px`
    },
    [targetRef]
  )

  const scheduleApply = useCallback(() => {
    if (frameRequested.current) return
    frameRequested.current = true
    window.requestAnimationFrame(() => {
      const ns = nextSize.current
      applySizeToDom(ns.w, ns.h)
      // sync state if changed
      setSize((prev) => {
        const sameW = (prev.width ?? undefined) === (ns.w ?? undefined)
        const sameH = (prev.height ?? undefined) === (ns.h ?? undefined)
        if (sameW && sameH) return prev
        return { width: ns.w, height: ns.h }
      })
      onResize?.(ns.w, ns.h)
      frameRequested.current = false
    })
  }, [applySizeToDom, onResize])

  useEffect(() => {
    // initialize DOM sizes if available
    if (targetRef.current) {
      const el = targetRef.current
      if (typeof size.width === 'number') el.style.width = `${Math.round(size.width)}px`
      if (typeof size.height === 'number') el.style.height = `${Math.round(size.height)}px`
    }
  }, [size.width, size.height, targetRef])

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (disabled) return
      const deltaX = event.clientX - dragStartPointer.current.x
      const deltaY = event.clientY - dragStartPointer.current.y

      const startW =
        elementStartSize.current.w ??
        (targetRef.current ? targetRef.current.offsetWidth : undefined)
      const startH =
        elementStartSize.current.h ??
        (targetRef.current ? targetRef.current.offsetHeight : undefined)

      const newW = typeof startW === 'number' ? startW + deltaX : undefined
      const newH = typeof startH === 'number' ? startH + deltaY : undefined

      const clamped = clamp(newW, newH)
      nextSize.current = { w: clamped.w, h: clamped.h }
      scheduleApply()
    },
    [disabled, clamp, scheduleApply, targetRef]
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || event.button !== 0) return
      event.preventDefault()

      setIsResizing(true)
      onResizeStart?.()

      dragStartPointer.current = { x: event.clientX, y: event.clientY }
      const el = targetRef.current
      elementStartSize.current = {
        w: el ? el.offsetWidth : initialWidth,
        h: el ? el.offsetHeight : initialHeight,
      }

      const handlePointerUp = () => {
        setIsResizing(false)
        onResizeEnd?.()

        if (persistSize && id) {
          const ns = nextSize.current
          window.localStorage.setItem(sizeKey(id), JSON.stringify({ width: ns.w, height: ns.h }))
        }

        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    },
    [
      disabled,
      handlePointerMove,
      initialWidth,
      initialHeight,
      persistSize,
      id,
      onResizeStart,
      onResizeEnd,
      targetRef,
    ]
  )

  useEffect(() => {
    return () => {
      frameRequested.current = false
    }
  }, [])

  return { size, isResizing, handlePointerDown }
}

export default useResizable
