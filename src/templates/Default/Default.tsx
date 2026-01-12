import { FC } from "react";

import { useGetProfileQuery } from "@/store/api";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";

import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import styles from "./styles.module.scss";

type DefaultProps = {
  data: ReturnType<typeof useGetProfileQuery>["data"];
  isVisible: boolean;
  currentLanguage: Languages;
  onLanguageChange: (code: Languages) => void;
};

export const Default: FC<DefaultProps> = ({
  data,
  isVisible,
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
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
        availableLanguages={SUPPORTED_LANGUAGES}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />
    </div>
  );
};
