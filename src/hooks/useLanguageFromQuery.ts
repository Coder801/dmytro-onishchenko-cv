import { useEffect } from "react";
import { useRouter } from "next/router";
import i18n from "i18next";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";

export const useLanguageFromQuery = () => {
  const router = useRouter();

  useEffect(() => {
    const langParam = router.query.lang as string | undefined;

    if (langParam && SUPPORTED_LANGUAGES.includes(langParam as Languages)) {
      const newLanguage = langParam as Languages;

      if (i18n.language !== newLanguage) {
        i18n.changeLanguage(newLanguage);
        localStorage.setItem("i18nextLng", newLanguage);
        router.replace(router.pathname, undefined, { shallow: true });
      }
    }
  }, [router]);
};
