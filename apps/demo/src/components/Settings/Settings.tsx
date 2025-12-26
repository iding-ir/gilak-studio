import { Button, Dialog, Group, Input } from "@gilak/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeSettings,
  selectSettingsDocument,
  selectSettingsWindow,
  setDocumentSize,
  setWindowSize,
} from "../../features/settings/settings-slice";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const documentSettings = useAppSelector(selectSettingsDocument);
  const windowSettings = useAppSelector(selectSettingsWindow);
  const [docW, setDocW] = useState(documentSettings.size.w);
  const [docH, setDocH] = useState(documentSettings.size.h);
  const [winW, setWinW] = useState(windowSettings.size.w);
  const [winH, setWinH] = useState(windowSettings.size.h);

  const handleClose = () => {
    dispatch(closeSettings());
  };

  const handleSave = () => {
    dispatch(setDocumentSize({ w: docW, h: docH }));
    dispatch(setWindowSize({ w: winW, h: winH }));
    dispatch(closeSettings());
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
    </Dialog>
  );
};
