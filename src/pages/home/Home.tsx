import { useCallback } from "react";
import i18n from "i18next";
import { Main } from "@/modules/Main";
import { Sidebar } from "@/modules/Sidebar";
import { useGetProfileQuery } from "@/store/api";
import { Languages } from "@/types/languages";

import styles from "./styles.module.scss";

const Home = () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <div className={styles.container} id="pdf-content">
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
