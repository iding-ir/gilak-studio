import clsx from "clsx";
import type { ReactNode } from "react";

import type { Direction, Position, TshirtSize } from "../../types";
import type { Variant } from "../../types";
import { Button } from "../Button";
import { Dropdown } from "../DropDown";
import { Link } from "../Link";
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
  size?: TshirtSize;
  frameless?: boolean;
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
  size = "md",
  frameless,
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
        <Child
          direction={direction}
          variant={variant}
          size={size}
          frameless={frameless}
        >
          {children}
        </Child>
      </div>
    );
  }

  if (!children) {
    return (
      <div className={className}>
        {href ? (
          <Link
            text={label}
            size={size}
            frameless
            href={href}
            target="_blank"
          />
        ) : (
          <Button
            variant="light-ghost"
            alignment="start"
            size={size}
            frameless
            onClick={onClick}
          >
            {label}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <Dropdown
        position={position}
        openDefault={open}
        trigger={
          <Button
            variant="light-ghost"
            alignment="start"
            size={size}
            frameless
            onClick={onClick}
          >
            {label}
          </Button>
        }
        closeOnClickInside={closeOnClickInside}
      >
        <Child
          direction={direction}
          variant={variant}
          size={size}
          frameless={frameless}
        >
          {children}
        </Child>
      </Dropdown>
    </div>
  );
};
