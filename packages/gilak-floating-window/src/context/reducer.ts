import { State, Action, FloatingWindowMeta, Status } from './types'

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
    case 'SET_STATUS': {
      const { id, status } = action.payload as { id: string; status: Status }
      const win = state.windows[id] || { id }
      return { ...state, windows: { ...state.windows, [id]: { ...win, status } } }
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
    case 'SET_DRAGGING': {
      const { id, dragging } = action.payload as { id: string; dragging: boolean }
      const win = state.windows[id] || { id }
      return { ...state, windows: { ...state.windows, [id]: { ...win, dragging } } }
    }
    case 'SET_RESIZING': {
      const { id, resizing } = action.payload as { id: string; resizing: boolean }
      const win = state.windows[id] || { id }
      return { ...state, windows: { ...state.windows, [id]: { ...win, resizing } } }
    }
    default:
      return state
  }
}
