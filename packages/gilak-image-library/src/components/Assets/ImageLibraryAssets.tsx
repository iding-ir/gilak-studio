import { List } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library";
import { t } from "@gilak/localization";

import { ImageLibraryAssetCard } from "../AssetCard/ImageLibraryAssetCard";
import styles from "./ImageLibraryAssets.module.scss";

export const ImageLibraryAssets = () => {
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
            onClick={() => selectAsset(asset.id)}
          />
        ))}
      />
    </div>
  );
};
