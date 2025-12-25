import { downloadCanvas, type ImageFormat } from "@gilak/canvas";
import { Menu } from "@gilak/components";
import { useFloatingWindow } from "@gilak/floating-window";
import { useTranslation } from "react-i18next";

export type WindowActionsProps = {
  id: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export const WindowActions = ({ id, canvasRef }: WindowActionsProps) => {
  const { t } = useTranslation();
  const { title } = useFloatingWindow(id);

  const handleExport = async (format: ImageFormat) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    await downloadCanvas({
      canvas,
      fileName: title || "Untitled",
      format,
      quality: 1,
    });
  };

  return (
    <Menu root open direction="row" label="">
      <Menu
        label={t("export.export")}
        direction="column"
        position="bottom"
        closeOnClickInside={false}
      >
        <Menu label={t("export.png")} onClick={() => handleExport("png")} />
        <Menu label={t("export.jpeg")} onClick={() => handleExport("jpeg")} />
        <Menu label={t("export.webp")} onClick={() => handleExport("webp")} />
      </Menu>
    </Menu>
  );
};
