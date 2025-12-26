import { setAttribute } from "@gilak/utils";
import { createListenerMiddleware } from "@reduxjs/toolkit";

import { setTheme } from "../preferences-slice";
import type { ThemeType } from "./types";

export const themeListenerMiddleware = createListenerMiddleware();

themeListenerMiddleware.startListening({
  actionCreator: setTheme,
  effect: async ({ payload }) => {
    changeTheme(payload);
  },
});

export const changeTheme = (theme: ThemeType) => {
  setAttribute({
    attr: "data-theme",
    value: theme,
    element: document.documentElement,
  });
};
