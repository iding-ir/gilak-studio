import type { TshirtSize } from "@gilak/components/types";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { Children } from "react";

import { Body } from "./components/Body";
import { Header } from "./components/Header";
import styles from "./Tabs.module.scss";
import { useTabs } from "./useTabs";

export type TabsProps = {
  children: ReactNode;
  defaultIndex?: number;
  size?: TshirtSize;
  onChange?: (index: number) => void;
};

export const Tabs = ({
  children,
  defaultIndex,
  size = "md",
  onChange,
}: TabsProps) => {
  const { active, setIndex } = useTabs({ defaultIndex, onChange });

  const tabs = Children.toArray(children).filter(Boolean) as ReactElement<{
    header: ReactNode;
    children: ReactNode;
    className?: string;
  }>[];

  return (
    <div
      className={styles.root}
      style={
        {
          "--prop-control-size": `var(--icon-size-${size})`,
          "--prop-font-size": `var(--font-size-${size})`,
          "--prop-spacing-size": `var(--spacing-${size})`,
        } as CSSProperties
      }
    >
      <div className={styles.headers}>
        {tabs.map(({ props }, id) => (
          <Header
            key={id}
            id={id}
            active={active}
            setIndex={setIndex}
            header={props.header}
          />
        ))}
      </div>
      <div className={styles.bodies}>
        {tabs.map(({ props }, id) => (
          <Body
            key={id}
            id={id}
            active={active}
            body={props.children}
            className={props.className}
          />
        ))}
      </div>
    </div>
  );
};
