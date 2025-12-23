import { Dropdown, Icon, List, Text } from "@gilak/components";
import type { LanguageCode } from "@gilak/localization";
import { LANGUAGES } from "@gilak/localization";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import IconLanguage from "../../../assets/icon-language.svg?url";
import { selectLanguage, setLanguage } from "../language-slice";

export const Language = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  const handleLanguageSelect = (language: LanguageCode) => {
    dispatch(setLanguage(language));
  };

  const items = Object.values(LANGUAGES).map(({ code }) => (
    <Text
      text={code.toUpperCase()}
      selected={language === code}
      frameless
      onClick={() => handleLanguageSelect(code)}
    />
  ));

  return (
    <Dropdown position="bottom" trigger={<Icon icon={IconLanguage} />}>
      <List items={items} count={1} direction="column" variant="light" />
    </Dropdown>
  );
};
