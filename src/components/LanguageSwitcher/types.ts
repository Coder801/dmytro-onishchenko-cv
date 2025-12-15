import { CvLanguageCode } from "@/data/cv";

export type LanguageSwitcherOption = {
  code: CvLanguageCode;
  level: string;
  language: string;
};

export type LanguageSwitcherProps = {
  options: LanguageSwitcherOption[];
  value: CvLanguageCode;
  onChange?: (code: CvLanguageCode) => void;
  className?: string;
};
