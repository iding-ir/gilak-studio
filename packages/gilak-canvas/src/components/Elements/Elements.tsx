import { Head } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";
import { type ComponentPropsWithoutRef } from "react";
import { createPortal } from "react-dom";

import { ELEMENTS_PORTAL_ID } from "../../constants";
import { selectElements } from "../../context";
import { useCanvas } from "../../hooks/useCanvas";
import { ElementCard } from "../ElementCard";
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

export const ElementsPortal = () => {
  return createPortal(
    <ElementList />,
    document.getElementById(ELEMENTS_PORTAL_ID) as HTMLElement,
  );
};

const ElementList = () => {
  const { state } = useCanvas();
  const elements = selectElements(state);

  return elements.length === 0 ? (
    <p className={styles.empty}>{t("canvas:elements.noElements")}</p>
  ) : (
    <ul className={styles.list}>
      {[...elements].reverse().map((element, index) => (
        <ElementCard
          key={element.id}
          element={element}
          disableMoveUp={index === 0}
          disableMoveDown={index === elements.length - 1}
        />
      ))}
    </ul>
  );
};
