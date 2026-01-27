import { Layers, useDocumentLayers } from "@gilak/canvas";
import { useFloatingWindows } from "@gilak/floating-window";

import { Library } from "../Library";
import { Navigation } from "../Navigation";
import { Tools } from "../Tools";
import { Version } from "../Version";
import { Windows } from "../Windows";
import styles from "./Editor.module.scss";

export const Editor = () => {
  const { focused } = useFloatingWindows();
  const { documentLayers } = useDocumentLayers({
    documentId: focused || "",
  });

  return (
    <div id="editor" className={styles.root}>
      <nav className={styles.nav}>
        <Navigation />
        <Version />
      </nav>
      <header className={styles.header}>
        <Tools />
      </header>
      <aside className={styles.aside}>
        <div className={styles.panel}>
          <Library />
        </div>
        <div className={styles.panel}>
          <Layers layers={documentLayers} />
        </div>
      </aside>
      <main className={styles.main}>
        <Windows />
      </main>
    </div>
  );
};
