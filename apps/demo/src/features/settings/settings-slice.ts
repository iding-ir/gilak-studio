import type { Size } from "@gilak/floating-window";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";

type DocumentSettings = {
  size: Size;
  color: string;
  backgroundColor: string;
};

type WindowSettings = {
  size: Size;
  title: string;
};
export interface SettingsState {
  open: boolean;
  doc: DocumentSettings;
  win: WindowSettings;
}

const initialState: SettingsState = {
  open: false,
  doc: {
    size: { w: 600, h: 400 },
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  win: {
    size: { w: 800, h: 600 },
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
    setDocumentSettings: create.reducer(
      (state, { payload }: PayloadAction<DocumentSettings>) => {
        state.doc = payload;
      },
    ),
    setWindowSettings: create.reducer(
      (state, { payload }: PayloadAction<WindowSettings>) => {
        state.win = payload;
      },
    ),
  }),
  selectors: {
    selectSettingsOpen: ({ open }) => open,
    selectSettingsDocument: ({ doc }) => doc,
    selectSettingsWindow: ({ win }) => win,
  },
});

export const {
  openSettings,
  closeSettings,
  setDocumentSettings,
  setWindowSettings,
} = settingsSlice.actions;

export const {
  selectSettingsOpen,
  selectSettingsDocument,
  selectSettingsWindow,
} = settingsSlice.selectors;
