import clsx from "clsx";
import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

type ButtonProps = {
  children: string | ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
  isLoading = true,
}) => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.loading]: isLoading,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
