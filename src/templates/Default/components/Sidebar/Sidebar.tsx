import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Photo } from "@/components/Photo";
import { SocialLink } from "@/components/SocialLink";
import { Title } from "@/components/Title";
import type { ProfileInfo } from "@/types/resume";
import { Button } from "@/ui/Button";
import { Chip } from "@/ui/Chip";
import { Divider } from "@/ui/Divider";
import { Typography } from "@/ui/Typography";
import { downloadPdf } from "@/utils/downloadPdf";

import styles from "./styles.module.scss";

type SidebarProps = {
  className?: string;
  profile: ProfileInfo;
};

export const Sidebar: FC<SidebarProps> = ({ className, profile }) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = () => {
    setIsLoading(true);
    downloadPdf(() => {
      setIsLoading(false);
    });
  };

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
        {profile.skillsByCategory ? (
          <div className={styles.skillsByCategory}>
            {profile.skillsByCategory.map((category) => (
              <div key={category.category} className={styles.category}>
                <Typography
                  className={styles.categoryTitle}
                  tag="h5"
                  weight="bold"
                >
                  {category.category}
                </Typography>
                <Typography className={styles.skills}>
                  {category.skills.map((skill) => (
                    <Chip key={skill} className={styles.skill}>
                      {skill}
                    </Chip>
                  ))}
                </Typography>
              </div>
            ))}
          </div>
        ) : (
          <Typography className={styles.skills}>
            {profile.skills.map((skill) => (
              <Chip key={skill} className={styles.skill}>
                {skill}
              </Chip>
            ))}
          </Typography>
        )}
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

      <div className={styles.button}>
        <Button onClick={handleDownloadPdf} isLoading={isLoading}>
          {t("downloadPdf")}
        </Button>
      </div>
    </aside>
  );
};
