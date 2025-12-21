import { useEffect } from "react";

import type { FloatingWindowType } from "../context";
import { useFloatingWindow } from "./useFloatingWindows";

export const useRegister = (win: FloatingWindowType) => {
  const { registerFloatingWindow, unregisterFloatingWindow } =
    useFloatingWindow(win.id);

  useEffect(() => {
    registerFloatingWindow(win);

    return () => {
      unregisterFloatingWindow();
    };
    // intentionally only depend on id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.id]);
};

export default useRegister;
