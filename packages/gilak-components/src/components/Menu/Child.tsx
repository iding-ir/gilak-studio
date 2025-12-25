import type { Direction, Variant } from "@gilak/components/types";
import type { ReactNode } from "react";
import { Children } from "react";

import { List } from "../List";

export const Child = ({
  direction,
  variant,
  root,
  children,
}: {
  direction: Direction;
  variant: Variant;
  root: boolean;
  children?: ReactNode;
}) => {
  return (
    <List
      direction={direction}
      count={1}
      frameless={root}
      variant={root ? "ghost" : variant}
      items={Children.toArray(children)}
    />
  );
};
