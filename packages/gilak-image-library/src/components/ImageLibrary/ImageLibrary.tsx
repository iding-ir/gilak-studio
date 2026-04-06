import { t } from "@gilak/localization";

import { ImageLibraryProvider } from "../../context";
import type { ImageItemRenderer } from "../../types/";
import { Controls } from "../Controls";
import { ImageItems } from "../ImageItems";
import { ImageUploader } from "../ImageUploader";
import styles from "./ImageLibrary.module.scss";

export type ImageLibraryProps = {
  itemRenderer?: ImageItemRenderer;
  autoSave?: boolean;
};

export const ImageLibrary = ({
  itemRenderer,
  autoSave = true,
}: ImageLibraryProps) => {
  return (
    <ImageLibraryProvider autoSave={autoSave}>
      <section className={styles.root} aria-label={t("imageLibrary:title")}>
        <Controls />
        <ImageUploader />
        <ImageItems itemRenderer={itemRenderer} />
      </section>
    </ImageLibraryProvider>
  );
};
