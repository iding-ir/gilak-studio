import { Button } from "@gilak/components/components/Button";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./Header.module.scss";

export type HeaderProps = {
  index: number;
  header: ReactNode;
  activeIndex: number;
  setIndex: (index: number) => void;
};

export const Header = ({
  index,
  header,
  activeIndex,
  setIndex,
}: HeaderProps) => {
  return (
    <Button
      className={clsx(styles.header, {
        [styles.active]: index === activeIndex,
      })}
      onClick={() => setIndex(index)}
    >
      {header}
    </Button>
  );
};
