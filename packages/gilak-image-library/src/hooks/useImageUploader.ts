import { t } from "@gilak/localization";
import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";

import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from "../constants";
import { createAssetFromFile } from "../methods/create-asset-from-file";
import { getDisplayName } from "../methods/get-display-name";
import type { ImageItem } from "../types";

type UploadMessage = {
  key: string;
  params?: Record<string, string | number>;
};

export const useImageUploader = (addAsset: (asset: ImageItem) => void) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadMessage, setUploadMessage] = useState<UploadMessage>({
    key: "imageLibrary:upload.status.idle",
  });
  const [isUploading, setIsUploading] = useState(false);

  const resolveAssetName = useCallback((file: File) => {
    const sanitized = getDisplayName(file.name);
    if (sanitized.length) return sanitized;
    return t("imageLibrary:upload.fallbackName");
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setUploadMessage({ key: "imageLibrary:upload.error.type" });
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setUploadMessage({
          key: "imageLibrary:upload.error.size",
          params: { size: MAX_FILE_SIZE_MB },
        });
        return;
      }

      const friendlyName = resolveAssetName(file);
      setIsUploading(true);
      setUploadMessage({
        key: "imageLibrary:upload.status.uploading",
        params: { name: friendlyName },
      });

      try {
        const asset = await createAssetFromFile(file, friendlyName);
        addAsset(asset);
        setUploadMessage({
          key: "imageLibrary:upload.status.success",
          params: { name: asset.name },
        });
      } catch (error) {
        setUploadMessage({ key: "imageLibrary:upload.error.generic" });
      } finally {
        setIsUploading(false);
      }
    },
    [addAsset, resolveAssetName],
  );

  const uploadMessageText = t(uploadMessage.key, uploadMessage.params);

  return {
    fileInputRef,
    isUploading,
    uploadMessageText,
    handleUploadClick,
    handleFileChange,
    maxFileSizeMb: MAX_FILE_SIZE_MB,
  };
};
