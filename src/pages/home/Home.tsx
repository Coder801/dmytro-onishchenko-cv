import { useCallback, useEffect, useState } from "react";
import i18n from "i18next";
import { Main } from "@/modules/Main";
import { Sidebar } from "@/modules/Sidebar";
import { Preloader } from "@/ui/Preloader";
import { useGetProfileQuery } from "@/store/api";
import { Languages } from "@/types/languages";

import styles from "./styles.module.scss";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const availableLanguages = i18n.languages as Languages[];
  const currentLanguage = i18n.language as Languages;
  const { data, isLoading, error, refetch } =
    useGetProfileQuery(currentLanguage);

  const onLanguageChange = useCallback(
    (language: Languages) => {
      i18n.changeLanguage(language);
      refetch();
    },
    [refetch]
  );

  useEffect(() => {
    if (!isLoading && data) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  if (error || !data) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.visible : ''}`}
      id="pdf-content"
    >
      <Sidebar className={styles.sidebar} profile={data.content.profile} />
      <Main
        className={styles.main}
        summary={data.content.summary}
        workHistory={data.content.workHistory}
        education={data.content.education}
        achievements={data.content.achievements}
        languages={data.content.languages}
        availableLanguages={availableLanguages}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />
    </div>
  );
};

export default Home;
