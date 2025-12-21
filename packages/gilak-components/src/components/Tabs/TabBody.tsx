import type { ReactNode } from "react";

export type TabBodyProps = {
  children: ReactNode;
};

export const TabBody = ({ children }: TabBodyProps) => {
  return <>{children}</>;
};
