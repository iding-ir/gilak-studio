import { useEffect } from "react";

import type { FloatingWindowMeta } from "../context/types";
import { useWindow } from "./useWindow";

export const useRegister = (win: FloatingWindowMeta) => {
  const { register, unregister } = useWindow(win.id);

  useEffect(() => {
    register(win);

    return () => {
      unregister();
    };
    // intentionally only depend on id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.id]);
};

export default useRegister;
