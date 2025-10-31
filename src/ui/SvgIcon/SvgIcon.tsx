"use client";

import { FC } from "react";
import clsx from "clsx";

import { ICONS } from "./constants";
import { SvgIconProps } from "./types";

import styles from "./styles.module.scss";

export const SvgIcon: FC<SvgIconProps> = ({
  name,
  className,
  size = 30,
  onClick = () => {},
}: SvgIconProps) => {
  const Icon = ICONS[name];

  return (
    <div
      className={clsx(styles.icon, className)}
      onClick={onClick || undefined}
    >
      <Icon name={name} width={size} height={size} />
    </div>
  );
};
