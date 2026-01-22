import { t } from "@gilak/localization";
import type { ReactNode } from "react";

import { ImageLibraryProvider } from "../../context";
import type { ImageAsset } from "../../types/";
import { ImageLibraryAssets } from "../Assets/ImageLibraryAssets";
import { ImageLibraryStats } from "../StatsBar/ImageLibraryStats";
import { ImageLibraryUpload } from "../UploadPanel/ImageLibraryUpload";
import styles from "./ImageLibrary.module.scss";

export type ImageLibraryProps = {
  itemRenderer?: (component: ReactNode, imageAsset: ImageAsset) => ReactNode;
};

export const ImageLibrary = ({ itemRenderer }: ImageLibraryProps) => {
  return (
    <ImageLibraryProvider>
      <section className={styles.root} aria-label={t("imageLibrary:title")}>
        <ImageLibraryUpload />
        <ImageLibraryStats />
        <ImageLibraryAssets itemRenderer={itemRenderer} />
      </section>
    </ImageLibraryProvider>
  );
};
