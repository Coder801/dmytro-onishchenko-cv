import { FC } from "react";

import { Divider } from "@/ui/Divider";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type ProfileSectionProps = {
  name: {
    first: string;
    last: string;
  };
  position: string;
  location: string;
  email: string;
  phone: string;
};

export const ProfileSection: FC<ProfileSectionProps> = ({
  name,
  position,
  location,
  email,
  phone,
}) => {
  return (
    <div className={styles.section}>
      <Typography className={styles.name} tag="h1" uppercase weight="lighter">
        {name.first} <strong>{name.last}</strong>
      </Typography>
      <Divider />
      <Typography className={styles.position} weight="lighter" tag="h2">
        {position}
      </Typography>
      <div className={styles.contact}>
        {[location, email, phone].map((item) => (
          <Typography key={item}>{item}</Typography>
        ))}
      </div>
    </div>
  );
};
