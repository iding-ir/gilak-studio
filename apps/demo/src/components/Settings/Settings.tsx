import { Button, Dialog, Group, Input } from "@gilak/components";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeSettings,
  selectDoc,
  selectSettingsOpen,
  selectWin,
  setSettings,
} from "../../features/settings/settings-slice";

export const Settings = () => {
  const dispatch = useAppDispatch();
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
    <Dialog open={isOpen} onClose={handleClose} title="Settings">
      <Group direction="column">
        <Group direction="row">
          <Group direction="row" title="Document">
            <Input
              name="documentWidth"
              type="number"
              label="Width"
              placeholder="Number"
              value={docW}
              onChange={(e) => setDocW(Number(e.target.value))}
            />
            <Input
              name="documentHeight"
              type="number"
              label="Height"
              placeholder="Number"
              value={docH}
              onChange={(e) => setDocH(Number(e.target.value))}
            />
          </Group>
          <Group direction="row" title="Window">
            <Input
              name="windowWidth"
              type="number"
              label="Width"
              placeholder="Number"
              value={winW}
              onChange={(e) => setWinW(Number(e.target.value))}
            />
            <Input
              name="windowHeight"
              type="number"
              label="Height"
              placeholder="Number"
              value={winH}
              onChange={(e) => setWinH(Number(e.target.value))}
            />
          </Group>
        </Group>
        <Group direction="rowReverse">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Group>
      </Group>
    </Dialog>
  );
};
