import { FC, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import styles from "./styles.module.scss";

type PhotoProps = {
  className?: string;
};

export const Photo: FC<PhotoProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={clsx(styles.container, className)}>
      <figure className={clsx(styles.photo, { [styles.loaded]: isLoaded })}>
        <Image
          className={styles.image}
          src="https://coder801.github.io/cv/img/cv-photo.jpg"
          placeholder="blur"
          blurDataURL="./assets/default-avatar-profile-picture-male-icon.svg"
          alt="Photo"
          priority
          onLoad={handleImageLoad}
          fill
        />
      </figure>
    </div>
  );
};
