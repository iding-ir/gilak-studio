import { PORTAL_ID } from "./Dialog";
import styles from "./DialogPortal.module.scss";

export type DialogPortalProps = {
  portalId?: string;
};

export const DialogPortal = ({ portalId = PORTAL_ID }: DialogPortalProps) => {
  return <div id={portalId} className={styles.root} />;
};
