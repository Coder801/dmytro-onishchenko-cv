import { FC } from "react";
import clsx from "clsx";
import Image from "next/image";

import styles from "./styles.module.scss";

type PhotoProps = {
  className?: string;
};

export const Photo: FC<PhotoProps> = ({ className }) => (
  <div className={clsx(styles.container, className)}>
    <figure className={styles.photo}>
      <Image
        className={styles.image}
        src="https://coder801.github.io/cv/img/cv-photo.jpg"
        alt="Photo"
        fill
      />
    </figure>
  </div>
);
