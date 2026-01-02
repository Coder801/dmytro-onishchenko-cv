import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18next";
import { Main } from "@/modules/Main";
import { Sidebar } from "@/modules/Sidebar";
import { Preloader } from "@/ui/Preloader";
import { ErrorState } from "@/components/ErrorState";
import { useGetProfileQuery } from "@/store/api";
import {
  setLanguage,
  selectCurrentLanguage,
} from "@/store/slices/languageSlice";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";
import { useLanguageFromQuery } from "@/hooks/useLanguageFromQuery";
import { useFadeIn } from "@/hooks/useFadeIn";
import type { RootState } from "@/store";

import styles from "./styles.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) =>
    selectCurrentLanguage(state)
  );
  const { data, isLoading, error, refetch } =
    useGetProfileQuery(currentLanguage);

  useLanguageFromQuery();
  const isVisible = useFadeIn(!isLoading && !!data);

  const onLanguageChange = useCallback(
    (language: Languages) => {
      dispatch(setLanguage(language));
      i18n.changeLanguage(language);
      refetch();
    },
    [dispatch, refetch]
  );

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

export default Home;
