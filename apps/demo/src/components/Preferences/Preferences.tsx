import { Button, Dialog, Group, List, Text } from "@gilak/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { languages } from "../../features/preferences/language/languages";
import {
  closePreferences,
  selectLanguage,
  selectTheme,
  setLanguage,
  setTheme,
} from "../../features/preferences/preferences-slice";
import { themes } from "../../features/preferences/theme/themes";

export const Preferences = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const [lang, setLang] = useState(language);
  const [thm, setThm] = useState(theme);

  const handleClose = () => {
    dispatch(closePreferences());
  };

  const handleSave = () => {
    dispatch(closePreferences());
    dispatch(setLanguage(lang));
    dispatch(setTheme(thm));
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      heading={t("preferences.heading")}
      actions={
        <Button variant="primary" onClick={handleSave}>
          {t("preferences.save")}
        </Button>
      }
    >
      <Group direction="column">
        <Group direction="row" title={t("preferences.language")}>
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
        <Group direction="row" title={t("preferences.theme")}>
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
    </Dialog>
  );
};
