import clsx from "clsx";
import { FC, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useGetProfileQuery } from "@/store/api";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";

import {
  AchievementsSection,
  AdditionalSkillsSection,
  ContactsSection,
  DownloadButton,
  EducationSection,
  HobbiesSection,
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
  const [showAllWorkHistory, setShowAllWorkHistory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("showAllWorkHistory") === "true";
  });

  const {
    profile,
    summary,
    workHistory,
    education,
    achievements,
    languages,
    additionalSkills,
    hobbies,
    layout,
  } = data.content;

  const workHistorySection = (
    <WorkHistorySection items={workHistory} showAll={showAllWorkHistory} />
  );
  const workHistoryAtEnd = layout?.workHistoryAtEnd ?? false;

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

        {!workHistoryAtEnd && workHistorySection}

        <EducationSection items={education} />

        <AchievementsSection items={achievements} />

        <AdditionalSkillsSection
          title={additionalSkills?.title}
          skills={additionalSkills?.skills ?? []}
          items={additionalSkills?.items ?? []}
        />

        <HobbiesSection items={hobbies ?? []} />

        <LanguagesSection items={languages} />

        {workHistoryAtEnd && workHistorySection}

        <DownloadButton
          className={styles.downloadButton}
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
