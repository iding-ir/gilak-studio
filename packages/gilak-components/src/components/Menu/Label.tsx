import type { PointerEvent } from "react";

import { Text } from "../Text";

export const Label = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: (event: PointerEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <a href={href} onClick={onClick}>
      <Text size="md" text={label} frameless />
    </a>
  );
};
