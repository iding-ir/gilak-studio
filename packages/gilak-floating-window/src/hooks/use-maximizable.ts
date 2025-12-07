import { useCallback, useState } from 'react'

export interface UseMaximizableReturn {
  maximized: boolean
  toggleMaximized: () => void
  setMaximized: (v: boolean) => void
}

export const useMaximizable = (initial = false): UseMaximizableReturn => {
  const [maximized, setMaximized] = useState<boolean>(initial)

  const toggleMaximized = useCallback(() => setMaximized((s) => !s), [])

  return { maximized, toggleMaximized, setMaximized }
}

export default useMaximizable
