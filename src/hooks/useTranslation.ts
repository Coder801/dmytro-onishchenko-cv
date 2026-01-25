import { useRouter } from "next/router";

import enCommon from "@/translate/translations/en/common.json";
import uaCommon from "@/translate/translations/ua/common.json";

import { Translations } from "../types/translations";

const translations: Record<string, Translations> = {
  en: enCommon,
  ua: uaCommon,
};

export const useTranslation = () => {
  const { locale } = useRouter();
  return translations[locale || "en"];
};
