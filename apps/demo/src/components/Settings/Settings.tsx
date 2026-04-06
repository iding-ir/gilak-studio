import { Button, Dialog, Group, Input, Toggle } from "@gilak/components";
import { t } from "@gilak/localization";
import { useState } from "react";

import { clearAllPersistedState } from "../../app/clear-persisted-state";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeSettings,
  selectSettingsAutoSaveEnabled,
  selectSettingsDocument,
  selectSettingsWindow,
  setAutoSaveEnabled,
  setDocumentSize,
  setWindowSize,
} from "../../features/settings/settings-slice";

export const Settings = () => {
  const dispatch = useAppDispatch();
  const documentSettings = useAppSelector(selectSettingsDocument);
  const windowSettings = useAppSelector(selectSettingsWindow);
  const autoSaveEnabled = useAppSelector(selectSettingsAutoSaveEnabled);
  const [docW, setDocW] = useState(documentSettings.size.w);
  const [docH, setDocH] = useState(documentSettings.size.h);
  const [winW, setWinW] = useState(windowSettings.size.w);
  const [winH, setWinH] = useState(windowSettings.size.h);
  const [autoSave, setAutoSave] = useState(autoSaveEnabled);
  const [clearingInProgress, setClearingInProgress] = useState(false);

  const handleClose = () => {
    dispatch(closeSettings());
  };

  const handleClearPersistedState = async () => {
    const confirmed = window.confirm(t("app:settings.autoSave.clear.confirm"));

    if (!confirmed) {
      return;
    }

    setClearingInProgress(true);

    try {
      await clearAllPersistedState();
      window.location.reload();
    } catch (error) {
      console.warn("Failed to clear persisted state.", error);
      setClearingInProgress(false);
    }
  };

  const handleSave = () => {
    dispatch(setDocumentSize({ w: docW, h: docH }));
    dispatch(setWindowSize({ w: winW, h: winH }));
    dispatch(setAutoSaveEnabled(autoSave));
    dispatch(closeSettings());
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      heading={t("app:settings.title")}
      inertId="editor"
      actions={
        <Button variant="primary" onClick={handleSave}>
          {t("app:settings.save")}
        </Button>
      }
    >
      <Group direction="column">
        <Group direction="row" title={t("app:settings.document")}>
          <Input
            name="documentWidth"
            type="number"
            label={t("app:settings.width")}
            placeholder={t("app:settings.number")}
            value={docW}
            onChange={(e) => setDocW(Number(e.target.value))}
          />
          <Input
            name="documentHeight"
            type="number"
            label={t("app:settings.height")}
            placeholder={t("app:settings.number")}
            value={docH}
            onChange={(e) => setDocH(Number(e.target.value))}
          />
        </Group>
        <Group direction="row" title={t("app:settings.window")}>
          <Input
            name="windowWidth"
            type="number"
            label={t("app:settings.width")}
            placeholder={t("app:settings.number")}
            value={winW}
            onChange={(e) => setWinW(Number(e.target.value))}
          />
          <Input
            name="windowHeight"
            type="number"
            label={t("app:settings.height")}
            placeholder={t("app:settings.number")}
            value={winH}
            onChange={(e) => setWinH(Number(e.target.value))}
          />
        </Group>
        <Group direction="row" title={t("app:settings.autoSave.title")}>
          <Toggle
            options={[
              {
                id: "enabled",
                label: t("app:settings.autoSave.enabled"),
              },
              {
                id: "disabled",
                label: t("app:settings.autoSave.disabled"),
              },
            ]}
            selected={autoSave ? "enabled" : "disabled"}
            onChange={(id) => setAutoSave(id === "enabled")}
          />
          <Button
            type="button"
            variant="dark"
            disabled={clearingInProgress}
            onClick={() => {
              void handleClearPersistedState();
            }}
          >
            {clearingInProgress
              ? t("app:settings.autoSave.clear.clearing")
              : t("app:settings.autoSave.clear.button")}
          </Button>
        </Group>
      </Group>
    </Dialog>
  );
};
