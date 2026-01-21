import { Button, Icon, Link } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window";
import { t } from "@gilak/localization";

import { useAppSelector } from "../../app/hooks";
import IconFile from "../../assets/icon-file.svg?url";
import IconGithub from "../../assets/icon-github.svg?url";
import { selectSettingsWindow } from "../../features/settings/settings-slice";
import { generateDefaultWindow, generateWindowId } from "../../methods";
import { getSafeEnvVar } from "../../utils/get-safe-env-var";
import styles from "./WelcomeScreen.module.scss";

export const WelcomeScreen = () => {
  const { registerFloatingWindow } = useFloatingWindows();
  const { size: settingWindowSize } = useAppSelector(selectSettingsWindow);

  const handleAddWindow = () => {
    const id = generateWindowId();
    registerFloatingWindow(generateDefaultWindow(id, settingWindowSize));
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

        <Button variant="primary" fullWidth onClick={handleAddWindow}>
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

        <Link
          variant="primary"
          text={t("app:welcomeScreen.github")}
          fullWidth
          href={getSafeEnvVar({ key: "VITE_GITHUB_REPOSITORY" })}
          target="_blank"
        />
      </div>
    </div>
  );
};
