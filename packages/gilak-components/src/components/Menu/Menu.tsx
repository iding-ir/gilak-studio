import { type Direction, Link, type Position } from "@gilak/components";
import type { Variant } from "@gilak/components/types";
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
  href?: string;
  direction?: Direction;
  position?: Position;
  variant?: Variant;
  open?: boolean;
  closeOnClickInside?: boolean;
  onClick?: () => void;
};

export const Menu = ({
  children,
  root = false,
  href,
  label,
  direction = "column",
  position = "bottom-right",
  variant = "dark",
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
        <Child direction={direction} variant={variant} root={root}>
          {children}
        </Child>
      </div>
    );
  }

  if (!children) {
    return (
      <div className={className}>
        {href ? (
          <Link text={label} frameless href={href} target="_blank" />
        ) : (
          <Text text={label} frameless onClick={onClick} />
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Dropdown
        position={position}
        openDefault={open}
        trigger={<Text text={label} frameless onClick={onClick} />}
        closeOnClickInside={closeOnClickInside}
      >
        <Child direction={direction} variant={variant} root={root}>
          {children}
        </Child>
      </Dropdown>
    </div>
  );
};
