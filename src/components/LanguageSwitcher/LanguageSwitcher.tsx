import clsx from "clsx";
import { isEqual } from "lodash";
import { FC, useCallback, useEffect } from "react";
import { US, UA } from "country-flag-icons/react/3x2";

import type { LanguageSwitcherProps } from "./types";
import type { Languages } from "@/types/languages";

import styles from "./styles.module.scss";

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  availableLanguages,
  currentLanguage,
  onChange,
  className,
}) => {
  const handleClick = useCallback(
    (code: Languages) => {
      if (!onChange || code === currentLanguage) {
        return;
      }
      onChange(code);
    },
    [onChange, currentLanguage]
  );

  const localeFlagMaps = {
    en: <US title="United States" className={styles.flag} />,
    ua: <UA title="Ukraine" className={styles.flag} />,
  };

  if (!availableLanguages || availableLanguages.length <= 1) {
    return null;
  }

  return (
    <div className={clsx(styles.container, className)}>
      {availableLanguages.sort().map((option: Languages) => {
        const isActive = isEqual(option, currentLanguage);

        return (
          <button
            key={option}
            type="button"
            className={styles.button}
            onClick={() => handleClick(option)}
            disabled={isActive}
          >
            {localeFlagMaps[option]}
          </button>
        );
      })}
    </div>
  );
};
