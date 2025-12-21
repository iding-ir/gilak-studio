import { Menu } from "@gilak/components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addWindow,
  selectAllWindows,
} from "../../features/windows/windows-slice";

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector(selectAllWindows);

  const handleAddWindow = () => {
    const id = Date.now().toString();
    const title = `Untitled-${windows.length + 1}`;
    dispatch(addWindow({ id, title }));
  };

  const handleChangeTheme = (theme: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <Menu label="" root direction="row" open>
      <Menu label="File">
        <Menu label="New" onClick={handleAddWindow} />
        <Menu label="Open" />
      </Menu>
      <Menu label="Theme">
        <Menu label="Light" onClick={() => handleChangeTheme("light")} />
        <Menu label="Dark" onClick={() => handleChangeTheme("dark")} />
      </Menu>
      <Menu label="View" />
      <Menu label="Help" />
    </Menu>
  );
};
