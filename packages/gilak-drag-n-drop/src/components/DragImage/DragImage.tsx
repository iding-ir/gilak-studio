import clsx from "clsx";
import { createPortal } from "react-dom";

import { useDragImage } from "../../hooks";
import styles from "./DragImage.module.scss";

export const DragImage = () => {
  const { isVisible, node, pointer, offset } = useDragImage();

  if (!isVisible || !pointer || !node) {
    return null;
  }

  return createPortal(
    <div
      className={clsx(styles.root)}
      style={{
        transform: `translate3D(
            calc(${pointer.x + (offset?.x ?? 0)}px - 50%),
            calc(${pointer.y + (offset?.y ?? 0)}px - 50%),
            0
        )`,
      }}
    >
      {node}
    </div>,
    document.body,
  );
};
