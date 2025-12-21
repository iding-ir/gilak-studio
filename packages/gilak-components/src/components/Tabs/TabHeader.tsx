import type { ReactNode } from "react";

export type TabHeaderProps = {
  children: ReactNode;
};

export const TabHeader = ({ children }: TabHeaderProps) => {
  return <>{children}</>;
};
