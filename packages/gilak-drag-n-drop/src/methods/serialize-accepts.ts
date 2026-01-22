export const serializeAccepts = (accepts?: string[] | null) => {
  if (!accepts || !accepts.length) return "";
  return accepts.join(",");
};
