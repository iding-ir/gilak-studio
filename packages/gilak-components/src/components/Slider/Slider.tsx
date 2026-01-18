import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ReactNode } from "react";

import { ConditionalWrapper } from "../ConditionalWrapper";
import { Icon } from "../Icon";
import { Tooltip } from "../Tooltip";
import styles from "./Slider.module.scss";
import { useSlider } from "./useSlider";

export type SliderProps = {
  range: [number, number];
  step: number;
  initial: number;
  tooltip?: string;
  icon?: string;
  variant?: Variant;
  size?: TshirtSize;
  width?: string;
  ariaLabel?: string;
  className?: string;
  onChange: (value: number) => void;
  valueRenderer?: (value: number) => ReactNode;
};

export const Slider = ({
  range,
  step,
  initial,
  tooltip,
  icon,
  variant = "primary",
  size = "md",
  width = "5rem",
  ariaLabel,
  className,
  onChange,
  valueRenderer = (value) => value,
}: SliderProps) => {
  const {
    trackRef,
    thumbRef,
    fillRef,
    value,
    fillStyle,
    handleTrackPointerDown,
    handleThumbPointerDown,
    handleKeyDown,
  } = useSlider({ range, step, initial, onChange });

  const [min, max] = range;

  return (
    <div className={clsx(styles.root, styles[size], className)}>
      {icon && (
        <Icon
          icon={icon}
          size={size}
          variant={variant}
          frameless
          interactive={false}
          aria-hidden="true"
        />
      )}

      <div
        ref={trackRef}
        className={clsx(styles.track, styles[variant], styles[size])}
        style={{ width }}
        onPointerDown={handleTrackPointerDown}
        role="presentation"
      >
        <div
          ref={fillRef}
          className={clsx(styles.fill, styles[variant], styles[size])}
          style={fillStyle}
          aria-hidden="true"
        />

        <div
          ref={thumbRef}
          className={clsx(styles.thumb, styles[variant], styles[size])}
          role="slider"
          tabIndex={0}
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={String(value)}
          onPointerDown={handleThumbPointerDown}
          onKeyDown={handleKeyDown}
        >
          <ConditionalWrapper
            condition={!!tooltip}
            wrapper={(children) => (
              <Tooltip content={tooltip as string}>{children}</Tooltip>
            )}
          >
            {valueRenderer(value)}
          </ConditionalWrapper>
        </div>
      </div>
    </div>
  );
};
