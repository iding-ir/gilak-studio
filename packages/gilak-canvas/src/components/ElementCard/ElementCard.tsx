import type { IconProps } from "@gilak/components";
import { Icon, IconButton } from "@gilak/components";
import { t } from "@gilak/localization";

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
    moveElementUp,
    moveElementDown,
    removeElement,
    showElement,
    hideElement,
  } = useCanvas();

  const options = {
    size: "sm",
    variant: "light-ghost",
  } as Partial<IconProps<"button">>;

  return (
    <li {...props} className={styles.root}>
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
          onClick={() => moveElementUp(id)}
          disabled={disableMoveUp}
          aria-label={t("canvas:elements.moveUp")}
        ></IconButton>
        <IconButton
          icon={IconDown}
          {...options}
          onClick={() => moveElementDown(id)}
          disabled={disableMoveDown}
          aria-label={t("canvas:elements.moveDown")}
        />
        <IconButton
          icon={IconDelete}
          {...options}
          onClick={() => removeElement(id)}
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
