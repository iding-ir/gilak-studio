import { useCallback } from "react";

import { actions } from "../context/actions";
import { useFloatingWindowContext } from "../context/hook";
import type { FloatingWindowType } from "../context/types";

export const useFloatingWindows = () => {
  const { state, dispatch } = useFloatingWindowContext();
  const window = state.windows;

  const registerFloatingWindow = useCallback(
    (window: FloatingWindowType) =>
      dispatch(actions.registerFloatingWindow(window)),
    [dispatch],
  );

  const setFocusedFloatingWindow = useCallback(
    (id: string) => dispatch(actions.setFocusedFloatingWindow(id)),
    [dispatch],
  );

  return {
    ...window,
    registerFloatingWindow,
    setFocusedFloatingWindow,
  };
};
