export const getDisplayName = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, "").trim();
};
