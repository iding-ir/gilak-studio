import { IconButton } from "@gilak/components";
import { t } from "@gilak/localization";
import { createPortal } from "react-dom";

import { UNDO_REDO_PORTAL_ID } from "../../constants";
import { useCanvas } from "../../hooks/useCanvas";
import IconRedo from "./icons/icon-redo.svg?url";
import IconUndo from "./icons/icon-undo.svg?url";
import styles from "./UndoRedo.module.scss";

export const UndoRedo = () => {
  return <div className={styles.root} id={UNDO_REDO_PORTAL_ID} />;
};

export const UndoRedoPortal = () => {
  const { canRedo, canUndo, redo, undo } = useCanvas();

  return createPortal(
    <>
      <IconButton
        icon={IconUndo}
        tooltip={t("canvas:undoRedo.undo")}
        interactive
        frameless
        variant="primary"
        disabled={!canUndo}
        onClick={() => canUndo && undo()}
      />

      <IconButton
        icon={IconRedo}
        tooltip={t("canvas:undoRedo.redo")}
        interactive
        frameless
        variant="primary"
        disabled={!canRedo}
        onClick={() => canRedo && redo()}
      />
    </>,
    document.getElementById(UNDO_REDO_PORTAL_ID) as HTMLElement,
  );
};
