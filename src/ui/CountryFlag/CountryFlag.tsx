import { UA, US } from "country-flag-icons/react/3x2";
import { FC } from "react";

import type { Languages } from "@/types/languages";

type CountryFlagProps = {
  code: Languages;
  className?: string;
};

const FLAG_MAP = {
  ua: UA,
  en: US,
} as const;

export const CountryFlag: FC<CountryFlagProps> = ({ code, className }) => {
  const FlagComponent = FLAG_MAP[code];

  return <FlagComponent className={className} />;
};
