import type { CanvasLayer } from "@gilak/canvas/types";
import { Head } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import { LayerCard } from "../LayerCard";
import styles from "./Layers.module.scss";

export type LayersProps = ComponentPropsWithoutRef<"section"> & {
  layers: CanvasLayer[];
};

export const Layers = ({ className, layers = [], ...props }: LayersProps) => {
  return (
    <section {...props} className={clsx(styles.root, className)}>
      <Head>{t("canvas:layers.header")}</Head>
      {layers.length === 0 ? (
        <p className={styles.empty}>{t("canvas:layers.noLayers")}</p>
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
