import Link from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { ErrorState } from "@/components/ErrorState";
import { Section } from "@/components/Section";
import type { RootState } from "@/store";
import { useGetSitemapQuery } from "@/store/api";
import { selectCurrentLanguage } from "@/store/slices/languageSlice";
import type { SitemapItem } from "@/types/sitemap";
import { Preloader } from "@/ui/Preloader";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";
import { slugToTitle } from "./utils";

export const SitemapView: FC = () => {
  const { t } = useTranslation("common");
  const currentLanguage = useSelector((state: RootState) =>
    selectCurrentLanguage(state)
  );
  const { data, isLoading, error, refetch } = useGetSitemapQuery({
    lang: currentLanguage,
  });

  if (isLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  if (error || !data) {
    return <ErrorState onRetry={refetch} />;
  }

  const renderItem = ({ company, role, position }: SitemapItem) => (
    <li key={`${company}-${role}`} className={styles.item}>
      <Link className={styles.link} href={`/jobs/${company}/${role}`}>
        <Typography weight="bold" className={styles.position}>
          {position}
        </Typography>
        <Typography size="s" variant="secondary">
          {slugToTitle(company)}
        </Typography>
      </Link>
    </li>
  );

  return (
    <Section title={t("sitemap")} className={styles.sitemap}>
      <ul className={styles.list}>{data.items.map(renderItem)}</ul>
    </Section>
  );
};
