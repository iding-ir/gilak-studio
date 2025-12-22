import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";

export interface SettingsState {
  open: boolean;
  doc: {
    w: number;
    h: number;
    color: string;
    backgroundColor: string;
  };
  win: {
    w: number;
    h: number;
    title: string;
  };
}

const initialState: SettingsState = {
  open: false,
  doc: {
    w: 600,
    h: 400,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  win: {
    w: 800,
    h: 600,
    title: "Untitled",
  },
};

export const settingsSlice = createAppSlice({
  name: "settings",
  initialState,
  reducers: (create) => ({
    openSettings: create.reducer((state) => {
      state.open = true;
    }),
    closeSettings: create.reducer((state) => {
      state.open = false;
    }),
    setSettings: create.reducer(
      (state, { payload }: PayloadAction<SettingsState>) => {
        state.open = payload.open;
        state.doc = payload.doc;
        state.win = payload.win;
      },
    ),
  }),
  selectors: {
    selectSettingsOpen: ({ open }) => open,
    selectDoc: ({ doc }) => doc,
    selectWin: ({ win }) => win,
  },
});

export const { openSettings, closeSettings, setSettings } =
  settingsSlice.actions;

export const { selectSettingsOpen, selectDoc, selectWin } =
  settingsSlice.selectors;
