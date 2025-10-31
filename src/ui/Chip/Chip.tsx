import { FC } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

type ChipProps = {
  children: string;
  className?: string;
  variant?: "outlined" | "filled";
};

export const Chip: FC<ChipProps> = ({
  children,
  className,
  variant = "outlined",
}) => (
  <span
    className={clsx(styles.chip, className, {
      [styles.outlined]: variant === "outlined",
      [styles.filled]: variant === "filled",
    })}
  >
    {children}
  </span>
);
