import { type Action, type ThunkAction, combineSlices, configureStore } from '@reduxjs/toolkit'
import { brushSlice } from '../features/brush/brush-slice'
import { colorSlice } from '../features/color/color-slice'

const rootReducer = combineSlices(brushSlice, colorSlice)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
