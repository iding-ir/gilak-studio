import { Icon } from "@gilak/components";
import type { PointerEvent, ReactNode } from "react";

import IconResize from "../../assets/icon-resize.svg?url";
import type { Status } from "../../context";
import styles from "./Footer.module.scss";

interface FooterProps {
  footer: ReactNode;
  resizable: boolean;
  status: Status;
  onResizePointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
}

export const Footer: React.FC<FooterProps> = ({
  footer,
  resizable,
  status,
  onResizePointerDown,
}: FooterProps) => {
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
