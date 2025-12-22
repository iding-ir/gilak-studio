import { Icon } from "@gilak/components";
import type { PointerEvent, ReactNode } from "react";

import IconResize from "../../assets/icon-resize.svg?url";
import { useFloatingWindow } from "../../hooks/useFloatingWindows";
import styles from "./Footer.module.scss";

export type FooterProps = {
  id: string;
  footer: ReactNode;
  resizable: boolean;
  onResizePointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
};

export const Footer = ({
  id,
  footer,
  resizable,
  onResizePointerDown,
}: FooterProps) => {
  const { status } = useFloatingWindow(id);

  if (!footer && !resizable) return null;

  return (
    <footer className={styles.root}>
      {footer}
      {resizable && status !== "maximized" && (
        <div className={styles.resize} onPointerDown={onResizePointerDown}>
          <Icon
            icon={IconResize}
            className={styles.icon}
            frameless
            interactive
          />
        </div>
      )}
    </footer>
  );
};
