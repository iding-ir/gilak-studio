import { useCallback } from "react";

import { actions } from "../context/actions";
import { useFloatingWindowContext } from "../context/hook";
import type { FloatingWindowType } from "../context/types";

export const useFloatingWindows = () => {
  const {
    state: { windows },
    dispatch,
  } = useFloatingWindowContext();

  const registerFloatingWindow = useCallback(
    (window: FloatingWindowType) =>
      dispatch(actions.registerFloatingWindow(window)),
    [dispatch],
  );

  const focusFloatingWindow = useCallback(
    (id: string) => dispatch(actions.focusFloatingWindow(id)),
    [dispatch],
  );

  return {
    windows,
    registerFloatingWindow,
    focusFloatingWindow,
  };
};
