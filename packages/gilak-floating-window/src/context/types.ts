export type FloatingWindowMeta = {
  id: string
  open?: boolean
  x?: number
  y?: number
  width?: number
  height?: number
  zIndex?: number
}

export type State = {
  windows: Record<string, FloatingWindowMeta>
  topZIndex: number
}

export type Action =
  | { type: 'REGISTER'; payload: FloatingWindowMeta }
  | { type: 'UNREGISTER'; payload: { id: string } }
  | { type: 'OPEN'; payload: { id: string } }
  | { type: 'CLOSE'; payload: { id: string } }
  | { type: 'TOGGLE'; payload: { id: string } }
  | { type: 'SET_POSITION'; payload: { id: string; x: number; y: number } }
  | { type: 'SET_SIZE'; payload: { id: string; width: number; height: number } }
  | { type: 'BRING_TO_FRONT'; payload: { id: string } }
