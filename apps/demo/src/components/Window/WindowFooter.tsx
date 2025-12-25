import { type CanvasHistory } from "@gilak/canvas";
import { Icon } from "@gilak/components";
import { ZoomSelector } from "@gilak/resizable-screen";
import type { RefObject } from "react";

import IconRedo from "../../assets/icon-redo.svg?url";
import IconUndo from "../../assets/icon-undo.svg?url";
import styles from "./WindowFooter.module.scss";

export const WindowFooter = ({
  canvasHistoryRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasHistoryRef: RefObject<CanvasHistory | null>;
}) => {
  return (
    <div className={styles.root}>
      <ZoomSelector />
      <div className={styles.undoRedo}>
        <Icon
          icon={IconUndo}
          interactive
          frameless
          variant="dark-ghost"
          onClick={() => canvasHistoryRef.current?.undo()}
        />
        <Icon
          icon={IconRedo}
          interactive
          frameless
          variant="dark-ghost"
          onClick={() => canvasHistoryRef.current?.redo()}
        />
      </div>
    </div>
  );
};
