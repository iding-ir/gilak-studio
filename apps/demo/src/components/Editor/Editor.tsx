import { FloatingWindowProvider } from "@gilak/floating-window";

import { Navigation } from "../Navigation";
import { Tools } from "../Tools";
import { Windows } from "../Windows";
import styles from "./Editor.module.scss";

export const Editor = () => {
  return (
    <FloatingWindowProvider>
      <div className={styles.root}>
        <nav className={styles.nav}>
          <Navigation />
        </nav>
        <header className={styles.header}>
          <Tools />
        </header>
        <main className={styles.main}>
          <Windows />
        </main>
      </div>
    </FloatingWindowProvider>
  );
};
