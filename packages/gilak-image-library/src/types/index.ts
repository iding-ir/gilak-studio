import type { ReactNode } from "react";

export type ImageLibraryView = "grid" | "list";

export type ImageItem = {
  id: string;
  name: string;
  resolution: string;
  size: string;
  src: string;
  updatedAt: string;
  fileName?: string;
};

export type ImageItemRenderer = (
  component: ReactNode,
  imageItem: ImageItem,
) => ReactNode;
