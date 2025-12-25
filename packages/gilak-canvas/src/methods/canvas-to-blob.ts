export type ImageFormat = "png" | "jpeg" | "jpg" | "webp";

const formatToMime = (format?: ImageFormat): string => {
  if (!format) return "image/png";
  const f = String(format).toLowerCase().replace(/^\./, "");
  if (f === "jpg" || f === "jpeg") return "image/jpeg";
  if (f === "png") return "image/png";
  if (f === "webp") return "image/webp";
  return `image/${f}`;
};

export const canvasToBlob = async ({
  canvas,
  format = "png",
  quality = 0.9,
  backgroundColor = "white",
}: {
  canvas: HTMLCanvasElement;
  format?: ImageFormat;
  quality?: number;
  backgroundColor?: string;
}): Promise<Blob> => {
  const mime = formatToMime(format);
  const tmp = document.createElement("canvas");
  tmp.width = canvas.width;
  tmp.height = canvas.height;
  const ctx = tmp.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context for temporary canvas");

  ctx.fillStyle = backgroundColor ?? "#ffffff";
  ctx.fillRect(0, 0, tmp.width, tmp.height);
  ctx.drawImage(canvas, 0, 0);

  return await new Promise<Blob>((resolve, reject) => {
    tmp.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Failed to create blob from temporary canvas"));
      },
      mime,
      quality,
    );
  });
};
