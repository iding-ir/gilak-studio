import { ConditionalWrapper } from "@gilak/components";
import type { ReactNode } from "react";

import type { ImageAsset } from "../../types";
import styles from "./ImageLibraryAssetCard.module.scss";

type ImageLibraryAssetCardProps = {
  asset: ImageAsset;
  isActive: boolean;
  itemRenderer?: (component: ReactNode, imageAsset: ImageAsset) => ReactNode;
  onClick: (id: string) => void;
};

export const ImageLibraryAssetCard = ({
  asset,
  isActive,
  itemRenderer,
  onClick,
}: ImageLibraryAssetCardProps) => {
  const { id, src, name, description, resolution, size } = asset;
  return (
    <ConditionalWrapper
      condition={!!itemRenderer}
      wrapper={(children) => itemRenderer?.(children, asset)}
    >
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
    </ConditionalWrapper>
  );
};
