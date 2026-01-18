import { Button, Dialog, Group, Input } from "@gilak/components";
import { t } from "@gilak/localization";
import { useState } from "react";

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
      heading={t("app:window.settings.title")}
      inertId="editor"
      actions={
        <Button variant="primary" onClick={handleSave}>
          {t("app:window.settings.save")}
        </Button>
      }
    >
      <Group direction="column">
        <Group direction="row" title={t("app:window.settings.document")}>
          <Input
            name="documentWidth"
            type="number"
            label={t("app:window.settings.width")}
            placeholder={t("app:window.settings.number")}
            value={docW}
            onChange={(e) => setDocW(Number(e.target.value))}
          />
          <Input
            name="documentHeight"
            type="number"
            label={t("app:window.settings.height")}
            placeholder={t("app:window.settings.number")}
            value={docH}
            onChange={(e) => setDocH(Number(e.target.value))}
          />
        </Group>
      </Group>
    </Dialog>
  );
};
