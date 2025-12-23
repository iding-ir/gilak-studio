import { Button, Dialog, Group, Input } from "@gilak/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Language } from "../../features/language/components/Language";
import {
  closeSettings,
  selectDoc,
  selectSettingsOpen,
  selectWin,
  setSettings,
} from "../../features/settings/settings-slice";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isOpen = useAppSelector(selectSettingsOpen);
  const doc = useAppSelector(selectDoc);
  const win = useAppSelector(selectWin);
  const [docW, setDocW] = useState(doc.w);
  const [docH, setDocH] = useState(doc.h);
  const [winW, setWinW] = useState(win.w);
  const [winH, setWinH] = useState(win.h);

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
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} title={t("settings.title")}>
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
            <Language />
          </Group>
          <Group direction="row" title={t("settings.theme")}></Group>
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
