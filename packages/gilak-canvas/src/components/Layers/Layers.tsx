import { Button } from "@gilak/components";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import { selectLayers } from "../../context";
import { actions, useCanvasContext } from "../../context";
import { LayerCard } from "../LayerCard";
import styles from "./Layers.module.scss";

export type LayersProps = ComponentPropsWithoutRef<"section"> & {
  emptyLabel?: string;
};

export const Layers = ({
  emptyLabel = "No layers yet",
  className,
  ...props
}: LayersProps) => {
  const { state, dispatch } = useCanvasContext();
  const layers = selectLayers(state);

  const handleAddLayer = () => {
    dispatch(
      actions.addLayer({
        id: new Date().getTime().toString(),
        name: `Layer ${layers.length + 1}`,
        visible: true,
      }),
    );
  };

  return (
    <section {...props} className={clsx(styles.root, className)}>
      <div className={styles.header}>
        <Button type="button" onClick={handleAddLayer} className={styles.root}>
          Add Layer
        </Button>
      </div>

      {layers.length === 0 ? (
        <p className={styles.empty}>{emptyLabel}</p>
      ) : (
        <ul className={styles.list}>
          {layers.map((layer, index) => (
            <LayerCard
              key={layer.id}
              layer={layer}
              disableMoveUp={index === 0}
              disableMoveDown={index === layers.length - 1}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
