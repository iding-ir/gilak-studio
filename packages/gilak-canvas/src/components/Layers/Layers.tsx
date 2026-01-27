import { useLayers } from "@gilak/canvas";
import type { CanvasLayer } from "@gilak/canvas/types";
import { Button, Head } from "@gilak/components";
import { t } from "@gilak/localization";
import { randomId } from "@gilak/utils";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import { LayerCard } from "../LayerCard";
import styles from "./Layers.module.scss";

export type LayersProps = ComponentPropsWithoutRef<"section"> & {
  className?: string;
  documentId?: string;
  layers: CanvasLayer[];
};

export const Layers = ({
  className,
  documentId,
  layers = [],
  ...props
}: LayersProps) => {
  const { addLayer } = useLayers();

  const handleAddLayer = () => {
    const newLayer: CanvasLayer = {
      id: randomId({ prefix: "layer-" }),
      documentId: documentId || "",
      name: t("canvas:layers.defaultLayerName", { number: layers.length + 1 }),
      visible: true,
      focused: true,
      selected: false,
      content: [],
    };
    addLayer(newLayer);
  };

  return (
    <section {...props} className={clsx(styles.root, className)}>
      <Head>
        <span>{t("canvas:layers.header")}</span>
        <Button
          size="sm"
          variant="primary"
          disabled={!documentId}
          onClick={handleAddLayer}
        >
          {t("canvas:layers.addLayer")}
        </Button>
      </Head>
      {layers.length === 0 ? (
        <p className={styles.empty}>{t("canvas:layers.noLayers")}</p>
      ) : (
        <ul className={styles.list}>
          {[...layers].reverse().map((layer, index) => (
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
