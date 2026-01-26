import { randomId } from "@gilak/utils";

import type { ImageItem } from "../types";
import { formatFileSizeLabel } from "./format-file-size-label";

export const createAssetFromFile = (
  file: File,
  friendlyName: string,
): Promise<ImageItem> => {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      resolve({
        id: randomId({ prefix: "upload-" }),
        name: friendlyName,
        resolution: `${image.naturalWidth}x${image.naturalHeight}`,
        size: formatFileSizeLabel(file.size),
        src: objectUrl,
        updatedAt: new Date().toISOString().split("T")[0],
        fileName: file.name,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to load image"));
    };

    image.src = objectUrl;
  });
};
