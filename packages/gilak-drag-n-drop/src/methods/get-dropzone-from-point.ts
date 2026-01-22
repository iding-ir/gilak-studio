import { DROP_ZONE_ACCEPTS_ATTRIBUTE, DROP_ZONE_ATTRIBUTE } from "../constants";
import type { DropZoneDescriptor, Point } from "../types";
import { matchesAccepts } from "./matches-accepts";

export const getDropZoneFromPoint = ({
  pointer,
  dragType,
}: {
  pointer: Point;
  dragType?: string;
}): DropZoneDescriptor | null => {
  if (typeof document === "undefined") return null;
  const element = document.elementFromPoint(pointer.x, pointer.y);
  if (!element) return null;

  const dropElement = element.closest<HTMLElement>(`[${DROP_ZONE_ATTRIBUTE}]`);
  if (!dropElement) return null;

  const dropId = dropElement.getAttribute(DROP_ZONE_ATTRIBUTE);
  if (!dropId) return null;

  const accepts = dropElement.getAttribute(DROP_ZONE_ACCEPTS_ATTRIBUTE);
  if (!accepts || !matchesAccepts(dragType ?? undefined, [accepts]))
    return null;

  return {
    id: dropId,
    element: dropElement,
    accepts: [accepts],
  };
};
