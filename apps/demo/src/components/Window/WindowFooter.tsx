import styles from "./WindowFooter.module.scss";

export type WindowFooterProps = {
  id: string;
};

export const WindowFooter = ({ id }: WindowFooterProps) => {
  return (
    <div className={styles.root}>
      <span id={id} />
    </div>
  );
};
