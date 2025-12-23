import { List, Text } from "@gilak/components";
import type { LanguageCode } from "@gilak/localization";
import { LANGUAGES } from "@gilak/localization";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectLanguage, setLanguage } from "../language-slice";

export const Language = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const { t } = useTranslation();

  const handleLanguageSelect = (language: LanguageCode) => {
    dispatch(setLanguage(language));
  };

  const items = Object.values(LANGUAGES).map(({ code }) => (
    <Text
      text={t(`languages.${code}`)}
      selected={language === code}
      frameless
      onClick={() => handleLanguageSelect(code)}
    />
  ));

  return (
    <List items={items} count={1} frameless direction="row" variant="light" />
  );
};
