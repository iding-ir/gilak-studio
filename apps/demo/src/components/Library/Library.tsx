import { DragWrapper } from "@gilak/drag-n-drop";
import { ImageLibrary } from "@gilak/image-library";

import { DragThumbnail } from "../DragThumbnail";
import styles from "./Library.module.scss";

export const Library = () => {
  return (
    <ImageLibrary
      itemRenderer={(component, asset) => (
        <DragWrapper
          dragId={`drag-id-${asset.id}`}
          data={asset}
          dragType="image"
          dragImageRenderer={({ data }) => <DragThumbnail data={data} />}
          onDragStart={() => console.log("drag start")}
        >
          <div className={styles.root}>{component}</div>
        </DragWrapper>
      )}
    />
  );
};
