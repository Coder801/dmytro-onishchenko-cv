import { FC } from "react";

import styles from "./styles.module.scss";

export const BuildVersion: FC = () => {
  const version = process.env.APP_VERSION;
  const hash = process.env.GIT_HASH;

  if (!version) {
    return null;
  }

  return (
    <span className={styles.badge} title="Build version">
      v{version} {hash ? `-${hash}` : ""}
    </span>
  );
};
