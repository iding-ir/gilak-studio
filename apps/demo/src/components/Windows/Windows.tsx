import { CanvasProvider } from "@gilak/canvas";
import { FloatingWindows, useFloatingWindows } from "@gilak/floating-window";

import { WelcomeScreen } from "../WelcomeScreen";
import { Window } from "../Window";

export const Windows = () => {
  const { windows } = useFloatingWindows();

  return (
    <>
      {windows.size === 0 && <WelcomeScreen />}
      <FloatingWindows>
        {Array.from(windows.values()).map(({ id }) => (
          <CanvasProvider key={id}>
            <Window id={id} />
          </CanvasProvider>
        ))}
      </FloatingWindows>
    </>
  );
};
