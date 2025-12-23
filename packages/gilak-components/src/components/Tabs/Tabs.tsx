import type { ReactElement, ReactNode } from "react";
import { Children } from "react";

import { Body } from "./components/Body";
import { Header } from "./components/Header";
import styles from "./Tabs.module.scss";
import { useTabs } from "./useTabs";

export type TabsProps = {
  children: ReactNode;
  defaultIndex?: number;
  onChange?: (index: number) => void;
};

export const Tabs = ({ children, defaultIndex, onChange }: TabsProps) => {
  const { active, setIndex } = useTabs({ defaultIndex, onChange });

  const tabs = Children.toArray(children).filter(Boolean) as ReactElement<{
    header: ReactNode;
    children: ReactNode;
    className?: string;
  }>[];

  return (
    <div className={styles.root}>
      <div className={styles.headers}>
        {tabs.map(({ props }, id) => (
          <Header
            key={id}
            index={id}
            activeIndex={active}
            setIndex={setIndex}
            header={props.header}
          />
        ))}
      </div>
      <div className={styles.bodies}>
        {tabs.map(({ props }, id) => (
          <Body
            key={id}
            index={id}
            activeIndex={active}
            body={props.children}
            className={props.className}
          />
        ))}
      </div>
    </div>
  );
};
