import { DropZone } from "@gilak/drag-n-drop";
import { useRef } from "react";

import { CANVAS_ELEMENT_DRAG_TYPE } from "../../constants";
import type { CanvasElement } from "../../types/canvas";
import styles from "./Elements.module.scss";

export const ElementDropIndicator = ({
  zoneId,
  onDrop,
}: {
  zoneId: string;
  onDrop: (element: CanvasElement) => void;
}) => {
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <DropZone<CanvasElement>
      zoneId={zoneId}
      ref={ref}
      accepts={[CANVAS_ELEMENT_DRAG_TYPE]}
      activeClassName={styles.activeDropZone}
      onDrop={({ data }) => {
        if (!data) return;
        onDrop(data);
      }}
    >
      <li ref={ref} className={styles.dropZone} aria-hidden>
        <span className={styles.divider} />
      </li>
    </DropZone>
  );
};
