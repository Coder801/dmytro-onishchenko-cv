import { useMemo, useState } from "react";
import { Main } from "@/modules/Main";
import { Sidebar } from "@/modules/Sidebar";
import getCvData, { CV_LANGUAGES, CvLanguageCode } from "@/data/cv";

import styles from "./styles.module.scss";

const Home = () => {
  const [language, setLanguage] = useState<CvLanguageCode>("en");

  const languageConfig = useMemo(
    () =>
      CV_LANGUAGES.find((lang) => lang.code === language) ?? CV_LANGUAGES[0],
    [language]
  );

  const cvData = getCvData(languageConfig.code);

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
        onLanguageChange={setLanguage}
      />
    </div>
  );
};

export default Home;
