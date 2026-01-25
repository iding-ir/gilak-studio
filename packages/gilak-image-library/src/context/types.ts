import type { Dispatch } from "react";

import type { ImageItem, ImageLibraryView } from "../types";
import type { Action } from "./actions";

export type ImageLibraryState = {
  images: ImageItem[];
  view: ImageLibraryView;
  activeImageId?: string;
};

export type ContextValue = {
  state: ImageLibraryState;
  dispatch: Dispatch<Action>;
};
