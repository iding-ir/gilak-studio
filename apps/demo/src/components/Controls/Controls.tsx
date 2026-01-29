import { UndoRedo } from "@gilak/canvas";
import { ZoomSelector } from "@gilak/resizable-screen";

import styles from "./Controls.module.scss";

export const Controls = () => {
  return (
    <ul className={styles.root}>
      <li>
        <ZoomSelector />
      </li>
      <li>
        <UndoRedo />
      </li>
    </ul>
  );
};
