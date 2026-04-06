import { blobToDataUrl, loadImageFromSrc, randomId } from "@gilak/utils";

import type { ImageItem } from "../types";
import { formatFileSizeLabel } from "./format-file-size-label";

export const createAssetFromFile = async (
  file: File,
  friendlyName: string,
): Promise<ImageItem> => {
  const src = await blobToDataUrl(file);
  const image = await loadImageFromSrc(src);

  return {
    id: randomId({ prefix: "upload-" }),
    name: friendlyName,
    resolution: `${image.naturalWidth}x${image.naturalHeight}`,
    size: formatFileSizeLabel(file.size),
    src,
    updatedAt: new Date().toISOString().split("T")[0],
    fileName: file.name,
  };
};
