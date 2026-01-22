export const matchesAccepts = (dragType?: string, accepts?: string[]) => {
  if (!accepts || !accepts.length) return true;
  if (!dragType) return false;
  return accepts.includes(dragType);
};
