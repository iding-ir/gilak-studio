import { CanvasProvider } from "@gilak/canvas";
import { FloatingWindows, useFloatingWindows } from "@gilak/floating-window";
import { selectFloatingWindows } from "@gilak/floating-window/context";

import { useAppSelector } from "../../app/hooks";
import { selectSettingsAutoSaveEnabled } from "../../features/settings/settings-slice";
import { WelcomeScreen } from "../WelcomeScreen";
import { Window } from "../Window";

export const Windows = () => {
  const { state } = useFloatingWindows();
  const autoSaveEnabled = useAppSelector(selectSettingsAutoSaveEnabled);

  return (
    <>
      {state.windows.size === 0 && <WelcomeScreen />}
      <FloatingWindows>
        {selectFloatingWindows(state).map(({ id }) => (
          <CanvasProvider key={id} id={id} autoSave={autoSaveEnabled}>
            <Window id={id} />
          </CanvasProvider>
        ))}
      </FloatingWindows>
    </>
  );
};
