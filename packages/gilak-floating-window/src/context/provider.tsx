import React, { createContext, type ReactNode, useReducer } from "react";

import { Header } from "../components/Header";
import styles from "./provider.module.scss";
import { initialState, reducer } from "./reducer";
import type { Action, State } from "./types";

export type ContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const FloatingWindowContext = createContext<ContextValue | undefined>(
  undefined,
);

export const FloatingWindowProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: ContextValue = {
    state,
    dispatch,
  };

  const minimizedWindows = Object.values(state.windows).filter(
    (w) => w.status === "minimized",
  );

  return (
    <FloatingWindowContext.Provider value={value}>
      <div className={styles.container}>
        <div className={styles.windows}>{children}</div>
        {minimizedWindows.length > 0 && (
          <div className={styles.taskbar}>
            {Object.values(state.windows)
              .filter((w) => w.status === "minimized")
              .map((w) => (
                <Header
                  key={w.id}
                  id={w.id}
                  title={w.title}
                  draggable={false}
                  maximizable={w.maximizable}
                  minimizable={w.minimizable}
                  onDragPointerDown={() => null}
                />
              ))}
          </div>
        )}
      </div>
    </FloatingWindowContext.Provider>
  );
};

export default FloatingWindowContext;
