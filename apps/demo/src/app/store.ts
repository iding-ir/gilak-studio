import { createPersistMiddleware, loadPersistedState } from "@gilak/persist";
import {
  type Action,
  combineSlices,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";

import { brushSlice } from "../features/brush/brush-slice";
import { colorSlice } from "../features/color/color-slice";
import { languageListenerMiddleware } from "../features/preferences/language/language-middleware";
import { preferencesListenerMiddleware } from "../features/preferences/preferences-middleware";
import {
  appearanceSlice,
  initializePreferences,
} from "../features/preferences/preferences-slice";
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

const persistedState = loadPersistedState<RootState>("gilak");
const preloadedState: Partial<RootState> = persistedState.settings
  ? {
      ...persistedState,
      settings: {
        ...persistedState.settings,
        open: false,
      },
    }
  : persistedState;

const persistMiddleware = createPersistMiddleware<RootState>({
  key: "gilak",
  slices: ["brush", "color", "tools", "appearance", "settings"],
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(languageListenerMiddleware.middleware)
      .concat(themeListenerMiddleware.middleware)
      .concat(preferencesListenerMiddleware.middleware)
      .concat(persistMiddleware),
});

store.dispatch(initializePreferences());

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
