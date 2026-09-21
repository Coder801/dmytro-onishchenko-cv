import { isEmpty } from "lodash";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import type { AdditionalSkillItem } from "@/types/resume";
import { Chip } from "@/ui/Chip";
import { List } from "@/ui/List";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type AdditionalSkillsSectionProps = {
  title?: string;
  skills: string[];
  items: AdditionalSkillItem[];
};

export const AdditionalSkillsSection: FC<AdditionalSkillsSectionProps> = ({
  title,
  skills,
  items,
}) => {
  const { t } = useTranslation("common");

  if (isEmpty(skills) && isEmpty(items)) {
    return null;
  }

  return (
    <Section title={title ?? t("additionalSkills")}>
      {!isEmpty(skills) && (
        <Typography className={styles.skills}>
          {skills.map((skill) => (
            <Chip key={skill} className={styles.skill}>
              {skill}
            </Chip>
          ))}
        </Typography>
      )}

      <List
        className={styles.list}
        items={items.map((item) => (
          <>
            <span className={styles.itemTitle}>{item.title}</span>
            {item.description ? ` — ${item.description}` : ""}
          </>
        ))}
      />
    </Section>
  );
};
