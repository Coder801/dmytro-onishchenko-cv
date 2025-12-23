import { FC, ReactNode } from "react";
import {
  Typography,
  TypographyWeight,
  TypographTagType,
  TypographyVariant,
} from "@/ui/Typography";
import clsx from "clsx";

import styles from "./styles.module.scss";

type TitleProps = {
  tag?: TypographTagType;
  className?: string;
  children: ReactNode;
  weight?: TypographyWeight;
  type?: TypographyVariant;
};

export const Title: FC<TitleProps> = ({
  tag,
  children,
  type = "primary",
  weight = "normal",
  className,
}) => (
  <div className={clsx(styles.container, styles[type], className)}>
    <Typography className={styles.title} tag={tag} weight={weight}>
      {children}
    </Typography>
  </div>
);
