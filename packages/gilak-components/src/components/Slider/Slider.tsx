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
  className,
  onChange,
  valueRenderer = (value) => value,
}: SliderProps) => {
  const {
    trackRef,
    thumbRef,
    fillRef,
    value,
    handleTrackPointerDown,
    handleThumbPointerDown,
  } = useSlider({ range, step, initial, onChange });

  return (
    <div className={clsx(styles.root, styles[size], className)}>
      {icon && (
        <Icon
          icon={icon}
          size={size}
          variant={variant}
          frameless={true}
          interactive={false}
        />
      )}

      <div
        ref={trackRef}
        className={clsx(styles.track, styles[variant], styles[size])}
        style={{ width }}
        onPointerDown={handleTrackPointerDown}
      >
        <div
          ref={fillRef}
          className={clsx(styles.fill, styles[variant], styles[size])}
          style={{
            width: `${((value - range[0]) / (range[1] - range[0] || 1)) * 100}%`,
          }}
        />

        <div
          ref={thumbRef}
          className={clsx(styles.thumb, styles[variant], styles[size])}
          onPointerDown={handleThumbPointerDown}
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
