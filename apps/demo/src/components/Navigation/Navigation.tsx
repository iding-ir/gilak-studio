import { Menu } from "@gilak/components";
import { t } from "@gilak/localization";
import { toggleFullscreen } from "@gilak/utils";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  openPreferences,
  selectPreferencesOpen,
} from "../../features/preferences/preferences-slice";
import {
  openSettings,
  selectSettingsOpen,
  selectSettingsWindow,
} from "../../features/settings/settings-slice";
import { useDocument } from "../../hooks/useDocument";
import { getSafeEnvVar } from "../../utils/get-safe-env-var";
import { Preferences } from "../Preferences";
import { Settings } from "../Settings";

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const isSettingsOpen = useAppSelector(selectSettingsOpen);
  const isPreferencesOpen = useAppSelector(selectPreferencesOpen);
  const { size: settingWindowSize } = useAppSelector(selectSettingsWindow);
  const { addDocument } = useDocument();

  const handleAddWindow = () => {
    addDocument(settingWindowSize);
  };

  const handleClickSettings = () => {
    dispatch(openSettings());
  };

  const handleClickPreferences = () => {
    dispatch(openPreferences());
  };

  const handleToggleFullscreen = () => {
    toggleFullscreen();
  };

  return (
    <>
      <Menu root open frameless direction="row" label="">
        <Menu label={t("app:navigation.file")} closeOnClickInside>
          <Menu label={t("app:navigation.new")} onClick={handleAddWindow} />
          <Menu
            label={t("app:navigation.settings")}
            onClick={handleClickSettings}
          />
        </Menu>
        <Menu label={t("app:navigation.view")} closeOnClickInside>
          <Menu
            label={t("app:navigation.fullscreen")}
            onClick={handleToggleFullscreen}
          />
        </Menu>
        <Menu label={t("app:navigation.app")} closeOnClickInside>
          <Menu
            label={t("app:navigation.preferences")}
            onClick={handleClickPreferences}
          />
          <Menu
            label={t("app:navigation.github")}
            href={getSafeEnvVar({ key: "VITE_GITHUB_REPOSITORY" })}
          />
        </Menu>
      </Menu>
      {isSettingsOpen && <Settings />}
      {isPreferencesOpen && <Preferences />}
    </>
  );
};
