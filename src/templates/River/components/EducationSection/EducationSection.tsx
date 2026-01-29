import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import type { Education } from "@/types/resume";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type EducationSectionProps = {
  items: Education[];
};

export const EducationSection: FC<EducationSectionProps> = ({ items }) => {
  const { t } = useTranslation("common");

  return (
    <Section title={t("education")}>
      {items.map((item) => (
        <Timeline
          key={`${item.institution}-${item.field}`}
          date={item.date}
          position={item.institution}
          company={item.field}
          className={styles.timeline}
        >
          <Typography>{item.degree}</Typography>
        </Timeline>
      ))}
    </Section>
  );
};
