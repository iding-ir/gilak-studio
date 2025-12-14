import type { ReactNode } from "react";
import { useMemo, useReducer } from "react";

import { Header } from "../components/Header";
import { FloatingWindowContext } from "./context";
import styles from "./provider.module.scss";
import { initialState, reducer } from "./reducer";
import { hasMinimizedWindows } from "./selectors";
import type { ContextValue } from "./types";

export type FloatingWindowProviderProps = {
  children: ReactNode;
};

export const FloatingWindowProvider = ({
  children,
}: FloatingWindowProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: ContextValue = {
    state,
    dispatch,
  };

  const showTaskbar = useMemo(() => hasMinimizedWindows(state), [state]);

  return (
    <FloatingWindowContext.Provider value={value}>
      <div className={styles.container}>
        <div className={styles.windows}>{children}</div>
        {showTaskbar && (
          <div className={styles.taskbar}>
            {Object.values(state.windows)
              .filter(({ status }) => status === "minimized")
              .map(({ id, title, maximizable, minimizable }) => (
                <Header
                  key={id}
                  id={id}
                  title={title}
                  draggable={false}
                  maximizable={maximizable}
                  minimizable={minimizable}
                  onDragPointerDown={() => null}
                />
              ))}
          </div>
        )}
      </div>
    </FloatingWindowContext.Provider>
  );
};
