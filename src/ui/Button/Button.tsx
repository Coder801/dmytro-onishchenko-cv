import { FC } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = 'button',
  disabled = false
}) => {
  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
