import { IconButton } from "@gilak/components";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import { actions, useCanvasContext } from "../../context";
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
  onRemove?: (layer: CanvasLayer) => void;
  onMoveUp?: (layer: CanvasLayer) => void;
  onMoveDown?: (layer: CanvasLayer) => void;
};

export const LayerCard = ({
  layer,
  className,
  disableMoveUp = false,
  disableMoveDown = false,
  onRemove,
  onMoveUp,
  onMoveDown,
  ...props
}: LayerCardProps) => {
  const { dispatch } = useCanvasContext();

  const handleRemove = () => {
    dispatch(actions.removeLayer(layer.id));
    onRemove?.(layer);
  };

  const handleMoveUp = () => {
    dispatch(actions.moveLayerUp(layer.id));
    onMoveUp?.(layer);
  };

  const handleMoveDown = () => {
    dispatch(actions.moveLayerDown(layer.id));
    onMoveDown?.(layer);
  };

  const showLayer = () => {
    dispatch(actions.showLayer(layer.id));
  };

  const hideLayer = () => {
    dispatch(actions.hideLayer(layer.id));
  };

  return (
    <li {...props} className={clsx(styles.root, className)}>
      <div className={styles.info}>{layer.name}</div>
      <div className={styles.actions}>
        <IconButton
          icon={IconUp}
          size="sm"
          variant="light-ghost"
          onClick={handleMoveUp}
          disabled={disableMoveUp}
          aria-label="Move layer up"
        ></IconButton>
        <IconButton
          icon={IconDown}
          size="sm"
          variant="light-ghost"
          onClick={handleMoveDown}
          disabled={disableMoveDown}
          aria-label="Move layer down"
        />
        <IconButton
          size="sm"
          variant="light-ghost"
          icon={IconDelete}
          onClick={handleRemove}
          aria-label="Delete layer"
        />
        <IconButton
          size="sm"
          variant="light-ghost"
          icon={layer.visible ? IconShow : IconHide}
          onClick={layer.visible ? hideLayer : showLayer}
          aria-label={layer.visible ? "Hide layer" : "Show layer"}
        />
      </div>
    </li>
  );
};
