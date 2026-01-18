import type { Direction, TshirtSize, Variant } from "@gilak/components/types";
import type { ReactNode } from "react";
import { Children } from "react";

import { List } from "../List";

export const Child = ({
  direction,
  variant,
  size = "md",
  frameless,
  children,
}: {
  direction: Direction;
  variant: Variant;
  size?: TshirtSize;
  frameless?: boolean;
  children?: ReactNode;
}) => {
  return (
    <List
      direction={direction}
      count={1}
      frameless={frameless}
      interactive={true}
      variant={variant}
      size={size}
      items={Children.toArray(children)}
    />
  );
};
