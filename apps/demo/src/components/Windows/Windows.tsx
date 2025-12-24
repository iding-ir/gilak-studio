import { FloatingWindowProvider } from "@gilak/floating-window";

import { useAppSelector } from "../../app/hooks";
import { selectAllWindows } from "../../features/windows/windows-slice";
import { Window } from "../Window";

export const Windows = () => {
  const windows = useAppSelector(selectAllWindows);

  return (
    <FloatingWindowProvider>
      {windows.map(({ id }) => (
        <Window key={id} id={id} />
      ))}
    </FloatingWindowProvider>
  );
};
