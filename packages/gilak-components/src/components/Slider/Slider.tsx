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
    <div className={clsx(styles.root, className)}>
      {icon && <Icon icon={icon} frameless={true} interactive={false} />}

      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handleTrackPointerDown}
      >
        <div
          ref={fillRef}
          className={styles.fill}
          style={{
            width: `${((value - range[0]) / (range[1] - range[0] || 1)) * 100}%`,
          }}
        />

        <div
          ref={thumbRef}
          className={styles.thumb}
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
