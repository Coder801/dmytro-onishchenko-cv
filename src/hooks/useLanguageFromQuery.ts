import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import i18n from "i18next";
import { Languages, SUPPORTED_LANGUAGES } from "@/types/languages";
import { setLanguage } from "@/store/slices/languageSlice";

export const useLanguageFromQuery = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const langParam = router.query.lang as string | undefined;

    if (langParam && SUPPORTED_LANGUAGES.includes(langParam as Languages)) {
      const newLanguage = langParam as Languages;

      if (i18n.language !== newLanguage) {
        dispatch(setLanguage(newLanguage));
        i18n.changeLanguage(newLanguage);
        localStorage.setItem("i18nextLng", newLanguage);
        router.replace(router.pathname, undefined, { shallow: true });
      }
    }
  }, [router, dispatch]);
};
