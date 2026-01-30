import clsx from "clsx";
import { isEmpty } from "lodash";
import { FC, ReactNode } from "react";

import { Typography } from "@/ui/Typography";

import styles from "./styles.module.scss";

enum ListType {
  UL = "ul",
  OL = "ol",
}

type ListProps = {
  items: ReactNode[];
  className?: string;
  type?: ListType;
};

export const List: FC<ListProps> = ({
  items,
  className,
  type = ListType.UL,
}) => {
  const Tag = type;

  return (
    !isEmpty(items) && (
      <Tag className={clsx(styles.list, styles[type], className)}>
        {items.map((item, index) => (
          <li key={typeof item === "string" ? item : index}>
            <Typography>{item}</Typography>
          </li>
        ))}
      </Tag>
    )
  );
};
