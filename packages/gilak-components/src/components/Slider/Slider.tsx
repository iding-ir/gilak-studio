import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

import { ConditionalWrapper } from "../ConditionalWrapper";
import { Icon } from "../Icon";
import { Tooltip } from "../Tooltip";
import styles from "./Slider.module.scss";
import { useSlider } from "./useSlider";

export type SliderProps = {
  range: [number, number];
  step: number;
  initial: number;
  label?: string;
  icon?: string;
  className?: string;
  onChange: (value: number) => void;
  valueRenderer?: (value: number) => ReactNode;
};

export const Slider = ({
  range,
  step,
  initial,
  label,
  icon,
  className,
  onChange,
  valueRenderer = (value) => value,
}: SliderProps) => {
  const {
    trackRef,
    value,
    thumbStyle,
    handleTrackPointerDown,
    handleThumbPointerDown,
  } = useSlider({ range, step, initial, onChange });

  return (
    <div className={clsx(styles.root, className)}>
      {icon && <Icon icon={icon} frameless={true} interactive={false} />}

      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handleTrackPointerDown}
      >
        <div
          className={styles.fill}
          style={{
            width: `${((value - range[0]) / (range[1] - range[0] || 1)) * 100}%`,
          }}
        />
        <div
          className={styles.thumb}
          onPointerDown={handleThumbPointerDown}
          style={thumbStyle as CSSProperties}
        >
          <ConditionalWrapper
            condition={!!label}
            wrapper={(children) => (
              <Tooltip content={label as string}>{children}</Tooltip>
            )}
          >
            {valueRenderer(value)}
          </ConditionalWrapper>
        </div>
      </div>
    </div>
  );
};
