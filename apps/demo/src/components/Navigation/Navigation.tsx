import { Menu } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  openSettings,
  selectSettingsWindow,
} from "../../features/settings/settings-slice";
import { generateDefaultWindow, generateWindowId } from "../../methods";

export const Navigation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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

  return (
    <Menu root open direction="row" label="">
      <Menu label={t("navigation.file")} closeOnClickInside>
        <Menu label={t("navigation.new")} onClick={handleAddWindow} />
        <Menu label={t("navigation.open")} />
      </Menu>
      <Menu label={t("navigation.settings")} onClick={handleClickSettings} />
      <Menu label={t("navigation.view")} />
      <Menu label={t("navigation.help")} />
    </Menu>
  );
};
