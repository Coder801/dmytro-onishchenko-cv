import clsx from "clsx";
import { UA, US } from "country-flag-icons/react/3x2";
import { isEqual } from "lodash";
import { FC, useCallback } from "react";

import { useTheme } from "@/context/ThemeContext";
import type { Languages } from "@/types/languages";
import { CountryFlag } from "@/ui/CountryFlag";

import styles from "./styles.module.scss";
import type { LanguageSwitcherProps } from "./types";

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  availableLanguages,
  currentLanguage,
  onChange,
  className,
}) => {
  const { theme } = useTheme();
  const handleClick = useCallback(
    (code: Languages) => {
      if (!onChange || code === currentLanguage) {
        return;
      }
      onChange(code);
    },
    [onChange, currentLanguage]
  );

  if (!availableLanguages || availableLanguages.length <= 1) {
    return null;
  }

  return (
    <div className={clsx(styles.container, className, styles[theme])}>
      {availableLanguages.sort().map((option: Languages) => {
        const isActive = isEqual(option, currentLanguage);

        return (
          <button
            key={option}
            type="button"
            className={clsx(styles.button, { [styles.active]: isActive })}
            onClick={() => handleClick(option)}
            disabled={isActive}
          >
            <CountryFlag code={option} className={styles.flag} />
          </button>
        );
      })}
    </div>
  );
};
