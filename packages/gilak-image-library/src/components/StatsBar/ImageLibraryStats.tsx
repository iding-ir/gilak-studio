import { Toggle } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library/hooks";
import { t } from "@gilak/localization";

import type { ImageLibraryView } from "../../types";
import styles from "./ImageLibraryStats.module.scss";

export const ImageLibraryStats = () => {
  const { stats, view, setView } = useImageLibrary();

  return (
    <div className={styles.root}>
      <span className={styles.count}>
        {t("imageLibrary:stats.visible", stats)}
      </span>

      <Toggle
        options={[
          { id: "grid", label: t("imageLibrary:view.grid") },
          { id: "list", label: t("imageLibrary:view.list") },
        ]}
        rounded
        variant="primary"
        size="md"
        fullWidth={false}
        alignment="center"
        frameless={false}
        disabled={false}
        className={styles.toggle}
        selected={view}
        onChange={(id) => setView(id as ImageLibraryView)}
      />
    </div>
  );
};
