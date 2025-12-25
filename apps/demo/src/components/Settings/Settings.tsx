import { Button, Dialog, Group, Input, List, Text } from "@gilak/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectLanguage,
  setLanguage,
} from "../../features/language/language-slice";
import { languages } from "../../features/language/languages";
import {
  closeSettings,
  selectSettingsDocument,
  selectSettingsWindow,
  setDocumentSettings,
  setWindowSettings,
} from "../../features/settings/settings-slice";
import { selectTheme, setTheme } from "../../features/theme/theme-slice";
import { themes } from "../../features/theme/themes";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const documentSettings = useAppSelector(selectSettingsDocument);
  const windowSettings = useAppSelector(selectSettingsWindow);
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const [docW, setDocW] = useState(documentSettings.size.w);
  const [docH, setDocH] = useState(documentSettings.size.h);
  const [winW, setWinW] = useState(windowSettings.size.w);
  const [winH, setWinH] = useState(windowSettings.size.h);
  const [lang, setLang] = useState(language);
  const [thm, setThm] = useState(theme);

  const handleClose = () => {
    dispatch(closeSettings());
  };

  const handleSave = () => {
    dispatch(
      setDocumentSettings({ ...documentSettings, size: { w: docW, h: docH } }),
    );
    dispatch(
      setWindowSettings({ ...windowSettings, size: { w: winW, h: winH } }),
    );
    dispatch(closeSettings());
    dispatch(setLanguage(lang));
    dispatch(setTheme(thm));
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      heading={t("settings.heading")}
      actions={
        <Button variant="primary" onClick={handleSave}>
          {t("settings.save")}
        </Button>
      }
    >
      <Group direction="column">
        <Group direction="column">
          <Group direction="row" title={t("settings.document")}>
            <Input
              name="documentWidth"
              type="number"
              label={t("settings.width")}
              placeholder={t("settings.number")}
              value={docW}
              onChange={(e) => setDocW(Number(e.target.value))}
            />
            <Input
              name="documentHeight"
              type="number"
              label={t("settings.height")}
              placeholder={t("settings.number")}
              value={docH}
              onChange={(e) => setDocH(Number(e.target.value))}
            />
          </Group>
          <Group direction="row" title={t("settings.window")}>
            <Input
              name="windowWidth"
              type="number"
              label={t("settings.width")}
              placeholder={t("settings.number")}
              value={winW}
              onChange={(e) => setWinW(Number(e.target.value))}
            />
            <Input
              name="windowHeight"
              type="number"
              label={t("settings.height")}
              placeholder={t("settings.number")}
              value={winH}
              onChange={(e) => setWinH(Number(e.target.value))}
            />
          </Group>
        </Group>
        <Group direction="column">
          <Group direction="row" title={t("settings.language")}>
            <List
              items={Object.values(languages).map(({ code }) => (
                <Text
                  key={code}
                  text={t(`languages.${code}`)}
                  variant="dark-ghost"
                  selected={lang === code}
                  frameless
                  interactive
                  onClick={() => setLang(code)}
                />
              ))}
              count={1}
              frameless
              direction="row"
              variant="dark-ghost"
            />
          </Group>
          <Group direction="row" title={t("settings.theme")}>
            <List
              items={Object.values(themes).map(({ code }) => (
                <Text
                  key={code}
                  text={t(`themes.${code}`)}
                  variant="dark-ghost"
                  selected={thm === code}
                  frameless
                  interactive
                  onClick={() => setThm(code)}
                />
              ))}
              count={1}
              frameless
              direction="row"
              variant="dark-ghost"
            />
          </Group>
        </Group>
      </Group>
    </Dialog>
  );
};
