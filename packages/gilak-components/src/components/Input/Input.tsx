import { type TshirtSize, type Variant } from "@gilak/components/types";
import clsx from "clsx";
import { type ComponentProps, type RefObject, useId } from "react";

import { ConditionalWrapper } from "../ConditionalWrapper";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";
import styles from "./Input.module.scss";

export type InputProps = Omit<ComponentProps<"input">, "size"> & {
  ref?: RefObject<HTMLInputElement | null>;
  error?: boolean;
  rounded?: boolean;
  variant?: Variant;
  size?: TshirtSize;
  length?: number;
  frameless?: boolean;
  fullWidth?: boolean;
  label?: string;
  className?: string;
  tooltip?: string;
};

export const Input = ({
  ref,
  error,
  rounded = true,
  variant = "light",
  size = "md",
  length,
  frameless = false,
  fullWidth = true,
  label,
  className,
  tooltip,
  ...props
}: InputProps) => {
  const id = useId();
  const isInputInvisible = ["checkbox", "radio"].includes(props.type || "");

  return (
    <ConditionalWrapper
      condition={!!tooltip}
      wrapper={(children) => (
        <Tooltip content={tooltip as string}>{children}</Tooltip>
      )}
    >
      <div className={styles.root}>
        {label && (
          <label
            htmlFor={id}
            tabIndex={isInputInvisible ? 0 : undefined}
            className={clsx(styles.label, className, {
              [styles.error]: error,
              [styles.fullWidth]: fullWidth,
              [styles.rounded]: rounded,
              [styles.frameless]: frameless,
            })}
          >
            <Text
              text={label}
              size={size}
              variant={variant}
              frameless
              interactive={isInputInvisible}
              selected={!!props.checked}
              padded={isInputInvisible}
            />
          </label>
        )}
        <input
          id={id}
          ref={ref}
          {...props}
          size={length}
          className={clsx(styles.input, styles[variant], styles[size], {
            [styles.invisible]: isInputInvisible,
          })}
        />
      </div>
    </ConditionalWrapper>
  );
};
