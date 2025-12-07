export type Status = 'open' | 'minimized' | 'maximized'

export type FloatingWindowMeta = {
  id: string
  title: string
  status: Status
  draggable: boolean
  resizable: boolean
  maximizable: boolean
  minimizable: boolean
  dragging: boolean
  resizing: boolean
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

export type State = {
  windows: Record<string, FloatingWindowMeta>
  topZIndex: number
}

export type Action =
  | { type: 'REGISTER'; payload: FloatingWindowMeta }
  | { type: 'UNREGISTER'; payload: { id: string } }
  | { type: 'SET_STATUS'; payload: { id: string; status: Status } }
  | { type: 'SET_POSITION'; payload: { id: string; x: number; y: number } }
  | { type: 'SET_SIZE'; payload: { id: string; width: number; height: number } }
  | { type: 'SET_DRAGGING'; payload: { id: string; dragging: boolean } }
  | { type: 'SET_RESIZING'; payload: { id: string; resizing: boolean } }
  | { type: 'BRING_TO_FRONT'; payload: { id: string } }
