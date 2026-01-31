import { selectFocusedElement } from "@gilak/canvas";
import type { IconProps } from "@gilak/components";
import { Icon, IconButton } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";

import { useCanvas } from "../../hooks/useCanvas";
import type { CanvasElement } from "../../types/canvas";
import styles from "./ElementCard.module.scss";
import IconDelete from "./icons/icon-delete.svg?url";
import IconDown from "./icons/icon-down.svg?url";
import IconDrawing from "./icons/icon-drawing.svg?url";
import IconHide from "./icons/icon-hide.svg?url";
import IconImage from "./icons/icon-image.svg?url";
import IconShow from "./icons/icon-show.svg?url";
import IconText from "./icons/icon-text.svg?url";
import IconUp from "./icons/icon-up.svg?url";

const typeIcons: Record<CanvasElement["type"], string> = {
  image: IconImage,
  drawing: IconDrawing,
  text: IconText,
};

export type ElementCardProps = {
  element: CanvasElement;
  disableMoveUp?: boolean;
  disableMoveDown?: boolean;
};

export const ElementCard = ({
  element,
  disableMoveUp = false,
  disableMoveDown = false,
  ...props
}: ElementCardProps) => {
  const { id, visible } = element;
  const {
    state,
    moveElementUp,
    moveElementDown,
    removeElement,
    showElement,
    hideElement,
    focusElement,
  } = useCanvas();

  const selectedElementId = selectFocusedElement(state)?.id;

  const options = {
    size: "sm",
    variant: "light-ghost",
  } as Partial<IconProps<"button">>;

  const handleClick = () => {
    focusElement(id);
  };

  const handleMoveUp = (event: React.MouseEvent) => {
    event.stopPropagation();
    moveElementUp(id);
  };

  const handleMoveDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    moveElementDown(id);
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    removeElement(id);
  };

  return (
    <li
      {...props}
      className={clsx(styles.root, {
        [styles.focused]: selectedElementId === id,
      })}
      onClick={handleClick}
    >
      <div className={styles.info}>
        <Icon
          icon={typeIcons[element.type]}
          size="sm"
          variant="light-ghost"
          frameless
          interactive={false}
        />
        {id}
      </div>
      <div className={styles.actions}>
        <IconButton
          icon={IconUp}
          {...options}
          onClick={handleMoveUp}
          disabled={disableMoveUp}
          aria-label={t("canvas:elements.moveUp")}
        ></IconButton>
        <IconButton
          icon={IconDown}
          {...options}
          onClick={handleMoveDown}
          disabled={disableMoveDown}
          aria-label={t("canvas:elements.moveDown")}
        />
        <IconButton
          icon={IconDelete}
          {...options}
          onClick={handleRemove}
          aria-label={t("canvas:elements.delete")}
        />
        <IconButton
          icon={visible ? IconShow : IconHide}
          {...options}
          onClick={() => (visible ? hideElement(id) : showElement(id))}
          aria-label={
            visible ? t("canvas:elements.hide") : t("canvas:elements.show")
          }
        />
      </div>
    </li>
  );
};
