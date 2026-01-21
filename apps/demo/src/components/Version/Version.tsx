import { getSafeEnvVar } from "../../utils/get-safe-env-var";
import styles from "./Version.module.scss";

export const Version = () => {
  const buildVersion = getSafeEnvVar({ key: "VITE_BUILD_VERSION" });

  return <div className={styles.root}>{buildVersion}</div>;
};
