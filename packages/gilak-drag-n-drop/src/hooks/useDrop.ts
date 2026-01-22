import { useMemo } from "react";

import { useDragNDropContext } from "../context";
import { matchesAccepts } from "../methods/matches-accepts";
import type { Point } from "../types";

export type UseDropParams = {
  zoneId: string;
  accepts?: string[];
  disabled?: boolean;
};

export type UseDropResult<TData> = {
  data?: TData;
  dragId?: string;
  dragType?: string;
  dropZoneId?: string;
  pointer?: Point;
  isDragging: boolean;
  isActive: boolean;
  canDrop: boolean;
};

export const useDrop = <TData>({
  zoneId,
  accepts,
  disabled = false,
}: UseDropParams): UseDropResult<TData> => {
  const { state } = useDragNDropContext();

  const canDrop = useMemo(() => {
    if (disabled) return false;
    if (!state.isDragging) return false;

    return matchesAccepts(state.dragType, accepts);
  }, [accepts, disabled, state.dragType, state.isDragging]);

  const isActive = canDrop && state.dropZoneId === zoneId;

  return {
    data: state.data as TData | undefined,
    dragId: state.dragId,
    dragType: state.dragType,
    dropZoneId: state.dropZoneId,
    pointer: state.pointer,
    isDragging: state.isDragging,
    isActive,
    canDrop,
  };
};
