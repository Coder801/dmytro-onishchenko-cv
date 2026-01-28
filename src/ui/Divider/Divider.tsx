import clsx from "clsx";
import { FC } from "react";

import { useTheme } from "@/context/ThemeContext";

import styles from "./styles.module.scss";

type ChipProps = {
  className?: string;
  variant?: "outlined" | "filled";
};

export const Divider: FC<ChipProps> = ({ className, variant = "filled" }) => {
  const { theme } = useTheme();

  return (
    <hr
      className={clsx(
        className,
        styles.divider,
        styles[variant],
        styles[theme]
      )}
    />
  );
};
