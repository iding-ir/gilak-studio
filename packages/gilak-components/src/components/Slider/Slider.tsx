import type { TshirtSize } from "@gilak/components/types";
import clsx from "clsx";
import type { CSSProperties } from "react";

import { Icon } from "../Icon";
import { Text } from "../Text";
import styles from "./Slider.module.scss";
import { useSlider } from "./useSlider";

export type SliderProps = {
  range: [number, number];
  step: number;
  initial: number;
  size?: TshirtSize;
  sliderSize?: string;
  onChange: (value: number) => void;
  label?: string;
  icon?: string;
  color?: string;
  className?: string;
};

export const Slider = ({
  range,
  step,
  initial,
  size = "md",
  sliderSize = "100px",
  onChange,
  label,
  icon,
  color = "var(--color-dark-xxl)",
  className,
}: SliderProps) => {
  const {
    trackRef,
    value,
    thumbStyle,
    handleTrackPointerDown,
    handleThumbPointerDown,
  } = useSlider({ range, step, initial, onChange });

  return (
    <div
      className={clsx(styles.root, className)}
      style={
        {
          "--prop-slider-size": sliderSize,
          "--prop-icon-size": `var(--icon-${size})`,
          "--prop-font-size": `var(--font-${size})`,
          "--prop-spacing-size": `var(--spacing-${size})`,
        } as CSSProperties
      }
    >
      {icon && (
        <Icon
          color={color}
          backgroundColor="transparent"
          icon={icon}
          size={size}
          frameless={true}
          interactive={false}
        />
      )}

      {label && (
        <Text
          color={color}
          backgroundColor="transparent"
          size={size}
          text={label}
          frameless={true}
        ></Text>
      )}

      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handleTrackPointerDown}
      >
        <div
          className={styles.fill}
          style={{
            width: `${((value - (range?.[0] ?? 0)) / ((range?.[1] ?? 100) - (range?.[0] ?? 0) || 1)) * 100}%`,
          }}
        />
        <div
          className={styles.thumb}
          onPointerDown={handleThumbPointerDown}
          style={thumbStyle as CSSProperties}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
