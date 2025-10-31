import { FC } from "react";
import { Typography } from "@/ui/Typography";
import { SvgIcon } from "@/ui/SvgIcon";
import clsx from "clsx";

import { SocialLinkProps } from "./types";

import styles from "./styles.module.scss";

export const SocialLink: FC<SocialLinkProps> = ({
  icon,
  children,
  className,
  link,
}) => (
  <a href={link} className={clsx(styles.container, className)}>
    <SvgIcon name={icon} className={styles.icon} />
    <Typography className={styles.title}>{children}</Typography>
  </a>
);
