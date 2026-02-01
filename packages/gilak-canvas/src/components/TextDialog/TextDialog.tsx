import { Button, Dialog, Group, Input } from "@gilak/components";
import { t } from "@gilak/localization";
import { useState } from "react";

import { selectTextInputOpen, selectTextSettings } from "../../context";
import { useCanvas } from "../../hooks/useCanvas";
import { createElementFromText } from "../../methods/create-element-from-text";
import type { Size } from "../../types/index";

export type TextDialogProps = {
  size: Size;
  color: string;
};

export const TextDialog = ({ size, color }: TextDialogProps) => {
  const { state, addElement, switchTextDialog } = useCanvas();
  const { fontSize, fontFamily } = selectTextSettings(state);
  const open = selectTextInputOpen(state);
  const [value, setValue] = useState("");

  const handleClose = () => {
    switchTextDialog(false);
  };

  const handleSave = () => {
    const element = createElementFromText({
      content: {
        text: value,
        color,
        fontSize,
        fontFamily,
      },
      position: { x: size.w, y: size.h },
      documentSize: size,
    });

    addElement(element);
    switchTextDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  if (!open) return null;

  return (
    <Dialog
      portal={false}
      open={open}
      onClose={handleClose}
      heading={t("canvas:textDialog.heading")}
      actions={
        <Button variant="primary" onClick={handleSave}>
          {t("canvas:textDialog.enter")}
        </Button>
      }
    >
      <Group direction="column">
        <Group direction="row" title={t("canvas:textDialog.text")}>
          <Input fullWidth value={value} onChange={handleChange} />
        </Group>
      </Group>
    </Dialog>
  );
};
