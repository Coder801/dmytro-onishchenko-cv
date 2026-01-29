import { FC } from "react";

import { Divider } from "@/ui/Divider";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";
import { ProfileSectionProps } from "./types";

export const ProfileSection: FC<ProfileSectionProps> = ({ name, position }) => {
  return (
    <div className={styles.section}>
      <Typography className={styles.name} tag="h1" uppercase weight="lighter">
        {name.first} <strong>{name.last}</strong>
      </Typography>
      <Divider className={styles.divider} />
      <Typography className={styles.position} weight="lighter" tag="h2">
        {position}
      </Typography>
    </div>
  );
};
