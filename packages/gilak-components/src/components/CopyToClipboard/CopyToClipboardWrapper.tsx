import type { MouseEvent, ReactNode } from "react";

export type CopyToClipboardWrapperProps = {
  value: string;
  children: ReactNode;
  onCopy?: () => void;
  disabled?: boolean;
};

export const CopyToClipboardWrapper = ({
  value,
  children,
  onCopy,
  disabled = false,
}: CopyToClipboardWrapperProps) => {
  const handleClick = async (event: MouseEvent) => {
    event.stopPropagation();
    if (disabled) return;

    try {
      await navigator.clipboard.writeText(value);
      onCopy?.();
    } catch (error) {
      console.error("Failed to copy to clipboard", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: disabled ? "default" : "copy" }}
    >
      {children}
    </div>
  );
};
