import { Button, Icon } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window";
import { t } from "@gilak/localization";

import { useAppSelector } from "../../app/hooks";
import IconFile from "../../assets/icon-file.svg?url";
import IconGithub from "../../assets/icon-github.svg?url";
import { selectSettingsWindow } from "../../features/settings/settings-slice";
import { generateDefaultWindow, generateWindowId } from "../../methods";
import styles from "./WelcomeScreen.module.scss";

export const WelcomeScreen = () => {
  const { setFocusedFloatingWindow, registerFloatingWindow } =
    useFloatingWindows();
  const { size: settingWindowSize } = useAppSelector(selectSettingsWindow);

  const handleAddWindow = () => {
    const id = generateWindowId();
    registerFloatingWindow(generateDefaultWindow(id, settingWindowSize));
    queueMicrotask(() => setFocusedFloatingWindow(id));
  };

  const handleClickGithub = () => {
    window.open(
      import.meta.env.VITE_GITHUB_REPOSITORY,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <Icon
          icon={IconFile}
          className={styles.icon}
          frameless
          size="xxl"
          variant="light-ghost"
          interactive={false}
        />

        <Button variant="primary" onClick={handleAddWindow}>
          {t("app:welcomeScreen.newWindow")}
        </Button>
      </div>

      <div className={styles.item}>
        <Icon
          icon={IconGithub}
          className={styles.icon}
          frameless
          size="xxl"
          variant="light-ghost"
          interactive={false}
        />

        <Button variant="primary" onClick={handleClickGithub}>
          {t("app:welcomeScreen.github")}
        </Button>
      </div>
    </div>
  );
};
