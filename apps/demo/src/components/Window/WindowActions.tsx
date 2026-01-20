import { downloadCanvas, type ImageFormat } from "@gilak/canvas";
import { Menu } from "@gilak/components";
import { useFloatingWindow } from "@gilak/floating-window";
import { t } from "@gilak/localization";

export type WindowActionsProps = {
  id: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onClickDocumentSettings: () => void;
};

export const WindowActions = ({
  id,
  canvasRef,
  onClickDocumentSettings,
}: WindowActionsProps) => {
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
    <Menu root open direction="column" frameless={false} label="">
      <Menu
        label={t("app:window.settings.title")}
        onClick={onClickDocumentSettings}
      />
      <Menu label={t("app:window.export")} direction="column" position="right">
        <Menu label={t("app:window.png")} onClick={() => handleExport("png")} />
        <Menu
          label={t("app:window.jpeg")}
          onClick={() => handleExport("jpeg")}
        />
        <Menu
          label={t("app:window.webp")}
          onClick={() => handleExport("webp")}
        />
      </Menu>
    </Menu>
  );
};
