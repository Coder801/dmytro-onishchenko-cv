import { FC, Fragment } from "react";
import { first, last, size } from "lodash";
import { Typography } from "@/ui/Typography";
import { Chip } from "@/ui/Chip";
import clsx from "clsx";

import { TimelineProps } from "./types";

import styles from "./styles.module.scss";

export const Timeline: FC<TimelineProps> = ({
  date,
  position,
  company,
  skills,
  children,
  className,
}) => (
  <div className={clsx(styles.container, className)}>
    <div className={styles.date}>
      <span>{first(date)}</span>
      <span>{size(date) === 2 ? ` / ${last(date)}` : " / Present"}</span>
    </div>
    <div className={styles.content}>
      <Typography tag="h4" weight="bold">
        {position}
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
