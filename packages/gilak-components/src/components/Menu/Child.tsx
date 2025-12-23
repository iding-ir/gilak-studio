import type { Direction } from "@gilak/components/types";
import type { ReactNode } from "react";
import { Children } from "react";

import { List } from "../List";

export const Child = ({
  direction,
  root,
  children,
}: {
  direction: Direction;
  root: boolean;
  children?: ReactNode;
}) => {
  return (
    <List
      direction={direction}
      count={1}
      frameless={root}
      variant={root ? "ghost" : "dark"}
      items={Children.toArray(children)}
    />
  );
};
