import { Menu } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window";
import { toggleFullscreen } from "@gilak/utils";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  openSettings,
  selectSettingsOpen,
  selectSettingsWindow,
} from "../../features/settings/settings-slice";
import { generateDefaultWindow, generateWindowId } from "../../methods";
import { Settings } from "../Settings";

export const Navigation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isSettingsOpen = useAppSelector(selectSettingsOpen);
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

  const handleToggleFullscreen = () => {
    toggleFullscreen();
  };

  return (
    <>
      <Menu root open frameless direction="row" variant="light-ghost" label="">
        <Menu label={t("navigation.file")} closeOnClickInside>
          <Menu label={t("navigation.new")} onClick={handleAddWindow} />
          <Menu label={t("navigation.open")} />
        </Menu>
        <Menu label={t("navigation.settings")} onClick={handleClickSettings} />
        <Menu label={t("navigation.view")} closeOnClickInside>
          <Menu
            label={t("navigation.fullscreen")}
            onClick={handleToggleFullscreen}
          />
        </Menu>
        <Menu label={t("navigation.help")} direction="column">
          <Menu
            label={t("navigation.github")}
            href="https://github.com/iding-ir/gilak-studio"
          />
        </Menu>
      </Menu>
      {isSettingsOpen && <Settings />}
    </>
  );
};
