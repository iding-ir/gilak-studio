import { useMemo } from "react";

import { useImageLibraryContext } from "../context";
import { actions } from "../context/actions";
import { selectActiveAsset, selectStats } from "../context/selectors";
import type { ImageAsset, ImageLibraryView } from "../types";

export const useImageLibrary = () => {
  const { state, dispatch } = useImageLibraryContext();

  const activeAsset = useMemo(() => selectActiveAsset(state), [state]);
  const stats = useMemo(() => selectStats(state), [state]);

  const setView = (view: ImageLibraryView) => {
    dispatch(actions.setView(view));
  };

  const selectAsset = (id: string) => {
    dispatch(actions.selectAsset(id));
  };

  const addAsset = (asset: ImageAsset) => {
    dispatch(actions.addAsset(asset));
  };

  return {
    ...state,
    stats,
    activeAsset,
    setView,
    selectAsset,
    addAsset,
  };
};
