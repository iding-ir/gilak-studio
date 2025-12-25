import { FloatingWindows, useFloatingWindows } from "@gilak/floating-window";

import { Window } from "../Window";

export const Windows = () => {
  const { windows } = useFloatingWindows();

  return (
    <FloatingWindows>
      {Object.values(windows).map(({ id }) => (
        <Window key={id} id={id} />
      ))}
    </FloatingWindows>
  );
};
