import clsx from "clsx";
import type { PointerEvent, ReactNode } from "react";

import { Dropdown } from "../DropDown";
import { Child } from "./Child";
import { Label } from "./Label";
import styles from "./Menu.module.scss";

export type MenuDirection = "row" | "column";

export type MenuProps = {
  children?: ReactNode;
  root?: boolean;
  label: string;
  direction?: MenuDirection;
  open?: boolean;
  href?: string;
  onClick?: () => void;
};

export const Menu = ({
  children,
  root = false,
  label,
  direction = "row",
  open = false,
  href,
  onClick,
}: MenuProps) => {
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
