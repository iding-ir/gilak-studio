import { selectFocusedElement } from "@gilak/canvas";
import type { IconProps } from "@gilak/components";
import { IconButton } from "@gilak/components";
import { DragWrapper } from "@gilak/drag-n-drop";
import { t } from "@gilak/localization";
import clsx from "clsx";
import { type MouseEvent, useState } from "react";

import { CANVAS_ELEMENT_DRAG_TYPE } from "../../constants";
import { useCanvas } from "../../hooks/useCanvas";
import type { CanvasElement } from "../../types/canvas";
import styles from "./ElementCard.module.scss";
import { ElementInfo } from "./ElementInfo";
import IconDelete from "./icons/icon-delete.svg?url";
import IconHide from "./icons/icon-hide.svg?url";
import IconShow from "./icons/icon-show.svg?url";

export type ElementCardProps = {
  element: CanvasElement;
};

export const ElementCard = ({ element }: ElementCardProps) => {
  const { id, visible } = element;
  const [isDragging, setIsDragging] = useState(false);
  const { state, removeElement, showElement, hideElement, focusElement } =
    useCanvas();

  const selectedElementId = selectFocusedElement(state)?.id;

  const options = {
    size: "sm",
    variant: "light-ghost",
  } as Partial<IconProps<"button">>;

  const handleClick = () => {
    focusElement(id);
  };

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removeElement(id);
  };

  const handleToggleVisibility = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (visible) {
      hideElement(id);
    } else {
      showElement(id);
    }
  };

  return (
    <li
      className={clsx(styles.root, {
        [styles.focused]: selectedElementId === id,
        [styles.dragging]: isDragging,
      })}
      onClick={handleClick}
    >
      <DragWrapper
        dragId={id}
        data={element}
        dragType={CANVAS_ELEMENT_DRAG_TYPE}
        dragImageRenderer={({ data }) => (
          <div className={styles.dragPreview}>
            <ElementInfo element={data} />
          </div>
        )}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <div className={styles.info}>
          <ElementInfo element={element} />
        </div>
      </DragWrapper>
      <div className={styles.actions}>
        <IconButton
          icon={IconDelete}
          {...options}
          onClick={handleRemove}
          aria-label={t("canvas:elements.delete")}
        />
        <IconButton
          icon={visible ? IconShow : IconHide}
          {...options}
          onClick={handleToggleVisibility}
          aria-label={
            visible ? t("canvas:elements.hide") : t("canvas:elements.show")
          }
        />
      </div>
    </li>
  );
};
