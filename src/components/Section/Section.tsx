import { FC, PropsWithChildren } from "react";

import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type SectionProps = PropsWithChildren<{
  title?: string;
}>;

export const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <div className={styles.section}>
      {title && (
        <Typography tag="h4" weight="normal" className={styles.title}>
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};
