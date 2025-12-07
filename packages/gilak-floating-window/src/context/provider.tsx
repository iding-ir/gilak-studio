import React, { createContext, ReactNode, useReducer, useCallback } from 'react'
import { State, Action, FloatingWindowMeta } from './types'
import { reducer, initialState } from './reducer'

export type ContextValue = {
  state: State
  dispatch: React.Dispatch<Action>
  register: (meta: FloatingWindowMeta) => void
  unregister: (id: string) => void
  open: (id: string) => void
  close: (id: string) => void
  toggle: (id: string) => void
  setPosition: (id: string, x: number, y: number) => void
  setSize: (id: string, width: number, height: number) => void
  bringToFront: (id: string) => void
}

const FloatingWindowContext = createContext<ContextValue | undefined>(undefined)

export const FloatingWindowProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const register = useCallback((meta: FloatingWindowMeta) => {
    dispatch({ type: 'REGISTER', payload: meta })
  }, [])

  const unregister = useCallback((id: string) => {
    dispatch({ type: 'UNREGISTER', payload: { id } })
  }, [])

  const open = useCallback((id: string) => dispatch({ type: 'OPEN', payload: { id } }), [])
  const close = useCallback((id: string) => dispatch({ type: 'CLOSE', payload: { id } }), [])
  const toggle = useCallback((id: string) => dispatch({ type: 'TOGGLE', payload: { id } }), [])
  const setPosition = useCallback(
    (id: string, x: number, y: number) => dispatch({ type: 'SET_POSITION', payload: { id, x, y } }),
    []
  )
  const setSize = useCallback(
    (id: string, width: number, height: number) =>
      dispatch({ type: 'SET_SIZE', payload: { id, width, height } }),
    []
  )
  const bringToFront = useCallback(
    (id: string) => dispatch({ type: 'BRING_TO_FRONT', payload: { id } }),
    []
  )

  const value: ContextValue = {
    state,
    dispatch,
    register,
    unregister,
    open,
    close,
    toggle,
    setPosition,
    setSize,
    bringToFront,
  }

  return <FloatingWindowContext.Provider value={value}>{children}</FloatingWindowContext.Provider>
}

export default FloatingWindowContext
