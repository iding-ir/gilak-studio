import { ConditionalWrapper } from "@gilak/components";

import type { ImageItem, ImageItemRenderer } from "../../types";
import styles from "./ItemCard.module.scss";

export type ItemCardProps = {
  image: ImageItem;
  isActive: boolean;
  itemRenderer?: ImageItemRenderer;
  onClick: (id: string) => void;
};

export const ItemCard = ({
  image,
  isActive,
  itemRenderer,
  onClick,
}: ItemCardProps) => {
  const { id, src, name, resolution, size } = image;

  return (
    <ConditionalWrapper
      condition={!!itemRenderer}
      wrapper={(children) => itemRenderer?.(children, image)}
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
            <p>{resolution}</p>
            <p>{size}</p>
          </figcaption>
        </figure>
      </button>
    </ConditionalWrapper>
  );
};
