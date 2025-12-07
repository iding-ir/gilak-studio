import { useContext } from 'react'
import FloatingWindowContext from './provider'

export function useFloatingWindowContext() {
  const ctx = useContext(FloatingWindowContext)
  if (!ctx) throw new Error('useFloatingWindowContext must be used within FloatingWindowProvider')
  return ctx
}
