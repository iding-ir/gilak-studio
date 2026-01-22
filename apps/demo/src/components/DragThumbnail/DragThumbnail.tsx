import type { ImageAsset } from "@gilak/image-library";

import styles from "./DragThumbnail.module.scss";

export type DragThumbnailProps = {
  data: ImageAsset;
};

export const DragThumbnail = ({ data: { src, name } }: DragThumbnailProps) => {
  return (
    <div className={styles.root}>
      <img src={src} alt={name} />
    </div>
  );
};
