import { FloatingWindows, useFloatingWindows } from "@gilak/floating-window";
import { useMemo } from "react";

import { WelcomeScreen } from "../WelcomeScreen";
import { Window } from "../Window";

export const Windows = () => {
  const { windows } = useFloatingWindows();
  const windowsArray = useMemo(() => Object.values(windows), [windows]);

  if (windowsArray.length === 0) return <WelcomeScreen />;

  return (
    <FloatingWindows>
      {windowsArray.map(({ id }) => (
        <Window key={id} id={id} />
      ))}
    </FloatingWindows>
  );
};
