import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./Body.module.scss";

export type BodyProps = {
  index: number;
  activeIndex: number;
  body: ReactNode;
  className?: string;
};

export const Body = ({ index, activeIndex, body, className }: BodyProps) => {
  return (
    <div
      key={index}
      className={clsx(styles.body, className, {
        [styles.active]: index === activeIndex,
      })}
    >
      {body}
    </div>
  );
};
