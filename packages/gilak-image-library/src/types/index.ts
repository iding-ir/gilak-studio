export type ImageLibraryView = "grid" | "list";

export type ImageAsset = {
  id: string;
  name: string;
  description: string;
  resolution: string;
  size: string;
  src: string;
  updatedAt: string;
  fileName?: string;
};
