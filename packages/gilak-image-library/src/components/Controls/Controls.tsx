import { Head, Toggle } from "@gilak/components";
import { useImageLibrary } from "@gilak/image-library/hooks";
import { t } from "@gilak/localization";

import type { ImageLibraryView } from "../../types";

export const Controls = () => {
  const { view, setView } = useImageLibrary();

  return (
    <Head variant="dark">
      {t("imageLibrary:upload.header")}
      <Toggle
        options={[
          { id: "grid", label: t("imageLibrary:view.grid") },
          { id: "list", label: t("imageLibrary:view.list") },
        ]}
        rounded
        variant="primary"
        size="sm"
        fullWidth={false}
        alignment="center"
        frameless={false}
        disabled={false}
        selected={view}
        onChange={(id) => setView(id as ImageLibraryView)}
      />
    </Head>
  );
};
