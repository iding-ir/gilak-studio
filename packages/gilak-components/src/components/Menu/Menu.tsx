import type { Direction } from "@gilak/components/types";
import clsx from "clsx";
import type { ReactNode } from "react";

import { Dropdown } from "../DropDown";
import { Text } from "../Text";
import { Child } from "./Child";
import styles from "./Menu.module.scss";

export type MenuProps = {
  children?: ReactNode;
  root?: boolean;
  label: string;
  direction?: Direction;
  open?: boolean;
  closeOnClickInside?: boolean;
  onClick?: () => void;
};

export const Menu = ({
  children,
  root = false,
  label,
  direction = "column",
  open = false,
  closeOnClickInside,
  onClick,
}: MenuProps) => {
  const className = clsx(styles.root, {
    [styles.firstLevel]: root,
  });

  if (root) {
    return (
      <div className={className}>
        <Child direction={direction} root={root}>
          {children}
        </Child>
      </div>
    );
  }

  if (!children) {
    return (
      <div className={className}>
        <Text text={label} frameless onClick={onClick} />
      </div>
    );
  }

  return (
    <div className={className}>
      <Dropdown
        openDefault={open}
        trigger={<Text text={label} frameless onClick={onClick} />}
        closeOnClickInside={closeOnClickInside}
      >
        <Child direction={direction} root={root}>
          {children}
        </Child>
      </Dropdown>
    </div>
  );
};
