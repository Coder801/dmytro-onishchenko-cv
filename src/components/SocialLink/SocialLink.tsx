import clsx from "clsx";
import { FC } from "react";

import { SvgIcon } from "@/ui/SvgIcon";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";
import { SocialLinkProps } from "./types";

export const SocialLink: FC<SocialLinkProps> = ({
  icon,
  children,
  className,
  link,
}) => (
  <a href={link} className={clsx(styles.container, className)}>
    <SvgIcon name={icon} className={styles.icon} />
    <Typography className={styles.caption}>{children}</Typography>
  </a>
);
