import { ELEMENTS_PORTAL_ID } from "@gilak/canvas/constants";
import { Head } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";
import { type ComponentPropsWithoutRef } from "react";

import styles from "./Elements.module.scss";

export type ElementsProps = ComponentPropsWithoutRef<"section"> & {
  className?: string;
};

export const Elements = ({ className, ...props }: ElementsProps) => {
  return (
    <section {...props} className={clsx(styles.root, className)}>
      <Head>
        <span>{t("canvas:elements.header")}</span>
      </Head>
      <div className={styles.list} id={ELEMENTS_PORTAL_ID} />
    </section>
  );
};
