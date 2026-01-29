import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import { Languages } from "@/types/languages";
import type { Language } from "@/types/resume";
import { CountryFlag } from "@/ui/CountryFlag";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

type LanguagesSectionProps = {
  items: Language[];
};

export const LanguagesSection: FC<LanguagesSectionProps> = ({ items }) => {
  const { t } = useTranslation("common");

  return (
    <Section title={t("languages")}>
      <div className={styles.container}>
        {items.map((item) => (
          <Typography key={item.code}>
            <CountryFlag
              code={item.code as Languages}
              className={styles.flag}
            />
            <strong>{item.language}</strong> - {item.level}
          </Typography>
        ))}
      </div>
    </Section>
  );
};
