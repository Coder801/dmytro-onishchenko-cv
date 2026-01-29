import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/context/ThemeContext";
import { Chip } from "@/ui/Chip";
import { Typography } from "@/ui/Typography";
import { formatDate, getDatePeriod } from "@/utils";

import styles from "./styles.module.scss";
import { TimelineProps } from "./types";

export const Timeline: FC<TimelineProps> = ({
  date,
  position,
  company,
  skills,
  children,
  className,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation("common");
  const [startDate, endDate = ""] = date as [string, string?];

  const formattedStartDate = formatDate(startDate, t);
  const formattedEndDate = endDate ? formatDate(endDate, t) : t("present");

  const formattedPeriod = getDatePeriod(startDate, endDate, t);

  return (
    <div className={clsx(styles.container, className, styles[theme])}>
      <Typography tag="h3" weight="lighter" className={styles.position}>
        <strong>{position}</strong> <span>::</span> {company}
      </Typography>

      <Typography className={styles.date} size="s">
        {formattedStartDate} / {formattedEndDate}
        {formattedPeriod && (
          <span className={styles.period}>{formattedPeriod}</span>
        )}
      </Typography>

      <div className={styles.description}>{children}</div>

      {!!skills?.length && (
        <Typography className={styles.skills}>
          <i>{t("skills")}:</i>
          {skills.map((skill) => (
            <Chip key={skill} variant="filled">
              {skill}
            </Chip>
          ))}
        </Typography>
      )}
    </div>
  );
};
