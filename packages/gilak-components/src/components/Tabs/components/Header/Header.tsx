import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./Header.module.scss";

export type HeaderProps = {
  id: number;
  active: number;
  setIndex: (id: number) => void;
  header: ReactNode;
};

export const Header = ({ id, active, setIndex, header }: HeaderProps) => {
  return (
    <button
      className={clsx(styles.header, { [styles.active]: id === active })}
      onClick={() => setIndex(id)}
    >
      {header}
    </button>
  );
};
