import clsx from "clsx";
import { FC } from "react";
import { Photo } from "@/components/Photo";
import { Title } from "@/components/Title";
import { SocialLink } from "@/components/SocialLink";

import { Typography } from "@/ui/Typography";
import { Chip } from "@/ui/Chip";
import { Divider } from "@/ui/Divider";

import type { CVProfile } from "@/types/cv";

import styles from "./styles.module.scss";

type SidebarProps = {
  className?: string;
  profile: CVProfile;
};

export const Sidebar: FC<SidebarProps> = ({ className, profile }) => (
  <aside className={clsx(className, styles.container)}>
    <Photo className={styles.photo} />
    <Typography className={styles.name} tag="h1" uppercase weight="lighter">
      <strong>{profile.name.first}</strong> {profile.name.last}
    </Typography>
    <Typography className={styles.position} weight="lighter" tag="h4">
      {profile.position}
    </Typography>
    <Divider className={styles.divider} />
    <Typography className={styles.contact}>
      {profile.location}
      <br />
      {profile.phone}
      <br />
      {profile.email}
    </Typography>

    <Title tag="h3" className={styles.subtitle}>
      Skills
    </Title>
    <Typography className={styles.skills}>
      {profile.skills.map((skill) => (
        <Chip key={skill}>{skill}</Chip>
      ))}
    </Typography>
    <Title tag="h3" className={styles.subtitle}>
      Social
    </Title>
    {profile.social.map((item) => (
      <SocialLink
        key={`${item.icon}-${item.label}`}
        icon={item.icon}
        className={styles.link}
        link={item.link}
      >
        {item.label}
      </SocialLink>
    ))}
  </aside>
);
