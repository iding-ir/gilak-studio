import type { ReactNode } from "react";

export type TabProps = {
  header: ReactNode;
  children: ReactNode;
  className?: string;
};

export const Tab = ({ header: _h, className: _c, children }: TabProps) => {
  return <>{children}</>;
};
