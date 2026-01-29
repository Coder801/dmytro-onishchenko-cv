import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Section } from "@/components/Section";
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
import { ContactsSection } from "./components/ContactsSection";
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
  const { t } = useTranslation("common");
  const [isShortPdf, setIsShortPdf] = useState(false);

  const { profile, summary, workHistory, education, achievements, languages } =
    data.content;

  return (
    <div
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
      id="pdf-content"
    >
      <div className={styles.content}>
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

        <WorkHistorySection items={workHistory} isShortPdf={isShortPdf} />

        <EducationSection items={education} />

        <AchievementsSection items={achievements} />

        <LanguagesSection items={languages} />

        <Section className={styles.contactSection} title={t("contact")}>
          <ContactsSection
            className={styles.contacts}
            location={profile.location}
            email={profile.email}
            phone={profile.phone}
            socials={profile.social}
          />
        </Section>

        <DownloadButton onShortPdfChange={setIsShortPdf} />
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
