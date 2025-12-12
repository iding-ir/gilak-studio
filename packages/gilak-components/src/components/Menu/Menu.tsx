import clsx from "clsx";
import React, { type PointerEvent, type ReactNode } from "react";

import { Dropdown } from "../DropDown";
import { List } from "../List";
import { Text } from "../Text";
import styles from "./Menu.module.scss";

export type MenuDirection = "row" | "column";

export interface MenuProps {
  root?: boolean;
  label: string;
  direction?: MenuDirection;
  open?: boolean;
  href?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  root = false,
  direction = "row",
  label,
  open = false,
  href,
  children,
  onClick,
}) => {
  const handleClick = (event: PointerEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.();
  };

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
        <Label label={label} href={href} onClick={handleClick} />
      </div>
    );
  }

  return (
    <div className={className}>
      <Dropdown
        openDefault={open}
        trigger={<Label label={label} href={href} onClick={handleClick} />}
      >
        <Child direction={direction} root={root}>
          {children}
        </Child>
      </Dropdown>
    </div>
  );
};

const Child = ({
  direction,
  root,
  children,
}: {
  direction: MenuDirection;
  root: boolean;
  children?: ReactNode;
}) => {
  return (
    <List
      direction={direction}
      count={1}
      frameless={root}
      theme={root ? "primary" : "light"}
      items={React.Children.toArray(children)}
    />
  );
};

const Label = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: (event: PointerEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <a href={href} onClick={onClick}>
      <Text size="md" text={label} frameless />
    </a>
  );
};
