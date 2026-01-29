import clsx from "clsx";
import { FC, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useGetProfileQuery } from "@/store/api";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";

import {
  AchievementsSection,
  ContactsSection,
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

const getInitialShowAllWorkHistory = () => {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("showAllWorkHistory") === "true";
};

export const River: FC<RiverProps> = ({
  data,
  isVisible,
  currentLanguage,
  onLanguageChange,
}) => {
  const [showAllWorkHistory, setShowAllWorkHistory] = useState(
    getInitialShowAllWorkHistory
  );

  const { profile, summary, workHistory, education, achievements, languages } =
    data.content;

  return (
    <div
      className={clsx(styles.container, { [styles.visible]: isVisible })}
      id="pdf-content"
    >
      <div className={styles.content}>
        <ProfileSection name={profile.name} position={profile.position} />

        <ContactsSection
          className={styles.contactsSection}
          location={profile.location}
          email={profile.email}
          phone={profile.phone}
          socials={profile.social}
        />

        <SummarySection intro={summary.intro} />

        <SkillsSection skills={profile.skills} />

        <WorkHistorySection
          items={workHistory}
          showAll={showAllWorkHistory}
          onShowAllChange={setShowAllWorkHistory}
        />

        <EducationSection items={education} />

        <AchievementsSection items={achievements} />

        <LanguagesSection items={languages} />

        <DownloadButton
          className={styles.downloadButton}
          onExpandWorkHistory={() => setShowAllWorkHistory(true)}
          onCollapseWorkHistory={() => setShowAllWorkHistory(false)}
        />
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
