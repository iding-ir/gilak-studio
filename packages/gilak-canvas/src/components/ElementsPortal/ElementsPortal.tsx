import { ELEMENTS_PORTAL_ID } from "@gilak/canvas/constants";
import { t } from "@gilak/localization";
import { createPortal } from "react-dom";

import { selectCurrentElements } from "../../context/selectors";
import { useCanvas } from "../../hooks/useCanvas";
import { ElementCard } from "../ElementCard";
import styles from "./ElementsPortal.module.scss";

export const ElementsPortal = () => {
  return createPortal(
    <ElementList />,
    document.getElementById(ELEMENTS_PORTAL_ID) as HTMLElement,
  );
};

const ElementList = () => {
  const { state } = useCanvas();
  const elements = selectCurrentElements(state);

  return elements.length === 0 ? (
    <p className={styles.empty}>{t("canvas:elements.noElements")}</p>
  ) : (
    <ul className={styles.list}>
      {[...elements].reverse().map((element, index) => (
        <ElementCard
          key={element.id}
          element={element}
          disableMoveUp={index === 0}
          disableMoveDown={index === elements.length - 1}
        />
      ))}
    </ul>
  );
};
