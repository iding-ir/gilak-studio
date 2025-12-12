import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../app/createAppSlice'
import type { BrushSize, BrushType } from '@gilak/canvas/types/brush'

export interface Brush {
  type: BrushType
  size: BrushSize
}

export const DEFAULT_BRUSH: Brush = {
  type: 'CIRCLE',
  size: 2,
}

export interface BrushState {
  selected?: Brush
}

const initialState: BrushState = {
  selected: DEFAULT_BRUSH,
}

export const brushSlice = createAppSlice({
  name: 'brush',
  initialState,
  reducers: (create) => ({
    setBrush: create.reducer((state, { payload }: PayloadAction<Brush>) => {
      state.selected = payload
    }),
  }),
  selectors: {
    selectBrush: ({ selected }) => selected,
  },
})

export const { setBrush } = brushSlice.actions

export const { selectBrush } = brushSlice.selectors
