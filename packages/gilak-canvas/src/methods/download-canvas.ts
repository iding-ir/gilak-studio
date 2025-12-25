import { canvasToBlob, type ImageFormat } from "./canvas-to-blob";

type SaveOptions = {
  canvas: HTMLCanvasElement;
  fileName: string;
  format: ImageFormat;
  quality: number;
  backgroundColor?: string;
};

export const downloadCanvas = async ({
  canvas,
  fileName = "image",
  format = "png",
  quality,
  backgroundColor,
}: SaveOptions) => {
  const blob = await canvasToBlob({ canvas, format, quality, backgroundColor });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.${format}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
