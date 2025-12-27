import { Menu } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window";
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
import { generateDefaultWindow, generateWindowId } from "../../methods";
import { Preferences } from "../Preferences";
import { Settings } from "../Settings";

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const isSettingsOpen = useAppSelector(selectSettingsOpen);
  const isPreferencesOpen = useAppSelector(selectPreferencesOpen);
  const { size: settingWindowSize } = useAppSelector(selectSettingsWindow);
  const { setFocusedFloatingWindow, registerFloatingWindow } =
    useFloatingWindows();

  const handleAddWindow = () => {
    const id = generateWindowId();
    registerFloatingWindow(generateDefaultWindow(id, settingWindowSize));
    queueMicrotask(() => setFocusedFloatingWindow(id));
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
      <Menu root open frameless direction="row" variant="light-ghost" label="">
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
            href={import.meta.env.VITE_GITHUB_REPOSITORY}
          />
        </Menu>
      </Menu>
      {isSettingsOpen && <Settings />}
      {isPreferencesOpen && <Preferences />}
    </>
  );
};
