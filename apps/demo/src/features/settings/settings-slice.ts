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

type PersistSettings = {
  autoSaveEnabled: boolean;
};

export interface SettingsState {
  open: boolean;
  doc: DocumentSettings;
  win: WindowSettings;
  persist: PersistSettings;
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
  persist: {
    autoSaveEnabled: true,
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
    setDocumentSize: create.reducer(
      (state, { payload }: PayloadAction<Size>) => {
        state.doc.size = payload;
      },
    ),
    setWindowSize: create.reducer((state, { payload }: PayloadAction<Size>) => {
      state.win.size = payload;
    }),
    setAutoSaveEnabled: create.reducer(
      (state, { payload }: PayloadAction<boolean>) => {
        state.persist.autoSaveEnabled = payload;
      },
    ),
  }),
  selectors: {
    selectSettingsOpen: ({ open }) => open,
    selectSettingsDocument: ({ doc }) => doc,
    selectSettingsWindow: ({ win }) => win,
    selectSettingsAutoSaveEnabled: ({ persist }) => persist.autoSaveEnabled,
  },
});

export const {
  openSettings,
  closeSettings,
  setDocumentSize,
  setWindowSize,
  setAutoSaveEnabled,
} = settingsSlice.actions;

export const {
  selectSettingsOpen,
  selectSettingsDocument,
  selectSettingsWindow,
  selectSettingsAutoSaveEnabled,
} = settingsSlice.selectors;
