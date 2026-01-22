import type { ImageAsset } from "../../types";
import styles from "./ImageLibraryAssetCard.module.scss";

type ImageLibraryAssetCardProps = {
  asset: ImageAsset;
  isActive: boolean;
  onClick: (id: string) => void;
};

export const ImageLibraryAssetCard = ({
  asset: { id, name, description, resolution, size, src },
  isActive,
  onClick,
}: ImageLibraryAssetCardProps) => {
  return (
    <button
      type="button"
      className={styles.root}
      onClick={() => onClick(id)}
      aria-pressed={isActive}
    >
      <figure>
        <img src={src} alt={name} loading="lazy" />
        <figcaption>
          <p>{name}</p>
          <p>{description}</p>
          <p>{resolution}</p>
          <p>{size}</p>
        </figcaption>
      </figure>
    </button>
  );
};
