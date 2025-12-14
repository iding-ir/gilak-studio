import type { ReactNode } from "react";
import { Children } from "react";

import { List } from "../List";
import type { MenuDirection } from "./Menu";

export const Child = ({
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
      items={Children.toArray(children)}
    />
  );
};
