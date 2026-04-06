export const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    const cleanup = () => {
      reader.onload = null;
      reader.onerror = null;
    };

    reader.onload = () => {
      cleanup();

      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Failed to convert blob to data URL."));
    };

    reader.onerror = () => {
      cleanup();
      reject(reader.error ?? new Error("Failed to read image blob."));
    };

    reader.readAsDataURL(blob);
  });
