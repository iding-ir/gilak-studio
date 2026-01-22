import { useMemo } from "react";

import { useDragNDropContext } from "../context";

export const useDragImage = () => {
  const {
    state: { dragImage, pointer, pointerOffset, isDragging },
  } = useDragNDropContext();

  return useMemo(() => {
    return {
      isVisible: Boolean(isDragging && dragImage && pointer),
      node: dragImage?.node ?? null,
      pointer,
      offset: dragImage?.offset ?? pointerOffset ?? null,
    };
  }, [dragImage, isDragging, pointer, pointerOffset]);
};
