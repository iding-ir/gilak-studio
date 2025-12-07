import { useCallback } from 'react'
import { useFloatingWindowContext } from '../context'

export function useWindow(id: string) {
  const ctx = useFloatingWindowContext()

  const maximized = ctx.state.windows[id]?.status === 'maximized'
  const minimized = ctx.state.windows[id]?.status === 'minimized'
  const opened = ctx.state.windows[id]?.status === 'open'
  const draggable = !!ctx.state.windows[id]?.draggable
  const resizable = !!ctx.state.windows[id]?.resizable
  const maximizable = !!ctx.state.windows[id]?.maximizable
  const minimizable = !!ctx.state.windows[id]?.minimizable
  const isDragging = !!ctx.state.windows[id]?.dragging
  const isResizing = !!ctx.state.windows[id]?.resizing
  const x = ctx.state.windows[id]?.x
  const y = ctx.state.windows[id]?.y
  const width = ctx.state.windows[id]?.width
  const height = ctx.state.windows[id]?.height

  const open = useCallback(() => {
    ctx.dispatch({ type: 'SET_STATUS', payload: { id, status: 'open' } })
  }, [ctx, id])

  const minimize = useCallback(() => {
    ctx.dispatch({ type: 'SET_STATUS', payload: { id, status: 'minimized' } })
  }, [ctx, id])

  const maximize = useCallback(() => {
    ctx.dispatch({ type: 'SET_STATUS', payload: { id, status: 'maximized' } })
  }, [ctx, id])

  return {
    maximized,
    minimized,
    opened,
    draggable,
    resizable,
    maximizable,
    minimizable,
    isDragging,
    isResizing,
    x,
    y,
    width,
    height,
    maximize,
    minimize,
    open,
  }
}

export default useWindow
