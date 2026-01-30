import i18n from "i18next";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ErrorState } from "@/components/ErrorState";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLanguageFromQuery } from "@/hooks/useLanguageFromQuery";
import type { RootState } from "@/store";
import { useGetProfileQuery } from "@/store/api";
import {
  selectCurrentLanguage,
  setLanguage,
} from "@/store/slices/languageSlice";
import { Default } from "@/templates/Default";
import { River } from "@/templates/River";
import { Languages } from "@/types/languages";
import { Preloader } from "@/ui/Preloader";

import styles from "./styles.module.scss";

const FADE_DURATION = 400;

const Home = () => {
  const dispatch = useDispatch();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentLanguage = useSelector((state: RootState) =>
    selectCurrentLanguage(state)
  );
  const { data, isLoading, error, refetch } =
    useGetProfileQuery(currentLanguage);

  useLanguageFromQuery();
  const isVisible = useFadeIn(!isLoading && !!data && !isTransitioning);

  const onLanguageChange = useCallback(
    (language: Languages) => {
      setIsTransitioning(true);

      setTimeout(() => {
        dispatch(setLanguage(language));
        i18n.changeLanguage(language);
        refetch().finally(() => {
          setIsTransitioning(false);
        });
      }, FADE_DURATION);
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
    <>
      {/* <ThemeSwitcher /> */}
      <River
        data={data}
        isVisible={isVisible}
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />
    </>
  );
};

export default Home;
