import clsx from "clsx";
import { gt, isEmpty } from "lodash";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import type { WorkHistory } from "@/types/resume";
import { List } from "@/ui/List";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type WorkHistorySectionProps = {
  items: WorkHistory[];
  isShortPdf?: boolean;
};

const SHOWING_DETAILS_COUNT = 2;

export const WorkHistorySection: FC<WorkHistorySectionProps> = ({
  items,
  isShortPdf,
}) => {
  const { t } = useTranslation("common");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleDetails = (index: number) => {
    setExpandedItems(
      (prev) =>
        new Set(
          prev.has(index)
            ? [...prev].filter((i) => i !== index)
            : [...prev, index]
        )
    );
  };

  const trimDot = (text: string) =>
    text.endsWith(".") ? text.slice(0, -1) : text;

  return (
    <Section title={t("workHistory")}>
      <div className={clsx(styles.timeline, { [styles.shortPdf]: isShortPdf })}>
        {items.map((item, index) => {
          const isCollapsible = gt(index, SHOWING_DETAILS_COUNT);
          const isExpanded = expandedItems.has(index);
          const hasAchievements = !isEmpty(item.keyAchievements);

          const achievementsBlock = hasAchievements && (
            <div className={styles.achievements}>
              <Typography className={styles.subtitle}>
                {t("keyAchievements")}:
              </Typography>
              <List
                className={styles.list}
                items={item.keyAchievements || []}
              />
            </div>
          );

          return (
            <Timeline
              key={`${item.company}-${item.position}`}
              date={item.date}
              position={item.position}
              company={item.company}
              skills={item.skills}
            >
              <Typography>
                {isExpanded ? item.description : trimDot(item.description)}{" "}
                {isCollapsible && !isExpanded && (
                  <span
                    className={styles.moreDetails}
                    onClick={() => toggleDetails(index)}
                  >
                    ... {t("moreDetails")}
                  </span>
                )}
              </Typography>

              {!isCollapsible && achievementsBlock}

              {isCollapsible && hasAchievements && (
                <div
                  className={clsx(styles.achievementsWrapper, {
                    [styles.expanded]: isExpanded,
                  })}
                >
                  <div className={styles.achievementsInner}>
                    {achievementsBlock}
                  </div>
                </div>
              )}
            </Timeline>
          );
        })}
      </div>
    </Section>
  );
};
