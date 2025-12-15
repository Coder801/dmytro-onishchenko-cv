import type { CVData } from "@/types/cv";
import enCv from "./en.json";
import uaCv from "./ua.json";

const registry: Record<string, CVData> = {
  en: enCv as CVData,
  ua: uaCv as CVData,
};

export const CV_LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
] as const;

export type CvLanguageCode = (typeof CV_LANGUAGES)[number]["code"];

export function registerCvData(key: string, data: CVData) {
  registry[key] = data;
}

const getCvData = (key = "en"): CVData => registry[key] ?? registry.en;

export default getCvData;
