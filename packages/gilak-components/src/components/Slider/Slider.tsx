import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

import { Icon } from "../Icon";
import { Text } from "../Text";
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

      {label && (
        <Text text={label} variant="dark-ghost" frameless={true}></Text>
      )}

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
          {valueRenderer(value)}
        </div>
      </div>
    </div>
  );
};
