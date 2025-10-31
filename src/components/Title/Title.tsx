import { FC, ReactNode } from "react";
import { Typography } from "@/ui/Typography";
import clsx from "clsx";

import styles from "./styles.module.scss";

type TitleProps = {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: ReactNode;
  type?: "primary" | "secondary";
};

export const Title: FC<TitleProps> = ({
  tag,
  children,
  type = "primary",
  className,
}) => (
  <div className={clsx(styles.container, styles[type], className)}>
    <Typography className={styles.title} tag={tag} weight="bold">
      {children}
    </Typography>
  </div>
);
