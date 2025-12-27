import { type CanvasHistory } from "@gilak/canvas";
import { Icon } from "@gilak/components";
import { t } from "@gilak/localization";
import { ZoomSelector } from "@gilak/resizable-screen";

import IconRedo from "../../assets/icon-redo.svg?url";
import IconUndo from "../../assets/icon-undo.svg?url";
import styles from "./WindowFooter.module.scss";

export const WindowFooter = ({ history }: { history: CanvasHistory }) => {
  const { undo, redo, canUndo, canRedo } = history;

  return (
    <div className={styles.root}>
      <ZoomSelector />
      <div className={styles.undoRedo}>
        <Icon
          icon={IconUndo}
          label={t("app:undo")}
          interactive
          frameless
          variant="dark-ghost"
          disabled={!canUndo}
          onClick={() => canUndo && undo()}
        />

        <Icon
          icon={IconRedo}
          label={t("app:redo")}
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
