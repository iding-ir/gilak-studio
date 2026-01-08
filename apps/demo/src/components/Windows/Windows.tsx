import { FloatingWindows, useFloatingWindows } from "@gilak/floating-window";

import { WelcomeScreen } from "../WelcomeScreen";
import { Window } from "../Window";

export const Windows = () => {
  const { windows } = useFloatingWindows();

  if (windows.size === 0) return <WelcomeScreen />;

  return (
    <FloatingWindows>
      {Array.from(windows.values()).map(({ id }) => (
        <Window key={id} id={id} />
      ))}
    </FloatingWindows>
  );
};
