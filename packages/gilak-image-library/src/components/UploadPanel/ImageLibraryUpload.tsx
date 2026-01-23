import { Button } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library";
import { t } from "@gilak/localization";

import { useImageUpload } from "../../hooks/useImageUpload";
import styles from "./ImageLibraryUpload.module.scss";

export const ImageLibraryUpload = () => {
  const { addAsset } = useImageLibrary();
  const {
    fileInputRef,
    handleFileChange,
    handleUploadClick,
    isUploading,
    maxFileSizeMb,
    uploadMessageText,
  } = useImageUpload(addAsset);

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <Button
          type="button"
          className={styles.button}
          fullWidth
          onClick={handleUploadClick}
          disabled={isUploading}
          aria-busy={isUploading}
        >
          {isUploading
            ? t("imageLibrary:upload.buttonUploading")
            : t("imageLibrary:upload.button")}
        </Button>

        <p className={styles.message} aria-live="polite">
          {uploadMessageText}
        </p>
      </div>
      <p className={styles.hint}>
        {t("imageLibrary:upload.supported", { size: maxFileSizeMb })}
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.input}
        onChange={handleFileChange}
        multiple
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
};
