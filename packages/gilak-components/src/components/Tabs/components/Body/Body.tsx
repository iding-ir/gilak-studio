import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./Body.module.scss";

export type BodyProps = {
  id: number;
  active: number;
  body: ReactNode;
  className?: string;
};

export const Body = ({ id, active, body, className }: BodyProps) => {
  return (
    <div
      key={id}
      className={clsx(styles.body, className, {
        [styles.active]: id === active,
      })}
      hidden={id !== active}
    >
      {body}
    </div>
  );
};
