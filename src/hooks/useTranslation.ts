import { Translations } from "../types/translations";
import { useRouter } from "next/router";

import enCommon from "../locales/en/common.json";
import uaCommon from "../locales/ua/common.json";

const translations: Record<string, Translations> = {
  en: enCommon,
  ua: uaCommon,
};

export const useTranslation = () => {
  const { locale } = useRouter();
  return translations[locale || "en"];
};
