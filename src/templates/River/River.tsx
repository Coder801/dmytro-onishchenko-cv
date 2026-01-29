import { FC } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useScrollFromTop } from "@/hooks";
import { useGetProfileQuery } from "@/store/api";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";

import {
  AchievementsSection,
  DownloadButton,
  EducationSection,
  LanguagesSection,
  ProfileSection,
  SkillsSection,
  SummarySection,
  WorkHistorySection,
} from "./components";
import styles from "./styles.module.scss";

type RiverProps = {
  data: ReturnType<typeof useGetProfileQuery>["data"];
  isVisible: boolean;
  currentLanguage: Languages;
  onLanguageChange: (code: Languages) => void;
};

export const River: FC<RiverProps> = ({
  data,
  isVisible,
  currentLanguage,
  onLanguageChange,
}) => {
  const isShowDownloadButton = useScrollFromTop();

  const { profile, summary, workHistory, education, achievements, languages } =
    data.content;

  return (
    <div className={styles.container} id="pdf-content">
      <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
        <ProfileSection
          name={profile.name}
          position={profile.position}
          location={profile.location}
          email={profile.email}
          phone={profile.phone}
          socials={profile.social}
        />

        <SummarySection intro={summary.intro} />

        <SkillsSection skills={profile.skills} />

        <WorkHistorySection items={workHistory} />

        <EducationSection items={education} />

        <AchievementsSection items={achievements} />

        <LanguagesSection items={languages} />

        <DownloadButton isVisible={isShowDownloadButton} />
      </div>
      <div className={styles.languageSwitcherContainer}>
        <LanguageSwitcher
          className={styles.languageSwitcher}
          availableLanguages={SUPPORTED_LANGUAGES}
          currentLanguage={currentLanguage}
          onChange={onLanguageChange}
        />
      </div>
    </div>
  );
};
