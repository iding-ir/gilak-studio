import { useMemo } from "react";

import { useImageLibraryContext } from "../context";
import { actions } from "../context/actions";
import { selectActiveImage, selectStats } from "../context/selectors";
import type { ImageItem, ImageLibraryView } from "../types";

export const useImageLibrary = () => {
  const { state, dispatch } = useImageLibraryContext();

  const activeImage = useMemo(() => selectActiveImage(state), [state]);
  const stats = useMemo(() => selectStats(state), [state]);

  const setView = (view: ImageLibraryView) => {
    dispatch(actions.setView(view));
  };

  const selectImage = (id: string) => {
    dispatch(actions.selectImage(id));
  };

  const addImage = (image: ImageItem) => {
    dispatch(actions.addImage(image));
  };

  return {
    ...state,
    stats,
    activeImage,
    setView,
    selectImage,
    addImage,
  };
};
