import { useLayers } from "@gilak/canvas/hooks/useLayers";
import { IconButton } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import type { CanvasLayer } from "../../types";
import IconDelete from "./icons/icon-delete.svg?url";
import IconDown from "./icons/icon-down.svg?url";
import IconHide from "./icons/icon-hide.svg?url";
import IconShow from "./icons/icon-show.svg?url";
import IconUp from "./icons/icon-up.svg?url";
import styles from "./LayerCard.module.scss";

export type LayerCardProps = ComponentPropsWithoutRef<"li"> & {
  layer: CanvasLayer;
  disableMoveUp?: boolean;
  disableMoveDown?: boolean;
};

export const LayerCard = ({
  layer,
  className,
  disableMoveUp = false,
  disableMoveDown = false,

  ...props
}: LayerCardProps) => {
  const { id, name, visible } = layer;
  const { moveLayerUp, moveLayerDown, removeLayer, showLayer, hideLayer } =
    useLayers();

  return (
    <li {...props} className={clsx(styles.root, className)}>
      <div className={styles.info}>{name}</div>
      <div className={styles.actions}>
        <IconButton
          icon={IconUp}
          size="sm"
          variant="light-ghost"
          onClick={() => moveLayerUp({ id })}
          disabled={disableMoveUp}
          aria-label={t("canvas:layers.moveUp")}
        ></IconButton>
        <IconButton
          icon={IconDown}
          size="sm"
          variant="light-ghost"
          onClick={() => moveLayerDown({ id })}
          disabled={disableMoveDown}
          aria-label={t("canvas:layers.moveDown")}
        />
        <IconButton
          icon={IconDelete}
          size="sm"
          variant="light-ghost"
          onClick={() => removeLayer({ id })}
          aria-label={t("canvas:layers.delete")}
        />
        <IconButton
          icon={visible ? IconShow : IconHide}
          size="sm"
          variant="light-ghost"
          onClick={() => (visible ? hideLayer({ id }) : showLayer({ id }))}
          aria-label={
            visible ? t("canvas:layers.hide") : t("canvas:layers.show")
          }
        />
      </div>
    </li>
  );
};
