import { Head } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";
import { type ComponentPropsWithoutRef } from "react";

import { ELEMENTS_PORTAL_ID } from "../../constants";
import styles from "./Elements.module.scss";

export type ElementsProps = ComponentPropsWithoutRef<"section"> & {
  className?: string;
};

export const Elements = ({ className, ...props }: ElementsProps) => {
  return (
    <section {...props} className={clsx(styles.root, className)}>
      <Head variant="dark">
        <span>{t("canvas:elements.header")}</span>
      </Head>
      <div className={styles.elements} id={ELEMENTS_PORTAL_ID} />
    </section>
  );
};
