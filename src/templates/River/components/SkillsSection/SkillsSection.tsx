import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import { Chip } from "@/ui/Chip";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type SkillsSectionProps = {
  skills: string[];
};

export const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
  const { t } = useTranslation("common");

  return (
    <Section title={t("skills")}>
      <Typography className={styles.skills}>
        {skills.map((skill) => (
          <Chip key={skill} className={styles.skill}>
            {skill}
          </Chip>
        ))}
      </Typography>
    </Section>
  );
};
