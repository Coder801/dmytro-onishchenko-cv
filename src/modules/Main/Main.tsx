import clsx from "clsx";
import { FC } from "react";

import { Title } from "@/components/Title";
import { Typography } from "@/ui/Typography";

import { Timeline } from "@/components/Timeline";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { LanguageSwitcherProps } from "@/components/LanguageSwitcher";
import { SummaryItem } from "@/components/SummaryItem";
import { CvLanguageCode } from "@/data/cv";

import { useTranslation } from "@/hooks/useTranslation";

import type {
  CVAchievementItem,
  CVEducationItem,
  CVSummary,
  CVWorkHistoryItem,
} from "@/types/cv";

import styles from "./styles.module.scss";

type MainProps = {
  className?: string;
  summary: CVSummary;
  workHistory: CVWorkHistoryItem[];
  education: CVEducationItem[];
  achievements: CVAchievementItem[];
  languages: LanguageSwitcherProps[];
  currentLanguage?: CvLanguageCode;
  onLanguageChange?: (code: CvLanguageCode) => void;
};

export const Main: FC<MainProps> = ({
  className,
  summary,
  workHistory,
  education,
  achievements,
  languages,
  currentLanguage,
  onLanguageChange,
}) => {
  const t = useTranslation();

  return (
    <main className={clsx(className, styles.container)}>
      <LanguageSwitcher
        className={styles.languageSwitcher}
        options={languages as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        value={currentLanguage ?? "ua"}
        onChange={onLanguageChange}
      />

      <div className={styles.section}>
        <Title tag="h1" className={styles.title}>
          {t.summary}
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
          {t.workHistory}
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
          {t.education}
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
          {t.achievements}
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
          {t.languages}
        </Title>
        {languages.map(
          (
            item: any // eslint-disable-line @typescript-eslint/no-explicit-any
          ) => (
            <Typography key={item.code}>
              <strong>{item.label}</strong> - {item.level}
            </Typography>
          )
        )}
      </div>
    </main>
  );
};
