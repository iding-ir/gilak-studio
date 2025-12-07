import { State, Action, FloatingWindowMeta } from './types'

export const initialState: State = { windows: {}, topZIndex: 1000 }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'REGISTER': {
      const w = action.payload as FloatingWindowMeta
      return {
        ...state,
        windows: { ...state.windows, [w.id]: { ...state.windows[w.id], ...w } },
      }
    }
    case 'UNREGISTER': {
      const id = action.payload.id
      const rest = { ...state.windows }
      delete rest[id]
      return { ...state, windows: rest }
    }
    case 'OPEN': {
      const id = action.payload.id
      const win = state.windows[id] || { id }
      return { ...state, windows: { ...state.windows, [id]: { ...win, open: true } } }
    }
    case 'CLOSE': {
      const id = action.payload.id
      const win = state.windows[id] || { id }
      return { ...state, windows: { ...state.windows, [id]: { ...win, open: false } } }
    }
    case 'TOGGLE': {
      const id = action.payload.id
      const win = state.windows[id] || { id, open: false }
      return { ...state, windows: { ...state.windows, [id]: { ...win, open: !win.open } } }
    }
    case 'SET_POSITION': {
      const { id, x, y } = action.payload as { id: string; x: number; y: number }
      const win = state.windows[id] || { id }
      return { ...state, windows: { ...state.windows, [id]: { ...win, x, y } } }
    }
    case 'SET_SIZE': {
      const { id, width, height } = action.payload as { id: string; width: number; height: number }
      const win = state.windows[id] || { id }
      return { ...state, windows: { ...state.windows, [id]: { ...win, width, height } } }
    }
    case 'BRING_TO_FRONT': {
      const { id } = action.payload as { id: string }
      const nextZ = state.topZIndex + 1
      const win = state.windows[id] || { id }
      return {
        topZIndex: nextZ,
        windows: { ...state.windows, [id]: { ...win, zIndex: nextZ } },
      }
    }
    default:
      return state
  }
}
