import i18n from "i18next";
import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ErrorState } from "@/components/ErrorState";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLanguageFromQuery } from "@/hooks/useLanguageFromQuery";
import type { RootState } from "@/store";
import { useGetProfileQuery } from "@/store/api";
import {
  selectCurrentLanguage,
  setLanguage,
} from "@/store/slices/languageSlice";
import { River } from "@/templates/River";
import { Languages } from "@/types/languages";
import { Preloader } from "@/ui/Preloader";

import styles from "./styles.module.scss";

const FADE_DURATION = 400;

export type ResumeQuery = {
  profile?: string;
  company?: string;
  role?: string;
};

type ResumeViewProps = {
  resumeQuery: ResumeQuery;
};

export const ResumeView: FC<ResumeViewProps> = ({ resumeQuery }) => {
  const dispatch = useDispatch();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentLanguage = useSelector((state: RootState) =>
    selectCurrentLanguage(state)
  );
  const { data, isLoading, error, refetch } = useGetProfileQuery({
    lang: currentLanguage,
    ...resumeQuery,
  });

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
    <River
      data={data}
      isVisible={isVisible}
      currentLanguage={currentLanguage}
      onLanguageChange={onLanguageChange}
    />
  );
};
