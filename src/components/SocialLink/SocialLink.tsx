import clsx from "clsx";
import { FC } from "react";

import { SvgIcon } from "@/ui/SvgIcon";
import { Typography } from "@/ui/Typography";
import { trackEvent } from "@/utils";

import styles from "./styles.module.scss";
import { SocialLinkProps } from "./types";

export const SocialLink: FC<SocialLinkProps> = ({
  icon,
  children,
  className,
  link,
}) => {
  const handleClick = () => {
    trackEvent({
      action: "social_link_click",
      category: "Social",
      label: icon,
    });
  };

  return (
    <a href={link} className={clsx(styles.container, className)} onClick={handleClick}>
      <SvgIcon name={icon} className={styles.icon} />
      <Typography className={styles.caption}>{children}</Typography>
    </a>
  );
};
