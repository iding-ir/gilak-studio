import type { KeyboardEvent } from "react";

export const onFocusKeyDown = (
  event: KeyboardEvent<Element>,
  onKeyDown: () => void,
) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onKeyDown();
  }
};
