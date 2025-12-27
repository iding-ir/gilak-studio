export const parseSize = (value?: string | number) => {
  if (typeof value === "number") return Math.max(0, Math.floor(value));

  if (typeof value === "string") {
    const trimmed = value.trim();
    const px = trimmed.endsWith("px") ? trimmed.slice(0, -2) : trimmed;
    const number = Number(px);
    if (!Number.isNaN(number)) return Math.max(0, Math.floor(number));
  }

  return undefined;
};
