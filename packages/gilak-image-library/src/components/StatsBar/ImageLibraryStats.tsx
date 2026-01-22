import { Button } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library/hooks";
import { t } from "@gilak/localization";

import type { ImageLibraryView } from "../../types";
import styles from "./ImageLibraryStats.module.scss";

const VIEW_OPTIONS: { id: ImageLibraryView; labelKey: string }[] = [
  { id: "grid", labelKey: "imageLibrary:view.grid" },
  { id: "list", labelKey: "imageLibrary:view.list" },
];

export const ImageLibraryStats = () => {
  const { stats, view, setView } = useImageLibrary();

  return (
    <div className={styles.root}>
      <span className={styles.count}>
        {t("imageLibrary:stats.visible", stats)}
      </span>
      <div
        className={styles.toggle}
        role="group"
        aria-label={t("imageLibrary:view.label")}
      >
        {VIEW_OPTIONS.map(({ id, labelKey }) => {
          const isSelected = view === id;

          return (
            <Button
              key={id}
              type="button"
              className={styles.button}
              variant={isSelected ? "primary" : "light-ghost"}
              onClick={() => setView(id)}
              data-active={isSelected}
              aria-pressed={isSelected}
            >
              {t(labelKey)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
