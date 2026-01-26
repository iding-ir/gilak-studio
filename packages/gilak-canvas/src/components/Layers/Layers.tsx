import { Head } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import { selectLayers } from "../../context";
import { useCanvasContext } from "../../context";
import { LayerCard } from "../LayerCard";
import styles from "./Layers.module.scss";

export type LayersProps = ComponentPropsWithoutRef<"section">;

export const Layers = ({ className, ...props }: LayersProps) => {
  const { state } = useCanvasContext();
  const layers = selectLayers(state);

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
