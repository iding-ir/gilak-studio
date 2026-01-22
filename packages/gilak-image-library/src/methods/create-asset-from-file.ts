import { t } from "@gilak/localization";

import type { ImageAsset } from "../types";
import { formatFileSizeLabel } from "./format-file-size-label";

export const createAssetFromFile = (
  file: File,
  friendlyName: string,
): Promise<ImageAsset> => {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      const resolution = `${width}x${height}`;

      resolve({
        id: `upload-${Date.now()}`,
        name: friendlyName,
        description: t("imageLibrary:upload.description"),
        resolution,
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
