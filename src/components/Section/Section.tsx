import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type SectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export const Section: FC<SectionProps> = ({ title, children, className }) => {
  return (
    <div className={clsx(styles.section, className)}>
      {title && (
        <Typography tag="h4" weight="normal" className={styles.title}>
          {title}
        </Typography>
      )}
      {children}
    </div>
  );
};
