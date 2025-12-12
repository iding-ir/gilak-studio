import { getContrastColor } from "@gilak/utils";
import { useMemo } from "react";

import { useColorPicker } from "../../context";
import styles from "./Text.module.scss";

export const Text = () => {
  const { currentColor } = useColorPicker();

  const contrastColor = useMemo(
    () => getContrastColor(currentColor),
    [currentColor],
  );

  return (
    <div
      className={styles.container}
      style={{
        color: contrastColor,
        backgroundColor: currentColor,
        borderColor: contrastColor,
      }}
    >
      {currentColor}
    </div>
  );
};
