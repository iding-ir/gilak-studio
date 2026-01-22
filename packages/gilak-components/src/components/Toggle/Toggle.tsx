import type { Alignment, TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps } from "react";

import { Button } from "../Button";
import styles from "./Toggle.module.scss";

export type ToggleOption = {
  id: string;
  label: string;
};

export type ToggleProps = Omit<ComponentProps<"input">, "size"> & {
  options: ToggleOption[];
  rounded?: boolean;
  variant?: Variant;
  size?: TshirtSize;
  fullWidth?: boolean;
  alignment?: Alignment;
  frameless?: boolean;
  disabled?: boolean;
  className?: string;
  selected?: string;
  onChange?: (id: string) => void;
};

export const Toggle = ({
  options,
  rounded = true,
  variant = "primary",
  size = "md",
  fullWidth = false,
  alignment = "center",
  frameless = false,
  disabled = false,
  className,
  selected,
  onChange,
  ...props
}: ToggleProps) => {
  return (
    <div
      className={clsx(
        styles.toggle,
        styles[size],
        styles[alignment],
        className,
        {
          [styles.rounded]: rounded,
          [styles.fullWidth]: fullWidth,
          [styles.frameless]: frameless,
        },
      )}
      role="group"
      {...props}
    >
      {options.map(({ id, label }) => {
        const isSelected = selected === id;

        return (
          <Button
            key={id}
            type="button"
            className={styles.button}
            variant={isSelected ? variant : "dark-ghost"}
            rounded={false}
            size={size}
            alignment={alignment}
            frameless={frameless}
            disabled={disabled}
            onClick={() => onChange?.(id)}
            data-active={isSelected}
            aria-pressed={isSelected}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
