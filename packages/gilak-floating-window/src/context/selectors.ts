import type { State } from "./state";

export const selectFloatingWindows = ({ windows }: State) => {
  return Array.from(windows.values());
};

export const selectFloatingWindowById = ({ windows }: State, id: string) => {
  return windows.get(id);
};

export const selectOpenWindows = ({ windows }: State) => {
  return Array.from(windows.values()).filter((w) => w.status === "open");
};

export const selectMaximizedWindows = ({ windows }: State) => {
  return Array.from(windows.values()).filter((w) => w.status === "maximized");
};

export const selectMinimizedWindows = ({ windows }: State) => {
  return Array.from(windows.values()).filter((w) => w.status === "minimized");
};

export const hasMinimizedWindows = ({ windows }: State) => {
  return Array.from(windows.values()).some((w) => w.status === "minimized");
};

export const selectFocusedWindow = ({ windows }: State) => {
  return Array.from(windows.values()).reduce((prev, current) =>
    prev.zIndex > current.zIndex ? prev : current,
  );
};
