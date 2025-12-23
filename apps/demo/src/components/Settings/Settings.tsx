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
  selectDoc,
  selectWin,
  setSettings,
} from "../../features/settings/settings-slice";
import { selectTheme, setTheme } from "../../features/theme/theme-slice";
import { themes } from "../../features/theme/themes";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const doc = useAppSelector(selectDoc);
  const win = useAppSelector(selectWin);
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const [docW, setDocW] = useState(doc.w);
  const [docH, setDocH] = useState(doc.h);
  const [winW, setWinW] = useState(win.w);
  const [winH, setWinH] = useState(win.h);
  const [lang, setLang] = useState(language);
  const [thm, setThm] = useState(theme);

  const handleClose = () => {
    dispatch(closeSettings());
  };

  const handleSave = () => {
    dispatch(
      setSettings({
        open: false,
        doc: { ...doc, w: docW, h: docH },
        win: { ...win, w: winW, h: winH },
      }),
    );
    dispatch(setLanguage(lang));
    dispatch(setTheme(thm));
  };

  return (
    <Dialog open={true} onClose={handleClose} title={t("settings.title")}>
      <Group direction="column">
        <Group direction="row">
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
        <Group direction="row">
          <Group direction="row" title={t("settings.language")}>
            <List
              items={Object.values(languages).map(({ code }) => (
                <Text
                  text={t(`languages.${code}`)}
                  selected={lang === code}
                  frameless
                  onClick={() => setLang(code)}
                />
              ))}
              count={1}
              frameless
              direction="row"
              variant="light"
            />
          </Group>
          <Group direction="row" title={t("settings.theme")}>
            <List
              items={Object.values(themes).map(({ code }) => (
                <Text
                  text={t(`themes.${code}`)}
                  selected={thm === code}
                  frameless
                  onClick={() => setThm(code)}
                />
              ))}
              count={1}
              frameless
              direction="row"
              variant="light"
            />
          </Group>
        </Group>
        <Group direction="rowReverse">
          <Button variant="primary" onClick={handleSave}>
            {t("settings.save")}
          </Button>
        </Group>
      </Group>
    </Dialog>
  );
};
