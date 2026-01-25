import { DragWrapper } from "@gilak/drag-n-drop";
import { ImageLibrary } from "@gilak/image-library";

import { IMAGE_LIBRARY_DRAG_TYPE } from "../../constants";
import { DragThumbnail } from "../DragThumbnail";
import styles from "./Library.module.scss";

export const Library = () => {
  return (
    <ImageLibrary
      itemRenderer={(component, imageItem) => (
        <DragWrapper
          dragId={`drag-id-${imageItem.id}`}
          data={imageItem}
          dragType={IMAGE_LIBRARY_DRAG_TYPE}
          dragImageRenderer={({ data }) => <DragThumbnail data={data} />}
          onDragStart={() => console.log("drag start")}
        >
          <div className={styles.root}>{component}</div>
        </DragWrapper>
      )}
    />
  );
};
