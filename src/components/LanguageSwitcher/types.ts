import type { Languages } from "@/types/languages";

export type LanguageSwitcherProps = {
  availableLanguages: Languages[];
  currentLanguage: Languages;
  onChange?: (code: Languages) => void;
  className?: string;
};
