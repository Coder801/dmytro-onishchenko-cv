import clsx from "clsx";
import { isEmpty, toString } from "lodash";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import type { WorkHistory } from "@/types/resume";
import { Button } from "@/ui/Button";
import { List } from "@/ui/List";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type WorkHistorySectionProps = {
  items: WorkHistory[];
  showAll?: boolean;
  onShowAllChange?: (value: boolean) => void;
};

const INITIAL_ITEMS_COUNT = 3;
const SHOW_DELAY_MS = 1000;

export const WorkHistorySection: FC<WorkHistorySectionProps> = ({
  items,
  showAll: showAllProp,
  onShowAllChange,
}) => {
  const { t } = useTranslation("common");
  const [showAllLocal, setShowAllLocal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showAll = showAllProp ?? showAllLocal;
  const setShowAll = onShowAllChange ?? setShowAllLocal;

  const hiddenItemsCount = toString(items.length - INITIAL_ITEMS_COUNT);

  const initialItems = items.slice(0, INITIAL_ITEMS_COUNT);
  const hiddenItems = items.slice(INITIAL_ITEMS_COUNT);
  const hasMoreItems = hiddenItems.length > 0;

  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowAll(true);
    }, SHOW_DELAY_MS);
  };

  const renderTimelineItem = (item: WorkHistory) => {
    const hasAchievements = !isEmpty(item.keyAchievements);

    return (
      <Timeline
        key={`${item.company}-${item.position}`}
        date={item.date}
        position={item.position}
        company={item.company}
        skills={item.skills}
      >
        <Typography>{item.description}</Typography>

        {hasAchievements && (
          <div className={styles.achievements}>
            <Typography className={styles.subtitle}>
              {t("keyAchievements")}:
            </Typography>
            <List className={styles.list} items={item.keyAchievements || []} />
          </div>
        )}
      </Timeline>
    );
  };

  return (
    <Section title={t("workHistory")}>
      <div className={styles.timeline}>
        {initialItems.map(renderTimelineItem)}
      </div>
      <div className={styles.timeline}>
        {hasMoreItems && (
          <div
            className={clsx(styles.hiddenItems, {
              [styles.expanded]: showAll,
            })}
          >
            <div className={styles.hiddenItemsInner}>
              {hiddenItems.map(renderTimelineItem)}
            </div>
          </div>
        )}
      </div>

      {hasMoreItems && !showAll && (
        <Button
          className={styles.showMoreButton}
          onClick={handleShowMore}
          disabled={isLoading}
          isLoading={isLoading}
        >
          {isLoading ? t("loading") : `${t("showMore")} (${hiddenItemsCount})`}
        </Button>
      )}
    </Section>
  );
};
