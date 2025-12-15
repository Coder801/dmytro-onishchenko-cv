import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Main } from "@/modules/Main";
import { Sidebar } from "@/modules/Sidebar";
import getCvData, { CV_LANGUAGES, CvLanguageCode } from "@/data/cv";

import styles from "./home/styles.module.scss";

const LangPage = () => {
  const router = useRouter();
  const { lang } = router.query;

  const language = useMemo(() => {
    const langCode = (lang as string)?.toLowerCase();
    const isValidLang = CV_LANGUAGES.some((l) => l.code === langCode);
    return (isValidLang ? langCode : "en") as CvLanguageCode;
  }, [lang]);

  const languageConfig = useMemo(
    () => CV_LANGUAGES.find((l) => l.code === language) ?? CV_LANGUAGES[0],
    [language]
  );

  const cvData = getCvData(language);

  const handleLanguageChange = (newLang: CvLanguageCode) => {
    if (newLang !== language) {
      router.push(`/${newLang}`, undefined, { shallow: false });
    }
  };

  useEffect(() => {
    if (router.isReady && lang && !CV_LANGUAGES.some((l) => l.code === lang)) {
      router.replace(`/${language}`);
    }
  }, [router.isReady, lang, language, router]);

  return (
    <div className={styles.container}>
      <Sidebar className={styles.sidebar} profile={cvData.profile} />
      <Main
        className={styles.main}
        summary={cvData.summary}
        workHistory={cvData.workHistory}
        education={cvData.education}
        achievements={cvData.achievements}
        languages={cvData.languages as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};

export default LangPage;
