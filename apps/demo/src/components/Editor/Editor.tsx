import { Elements } from "@gilak/canvas";

import { Controls } from "../Controls";
import { Library } from "../Library";
import { Navigation } from "../Navigation";
import { Tools } from "../Tools";
import { Version } from "../Version";
import { Windows } from "../Windows";
import styles from "./Editor.module.scss";

export const Editor = () => {
  return (
    <div id="editor" className={styles.root}>
      <nav className={styles.nav}>
        <Navigation />
        <Version />
      </nav>
      <header className={styles.header}>
        <Tools />
        <Controls />
      </header>
      <aside className={styles.aside}>
        <div className={styles.panel}>
          <Library />
        </div>
        <div className={styles.panel}>
          <Elements />
        </div>
      </aside>
      <main className={styles.main}>
        <Windows />
      </main>
    </div>
  );
};
