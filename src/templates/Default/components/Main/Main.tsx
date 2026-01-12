import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Title } from "@/components/Title";
import { Typography } from "@/ui/Typography";

import { Timeline } from "@/components/Timeline";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SummaryItem } from "@/components/SummaryItem";

import type {
  Achievement,
  Education,
  Summary,
  WorkHistory,
  Language,
} from "@/types/resume";
import { Languages } from "@/types/languages";

import styles from "./styles.module.scss";

type MainProps = {
  className?: string;
  summary: Summary;
  workHistory: WorkHistory[];
  education: Education[];
  achievements: Achievement[];
  languages: Language[];
  availableLanguages: Languages[];
  currentLanguage: Languages;
  onLanguageChange?: (code: Languages) => void;
};

export const Main: FC<MainProps> = ({
  className,
  summary,
  workHistory,
  education,
  achievements,
  languages,
  availableLanguages,
  currentLanguage,
  onLanguageChange,
}) => {
  const { t } = useTranslation("common");

  return (
    <main className={clsx(className, styles.container)}>
      <LanguageSwitcher
        className={styles.languageSwitcher}
        availableLanguages={availableLanguages}
        currentLanguage={currentLanguage}
        onChange={onLanguageChange}
      />

      <div className={styles.section}>
        <Title tag="h1" className={styles.title}>
          {t("summary")}
        </Title>
        {summary.intro ? (
          <Typography className={styles.text}>{summary.intro}</Typography>
        ) : null}
        {summary.items.map((item) => (
          <SummaryItem key={item.label} item={item} />
        ))}
      </div>

      <div className={styles.section}>
        <Title tag="h1" className={styles.title}>
          {t("workHistory")}
        </Title>

        <div className={clsx(styles.works, styles.section)}>
          {workHistory.map((item) => (
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
        <Title tag="h2" className={styles.title}>
          {t("education")}
        </Title>
        {education.map((item) => (
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
        <Title tag="h2" className={styles.title}>
          {t("achievements")}
        </Title>
        {achievements.map((item) => (
          <Typography key={item.title}>
            • {item.title}
            {item.organization ? ` (${item.organization})` : ""}
            {item.description ? ` — ${item.description}` : ""}
          </Typography>
        ))}
      </div>

      <div className={styles.section}>
        <Title tag="h2" className={styles.title}>
          {t("languages")}
        </Title>
        {languages.map((item: Language) => (
          <Typography key={item.code}>
            <strong>{item.language}</strong> - {item.level}
          </Typography>
        ))}
      </div>
    </main>
  );
};
