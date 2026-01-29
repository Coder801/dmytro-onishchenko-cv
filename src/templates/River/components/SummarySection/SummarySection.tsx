import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";
import { Typography } from "@/ui/Typography";

type SummarySectionProps = {
  intro?: string;
};

export const SummarySection: FC<SummarySectionProps> = ({ intro }) => {
  const { t } = useTranslation("common");

  return (
    <Section title={t("summary")}>
      {intro ? <Typography>{intro}</Typography> : null}
    </Section>
  );
};
