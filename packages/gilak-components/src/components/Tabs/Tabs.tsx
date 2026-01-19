import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";
import { Children, useId } from "react";

import { Button } from "../Button";
import styles from "./Tabs.module.scss";
import { useTabs } from "./useTabs";

export type TabsProps = {
  children: ReactNode;
  defaultIndex?: number;
  variant?: Variant;
  size?: TshirtSize;
  onChange?: (index: number) => void;
};

export const Tabs = ({
  children,
  defaultIndex,
  variant = "dark-ghost",
  size = "md",
  onChange,
}: TabsProps) => {
  const { active, setIndex } = useTabs({ defaultIndex, onChange });
  const baseId = useId();

  const tabs = Children.toArray(children).filter(Boolean) as ReactElement<{
    header: ReactNode;
    children: ReactNode;
    className?: string;
  }>[];

  return (
    <div className={styles.root}>
      <div
        className={styles.headers}
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map(({ props }, id) => {
          const isActive = id === active;
          const tabId = `${baseId}-tab-${id}`;
          const panelId = `${baseId}-panel-${id}`;

          return (
            <Button
              key={id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              variant={variant}
              size={size}
              frameless
              className={clsx(styles.header, styles[variant], styles[size], {
                [styles.active]: isActive,
              })}
              onClick={() => setIndex(id)}
            >
              {props.header}
            </Button>
          );
        })}
      </div>

      <div className={styles.bodies}>
        {tabs.map(({ props }, id) => {
          const isActive = id === active;
          const tabId = `${baseId}-tab-${id}`;
          const panelId = `${baseId}-panel-${id}`;

          return (
            <div
              key={id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              aria-hidden={!isActive}
              className={clsx(styles.body, props.className, {
                [styles.active]: isActive,
              })}
            >
              {props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};
