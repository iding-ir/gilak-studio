import { useCallback } from 'react'
import { type FloatingWindowMeta, useFloatingWindowContext } from '../context'

export function useWindow(id: string): FloatingWindowMeta & {
  maximize: () => void
  minimize: () => void
  open: () => void
  bringToFront: () => void
} {
  const ctx = useFloatingWindowContext()
  const win = ctx.state.windows[id]

  const open = useCallback(() => {
    ctx.dispatch({ type: 'SET_STATUS', payload: { id, status: 'open' } })
  }, [ctx, id])

  const minimize = useCallback(() => {
    ctx.dispatch({ type: 'SET_STATUS', payload: { id, status: 'minimized' } })
  }, [ctx, id])

  const maximize = useCallback(() => {
    ctx.dispatch({ type: 'SET_STATUS', payload: { id, status: 'maximized' } })
    ctx.dispatch({ type: 'BRING_TO_FRONT', payload: { id } })
  }, [ctx, id])

  const bringToFront = useCallback(() => {
    ctx.dispatch({ type: 'BRING_TO_FRONT', payload: { id } })
  }, [ctx, id])

  return { ...win, maximize, minimize, open, bringToFront }
}

export default useWindow
