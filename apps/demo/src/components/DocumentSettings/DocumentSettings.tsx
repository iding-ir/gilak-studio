import { Button, Dialog, Group, Input } from "@gilak/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type DocumentSettingsProps = {
  documentWidth: number;
  documentHeight: number;
  setDocumentWidth: (width: number) => void;
  setDocumentHeight: (height: number) => void;
  setDocumentSettingsOpen: (open: boolean) => void;
};

export const DocumentSettings = ({
  documentWidth,
  documentHeight,
  setDocumentWidth,
  setDocumentHeight,
  setDocumentSettingsOpen,
}: DocumentSettingsProps) => {
  const { t } = useTranslation();
  const [docW, setDocW] = useState(documentWidth);
  const [docH, setDocH] = useState(documentHeight);

  const handleClose = () => {
    setDocumentSettingsOpen(false);
  };

  const handleSave = () => {
    setDocumentWidth(docW);
    setDocumentHeight(docH);
    setDocumentSettingsOpen(false);
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
      </Group>
    </Dialog>
  );
};
