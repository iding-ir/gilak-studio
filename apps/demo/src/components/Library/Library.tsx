import { DragWrapper } from "@gilak/drag-n-drop";
import { ImageLibrary } from "@gilak/image-library";

import { useAppSelector } from "../../app/hooks";
import { IMAGE_LIBRARY_DRAG_TYPE } from "../../constants";
import { selectSettingsAutoSaveEnabled } from "../../features/settings/settings-slice";
import { DragThumbnail } from "../DragThumbnail";
import styles from "./Library.module.scss";

export const Library = () => {
  const autoSaveEnabled = useAppSelector(selectSettingsAutoSaveEnabled);

  return (
    <ImageLibrary
      autoSave={autoSaveEnabled}
      itemRenderer={(component, imageItem) => (
        <DragWrapper
          dragId={imageItem.id}
          data={imageItem}
          dragType={IMAGE_LIBRARY_DRAG_TYPE}
          dragImageRenderer={({ data }) => <DragThumbnail data={data} />}
        >
          <div className={styles.root}>{component}</div>
        </DragWrapper>
      )}
    />
  );
};
