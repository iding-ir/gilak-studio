import {
  type Action,
  combineSlices,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";

import { brushSlice } from "../features/brush/brush-slice";
import { colorSlice } from "../features/color/color-slice";
import { languageListenerMiddleware } from "../features/preferences/language/language-middleware";
import { appearanceSlice } from "../features/preferences/preferences-slice";
import { themeListenerMiddleware } from "../features/preferences/theme/theme-middleware";
import { settingsSlice } from "../features/settings/settings-slice";
import { toolsSlice } from "../features/tools/tools.slice";

const rootReducer = combineSlices(
  brushSlice,
  colorSlice,
  toolsSlice,
  settingsSlice,
  appearanceSlice,
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(languageListenerMiddleware.middleware)
      .prepend(themeListenerMiddleware.middleware),
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
