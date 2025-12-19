import type { BrushShape } from "@gilak/canvas";
import { brushShapeIcons } from "@gilak/canvas/types/brushShape";
import { Dropdown, Icon } from "@gilak/components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectBrushShape,
  setBrushShape,
} from "../../features/brush/brush-slice";
import { BrushShapes } from "../BrushShapes";

export const BrushShapeDropdown = () => {
  const dispatch = useAppDispatch();
  const brushShape = useAppSelector(selectBrushShape);

  const handleBrushShapeChange = (shape: BrushShape) => {
    dispatch(setBrushShape(shape));
  };

  return (
    <Dropdown
      position="bottom"
      trigger={
        <Icon icon={brushShapeIcons[brushShape]} size="md" interactive />
      }
    >
      <BrushShapes brush={brushShape} onChange={handleBrushShapeChange} />
    </Dropdown>
  );
};
