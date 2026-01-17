import clsx from "clsx";
import { first, last, size } from "lodash";
import { FC, Fragment } from "react";

import { Chip } from "@/ui/Chip";
import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";
import { TimelineProps } from "./types";

export const Timeline: FC<TimelineProps> = ({
  date,
  position,
  company,
  skills,
  children,
  className,
}) => (
  <div className={clsx(styles.container, className)}>
    <div className={styles.content}>
      <Typography tag="h4" weight="bold">
        {position}{" "}
        <div className={styles.date}>
          <span>{first(date)}</span>
          <span>{size(date) === 2 ? ` / ${last(date)}` : " / Present"}</span>
        </div>
      </Typography>
      <Typography tag="h5">
        <i className={styles.company}>{company}</i>
      </Typography>
      <>{children}</>
      {skills && skills.length > 0 && (
        <Typography className={styles.skills}>
          <i>Skills:</i>
          {skills.map((skill, index) => (
            <Fragment key={index}>
              <Chip variant="filled">{skill}</Chip>
            </Fragment>
          ))}
        </Typography>
      )}
    </div>
  </div>
);
