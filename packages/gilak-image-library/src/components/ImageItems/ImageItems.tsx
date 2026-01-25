import { List } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library";
import { t } from "@gilak/localization";

import type { ImageItemRenderer } from "../../types";
import { ItemCard } from "../ItemCard";
import styles from "./ImageItems.module.scss";

export type ImageItemsProps = {
  itemRenderer?: ImageItemRenderer;
};

export const ImageItems = ({ itemRenderer }: ImageItemsProps) => {
  const { images, activeImage, view, selectImage } = useImageLibrary();
  const isListView = view === "list";

  if (images.length === 0) {
    return (
      <div className={styles.empty} aria-live="polite">
        <p>{t("imageLibrary:empty.title")}</p>
        <p>{t("imageLibrary:empty.description")}</p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <List
        direction="column"
        count={isListView ? 1 : 2}
        variant="light-ghost"
        size="lg"
        frameless
        items={images.map((image) => (
          <ItemCard
            key={image.id}
            image={image}
            isActive={image.id === activeImage?.id}
            itemRenderer={itemRenderer}
            onClick={() => selectImage(image.id)}
          />
        ))}
      />
    </div>
  );
};
