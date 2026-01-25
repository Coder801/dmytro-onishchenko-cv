import clsx from "clsx";
import { FC } from "react";

import { Themes } from "@/config/types";

import styles from "./styles.module.scss";

type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  theme?: Themes;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
  isLoading = true,
  theme = Themes.default,
}) => (
  <button
    className={clsx(styles.button, styles[theme], className, {
      [styles.loading]: isLoading,
    })}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);
