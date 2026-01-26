import { Button } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library";
import { t } from "@gilak/localization";

import { useImageUploader } from "../../hooks/useImageUploader";
import styles from "./ImageUploader.module.scss";

export const ImageUploader = () => {
  const { addImage } = useImageLibrary();
  const {
    fileInputRef,
    handleFileChange,
    handleUploadClick,
    isUploading,
    maxFileSizeMb,
    uploadMessageText,
  } = useImageUploader(addImage);

  return (
    <div className={styles.root}>
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
