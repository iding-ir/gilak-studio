import { useHead } from "@gilak/utils";
import { useTranslation } from "react-i18next";

import { getSafeEnvVar } from "../../utils/get-safe-env-var";

export const useAppHead = () => {
  const { t } = useTranslation();

  useHead({
    title: `${getSafeEnvVar({ key: "VITE_TITLE" })} | ${t("app:head.title")}`,
  });

  return null;
};
