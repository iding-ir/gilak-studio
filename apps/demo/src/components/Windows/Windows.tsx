import { CanvasProvider } from "@gilak/canvas";
import { FloatingWindows, useFloatingWindows } from "@gilak/floating-window";
import { selectFloatingWindows } from "@gilak/floating-window/context";

import { WelcomeScreen } from "../WelcomeScreen";
import { Window } from "../Window";

export const Windows = () => {
  const { state } = useFloatingWindows();

  return (
    <>
      {state.windows.size === 0 && <WelcomeScreen />}
      <FloatingWindows>
        {selectFloatingWindows(state).map(({ id }) => (
          <CanvasProvider key={id}>
            <Window id={id} />
          </CanvasProvider>
        ))}
      </FloatingWindows>
    </>
  );
};
