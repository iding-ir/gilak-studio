import type { Direction, Variant } from "@gilak/components/types";
import type { ReactNode } from "react";
import { Children } from "react";

import { List } from "../List";

export const Child = ({
  direction,
  variant,
  frameless,
  children,
}: {
  direction: Direction;
  variant: Variant;
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
      items={Children.toArray(children)}
    />
  );
};
