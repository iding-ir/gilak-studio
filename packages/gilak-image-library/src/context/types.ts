import type { Dispatch } from "react";

import type { ImageAsset, ImageLibraryView } from "../types";
import type { Action } from "./actions";

export type ImageLibraryState = {
  assets: ImageAsset[];
  view: ImageLibraryView;
  activeAssetId?: string;
};

export type ContextValue = {
  state: ImageLibraryState;
  dispatch: Dispatch<Action>;
};
