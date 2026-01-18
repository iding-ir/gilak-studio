import { Button, Dialog, Group, Radio } from "@gilak/components";
import { t } from "@gilak/localization";
import { useState } from "react";

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
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const [lang, setLang] = useState(language);
  const [thm, setThm] = useState(theme);

  const languageArray = Object.values(languages).map(({ code }) => ({
    value: code,
    label: t(`app:languages.${code}`),
  }));

  const themeArray = Object.values(themes).map(({ code }) => ({
    value: code,
    label: t(`app:themes.${code}`),
  }));

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
      heading={t("app:preferences.heading")}
      inertId="editor"
      actions={
        <Button variant="primary" onClick={handleSave}>
          {t("app:preferences.save")}
        </Button>
      }
    >
      <Group direction="column">
        <Group direction="row" title={t("app:preferences.language")}>
          <Radio items={languageArray} selected={lang} setSelected={setLang} />
        </Group>
        <Group direction="row" title={t("app:preferences.theme")}>
          <Radio items={themeArray} selected={thm} setSelected={setThm} />
        </Group>
      </Group>
    </Dialog>
  );
};
