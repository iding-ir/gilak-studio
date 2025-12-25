export const toggleFullscreen = async (
  el: HTMLElement = document.documentElement,
): Promise<boolean> => {
  if (typeof document === "undefined") return false;

  const doc = document as Document & {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void> | void;
    msFullscreenElement?: Element | null;
    msExitFullscreen?: () => Promise<void> | void;
  };

  const elem = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  };

  const isFullscreen =
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement;

  // Exit fullscreen
  if (isFullscreen) {
    try {
      if (doc.exitFullscreen) await doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
      else if (doc.msExitFullscreen) await doc.msExitFullscreen();
      return true;
    } catch (err) {
      console.error("Failed to exit fullscreen", err);
      return false;
    }
  }

  // Enter fullscreen
  try {
    if (elem.requestFullscreen) await elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();
    return true;
  } catch (err) {
    console.error("Failed to enter fullscreen", err);
    return false;
  }
};
