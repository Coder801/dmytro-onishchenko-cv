import { isEmpty } from "lodash";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import type { HobbyItem } from "@/types/resume";
import { List } from "@/ui/List";

import styles from "./styles.module.scss";

type HobbiesSectionProps = {
  items: HobbyItem[];
};

export const HobbiesSection: FC<HobbiesSectionProps> = ({ items }) => {
  const { t } = useTranslation("common");

  if (isEmpty(items)) {
    return null;
  }

  return (
    <Section title={t("hobbies")}>
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
