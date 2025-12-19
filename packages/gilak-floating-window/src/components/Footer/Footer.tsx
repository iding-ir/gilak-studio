import { Icon } from "@gilak/components";
import type { PointerEvent, ReactNode } from "react";

import IconResize from "../../assets/icon-resize.svg?url";
import { useWindow } from "../../hooks/useWindow";
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
  const { status } = useWindow(id);

  if (!footer && !resizable) return null;

  return (
    <footer className={styles.root}>
      {footer}
      {resizable && status !== "maximized" && (
        <div className={styles.resize} onPointerDown={onResizePointerDown}>
          <Icon icon={IconResize} size="md" className={styles.icon} frameless />
        </div>
      )}
    </footer>
  );
};
