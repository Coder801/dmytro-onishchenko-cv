import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import type { Achievement } from "@/types/resume";
import { List } from "@/ui/List";

import styles from "./styles.module.scss";

type AchievementsSectionProps = {
  items: Achievement[];
};

export const AchievementsSection: FC<AchievementsSectionProps> = ({
  items,
}) => {
  const { t } = useTranslation("common");

  return (
    <Section title={t("achievements")}>
      <List
        className={styles.list}
        items={items.map((item) => (
          <>
            <span className={styles.title}>{item.title} </span>
            <em>{item.organization ? ` (${item.organization})` : ""}</em>
            {item.description ? ` — ${item.description}` : ""}
          </>
        ))}
      />
    </Section>
  );
};
