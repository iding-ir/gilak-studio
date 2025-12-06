import { useCallback, useMemo } from 'react'
import { positionKey } from './position-key'

export interface Position {
  x: number
  y: number
}

export const useSavedPosition = (
  id?: string,
  enabled = false,
  initialPosition: Position = { x: 0, y: 0 }
) => {
  const savedPosition = useMemo((): Position => {
    if (enabled && id) {
      const raw = window.localStorage.getItem(positionKey(id))
      if (raw) {
        const parsed = JSON.parse(raw)
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          typeof parsed.x === 'number' &&
          typeof parsed.y === 'number'
        ) {
          return { x: parsed.x, y: parsed.y }
        }
      }
    }
    return initialPosition
  }, [id, enabled, initialPosition])

  const saveCurrentPosition = useCallback(
    (pos: Position) => {
      if (!enabled || !id) return
      window.localStorage.setItem(positionKey(id), JSON.stringify({ x: pos.x, y: pos.y }))
    },
    [id, enabled]
  )

  return { savedPosition, saveCurrentPosition }
}

export default useSavedPosition
