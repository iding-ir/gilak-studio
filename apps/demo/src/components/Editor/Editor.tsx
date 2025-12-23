import { useAppSelector } from "../../app/hooks";
import { selectSettingsOpen } from "../../features/settings/settings-slice";
import { Navigation } from "../Navigation";
import { Settings } from "../Settings";
import { Tools } from "../Tools";
import { Windows } from "../Windows";
import styles from "./Editor.module.scss";

export const Editor = () => {
  const isSettingsOpen = useAppSelector(selectSettingsOpen);

  return (
    <>
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

      {isSettingsOpen && <Settings />}
    </>
  );
};
