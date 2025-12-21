import { useCallback, useState } from "react";

export type UseTabsArgs = {
  defaultIndex?: number;
  onChange?: (id: number) => void;
};

export const useTabs = ({ defaultIndex = 0, onChange }: UseTabsArgs = {}) => {
  const [active, setActive] = useState<number>(defaultIndex);

  const setIndex = useCallback(
    (id: number) => {
      setActive(id);
      onChange?.(id);
    },
    [onChange],
  );

  return {
    active,
    setIndex,
  };
};
