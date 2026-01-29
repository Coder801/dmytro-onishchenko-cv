import { FC } from "react";

import { SocialLink } from "@/components/SocialLink";
import { Divider } from "@/ui/Divider";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";
import { ProfileSectionProps } from "./types";

export const ProfileSection: FC<ProfileSectionProps> = ({
  name,
  position,
  location,
  email,
  phone,
  socials,
}) => {
  return (
    <div className={styles.section}>
      <Typography className={styles.name} tag="h1" uppercase weight="lighter">
        {name.first} <strong>{name.last}</strong>
      </Typography>
      <Divider className={styles.divider} />
      <Typography className={styles.position} weight="lighter" tag="h2">
        {position}
      </Typography>
      <div className={styles.contact}>
        {[location, email, phone].map((item) => (
          <Typography key={item}>{item}</Typography>
        ))}
      </div>
      <div className={styles.socials}>
        {socials.map((social) => (
          <SocialLink
            key={`${social.icon}-${social.label}`}
            icon={social.icon}
            className={styles.link}
            link={social.link}
          >
            {social.label}
          </SocialLink>
        ))}
      </div>
    </div>
  );
};
