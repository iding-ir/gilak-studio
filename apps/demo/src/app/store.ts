import {
  type Action,
  combineSlices,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";

import { brushSlice } from "../features/brush/brush-slice";
import { colorSlice } from "../features/color/color-slice";
import { settingsSlice } from "../features/settings/settings-slice";
import { toolsSlice } from "../features/tools/tools.slice";
import { windowsSlice } from "../features/windows/windows-slice";

const rootReducer = combineSlices(
  brushSlice,
  colorSlice,
  toolsSlice,
  windowsSlice,
  settingsSlice,
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
