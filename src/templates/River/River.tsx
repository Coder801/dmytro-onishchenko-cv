import { clsx } from "clsx";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Photo } from "@/components/Photo";
import { SocialLink } from "@/components/SocialLink";
import { SummaryItem } from "@/components/SummaryItem";
import { Timeline } from "@/components/Timeline";
import { Title } from "@/components/Title";
import { Themes } from "@/config/types";
import { useScrollFromTop } from "@/hooks";
import { useGetProfileQuery } from "@/store/api";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";
import type {
  Achievement,
  Education,
  Language,
  SummaryItem as SummaryItemType,
  WorkHistory,
} from "@/types/resume";
import { Button } from "@/ui/Button";
import { Chip } from "@/ui/Chip";
import { IconNames } from "@/ui/SvgIcon/constants";
import { Typography } from "@/ui/Typography";
import { downloadPdf } from "@/utils/downloadPdf";

import styles from "./styles.module.scss";

type RiverProps = {
  data: ReturnType<typeof useGetProfileQuery>["data"];
  isVisible: boolean;
  currentLanguage: Languages;
  onLanguageChange: (code: Languages) => void;
};

export const River: FC<RiverProps> = ({
  data,
  isVisible,
  currentLanguage,
  onLanguageChange,
}) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);
  const isShowDownloadButton = useScrollFromTop();

  const handleDownloadPdf = () => {
    setIsLoading(true);
    downloadPdf(() => {
      setIsLoading(false);
    });
  };

  const { profile, summary, workHistory, education, achievements, languages } =
    data.content;

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
      id="pdf-content"
    >
      <div className={styles.content}>
        <div className={styles.section}>
          <Typography
            className={styles.name}
            tag="h1"
            uppercase
            weight="lighter"
          >
            {profile.name.first} <strong>{profile.name.last}</strong>
          </Typography>
          <Typography className={styles.position} weight="lighter" tag="h4">
            {profile.position}
          </Typography>
          {/* <Typography tag="h4" weight="normal" className={styles.title}>
            {t("social")}
          </Typography> */}
          <div className={styles.contact}>
            {[profile.location, profile.email, profile.phone].map((item) => (
              <Typography key={item}>{item}</Typography>
            ))}
          </div>
          {/* <div className={styles.headerActions}>
          <LanguageSwitcher
            className={styles.languageSwitcher}
            availableLanguages={SUPPORTED_LANGUAGES}
            currentLanguage={currentLanguage}
            onChange={onLanguageChange}
          />
        </div> */}
        </div>

        <div className={styles.section}>
          {/* <Typography tag="h4" weight="normal" className={styles.title}>
            {t("social")}
          </Typography> */}
          <div className={styles.socials}>
            {profile.social.map(
              (item: { icon: IconNames; label: string; link: string }) => (
                <SocialLink
                  key={`${item.icon}-${item.label}`}
                  icon={item.icon}
                  className={styles.link}
                  link={item.link}
                >
                  {item.label}
                </SocialLink>
              )
            )}
          </div>
        </div>

        <div className={styles.section}>
          <Typography tag="h4" weight="normal" className={styles.title}>
            {t("summary")}
          </Typography>
          {summary.intro ? <Typography>{summary.intro}</Typography> : null}
        </div>

        <div className={styles.section}>
          <Typography tag="h4" weight="normal" className={styles.title}>
            {t("skills")}
          </Typography>
          <Typography className={styles.skills}>
            {profile.skills.map((skill: string) => (
              <Chip key={skill} className={styles.skill}>
                {skill}
              </Chip>
            ))}
          </Typography>
        </div>

        <div className={styles.section}>
          <Typography tag="h4" weight="normal" className={styles.title}>
            {t("workHistory")}
          </Typography>
          <div className={styles.timeline}>
            {workHistory.map((item: WorkHistory) => (
              <Timeline
                key={`${item.company}-${item.position}`}
                date={item.date}
                position={item.position}
                company={item.company}
                skills={item.skills}
              >
                <Typography>{item.description}</Typography>
              </Timeline>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <Typography tag="h4" weight="normal" className={styles.title}>
            {t("education")}
          </Typography>
          {education.map((item: Education) => (
            <Timeline
              key={`${item.institution}-${item.field}`}
              date={item.date}
              position={item.institution}
              company={item.field}
            >
              <Typography>{item.degree}</Typography>
            </Timeline>
          ))}
        </div>

        <div className={styles.section}>
          <Typography tag="h4" weight="normal" className={styles.title}>
            {t("achievements")}
          </Typography>
          {achievements.map((item: Achievement) => (
            <Typography key={item.title}>
              • {item.title}
              {item.organization ? ` (${item.organization})` : ""}
              {item.description ? ` — ${item.description}` : ""}
            </Typography>
          ))}
        </div>

        <div className={styles.section}>
          <Typography tag="h4" weight="normal" className={styles.title}>
            {t("languages")}
          </Typography>
          {languages.map((item: Language) => (
            <Typography key={item.code}>
              <strong>{item.language}</strong> - {item.level}
            </Typography>
          ))}
        </div>

        <div
          className={clsx(styles.button, {
            [styles.visible]: isShowDownloadButton,
          })}
        >
          <Button
            onClick={handleDownloadPdf}
            isLoading={isLoading}
            theme={Themes.river}
          >
            {t("downloadPdf")}
          </Button>
        </div>
      </div>
    </div>
  );
};
