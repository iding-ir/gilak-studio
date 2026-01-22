import { List } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library";
import { t } from "@gilak/localization";
import type { ReactNode } from "react";

import type { ImageAsset } from "../../types";
import { ImageLibraryAssetCard } from "../AssetCard/ImageLibraryAssetCard";
import styles from "./ImageLibraryAssets.module.scss";

export type ImageLibraryAssetsProps = {
  itemRenderer?: (component: ReactNode, imafeAsset: ImageAsset) => ReactNode;
};

export const ImageLibraryAssets = ({
  itemRenderer,
}: ImageLibraryAssetsProps) => {
  const { assets, activeAsset, view, selectAsset } = useImageLibrary();
  const isListView = view === "list";

  if (assets.length === 0) {
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
        items={assets.map((asset) => (
          <ImageLibraryAssetCard
            key={asset.id}
            asset={asset}
            isActive={asset.id === activeAsset?.id}
            itemRenderer={itemRenderer}
            onClick={() => selectAsset(asset.id)}
          />
        ))}
      />
    </div>
  );
};
