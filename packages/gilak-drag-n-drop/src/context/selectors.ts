import type { State } from "./state";

export const selectIsDragging = ({ isDragging }: State) => isDragging;

export const selectPointer = ({ pointer }: State) => pointer;

export const selectDropZoneId = ({ dropZoneId }: State) => dropZoneId;

export const selectDragData = ({ data }: State) => data;

export const selectDragType = ({ dragType }: State) => dragType;

export const selectDragId = ({ dragId }: State) => dragId;

export const selectDragImage = ({ dragImage }: State) => dragImage;
