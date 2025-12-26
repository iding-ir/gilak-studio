import { Menu } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window";
import { toggleFullscreen } from "@gilak/utils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
        <Menu label={t("navigation.file.label")} closeOnClickInside>
          <Menu label={t("navigation.file.new")} onClick={handleAddWindow} />
          <Menu
            label={t("navigation.file.settings")}
            onClick={handleClickSettings}
          />
        </Menu>
        <Menu label={t("navigation.view.label")} closeOnClickInside>
          <Menu
            label={t("navigation.view.fullscreen")}
            onClick={handleToggleFullscreen}
          />
        </Menu>
        <Menu label={t("navigation.app.label")} closeOnClickInside>
          <Menu
            label={t("navigation.app.preferences")}
            onClick={handleClickPreferences}
          />
          <Menu
            label={t("navigation.app.github")}
            href="https://github.com/iding-ir/gilak-studio"
          />
        </Menu>
      </Menu>
      {isSettingsOpen && <Settings />}
      {isPreferencesOpen && <Preferences />}
    </>
  );
};
