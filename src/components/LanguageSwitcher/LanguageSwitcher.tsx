import clsx from "clsx";
import { FC, useCallback } from "react";

import { CvLanguageCode } from "@/data/cv";
import type { LanguageSwitcherProps } from "./types";

import styles from "./styles.module.scss";

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const handleClick = useCallback(
    (code: CvLanguageCode) => {
      if (!onChange || code === value) {
        return;
      }

      onChange(code);
    },
    [onChange, value]
  );

  if (!options || options.length <= 1) {
    return null;
  }

  return (
    <div className={clsx(styles.container, className)}>
      {options.map((option) => {
        const isActive = option.code === value;

        return (
          <button
            key={option.code}
            type="button"
            className={clsx(styles.button, {
              [styles.active]: isActive,
            })}
            onClick={() => handleClick(option.code)}
            disabled={isActive}
          >
            {option.code}
          </button>
        );
      })}
    </div>
  );
};
