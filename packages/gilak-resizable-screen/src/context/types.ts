import type { Dispatch } from "react";

export const zoomLevels = [10, 25, 50, 75, 100, 125, 150, 175, 200] as const;

export type ZoomLevel = (typeof zoomLevels)[number];

export type ContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
};

export type State = {
  zoomLevel: ZoomLevel;
};

export type Action = { type: "SET_ZOOM"; payload: ZoomLevel };
