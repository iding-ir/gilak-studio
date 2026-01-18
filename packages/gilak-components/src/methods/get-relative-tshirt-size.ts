import { TSHIRT_SIZES, type TshirtSize } from "@gilak/components/types";

export const getRelativeTshirtSize = (size: TshirtSize, relation: number) => {
  const roundedRelation = Math.round(relation);
  const index = TSHIRT_SIZES.indexOf(size);

  if (index === -1) {
    return TSHIRT_SIZES[0];
  }

  let newIndex = index + roundedRelation;

  if (newIndex < 0) {
    newIndex = 0;
  } else if (newIndex >= TSHIRT_SIZES.length) {
    newIndex = TSHIRT_SIZES.length - 1;
  }

  return TSHIRT_SIZES[newIndex];
};
