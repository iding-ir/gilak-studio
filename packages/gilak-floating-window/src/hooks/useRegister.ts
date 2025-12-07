import { useEffect, useRef } from 'react'
import { useFloatingWindowContext } from '../context'
import { FloatingWindowMeta } from '../context/types'

export function useRegister({
  id,
  title,
  status,
  draggable,
  resizable,
  maximizable,
  minimizable,
  x,
  y,
  width,
  height,
  zIndex,
}: FloatingWindowMeta) {
  const ctx = useFloatingWindowContext()
  // keep a stable payload ref so effect deps stay minimal
  const payloadRef = useRef({
    id,
    title,
    status,
    draggable,
    resizable,
    maximizable,
    minimizable,
    dragging: false,
    resizing: false,
    x,
    y,
    width,
    height,
    zIndex,
  })

  useEffect(() => {
    ctx.dispatch({ type: 'REGISTER', payload: payloadRef.current })
    return () => {
      ctx.dispatch({ type: 'UNREGISTER', payload: { id } })
    }
    // intentionally only depend on id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
}

export default useRegister
