import { RefObject, useCallback, useEffect, useRef } from 'react'
import { useFloatingWindowContext } from '../context'
import useWindow from './useWindow'

type Params = {
  id: string
  targetRef: RefObject<HTMLElement | null>
  resizable?: boolean
  initialWidth?: number
  initialHeight?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  onResizeStart?: () => void
  onResize?: (w?: number, h?: number) => void
  onResizeEnd?: () => void
}

export function useResize({
  id,
  targetRef,
  resizable = true,
  initialWidth,
  initialHeight,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  onResizeStart,
  onResize,
  onResizeEnd,
}: Params) {
  const ctx = useFloatingWindowContext()
  const { isResizing } = useWindow(id)

  const dragStartPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const elementStartSize = useRef<{ w?: number; h?: number }>({ w: initialWidth, h: initialHeight })
  const nextSize = useRef<{ w?: number; h?: number }>({ w: initialWidth, h: initialHeight })
  const frameRequestedSize = useRef(false)
  const lastDispatchedSize = useRef<{ w?: number; h?: number }>({
    w: initialWidth,
    h: initialHeight,
  })

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
    if (frameRequestedSize.current) return
    frameRequestedSize.current = true
    window.requestAnimationFrame(() => {
      const ns = nextSize.current
      applySizeToDom(ns.w, ns.h)
      const last = lastDispatchedSize.current
      const nw = ns.w
      const nh = ns.h
      const changed = nw !== last.w || nh !== last.h
      if (changed) {
        ctx.dispatch({ type: 'SET_SIZE', payload: { id, width: nw ?? 0, height: nh ?? 0 } })
        lastDispatchedSize.current = { w: nw, h: nh }
      }
      onResize?.(ns.w, ns.h)
      frameRequestedSize.current = false
    })
  }, [applySizeToDom, onResize, ctx, id])

  // apply size when context changes (keep DOM inline style in sync)
  useEffect(() => {
    const ctxW = ctx.state.windows[id]?.width ?? initialWidth
    const ctxH = ctx.state.windows[id]?.height ?? initialHeight
    if (targetRef.current) {
      const el = targetRef.current
      if (typeof ctxW === 'number') el.style.width = `${Math.round(ctxW)}px`
      if (typeof ctxH === 'number') el.style.height = `${Math.round(ctxH)}px`
    }
    lastDispatchedSize.current = { w: ctxW, h: ctxH }
  }, [ctx.state.windows, id, initialWidth, initialHeight, targetRef])

  const handleResizePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!resizable || event.button !== 0) return
      event.preventDefault()

      ctx.dispatch({ type: 'SET_RESIZING', payload: { id, resizing: true } })
      onResizeStart?.()

      dragStartPointer.current = { x: event.clientX, y: event.clientY }
      const el = targetRef.current
      elementStartSize.current = {
        w: el ? el.offsetWidth : initialWidth,
        h: el ? el.offsetHeight : initialHeight,
      }

      const handlePointerMoveResize = (ev: PointerEvent) => {
        if (!resizable) return
        const deltaX = ev.clientX - dragStartPointer.current.x
        const deltaY = ev.clientY - dragStartPointer.current.y

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
      }

      const handlePointerUpResize = () => {
        ctx.dispatch({ type: 'SET_RESIZING', payload: { id, resizing: false } })
        onResizeEnd?.()
        document.removeEventListener('pointermove', handlePointerMoveResize)
        document.removeEventListener('pointerup', handlePointerUpResize)
      }

      document.addEventListener('pointermove', handlePointerMoveResize)
      document.addEventListener('pointerup', handlePointerUpResize)
    },
    [
      resizable,
      onResizeStart,
      onResizeEnd,
      clamp,
      scheduleApply,
      ctx,
      id,
      initialWidth,
      initialHeight,
      targetRef,
    ]
  )

  return { onPointerDown: handleResizePointerDown, isResizing }
}

export default useResize
