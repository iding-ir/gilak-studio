import { t } from "@gilak/localization";

import { ImageLibraryProvider } from "../../context";
import type { ImageItemRenderer } from "../../types/";
import { Controls } from "../Controls";
import { ImageItems } from "../ImageItems";
import { ImageUploader } from "../ImageUploader";
import styles from "./ImageLibrary.module.scss";

export type ImageLibraryProps = {
  itemRenderer?: ImageItemRenderer;
};

export const ImageLibrary = ({ itemRenderer }: ImageLibraryProps) => {
  return (
    <ImageLibraryProvider>
      <section className={styles.root} aria-label={t("imageLibrary:title")}>
        <ImageUploader />
        <Controls />
        <ImageItems itemRenderer={itemRenderer} />
      </section>
    </ImageLibraryProvider>
  );
};
