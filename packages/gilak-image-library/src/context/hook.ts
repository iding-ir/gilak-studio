import { use } from "react";

import { ImageLibraryContext } from "./context";

export const useImageLibraryContext = () => {
  const context = use(ImageLibraryContext);

  if (!context) {
    throw new Error(
      "ImageLibrary components must be wrapped with ImageLibraryProvider",
    );
  }

  return context;
};
