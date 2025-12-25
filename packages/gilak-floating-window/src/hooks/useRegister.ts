import { useEffect } from "react";

import type { FloatingWindowType } from "../context";
import { useFloatingWindows } from "./useFloatingWindows";

export const useRegister = (win: FloatingWindowType) => {
  const { windows, registerFloatingWindow } = useFloatingWindows();

  useEffect(() => {
    if (!windows[win.id]) registerFloatingWindow(win);
    // intentionally only depend on id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
