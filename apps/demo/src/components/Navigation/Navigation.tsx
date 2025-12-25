import { Menu } from "@gilak/components";
import { useFloatingWindows } from "@gilak/floating-window";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../../app/hooks";
import { openSettings } from "../../features/settings/settings-slice";
import { addWindow } from "../../features/windows/windows-slice";
import { generateWindowId } from "../../methods";

export const Navigation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setFocusedFloatingWindow } = useFloatingWindows();

  const handleAddWindow = () => {
    const id = generateWindowId();
    dispatch(addWindow({ id }));
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
