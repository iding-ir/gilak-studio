import { t } from "@gilak/localization";
import { Fragment } from "react";

import { selectElements } from "../../context";
import { useCanvas } from "../../hooks/useCanvas";
import { ElementCard } from "../ElementCard";
import { ElementDropIndicator } from "./ElementDropIndicator";
import styles from "./Elements.module.scss";

const getDropZoneId = (index: number) =>
  `gilak-canvas-elements-drop-zone-${index}`;

export const ElementList = () => {
  const { state, moveElementToIndex } = useCanvas();
  const elements = [...selectElements(state)].reverse();

  return elements.length === 0 ? (
    <p className={styles.empty}>{t("canvas:elements.noElements")}</p>
  ) : (
    <ul className={styles.list}>
      <ElementDropIndicator
        zoneId={getDropZoneId(0)}
        onDrop={(element) => moveElementToIndex(element.id, elements.length)}
      />
      {elements.map((element, index) => (
        <Fragment key={element.id}>
          <ElementCard element={element} />
          <ElementDropIndicator
            zoneId={getDropZoneId(index + 1)}
            onDrop={(draggedElement) =>
              moveElementToIndex(draggedElement.id, elements.length - index - 1)
            }
          />
        </Fragment>
      ))}
    </ul>
  );
};
