import clsx from "clsx";
import { FC } from "react";

import styles from "./styles.module.scss";

type ChipProps = {
  className?: string;
  variant?: "outlined" | "filled";
};

export const Divider: FC<ChipProps> = ({ className, variant = "filled" }) => (
  <hr className={clsx(className, styles.divider, styles[variant])} />
);
