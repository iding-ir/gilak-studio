const imageCache = new Map<string, HTMLImageElement>();

export type DataUrlToImageResult = {
  image: HTMLImageElement | null;
  isReady: boolean;
};

export const dataUrlToImage = (src: string): DataUrlToImageResult => {
  if (!src || typeof Image === "undefined") {
    return { image: null, isReady: false };
  }

  let image = imageCache.get(src);

  if (!image) {
    image = new Image();
    image.decoding = "async";
    image.crossOrigin = "anonymous";
    image.src = src;
    imageCache.set(src, image);
  }

  const isReady =
    image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;

  return { image, isReady };
};

export const subscribeToImageLoad = (
  src: string,
  callback: () => void,
): (() => void) => {
  const { image, isReady } = dataUrlToImage(src);

  if (!image || isReady) {
    return () => {};
  }

  image.addEventListener("load", callback);
  image.addEventListener("error", callback);

  return () => {
    image.removeEventListener("load", callback);
    image.removeEventListener("error", callback);
  };
};
