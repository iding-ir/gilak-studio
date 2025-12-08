import { useEffect } from 'react'
import { useFloatingWindowContext } from '../context'
import { FloatingWindowMeta } from '../context/types'

export function useRegister(meta: FloatingWindowMeta) {
  const ctx = useFloatingWindowContext()

  useEffect(() => {
    ctx.dispatch({ type: 'REGISTER', payload: meta })

    return () => {
      ctx.dispatch({ type: 'UNREGISTER', payload: { id: meta.id } })
    }
    // intentionally only depend on id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.id])
}

export default useRegister
