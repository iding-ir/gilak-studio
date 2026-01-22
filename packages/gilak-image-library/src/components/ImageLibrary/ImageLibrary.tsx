import { t } from "@gilak/localization";

import { ImageLibraryProvider } from "../../context";
import { ImageLibraryAssets } from "../Assets/ImageLibraryAssets";
import { ImageLibraryStats } from "../StatsBar/ImageLibraryStats";
import { ImageLibraryUpload } from "../UploadPanel/ImageLibraryUpload";
import styles from "./ImageLibrary.module.scss";

export const ImageLibrary = () => {
  return (
    <ImageLibraryProvider>
      <section className={styles.root} aria-label={t("imageLibrary:title")}>
        <ImageLibraryUpload />
        <ImageLibraryStats />
        <ImageLibraryAssets />
      </section>
    </ImageLibraryProvider>
  );
};
