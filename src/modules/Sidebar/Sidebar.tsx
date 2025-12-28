import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Photo } from "@/components/Photo";
import { Title } from "@/components/Title";
import { SocialLink } from "@/components/SocialLink";

import { Typography } from "@/ui/Typography";
import { Chip } from "@/ui/Chip";
import { Divider } from "@/ui/Divider";

import type { ProfileInfo } from "@/types/resume";

import styles from "./styles.module.scss";

type SidebarProps = {
  className?: string;
  profile: ProfileInfo;
};

export const Sidebar: FC<SidebarProps> = ({ className, profile }) => {
  const { t } = useTranslation("common");

  return (
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

      <div className={styles.skills}>
        <Title tag="h3" className={styles.subtitle}>
          {t("skills")}
        </Title>
        <Typography className={styles.skillsList}>
          {profile.skills.map((skill) => (
            <Chip key={skill} className={styles.skill}>
              {skill}
            </Chip>
          ))}
        </Typography>
      </div>

      <div className={styles.socials}>
        <Title tag="h3" className={styles.subtitle}>
          {t("social")}
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
      </div>
    </aside>
  );
};
