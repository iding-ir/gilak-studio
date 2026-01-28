import { useCanvas } from "@gilak/canvas";
import { IconButton } from "@gilak/components";
import { t } from "@gilak/localization";
import { ZoomSelector } from "@gilak/resizable-screen";

import IconRedo from "../../assets/icon-redo.svg?url";
import IconUndo from "../../assets/icon-undo.svg?url";
import styles from "./WindowFooter.module.scss";

export const WindowFooter = () => {
  const { canRedo, canUndo, redo, undo } = useCanvas();

  return (
    <div className={styles.root}>
      <ZoomSelector />
      <div className={styles.undoRedo}>
        <IconButton
          icon={IconUndo}
          tooltip={t("app:undo")}
          interactive
          frameless
          variant="dark-ghost"
          disabled={!canUndo}
          onClick={() => canUndo && undo()}
        />

        <IconButton
          icon={IconRedo}
          tooltip={t("app:redo")}
          interactive
          frameless
          variant="dark-ghost"
          disabled={!canRedo}
          onClick={() => canRedo && redo()}
        />
      </div>
    </div>
  );
};
